'use strict';
//console.log('hello world');
// Global Variables

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let indexArray = [];
let uniqueImageCount = 6;
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');

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

function renderProducts() {
  while (indexArray.length < uniqueImageCount) {
    let randomIndex = getRandomIndex();
    while (!indexArray.includes(randomIndex)) {
      indexArray.unshift(randomIndex);
    }
  }
  // console.log(indexArray);
  let firstProductIndex = indexArray.pop();
  let secondProductIndex = indexArray.pop();
  let thirdProductIndex = indexArray.pop();

  imageOne.src = allProducts[firstProductIndex].src;
  imageOne.title = allProducts[firstProductIndex].name;
  allProducts[firstProductIndex].views++;

  imageTwo.src = allProducts[secondProductIndex].src;
  imageTwo.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  imageThree.src = allProducts[thirdProductIndex].src;
  imageThree.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on your favorite Product!');
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
        data: productClicks,
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
  let myChart = new Chart(ctx, chartObject); //eslint-disable-line
}

myContainer.addEventListener('click', handleClick);

