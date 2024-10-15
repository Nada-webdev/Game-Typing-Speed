const typingText = document.querySelector(".typing-text p");
const inputFiled = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const TimeTag = document.querySelector(".time span b");
const TryAgainBtn = document.querySelector(".btn .again");
const NextBtn = document.querySelector(".btn .next");
const bodyBg = document.getElementsByTagName("body")[0]; 
let time,
    timeLeft = timeMax = 60,
    index = i = mistakes = StartTimer = 0;
let Timing;

function randomPragraph() {
  typingText.innerHTML = "";
  paragraphs[i].text.split("").forEach(letter => {
    let letterTag = `<span>${letter}</span>`;
    typingText.innerHTML += letterTag;
  });
  TimeTag.innerHTML = timeMax;
  bodyBg.style.backgroundColor = paragraphs[i].RoleColor; 
  i = (i + 1) % paragraphs.length; 
  typingText.querySelectorAll("span")[0].classList.add('active');
  typingText.addEventListener("click", () => inputFiled.focus());
  document.addEventListener('keydown',()=>inputFiled.focus());
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
      }
      index++;
    }

    mistakeTag.innerHTML = mistakes;
    char.forEach(span => span.classList.remove("active"));
    char[index]?.classList.add("active");
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

  const char = typingText.querySelectorAll("span");
  char.forEach(span => {
    span.classList.remove("correct", "incorrect", "active");
  });
}

function Next() {
  let finishedAllText = true;

  const char = typingText.querySelectorAll("span");
  char.forEach(span => {
    if (!span.classList.contains("correct") &&
      !span.classList.contains("incorrect")) {
      finishedAllText = false;
    }
  });

  if (timeLeft > 0 && finishedAllText) {
    timeLeft = timeMax = 60;
    index = mistakes = StartTimer = 0;
    TimeTag.innerText = timeLeft;
    mistakeTag.innerHTML = mistakes;
    inputFiled.value = "";
    clearInterval(Timing);

    randomPragraph();
  } else {
    console.log("You must finish typing the text or time has run out.");
  }
}

randomPragraph();
inputFiled.addEventListener('input', inputFun);
TryAgainBtn.addEventListener('click', TryAgain);
NextBtn.addEventListener('click', Next);
