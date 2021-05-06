// <========    CONSTANTS     ========>
const ERROR_STYLING_OBJECT = {
  errorTextColor: "red",
  errorBorderStyle: "0 0 10px red",
  okTextColor: "green",
  okBorderStyle: "0 0 10px green",
};

// <========    Global Scope     ========>

const registerSubmitButton = document.getElementById("registerSubmitButton");
const email = document.getElementById("email-address");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const retypePassword = document.getElementById("retype-password");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const address = document.getElementById("address");
const city = document.getElementById("city");
const zipCode = document.getElementById("zip");

const {
  errorTextColor,
  errorBorderStyle,
  okTextColor,
  okBorderStyle,
} = ERROR_STYLING_OBJECT;

registerSubmitButton.addEventListener("click", (e) => {
  const emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const namePattern = /[A-Za-z]{3,}/;
  const adddressPattern = /[A-Za-z]{3,}/;
  const cityPattern = /[A-Za-z]{3,}/;
  const zipCodePattern = /[0-9]{4,6}/;

  const emailErrorMessage = document.getElementById("email-error-message");
  const phoneErrorMessage = document.getElementById("phone-error-message");
  const passwordErrorMessage = document.getElementById(
    "password-error-message"
  );
  const retypePasswordErrorMessage = document.getElementById(
    "retype-password-error-message"
  );
  const firstNameErrorMessage = document.getElementById(
    "first-name-error-message"
  );
  const lastNameErrorMessage = document.getElementById(
    "last-name-error-message"
  );
  const addressErrorMessage = document.getElementById("address-error-message");
  const cityErrorMessage = document.getElementById("city-error-message");
  const zipErrorMessage = document.getElementById("zip-error-message");

  //email

  emailPattern.test(email.value)
    ? ((emailErrorMessage.textContent = ""),
      (email.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((emailErrorMessage.style.color = errorTextColor),
      (emailErrorMessage.textContent =
        "Your email must be in a correct form (abc#def@mail.com)!"),
      (email.style.boxShadow = errorBorderStyle),
      email.reportValidity(),
      e.preventDefault());

  //phone
  phoneNumberPattern.test(phone.value)
    ? ((phoneErrorMessage.textContent = ""),
      (phone.style.boxShadow = okBorderStyle))
    : ((phoneErrorMessage.style.color = errorTextColor),
      (phoneErrorMessage.textContent =
        "Your phone number must be from 9 to 11 and contain number only!"),
      (phone.style.boxShadow = errorBorderStyle));

  //password
  passwordPattern.test(password.value)
    ? ((passwordErrorMessage.textContent = ""),
      (password.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((passwordErrorMessage.style.color = errorTextColor),
      (passwordErrorMessage.textContent =
        "Your password must contains 8 to 20 characters, no space, at least 1 lower case, 1 upper case letter, at least 1 digit, and at least 1 special character (!@#$%^&*)!"),
      (password.style.boxShadow = errorBorderStyle),
      password.reportValidity(),
      e.preventDefault());

  //retype-password
  password.value === retypePassword.value
    ? ((retypePasswordErrorMessage.textContent = ""),
      (retypePassword.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((retypePasswordErrorMessage.style.color = errorTextColor),
      (retypePasswordErrorMessage.textContent =
        "Your password does not match!"),
      (retypePassword.style.boxShadow = errorBorderStyle),
      e.preventDefault());

  //first-name

  namePattern.test(firstName.value)
    ? ((firstNameErrorMessage.textContent = ""),
      (firstName.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((firstNameErrorMessage.style.color = errorTextColor),
      (firstNameErrorMessage.textContent =
        "Your first name must exceed 3 characters and contain letters only!"),
      (firstName.style.boxShadow = errorBorderStyle),
      e.preventDefault());

  //last-name
  namePattern.test(lastName.value)
    ? ((lastNameErrorMessage.textContent = ""),
      (lastName.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((lastNameErrorMessage.style.color = errorTextColor),
      (lastNameErrorMessage.textContent =
        "Your last name must exceed 3 characters and contain letters only!"),
      (lastName.style.boxShadow = errorBorderStyle),
      e.preventDefault());

  //Address
  adddressPattern.test(address.value)
    ? ((addressErrorMessage.textContent = ""),
      (address.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((addressErrorMessage.style.color = errorTextColor),
      (addressErrorMessage.textContent =
        "Your address must exceed 3 characters and contain letters only!"),
      (address.style.boxShadow = errorBorderStyle),
      e.preventDefault());

  //City
  cityPattern.test(city.value)
    ? ((cityErrorMessage.textContent = ""),
      (city.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((cityErrorMessage.style.color = errorTextColor),
      (cityErrorMessage.textContent =
        "Your city must exceed 3 characters and contain letters only!"),
      (city.style.boxShadow = errorBorderStyle),
      e.preventDefault());

  //ZipCode
  zipCodePattern.test(zipCode.value)
    ? ((zipErrorMessage.textContent = ""),
      (zipCode.style.boxShadow = okBorderStyle),
      e.preventDefault())
    : ((zipErrorMessage.style.color = errorTextColor),
      (zipErrorMessage.textContent =
        "Your ZipCode must contains 4 to 6 digits!"),
      (zipCode.style.boxShadow = errorBorderStyle),
      e.preventDefault());
});
