const cursor = document.getElementById("cursor");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

const speed = 0.2;

// --- HIDE/SHOW helpers ---
let isCursorVisible = false;

// (opcjonalnie) jeśli nie masz transition w CSS, to to da płynność
cursor.style.transition ||= "opacity 120ms ease";

function showCursor() {
    if (!isCursorVisible) {
        cursor.style.opacity = "1";
        isCursorVisible = true;
    }
}

function hideCursor() {
    if (isCursorVisible) {
        cursor.style.opacity = "0";
        isCursorVisible = false;
    }
    // żeby nie zostały stany po wyjechaniu
    cursor.classList.remove("is-down", "is-pointer");
}

// startowo ukryj (pojawi się po wejściu/ruchu)
hideCursor();

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
    showCursor(); // pokaż, bo wiemy że jesteśmy w oknie
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

// --- KLUCZ: wyjazd poza viewport/okno ---
document.documentElement.addEventListener("mouseleave", hideCursor);
document.documentElement.addEventListener("mouseenter", showCursor);

// klik/alt-tab poza okno -> też ukryj (częsty case)
window.addEventListener("blur", hideCursor);

// zmiana zakładki / minimalizacja
document.addEventListener("visibilitychange", () => {
    if (document.hidden) hideCursor();
});