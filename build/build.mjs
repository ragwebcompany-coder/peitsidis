import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { education, licenses, career, skills, conferences, presentations, publications } from "./cv.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Ο πελάτης δεν έχει ακόμη domain. Άλλαξε μόνο εδώ όταν κατοχυρωθεί.
const BASE = "https://peitsidis.gr";
const UPDATED = "2026-11-02";

const clinic = {
  name: "Δρ. Νικόλαος Πεϊτσίδης",
  shortName: "Νικόλαος Πεϊτσίδης",
  brandTop: "Δρ. Νικόλαος",
  brandSub: "Πεϊτσίδης",
  doctor: "Δρ. Νικόλαος Πεϊτσίδης, MD, MSc, MIGS, PhD",
  specialty: "Γυναικολόγος",
  role: "Obstetrician-Gynecologist",
  roleEl: "Μαιευτήρας – Χειρουργός Γυναικολόγος Αναπαραγωγής",
  slogan: "Από το θαύμα της σύλληψης… στο δώρο της Γέννησης.",
  sloganSub: "Μαζί σε κάθε στάδιο της μητρότητας!",
  phone: "+30 697 841 0100",
  phoneHref: "+306978410100",
  email: "nickpeits@windowslive.com",
  city: "Πολίχνη Θεσσαλονίκης",
  street: "Γράμμου 3 (Πλατεία Μετεώρων)",
  postalCode: "56532",
  address: "Γράμμου 3 (Πλατεία Μετεώρων), Πολίχνη Θεσσαλονίκης 565 32",
  hours: "Τρίτη, Πέμπτη, Παρασκευή 17:00–21:00 · Σάββατο 10:00–14:00",
  hoursShort: "Τρ, Πε, Πα 17:00–21:00 · Σα 10:00–14:00",
  availability: "Τρίτη, Πέμπτη, Παρασκευή & Σάββατο",
  maps: "https://maps.app.goo.gl/PjHjvuGM3FMqLaKS8",
  mapEmbed: "https://www.google.com/maps?q=" + encodeURIComponent("Γράμμου 3, Πολίχνη, Θεσσαλονίκη") + "&output=embed",
};

// Κείμενα του γιατρού (10/2026)
const welcome =
  "Σας καλωσορίζουμε στον διαδικτυακό τόπο του Μαιευτήρα – Χειρουργού Γυναικολόγου Αναπαραγωγής Δρ Νικολάου Πεϊτσίδη. Σκοπός μας είναι η σωστή και υπεύθυνη ενημέρωση σε συχνά ερωτήματα που σας απασχολούν, καθώς και η παροχή συμβουλών σε όλο το φάσμα της σύγχρονης Μαιευτικής και Γυναικολογίας.";
const care =
  "Ολοκληρωμένη Μαιευτική και Γυναικολογική φροντίδα, σχεδιασμένη με ασφάλεια και ενσυναίσθηση για εσάς και το μωρό σας.";

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

// Σύντομο βιογραφικό — κείμενο του γιατρού (Οκτώβριος 2026)
const shortBioTags = [
  "Γονιμότητα",
  "Σύγχρονη Μαιευτική και Γυναικολογία",
  "Υστεροσκόπηση",
  "Λαπαροσκόπηση",
  "Χειρουργική της Αναπαραγωγής",
  "Ενδομητρίωση",
  "Ελάχιστα Επεμβατική Γυναικολογική Χειρουργική",
];
const shortBio = [
  "Ο Δρ. Νικόλαος Πεϊτσίδης είναι Μαιευτήρας – Χειρουργός Γυναικολόγος και διδάκτωρ του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης (ΑΠΘ), με βαθμό διδακτορικού «Άριστα με Διάκριση». Αποφοίτησε από την Ιατρική Σχολή του ΑΠΘ, στην οποία εισήχθη μέσω Πανελλαδικών Εξετάσεων με την πρώτη του προσπάθεια. Η κλινική του δραστηριότητα καλύπτει ένα ευρύ φάσμα της σύγχρονης μαιευτικής και γυναικολογίας, με ιδιαίτερο ενδιαφέρον για τη γονιμότητα, τη διερεύνηση της υπογονιμότητας και την αναπαραγωγική ιατρική.",
  "Εξειδικεύτηκε στο Bethesda Krankenhaus Duisburg της Γερμανίας, με ιδιαίτερη έμφαση στη χειρουργική της αναπαραγωγής και τη χειρουργική αντιμετώπιση της ενδομητρίωσης. Η εκπαίδευσή του περιλάμβανε επίσης την υστεροσκοπική, λαπαροσκοπική και ρομποτική χειρουργική, καθώς και τη γυναικολογική ογκολογία και την ουρογυναικολογία.",
  "Στη συνέχεια, εργάστηκε επί δύο έτη στο Κέντρο Αναπαραγωγικής Ιατρικής και Γενετικής «Assisting Nature». Ασχολείται με τη διερεύνηση της υπογονιμότητας, την υστεροσκόπηση, τη διάγνωση και αντιμετώπιση ενδομήτριων παθολογιών, όπως οι ενδομητρικοί πολύποδες, τα ινομυώματα της μήτρας, τη λαπαροσκόπηση και την ελάχιστα επεμβατική γυναικολογική χειρουργική, καθώς και τη φαρμακευτική και χειρουργική αντιμετώπιση της ενδομητρίωσης. Παράλληλα, ασχολείται με τη γυναικολογική υπερηχογραφία, την παθολογία του τραχήλου της μήτρας, την κολποσκόπηση και την πρόληψη των γυναικολογικών νοσημάτων. Συνεργάζεται με ιδιωτικές κλινικές και κέντρα υποβοηθούμενης αναπαραγωγής στη Θεσσαλονίκη.",
  "Είναι κάτοχος μεταπτυχιακού τίτλου σπουδών στη χειρουργική της ελάσσονος πυέλου και του περινέου, με βαθμό Άριστα 10, καθώς και διπλώματος της Ελληνικής Σχολής Μαστολογίας, την οποία ολοκλήρωσε επιτυχώς κατόπιν εξετάσεων.",
  "Το επιστημονικό του έργο περιλαμβάνει πολυάριθμες δημοσιεύσεις σε έγκριτα διεθνή ιατρικά περιοδικά, καθώς και συμμετοχή σε επιστημονικά συνέδρια και παρουσίαση ερευνητικών εργασιών. Τα ερευνητικά του ενδιαφέροντα επικεντρώνονται κυρίως στην υστεροσκόπηση, τις ενδομήτριες παθολογίες, τη γονιμότητα και την υποβοηθούμενη αναπαραγωγή.",
  "Βασικός του στόχος είναι η παροχή σύγχρονης, επιστημονικά τεκμηριωμένης και εξατομικευμένης ιατρικής φροντίδας, με σεβασμό στις ανάγκες κάθε γυναίκας, έμφαση στην πρόληψη και την ουσιαστική επικοινωνία, καθώς και αξιοποίηση των σύγχρονων διαγνωστικών και θεραπευτικών μεθόδων.",
];

// Εικονίδια υπηρεσιών — λεπτές γραμμές, στο ύφος του μαρμάρινου design.
const icons = {
  mikroviomo: '<circle cx="18" cy="18" r="5"/><circle cx="31" cy="27" r="6.5"/><circle cx="16" cy="33" r="3.5"/><path d="M22.5 20.5l3.5 2.5"/><circle cx="34" cy="13" r="2"/>',
  oocyte: '<circle cx="24" cy="24" r="13"/><circle cx="24" cy="24" r="7.5"/><circle cx="26.5" cy="21.5" r="2"/>',
  embryo: '<circle cx="24" cy="24" r="13"/><circle cx="20" cy="20.5" r="4"/><circle cx="28" cy="20.5" r="4"/><circle cx="20" cy="28.5" r="4"/><circle cx="28" cy="28.5" r="4"/>',
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
  kolposkopisi: '<circle cx="20" cy="20" r="9"/><path d="M26.5 26.5 38 38"/><circle cx="20" cy="20" r="3"/>',
  smn: '<path d="M24 8l13 5v10c0 9-6 14-13 17-7-3-13-8-13-17V13Z"/><circle cx="24" cy="23" r="5"/><path d="M24 15v3M24 28v3M16 23h3M29 23h3"/>',
  prp: '<path d="M24 8s11 12 11 20a11 11 0 0 1-22 0c0-8 11-20 11-20Z"/><path d="M18 30h12"/><path d="M24 24v12"/>',
  hrt: '<rect x="12" y="16" width="24" height="16" rx="8"/><path d="M24 16v16"/><circle cx="18" cy="24" r="1.6"/><circle cx="30" cy="24" r="1.6"/>',
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
        "Ανώδυνη υστεροσαλπιγγογραφία HyFoSy",
        "Έλεγχος βατότητας των σαλπίγγων με υπερηχογράφημα και ειδικό αφρό (Hysterosalpingo Foam Sonography): χωρίς ακτινοβολία, γρήγορα και χωρίς πόνο.",
        "ultrasound",
      ],
      [
        "Μικροβίωμα ενδομητρίου και κόλπου",
        "Λήψη δείγματος για τη μελέτη του μικροβιώματος του ενδομητρίου και του κόλπου, στο ιατρείο ή κατά την υστεροσκόπηση, για τον έλεγχο παραγόντων που επηρεάζουν την εμφύτευση.",
        "mikroviomo",
      ],
      [
        "PRP ενδομητρίου",
        "Ενδομήτρια έγχυση πλάσματος πλούσιου σε αιμοπετάλια (PRP) από το αίμα της ίδιας της ασθενούς, για τη βελτίωση του πάχους και της δεκτικότητας του ενδομητρίου σε επαναλαμβανόμενες αποτυχίες εμφύτευσης.",
        "prp",
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
        "Mini IVF",
        "Εξωσωματική γονιμοποίηση με ήπια διέγερση των ωοθηκών και χαμηλότερες δόσεις φαρμάκων, με λιγότερες ενέσεις και μικρότερο κίνδυνο υπερδιέγερσης, για επιλεγμένες περιπτώσεις.",
        "ivf",
      ],
      [
        "Ωοληψία",
        "Συλλογή των ωαρίων μετά τη διέγερση των ωοθηκών, με διακολπική καθοδήγηση υπερήχου και υπό μέθη, σε λίγα μόνο λεπτά.",
        "oocyte",
      ],
      [
        "Εμβρυομεταφορά",
        "Τοποθέτηση του εμβρύου στη μήτρα με λεπτό καθετήρα, υπό υπερηχογραφική καθοδήγηση — μια σύντομη και ανώδυνη διαδικασία.",
        "embryo",
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
        "Κολποσκόπηση και παθολογία τραχήλου",
        "Κολποσκόπηση, διερεύνηση και αντιμετώπιση της παθολογίας του τραχήλου της μήτρας και λήψη HPV DNA test. Συμμετοχή στο Πρόγραμμα Προληπτικού Ελέγχου «Σπύρος Δοξιάδης».",
        "kolposkopisi",
      ],
      [
        "Έλεγχος ΣΜΝ",
        "Έλεγχος για σεξουαλικώς μεταδιδόμενα νοσήματα (ΣΜΝ), με διακριτικότητα, έγκαιρη διάγνωση και θεραπεία.",
        "smn",
      ],
      [
        "Κλινική εξέταση και ψηλάφηση μαστών",
        "Κλινική εξέταση και ψηλάφηση των μαστών, με εκπαίδευση στην αυτοεξέταση. Δίπλωμα Μαστολογίας της Ελληνικής Σχολής Μαστολογίας.",
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
        "Ορμονική Θεραπεία Υποκατάστασης (ΟΘΥ ή HRT)",
        "Η χορήγηση ορμονών (οιστρογόνων και συχνά προγεστερόνης) με στόχο την ανακούφιση από τα συμπτώματα της εμμηνόπαυσης και την προστασία από την οστεοπόρωση.",
        "hrt",
      ],
      [
        "PRP κόλπου",
        "Έγχυση πλάσματος πλούσιου σε αιμοπετάλια (PRP) από το αίμα της ίδιας της ασθενούς στον κόλπο, για την αντιμετώπιση της ξηρότητας, της ατροφίας και της ήπιας ακράτειας.",
        "prp",
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

// Κολλάζ — οι φωτογραφίες του ιατρείου με τα spans του grid.
// Οι λεζάντες είναι όπως τις διόρθωσε ο γιατρός (10/2026). Η φωτογραφία στην
// κονσόλα da Vinci (robotiki-konsola.jpg) αφαιρέθηκε με εντολή του.
// Τα spans γεμίζουν τις 4 στήλες: 1+2+1 · 2+1+1 · 2+2 (το τελευταίο 2 είναι το g-note).
const gallery = [
  ["laparoskopiki-epemvasi", "Ανοιχτό ογκολογικό χειρουργείο με τον καθηγητή Harald Krentel", "g-tall", 450, 1000],
  ["xeirourgeio-omada", "Χειρουργική ομάδα σε γυναικολογική επέμβαση", "g-big", 1000, 1000],
  ["endoskopiki-apeikonisi", "Ελάχιστα επεμβατική λαπαροσκοπική χειρουργική", "g-tall", 451, 1000],
  ["synedrio-omilia", "Ομιλία σε ιατρικό συνέδριο γυναικολογίας", "g-wide", 1000, 750],
  ["pistopoiisi-duisburg", "Πιστοποίηση μετεκπαίδευσης, Bethesda Duisburg", "g-std", 750, 1000],
  ["robotiki-xeirourgiki", "Υστεροσκόπηση για αντιμετώπιση υπογονιμότητας", "g-std", 720, 720],
  ["elachista-epemvatiki", "Ελάχιστα επεμβατική λαπαροσκοπική χειρουργική", "g-wide", 720, 720],
];

// Το 8ο πλακίδιο του κολλάζ: κείμενο αντί για φωτογραφία, ώστε το grid να κλείνει χωρίς κενό.
const galleryNote = {
  value: "100+",
  label: "επεμβάσεις ως Clinical Fellow στην ελάχιστα επεμβατική γυναικολογία, Bethesda Duisburg",
};

const pages = [
  ["index.html", "1.0"],
  ["o-giatros.html", "0.8"],
  ["ypiresies.html", "0.8"],
  ["epikoinonia.html", "0.8"],
];

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  <meta name="theme-color" content="#ffffff" />
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
  <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Commissioner:wght@300;400;500;600&display=swap" rel="stylesheet" />
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
        <span class="brand-text">${esc(clinic.name)}</span>
      </a>
      <button class="nav-toggle" aria-label="Άνοιγμα μενού" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-links">
        <li><a href="index.html"${current("home")}>Αρχική</a></li>
        <li><a href="o-giatros.html"${current("doctor")}>Ο Ιατρός</a></li>
        <li><a href="ypiresies.html"${current("services")}>Υπηρεσίες</a></li>
        <li><a href="epikoinonia.html"${current("contact")}>Επικοινωνία</a></li>
        <li><a href="epikoinonia.html" class="btn btn-nav">Ραντεβού</a></li>
      </ul>
    </nav>
  </header>`;
}

const fIcon = {
  pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.4 7.2 8.6 5.8 8.6-5.8"/>',
  phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.2 1Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${fIcon[name]}</svg>`;

// Footer σε τέσσερις στήλες, όπως στο drtarnanidis.gr: στοιχεία, επικοινωνία, σύνδεσμοι, χάρτης.
function footer() {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <p class="footer-name">${esc(clinic.name)}</p>
        <p>${esc(clinic.roleEl)}</p>
        <p><strong>MD, MSc, MIGS, PhD</strong></p>
      </div>
      <div class="footer-col">
        <h2>Επικοινωνία</h2>
        <ul class="footer-contact">
          <li>${svg("pin")}<a href="${attr(clinic.maps)}" target="_blank" rel="noopener noreferrer">${esc(clinic.address)}</a></li>
          <li>${svg("mail")}<a href="mailto:${attr(clinic.email)}">${esc(clinic.email)}</a></li>
          <li>${svg("phone")}<a href="tel:${attr(clinic.phoneHref)}">${esc(clinic.phone)}</a></li>
          <li>${svg("clock")}<span>${esc(clinic.hoursShort)}</span></li>
        </ul>
      </div>
      <nav class="footer-col footer-links" aria-label="Σύνδεσμοι">
        <h2>Σύνδεσμοι</h2>
        <a href="index.html">Αρχική</a>
        <a href="o-giatros.html">Ο Ιατρός</a>
        <a href="ypiresies.html">Υπηρεσίες</a>
        <a href="epikoinonia.html">Επικοινωνία</a>
      </nav>
      <div class="footer-col">
        <h2>Βρείτε μας στο χάρτη</h2>
        <iframe class="footer-map" src="${attr(clinic.mapEmbed)}" title="Χάρτης — ${attr(clinic.address)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="year">${UPDATED.slice(0, 4)}</span> ${esc(clinic.name)}</p>
      <p>Made by <a href="https://clinicbrain.gr/?utm_source=client-site&amp;utm_medium=footer&amp;utm_campaign=made-by" target="_blank" rel="noopener noreferrer">CLINICBRAIN</a></p>
    </div>
  </footer>
  <script src="main.js" defer></script>
</body>
</html>`;
}

// Οι δώδεκα υπηρεσίες της αρχικής (ίδια λογική με το drtarnanidis.gr)
const featured = [
  "Παρακολούθηση κύησης",
  "Φυσιολογικός τοκετός",
  "Γυναικολογικός έλεγχος — Τεστ ΠΑΠ",
  "Κολποσκόπηση και παθολογία τραχήλου",
  "Έλεγχος ΣΜΝ",
  "Ορμονική Θεραπεία Υποκατάστασης (ΟΘΥ ή HRT)",
  "Κλινική εξέταση και ψηλάφηση μαστών",
  "Οικογενειακός προγραμματισμός και αντισύλληψη",
  "Διερεύνηση υπογονιμότητας ζεύγους",
  "Εξωσωματική γονιμοποίηση (IVF)",
  "Υστεροσκόπηση",
  "Λαπαροσκοπική και ρομποτική χειρουργική",
];

const allItems = serviceGroups.flatMap((group) => group.items);
const itemByName = new Map(allItems.map((item) => [item[0], item]));

const groupOf = new Map(serviceGroups.flatMap((group) => group.items.map(([name]) => [name, group.slug])));

function serviceCard([name, text, icon], index, link = false) {
  return `<article class="service-card reveal" style="--i:${index % 3}">
            <span class="service-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none">${icons[icon]}</svg></span>
            <h3>${esc(name)}</h3>
            <p>${esc(text)}</p>
            ${link ? `<a class="more-link" href="ypiresies.html#${groupOf.get(name)}">Περισσότερα</a>` : ""}
          </article>`;
}

function galleryGrid() {
  const figures = gallery.map(
    ([slug, caption, span, w, h], index) =>
      `<figure class="g-item ${span} reveal" style="--i:${index}">
            <img src="assets/gallery/${slug}.jpg" alt="${attr(caption)}" width="${w}" height="${h}" loading="lazy" decoding="async" />
            <figcaption>${esc(caption)}</figcaption>
          </figure>`,
  );
  figures.push(
    `<div class="g-note g-wide reveal" style="--i:${gallery.length}">
            <strong>${esc(galleryNote.value)}</strong>
            <span>${esc(galleryNote.label)}</span>
          </div>`,
  );
  return figures.join("\n          ");
}

// Χρονολόγιο βιογραφικού: περίοδος αριστερά, τίτλος + παράγραφοι (+ bullets) δεξιά
function cvTimeline(entries) {
  return entries
    .map(
      (entry, index) => `<article class="reveal" style="--i:${Math.min(index, 5)}">
            <span>${esc(entry.period)}</span>
            <div>
              <h3>${esc(entry.title)}</h3>
              ${entry.body.map((text) => `<p>${esc(text)}</p>`).join("\n              ")}
              ${entry.bullets ? `<ul>${entry.bullets.map((text) => `<li>${esc(text)}</li>`).join("")}</ul>` : ""}
            </div>
          </article>`,
    )
    .join("\n          ");
}

function publicationList(items) {
  return items
    .map(
      (pub, index) => `<li class="reveal" style="--i:${Math.min(index, 5)}">
              <strong>${esc(pub.title)}</strong>
              <span class="pub-authors">${esc(pub.authors)}</span>
              ${pub.journal ? `<span class="pub-journal">${esc(pub.journal)}</span>` : ""}
              ${pub.doi ? `<a href="https://doi.org/${attr(pub.doi)}" target="_blank" rel="noopener noreferrer">doi:${esc(pub.doi)}</a>` : ""}
            </li>`,
    )
    .join("\n            ");
}

function home() {
  const description = `${clinic.doctor}, ${clinic.roleEl} στην Πολίχνη Θεσσαλονίκης. Παρακολούθηση κύησης, υπογονιμότητα, ελάχιστα επεμβατική γυναικολογική χειρουργική. Ραντεβού στο ${clinic.phone}.`;
  out("index.html", `${head(`${clinic.name} | Μαιευτήρας Γυναικολόγος Θεσσαλονίκη`, description, "index.html")}
  ${header("home")}
  <main id="main">
    <section class="hero-marble">
      <div class="container hero-card-wrap">
        <div class="hero-card">
          <h1>Από το θαύμα της σύλληψης… <span>στο δώρο της Γέννησης.</span></h1>
          <p class="hero-card-sub">${esc(clinic.sloganSub)}</p>
          <p class="hero-card-role">${esc(clinic.roleEl)}<br /><strong>MD, MSc, MIGS, PhD</strong></p>
        </div>
      </div>
    </section>
    <section class="section section-tint">
      <div class="container welcome">
        <div class="reveal">
          <h2 class="display">Καλώς ήρθατε</h2>
          <p>${esc(welcome)}</p>
          <p class="accent-text">${esc(clinic.slogan)}<br />${esc(clinic.sloganSub)}</p>
          <p>${esc(care)}</p>
        </div>
      </div>
    </section>
    <section class="section section-dark" id="giatros">
      <div class="container split split-reverse">
        <figure class="photo photo-portrait reveal">
          <img src="assets/giatros-grafeio.jpg" alt="${attr(clinic.doctor)}" width="944" height="1133" loading="lazy" decoding="async" />
        </figure>
        <div class="reveal" style="--i:1">
          <p class="eyebrow">Ο Ιατρός</p>
          <h2 class="name-title">Νικόλαος<br />Πεϊτσίδης</h2>
          <p>${esc(shortBio[0])}</p>
          <p>${esc(shortBio[3])}</p>
          <a class="btn" href="o-giatros.html">Περισσότερα</a>
        </div>
      </div>
    </section>
    <section class="section section-tint">
      <div class="container split">
        <div class="reveal">
          <h2 class="display">Μετεκπαίδευση στη Γερμανία</h2>
          <p>${esc(shortBio[1])}</p>
          <a class="btn" href="o-giatros.html#galeria">Περισσότερα</a>
        </div>
        <figure class="photo reveal" style="--i:1">
          <img src="assets/gallery/elachista-epemvatiki.jpg" alt="Ελάχιστα επεμβατική λαπαροσκοπική χειρουργική" width="720" height="720" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
    <section class="section section-marble">
      <div class="container">
        <div class="section-head section-head-center reveal">
          <p class="eyebrow">${esc(clinic.name)}</p>
          <h2 class="display">Υπηρεσίες</h2>
          <p>${esc(care)}</p>
        </div>
        <div class="service-grid">
          ${featured.map((name, index) => serviceCard(itemByName.get(name), index, true)).join("\n          ")}
        </div>
        <p class="center-link"><a class="btn" href="ypiresies.html">Όλες οι υπηρεσίες</a></p>
      </div>
    </section>
  </main>
  ${footer()}`);
}

function doctor() {
  const description = `Βιογραφικό ${clinic.doctor}, ${clinic.roleEl}. Διδάκτωρ ΑΠΘ, MSc Πανεπιστήμιο Θεσσαλίας, μετεκπαίδευση στη ρομποτική και λαπαροσκοπική χειρουργική στη Γερμανία.`;
  out("o-giatros.html", `${head(`${clinic.doctor} | ${clinic.roleEl}`, description, "o-giatros.html", [
    breadcrumb("Ο Ιατρός", "o-giatros.html"),
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: clinic.doctor,
      jobTitle: clinic.roleEl,
      medicalSpecialty: "ObstetricsAndGynecology",
      url: `${BASE}/o-giatros.html`,
      image: `${BASE}/assets/giatros-grafeio.jpg`,
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
        <p class="eyebrow">Ο Ιατρός</p>
        <h1>${esc(clinic.name)}</h1>
        <p>MD, MSc, MIGS, PhD · ${esc(clinic.roleEl)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container split split-top">
        <div class="reveal">
          <p class="eyebrow">Σύντομο βιογραφικό</p>
          <h2 class="display display-sm">Δρ. Νικόλαος Πεϊτσίδης, <span class="nowrap">MD, MSc, MIGS, PhD</span></h2>
          <ul class="bio-tags">
            ${shortBioTags.map((tag) => `<li>${esc(tag)}</li>`).join("\n            ")}
          </ul>
          ${shortBio.map((text) => `<p>${esc(text)}</p>`).join("\n          ")}
        </div>
        <figure class="photo photo-portrait reveal" style="--i:1">
          <img src="assets/giatros-grafeio.jpg" alt="${attr(clinic.doctor)}" width="944" height="1133" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
    <section class="section section-alt" id="viografiko">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Πλήρες βιογραφικό</p>
          <h2>Με μια ματιά</h2>
        </div>
        <ul class="chip-nav cv-nav reveal" style="--i:1">
          <li><a href="#spoudes">Σπουδές</a></li>
          <li><a href="#poreia">Επαγγελματική πορεία</a></li>
          <li><a href="#titloi">Τίτλοι &amp; γλώσσες</a></li>
          <li><a href="#synedria">Συνέδρια</a></li>
          <li><a href="#anakoinoseis">Ανακοινώσεις</a></li>
          <li><a href="#dimosiefseis">Δημοσιεύσεις</a></li>
        </ul>
        <div class="timeline">
          ${bio.map((item, index) => `<article class="reveal" style="--i:${index}"><span>${num(index)}</span><p>${esc(item)}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section" id="spoudes">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Σπουδές &amp; Μετεκπαίδευση</p>
          <h2>Ακαδημαϊκή πορεία</h2>
        </div>
        <div class="timeline timeline-cv">
          ${cvTimeline(education)}
        </div>
      </div>
    </section>
    <section class="section section-alt" id="poreia">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Επαγγελματική απασχόληση</p>
          <h2>Επαγγελματική πορεία</h2>
        </div>
        <div class="timeline timeline-cv">
          ${cvTimeline(career)}
        </div>
      </div>
    </section>
    <section class="section" id="titloi">
      <div class="container cv-grid">
        <div>
          <div class="section-head reveal">
            <p class="eyebrow">Ειδικότητα &amp; άδειες</p>
            <h2>Τίτλοι</h2>
          </div>
          <div class="timeline timeline-cv">
            ${cvTimeline(licenses)}
          </div>
        </div>
        <div>
          <div class="section-head reveal">
            <p class="eyebrow">Ατομικές δεξιότητες</p>
            <h2>Γλώσσες</h2>
          </div>
          <div class="skills">
            ${skills
              .map(
                (group, index) => `<article class="reveal" style="--i:${index}">
              <h3>${esc(group.title)}</h3>
              <ul>${group.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
            </article>`,
              )
              .join("\n            ")}
          </div>
        </div>
      </div>
    </section>
    <section class="section section-alt" id="synedria">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Συνεχιζόμενη εκπαίδευση</p>
          <h2>Συνέδρια &amp; σεμινάρια</h2>
          <p class="lead">${esc(String(conferences.length))} συνέδρια, σεμινάρια και πιστοποιήσεις, από το 2009 έως σήμερα.</p>
        </div>
        <ul class="cv-list">
          ${conferences.map((item, index) => `<li class="reveal" style="--i:${Math.min(index, 5)}">${esc(item)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section" id="anakoinoseis">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Επιστημονικό έργο</p>
          <h2>Προφορικές ανακοινώσεις &amp; συμμετοχές</h2>
        </div>
        <div class="presentations">
          ${presentations
            .map(
              (group, index) => `<article class="reveal" style="--i:${Math.min(index, 5)}">
            <h3>${esc(group.event)}</h3>
            <ul>
              ${group.works.map((work) => `<li><strong>${esc(work.title)}</strong><span>${esc(work.authors)}</span></li>`).join("\n              ")}
            </ul>
          </article>`,
            )
            .join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section section-alt" id="dimosiefseis">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow">Δημοσιεύσεις</p>
          <h2>Δημοσιεύσεις σε επιστημονικά περιοδικά</h2>
          <p class="lead">${esc(String(publications.pubmed.length))} δημοσιεύσεις με ευρετηρίαση στο PubMed και ${esc(String(publications.other.length))} εκτός PubMed.</p>
        </div>
        <h3 class="pub-heading">Εντός PubMed</h3>
        <ol class="pub-list">
          ${publicationList(publications.pubmed)}
        </ol>
        <h3 class="pub-heading">Εκτός PubMed</h3>
        <ol class="pub-list" start="${publications.pubmed.length + 1}">
          ${publicationList(publications.other)}
        </ol>
      </div>
    </section>
    <section class="section section-tint" id="galeria">
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
        <p class="eyebrow">${esc(clinic.name)}</p>
        <h1>Υπηρεσίες</h1>
        <p>${esc(care)}</p>
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
            <a href="tel:${clinic.phoneHref}" class="btn">Καλέστε ${esc(clinic.phone)}</a>
            <a href="mailto:${clinic.email}" class="btn btn-outline">Στείλτε email</a>
          </div>
          <a class="more-link" href="${clinic.maps}" target="_blank" rel="noopener noreferrer">Οδηγίες στον χάρτη</a>
        </aside>
      </div>
      <div class="container">
        <iframe class="contact-map reveal" src="${attr(clinic.mapEmbed)}" title="Χάρτης — ${attr(clinic.address)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
