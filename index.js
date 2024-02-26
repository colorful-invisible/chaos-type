Splitting();

gsap.registerPlugin(ScrollTrigger);

const chars = document.querySelectorAll(".char");
const radius = 800;
const fontSize = gsap.getProperty(".char", "fontSize");
const fontWeight = gsap.getProperty(".char", "fontWeight");
const colors = ["white", "white", "white", "black", "black", "black", "black"];

const originalPositions = Array.from(chars).map((char) => {
  const rect = char.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
});

chars.forEach((char, index) => {
  // Random angle between 0 and 2π radians
  const angle = Math.random() * Math.PI * 2;
  // Random distance from the center, not exceeding the radius
  const randomRadius = Math.random() * radius;
  // Calculate the offset from the center
  const offsetX = Math.cos(angle) * randomRadius;
  const offsetY = Math.sin(angle) * randomRadius;

  const randomFontSize = gsap.utils.random(128, 480);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  gsap.set(char, {
    x: offsetX,
    y: offsetY,
    fontSize: randomFontSize + "px",
    fontWeight: 700,
    color: randomColor,
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
  });

  gsap.to(char, {
    scrollTrigger: {
      trigger: "#container",
      start: "+=400 +=400",
      end: "center +=600",
      scrub: true,
    },
    x: () => originalPositions[index].x - window.innerWidth / 2,
    y: () => originalPositions[index].y - window.innerHeight / 2,
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: "white",
  });
});
