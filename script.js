const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");

const noTexts = [
  "NO 😠","pls stop","why tho","WAIT","DUPMPLING PLEASE","😭😭😭","ok fine?",
  "STOP HOVERING","NOT TODAY 😤","try again maybe?","seriously?",
  "🤯🤯🤯","I’m shy…","think again!"
];

let yesScale = 1;

function moveNoButton(e) {
  e.preventDefault(); // stop accidental mobile click
  const container = document.querySelector(".buttons");

  const maxX = container.clientWidth - noButton.offsetWidth;
  const maxY = container.clientHeight - noButton.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;

  // change text
  const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
  noButton.textContent = randomText;

  // YES button grows + pulse
  yesScale += 0.1;
  yesButton.style.transform = `scale(${yesScale})`;
  yesButton.classList.add("pulse");
  setTimeout(() => yesButton.classList.remove("pulse"), 300);
}

// desktop
noButton.addEventListener("mouseover", moveNoButton);

// mobile
noButton.addEventListener("touchstart", moveNoButton, { passive: false });

// YES button click
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
