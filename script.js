// import "./style.css";

// Form Validation code
const regBtn = document.getElementById("registration");
// console.log(submitBtn);
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const pwInput = document.getElementById("password");
const confirmPwInput = document.getElementById("passwordCheck");
const checkboxTerms = document.getElementById("sub-term");
const successorMessage = document.getElementById("successMessage");
const errorMsg = document.getElementById("errorDisplay");
const loginForm = document.getElementById("login");
const loginUname = document.getElementById("log-username");
const pwUname = document.getElementById("log-password");
let existingUsernames = [];
let existingPasswords = [];

loginForm.addEventListener("submit", (e) => {
  // alert("clicked");
  e.preventDefault();
  loginValidation();
});

regBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  usernameValidation();
  emailValidation();
  passwordValidation();
  termsValidation();

  // local storage
  const username = usernameInput.value.toLowerCase().trim();
  const email = emailInput.value.toLowerCase().trim();
  const password = pwInput.value.trim().toLowerCase();
  console.log(username);
  localStorage.setItem("username", JSON.stringify(username));
  localStorage.setItem("email", JSON.stringify(email));
  localStorage.setItem("password", JSON.stringify(password));

  // clear form
  regBtn.reset();
  // console.log(localStorage);
  // These do not work
  existingUsernames = JSON.parse(localStorage.getItem("usernames")) || [];
  existingPasswords = JSON.parse(localStorage.getItem("password")) || [];
  console.log(existingUsernames);
  uniqueValidation(existingUsernames);
  successMessage();
});

function loginValidation() {
  const uname = loginUname.value.trim();
  const pw = pwUname.value.trim();

  // for login username
  if (uname === "") {
    showError("Username cannot be blank");
  } else if (!existingUsernames.includes(uname)) {
    showError("Username does not exit");
  }
  // for password
  if (pw === "") {
    showError("Username cannot be blank");
  } else if (!existingPasswords.includes(pw)) {
    showError("Username does not exit");
  }
}

function usernameValidation() {
  const username = usernameInput.value.trim();
  console.log("username is", username);

  // user registration validation
  if (username === "") {
    showError("Username cannot be blank");
  }
  if (username.length < 4) {
    showError("username must be at least 4 characters long");
  }
  if (new Set(username).size < 2) {
    showError("Username must not have unique characters.");
  }
  if (/[^a-zA-Z0-9]+$/.test(username)) {
    showError("Username cannot contain special characters or whitepace.");
  }
  if (isUsernameTaken(username)) {
    showError("That username is taken.");
  }
}

function showError(errorText, isError = false) {
  errorMsg.textContent = errorText;
  errorMsg.style.display = "block";
  throw new Error(`${errorText}`);
}

function isUsernameTaken(username) {
  const unameTakenAry = ["carson", "helen", "bobby", "mickey", "billy"];
  let isTaken = false;
  unameTakenAry.forEach((i) => {
    if (i === username) {
      isTaken = true;
    }
  });

  return isTaken;
}

function emailValidation() {
  const email = emailInput.value.trim();
  console.log("email is", email);
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    showError("email name is not valid. Sample of a real email: about@edu.eu");
  } else if (email.includes("example.com")) {
    showError("must not have the domain example.com");
  }
}

function passwordValidation() {
  const pw = pwInput.value.trim();
  const samePW = confirmPwInput.value.trim();
  const username = usernameInput.value.trim();

  if (pw.length < 12) {
    showError("password must at least be 12 letters");
  } else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(pw)) {
    showError("Must contain both an uppercase and lowercase letter");
  } else if (!/^(?=.*[0-9]).+$/.test(pw)) {
    showError("Must have at least 1 digit");
  } else if (!/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(pw)) {
    showError("Must have at least one special character");
  } else if (!/^(?!.*[pP][aA][sS][sS][wW][oO][rR][dD]).+$/.test(pw)) {
    showError("Must not contain the word password");
  } else if (pw.includes(username)) {
    showError("Must not contain the username used");
  } else if (pw !== samePW) {
    showError("Must be the same password");
  }
}

function termsValidation() {
  // console.log(checkboxTerms.checked);
  if (!checkboxTerms.checked) {
    showError("Must be checked");
  }
}

function uniqueValidation(ary) {
  if (ary.includes(username)) {
    showError("Username already exists. Please choose a different one.");
  }
}

function successMessage() {
  errorMsg.textContent = "Success";
  errorMsg.style.backgroundColor = "green";
  errorMsg.style.color = "gold";
  errorMsg.style.display = "block";
}
