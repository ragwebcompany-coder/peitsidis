// Δρ. Νικόλαος Πεϊτσίδης — κοινή συμπεριφορά UI
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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

  /* ---------- Header shadow + scroll progress + parallax ---------- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".scroll-progress span");
  var parallaxEls = [].slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;

  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle("scrolled", y > 24);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--p", max > 0 ? Math.min(y / max, 1) : 0);
    }

    if (!reduceMotion && parallaxEls.length && y < window.innerHeight * 1.6) {
      parallaxEls.forEach(function (el) {
        var depth = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.setProperty("--py", (y / 100) * depth + "px");
      });
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

  /* ---------- Counters ---------- */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = [].slice.call(document.querySelectorAll(".reveal, .steps li"));
  var counters = [].slice.call(document.querySelectorAll(".count"));

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    counters.forEach(runCounter);
  }

  if (reduceMotion || location.hash === "#showall" || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          if (entry.target.classList.contains("count")) runCounter(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.concat(counters).forEach(function (el) { io.observe(el); });

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

  if (reduceMotion) return;

  /* ---------- Spotlight στις κάρτες ---------- */
  if (finePointer) {
    document.querySelectorAll(".spotlight").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - rect.left + "px");
        card.style.setProperty("--my", e.clientY - rect.top + "px");
      });
    });

    /* ---------- Tilt 3D ---------- */
    document.querySelectorAll(".tilt").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        if (el.classList.contains("reveal") && !el.classList.contains("in")) return;
        var rect = el.getBoundingClientRect();
        var rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        var ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });

    /* ---------- Magnetic buttons ---------- */
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.18;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        btn.style.transform = "translate(" + x + "px, " + y + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });
  }
})();
