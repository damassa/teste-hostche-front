const menuButton = document.querySelector("#menu-button");
const mobile = document.querySelector("#mobile-nav");

menuButton?.addEventListener("click", () => {
  mobile?.classList.toggle("hidden");
});
