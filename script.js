const container = document.querySelector(".buttons");
const yesButton = document.getElementById("yes");
let yesScale = 1;

// NO buttons array
let noButtons = [document.getElementById("no")];

const noTexts = [
  "NO 😠","pls stop","why tho","WAIT","DUMPLING PLEASE","😭😭😭","hhMMMMPPPh",
  "STOP HOVERING","NOT TODAY 😤","try again maybe?","seriously?",
  "🤯🤯🤯","I’m shy…","think again!"
];

// Move NO button with chaos but readable
function moveNoButton(e) {
  e.preventDefault();
  const btn = e.target;
  const yesRect = yesButton.getBoundingClientRect();

  const maxX = container.clientWidth - btn.offsetWidth;
  const maxY = container.clientHeight - btn.offsetHeight;

  let x, y;
  // avoid YES button
  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (
    x + btn.offsetWidth > yesButton.offsetLeft &&
    x < yesButton.offsetLeft + yesButton.offsetWidth &&
    y + btn.offsetHeight > yesButton.offsetTop &&
    y < yesButton.offsetTop + yesButton.offsetHeight
  );

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  // random size 0.8–1.5
  const scale = 0.8 + Math.random() * 0.7;
  btn.style.transform = `scale(${scale})`;

  // random NO text
  btn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];

  // YES button grows slightly
  yesScale += 0.05;
  yesButton.style.transform = `scale(${yesScale})`;

  // occasionally clone NO button (max 3)
  if (noButtons.length < 3 && Math.random() < 0.3) {
    const clone = btn.cloneNode(true);
    clone.id = "";
    container.appendChild(clone);
    clone.style.position = "absolute";
    clone.addEventListener("mouseover", moveNoButton);
    clone.addEventListener("touchstart", moveNoButton, { passive: false });
    noButtons.push(clone);
  }
}

// attach events to all NO buttons
noButtons.forEach(btn => {
  btn.addEventListener("mouseover", moveNoButton);
  btn.addEventListener("touchstart", moveNoButton, { passive: false });
});

// YES button click shows popup + confetti
yesButton.addEventListener("click", () => {
  confettiBoom();
  const popup = document.getElementById("yes-popup");
  popup.classList.remove("hidden");
});

// Close popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("yes-popup").classList.add("hidden");
});

// CONFETTI 🎉
function confettiBoom() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.opacity = Math.random();
    confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    confetti.style.transition = "top 2s ease-out";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = "110vh";
    }, 50);

    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
}
