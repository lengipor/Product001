const themeToggle = document.getElementById("themeToggle");
const themeOptions = ["auto", "light", "dark"];
let currentThemeIndex = 0;

function applyTheme(theme) {
  const icon = themeToggle.querySelector("i");
  const label = themeToggle.querySelector("span");

  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
    icon.className = "bi bi-circle-half";
  } else if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    icon.className = "bi bi-moon-fill";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    icon.className = "bi bi-sun-fill";
  }

  label.textContent = ` ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
}

function loadTheme() {
  const saved = localStorage.getItem("theme-mode") || "auto";
  currentThemeIndex = themeOptions.indexOf(saved);
  applyTheme(saved);
}

themeToggle.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themeOptions.length;
  const newTheme = themeOptions[currentThemeIndex];
  applyTheme(newTheme);
  localStorage.setItem("theme-mode", newTheme);
});

// React to system preference changes
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
prefersDark.addEventListener("change", () => {
  if (localStorage.getItem("theme-mode") === "auto") {
    applyTheme("auto");
  }
});

loadTheme();

// Scrollspy Active NavLink
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function onScroll() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 110;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);
