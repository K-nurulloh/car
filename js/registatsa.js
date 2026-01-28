const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const elToast = document.getElementById("toast");
const elToastTemplate = document.getElementById("toastTemplate");
const elButton = document.getElementById("js-loader-button");
const btnLoader = document.getElementById("btnLoader");

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

// loader button
elButton.addEventListener("click", () => {
  const formData = new FormData(elLoginForm);
  let hasEmpty = false;

  formData.forEach((value) => {
    if (value.trim() === "") {
      hasEmpty = true;
    }
  });
  if (hasEmpty) {
    showToast();
    return;
  }
     btnLoader.classList.remove("hidden");
   btnLoader.classList.add("opacity-100");

  elLoginForm.requestSubmit();

     setTimeout(() => {
       btnLoader.classList.add("opacity-0");
       setTimeout(() => {
         btnLoader.classList.add("hidden");
       }, 3000);
    }, 15000);
});
elLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(elLoginForm);
  const obj = {};

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  login(obj);
});
elLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log;
  const formData = new FormData(elLoginForm);
  const obj = {};

  formData.forEach((value, key) => {
    obj[key] = value;

    const loader = document.getElementById("loader");
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(MIN_LOAD_TIME - elapsed, 0);

    setTimeout(() => {
      loader.classList.add("opacity-0"); // fade out
      setTimeout(() => {
        loader.style.display = "none";
      }, 3000);
    }, remaining);
  });
  login(obj);
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
      location.href = "../index.html";
    })
    .catch(() => {
      alert("Xatolik yuz berdi, qayta urinib ko'ring");
    });
}

// LOADER
const MIN_LOAD_TIME = 3000;
const startTime = Date.now();

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(MIN_LOAD_TIME - elapsed, 0);

  setTimeout(() => {
    loader.classList.add("opacity-0"); // fade out
    setTimeout(() => {
      loader.style.display = "none";
    }, 3000);
  }, remaining);
});

// toost qismi

function showToast() {
  elLoginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(elLoginForm);
    const obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });
    for (let key in obj) {
      if (obj[key] == "") {
        const clone = elToastTemplate.cloneNode(true).content;
        clone.querySelector("span").innerText = `${key} joyni to'ldring`;
        elToast.appendChild(clone);

        setTimeout(() => {
          document.querySelector(`[role="alert"]`).remove();
        }, 1000);
      }
    }
    add(obj);
  });
}
