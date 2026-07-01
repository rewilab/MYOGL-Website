document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-links");

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
});
