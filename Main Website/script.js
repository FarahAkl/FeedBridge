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

const confirmBtn = document.querySelector(".confirm-btn");

// Add event listeners to the register and login forms
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

// Validate register form
const validateRegisterForm = () => {
  const usernameVal = username.value.trim();
  const ageVal = age.value.trim();
  const phoneVal = phone.value.trim();
  const emailVal = email.value.trim();
  const countryVal = country.value.trim();
  const cityVal = city.value.trim();
  const passwordVal = password.value.trim();
  const confirmPassVal = confirmPassword.value.trim();

  let isValid = true;

  // Validation for each field
  isValid &= validateField(
    username,
    usernameVal,
    "يجب ادخال قيمه في هذا الحقل"
  );
  isValid &= validateField(age, ageVal, "يجب ادخال قيمه في هذا الحقل");
  isValid &= validateField(phone, phoneVal, "يجب ادخال قيمه في هذا الحقل");
  isValid &= validateEmail(email, emailVal);
  isValid &= validatePassword(password, passwordVal);
  isValid &= validateConfirmPassword(
    confirmPassword,
    confirmPassVal,
    passwordVal
  );
  isValid &= validateField(country, countryVal, "يجب ادخال قيمه في هذا الحقل");
  isValid &= validateField(city, cityVal, "يجب ادخال قيمه في هذا الحقل");

  if (isValid) {
    const data = {
      username: usernameVal,
      age: ageVal,
      phone: phoneVal,
      email: emailVal,
      country: countryVal,
      city: cityVal,
      password: passwordVal,
    };

    fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("تم التسجيل بنجاح");
        // Redirect أو أي شيء آخر
      })
      .catch((err) => console.error("حدث خطأ:", err));
  }
};

// Validate login form
const validateLoginForm = () => {
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();

  let isValid = true;

  isValid &= validateEmail(email, emailVal);
  isValid &= validateField(
    password,
    passwordVal,
    "يجب ادخال قيمه في هذا الحقل"
  );

  if (isValid) {
    const data = {
      email: emailVal,
      password: passwordVal,
    };

    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("تم تسجيل الدخول");
          window.location.href = data.redirect; // أو أي صفحة
        } else {
          alert("بيانات غير صحيحة");
        }
      })
      .catch((err) => console.error("حدث خطأ:", err));
  }
};

// Duplicated validation logic simplified
const validateField = (input, value, errorMessage) => {
  if (value === "") {
    setErrorFor(input, errorMessage);
    return false;
  }
  setSuccessFor(input);
  return true;
};

const validateEmail = (input, value) => {
  if (value === "") {
    setErrorFor(input, "يجب ادخال قيمه في هذا الحقل");
    return false;
  }
  if (!isEmail(value)) {
    setErrorFor(input, "الايميل غير صالح");
    return false;
  }
  setSuccessFor(input);
  return true;
};

const validatePassword = (input, value) => {
  if (value === "") {
    setErrorFor(input, "يجب ادخال قيمه في هذا الحقل");
    return false;
  }
  if (value.length < 8) {
    setErrorFor(input, "كلمة السر يجب ألا تقل عن 8 أحرف");
    return false;
  }
  setSuccessFor(input);
  return true;
};

const validateConfirmPassword = (input, value, password) => {
  if (value === "") {
    setErrorFor(input, "يجب ادخال قيمه في هذا الحقل");
    return false;
  }
  if (value !== password) {
    setErrorFor(input, "كلمه السر غير متطابقه");
    return false;
  }
  setSuccessFor(input);
  return true;
};

// Set error and success message
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

// Mobile menu toggle
mobileMenu.addEventListener("click", () => {
  pageItems.classList.toggle("active");
});

// Payment confirm

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".payment-container").style.display = "none";
  document.querySelector(".confirm-container").style.display = "flex";
});
