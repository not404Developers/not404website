document.addEventListener('DOMContentLoaded', function() {
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = [
      document.querySelector('.section-title'),
      document.querySelector('.section-subtitle'),
      ...document.querySelectorAll('.tech-container')
    ];
    
    elements.forEach((element, index) => {
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('animate');
        }
      }
    });
  };

  // Initial check
  animateOnScroll();

  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
});