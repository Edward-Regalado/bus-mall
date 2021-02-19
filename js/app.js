'use strict';
//console.log('hello world');
// Global Variables

let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let indexArray = [];
let myContainer = document.getElementById('img-box');
let myButton = document.getElementById('results-button');

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

// Random number generator
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


function renderResults() {
  let myList = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {

    alert('Please click an image and FOLLOW INSTRUCTIONS');
    // renderResults();
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
    // Remove Event Listener
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event) { //eslint-disable-line
  if (totalClicks === clicksAllowed) {
    renderResults();
    totalClicks = 0;
  }
}

renderProducts();
myButton.addEventListener('click', handleButtonClick);
myContainer.addEventListener('click', handleClick);

