const mobileMenu = document.querySelector(".mobile-icon");
const pageItems = document.querySelector(".page-items");
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

// Register Form inputs
const username = document.querySelector("#username");
const age = document.querySelector("#age");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const city = document.querySelector("#city");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const registerBtn = document.querySelector("#register-btn");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateRegisterForm();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateLoginForm();
  });
}

const validateRegisterForm = () => {
  const usernameVal = username.value.trim();
  const ageVal = age.value.trim();
  const phoneVal = phone.value.trim();
  const emailVal = email.value.trim();
  const countryVal = country.value.trim();
  const cityVal = city.value.trim();
  const passwordVal = password.value.trim();
  const confirmPassVal = confirmPassword.value.trim();
  usernameVal === ""
    ? setErrorFor(username, "يجب ادخال قيمه في هذا الحقل")
    : setSuccessFor(username);
  ageVal === ""
    ? setErrorFor(age, "يجب ادخال قيمه في هذا الحقل")
    : setSuccessFor(age);
  phoneVal === ""
    ? setErrorFor(phone, "يجب ادخال قيمه في هذا الحقل")
    : setSuccessFor(phone);
  emailVal === ""
    ? setErrorFor(email, "يجب ادخال قيمه في هذا الحقل")
    : !isEmail(emailVal)
    ? setErrorFor(email, "الايميل غير صالح")
    : setSuccessFor(email);
  passwordVal === ""
    ? setErrorFor(password, "يجب ادخال قيمه في هذا الحقل")
    : passwordVal.length < 8
    ? setErrorFor(password, "كلمة السر يجب ألا تقل عن 8 أحرف")
    : setSuccessFor(password);
  confirmPassVal === ""
    ? setErrorFor(confirmPassword, "يجب ادخال قيمه في هذا الحقل")
    : passwordVal !== confirmPassVal
    ? setErrorFor(confirmPassword, "كلمه السر غير متطابقه")
    : setSuccessFor(confirmPassword);
  countryVal === ""
    ? setErrorFor(country, "يجب ادخال قيمه في هذا الحقل")
    : setSuccessFor(country);
  cityVal === ""
    ? setErrorFor(city, "يجب ادخال قيمه في هذا الحقل")
    : setSuccessFor(city);

  showSuccessMessage();
};

const validateLoginForm = () => {
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();
  emailVal === ""
    ? setErrorFor(email, "يجب ادخال قيمه في هذا الحقل")
    : !isEmail(emailVal)
    ? setErrorFor(email, "الايميل غير صالح")
    : setSuccessFor(email);
  passwordVal === ""
    ? setErrorFor(password, "يجب ادخال قيمه في هذا الحقل")
    : setSuccessFor(password);

  showSuccessMessage(loginForm);
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList = "form-control error";
};

const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  formControl.classList = "form-control success";
};

const isEmail = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

const showSuccessMessage = () => {
  const formControls = document.querySelectorAll(".form-control");
  let successCount = 0;
  formControls.forEach((formControl) => {
    formControl.classList.contains("success") && successCount++;
  });
  successCount === formControls.length && alert("تم التسجيل بنجاح");
};

mobileMenu.addEventListener("click", () => {
  pageItems.classList.toggle("active");
});
