const cursor = document.getElementById("cursor");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

const speed = 0.2;

function animate() {
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;
    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

window.addEventListener("mousedown", () => cursor.classList.add("is-down"));
window.addEventListener("mouseup",   () => cursor.classList.remove("is-down"));

const clickableSelector = `
    a, button, [role="button"], input[type="button"], input[type="submit"],
    label, summary, select, option, [onclick], [tabindex]:not([tabindex="-1"])
  `;

document.addEventListener("mouseover", (e) => {
    const el = e.target.closest(clickableSelector);
    if (el) cursor.classList.add("is-pointer");
});

document.addEventListener("mouseout", (e) => {

    const fromClickable = e.target.closest(clickableSelector);
    const toClickable = e.relatedTarget && e.relatedTarget.closest
        ? e.relatedTarget.closest(clickableSelector)
        : null;

    if (fromClickable && !toClickable) cursor.classList.remove("is-pointer");
});

window.addEventListener("touchstart", () => {
    cursor.style.display = "none";
    document.documentElement.style.cursor = "auto";
    document.body.style.cursor = "auto";
}, { once: true });