import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Ο πελάτης δεν έχει ακόμη domain. Άλλαξε μόνο εδώ όταν κατοχυρωθεί.
const BASE = "https://peitsidis.gr";
const UPDATED = "2026-08-09";

const clinic = {
  name: "Δρ. Νικόλαος Πεϊτσίδης",
  shortName: "Νικόλαος Πεϊτσίδης",
  brandTop: "Δρ. Νικόλαος",
  brandSub: "Πεϊτσίδης",
  doctor: "Δρ. Νικόλαος Πεϊτσίδης, MD, MSc, MIGS, PhD",
  specialty: "Γυναικολόγος",
  role: "Obstetrician-Gynecologist",
  roleEl: "Μαιευτήρας Γυναικολόγος Χειρουργός",
  slogan: "ΣΥΓΧΡΟΝΗ, ΤΕΚΜΗΡΙΩΜΕΝΗ ΚΑΙ ΑΝΘΡΩΠΙΝΗ ΓΥΝΑΙΚΟΛΟΓΙΑ",
  phone: "+30 697 841 0100",
  phoneHref: "+306978410100",
  email: "nickpeits@windowslive.com",
  city: "Πολίχνη Θεσσαλονίκης",
  street: "Γράμμου 3",
  postalCode: "56532",
  address: "Γράμμου 3, Πολίχνη Θεσσαλονίκης 565 32",
  hours: "Τρίτη, Πέμπτη, Παρασκευή 17:00–21:00 · Σάββατο 10:00–14:00",
  hoursShort: "Τρ, Πε, Πα 17:00–21:00 · Σα 10:00–14:00",
  availability: "Τρίτη, Πέμπτη, Παρασκευή & Σάββατο",
  maps: "https://maps.app.goo.gl/PjHjvuGM3FMqLaKS8",
};

// Ώρες λειτουργίας σε μορφή schema.org
const openingHours = [
  { days: ["Tuesday", "Thursday", "Friday"], opens: "17:00", closes: "21:00" },
  { days: ["Saturday"], opens: "10:00", closes: "14:00" },
];

const bio = [
  "Απόφοιτος και Διδάκτωρ (PhD), Ιατρική Σχολή, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης — βαθμός «Άριστα μετά διακρίσεως».",
  "Μεταπτυχιακό (MSc) στη «Χειρουργική Ελάσσονος Πυέλου και Περινέου», Ιατρική Σχολή, Πανεπιστήμιο Θεσσαλίας — βαθμός 10, «Άριστα».",
  "Πτυχίο Ιατρικής, Ιατρική Σχολή, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης — βαθμός 7, «Λίαν Καλώς».",
  "Μετεκπαίδευση στη «Λαπαροσκοπική, Υστεροσκοπική, Ρομποτική και Κολπική Χειρουργική», Evangelisches Krankenhaus Bethesda Duisburg, Γερμανία.",
  "Μετεκπαίδευση στην «Αντιμετώπιση Υπογονιμότητας και Χειρουργική Αναπαραγωγής», Evangelisches Krankenhaus Bethesda Duisburg, Γερμανία.",
  "Δίπλωμα Μαστολογίας, Ελληνική Σχολή Μαστολογίας, μετά από επιτυχία στις τελικές εξετάσεις της σχολής.",
];

// Εικονίδια υπηρεσιών — λεπτές γραμμές, στο ύφος του μαρμάρινου design.
const icons = {
  kyisi: '<circle cx="19" cy="11" r="5"/><path d="M19 16c-5 0-8 4-8 9v12h5l1 10h9"/><path d="M27 25c4 0 7 3 7 7s-3 7-7 7"/><circle cx="26" cy="32" r="3"/>',
  ultrasound: '<path d="M10 34a18 18 0 0 1 28-14"/><path d="M15 36a12 12 0 0 1 18-10"/><path d="M20 38a6 6 0 0 1 8-5"/><circle cx="34" cy="34" r="2.5"/>',
  tokos: '<path d="M24 38S10 30 10 20a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 10-14 18-14 18Z"/><path d="M18 22h4l2-4 2 8 2-4h4"/>',
  fertility: '<circle cx="19" cy="24" r="10"/><path d="M40 18c-6 1-10 4-11 8"/><path d="M34 33c3-2 5-5 6-9"/><circle cx="19" cy="24" r="3.5"/>',
  cycle: '<path d="M36 18a14 14 0 1 0 2 10"/><path d="M38 12v9h-9"/><circle cx="24" cy="24" r="3"/>',
  iui: '<path d="M30 10l8 8"/><path d="M33 15 19 29l-3 8 8-3 14-14Z"/><path d="M22 22l6 6"/><circle cx="13" cy="37" r="1.6"/>',
  ivf: '<path d="M12 22h24v4a12 12 0 0 1-24 0Z"/><path d="M10 22h28"/><circle cx="24" cy="27" r="4"/><path d="M24 12v6"/>',
  xeirourgiki: '<path d="M14 12v10a6 6 0 0 0 12 0V12"/><path d="M20 28v8a6 6 0 0 0 12 0v-6"/><circle cx="32" cy="26" r="4"/>',
  pap: '<circle cx="24" cy="24" r="6"/><path d="M24 10v6M24 32v6M10 24h6M32 24h6"/><path d="M14 14l4.5 4.5M29.5 29.5 34 34M34 14l-4.5 4.5M18.5 29.5 14 34"/>',
  mastos: '<path d="M18 12c-2 8-8 10-8 18a14 14 0 0 0 28 0c0-8-6-10-8-18"/><circle cx="24" cy="30" r="4"/>',
  efivi: '<path d="M24 38V20"/><path d="M24 24c-8 0-10-6-10-10 6 0 10 3 10 10Z"/><path d="M24 26c8 0 10-6 10-11-6 0-10 4-10 11Z"/>',
  antisillipsi: '<path d="M24 10l12 5v10c0 8-5 12-12 15-7-3-12-7-12-15V15Z"/><path d="M19 24l4 4 7-8"/>',
  emminopausi: '<path d="M32 12a14 14 0 1 0 6 16 11 11 0 0 1-6-16Z"/><circle cx="34" cy="18" r="1.6"/>',
  pcos: '<circle cx="24" cy="24" r="12"/><circle cx="20" cy="20" r="2.4"/><circle cx="28" cy="21" r="2"/><circle cx="22" cy="29" r="2.2"/><circle cx="29" cy="28" r="1.8"/>',
  mitra: '<path d="M16 14c0 8 1 12 4 15a6 6 0 0 0 8 0c3-3 4-7 4-15"/><path d="M16 14c-4 2-6 6-6 10"/><path d="M32 14c4 2 6 6 6 10"/><circle cx="9" cy="26" r="3"/><circle cx="39" cy="26" r="3"/><path d="M24 31v7"/>',
  ourogynaikologia: '<path d="M24 10s10 11 10 17a10 10 0 0 1-20 0c0-6 10-17 10-17Z"/><path d="M19 27a5 5 0 0 0 5 5"/>',
  ysteroskopisi: '<path d="M10 30l14-6"/><path d="M8 28l4 6"/><path d="M26 16c0 7 1 10 3 13a5 5 0 0 0 7 0c2-3 3-6 3-13"/><path d="M32 32v6"/>',
  robotiki: '<path d="M12 38V26l10-8"/><path d="M22 18l10 4v8"/><circle cx="12" cy="24" r="3"/><circle cx="23" cy="17" r="3"/><circle cx="33" cy="31" r="5"/><path d="M33 31h6"/>',
};

// Οι υπηρεσίες σε ομάδες, με σύντομη περιγραφή η καθεμία.
const serviceGroups = [
  {
    slug: "maieftiki",
    title: "Μαιευτική",
    lead: "Από το πρώτο υπερηχογράφημα έως τον τοκετό, με τακτική παρακολούθηση και ενημέρωση σε κάθε στάδιο.",
    items: [
      [
        "Παρακολούθηση κύησης",
        "Τακτική παρακολούθηση σε όλη τη διάρκεια της εγκυμοσύνης, με προγραμματισμένες επισκέψεις, εξετάσεις και ενημέρωση για κάθε τρίμηνο.",
        "kyisi",
      ],
      [
        "Μαιευτικός υπερηχογραφικός έλεγχος",
        "Υπερηχογραφικός έλεγχος της ανάπτυξης και της ευεξίας του εμβρύου, στα χρονικά σημεία που ορίζουν οι σύγχρονες κατευθυντήριες οδηγίες.",
        "ultrasound",
      ],
      [
        "Φυσιολογικός τοκετός",
        "Προετοιμασία και υποστήριξη για φυσιολογικό τοκετό, με αναλυτική ενημέρωση για τα στάδια και τις επιλογές σας.",
        "tokos",
      ],
    ],
  },
  {
    slug: "gonimotita",
    title: "Γονιμότητα",
    lead: "Διερεύνηση και αντιμετώπιση της υπογονιμότητας του ζευγαριού, με μετεκπαίδευση στην υποβοηθούμενη αναπαραγωγή και τη χειρουργική αναπαραγωγής.",
    items: [
      [
        "Διερεύνηση υπογονιμότητας ζεύγους",
        "Πλήρης έλεγχος και για τους δύο συντρόφους — ορμονικός έλεγχος, υπερηχογράφημα, έλεγχος σαλπίγγων και σπερμοδιάγραμμα — ώστε να βρεθεί η αιτία.",
        "fertility",
      ],
      [
        "Πρόκληση ωορρηξίας και παρακολούθηση κύκλου",
        "Παρακολούθηση του κύκλου με υπερηχογραφήματα και, όπου χρειάζεται, φαρμακευτική πρόκληση ωορρηξίας με εξατομικευμένο σχήμα.",
        "cycle",
      ],
      [
        "Ενδομήτρια σπερματέγχυση (IUI)",
        "Απλή, ανώδυνη τεχνική υποβοηθούμενης αναπαραγωγής: το επεξεργασμένο σπέρμα τοποθετείται στη μήτρα την ημέρα της ωορρηξίας.",
        "iui",
      ],
      [
        "Εξωσωματική γονιμοποίηση (IVF)",
        "Συμβουλευτική και προετοιμασία για την εξωσωματική γονιμοποίηση: επιλογή πρωτοκόλλου, προεξεταστικός έλεγχος και συνεργασία με τη μονάδα αναπαραγωγής.",
        "ivf",
      ],
      [
        "Χειρουργική αναπαραγωγής",
        "Επεμβάσεις που αποκαθιστούν τη γονιμότητα — ινομυώματα, πολύποδες, συμφύσεις, ενδομητρίωση — με λαπαροσκόπηση και υστεροσκόπηση.",
        "xeirourgiki",
      ],
    ],
  },
  {
    slug: "gynaikologia",
    title: "Γυναικολογία",
    lead: "Ο τακτικός έλεγχος και η αντιμετώπιση των συχνότερων γυναικολογικών προβλημάτων, σε κάθε ηλικία.",
    items: [
      [
        "Γυναικολογικός έλεγχος — Τεστ ΠΑΠ",
        "Ο ετήσιος προληπτικός έλεγχος: κλινική εξέταση, τεστ Παπανικολάου, έλεγχος HPV και γυναικολογικό υπερηχογράφημα.",
        "pap",
      ],
      [
        "Έλεγχος και υπερηχογράφημα μαστών",
        "Κλινική εξέταση και υπερηχογράφημα μαστών, με εκπαίδευση στην αυτοεξέταση. Δίπλωμα Μαστολογίας της Ελληνικής Σχολής Μαστολογίας.",
        "mastos",
      ],
      [
        "Εφηβική γυναικολογία",
        "Η πρώτη επαφή με τον γυναικολόγο, με διακριτικότητα: κύκλος, πόνος περιόδου, ακμή, εμβολιασμός HPV και σωστή ενημέρωση.",
        "efivi",
      ],
      [
        "Οικογενειακός προγραμματισμός και αντισύλληψη",
        "Επιλογή της κατάλληλης μεθόδου αντισύλληψης για κάθε φάση της ζωής, με ενημέρωση για τα οφέλη και τις παρενέργειες.",
        "antisillipsi",
      ],
      [
        "Εμμηνόπαυση και διαταραχές περιόδου",
        "Αντιμετώπιση των συμπτωμάτων της εμμηνόπαυσης και των διαταραχών του κύκλου, με σύγχρονη και εξατομικευμένη θεραπεία.",
        "emminopausi",
      ],
      [
        "Πολυκυστικές ωοθήκες (PCOS)",
        "Διάγνωση και αντιμετώπιση του συνδρόμου πολυκυστικών ωοθηκών — κύκλος, ορμονικό προφίλ, βάρος και γονιμότητα.",
        "pcos",
      ],
      [
        "Ενδομητρίωση",
        "Διερεύνηση του χρόνιου πυελικού πόνου και αντιμετώπιση της ενδομητρίωσης, φαρμακευτικά ή με ελάχιστα επεμβατική χειρουργική.",
        "mitra",
      ],
      [
        "Ουρογυναικολογία και ακράτεια",
        "Αντιμετώπιση της ακράτειας ούρων και της χαλάρωσης του πυελικού εδάφους — αντικείμενο του μεταπτυχιακού στη Χειρουργική Ελάσσονος Πυέλου και Περινέου.",
        "ourogynaikologia",
      ],
    ],
  },
  {
    slug: "xeirourgiki",
    title: "Ελάχιστα επεμβατική χειρουργική",
    lead: "Λαπαροσκοπική, υστεροσκοπική, ρομποτική και κολπική χειρουργική, με μετεκπαίδευση στο Bethesda Duisburg της Γερμανίας.",
    items: [
      [
        "Υστεροσκόπηση",
        "Διαγνωστική και επεμβατική υστεροσκόπηση για πολύποδες, ινομυώματα, συμφύσεις και διαφράγματα, χωρίς τομές.",
        "ysteroskopisi",
      ],
      [
        "Λαπαροσκοπική και ρομποτική χειρουργική",
        "Επεμβάσεις με ελάχιστες τομές και ρομποτική υποστήριξη: λιγότερος πόνος, μικρότερη παραμονή στην κλινική, ταχύτερη επιστροφή στην καθημερινότητα.",
        "robotiki",
      ],
    ],
  },
];

const services = serviceGroups.flatMap((group) => group.items.map(([name]) => name));

// Σύντομες ετικέτες για το ticker (τα πλήρη ονόματα είναι πολύ μεγάλα)
const tickerItems = [
  "Γονιμότητα",
  "Εξωσωματική Γονιμοποίηση",
  "Ρομποτική Χειρουργική",
  "Λαπαροσκοπική Χειρουργική",
  "Υστεροσκόπηση",
  "Διερεύνηση Υπογονιμότητας",
  "Ενδομητρίωση",
  "Παρακολούθηση Κύησης",
  "Μαστολογία",
  "Ουρογυναικολογία",
];

// Φορείς εκπαίδευσης και μετεκπαίδευσης (από το βιογραφικό του πελάτη)
const institutions = [
  "Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης",
  "Ιατρική Σχολή ΑΠΘ · Διδακτορικό",
  "Πανεπιστήμιο Θεσσαλίας · MSc",
  "Evangelisches Krankenhaus Bethesda · Duisburg",
  "Ελληνική Σχολή Μαστολογίας",
  "Χειρουργική Ελάσσονος Πυέλου & Περινέου",
];

// Μετρήσιμα στοιχεία — όλα προκύπτουν από τα δεδομένα του πελάτη
const stats = [
  [String(services.length), "Γυναικολογικές υπηρεσίες"],
  [String(serviceGroups.length), "Τομείς φροντίδας"],
  ["4", "Ημέρες ραντεβού"],
  [String(bio.length), "Τίτλοι & μετεκπαιδεύσεις"],
];

// Κολλάζ — οι φωτογραφίες του ιατρείου με τα spans του grid
const gallery = [
  ["robotiki-konsola", "Ρομποτική χειρουργική στην κονσόλα da Vinci", "g-tall", 750, 1000],
  ["xeirourgeio-omada", "Χειρουργική ομάδα σε γυναικολογική επέμβαση", "g-big", 1000, 1000],
  ["robotiki-xeirourgiki", "Ρομποτικό χειρουργικό σύστημα σε πλήρη ανάπτυξη", "g-tall", 720, 720],
  ["synedrio-omilia", "Ομιλία σε ιατρικό συνέδριο γυναικολογίας", "g-wide", 1000, 750],
  ["pistopoiisi-duisburg", "Πιστοποίηση μετεκπαίδευσης, Bethesda Duisburg", "g-std", 750, 1000],
  ["laparoskopiki-epemvasi", "Λαπαροσκοπική γυναικολογική επέμβαση", "g-std", 450, 1000],
  ["endoskopiki-apeikonisi", "Ενδοσκοπική απεικόνιση στο χειρουργείο", "g-wide", 451, 1000],
  ["elachista-epemvatiki", "Ελάχιστα επεμβατική χειρουργική τεχνική", "g-wide", 720, 720],
];

const pages = [
  ["index.html", "1.0"],
  ["o-giatros.html", "0.8"],
  ["ypiresies.html", "0.8"],
  ["epikoinonia.html", "0.8"],
];

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Σπάει μια λέξη σε γράμματα-spans για kinetic typography (με stagger index)
let kineticIndex = 0;
const kinetic = (word) =>
  `<span class="k-word">${[...word]
    .map((char) => `<span class="k-char" style="--k:${kineticIndex++}">${esc(char)}</span>`)
    .join("")}</span>`;
const attr = (value) => esc(value).replace(/"/g, "&quot;");
const num = (index) => String(index + 1).padStart(2, "0");
const out = (path, html) => {
  const full = resolve(ROOT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html.trimStart() + "\n");
};

const clinicLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness", "LocalBusiness"],
  "@id": `${BASE}/#clinic`,
  name: `${clinic.name} — ${clinic.roleEl}`,
  alternateName: "Πεϊτσίδης Νικόλαος Γυναικολόγος Μαιευτήρας Χειρουργός",
  medicalSpecialty: ["ObstetricsAndGynecology", "Surgical"],
  slogan: clinic.slogan,
  url: `${BASE}/`,
  telephone: clinic.phoneHref,
  email: clinic.email,
  logo: `${BASE}/assets/logo.jpg`,
  image: `${BASE}/assets/logo.jpg`,
  hasMap: clinic.maps,
  areaServed: { "@type": "City", name: "Θεσσαλονίκη" },
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.street,
    addressLocality: "Πολίχνη",
    addressRegion: "Θεσσαλονίκη",
    postalCode: clinic.postalCode,
    addressCountry: "GR",
  },
  openingHoursSpecification: openingHours.map(({ days, opens, closes }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  })),
  availableService: services.map((name) => ({ "@type": "MedicalProcedure", name })),
  founder: {
    "@type": "Physician",
    name: clinic.doctor,
    jobTitle: clinic.roleEl,
    medicalSpecialty: "ObstetricsAndGynecology",
    alumniOf: "Ιατρική Σχολή, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης",
  },
};

const breadcrumb = (label, path) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Αρχική", item: `${BASE}/index.html` },
    { "@type": "ListItem", position: 2, name: label, item: `${BASE}/${path}` },
  ],
});

function head(title, description, path, extraLd = []) {
  return `<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}" />
  <meta name="author" content="${attr(clinic.doctor)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#f2eefb" />
  <meta name="geo.region" content="GR-B" />
  <meta name="geo.placename" content="${attr(clinic.city)}" />
  <link rel="canonical" href="${BASE}/${path}" />
  <meta property="og:site_name" content="${attr(clinic.name)}" />
  <meta property="og:locale" content="el_GR" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(description)}" />
  <meta property="og:url" content="${BASE}/${path}" />
  <meta property="og:image" content="${BASE}/assets/logo.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(title)}" />
  <meta name="twitter:description" content="${attr(description)}" />
  <meta name="twitter:image" content="${BASE}/assets/logo.jpg" />
  <link rel="icon" type="image/png" href="assets/icon-512.png" />
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  ${[clinicLd, ...extraLd].map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n  ")}
</head>
<body>`;
}

function header(active) {
  const current = (key) => (active === key ? ' aria-current="page"' : "");
  return `<a class="skip-link" href="#main">Μετάβαση στο περιεχόμενο</a>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>
  <div class="topbar">
    <div class="topbar-inner container">
      <a href="tel:${attr(clinic.phoneHref)}">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.2 1Z"/></svg>
        <span>${esc(clinic.phone)}</span>
      </a>
      <a href="mailto:${attr(clinic.email)}">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.4 7.2 8.6 5.8 8.6-5.8"/></svg>
        <span>${esc(clinic.email)}</span>
      </a>
      <a class="topbar-address" href="${attr(clinic.maps)}" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>
        <span>${esc(clinic.street)}, ${esc(clinic.city)}</span>
      </a>
    </div>
  </div>
  <header class="site-header">
    <nav class="nav container" aria-label="Κύρια πλοήγηση">
      <a class="brand" href="index.html" aria-label="${attr(clinic.name)}">
        <img src="assets/mark.png" alt="" class="brand-mark" width="522" height="640" />
        <span class="brand-text"><strong>${esc(clinic.brandTop)}</strong><em>${esc(clinic.brandSub)}</em></span>
      </a>
      <button class="nav-toggle" aria-label="Άνοιγμα μενού" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-links">
        <li><a href="index.html"${current("home")}>Αρχική</a></li>
        <li><a href="o-giatros.html"${current("doctor")}>Ο Γιατρός</a></li>
        <li><a href="ypiresies.html"${current("services")}>Υπηρεσίες</a></li>
        <li><a href="epikoinonia.html"${current("contact")}>Επικοινωνία</a></li>
        <li><a href="epikoinonia.html" class="btn btn-nav">Ραντεβού</a></li>
      </ul>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <img src="assets/mark-light.png" alt="${attr(clinic.name)}" class="footer-logo" width="522" height="640" />
        <p class="footer-tag">${esc(clinic.slogan)}</p>
      </div>
      <nav class="footer-links" aria-label="Πλοήγηση">
        <a href="index.html">Αρχική</a>
        <a href="o-giatros.html">Ο Γιατρός</a>
        <a href="ypiresies.html">Υπηρεσίες</a>
        <a href="epikoinonia.html">Επικοινωνία</a>
      </nav>
      <div class="footer-contact">
        <a href="tel:${clinic.phoneHref}">${esc(clinic.phone)}</a>
        <a href="mailto:${clinic.email}">${esc(clinic.email)}</a>
        <a href="${clinic.maps}" target="_blank" rel="noopener noreferrer">${esc(clinic.address)}</a>
        <span>${esc(clinic.hoursShort)}</span>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="year">${UPDATED.slice(0, 4)}</span> ${esc(clinic.name)} — ${esc(clinic.roleEl)}</p>
      <p>Made by <a href="https://clinicbrain.gr/?utm_source=client-site&amp;utm_medium=footer&amp;utm_campaign=made-by" target="_blank" rel="noopener noreferrer">CLINICBRAIN</a></p>
    </div>
  </footer>
  <script src="main.js" defer></script>
</body>
</html>`;
}

const cta = `<section class="cta-section">
    <div class="cta-aura" aria-hidden="true"></div>
    <div class="container cta-inner">
      <div class="reveal">
        <p class="eyebrow">Ραντεβού</p>
        <h2>Κλείστε το ραντεβού σας</h2>
        <p>${esc(clinic.hours)}</p>
      </div>
      <div class="cta-actions reveal" style="--i:1">
        <a href="tel:${clinic.phoneHref}" class="btn btn-primary magnetic">Καλέστε ${esc(clinic.phone)}</a>
        <a href="mailto:${clinic.email}" class="btn btn-ghost magnetic">Email</a>
      </div>
    </div>
  </section>`;

// Οι υπηρεσίες που προβάλλονται στην αρχική (μία «βιτρίνα» από κάθε τομέα)
const featured = [
  "Παρακολούθηση κύησης",
  "Μαιευτικός υπερηχογραφικός έλεγχος",
  "Φυσιολογικός τοκετός",
  "Διερεύνηση υπογονιμότητας ζεύγους",
  "Εξωσωματική γονιμοποίηση (IVF)",
  "Ενδομήτρια σπερματέγχυση (IUI)",
  "Γυναικολογικός έλεγχος — Τεστ ΠΑΠ",
  "Έλεγχος και υπερηχογράφημα μαστών",
  "Λαπαροσκοπική και ρομποτική χειρουργική",
];

const allItems = serviceGroups.flatMap((group) => group.items);
const itemByName = new Map(allItems.map((item) => [item[0], item]));

function serviceCard([name, text, icon], index, heading = "h3") {
  return `<article class="service-card spotlight reveal" style="--i:${index}">
            <span class="service-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none">${icons[icon]}</svg></span>
            <${heading}>${esc(name)}</${heading}>
            <p>${esc(text)}</p>
          </article>`;
}

function galleryGrid(limit = gallery.length) {
  return gallery
    .slice(0, limit)
    .map(
      ([slug, caption, span, w, h], index) =>
        `<figure class="g-item ${span} reveal" style="--i:${index}">
            <img src="assets/gallery/${slug}.jpg" alt="${attr(caption)}" width="${w}" height="${h}" loading="lazy" decoding="async" />
            <figcaption>${esc(caption)}</figcaption>
          </figure>`,
    )
    .join("\n          ");
}

function home() {
  const description = `${clinic.doctor}, ${clinic.roleEl} στην Πολίχνη Θεσσαλονίκης. Ρομποτική και λαπαροσκοπική γυναικολογική χειρουργική, υπογονιμότητα, ενδομητρίωση, παρακολούθηση κύησης. Ραντεβού στο ${clinic.phone}.`;
  kineticIndex = 0;
  out("index.html", `${head(`${clinic.name} | ${clinic.specialty} Θεσσαλονίκη`, description, "index.html")}
  ${header("home")}
  <main id="main">
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <span class="orb orb-1" data-parallax="26"></span>
        <div class="hero-noise"></div>
      </div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow eyebrow-live"><span class="pulse-dot"></span>${esc(clinic.address)}</p>
          <h1 class="kinetic">
            <span class="k-line">${kinetic("Νικόλαος")}</span>
            <span class="k-line k-line-accent">${kinetic("Πεϊτσίδης")}</span>
          </h1>
          <p class="hero-tagline"><span class="shimmer">${esc(clinic.slogan)}</span></p>
          <p class="hero-lead">MD, MSc, MIGS, PhD · ${esc(clinic.roleEl)}. Ελάχιστα επεμβατική, ρομποτική και λαπαροσκοπική γυναικολογική χειρουργική, με μετεκπαίδευση στη Γερμανία.</p>
          <div class="hero-actions">
            <a href="epikoinonia.html" class="btn btn-primary magnetic">Κλείστε ραντεβού</a>
            <a href="ypiresies.html" class="btn btn-ghost magnetic">Δείτε υπηρεσίες</a>
          </div>
          <ul class="hero-chips">
            <li style="--i:0">Ρομποτική Χειρουργική</li>
            <li style="--i:1">Υπογονιμότητα</li>
            <li style="--i:2">Ενδομητρίωση</li>
            <li style="--i:3">Μαστολογία</li>
          </ul>
        </div>
        <aside class="hero-panel tilt" aria-label="Στοιχεία ιατρείου">
          <div class="panel-glow" aria-hidden="true"></div>
          <div class="panel-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
          <img class="panel-mark" src="assets/mark.png" alt="${attr(clinic.name)}" width="522" height="640" />
          <svg class="ekg" viewBox="0 0 300 60" aria-hidden="true" focusable="false" preserveAspectRatio="none">
            <path class="ekg-track" d="M0 30 H70 l10 -22 l12 44 l10 -30 l8 12 h14 l9 -18 l11 26 l9 -12 H300" />
            <path class="ekg-pulse" d="M0 30 H70 l10 -22 l12 44 l10 -30 l8 12 h14 l9 -18 l11 26 l9 -12 H300" />
          </svg>
          <dl>
            <div><dt>Ιατρός</dt><dd>${esc(clinic.doctor)}</dd></div>
            <div><dt>Ειδικότητα</dt><dd>${esc(clinic.roleEl)}</dd></div>
            <div><dt>Διεύθυνση</dt><dd>${esc(clinic.address)}</dd></div>
            <div><dt>Ωράριο</dt><dd>${esc(clinic.hours)}</dd></div>
          </dl>
        </aside>
      </div>
      <a class="scroll-cue" href="#giatros" aria-label="Συνεχίστε παρακάτω"><span aria-hidden="true"></span>Scroll</a>
    </section>
    <section class="ticker" aria-label="Υπηρεσίες ιατρείου">
      <div class="ticker-track">
        ${[...tickerItems, ...tickerItems].map((service) => `<span>${esc(service)}</span>`).join("\n        ")}
      </div>
    </section>
    <section class="stats-strip" aria-label="Με μια ματιά">
      <div class="container stats-grid">
        ${stats
          .map(
            ([value, label, suffix = ""], index) =>
              `<article class="stat reveal" style="--i:${index}"><strong class="count" data-count="${value}" data-suffix="${attr(suffix)}">0${esc(suffix)}</strong><span>${esc(label)}</span></article>`,
          )
          .join("\n        ")}
      </div>
    </section>
    <section class="section" id="giatros">
      <div class="container split">
        <div class="reveal">
          <p class="eyebrow">Ο Γιατρός</p>
          <h2 class="line-reveal"><span>${esc(clinic.name)}</span></h2>
          <p class="lead">${esc(bio[0])}</p>
          <p>${esc(bio[1])}</p>
          <p>${esc(bio[5])}</p>
          <a class="text-link arrow-link" href="o-giatros.html">Πλήρες βιογραφικό</a>
        </div>
        <div class="doctor-figure reveal" style="--i:1">
          <img src="assets/giatros.jpg" alt="${attr(clinic.doctor)}" width="825" height="1100" loading="lazy" decoding="async" />
          <figcaption><strong>${esc(clinic.doctor)}</strong><span>${esc(clinic.role)}</span></figcaption>
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container split">
        <div class="info-card tilt reveal">
          <span class="card-badge">Germany</span>
          <h3>Μετεκπαίδευση στη Γερμανία</h3>
          <p>${esc(bio[3])}</p>
          <p>${esc(bio[4])}</p>
          <div class="flag-row" aria-hidden="true"><span>GR</span><span>DE</span><span>MIGS</span></div>
        </div>
        <div class="reveal" style="--i:1">
          <p class="eyebrow">Προσέγγιση</p>
          <h2 class="line-reveal"><span>Σύγχρονη και ανθρώπινη φροντίδα</span></h2>
          <p class="lead">Στόχος μας είναι η σύγχρονη, επιστημονικά τεκμηριωμένη και ανθρώπινη προσέγγιση, με σεβασμό στις ανάγκες και τις επιθυμίες κάθε γυναίκας.</p>
          <p>Σε κάθε ραντεβού υπάρχει χρόνος για πλήρη εξέταση, ενημέρωση και σχεδιασμό της θεραπείας, χωρίς βιασύνη.</p>
        </div>
      </div>
    </section>
    <section class="marquee-soft" aria-label="Ακαδημαϊκή πορεία">
      <div class="marquee-track">
        ${[...institutions, ...institutions].map((item) => `<span>${esc(item)}</span>`).join("\n        ")}
      </div>
    </section>
    <section class="section" id="galeria">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Το ιατρείο σε εικόνες</p>
          <h2>Χειρουργείο, ρομποτική και εκπαίδευση</h2>
          <p class="lead">Στιγμιότυπα από τη χειρουργική δραστηριότητα, τη ρομποτική χειρουργική και τη διαρκή εκπαίδευση.</p>
        </div>
        <div class="collage">
          ${galleryGrid()}
        </div>
      </div>
    </section>
    <section class="section section-marble">
      <div class="container">
        <div class="section-head section-head-center reveal">
          <p class="eyebrow">${esc(clinic.name)}</p>
          <h2>Υπηρεσίες</h2>
          <p class="lead">${esc(String(services.length))} υπηρεσίες σε τέσσερις τομείς — μαιευτική, γονιμότητα, γυναικολογία και ελάχιστα επεμβατική χειρουργική.</p>
        </div>
        <div class="service-grid">
          ${featured.map((name, index) => serviceCard(itemByName.get(name), index)).join("\n          ")}
        </div>
        <p class="center-link"><a class="text-link arrow-link" href="ypiresies.html">Όλες οι υπηρεσίες</a></p>
      </div>
    </section>
    <section class="section steps-section">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Πώς λειτουργεί</p>
          <h2>Τρία βήματα για το ραντεβού σας</h2>
        </div>
        <ol class="steps">
          <li class="reveal" style="--i:0"><span>01</span><h3>Επικοινωνία</h3><p>Τηλεφωνικά στο ${esc(clinic.phone)} ή με email στο ${esc(clinic.email)}.</p></li>
          <li class="reveal" style="--i:1"><span>02</span><h3>Ραντεβού</h3><p>${esc(clinic.hours)}. Επιλέγουμε μαζί την ώρα που σας εξυπηρετεί.</p></li>
          <li class="reveal" style="--i:2"><span>03</span><h3>Επίσκεψη</h3><p>${esc(clinic.address)}. Εξέταση, ενημέρωση και πλάνο παρακολούθησης.</p></li>
        </ol>
      </div>
    </section>
    ${cta}
  </main>
  ${footer()}`);
}

function doctor() {
  const description = `Βιογραφικό ${clinic.doctor}, ${clinic.roleEl}. Διδάκτωρ ΑΠΘ, MSc Πανεπιστήμιο Θεσσαλίας, μετεκπαίδευση στη ρομποτική και λαπαροσκοπική χειρουργική στη Γερμανία.`;
  out("o-giatros.html", `${head(`${clinic.doctor} | ${clinic.roleEl}`, description, "o-giatros.html", [
    breadcrumb("Ο Γιατρός", "o-giatros.html"),
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: clinic.doctor,
      jobTitle: clinic.roleEl,
      medicalSpecialty: "ObstetricsAndGynecology",
      url: `${BASE}/o-giatros.html`,
      image: `${BASE}/assets/giatros.jpg`,
      telephone: clinic.phoneHref,
      email: clinic.email,
      worksFor: { "@id": `${BASE}/#clinic` },
      alumniOf: [
        "Ιατρική Σχολή, Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης",
        "Ιατρική Σχολή, Πανεπιστήμιο Θεσσαλίας",
      ],
    },
  ])}
  ${header("doctor")}
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Ο Γιατρός</p>
        <h1>${esc(clinic.name)}</h1>
        <p>MD, MSc, MIGS, PhD · ${esc(clinic.roleEl)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container split">
        <div class="reveal">
          <p class="eyebrow">Προφίλ</p>
          <h2 class="line-reveal"><span>Ελάχιστα επεμβατική γυναικολογική χειρουργική</span></h2>
          <p class="lead">Στόχος μας είναι η σύγχρονη, επιστημονικά τεκμηριωμένη και ανθρώπινη προσέγγιση, με σεβασμό στις ανάγκες και τις επιθυμίες κάθε γυναίκας.</p>
          <p>Η εκπαίδευση στο Evangelisches Krankenhaus Bethesda Duisburg καλύπτει τη λαπαροσκοπική, υστεροσκοπική, ρομποτική και κολπική χειρουργική, καθώς και την αντιμετώπιση της υπογονιμότητας.</p>
        </div>
        <div class="doctor-figure reveal" style="--i:1">
          <img src="assets/giatros.jpg" alt="${attr(clinic.doctor)}" width="825" height="1100" loading="lazy" decoding="async" />
          <figcaption><strong>${esc(clinic.doctor)}</strong><span>${esc(clinic.role)}</span></figcaption>
        </div>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Σπουδές &amp; Μετεκπαίδευση</p>
          <h2>Ακαδημαϊκή πορεία</h2>
        </div>
        <div class="timeline">
          ${bio.map((item, index) => `<article class="reveal" style="--i:${index}"><span>${num(index)}</span><p>${esc(item)}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Κλινικό έργο</p>
          <h2>Στιγμιότυπα από το χειρουργείο</h2>
        </div>
        <div class="collage">
          ${galleryGrid()}
        </div>
      </div>
    </section>
    ${cta}
  </main>
  ${footer()}`);
}

function servicesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Υπηρεσίες — ${clinic.name}`,
    itemListElement: services.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "MedicalProcedure", name },
    })),
  };
  out("ypiresies.html", `${head(`Υπηρεσίες | ${clinic.name}`, `Γυναικολογικές υπηρεσίες: ${services.join(", ")}.`, "ypiresies.html", [itemList, breadcrumb("Υπηρεσίες", "ypiresies.html")])}
  ${header("services")}
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Υπηρεσίες</p>
        <h1>Γυναικολογικές υπηρεσίες</h1>
        <p>Σύγχρονη, επιστημονικά τεκμηριωμένη και ανθρώπινη προσέγγιση, με σεβασμό στις ανάγκες και τις επιθυμίες κάθε γυναίκας.</p>
        <ul class="chip-nav">
          ${serviceGroups.map((group) => `<li><a href="#${group.slug}">${esc(group.title)}</a></li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section-marble">
      <div class="container">
        ${serviceGroups
          .map(
            (group, groupIndex) => `<div class="service-block" id="${group.slug}">
          <div class="section-head section-head-center reveal">
            <p class="eyebrow">${num(groupIndex)} · Τομέας</p>
            <h2>${esc(group.title)}</h2>
            <p class="lead">${esc(group.lead)}</p>
          </div>
          <div class="service-grid">
            ${group.items.map((item, index) => serviceCard(item, index)).join("\n            ")}
          </div>
        </div>`,
          )
          .join("\n        ")}
      </div>
    </section>
    ${cta}
  </main>
  ${footer()}`);
}

function contact() {
  out("epikoinonia.html", `${head(`Επικοινωνία | ${clinic.name}`, `${clinic.address}. Τηλέφωνο ${clinic.phone}, email ${clinic.email}. ${clinic.hours}.`, "epikoinonia.html", [breadcrumb("Επικοινωνία", "epikoinonia.html")])}
  ${header("contact")}
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Επικοινωνία</p>
        <h1>Κλείστε ραντεβού</h1>
        <p>${esc(clinic.hours)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container contact-layout">
        <div class="contact-list">
          <div class="reveal" style="--i:0"><span>Ιατρός</span><strong>${esc(clinic.doctor)}</strong></div>
          <div class="reveal" style="--i:1"><span>Ειδικότητα</span><strong>${esc(clinic.roleEl)}</strong></div>
          <div class="reveal" style="--i:2"><span>Τηλέφωνο</span><a href="tel:${clinic.phoneHref}">${esc(clinic.phone)}</a></div>
          <div class="reveal" style="--i:3"><span>Email</span><a href="mailto:${clinic.email}">${esc(clinic.email)}</a></div>
          <div class="reveal" style="--i:4"><span>Διεύθυνση</span><a href="${clinic.maps}" target="_blank" rel="noopener noreferrer">${esc(clinic.address)}</a></div>
          <div class="reveal" style="--i:5"><span>Ωράριο</span><strong>Τρίτη, Πέμπτη, Παρασκευή 17:00–21:00</strong></div>
          <div class="reveal" style="--i:6"><span></span><strong>Σάββατο 10:00–14:00</strong></div>
        </div>
        <aside class="contact-aside reveal" style="--i:2">
          <h2>Άμεση επικοινωνία</h2>
          <p>Καλέστε μας ή στείλτε email και θα επικοινωνήσουμε μαζί σας για το ραντεβού σας.</p>
          <div class="cta-actions">
            <a href="tel:${clinic.phoneHref}" class="btn btn-primary magnetic">Καλέστε ${esc(clinic.phone)}</a>
            <a href="mailto:${clinic.email}" class="btn btn-ghost magnetic">Στείλτε email</a>
          </div>
          <a class="text-link arrow-link" href="${clinic.maps}" target="_blank" rel="noopener noreferrer">Οδηγίες στον χάρτη</a>
        </aside>
      </div>
    </section>
  </main>
  ${footer()}`);
}

function sitemap() {
  out("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, priority]) => `  <url><loc>${BASE}/${path}</loc><lastmod>${UPDATED}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`).join("\n")}
</urlset>`);
}

function robots() {
  out("robots.txt", `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml`);
}

home();
doctor();
servicesPage();
contact();
sitemap();
robots();
