document.addEventListener("DOMContentLoaded", () => {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroSection = document.querySelector("header.hero");
  const heroContent = document.querySelector(".hero-content");
  const heroHeading = document.querySelector(".hero-copy h1");
  const heroLead = document.querySelector(".hero-copy .lead");
  const heroButtons = document.querySelectorAll(".hero-actions a");
  const heroPanel = document.querySelector(".hero-panel");
  const revealItems = document.querySelectorAll(".reveal");
  const duration = reducedMotionQuery.matches ? 0 : 600;
  const transitionValue = reducedMotionQuery.matches ? "none" : `opacity ${duration}ms ease, transform ${duration}ms ease`;

  const revealHeroContent = () => {
    if (!heroContent && !heroPanel && !heroHeading && !heroLead && !heroButtons.length) {
      return;
    }

    const initialState = (element, delay = 0) => {
      if (!element) {
        return;
      }

      element.style.opacity = "0";
      element.style.transform = "translateY(24px)";
      element.style.transition = `${transitionValue} ${delay}ms`;
    };

    initialState(heroContent);
    initialState(heroHeading);
    initialState(heroLead);
    initialState(heroPanel);

    heroButtons.forEach((button, index) => {
      initialState(button, index * 120);
    });

    window.requestAnimationFrame(() => {
      if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      }

      if (heroHeading) {
        heroHeading.style.opacity = "1";
        heroHeading.style.transform = "translateY(0)";
      }

      if (heroLead) {
        heroLead.style.opacity = "1";
        heroLead.style.transform = "translateY(0)";
      }

      if (heroPanel) {
        heroPanel.style.opacity = "1";
        heroPanel.style.transform = "translateY(0)";
      }

      heroButtons.forEach((button, index) => {
        window.requestAnimationFrame(() => {
          button.style.opacity = "1";
          button.style.transform = "translateY(0)";
        });
      });
    });
  };

  const createScrollIndicator = () => {
    if (!heroSection || document.querySelector(".scroll-indicator")) {
      return;
    }

    const indicator = document.createElement("a");
    indicator.href = "#about";
    indicator.className = "scroll-indicator";
    indicator.setAttribute("aria-label", "Scroll to main content");
    indicator.textContent = "↓";
    indicator.style.position = "absolute";
    indicator.style.left = "50%";
    indicator.style.bottom = "1.5rem";
    indicator.style.transform = "translateX(-50%)";
    indicator.style.display = "inline-flex";
    indicator.style.alignItems = "center";
    indicator.style.justifyContent = "center";
    indicator.style.width = "2.5rem";
    indicator.style.height = "2.5rem";
    indicator.style.borderRadius = "999px";
    indicator.style.border = "1px solid rgba(255,255,255,0.4)";
    indicator.style.color = "#ffffff";
    indicator.style.textDecoration = "none";
    indicator.style.fontSize = "1.125rem";
    indicator.style.opacity = "0.9";
    indicator.style.transition = reducedMotionQuery.matches ? "none" : "transform 350ms ease, opacity 350ms ease";
    indicator.style.zIndex = "2";
    indicator.classList.add("is-visible");

    heroSection.style.position = "relative";
    heroSection.appendChild(indicator);
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(24px)";
    item.style.transition = transitionValue;

    if (reducedMotionQuery.matches) {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
      return;
    }

    revealObserver.observe(item);
  });

  revealHeroContent();
  createScrollIndicator();
});
