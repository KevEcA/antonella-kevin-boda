
window.onload = () => {
  // Animaciones al hacer scroll en cada sección
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

  // FAQ tipo acordeón
  document.querySelectorAll(".faq-item h3").forEach(q => {
    q.addEventListener("click", () => {
      const p = q.nextElementSibling;
      p.style.display = p.style.display === "block" ? "none" : "block";
    });
  });

  // Generar automáticamente las fotos del collage (si existe #gallery)
  const gallery = document.getElementById("gallery");
  if (gallery) {
    for (let i = 1; i <= 61; i++) {
      const img = document.createElement("img");
      img.src = `img/Foto${i}.jpeg`;
      img.alt = `Foto ${i}`;
      gallery.appendChild(img);
    }
  }

  // Intersection Observer para agrandar la foto del centro en el carrusel
  const images = document.querySelectorAll('.photo-track img');
  if (images.length > 0) {
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
      threshold: 0.6
    });
    images.forEach(img => observer.observe(img));
  }

  // Scroll automático horizontal en el carrusel
  function autoScroll() {
    const scrollContainer = document.querySelector('.photo-scroll');
    if (!scrollContainer) return;

    let scrollAmount = 0;

    function step() {
      scrollAmount += 1; // velocidad del scroll (px por frame)
      scrollContainer.scrollLeft = scrollAmount;

      // Reinicia al llegar al final
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }

      requestAnimationFrame(step);
    }

    step();
  }

  autoScroll();
};




/*

-------------------OLD-----------------
window.onload = () => {
  // Animación del sobre (puedes quitar si ya no usas flap/letter)
  gsap.to(".flap", { rotationX: 180, duration: 2 });
  gsap.from(".letter", { opacity: 0, y: 50, delay: 2 });

  // Generar automáticamente las 61 fotos en la galería
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

  // Intersection Observer para agrandar la imagen del centro
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

  // Scroll automático horizontal
  function autoScroll() {
    const scrollContainer = document.querySelector('.photo-scroll');
    let scrollAmount = 0;

    function step() {
      scrollAmount += 1; // velocidad del scroll (px por frame)
      scrollContainer.scrollLeft = scrollAmount;

      // Reinicia al llegar al final
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }

      requestAnimationFrame(step);
    }

    step();
  }

  // Activar scroll automático
  autoScroll();
};
*/
