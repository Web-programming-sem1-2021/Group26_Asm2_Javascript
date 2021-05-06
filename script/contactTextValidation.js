// <========    CONSTANTS     ========>
const ERROR_STYLING_OBJECT = {
  errorTextColor: "red",
  errorBorderStyle: "0 0 10px red",
  okTextColor: "green",
  okBorderStyle: "0 0 10px green",
};
// <========    Global Scope     ========>

const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const contactSubmitButton = document.getElementById("contactSubmitButton");
const form = document.querySelector("#sectionForm");
const scheduleCheckboxes = form.querySelectorAll("input[type=checkbox]");
const firstScheduleCheckbox = document.getElementById("day1");

const {
  errorTextColor,
  errorBorderStyle,
  okTextColor,
  okBorderStyle,
} = ERROR_STYLING_OBJECT;

const validateCheckboxes = () => {
  let checkNumber = 0;
  Array.from(scheduleCheckboxes).forEach((checkbox) => {
    checkbox.checked ? (checkNumber += 1) : checkNumber === checkNumber;
  });
  return { checkNumber };
};
const checkboxErrorMessage = document.getElementById("checkbox-error-message");
const validate = () =>
  !(validateCheckboxes().checkNumber >= 1)
    ? (Array.from(scheduleCheckboxes).forEach(
        (checkbox) => (checkbox.style.boxShadow = errorTextColor)
      ),
      (checkboxErrorMessage.style.color = errorTextColor),
      (checkboxErrorMessage.textContent = "Check atleast 1 checkbox!"))
    : (checkboxErrorMessage.textContent = "");

//Contact
contactSubmitButton.addEventListener("click", (e) => {
  const namePattern = /[A-Za-z]{3,}/;
  const phoneNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
  const emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //Name
  const nameErrorMessage = document.getElementById("name-error-message");
  const emailErrorMEssage = document.getElementById("email-error-message");
  const phoneErrorMessage = document.getElementById("phone-error-message");

  namePattern.test(userName.value)
    ? ((nameErrorMessage.textContent = ""),
      (userName.style.boxShadow = okBorderStyle))
    : ((nameErrorMessage.style.color = errorTextColor),
      (nameErrorMessage.textContent =
        "Your name must exceed 3 characters and contain letters only!"),
      (userName.style.boxShadow = errorTextColor));
  //E-mail
  emailPattern.test(email.value)
    ? ((emailErrorMEssage.textContent = ""),
      (email.style.boxShadow = okBorderStyle))
    : ((emailErrorMEssage.style.color = errorTextColor),
      (emailErrorMEssage.textContent =
        "Your email must be in a correct form (abc#def@mail.com)!"),
      (email.style.boxShadow = errorTextColor));
  //Phone number

  phoneNumberPattern.test(phone.value)
    ? (phone.style.boxShadow = okBorderStyle)
    : ((phoneErrorMessage.style.color = errorTextColor),
      (phoneErrorMessage.textContent =
        "Your phone number must be from 9 to 11 and contain number only!"),
      (phone.style.boxShadow = errorTextColor));

  //checkboxes
  validate();
});

//message
const message = document.getElementById("counter-message");
const input = document.querySelector("textarea");
input.addEventListener("input", updateValue);
function updateValue(e) {
  let currentCharacters = e.target.value.length + 1;
  let wordLeft50 = 50 - currentCharacters; //0 - 50
  let wordLeft500 = 500 - currentCharacters; // 50 - 500
  let wordOver = currentCharacters - 500; //500 -
  if (!currentCharacters == 0) {
    wordLeft50 <= 50 && wordLeft50 > 1
      ? ((message.style.color = errorTextColor),
        (message.textContent = `${wordLeft50} is needed to reach the required character number!`))
      : wordLeft500 <= 500 && wordLeft500 > 0
      ? ((message.style.color = okTextColor),
        (message.textContent = `You can text ${wordLeft500} more letters!`))
      : ((message.style.color = errorTextColor),
        (message.textContent = `Deleting ${wordOver} letters is needed!`));
  }
}
