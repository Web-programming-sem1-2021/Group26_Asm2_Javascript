const currentEmail = localStorage.getItem("email");
// const currentEmailElement = document.createElement(`<p>${currentEmail}</p>`);
document.getElementById("email").innerHTML += `${currentEmail}`;
