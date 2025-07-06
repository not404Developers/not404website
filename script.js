document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Initialize animations
  initBackgroundAnimations();
  initHeroAnimations();
  initMobileMenu();
  initNavigation();
  initServiceCardsAnimation();
  initModalInteractions();
  initFaqToggle();
}

function initBackgroundAnimations() {
  // Animate floating shapes
  const shapes = document.querySelectorAll('.floating-shape');
  shapes.forEach((shape, index) => {
    // Add random starting positions
    const randomDelay = Math.random() * 5;
    shape.style.animationDelay = `${randomDelay}s`;
  });

  // Animate particles
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDelay = Math.random() * 10;
    const randomDuration = 15 + Math.random() * 30;

    particle.style.left = `${randomX}%`;
    particle.style.top = `${randomY}%`;
    particle.style.animationDuration = `${randomDuration}s`;
    particle.style.animationDelay = `${randomDelay}s`;
  });
}

function initHeroAnimations() {
  // Add staggered animations for hero content
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const ctaButtons = document.querySelector('.cta-buttons');
  const heroImage = document.querySelector('.hero-image');

  if (heroTitle) heroTitle.classList.add('animate');
  if (heroDescription) {
    setTimeout(() => {
      heroDescription.classList.add('animate');
    }, 300);
  }

  if (ctaButtons) {
    setTimeout(() => {
      ctaButtons.classList.add('animate');
    }, 600);
  }

  if (heroImage) {
    setTimeout(() => {
      heroImage.classList.add('animate');
    }, 900);
  }

  // Animate dashboard elements
  const dashboardItems = document.querySelectorAll('.dashboard-item');
  dashboardItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate');
    }, 1200 + index * 100);
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navButtons = document.querySelector('.nav-buttons');

  if (!menuToggle) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');

    if (menuToggle.classList.contains('active')) {
      // Show mobile menu
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.backgroundColor = 'var(--background-dark)';
      navMenu.style.padding = '1rem';
      navMenu.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';

      // Show nav buttons below the menu
      if (navButtons) {
        navButtons.style.display = 'flex';
        navButtons.style.flexDirection = 'column';
        navButtons.style.gap = '0.5rem';
        navButtons.style.marginTop = '1rem';
      }
    } else {
      // Hide mobile menu
      navMenu.style = '';
      if (navButtons) navButtons.style = '';
    }
  });
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-item a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't prevent default - allow navigation to work
      // Only handle active state management

      // Remove active class from all nav items
      document.querySelectorAll('.nav-menu .nav-item').forEach(item => item.classList.remove('active'));

      // Add active class to clicked link's parent nav-item
      link.parentElement.classList.add('active');
    });
  });

  // Add hover effects for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
      if (button.classList.contains('primary-btn') || button.classList.contains('demo-btn')) {
        button.style.boxShadow = '0 0 30px var(--blue-glow)';
      }
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      if (button.classList.contains('primary-btn') || button.classList.contains('demo-btn')) {
        button.style.boxShadow = '0 0 20px var(--blue-glow)';
      }
    });
  });
}

function init() {
  this.bindEvents();
  this.initializeAnimations();
}

function bindEvents() {
  // Navigation click events
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = item.dataset.page;
      if (targetPage && targetPage !== this.currentPage && !this.isAnimating) {
        this.navigateToPage(targetPage);
      }
    });
  });

  // Toggle switches
  const toggleSwitches = document.querySelectorAll('.toggle-switch');
  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  // Task checkboxes
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checked');
    });
  });

  // Card hover effects
  this.initializeCardEffects();
}

function initializeAnimations() {
  // Add staggered animation to cards on page load
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate-in');
  });
}

function navigateToPage(targetPage) {
  if (this.isAnimating) return;

  this.isAnimating = true;

  // Update navigation active state
  this.updateNavigation(targetPage);

  // Get current and target pages
  const currentPageElement = document.getElementById(this.currentPage);
  const targetPageElement = document.getElementById(targetPage);

  // Animate out current page
  currentPageElement.classList.add('slide-out');

  // Animate in target page after a delay
  setTimeout(() => {
    currentPageElement.classList.remove('active', 'slide-out');
    targetPageElement.classList.add('active');

    // Animate cards in the new page
    this.animatePageCards(targetPageElement);

    this.currentPage = targetPage;

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }, 150);
}

function updateNavigation(targetPage) {
  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to target nav item
  const targetNavItem = document.querySelector(`[data-page="${targetPage}"]`);
  if (targetNavItem) {
    targetNavItem.classList.add('active');
  }
}

function animatePageCards(pageElement) {
  const cards = pageElement.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

function initializeCardEffects() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Service Cards Animation
function initServiceCardsAnimation() {
  const serviceCards = document.querySelectorAll('.service-card');

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('appear');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  serviceCards.forEach(card => {
    // Add initial hidden state class
    card.classList.add('pre-animation');
    observer.observe(card);

    // Add mousemove effect for 3D tilt
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      card.style.transform = `
        perspective(1000px) 
        rotateY(${x * 10}deg) 
        rotateX(${y * -10}deg) 
        translateZ(10px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Parallax for floating shapes
  const shapes = document.querySelectorAll('.floating-shape');
  shapes.forEach(shape => {
    const speed = parseFloat(shape.getAttribute('data-speed') || 0.1);
    shape.style.transform = `translateY(${scrollY * speed}px)`;
  });

  // Parallax for hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
});

// Add loading animation
window.addEventListener('load', () => {
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

  const loadingStyles = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #060b26;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loading-spinner {
            text-align: center;
            color: #f8fafc;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #0ea5e9;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

  const loadingStyleSheet = document.createElement('style');
  loadingStyleSheet.textContent = loadingStyles;
  document.head.appendChild(loadingStyleSheet);

  document.body.appendChild(loadingScreen);

  // Remove loading screen after a delay
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
      loadingStyleSheet.remove();
    }, 500);
  }, 1500);
});

// Add CSS animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    .hero-title.animate {
        animation: fadeInUp 1s ease forwards;
    }
    
    .hero-description.animate {
        animation: fadeInUp 1s ease forwards;
        opacity: 1;
    }
    
    .cta-buttons.animate {
        animation: fadeInUp 1s ease forwards;
        opacity: 1;
    }
    
    .hero-image.animate {
        animation: fadeIn 1s ease forwards;
        opacity: 1;
    }
    
    .dashboard-item.animate {
        animation: fadeIn 0.6s ease forwards;
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

function initModalInteractions() {
  // Open consultation modal
  const consultationBtn = document.getElementById('openConsultationForm');
  if (consultationBtn) {
    consultationBtn.addEventListener('click', () => {
      const modal = document.getElementById('consultationModalOverlay');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
      }
    });
  }

  // Open chat modal
  const chatBtn = document.getElementById('openChatForm');
  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      const modal = document.getElementById('chatModalOverlay');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open

        // Focus on the chat input
        setTimeout(() => {
          const chatInput = modal.querySelector('.chat-input input');
          if (chatInput) chatInput.focus();
        }, 300);
      }
    });
  }

  // Close modals when clicking close button
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-close');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  });

  // Close modals when clicking overlay
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  });

  // Handle chat form submission simulation
  const chatSimulation = document.querySelector('.chat-simulation');
  if (chatSimulation) {
    const chatInput = chatSimulation.querySelector('.chat-input input');
    const sendButton = chatSimulation.querySelector('.send-btn');

    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (!message) return;

      // Create user message
      const userMessageEl = document.createElement('div');
      userMessageEl.className = 'chat-message user';
      userMessageEl.innerHTML = `
        <div class="message-bubble">
          <p>${escapeHtml(message)}</p>
        </div>
      `;

      // Insert before chat input
      chatSimulation.insertBefore(userMessageEl, chatSimulation.querySelector('.chat-input'));

      // Clear input
      chatInput.value = '';

      // Scroll to bottom
      userMessageEl.scrollIntoView({ behavior: 'smooth' });

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponses = [
          "Thank you for your message! A team member will respond shortly.",
          "Hello there! How can our team assist you with your project?",
          "Thanks for reaching out! We'll get back to you as soon as possible.",
          "Great question! Our developers would be happy to discuss this further.",
          "I've noted your inquiry. A specialist from our team will contact you soon."
        ];

        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

        const botMessageEl = document.createElement('div');
        botMessageEl.className = 'chat-message bot';
        botMessageEl.innerHTML = `
          <div class="message-bubble">
            <p>${randomResponse}</p>
          </div>
        `;

        // Insert before chat input
        chatSimulation.insertBefore(botMessageEl, chatSimulation.querySelector('.chat-input'));

        // Scroll to bottom
        botMessageEl.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    };

    if (sendButton) {
      sendButton.addEventListener('click', sendMessage);
    }

    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }

  // Handle consultation form submission
  const consultationForm = document.querySelector('.consultation-form');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // You would normally send form data to your backend here
      // For this demo, we'll just show a success message

      // Collect form data
      const formData = new FormData(consultationForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      // Show success message
      consultationForm.innerHTML = `
        <div class="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
            <circle cx="12" cy="12" r="10" fill="rgba(74, 222, 128, 0.2)" />
            <path fill="#4ade80" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <h4>Thank You!</h4>
          <p>Your consultation request has been submitted successfully. Our team will contact you shortly.</p>
        </div>
      `;

      // Style the success message
      const style = document.createElement('style');
      style.textContent = `
        .success-message {
          text-align: center;
          padding: 20px;
          animation: fadeIn 0.5s ease forwards;
        }
        
        .success-message svg {
          margin-bottom: 15px;
        }
        
        .success-message h4 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: var(--text-primary);
        }
        
        .success-message p {
          color: var(--text-secondary);
        }
      `;
      document.head.appendChild(style);

      // Close the modal after a delay
      setTimeout(() => {
        const modal = document.getElementById('consultationModalOverlay');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling

          // Reset form after hiding
          setTimeout(() => {
            consultationForm.reset();
            // Remove success message and restore form
            // This would be implemented for a real application
          }, 500);
        }
      }, 3000);
    });
  }
}

// Helper function to escape HTML for chat messages
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
