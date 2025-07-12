const password1El = document.querySelector(".password1");
const password2El = document.querySelector(".password2");
const generateBtnEl = document.querySelector(".context__generate-btn");
const lengthEl = document.querySelector("#length");
const includeUppercaseInput = document.querySelector("#include-uppercase");
const includeLowercaseInput = document.querySelector("#include-lowercase");
const includeNumbersInput = document.querySelector("#include-numbers");
const includeSymbolsInput = document.querySelector("#include-symbols");
const copyBtn1El = document.querySelector(".copy-btn1");
const copyBtn2El = document.querySelector(".copy-btn2");
const copiedAlertEl = document.querySelector("#copied-alert");

const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

// Function to get filtered characters based on user selections
function getFilteredCharacters() {
  let filteredChars = [];
  if (includeUppercaseInput.checked) {
    filteredChars.push(...characters.filter((char) => /[A-Z]/.test(char)));
  }
  if (includeLowercaseInput.checked) {
    filteredChars.push(...characters.filter((char) => /[a-z]/.test(char)));
  }
  if (includeNumbersInput.checked) {
    filteredChars.push(...characters.filter((char) => /[0-9]/.test(char)));
  }
  if (includeSymbolsInput.checked) {
    filteredChars.push(
      ...characters.filter((char) =>
        /[~`!@#$%^&*()_+\-={}\[\]|\\:;"'<>,.?/]/.test(char)
      )
    );
  }

  // If no filters are omitted, use all characters
  if (filteredChars.length === 0) {
    filteredChars = characters;
  }
  return filteredChars;
}

// Function to generate a random character from the filtered character array
function generateRandomChar(charArray) {
  let randomIndex = Math.floor(Math.random() * charArray.length);
  return charArray[randomIndex];
}

// Function to generate a password based on the selected length and character filters
function generatePassword() {
  const length = parseInt(lengthEl.value) || 15;
  const charArray = getFilteredCharacters();
  let password = "";
  for (let i = 0; i < length; i++) {
    password += generateRandomChar(charArray);
  }
  return password;
}

// Function to handle the click event for generating passwords
function handleClick() {
  password1El.textContent = generatePassword();
  password2El.textContent = generatePassword();
}

function showCopiedAlert() {
  copiedAlertEl.classList.add("show");

  setTimeout(() => {
    copiedAlertEl.classList.remove("show");
  }, 2000);
}

function handleCopy(textToCopy) {
  if (textToCopy.textContent === "") {
    alert("No password to copy!");
    return;
  }
  navigator.clipboard
    .writeText(textToCopy.textContent)
    .then(() => {
      showCopiedAlert();
      console.log("Password copied: ", textToCopy.textContent);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("Failed to copy password. Please try again.");
    });
}

generateBtnEl.addEventListener("click", handleClick);
copyBtn1El.addEventListener("click", () => handleCopy(password1El));
copyBtn2El.addEventListener("click", () => handleCopy(password2El));
