// Animación del sobre
window.onload = () => {
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
};
