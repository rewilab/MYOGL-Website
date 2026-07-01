document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-links");
  const siteHeader = document.querySelector(".site-header");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollThreshold = 80;

  const applyStickyState = () => {
    if (!siteHeader) {
      return;
    }

    const isScrolled = window.scrollY > scrollThreshold;
    siteHeader.classList.toggle("scrolled", isScrolled);
    siteHeader.style.position = "sticky";
    siteHeader.style.top = "0";
    siteHeader.style.left = "0";
    siteHeader.style.right = "0";
    siteHeader.style.zIndex = "1000";
    siteHeader.style.transition = reducedMotionQuery.matches
      ? "none"
      : "background-color 300ms ease, box-shadow 300ms ease, backdrop-filter 300ms ease";
    siteHeader.style.backgroundColor = isScrolled ? "#0f172a" : "transparent";
    siteHeader.style.boxShadow = isScrolled ? "0 10px 30px rgba(2, 6, 23, 0.18)" : "none";
    siteHeader.style.backdropFilter = isScrolled ? "blur(14px)" : "none";
  };

  const scheduleStickyState = () => {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(applyStickyState);
      return;
    }

    applyStickyState();
  };

  const handleScroll = () => {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(applyStickyState);
      return;
    }

    applyStickyState();
  };

  if (navLinks.length) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    });
  }

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  applyStickyState();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", scheduleStickyState);

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", applyStickyState);
  }
});
