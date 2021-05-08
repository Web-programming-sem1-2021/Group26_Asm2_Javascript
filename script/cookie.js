//TODO: Ram

const purecookieTitle = "I Use cookies";
const purecookieDesc =
  "My website uses cookies necessary for its basic functioning. By contiuning browsing, you consent to my use of cookies and other technologies."; // Description
const purecookieLink = '<a href="#" target="_blank">What for?</a>';
const purecookieButton = "I understand";

const pureFadeIn = (elem, display) => {
  const element = document.getElementById(elem);
  element.style.opacity = 0;
  element.style.display = display || "block";

  (fade = () => {
    let val = parseFloat(element.style.opacity);
    !((val += 0.02) > 1)
      ? ((element.style.opacity = val), requestAnimationFrame(fade))
      : {};
  })();
};
const pureFadeOut = (elem) => {
  const el = document.getElementById(elem);
  el.style.opacity = 1;

  (fade = () => {
    (el.style.opacity -= 0.02) < 0
      ? (el.style.display = "none")
      : requestAnimationFrame(fade);
  })();
};

const setCookie = (name, value, days) => {
  let expires = "";
  const date = new Date();
  days
    ? (date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000),
      (expires = "; expires=" + date.toUTCString()))
    : {};
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
const getCookie = (name) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");

  ca.forEach((item) => {
    while (item.charAt(0) == " ") item = item.substring(1, item.length);
    if (item.indexOf(nameEQ) == 0)
      return item.substring(nameEQ.length, c.length);
  });
  return null;
};
const eraseCookie = (name) =>
  (document.cookie = name + "=; Max-Age=-99999999;");

const cookieConsent = () => {
  !getCookie("purecookieDismiss")
    ? ((document.body.innerHTML +=
        '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' +
        purecookieTitle +
        '</a></div><div class="cookieDesc"><p>' +
        purecookieDesc +
        " " +
        purecookieLink +
        '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' +
        purecookieButton +
        "</a></div></div>"),
      pureFadeIn("cookieConsentContainer"))
    : {};
};

const purecookieDismiss = () => {
  setCookie("purecookieDismiss", "1", 7);
  pureFadeOut("cookieConsentContainer");
};

window.onload = () => {
  cookieConsent();
};
