const searchParams = new URL(window.location.href).searchParams;
const id = searchParams.get("id");
const div = document.getElementById("p");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");
const p5 = document.getElementById("p5");
const p6 = document.getElementById("p6");
const p7 = document.getElementById("p7");
const p8 = document.getElementById("p8");
const p9 = document.getElementById("p9");
const p10 = document.getElementById("p10");

fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars?id=${id}`)
  .then((res) => res.json())
  .then((res) => {
    const car = res.data[0];
    p1.textContent = car.name;
    p2.textContent = car.year;
    p3.textContent = car.engine;
    p4.textContent = car.fuelType;
    p5.textContent = car.horsepower;
    p6.textContent = car.country;
    p7.textContent = car.acceleration;
    p8.textContent = car.maxSpeed;
    p9.textContent = car.seatCount;
    p10.textContent = car.description;
  })
  .catch(() => {
    console.log("Error ❌");
  });



















