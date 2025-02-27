const mobileMenu = document.querySelector(".mobile-icon");
const pageItems = document.querySelector(".page-items");

mobileMenu.addEventListener("click", () => {
  pageItems.classList.toggle("active");
});
