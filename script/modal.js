const modalOpenImages = document.querySelectorAll(".modal-open");
const modalCloseButtons = document.querySelectorAll(".modal-close");

modalOpenImages.forEach((image) => {
  image.addEventListener("click", () => {
    let modal = image.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => (closeButton = button.closest(".modal").style.display = "none")
  );
});

window.onclick = (e) =>
  e.target.className === "modal" ? (e.target.style.display = "none") : {};
