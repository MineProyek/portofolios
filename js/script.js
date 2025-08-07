// ==========================================
// FUTURISTIC NEON PORTFOLIO - ADVANCED ANIMATIONS
// ==========================================

// ==========================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem("theme") || "light";
body.classList.toggle("dark-mode", savedTheme === "dark");

// Theme toggle event listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const currentTheme = body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);

    // Update icon
    const icon = themeToggleBtn.querySelector("i");
    if (icon) {
      icon.className = currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  });
}

// ==========================================
// MOBILE NAVIGATION TOGGLE
// ==========================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const scrollElements = document.querySelectorAll(
  ".section, .hero-content, .portfolio-card"
);

const elementInView = (el, dividend = 1.25) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scroll-reveal", "active");
};

const hideScrollElement = (element) => {
  element.classList.remove("active");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// Initial call
handleScrollAnimation();

// ==========================================
// GLOWING HOVER EFFECTS
// ==========================================
// Removed conflicting JS hover effects on nav-link to avoid conflicts with CSS

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      alert("Mohon isi semua field yang diperlukan!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Mohon masukkan email yang valid!");
      return;
    }

    alert("Pesan berhasil dikirim! Terima kasih telah menghubungi saya.");
    contactForm.reset();
  });
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==========================================
// ACTIVE NAVIGATION BUTTON MANAGEMENT
// ==========================================
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section, .hero");

// Function to remove active class from all nav links
function removeActiveClass() {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
}

// Function to add active class to current nav link
function addActiveClass(link) {
  removeActiveClass();
  link.classList.add("active");
}

// Handle click events on navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Add active class to clicked link
      addActiveClass(this);

      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Handle scroll-based active state detection
function updateActiveNavOnScroll() {
  let current = "";
  const scrollPosition = window.scrollY + 100; // Offset for better accuracy

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // Handle edge case for bottom of page
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 100
  ) {
    current = "contact";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}

// Throttled scroll event listener
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(updateActiveNavOnScroll, 50);
});

// Initial call to set active state on page load
window.addEventListener("load", () => {
  updateActiveNavOnScroll();
});

// ==========================================
// CONSOLE LOG SIGNATURE
// ==========================================
console.log(`
╔═══════════════════════════════════════╗
║    Radyan Roy - Junior Web Developer  ║
║    Futuristic Neon Portfolio v2.0     ║
╚═══════════════════════════════════════╝
`);

// ==========================================
// FORM LINK
// ==========================================
const btn = document.getElementById("submit-btn");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "service_kufbma9";
  const templateID = "template_lrz58mg";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      alert("Sent!");
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});
