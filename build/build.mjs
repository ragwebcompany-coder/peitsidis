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
  appointmentDuration: "30'",
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

const services = [
  "Υπερηχογράφημα μαστών",
  "Παρακολούθηση κύησης και μαιευτικός υπερηχογραφικός έλεγχος",
  "Διερεύνηση υπογονιμότητας ζεύγους",
  "Πρόκληση ωορρηξίας και παρακολούθηση κύκλου",
  "Ενδομήτρια σπερματέγχυση (IUI)",
  "Συμβουλευτική και προετοιμασία για εξωσωματική γονιμοποίηση (IVF)",
  "Αντιμετώπιση πολυκυστικών ωοθηκών (PCOS)",
  "Αντιμετώπιση ενδομητρίωσης",
  "Υστεροσκοπική χειρουργική",
  "Λαπαροσκοπική και ρομποτική γυναικολογική χειρουργική",
  "Αντιμετώπιση διαταραχών περιόδου και εμμηνόπαυσης",
  "Ουρογυναικολογία και προβλήματα ακράτειας",
  "Συμβουλευτική αντισύλληψης και οικογενειακού προγραμματισμού",
];

// Σύντομες ετικέτες για το ticker (τα πλήρη ονόματα είναι πολύ μεγάλα)
const tickerItems = [
  "Ρομποτική Χειρουργική",
  "Λαπαροσκοπική Χειρουργική",
  "Υστεροσκόπηση",
  "Υπογονιμότητα",
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
  ["30", "Λεπτά ανά ραντεβού", "'"],
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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  ${[clinicLd, ...extraLd].map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n  ")}
</head>
<body>`;
}

function header(active) {
  const current = (key) => (active === key ? ' aria-current="page"' : "");
  return `<a class="skip-link" href="#main">Μετάβαση στο περιεχόμενο</a>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>
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
        <p>${esc(clinic.hours)} · διάρκεια ραντεβού ${esc(clinic.appointmentDuration)}</p>
      </div>
      <div class="cta-actions reveal" style="--i:1">
        <a href="tel:${clinic.phoneHref}" class="btn btn-primary magnetic">Καλέστε ${esc(clinic.phone)}</a>
        <a href="mailto:${clinic.email}" class="btn btn-ghost magnetic">Email</a>
      </div>
    </div>
  </section>`;

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
        <span class="orb orb-2" data-parallax="-18"></span>
        <span class="orb orb-3" data-parallax="12"></span>
        <div class="hero-lines"></div>
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
          <p>Κάθε ραντεβού διαρκεί ${esc(clinic.appointmentDuration)}, ώστε να υπάρχει χρόνος για πλήρη εξέταση, ενημέρωση και σχεδιασμό της θεραπείας.</p>
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
    <section class="section section-alt">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Υπηρεσίες</p>
          <h2>Ολοκληρωμένη γυναικολογική φροντίδα</h2>
          <p class="lead">${esc(String(services.length))} υπηρεσίες, από την παρακολούθηση της κύησης και τη γονιμότητα έως την ελάχιστα επεμβατική χειρουργική.</p>
        </div>
        <div class="service-grid">
          ${services.map((service, index) => `<article class="service-card spotlight reveal" style="--i:${index}"><span>${num(index)}</span><h3>${esc(service)}</h3></article>`).join("\n          ")}
        </div>
        <a class="text-link arrow-link" href="ypiresies.html">Όλες οι υπηρεσίες</a>
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
          <li class="reveal" style="--i:1"><span>02</span><h3>Ραντεβού</h3><p>${esc(clinic.hours)} · διάρκεια ${esc(clinic.appointmentDuration)} για κάθε επίσκεψη.</p></li>
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
      </div>
    </section>
    <section class="section">
      <div class="container service-grid service-grid-wide">
        ${services.map((service, index) => `<article class="service-card spotlight reveal" style="--i:${index}"><span>${num(index)}</span><h2>${esc(service)}</h2></article>`).join("\n        ")}
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
        <p>${esc(clinic.hours)} · διάρκεια ραντεβού ${esc(clinic.appointmentDuration)}</p>
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
          <div class="reveal" style="--i:7"><span>Διάρκεια</span><strong>${esc(clinic.appointmentDuration)} ανά ραντεβού</strong></div>
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
