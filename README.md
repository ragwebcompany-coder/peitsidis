# Δρ. Νικόλαος Πεϊτσίδης — Ιστοσελίδα

Στατική ιστοσελίδα για τον **Δρ. Νικόλαο Πεϊτσίδη, MD, MSc, MIGS, PhD**, Μαιευτήρα Γυναικολόγο Χειρουργό στην Πολίχνη Θεσσαλονίκης.

Ίδιο layout, δομή και SEO με το `2026-08-02 · Maroussi NeoPed Clinic`. Το περιεχόμενο βασίζεται αποκλειστικά στο αρχείο `ΣΤΟΙΧΕΙΑ ΠΕΛΑΤΗ.txt` και τα χρώματα στο λογότυπο του ιατρείου (`#3d2b99`).

## Δομή

```text
index.html          Αρχική
o-giatros.html      Βιογραφικό γιατρού
ypiresies.html      Υπηρεσίες
epikoinonia.html    Επικοινωνία
sitemap.xml         Sitemap
robots.txt          Robots
assets/             Λογότυπο, εικονίδια, φωτογραφία γιατρού
assets/gallery/     Οι 8 φωτογραφίες του κολλάζ
styles.css          Κοινό στυλ
main.js             Κοινή συμπεριφορά (nav, reveal, counters, lightbox)
build/build.mjs     Generator στατικών σελίδων
```

## Αναγέννηση σελίδων

```bash
node build/build.mjs
```

Ο generator γράφει ξανά τις 4 σελίδες, το `sitemap.xml` και το `robots.txt`.
Όλα τα στοιχεία του πελάτη (τηλέφωνο, ωράριο, υπηρεσίες, βιογραφικό) βρίσκονται
στην κορυφή του `build/build.mjs` — μία αλλαγή εκεί ενημερώνει όλες τις σελίδες.

## Domain

Ο πελάτης **δεν έχει ακόμη domain**. Προσωρινά χρησιμοποιείται το
`https://peitsidis.gr` στη σταθερά `BASE` του `build/build.mjs`. Όταν
κατοχυρωθεί το πραγματικό domain, άλλαξε **μόνο** αυτή τη γραμμή και τρέξε ξανά
τον generator — ενημερώνονται canonical, Open Graph, JSON-LD και sitemap.

## Χρώματα

| Token | Τιμή | Χρήση |
|---|---|---|
| `--violet-700` | `#3d2b99` | Κύριο χρώμα λογοτύπου, τίτλοι, footer |
| `--violet-500` | `#5b45b8` | Δευτερεύον, eyebrows, links |
| `--violet-200` | `#a496d8` | Περιγράμματα, τονισμοί |
| `--violet-50` | `#ddd6f5` | Απαλά γεμίσματα |
| `--sand` | `#f2eefb` | Φόντο ενοτήτων |
| `--blush` | `#e7c6d8` | Θερμή πινελιά |
| `--ink` | `#1c1240` | Κείμενο |

## Assets

Παράχθηκαν από τα αρχεία του πελάτη:

- `assets/mark.png` — το σήμα από το `logo .jpg`, απομονωμένο με διαφάνεια στο `#3d2b99`
- `assets/mark-light.png` — λευκή εκδοχή για το footer
- `assets/logo.jpg` — og:image 1200×630 από την εταιρική κάρτα
- `assets/logo-card.jpg` — η εταιρική κάρτα (λευκό σήμα σε navy)
- `assets/giatros.jpg` — από το `φωτο βιογραφικου.jpg`
- `assets/gallery/*.jpg` — οι 8 υπόλοιπες φωτογραφίες, βελτιστοποιημένες
