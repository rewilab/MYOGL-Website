(function () {
  var carousel = document.querySelector("[data-png-identity-carousel]");

  if (!carousel) {
    return;
  }

  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".png-identity-slide"));
  var indicators = Array.prototype.slice.call(carousel.querySelectorAll(".png-identity-indicator"));
  var intervalMs = 5000;
  var currentIndex = 0;
  var timerId = null;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!slides.length) {
    return;
  }

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    indicators.forEach(function (indicator, indicatorIndex) {
      var isActive = indicatorIndex === currentIndex;
      indicator.classList.toggle("is-active", isActive);
      if (isActive) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });
  }

  function stopRotation() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function startRotation() {
    stopRotation();

    if (slides.length < 2 || document.hidden || reducedMotion.matches) {
      return;
    }

    timerId = window.setInterval(function () {
      showSlide(currentIndex + 1);
    }, intervalMs);
  }

  indicators.forEach(function (indicator) {
    indicator.addEventListener("click", function () {
      var targetIndex = Number(indicator.getAttribute("data-slide-to"));

      if (Number.isNaN(targetIndex)) {
        return;
      }

      showSlide(targetIndex);
      startRotation();
    });
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopRotation();
      return;
    }

    startRotation();
  });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", startRotation);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(startRotation);
  }

  showSlide(0);
  startRotation();
})();
