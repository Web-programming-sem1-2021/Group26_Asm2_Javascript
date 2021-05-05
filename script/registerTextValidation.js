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
    ? (phone.setCustomValidity(""), (phone.style.boxShadow = "0 0 10px green"))
    : ((phoneErrorMessage.style.color = "red"),
      (phoneErrorMessage.textContent =
        "Your email must be in a correct form (abc#def@mail.com)!"),
      (phone.style.boxShadow = "0 0 10px red"));

  //password
  passwordPattern.test(password.value)
    ? (password.setCustomValidity("Right!"),
      e.preventDefault(),
      password.reportValidity())
    : (password.setCustomValidity("Wrong!"),
      password.reportValidity(),
      (password.style.boxShadow = "0 0 10px red"),
      e.preventDefault());

  //retype-password
  password.value === retypePassword.value
    ? (retypePassword.setCustomValidity("Right!"),
      retypePassword.reportValidity(),
      e.preventDefault())
    : (retypePassword.setCustomValidity("Wrong!"),
      (retypePassword.style.boxShadow = "0 0 10px red"),
      retypePassword.reportValidity(),
      e.preventDefault());

  //first-name
  console.log(
    "  namePattern.test(firstName.value):>> ",
    namePattern.test(firstName.value)
  );
  namePattern.test(firstName.value)
    ? (firstName.setCustomValidity("Right"), e.preventDefault())
    : (firstName.setCustomValidity(
        "Your first name must exceeds 3 characters and contain letters only!"
      ),
      (firstName.style.boxShadow = "0 0 10px red"),
      firstName.reportValidity(),
      e.preventDefault());

  //last-name
  namePattern.test(lastName.value)
    ? (lastName.setCustomValidity(""), e.preventDefault())
    : (lastName.setCustomValidity(
        "Your last name must exceeds 3 characters and contain letters only!"
      ),
      (lastName.style.boxShadow = "0 0 10px red"),
      lastName.reportValidity(),
      e.preventDefault());

  //Address
  adddressPattern.test(address.value)
    ? (address.setCustomValidity("Right"), e.preventDefault())
    : (address.setCustomValidity(
        "Your last name must exceeds 3 characters and contain letters only!"
      ),
      (address.style.boxShadow = "0 0 10px red"),
      address.reportValidity(),
      e.preventDefault());

  //City
  cityPattern.test(city.value)
    ? (city.setCustomValidity("Right"), e.preventDefault())
    : (city.setCustomValidity(
        "Your last name must exceeds 3 characters and contain letters only!"
      ),
      (city.style.boxShadow = "0 0 10px red"),
      city.reportValidity(),
      e.preventDefault());

  //ZipCode
  zipCodePattern.test(zipCode.value)
    ? (zipCode.setCustomValidity("Right!"),
      zipCode.reportValidity(),
      e.preventDefault())
    : (zipCode.setCustomValidity("Wrong!"),
      (zipCode.style.boxShadow = "0 0 10px red"),
      zipCode.reportValidity(),
      e.preventDefault());
});
