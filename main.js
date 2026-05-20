// main.js

// =============================================
// 1. Wait for DOM to be fully loaded
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavbarScroll();
  initActiveNavHighlight();
  initScrollReveal();
  initSkillBars();
  initCursorGlow();
});

// =============================================
// 2. Navbar background change on scroll
// =============================================
function initNavbarScroll() {
  const navbar = document.getElementById("mainNav");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// =============================================
// 3. Active nav link highlight on scroll
// =============================================
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 150; // offset for better UX

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// =============================================
// 4. Scroll Reveal Animation (Intersection Observer)
// =============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // stop observing once revealed
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -20px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// =============================================
// 5. Skill Bars Animation
// =============================================
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");

  if (skillBars.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.getAttribute("data-pct");
          if (pct && !bar.classList.contains("animated")) {
            bar.style.setProperty("--pct", `${pct}%`);
            bar.classList.add("animated");
          }
          observer.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px",
    }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// =============================================
// 6. Custom Cursor Glow Effect
// =============================================
function initCursorGlow() {
  // Create glow element
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  // Hide by default, show when mouse enters document
  glow.style.opacity = "0";

  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Fade in on first move
    if (glow.style.opacity === "0") {
      glow.style.opacity = "1";
    }
  });

  // Smooth follow animation
  function animateGlow() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    currentX += dx * 0.12;
    currentY += dy * 0.12;

    glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  // Optional: Hide glow when mouse leaves window
  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    if (mouseX !== 0 || mouseY !== 0) {
      glow.style.opacity = "1";
    }
  });

  // Disable glow on touch devices (no cursor)
  if ("ontouchstart" in window) {
    glow.style.display = "none";
  }
}

// =============================================
// 7. Smooth scroll for anchor links (with offset for fixed navbar)
// =============================================
// This adds smooth behavior to all internal hash links
document.addEventListener("DOMContentLoaded", () => {
  const allLinks = document.querySelectorAll('a[href^="#"]');

  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        const navbar = document.getElementById("mainNav");
        const navbarHeight = navbar ? navbar.offsetHeight : 72;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
});

// =============================================
// 8. Handle responsive navbar collapse on link click (mobile UX)
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const toggler = document.querySelector(".navbar-toggler");

  if (navLinks.length && navbarCollapse && toggler) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          toggler.click();
        }
      });
    });
  }
});

// =============================================
// 9. Lazy load / preload images optional (just to ensure hero images are fine)
// Not strictly necessary, but adds a small polish for slow connections
// =============================================
function preloadCriticalImages() {
  const images = document.querySelectorAll(".hero-img-main, .hero-img-bl, .hero-img-tr, .about-img");
  images.forEach((img) => {
    if (img.complete) return;
    img.setAttribute("loading", "eager");
  });
}
document.addEventListener("DOMContentLoaded", preloadCriticalImages);

// =============================================
// 10. Additional: Set skill bar initial state
// =============================================
// This ensures any skill bar that is already visible on page load gets animated
function initVisibleSkillBarsOnLoad() {
  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length === 0) return;

  const checkVisible = () => {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
      if (isVisible && !bar.classList.contains("animated")) {
        const pct = bar.getAttribute("data-pct");
        if (pct) {
          bar.style.setProperty("--pct", `${pct}%`);
          bar.classList.add("animated");
        }
      }
    });
  };

  // Run once after a short delay
  setTimeout(checkVisible, 300);
  window.addEventListener("scroll", checkVisible);
}
document.addEventListener("DOMContentLoaded", initVisibleSkillBarsOnLoad);