const elH1 = document.getElementById("h1");
const p = document.getElementById("p");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");
const p5 = document.getElementById("p5");
const p6 = document.getElementById("p6");
const p7 = document.getElementById("p7");
const p8 = document.getElementById("p8");

const searchPara = new URL(window.location.href).searchParams;
const id = searchPara.get("id");

fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${id}`)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.name);
    elH1.innerText = res.name ? res.name : "No Data";
    p.innerText = res.trim ? res.trim : "No Data";
    p2.innerText = res.engine ? res.engine : "No Data";
    p3.innerText = res.color ? res.color : "No Data";
    p4.innerText = res.horsepower ? res.horsepower : "No Data";
    p5.innerText = res.fuelType ? res.fuelType : "No Data";
    p6.innerText = res.maxSpeed ? res.maxSpeed : "No Data";
    p7.innerText = res.category ? res.category : "No Data";
    p8.innerText = res.description ? res.description : "No Data";
  })
  .catch(() => {
    console.log("Xato");
  });