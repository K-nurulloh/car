const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.onclick = function () {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
};

registerBtn.onclick = function () {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
};

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(loginForm);
  const result = {};

  formData.forEach((value, key) => {
    result[key] = value;
  });

  login(result);
});

function login(data) {
  fetch("https://json-api.uz/api/project/fn44-amaliyot/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      location.href = "./index.html";
    })
    .catch(() => {});
}

