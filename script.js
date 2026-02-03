const container = document.querySelector(".buttons");
let yesScale = 1;

// NO button array (includes dynamic clones)
let noButtons = [document.getElementById("no")];

const noTexts = [
  "NO 😠","pls stop","why tho","WAIT","DUMPLING PLEASE","😭😭😭","ok fine?",
  "STOP HOVERING","NOT TODAY 😤","try again maybe?","seriously?",
  "🤯🤯🤯","I’m shy…","think again!"
];

// MOVE NO button (chaos version)
function moveNoButton(e) {
  e.preventDefault();
  const btn = e.target;

  const maxX = container.clientWidth - btn.offsetWidth;
  const maxY = container.clientHeight - btn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // random size 0.8–1.5x
  const scale = 0.8 + Math.random() * 0.7;
  btn.style.transform = `scale(${scale}) rotate(${Math.random()*360}deg)`;

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  // change text
  btn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];

  // YES button grows + pulse
  yesScale += 0.05;
  yesButton.style.transform = `scale(${yesScale})`;
  yesButton.classList.add("pulse");
  setTimeout(() => yesButton.classList.remove("pulse"), 300);

  // CHAOS: occasionally spawn clone NO button
  if (noButtons.length < 3 && Math.random() < 0.3) { // max 3 NOs
    const clone = btn.cloneNode(true);
    clone.id = ""; // remove id to avoid duplicates
    container.appendChild(clone);
    clone.style.position = "absolute";
    clone.style.left = `${Math.random()*maxX}px`;
    clone.style.top = `${Math.random()*maxY}px`;
    clone.addEventListener("mouseover", moveNoButton);
    clone.addEventListener("touchstart", moveNoButton, { passive: false });
    noButtons.push(clone);
  }
}

// attach events to all existing NO buttons
noButtons.forEach(btn => {
  btn.addEventListener("mouseover", moveNoButton);
  btn.addEventListener("touchstart", moveNoButton, { passive: false });
});

// YES button click
const yesButton = document.getElementById("yes");
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
