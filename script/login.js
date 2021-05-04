const loginForm = document.getElementsByClassName("login-form");
const loginSubmitButton = document.getElementById("login-submit");
console.log(`loginSubmitButton`, loginSubmitButton);

localStorage.setItem("userName", "");
localStorage.setItem("password", "password");

console.log(
  `localStorage.getItem("password")`,
  localStorage.getItem("password")
);

const handleWrongPassword = () => {
  const invalidPasswordMessage = "Your password is invalid!";
  const invalidPasswordElement = document.getElementById(
    "wrong-password-message"
  );
  invalidPasswordElement.style.color = "red";
  invalidPasswordElement.value = invalidPasswordMessage;
};

const handleLogin = () => {
  if (loginForm != null) {
    const userName = document.getElementById("usrname");
    const password = document.getElementById("passcode");

    loginSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.getItem("password") === password.value
        ? (localStorage.setItem("email", userName.value),
          localStorage.setItem("passcode", password.value),
          (window.location = "../myAccount/my-account.html"))
        : handleWrongPassword();
    });
  }
};

handleLogin();
