document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
    }, 300);
  });

  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const currentTheme = localStorage.getItem("portfolio-theme") || "dark";

  htmlElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = htmlElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    htmlElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  const navbar = document.querySelector(".navbar");
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const progressIndicator = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.pageYOffset / totalHeight) * 100;
      progressIndicator.style.width = `${progress}%`;
    }

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }

    trackActiveNavigation();
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const strings = [
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Java Developer",
    "Full Stack Java Developer",
    "Spring Boot Developer",
  ];
  let stringIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const eraseSpeed = 50;
  const pauseTime = 2000;
  const targetElement = document.getElementById("typing-text");

  function typeLoop() {
    const currentString = strings[stringIndex];
    if (isDeleting) {
      targetElement.textContent = currentString.substring(
        0,
        characterIndex - 1,
      );
      characterIndex--;
    } else {
      targetElement.textContent = currentString.substring(
        0,
        characterIndex + 1,
      );
      characterIndex++;
    }

    let delay = isDeleting ? eraseSpeed : typeSpeed;

    if (!isDeleting && characterIndex === currentString.length) {
      isDeleting = true;
      delay = pauseTime;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      delay = 500;
    }

    setTimeout(typeLoop, delay);
  }
  if (targetElement) typeLoop();

  const animatables = document.querySelectorAll(".scroll-animate");

  const basicObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");

          const bars = entry.target.querySelectorAll(".skill-progress");
          bars.forEach(
            (bar) => (bar.style.width = bar.getAttribute("data-width")),
          );

          const numbers = entry.target.querySelectorAll(".counter");
          numbers.forEach((num) => runCounterAnimation(num));
        }
      });
    },
    { threshold: 0.15 },
  );

  animatables.forEach((item) => basicObserver.observe(item));

  function runCounterAnimation(element) {
    if (element.classList.contains("counted")) return;
    element.classList.add("counted");
    const target = +element.getAttribute("data-target");
    let count = 0;
    const increment = target / 50;
    const updateCount = () => {
      count += increment;
      if (count < target) {
        element.textContent = Math.ceil(count);
        setTimeout(updateCount, 25);
      } else {
        element.textContent = target;
      }
    };
    updateCount();
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  const form = document.getElementById("portfolio-contact-form");
  const recipientEmail = "v.vignesh15109038@gmail.com";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isFormValid = true;

    const inputs = form.querySelectorAll("input[required], textarea[required]");
    inputs.forEach((input) => {
      const group = input.parentElement;
      if (input.value.trim() === "") {
        group.classList.add("invalid");
        isFormValid = false;
      } else if (input.type === "email" && !validateEmail(input.value)) {
        group.classList.add("invalid");
        isFormValid = false;
      } else {
        group.classList.remove("invalid");
      }
    });

    if (isFormValid) {
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const message = document.getElementById("form-message").value.trim();
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );

      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      form.reset();
    }
  });

  function validateEmail(email) {
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
      email,
    );
  }

  const sections = document.querySelectorAll("section, header");
  function trackActiveNavigation() {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }
});
