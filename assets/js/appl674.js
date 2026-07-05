document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      faqButtons.forEach((item) => {
        item.setAttribute("aria-expanded", "false");
      });

      if (panel) {
        document.querySelectorAll(".faq-answer").forEach((answer) => {
          answer.hidden = true;
        });
      }

      if (!expanded && panel) {
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });
});
