function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show the selected tab
  const selectedTab = document.querySelector(`.${tabName}.tab`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Remove 'active' class from all nav buttons
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add 'active' class to the clicked button
  const activeBtn = Array.from(document.querySelectorAll('nav button'))
    .find(btn => btn.textContent.trim() === tabName);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Auto-play audio and neon effect when Gallery tab is shown
  const audioPlayer = document.getElementById('audio-player');
  const audioContainer = document.querySelector('.audio-container');
  if (tabName === 'Gallery') {
    if (audioPlayer) {
      audioPlayer.play().catch(() => {}); // May require user interaction
      if (audioContainer) audioContainer.classList.add('neon');
    }
  } else {
    if (audioContainer) audioContainer.classList.remove('neon');
    if (audioPlayer) audioPlayer.pause();
  }
}





// On page load, show only the Home tab and set up neon effect listeners
document.addEventListener('DOMContentLoaded', () => {
  showTab('Home');

  // Neon effect only while audio is playing
  const audioPlayer = document.getElementById('audio-player');
  const audioContainer = document.querySelector('.audio-container');
  if (audioPlayer && audioContainer) {
    audioPlayer.addEventListener('play', () => audioContainer.classList.add('neon'));
    audioPlayer.addEventListener('pause', () => audioContainer.classList.remove('neon'));
    audioPlayer.addEventListener('ended', () => audioContainer.classList.remove('neon'));
  }
});

// For Audio Player controls
function playAudio() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) audioPlayer.play();
}

function pauseAudio() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) audioPlayer.pause();
}

function restartAudio() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  }
}





// Date and Time Display at home page
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

  document.querySelector('.date').textContent = `Date: ${year}/${month}/${dayNum}`;
  document.querySelector('.time').textContent = `Day: ${dayName} ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();





// Contact Form Submission at contact tab
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('form-status');
  status.textContent = "Sending...";
  const now = new Date();

  // Format: YYYY/MM/DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  // Format: Wednesday
  function formatDay(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }

  // Format: 04:52 PM
  function formatTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  }

  const date = formatDate(now);
  const day = formatDay(now);
  const time = formatTime(now);

  const data = {
    date: date,
    day: day,
    time: time,
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
    status.textContent = "Thank you! Your message has been sent.";
    form.reset();
  } catch (error) {
    status.textContent = "Sorry, there was an error. Please try again later.";
  }
});





// FAQ Section At Contact Page Tab
document.querySelectorAll('.faq-card-header').forEach(header => {
  header.addEventListener('click', () => {
    const faqCard = header.parentElement;

    // Close all other FAQ cards
    document.querySelectorAll('.faq-card').forEach(card => {
      if (card !== faqCard) {
        card.classList.remove('active');
      }
    });

    // Toggle the clicked FAQ card
    faqCard.classList.toggle('active');
  });
});





// Typewriter Effect for homepage Section
const typewriterText = document.getElementById('typewriter-text');
const phrases = [
  
  'Software Engineering',
  'Website Developer',
  'UI/UX Designer',
  'PHP Programmer',
  'Developer',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  // Update the text content
  typewriterText.textContent = currentPhrase.slice(0, charIndex);

  // Pause at the end of typing or deleting
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => (isDeleting = true), 500); // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length; // Move to the next phrase
  }

  // Adjust typing speed
  const typingSpeed = isDeleting ? 50 : 150;
  setTimeout(typeEffect, typingSpeed);
}

// Start the typewriter effect
typeEffect();