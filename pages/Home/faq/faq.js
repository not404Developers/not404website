// Initialize FAQ Toggle
function initFaqToggle() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(faqItem => {
        if (faqItem !== item) {
          faqItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });
}
