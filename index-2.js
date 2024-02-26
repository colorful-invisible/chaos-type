Splitting();

gsap.registerPlugin(ScrollTrigger);

const chars = document.querySelectorAll(".char");
const originalFontSize = gsap.getProperty(".char", "fontSize");
const originalFontWeight = gsap.getProperty(".char", "fontWeight");
// const colors = ["white", "white", "white", "black", "black", "black", "black"];
// const colors = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];
// shades of gray
const colors = ["#F8F9FA", "#DEE2E6", "#ADB5BD", "#495057", "#212529"];

const originalPositions = Array.from(chars).map((char) => {
  const rect = char.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
});

chars.forEach((char, index) => {
  const angle = Math.random() * Math.PI * 2;
  // Random distance from the center

  const radius = [128];
  const newFontSize = [originalFontSize];
  const fontSizesObj = {
    [radius[0]]: newFontSize[0],
  };

  const multiplier = 1.618;
  const numRings = 5;

  for (let i = 1; i < numRings; i++) {
    radius[i] = Math.round(radius[i - 1] * multiplier);
    newFontSize[i] = Math.round(newFontSize[i - 1] * multiplier);
    fontSizesObj[radius[i]] = newFontSize[i];
  }

  const randomRadius = gsap.utils.random(radius);
  // Calculate the offset from the center
  const offsetX = Math.cos(angle) * randomRadius;
  const offsetY = Math.sin(angle) * randomRadius;
  //
  const randomFontSize = fontSizesObj[randomRadius];
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
    fontSize: originalFontSize,
    fontWeight: originalFontWeight,
    color: "white",
  });
});
