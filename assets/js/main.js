document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const statElements = Array.from(
    document.querySelectorAll(".hero-stat .stat-number, .metric strong, .stat-card strong, .stats-grid strong")
  );

  if (!statElements.length) {
    return;
  }

  const formatNumber = (value, decimalPlaces) => new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimalPlaces || 0,
  }).format(value);

  const animateValue = (element) => {
    if (element.dataset.animated === "true") {
      return;
    }

    const rawValue = element.textContent.trim();
    const match = rawValue.match(/([-+]?\d+(?:[.,]\d+)?(?:\.\d+)?)/);

    if (!match) {
      element.dataset.animated = "true";
      return;
    }

    const numericValue = Number(match[0].replace(/,/g, ""));
    const prefix = rawValue.slice(0, match.index).trim();
    const suffix = rawValue.slice(match.index + match[0].length).trim();
    const decimalPlaces = match[0].includes(".") ? match[0].split(".")[1].length : 0;
    const duration = reducedMotionQuery.matches ? 0 : 1200;

    if (duration === 0) {
      element.textContent = `${prefix}${formatNumber(numericValue, decimalPlaces)}${suffix}`.trim();
      element.dataset.animated = "true";
      return;
    }

    const startTime = performance.now();
    const updateValue = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * easedProgress;
      element.textContent = `${prefix}${formatNumber(currentValue, decimalPlaces)}${suffix}`.trim();

      if (progress < 1) {
        window.requestAnimationFrame(updateValue);
      } else {
        element.textContent = `${prefix}${formatNumber(numericValue, decimalPlaces)}${suffix}`.trim();
        element.dataset.animated = "true";
      }
    };

    window.requestAnimationFrame(updateValue);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  statElements.forEach((element) => {
    if (reducedMotionQuery.matches) {
      animateValue(element);
      return;
    }

    observer.observe(element);
  });
});
