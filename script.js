const yesButton = document.getElementById("yes");
let yesScale = 1;

// NO buttons array
let noButtons = [document.getElementById("no")];

const noTexts = [
  "NO 😠","pls stop","why tho","WAIT","DUMPLINGG PLEASE","😭😭😭","ok fine?",
  "STOP HOVERING","NOT TODAY 😤","try again maybe?","seriously?",
  "🤯🤯🤯","I’m shy…","think again!"
];

// Move NO button anywhere on screen
function moveNoButton(e) {
  e.preventDefault();
  const btn = e.target;

  const maxX = document.documentElement.clientWidth - btn.offsetWidth;
  const maxY = document.documentElement.clientHeight - btn.offsetHeight;

  let x, y;
  const yesRect = yesButton.getBoundingClientRect();

  // avoid YES button
  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (
    x + btn.offsetWidth > yesRect.left &&
    x < yesRect.right &&
    y + btn.offsetHeight > yesRect.top &&
    y < yesRect.bottom
  );

  // SLOW movement for chasing
  btn.style.transition = "left 0.6s ease, top 0.6s ease, transform 0.3s ease";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  // random size 0.9–1.2
  const scale = 0.9 + Math.random() * 0.3;
  btn.style.transform = `scale(${scale})`;

  // random text
  btn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];

  // YES button grows slightly
  yesScale += 0.03;
  yesButton.style.transform = `scale(${yesScale})`;

  // occasionally clone NO button (max 3)
  if (noButtons.length < 3 && Math.random() < 0.25) {
    const clone = btn.cloneNode(true);
    clone.id = "";
    document.body.appendChild(clone);
    clone.style.position = "fixed";
    clone.style.backgroundColor = "#a7c957"; // Yellow Green
    clone.style.color = "#386641"; // Hunter Green
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
