window.onload = () => {
  // Animación del sobre
  gsap.to(".flap", { rotationX: 180, duration: 2 });
  gsap.from(".letter", { opacity: 0, y: 50, delay: 2 });

  // Generar automáticamente las 61 fotos
  const gallery = document.getElementById("gallery");
  for (let i = 1; i <= 61; i++) {
    const img = document.createElement("img");
    img.src = `img/Foto${i}.jpeg`;
    img.alt = `Foto ${i}`;
    gallery.appendChild(img);
  }

  // Animaciones al hacer scroll
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    });
  });

  // Animación FAQ (acordeón simple)
  document.querySelectorAll(".faq-item h3").forEach(q => {
    q.addEventListener("click", () => {
      const p = q.nextElementSibling;
      p.style.display = p.style.display === "block" ? "none" : "block";
    });
  });
};

  // Animación se agranda la imagen en el centro


const images = document.querySelectorAll('.photo-track img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scale(1.2)';
      entry.target.style.opacity = '1';
    } else {
      entry.target.style.transform = 'scale(1)';
      entry.target.style.opacity = '0.7';
    }
  });
}, {
  root: document.querySelector('.photo-scroll'),
  threshold: 0.6 // se activa cuando la imagen está centrada
});

images.forEach(img => observer.observe(img));
