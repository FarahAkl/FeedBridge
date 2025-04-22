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

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (dropdownToggle) {
  dropdownToggle.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "flex" ? "none" : "flex";
  });
}

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

// Feedback Stars
const labels = document.querySelectorAll(".stars label");
const checkboxes = document.querySelectorAll(".stars input");
let currentRating = 0;

labels.forEach((label, index) => {
  label.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedRating = index + 1;

    // If clicking the same rating, reset
    if (clickedRating === currentRating) {
      currentRating = 0;
    } else {
      currentRating = clickedRating;
    }

    // Update checkbox states
    checkboxes.forEach((cb, i) => {
      cb.checked = i < currentRating;
    });
  });
});

// Change the upload icon to image

const uploadIcon = document.querySelector("#uploadIcon");
const fileInput = document.getElementById("donationFile");

if (fileInput) {
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadIcon.style.backgroundImage = `url(${e.target.result})`;
        uploadIcon.style.backgroundSize = "cover";
        uploadIcon.style.backgroundPosition = "center";
        uploadIcon.style.width = "100px";
        uploadIcon.style.height = "100px";
        uploadIcon.textContent = "";
      };
      reader.readAsDataURL(file);
    }
  });
}

// Add to cart

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartItemsContainer = document.querySelector(".cart-container");
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

// Display cart items from local storage
const displayCartItems = (cartData) => {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  if (cartData.length === 0) {
    cartItemsContainer.innerHTML = `<p class="no-items">لا توجد عناصر في السلة</p>`;
    return;
  }

  cartData.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <div class="cart-item">
        <div class="product-section">
          <div class="product-info">
            <div class="product-image">
              <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="product-text">
              <div>${item.name}</div>
              <div>${item.desc}</div>
            </div>
          </div>
        </div>
        <div class="qty-section">
          <div class="quantity-controls">
            <span class="quantity">${item.quantity}</span>
            <div class="control-btns">
              <button class="dec-btn" data-index="${index}">-</button>
              <button class="inc-btn" data-index="${index}">+</button>
            </div>
          </div>
          <div class="delete-btn" data-index="${index}">
            <span class="material-symbols-outlined"> delete </span>
            <span>حذف</span>
          </div>
        </div>
      </div>
      `;
    cartItemsContainer.appendChild(cartItem);
  });
  attachCartEvents();
};

// addToCart function
const addToCart = (e) => {
  const productCard = e.target.closest(".product-card");
  if (!productCard) return; // Ensure the product card is found

  const productName = productCard.querySelector("h2").textContent;
  const productDesc = productCard.querySelector("p").textContent;
  const productImage = productCard.querySelector("img").src;

  let cartItemHTML = {
    name: productName,
    desc: productDesc,
    image: productImage,
    quantity: 1,
  };
  cartData.push(cartItemHTML);
  localStorage.setItem("cartData", JSON.stringify(cartData)); // Save to local storage
  if (cartItemsContainer) displayCartItems(cartData);
};

const attachCartEvents = () => {
  const incBtns = document.querySelectorAll(".inc-btn");
  const decBtns = document.querySelectorAll(".dec-btn");
  const delBtns = document.querySelectorAll(".delete-btn");

  incBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      cartData[index].quantity += 1;
      localStorage.setItem("cartData", JSON.stringify(cartData));
      displayCartItems(cartData);
    });
  });

  decBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      if (cartData[index].quantity > 1) {
        cartData[index].quantity -= 1;
        localStorage.setItem("cartData", JSON.stringify(cartData));
        displayCartItems(cartData);
      }
    });
  });

  delBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      cartData.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(cartData));
      displayCartItems(cartData);
    });
  });
};

if (addToCartBtns.length > 0) {
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
}
if (addToCartBtns.length > 0) {
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("تمت الإضافة إلى السلة بنجاح");
    });
  });
}

if (cartItemsContainer) {
  displayCartItems(cartData);
}

// Confirm order button

const confirmOrder = document.querySelector(".confirm-order");
if (confirmOrder) {
  confirmOrder.addEventListener("click", () => {
    if (cartData.length === 0) {
      alert("لا توجد عناصر في السلة لتأكيد الطلب.");
      return;
    }
    const orderData = {
      items: cartData,
    };
    document.querySelector(
      ".cart-section"
    ).innerHTML = `<div class="confirm-container">
        <span class="material-symbols-outlined check-icon"> check_circle </span>
        <h2>تـــم الطلب بنجاح</h2>
        <a href="index.html" class="btn">العوده للرئيسيه</a>
      </div>`;

    cartData = [];
    localStorage.setItem("cartData", JSON.stringify(cartData));
    displayCartItems(cartData);
  });
}

const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".cardholder-name");

// Format card number input
if (cardNumber) {
  cardNumber.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    let formatted = value.match(/.{1,4}/g);
    e.target.value = formatted ? formatted.join(" ") : "";
  });
}
const isValidCardholderName = (n) => {
  const regex = /^[A-Za-z\u0600-\u06FF\s]{2,}$/; // includes Arabic characters too
  return regex.test(n.trim());
};

const isValidCardNumber = (n) => {
  const sanitized = n.replace(/\s+/g, ""); // remove spaces
  const onlyDigits = /^\d+$/;

  return (
    onlyDigits.test(sanitized) &&
    sanitized.length >= 13 &&
    sanitized.length <= 19
  );
};
// Payment confirm
if (confirmBtn) {
  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const numberValue = cardNumber.value.trim();
    const nameValue = cardName.value.trim();

    if (!cardNumber.value || !cardName.value) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    if (!isValidCardNumber(numberValue)) {
      alert("رقم البطاقة غير صالح");
      return;
    }

    if (!isValidCardholderName(nameValue)) {
      alert("اسم حامل البطاقة غير صالح");
      return;
    }
    document.querySelector(".payment-container").style.display = "none";
    document.querySelector(".confirm-container").style.display = "flex";
  });
}
