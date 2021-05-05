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
  console.log(
    "emailPattern.test(email.value) :>> ",
    emailPattern.test(email.value)
  );
  emailPattern.test(email.value)
    ? ((emailErrorMessage.textContent = ""),
      (email.style.boxShadow = "0 0 10px green"),
      email.reportValidity(),
      e.preventDefault())
    : ((emailErrorMessage.style.color = "red"),
      (emailErrorMessage.textContent =
        "Your email must be in a correct form (abc#def@mail.com)!"),
      (email.style.boxShadow = "0 0 10px red"),
      email.reportValidity(),
      e.preventDefault());

  //phone
  console.log(
    " phoneNumberPattern.test(phone.value) :>> ",
    phoneNumberPattern.test(phone.value)
  );
  phoneNumberPattern.test(phone.value)
    ? ((phoneErrorMessage.textContent = ""),
      (phone.style.boxShadow = "0 0 10px green"))
    : ((phoneErrorMessage.style.color = "red"),
      (phoneErrorMessage.textContent =
        "Your phone number must be from 9 to 11 and contain number only!"),
      (phone.style.boxShadow = "0 0 10px red"));

  //password
  passwordPattern.test(password.value)
    ? ((passwordErrorMessage.textContent = ""),
      (password.style.boxShadow = "0 0 10px green"),
      e.preventDefault(),
      password.reportValidity())
    : ((passwordErrorMessage.style.color = "red"),
      (passwordErrorMessage.textContent =
        "Your password must contains 8 to 20 characters, no space, at least 1 lower case, 1 upper case letter, at least 1 digit, and at least 1 special character (!@#$%^&*)!"),
      (password.style.boxShadow = "0 0 10px red"),
      password.reportValidity(),
      e.preventDefault());

  //retype-password
  password.value === retypePassword.value
    ? ((retypePasswordErrorMessage.textContent = ""),
      (retypePassword.style.boxShadow = "0 0 10px green"),
      e.preventDefault())
    : ((retypePasswordErrorMessage.style.color = "red"),
      (retypePasswordErrorMessage.textContent =
        "Your password does not match!"),
      (retypePassword.style.boxShadow = "0 0 10px red"),
      retypePassword.reportValidity(),
      e.preventDefault());

  //first-name

  namePattern.test(firstName.value)
    ? ((firstNameErrorMessage.textContent = ""),
      (firstName.style.boxShadow = "0 0 10px green"),
      e.preventDefault())
    : ((firstNameErrorMessage.style.color = "red"),
      (firstNameErrorMessage.textContent =
        "Your first name must exceed 3 characters and contain letters only!"),
      (firstName.style.boxShadow = "0 0 10px red"),
      firstName.reportValidity(),
      e.preventDefault());

  //last-name
  namePattern.test(lastName.value)
    ? ((lastNameErrorMessage.textContent = ""),
      (lastName.style.boxShadow = "0 0 10px green"),
      e.preventDefault())
    : ((lastNameErrorMessage.style.color = "red"),
      (lastNameErrorMessage.textContent =
        "Your last name must exceed 3 characters and contain letters only!"),
      (lastName.style.boxShadow = "0 0 10px red"),
      lastName.reportValidity(),
      e.preventDefault());

  //Address
  adddressPattern.test(address.value)
    ? ((addressErrorMessage.textContent = ""),
      (address.style.boxShadow = "0 0 10px green"),
      e.preventDefault())
    : ((addressErrorMessage.style.color = "red"),
      (addressErrorMessage.textContent =
        "Your address must exceed 3 characters and contain letters only!"),
      (address.style.boxShadow = "0 0 10px red"),
      address.reportValidity(),
      e.preventDefault());

  //City
  cityPattern.test(city.value)
    ? ((cityErrorMessage.textContent = ""),
      (city.style.boxShadow = "0 0 10px green"),
      e.preventDefault())
    : ((cityErrorMessage.style.color = "red"),
      (cityErrorMessage.textContent =
        "Your city must exceed 3 characters and contain letters only!"),
      (city.style.boxShadow = "0 0 10px red"),
      city.reportValidity(),
      e.preventDefault());

  //ZipCode
  zipCodePattern.test(zipCode.value)
    ? ((zipErrorMessage.textContent = ""),
      (zipCode.style.boxShadow = "0 0 10px green"),
      e.preventDefault())
    : ((zipErrorMessage.style.color = "red"),
      (zipErrorMessage.textContent =
        "Your ZipCode must contains 4 to 6digits!"),
      (zipCode.style.boxShadow = "0 0 10px red"),
      zipCode.reportValidity(),
      e.preventDefault());
});
