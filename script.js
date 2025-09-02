function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the selected tab
    setTimeout(() => {
        const selectedTab = document.querySelector(`.${tabName}.tab`);
        if (selectedTab) {
            selectedTab.classList.add('active');

            // Trigger animation for academic qualification section
            if (tabName === 'About') {
                document.querySelectorAll('.info-section').forEach(section => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                    // Animate after a short delay
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 100);
                });
            }
        }
    }, 100);

    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Enhanced resume download function
function handleResumeClick(event) {
    event.preventDefault(); // Prevent default link behavior
    const resumeUrl = event.currentTarget.href;

    // Open the resume in a new tab
    window.open(resumeUrl, '_blank');

    // Trigger the download
    const downloader = document.createElement('a');
    downloader.href = resumeUrl;
    downloader.setAttribute('download', 'Sushil-Yadav-Resume.pdf');
    downloader.style.display = 'none';

    document.body.appendChild(downloader);
    downloader.click();
    document.body.removeChild(downloader);
}

// Enhanced calendar download function
function handleCalendarClick(event) {
    event.preventDefault(); // Prevent default link behavior
    const calendarUrl = event.currentTarget.href;

    // Open the calendar in a new tab
    window.open(calendarUrl, '_blank');

    // Trigger the download
    const downloader = document.createElement('a');
    downloader.href = calendarUrl;
    downloader.setAttribute('download', 'Calendar-2082.pdf');
    downloader.style.display = 'none';

    document.body.appendChild(downloader);
    downloader.click();
    document.body.removeChild(downloader);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  showTab('Home');
  
  // Setup audio player neon effects
  const audioPlayer = document.getElementById('audio-player');
  const audioContainer = document.querySelector('.audio-player');
  if (audioPlayer && audioContainer) {
    audioPlayer.addEventListener('play', () => audioContainer.classList.add('neon'));
    audioPlayer.addEventListener('pause', () => audioContainer.classList.remove('neon'));
    audioPlayer.addEventListener('ended', () => audioContainer.classList.remove('neon'));
  }
  
  // Initialize FAQ functionality
  initializeFAQ();
  
  // Initialize form validation
  initializeForm();
  
  // Add scroll animations
  initializeScrollAnimations();
});

// Audio player controls
function playAudio() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) {
    audioPlayer.play().catch(error => {
      console.log('Audio play failed:', error);
    });
  }
}

function pauseAudio() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) audioPlayer.pause();
}

function restartAudio() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) {
    audioPlayer.currentTime = 0;
    audioPlayer.play().catch(error => {
      console.log('Audio restart failed:', error);
    });
  }
}

// Enhanced date and time display
function updateDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const dayNum = String(now.getDate()).padStart(2, '0');
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[now.getDay()];
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  const dateElement = document.querySelector('.date');
  const timeElement = document.querySelector('.time');

  if (dateElement) dateElement.textContent = `Date: ${year}/${month}/${dayNum}`;
  if (timeElement) timeElement.textContent = `Day: ${dayName} ${time}`;
}

// Update date/time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Enhanced contact form handling
function initializeForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-button');
    
    // Update UI for loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    status.textContent = "Sending your message...";
    status.style.color = "var(--primary)";
    
    const now = new Date();
    
    const data = {
      date: formatDate(now),
      day: formatDay(now),
      time: formatTime(now),
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      reason: form.reason.value,
      message: form.message.value
    };
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbywsGES4HEDb3Sl3W6spsGr2niDEtuts9-Rq1nzszbR94BXwcF6dlB3dS3AVtgre9Tluw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      status.textContent = "✅ Thank you! Your message has been sent successfully.";
      status.style.color = "#22c55e";
      form.reset();
      
      // Show success animation
      showNotification('Message sent successfully!', 'success');
      
    } catch (error) {
      status.textContent = "❌ Sorry, there was an error. Please try again later.";
      status.style.color = "var(--accent)";
      showNotification('Error sending message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }
  });
}

// Date formatting helpers
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

function formatDay(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

// Enhanced FAQ functionality
function initializeFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
        }
      });
      
      // Toggle current item
      faqItem.classList.toggle('active');
    });
  });
}

// Enhanced typewriter effect
// Enhanced typewriter effect with adjustable speeds
const typewriterText = document.getElementById('typewriter-text');
const phrases = [
    'Software Engineering Student',
    'Web Developer',
    'UI/UX Designer',
    'PHP Programmer',
    'Database Programmer',
    'Python Programmer',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Timing configuration (adjust these values as needed)
const TYPING_SPEED = 100;        // Speed of typing (ms per character)
const DELETING_SPEED = 50;       // Speed of deleting (ms per character)
const PAUSE_AFTER_FULL = 800;   // Pause after typing a full phrase (ms)
const PAUSE_BEFORE_NEXT = 400;   // Pause before typing the next phrase (ms)

function typeEffect() {
    if (!typewriterText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typewriterText.textContent = currentPhrase.slice(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), PAUSE_AFTER_FULL);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, PAUSE_BEFORE_NEXT);
        return;
    }

    const typingSpeed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    setTimeout(typeEffect, typingSpeed);
}

// Start the typewriter effect
typeEffect();




// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : 'var(--primary)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 500;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.info-section, .gallery-item, .project-card, .mentor-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Mobile navigation toggle
function toggleMobileNav() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('mobile-open');
}

// Add mobile nav functionality
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }
});

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
  if (e.target.matches('[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      
      img.onload = () => {
        img.style.opacity = '1';
      };
    }
  });
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or FAQs
    document.querySelectorAll('.faq-item.active').forEach(item => {
      item.classList.remove('active');
    });
  }
});

// Performance optimization: Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Add smooth page transitions
let isTransitioning = false;

function smoothTransition(callback) {
  if (isTransitioning) return;
  
  isTransitioning = true;
  document.body.style.opacity = '0.8';
  
  setTimeout(() => {
    callback();
    document.body.style.opacity = '1';
    isTransitioning = false;
  }, 200);
}

// Enhanced error handling
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  // Could show user-friendly error message here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});


// to expand the mentors profile
function showMoreMentors() {
    const mentorsGrid = document.querySelector('.mentors-grid');
    mentorsGrid.classList.toggle('expanded');

    const moreButton = document.querySelector('.btn-more');
    if (mentorsGrid.classList.contains('expanded')) {
        moreButton.textContent = 'Show Less';
    } else {
        moreButton.textContent = 'More';
    }
}



// link protection with password
document.addEventListener('DOMContentLoaded', () => {
    const protectedLinks = document.querySelectorAll('.protected-link[data-protected="true"]');
    const modal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-password');
    const cancelButton = document.getElementById('cancel-password');
    let currentLink = null;

    // Open modal when a protected link is clicked
    protectedLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            currentLink = link; // Store the current link
            modal.style.display = 'flex'; // Show the modal
        });
    });

    // Handle password submission
    submitButton.addEventListener('click', () => {
        const password = passwordInput.value;
        const correctPassword = 'Sushil@4265'; // Set your password here

        if (password === correctPassword) {
            modal.style.display = 'none'; // Hide the modal
            passwordInput.value = ''; // Clear the input
            window.open(currentLink.href, '_blank'); // Redirect to the link
        } else {
            showNotification('Incorrect password. Access denied.');
        }
    });

    // Handle modal cancellation
    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        passwordInput.value = ''; // Clear the input
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            passwordInput.value = '';
        }
    });
});




// Function to show a notification
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    // Set the message
    notificationMessage.textContent = message;

    // Show the notification
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // Hide the notification after the specified duration
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }, duration);
}

// Example usage in the password modal logic
document.addEventListener('DOMContentLoaded', () => {
    const protectedLinks = document.querySelectorAll('.protected-link[data-protected="true"]');
    const modal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-password');
    const cancelButton = document.getElementById('cancel-password');
    let currentLink = null;

    // Open modal when a protected link is clicked
    protectedLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            currentLink = link; // Store the current link
            modal.style.display = 'flex'; // Show the modal
        });
    });

    // Handle password submission
    submitButton.addEventListener('click', () => {
        const password = passwordInput.value;
        const correctPassword = 'yourpassword'; // Set your password here

        if (password === correctPassword) {
            modal.style.display = 'none'; // Hide the modal
            passwordInput.value = ''; // Clear the input
            window.open(currentLink.href, '_blank'); // Redirect to the link
        } else {
            showNotification('Incorrect password. Access denied.');
        }
    });

    // Handle modal cancellation
    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        passwordInput.value = ''; // Clear the input
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            passwordInput.value = '';
        }
    });
});

// Function to show a notification
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    // Set the message
    notificationMessage.textContent = message;

    // Show the notification
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // Hide the notification after the specified duration
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }, duration);
}




// Expand Family Bonds section
function showMoreBonds() {
    const bondsGrid = document.querySelector('.bonds-grid');
    bondsGrid.classList.toggle('expanded');

    const moreButton = document.querySelector('.btn-more[onclick="showMoreBonds()"]');
    if (bondsGrid.classList.contains('expanded')) {
        moreButton.textContent = 'Show Less';
    } else {
        moreButton.textContent = 'More';
    }
}


// Expand Friends section
function showMoreFriends() {
    const friendsGrid = document.querySelector('.friends-grid');
    friendsGrid.classList.toggle('expanded');

    const moreButton = document.querySelector('.btn-more[onclick="showMoreFriends()"]');
    if (friendsGrid.classList.contains('expanded')) {
        moreButton.textContent = 'Show Less';
    } else {
        moreButton.textContent = 'More';
    }
}



    // Security Reason
    // Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
    }
});

// Attempt to block developer tools
(function () {
    const devtools = /./;
    devtools.toString = function () {
        throw new Error("DevTools blocked!");
    };
    console.log('%c', devtools);
})();