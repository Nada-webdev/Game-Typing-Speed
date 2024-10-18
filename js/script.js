const typingText = document.querySelector(".typing-text p");
const inputFiled = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const TimeTag = document.querySelector(".time span b");
const TryAgainBtn = document.querySelector(".btn .again");
const NextBtn = document.querySelector(".btn .next");
const bodyBg = document.getElementsByTagName("body")[0]; 
const Card = document.querySelector(".wrapper");

let time,
    timeLeft = timeMax = 60,
    index = mistakes = StartTimer = 0;
let Timing;

function randomPragraph() {
  typingText.innerHTML = "";
  let i = Math.floor(Math.random() * paragraphs.length);
  paragraphs[i].text.split("").forEach(letter => {
    let letterTag = `<span>${letter}</span>`;
    typingText.innerHTML += letterTag;
  });
  TimeTag.innerHTML = timeMax;
  bodyBg.style.backgroundColor = paragraphs[i].RoleColor;
  typingText.querySelectorAll("span")[0].classList.add('active');
  typingText.addEventListener("click", () => inputFiled.focus());
  document.addEventListener('keydown', () => inputFiled.focus());
}

function inputFun() {
  const char = typingText.querySelectorAll("span");
  let typedChar = inputFiled.value.split("")[index];

  if (timeLeft > 0) {
    if (!StartTimer) {
      Timing = setInterval(initTime, 1000);
      StartTimer = true;
    }
    
    if (typedChar == null) {
      index--;
      if (char[index].classList.contains("incorrect")) {
        mistakes--;
      }
      char[index].classList.remove("correct", "incorrect");
    } else {
      if (char[index].innerText === typedChar) {
        char[index].classList.add("correct");
      } else {
        mistakes++;
        char[index].classList.add("incorrect");
        Card.classList.add("shake");
      }
      index++;
      setTimeout(() => Card.classList.remove("shake"), 500);
    }

    mistakeTag.innerHTML = mistakes;
    char.forEach(span => span.classList.remove("active"));
    char[index]?.classList.add("active");

    
    if (index === char.length) {
      clearInterval(Timing);
      congrat();
    }
  } else {
    clearInterval(Timing);
    inputFiled.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    TimeTag.innerText = timeLeft;
  } else {
    clearInterval(Timing);
  }
}

function TryAgain() {
  timeLeft = timeMax = 60;
  index = mistakes = StartTimer = 0;
  TimeTag.innerText = timeLeft;
  mistakeTag.innerHTML = mistakes;
  inputFiled.value = "";
  clearInterval(Timing);
  randomPragraph();

  const char = typingText.querySelectorAll("span");
  char.forEach(span => {
    span.classList.remove("correct", "incorrect", "active");
  });
}



function congrat() {
  const end = Date.now() + 3 * 1000; // 3 secondes
  const colors = ["#52fce3", "#3ce9fd", "#fff", "rgb(143, 2, 143)"];
  
  const frame = () => {
    if (Date.now() > end) return;
    
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };
  
  frame();
}

randomPragraph();
inputFiled.addEventListener('input', inputFun);
TryAgainBtn.addEventListener('click', TryAgain);
