'use strict';
//console.log('hello world');
// Global Variables

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let indexArray = [];
let myContainer = document.getElementById('img-box');

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');

// Constructor Function //

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('usb', 'gif');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');
new Product('sweep', 'png');


function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function populateIndexArray() {
  while (indexArray.length < 3) {
    let randomIndex = getRandomIndex();
    while (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }
}

function renderProducts() {
  populateIndexArray();
  let firstBusIndex = indexArray.pop();
  let secondBusIndex = indexArray.pop();
  let thirdBusIndex = indexArray.pop();

  imageOne.src = allProducts[firstBusIndex].src;
  imageOne.title = allProducts[firstBusIndex].name;
  allProducts[firstBusIndex].views++;

  imageTwo.src = allProducts[secondBusIndex].src;
  imageTwo.title = allProducts[secondBusIndex].name;
  allProducts[secondBusIndex].views++;

  imageThree.src = allProducts[thirdBusIndex].src;
  imageTwo.title = allProducts[thirdBusIndex].name;
  allProducts[thirdBusIndex].views++;
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image and FOLLOW INSTRUCTIONS');
  }

  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderProducts();
  if (totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderChart();
  }
}

renderProducts();

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  var chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        data: productViews,
        backgroundColor: 'rgba(255, 255, 255, 3)',
        borderColor: 'rgba(255, 255, 255, 10)',
        borderWidth: 1
      },
      {
        label: 'Clicks',
        data: productViews,
        backgroundColor: 'rgba(34, 166, 179, 3)',
        borderColor: 'rgba(34, 166, 179, 10)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', handleClick);

