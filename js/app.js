const elContainer = document.getElementById('container');
const elPrev = document.getElementById('prev');
const elNext = document.getElementById('next');
const elCarName = document.querySelector('.js-car-name');
const elCarYear = document.querySelector('.js-car-year');
const elCarColor = document.querySelector('.js-car-color');
const elCarSpeed = document.querySelector('.js-car-speed');
const elCarPower = document.querySelector('.js-car-power');
const elCarAcceleration = document.querySelector('.js-car-acceleration');
const elCarCategory = document.querySelector('.js-car-category');
const elSubmitButton = document.querySelector('#submitButton');
const elCarForm = document.querySelector('#carAddForm');
const elEditModal = document.querySelector('#editModal');
const elCarEditForm = document.querySelector('#carEditForm');

let limit = 4;
let skip = 0;
let editId = null;

if (skip === 0) {
  elPrev.style.display = 'none';
} else {
  elPrev.style.display = 'flex';
}

loader(true);
request();

function request() {
  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars?skip=${skip}&limit=${limit}`)
    .then((res) => res.json())
    .then((res) => {
      ui(res.data);
    })
    .finally(() => {
      loader(false);
    });
}

function loader(bool) {
  const elLoader = document.getElementById('loader');
  const elLoaderTemplate = document.getElementById('templateLoader');
  elLoader.innerHTML = null;

  if (bool) {
    Array.from({ length: 4 }).forEach(() => {
      elLoader.appendChild(elLoaderTemplate.cloneNode(true).content);
    });
  }
}

function ui(data) {
  if (skip === 0) {
    elPrev.style.display = 'none';
  } else {
    elPrev.style.display = 'flex';
  }

  paginationDisabled(false);

  const elTemp = document.getElementById('templateCard');

  data.forEach((el) => {
    const clone = elTemp.cloneNode(true).content;

    clone.querySelector('h2').innerText = el.name ? el.name : 'No title';

    
    clone.querySelector('p').innerText =
      el.category && el.year
        ? el.category + ' ' + el.year
        : 'No massage';

    clone.querySelector('.js-delete-button').id = el.id;
    clone.querySelector('.js-info-button').id = el.id;

    elContainer.appendChild(clone);
  });
}

elContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('js-delete-button')) {
    evt.target.disabled = true;
    evt.target.innerHTML = `...`;
    deleteCar(evt.target.id);
  }

  if (evt.target.classList.contains('js-info-button')) {
    infoCar(evt.target.id);
  }
});

// Delete
function deleteCar(id) {
  fetch('https://json-api.uz/api/project/fn44-amaliyot/cars/' + id, {
    method: 'DELETE',
  })
    .then((res) => res.text())
    .then(() => {
      document.getElementById(id).closest('.card').remove();
    });
}

elPrev.addEventListener('click', () => {
  skip = skip - limit;
  elContainer.innerHTML = null;
  loader(true);
  paginationDisabled(true);
  request();
});

elNext.addEventListener('click', () => {
  skip = skip + limit;
  elContainer.innerHTML = null;
  loader(true);
  paginationDisabled(true);
  request();
});

function paginationDisabled(bool) {
  if (skip === 0) {
    elPrev.style.display = 'none';
  } else {
    elPrev.style.display = 'flex';
  }

  elNext.style.pointerEvents = bool ? 'none' : 'all';
}

// Info
function infoCar(id) {
  window.open(`/details.html?id=${id}`, '_blank');
}

elCarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(elCarForm);
  const result = {};
  const arr = [];

  formData.forEach((value, key) => {
    result[key] = value;
    if (value.trim() === '') {
      arr.push(key);
    }
  });
  function infoCar(id) {
  window.open(`/details.html?id=${id}`, '_blank');
}

elCarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(elCarForm);
  const result = {};
  const arr = [];

  formData.forEach((value, key) => {
    result[key] = value;

    if (value.trim() === '') {
      arr.push(key);
    }
  });

  if (arr.length > 0) {
    const clone = elTostTemplate.cloneNode(true).content;
    clone.querySelector('span').innerText = `${arr[0]} kiriting!`;
    elTost.appendChild(clone);

    const focusInput = elCarForm.querySelector(`[name="${arr[0]}"]`);
    focusInput.focus();

    setTimeout(() => {
      document.querySelector('[role="alert"]').remove();
    }, 1500);
  } else {
    const clone = elSuccessTemplate.cloneNode(true).content;
    elTost.appendChild(clone);
    add(result);
    setTimeout(() => {
      document.querySelector('[role="alert"]').remove();
    }, 2000);
  }
});

elCarEditForm.addEventListener('submit', (el) => {
  el.preventDefault();

  const formData = new FormData(elCarEditForm);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${editId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      elEditModal.close();

      elContainer.innerHTML = '';
      loader(true);
      request();
    });
});

// GET

// Delete

function deleteCar(id) {
  fetch('https://json-api.uz/api/project/fn44-amaliyot/cars/' + id, {
    method: 'DELETE',
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      document.getElementById(id).closest('.card').remove();
      const clone = elSuccessTemplate.cloneNode(true).content;
      elTost.appendChild(clone);
      setTimeout(() => {
        document.querySelector('[role="alert"]').remove();
      }, 2000);
    })
    .finally(() => {});
}

function add(data) {
  fetch('https://json-api.uz/api/project/fn44-amaliyot/cars/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const elAddModal = document.getElementById('my_modal_3');
      elAddModal.close()
      elCarForm.reset();
      ui([res]);
      const clone = elSuccessTemplate.cloneNode(true).content;
      elTost.appendChild(clone);
      setTimeout(() => {
        document.querySelector('[role="alert"]').remove();
      }, 2000);
    })
    .finally(() => {});
}

function getById(id) {
  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${id}`)
    .then((res) => res.json())
    .then((res) => {
      editId = id;
      elEditModal.showModal();

      elCarEditForm.name.value = res.name;
      elCarEditForm.year.value = res.year;
      elCarEditForm.color.value = res.color;
      elCarEditForm.speed.value = res.speed;
      elCarEditForm.power.value = res.power;
      elCarEditForm.acceleration.value = res.acceleration;
      elCarEditForm.category.value = res.category;
    });
}

  
});

