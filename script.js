// CURSOR
const cur = document.getElementById("cursor"),
  ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx - 4 + "px";
  cur.style.top = my - 4 + "px";
});
(function ar() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx - 17 + "px";
  ring.style.top = ry - 17 + "px";
  requestAnimationFrame(ar);
})();
document
  .querySelectorAll("a,button,.course-card,.how-step,.tcard")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.transform = "scale(2.5)";
      ring.style.transform = "scale(1.4)";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.transform = "scale(1)";
      ring.style.transform = "scale(1)";
    });
  });

// NAV SCROLL
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// HAMBURGER
function toggleMenu() {
  document.getElementById("hamburger").classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
}
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("hamburger").classList.remove("open");
    document.getElementById("navLinks").classList.remove("open");
  });
});

// REVEAL
const obs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// COUNTER
function animC(el, target, dur = 2000) {
  let s = 0,
    step = target / (dur / 16);
  const t = setInterval(() => {
    s += step;
    if (s >= target) {
      el.textContent = target + (target === 100 ? "%" : "+");
      clearInterval(t);
    }
    else el.textContent = Math.floor(s) + (target === 100 ? "%" : "+");
  }, 16);
}
const cObs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        animC(e.target, +e.target.dataset.target);
        cObs.unobserve(e.target);
      }
    }),
  { threshold: 0.5 }
);
document
  .querySelectorAll(".stat-num[data-target]")
  .forEach((el) => cObs.observe(el));

// COURSE FILTER
function filterCourse(cat, btn) {
  document
    .querySelectorAll(".course-tabs button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".course-card").forEach((c) => {
    c.style.display = cat === "all" || c.dataset.cat === cat ? "block" : "none";
  });
}

// ENROLL SUBMIT
function submitEnroll() {
  const name = document.getElementById("studentName");
  const whatsapp = document.getElementById("studentWhatsapp");
  const course = document.getElementById("studentCourse");
  const age = document.getElementById("studentAge");
  const platform = document.getElementById("studentPlatform");
  const message = document.getElementById("studentMessage");

  const requiredFields = [name, whatsapp, course, age, platform];

  let ok = true;

  requiredFields.forEach((field) => {
    if (!field.value || field.value === "Select a Course") {
      field.style.borderColor = "rgba(201,147,58,0.8)";
      ok = false;
    }
    else {
      field.style.borderColor = "";
    }
  });

  if (ok) {
    // WhatsApp Message
    const whatsappMessage = `📖 *New Free Trial Request* %0A%0A
 *Student Name:* ${name.value}%0A
 *WhatsApp:* ${whatsapp.value}%0A
 *Course:* ${course.value}%0A
 *Age:* ${age.value}%0A
 *Platform:* ${platform.value}%0A
 *Message:* ${message.value}`;

    // Your WhatsApp Number
    const phoneNumber = "923013194465";

    // Open WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
      "_blank"
    );

    // Success UI
    document.getElementById("enrollFormWrap").style.display = "none";
    document.getElementById("enrollSuccess").style.display = "block";
  }
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});
