#!/usr/bin/env python3
"""Παράγει τις υφές μαρμάρου του site.

Η παλέτα βγαίνει από τη φωτογραφία του μαρμάρου του ιατρείου (λευκό μάρμαρο με
ζεστές καφέ-σκουριά φλέβες) — γι' αυτό είναι πιο «καφέ» από το κλασικό γκρι
Carrara.

Όλος ο θόρυβος φτιάχνεται στο πεδίο συχνοτήτων (FFT), άρα είναι περιοδικός: οι
εικόνες κουμπώνουν η μία δίπλα στην άλλη χωρίς ραφή και μπορούν να μπουν σαν
`background-repeat: repeat` σε οποιοδήποτε ύψος ενότητας.

    python3 build/marble.py

Γράφει: assets/marble.jpg (ανοιχτό) και assets/marble-dark.jpg (σκούρο, για τις
σκούρες ενότητες). Απαιτεί numpy + Pillow.
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
W, H = 2200, 1500
RNG = np.random.default_rng(20260920)


def _freq_grid():
    """Συχνότητες σε κύκλους ανά εικόνα (ακέραιοι, άρα περιοδικοί)."""
    fy = np.fft.fftfreq(H)[:, None] * H
    fx = np.fft.fftfreq(W)[None, :] * W
    return fx.astype(np.float32), fy.astype(np.float32)


def periodic_noise(exponent, stretch_x, rng, cutoff=None):
    """Περιοδικός fractal θόρυβος 0..1.

    exponent  — πόσο γρήγορα σβήνουν οι υψηλές συχνότητες (μεγάλο = πιο απαλός)
    stretch_x — >1 «τεντώνει» τον θόρυβο οριζόντια, για μακριές φλέβες
    cutoff    — προαιρετικό όριο συχνότητας, κόβει τις πολύ ψιλές λεπτομέρειες
    """
    fx, fy = _freq_grid()
    radius = np.sqrt((fx * stretch_x) ** 2 + fy ** 2)
    radius[0, 0] = 1.0
    amplitude = radius ** (-exponent)
    amplitude[0, 0] = 0.0
    if cutoff:
        amplitude *= np.exp(-(radius / cutoff) ** 2)
    spectrum = np.fft.fft2(rng.normal(size=(H, W))) * amplitude
    field = np.real(np.fft.ifft2(spectrum)).astype(np.float32)
    field -= field.min()
    return field / max(field.max(), 1e-6)


def periodic_blur(field, sigma):
    """Γκαουσιανό θόλωμα που «γυρίζει» στις άκρες (μένει tileable)."""
    fx, fy = _freq_grid()
    kernel = np.exp(-2.0 * (np.pi ** 2) * (sigma ** 2) * ((fx / W) ** 2 + (fy / H) ** 2))
    return np.real(np.fft.ifft2(np.fft.fft2(field) * kernel)).astype(np.float32)


def vein_lines(levels, width_px, stretch_x, amp, slope_y, slope_x, rng, jitter=None):
    """Φλέβες ως ισοϋψείς ενός ομαλού πεδίου.

    Αντί για ημίτονο (που δίνει ατέλειωτες, ισοβαρείς ρίγες σαν νερά ξύλου),
    κρατάμε λίγες μόνο ισοϋψείς και δίνουμε σε κάθε μία δικό της βάρος: έτσι
    βγαίνουν δυο-τρεις κυρίαρχες φλέβες με πιο αχνές παρακλάδια, όπως στην πλάκα
    του ιατρείου. Το πλάτος κανονικοποιείται με την κλίση, ώστε η φλέβα να έχει
    σταθερό πάχος σε όλο το μήκος της.

    levels — λίστα (θέση 0..1 μέσα στο εύρος του πεδίου, ένταση 0..1)
    """
    y = np.linspace(0, 1, H, endpoint=False, dtype=np.float32)[:, None]
    x = np.linspace(0, 1, W, endpoint=False, dtype=np.float32)[None, :]
    field = periodic_noise(2.6, stretch_x, rng) * amp + y * slope_y + x * slope_x
    grad_y, grad_x = np.gradient(field)
    grad = np.sqrt(grad_x ** 2 + grad_y ** 2) + 1e-6

    low, high = float(field.min()), float(field.max())
    span = high - low
    width = width_px * (jitter if jitter is not None else 1.0)

    out = np.zeros((H, W), np.float32)
    for position, weight in levels:
        distance = np.abs(field - (low + span * position)) / grad
        out = np.maximum(out, weight * np.exp(-((distance / width) ** 2)))
    return out


def marble_field():
    """Το πεδίο 0..1 που περιγράφει πού περνούν οι φλέβες."""
    # Το πάχος αλλάζει κατά μήκος της φλέβας: αλλού μουτζούρα, αλλού τριχιά.
    jitter = 0.4 + 1.9 * periodic_noise(2.6, 1.6, RNG)

    # Δύο-τρεις κυρίαρχες φλέβες, διαγώνιες, με διαφορετικό βάρος η καθεμία.
    main = vein_lines(
        [(0.18, 1.0), (0.38, 0.45), (0.56, 1.0), (0.79, 0.6)],
        3.0, 1.9, 5.0, 2.2, 1.1, RNG, jitter,
    )
    # Παρακλάδια: πιο λεπτά και πιο αχνά.
    branch = vein_lines(
        [(0.12, 0.5), (0.3, 0.85), (0.48, 0.4), (0.66, 0.75), (0.86, 0.45)],
        1.5, 1.5, 4.5, 3.0, 0.8, RNG, jitter * 0.75,
    )
    # Τριχοειδείς: πυκνές αλλά μόλις που φαίνονται.
    hair = vein_lines(
        [(p, 0.55) for p in np.linspace(0.08, 0.92, 14)],
        0.75, 1.6, 4.0, 4.6, 1.4, RNG,
    )

    # Μάσκα ηρεμίας: μεγάλες περιοχές μένουν σχεδόν καθαρό λευκό μάρμαρο.
    calm = periodic_noise(3.0, 1.2, RNG)
    calm = np.clip((calm - 0.18) * 2.0, 0.1, 1.0)

    veins = np.clip(main + branch * 0.55 + hair * 0.3 * calm, 0, 1)
    # Άλως: η θολή γκριζοκαφέ σκιά που συνοδεύει κάθε φλέβα στο πραγματικό μάρμαρο.
    aura = periodic_blur(veins, 34) * 1.5 + periodic_blur(veins, 9) * 0.7

    # Απαλά σύννεφα — η υφή της πέτρας ανάμεσα στις φλέβες.
    clouds = periodic_noise(3.2, 1.0, RNG)

    field = np.clip(veins * 0.95 + aura, 0, 1) + (clouds - 0.5) * 0.18
    return np.clip(field, 0, 1), clouds


def colorize(field, clouds, stops):
    """Χρωματίζει το πεδίο με βάση μια παλέτα (θέση, RGB)."""
    positions = np.array([p for p, _ in stops], np.float32)
    colors = np.array([c for _, c in stops], np.float32)
    out = np.empty(field.shape + (3,), np.float32)
    for channel in range(3):
        out[..., channel] = np.interp(field, positions, colors[:, channel])

    # Ελαφρύ «γυάλισμα»: μεγάλης κλίμακας φωτεινή διακύμανση, σαν το φως που
    # πέφτει στην πλάκα.
    out += ((clouds - 0.5) * 14.0)[..., None]
    out += RNG.normal(0, 1.5, field.shape).astype(np.float32)[..., None]
    return np.clip(out, 0, 255).astype(np.uint8)


LIGHT = [
    (0.00, (250, 246, 240)),  # καθαρό κρεμ μάρμαρο
    (0.22, (244, 237, 228)),
    (0.45, (229, 216, 201)),
    (0.66, (208, 189, 168)),  # ζεστό μπεζ
    (0.82, (181, 153, 127)),  # καφέ φλέβα
    (0.93, (154, 123, 97)),   # σκούρα σκουριά
    (1.00, (132, 102, 78)),
]

DARK = [
    (0.00, (44, 34, 28)),
    (0.30, (52, 40, 33)),
    (0.55, (66, 51, 41)),
    (0.75, (88, 68, 53)),
    (0.88, (117, 92, 70)),
    (1.00, (152, 124, 96)),
]


def write(name, stops):
    field, clouds = marble_field()
    image = Image.fromarray(colorize(field, clouds, stops), "RGB")
    target = ROOT / "assets" / name
    image.save(target, quality=80, optimize=True, progressive=True)
    print(f"{name}: {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    write("marble.jpg", LIGHT)
    write("marble-dark.jpg", DARK)
