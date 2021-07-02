const form = document.querySelector(".form");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");

function showError(x, message) {
  const formControl = x.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(x) {
  const formControl = x.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${capitalFirst(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalFirst(input)} must be at least ${min} characters`
    );
  } else if (input.value.lenght > max) {
    showError(
      input,
      `${capitalFirst(input)} must be at less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords don't match");
  } else if (input2.value === "") {
    showError(input2, `${capitalFirst(input2)} is required`);
  } else {
    showSuccess(input2);
  }
}

function capitalFirst(input) {
  return input.className.charAt(0).toUpperCase() + input.className.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password]);
  checkPasswordMatch(password, password2);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
});
