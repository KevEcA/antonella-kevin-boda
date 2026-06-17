window.onload = () => {
  // Animación del sobre
  gsap.to(".flap", { rotationX: 180, duration: 2 });
  gsap.from(".letter", { opacity: 0, y: 50, delay: 2 });

  // Generar automáticamente las 60 fotos en la galería
  const gallery = document.getElementById("gallery");
  for (let i = 1; i <= 60; i++) {
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

  // FAQ acordeón
  document.querySelectorAll(".faq-item h3").forEach(q => {
    q.addEventListener("click", () => {
      const p = q.nextElementSibling;
      p.style.display = p.style.display === "block" ? "none" : "block";
    });
  });

  // Intersection Observer para fotos
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
    threshold: 0.6
  });
  images.forEach(img => observer.observe(img));

  // Carrusel infinito
  function autoScroll() {
    const track = document.querySelector('.photo-track');
    let position = 0;
    track.innerHTML += track.innerHTML;

    function step() {
      position -= 1;
      track.style.transform = `translateX(${position}px)`;
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }
      requestAnimationFrame(step);
    }
    step();
  }
  autoScroll();

  // Inicializar mapa centrado en Quito
  const map = L.map('map').setView([-0.2295, -78.5243], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Lugares recomendados
  const lugares = [
    { nombre: "Panecillo", coords: [-0.2345, -78.5127], distancia: "5 km", tiempo: "15 min", desc: "Mirador icónico de Quito con la Virgen del Panecillo." },
    { nombre: "Mitad del Mundo", coords: [-0.0022, -78.4556], distancia: "25 km", tiempo: "40 min", desc: "Monumento en la línea ecuatorial." },
    { nombre: "Termas Papallacta", coords: [-0.3667, -78.1333], distancia: "67 km", tiempo: "1h30", desc: "Aguas termales en la montaña." },
    { nombre: "Tena", coords: [-0.9833, -77.8167], distancia: "190 km", tiempo: "3h30", desc: "Capital de la Amazonía con ríos y selva." },
    { nombre: "Mindo", coords: [0.0416, -78.8075], distancia: "80 km", tiempo: "2h", desc: "Bosque nublado famoso por aves y cascadas." },
    { nombre: "Hostería El Jardín de Misahuallí", coords: [-1.0500, -77.6833], distancia: "200 km", tiempo: "4h", desc: "Hospedaje amazónico junto al río Napo."},
    { nombre: "Casa de Piedra Glamping", coords: [0.68, -77.95], distancia: "180 km", tiempo: "3h30", desc: "Glamping en el páramo de frailejones, Carchi."},
    { nombre: "Casa Lago San Pablo", coords: [0.216, -78.233], distancia: "90 km", tiempo: "1h45", desc: "Hospedaje frente al Lago San Pablo, cerca de Otavalo."},
    { nombre: "Casa Blanca (Same)", coords: [0.861, -79.674], distancia: "350 km", tiempo: "6h", desc: "Complejo turístico privado en Same, Esmeraldas, con playa, marina y hospedajes."},
    { nombre: "Galápagos", coords: [-0.9538, -90.9656], distancia: "1000 km", tiempo: "Vuelo 2h", desc: "Islas únicas con fauna endémica." },
    { nombre: "Baños de Agua Santa", coords: [-1.3969, -78.4247], distancia: "190 km", tiempo: "3h30", desc: "Ciudad turística famosa por cascadas, termas y deportes de aventura." },
    { nombre: "Quilotoa", coords: [-0.9180, -78.9250], distancia: "180 km", tiempo: "3h30", desc: "Laguna volcánica de aguas turquesas en la Sierra central." },
  ];

  // Crear pines y lista
  const listContainer = document.getElementById("map-list");

  lugares.forEach(lugar => {
    const marker = L.marker(lugar.coords).addTo(map)
      .bindTooltip(`<b>${lugar.nombre}</b><br>${lugar.distancia} desde Quito<br>${lugar.tiempo}<br>${lugar.desc}`, {
        permanent: false,
        direction: "top"
      });

    const item = document.createElement("div");
    item.className = "map-item";
    item.textContent = `${lugar.nombre} – ${lugar.distancia}, ${lugar.tiempo}`;

    item.addEventListener("mouseenter", () => {
      marker.openTooltip();
      marker.setZIndexOffset(1000);
    });
    item.addEventListener("mouseleave", () => {
      marker.closeTooltip();
      marker.setZIndexOffset(0);
    });
    item.addEventListener("click", () => {
      map.setView(lugar.coords, 10);
      marker.openTooltip();
    });

    listContainer.appendChild(item);
  });
};

 // Menu hamburguesa para celular
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
