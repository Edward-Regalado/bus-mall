'use strict';
console.log('hello world');
// Global Variables

let totalClicks = 0;
let clicksAllowed = 3;
let allProducts = [];
let indexArray = [];
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');

function Bus(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}


new Bus('usb', 'gif');
new Bus('bag');
new Bus('banana');
new Bus('bathroom');
new Bus('boots');
new Bus('breakfast');
new Bus('bubblegum');
new Bus('chair');
new Bus('cthulhu');
new Bus('dog-duck');
new Bus('dragon');
new Bus('pen');
new Bus('pet-sweep');
new Bus('scissors');
new Bus('shark');
new Bus('tauntaun');
new Bus('unicorn');
new Bus('water-can');
new Bus('wine-glass');
new Bus('sweep', 'png');


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

// console.log(indexArray);

function renderBus() {

  populateIndexArray();
  let firstBusIndex = indexArray.pop();
  let secondBusIndex = indexArray.pop();
  let thirdBusIndex = indexArray.pop();

  // while (firstBusIndex === secondBusIndex) {
  // secondBusIndex = getRandomIndex();
  // }

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
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} votes, and was seen ${allProducts[i].clicks} times`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image and FOLLOW INSTRUCTIONS');
    renderResults();
  }

  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderBus();
  if (totalClicks === clicksAllowed) {
    // REMOVE EVENT LISTENER
    myContainer.removeEventListener('click', handleClick);
  }

}

function handleButtonClick(event) { //eslint-disable-line

  if (totalClicks === clicksAllowed) {
    renderResults();
  }
}

renderBus();
myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);


// from repl this morning
// 
// console.log('hello 201n21');
// 
// const months = ['Dec', 'Feb', 'June', 'July'];
// 
// let myMonth = months[0];
// console.log(myMonth);
// console.log(months);
// 
// let donsMonth = months.shift();
// console.log(donsMonth);
// console.log(months);
// 
// let anotherMonth = months.pop();
// console.log(anotherMonth);
// console.log(months);
// 
// months.unshift('January');
// console.log(months);
// 
// months.push('July');
// console.log(months);
// 
// months.splice(1, 0, 'March', 'April');
// console.log(months);
// 
// let removedMonths= months.splice(1, 3);
// console.log(months);
// console.log(removedMonths);