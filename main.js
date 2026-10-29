// Δρ. Νικόλαος Πεϊτσίδης — κοινή συμπεριφορά UI
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Τρέχον έτος ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Άνοιγμα μενού");
      }
    });
  }

  /* ---------- Header shadow + scroll progress ---------- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".scroll-progress span");
  var ticking = false;

  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--p", max > 0 ? Math.min(y / max, 1) : 0);
    }
  }
  function requestFrame() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onFrame);
    }
  }
  onFrame();
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame, { passive: true });

  /* ---------- Hero slider ---------- */
  var slider = document.querySelector(".hero-slider");
  if (slider) {
    var slides = [].slice.call(slider.querySelectorAll(".slide"));
    var dots = [].slice.call(slider.querySelectorAll(".slider-dots button"));
    var current = 0;
    var timer = null;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
        slide.setAttribute("aria-hidden", i === current ? "false" : "true");
        if (i === current) {
          var img = slide.querySelector("img");
          if (img) img.loading = "eager";
        }
      });
      dots.forEach(function (dot, i) {
        if (i === current) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }
    function restart() {
      if (reduceMotion) return;
      window.clearInterval(timer);
      timer = window.setInterval(function () { show(current + 1); }, 6000);
    }
    var prev = slider.querySelector(".slider-prev");
    var next = slider.querySelector(".slider-next");
    if (prev) prev.addEventListener("click", function () { show(current - 1); restart(); });
    if (next) next.addEventListener("click", function () { show(current + 1); restart(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); restart(); });
    });
    restart();
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = [].slice.call(document.querySelectorAll(".reveal"));

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  if (reduceMotion || location.hash === "#showall" || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });

    // Δικλείδα ασφαλείας: τίποτα δεν μένει κρυμμένο αν κάτι πάει στραβά.
    window.setTimeout(function () {
      revealEls.forEach(function (el) {
        var box = el.getBoundingClientRect();
        if (box.top < window.innerHeight) el.classList.add("in");
      });
    }, 2500);
  }

  /* ---------- Lightbox για το κολλάζ ---------- */
  var items = [].slice.call(document.querySelectorAll(".g-item"));
  if (items.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Προβολή φωτογραφίας");
    box.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Κλείσιμο">&times;</button>' +
      '<div><img alt="" /><p></p></div>';
    document.body.appendChild(box);

    var boxImg = box.querySelector("img");
    var boxText = box.querySelector("p");
    var closeBtn = box.querySelector(".lightbox-close");
    var lastFocus = null;

    function openBox(figure) {
      var img = figure.querySelector("img");
      var caption = figure.querySelector("figcaption");
      if (!img) return;
      lastFocus = figure;
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt || "";
      boxText.textContent = caption ? caption.textContent : "";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function closeBox() {
      box.classList.remove("open");
      document.body.style.overflow = "";
      boxImg.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (figure) {
      figure.setAttribute("tabindex", "0");
      figure.setAttribute("role", "button");
      figure.addEventListener("click", function () { openBox(figure); });
      figure.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openBox(figure);
        }
      });
    });

    closeBtn.addEventListener("click", closeBox);
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target === box.firstElementChild) closeBox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) closeBox();
    });
  }

})();
