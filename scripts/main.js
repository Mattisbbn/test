const yearNodes = document.querySelectorAll("[data-year]");
yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealNodes = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
} else if (revealNodes.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

const marquee = document.querySelector(".marquee-track");
if (marquee && marquee.children.length > 0) {
  marquee.innerHTML += marquee.innerHTML;
}

const tiltCards = document.querySelectorAll("[data-tilt]");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (reduceMotion) return;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) * 2 - 1) * 4;
    const rotateX = ((y / bounds.height) * 2 - 1) * -4;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const magneticButtons = document.querySelectorAll(".magnetic");
magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    if (reduceMotion) return;
    const box = button.getBoundingClientRect();
    const x = event.clientX - (box.left + box.width / 2);
    const y = event.clientY - (box.top + box.height / 2);
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const statusNode = document.getElementById("form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      statusNode.textContent = "Merci de compléter tous les champs.";
      statusNode.style.color = "#ff0a78";
      return;
    }

    const recipient = "julian.guenard.design@gmail.com";
    const subject = encodeURIComponent(`Nouveau message portfolio — ${name}`);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    statusNode.textContent = "Ton application mail va s'ouvrir pour envoyer le message.";
    statusNode.style.color = "inherit";
    contactForm.reset();
  });
}
