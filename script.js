// Typed effect in hero
const typedTextElement = document.getElementById('typed-text');
const words = [
  "MERN Stack Developer",
  "React Enthusiast",
  "Java & C++ Programmer",
  "Open Source Contributor",
  "Lifelong Learner"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typedTextElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typedTextElement.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
}
type();

// Progress bar animation on scroll with IntersectionObserver
const progressBars = document.querySelectorAll('.progress');

const animateProgressBars = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.style.getPropertyValue('--progress');
      observer.unobserve(bar);
    }
  });
};

const observer = new IntersectionObserver(animateProgressBars, {
  threshold: 0.6
});
progressBars.forEach(bar => observer.observe(bar));

// Smooth scroll on navbar link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// Highlight active navbar link on scroll
const sections = document.querySelectorAll('section, header');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 60;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === section.id) {
          link.classList.add('active');
        }
      });
    }
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Dark mode toggle button logic
const toggleBtn = document.getElementById('dark-mode-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

// Preserve theme preference on reload
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  }
});

// Contact form submit (basic simulation)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = 'red';
    formStatus.textContent = 'Please fill all fields!';
    return;
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.style.color = 'red';
    formStatus.textContent = 'Please enter a valid email!';
    return;
  }

  // Simulate form submission
  formStatus.style.color = 'green';
  formStatus.textContent = 'Thank you for your message! I will get back to you soon.';

  contactForm.reset();
  setTimeout(() => (formStatus.textContent = ''), 5000);
});

// Initialize AOS library
AOS.init({
  duration: 1000,
  once: true,
});
