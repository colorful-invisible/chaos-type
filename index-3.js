Splitting();

gsap.registerPlugin(ScrollTrigger);

const chars = document.querySelectorAll(".char");
const originalFontSize = gsap.getProperty(".char", "fontSize");
const originalFontWeight = gsap.getProperty(".char", "fontWeight");
// const colors = ["#F8F9FA", "#DEE2E6", "#ADB5BD", "#495057", "#212529"];
const colors = ["black"];

const originalPositions = Array.from(chars).map((char) => {
  const rect = char.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
});

console.log(originalPositions);

const baseRadius = 128; // Starting radius
const angleIncrement = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
// const angleIncrement = Math.PI * (2 - Math.sqrt(2));
const radiusIncrement = 3; // Adjust for tighter or looser spiral

chars.forEach((char, index) => {
  const angle = index * angleIncrement;
  const radius = baseRadius + radiusIncrement * index;
  const fontSize = parseInt(originalFontSize) + index * 1.618;

  const offsetX = Math.cos(angle) * radius;
  const offsetY = Math.sin(angle) * radius;
  const randomColor = colors[index % colors.length];

  gsap.set(char, {
    x: offsetX,
    y: offsetY,
    fontSize: `${fontSize}px`,
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
    fontSize: originalFontSize,
    fontWeight: originalFontWeight,
    color: "black",
  });
});
