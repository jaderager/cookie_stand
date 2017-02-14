'use strict';

//define objects
var firstAndPike = {
  location: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerCust: 6.3,
  salesArray: [],
  salesUlId: 'firstAndPikeSalesList'
};

var seaTacAirport = {
  location: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookiesPerCust: 1.2,
  salesArray: [],
  salesUlId: 'seaTacAirportSalesList'
};

var seattleCenter = {
  location: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  avgCookiesPerCust: 3.7,
  salesArray: [],
  salesUlId: 'seattleCenterSalesList'
};

var capitolHill = {
  location: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookiesPerCust: 2.3,
  salesArray: [],
  salesUlId: 'capitolHillSalesList'
};

var alki = {
  location: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookiesPerCust: 4.6,
  salesArray: [],
  salesUlId: 'alkiSalesList'
};

function genRandomCust() {
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

firstAndPike.genRandomCust = genRandomCust;
seaTacAirport.genRandomCust = genRandomCust;
seattleCenter.genRandomCust = genRandomCust;
capitolHill.genRandomCust = genRandomCust;
alki.genRandomCust = genRandomCust;

function cookiesPerHour() {
  return this.genRandomCust() * this.avgCookiesPerCust;
}

firstAndPike.cookiesPerHour = cookiesPerHour;
seaTacAirport.cookiesPerHour = cookiesPerHour;
seattleCenter.cookiesPerHour = cookiesPerHour;
capitolHill.cookiesPerHour = cookiesPerHour;
alki.cookiesPerHour = cookiesPerHour;

function genHourlySales() {

  for (var i = 6; i <= 20; i++) {
    var amPmFlag; //12hr am/pm bit
    var twelveHourTime; //12hr hour value
    var workingString = ''; //temp string

    if (i < 12) { //if before noon
      amPmFlag = 0;
      twelveHourTime = i;
    } else if (i === 12) { //if noon
      amPmFlag = 1;
      twelveHourTime = 12; //naturally. value of 0 for below calc would not work.
    } else {
      amPmFlag = 1;
      twelveHourTime = i - 12; //convert to 12hr. does not work at noon
    } //don't need to make it work for midnight, outside store hours. I'm sure this will become its own Y2K (T2400?) bug should the owner decide to expand business hours to a 24/7 model.

    workingString += twelveHourTime; //6 ...
    if (!amPmFlag) {
      workingString += 'am: '; //6am: ...
    } else if (amPmFlag) {
      workingString += 'pm: '; //6pm: ...
    }

    workingString += this.cookiesPerHour() + ' cookies'; //6xm: __ cookies

    this.salesArray.push(workingString);
  }
}

firstAndPike.genHourlySales = genHourlySales;
seaTacAirport.genHourlySales = genHourlySales;
seattleCenter.genHourlySales = genHourlySales;
capitolHill.genHourlySales = genHourlySales;
alki.genHourlySales = genHourlySales;

//actually assign values to respective salesArray 's
firstAndPike.genHourlySales();
seaTacAirport.genHourlySales();
seattleCenter.genHourlySales();
capitolHill.genHourlySales();
alki.genHourlySales();

function insertLiIntoUlIter (ulId, array) {
  console.log('begin insertLiIntoUlIter');
  var caUl = document.getElementById(ulId);
  console.log('create var caUl with val ' + caUl);
  var newLiNode;
  var newLiTextNode;

  console.log('begin insertLiIntoUl for loop');
  for (var i = 0; i < array.length; i++) {
    console.log('ITERATION ' + i);
    newLiNode = document.createElement('li');
    console.log('assign var newLiNode with val ' + newLiNode);
    newLiTextNode = document.createTextNode(array[i]);
    console.log('assign new var newLiNode with val ' + newLiNode);
    newLiNode.appendChild(newLiTextNode);
    caUl.appendChild(newLiNode);
  }
  console.log('exit insertLiIntoUlIter');
}

/* I'm using this function as a wrapper with the onload HTML attr to ensure all list elements are extant by the time it executes. The linter doesn't recognize that it's being used that way. */
function execUponLoad() { //eslint-disable-line
  console.log('document loaded');

  insertLiIntoUlIter(firstAndPike.salesUlId, firstAndPike.salesArray);
  insertLiIntoUlIter(seaTacAirport.salesUlId, seaTacAirport.salesArray);
  insertLiIntoUlIter(seattleCenter.salesUlId, seattleCenter.salesArray);
  insertLiIntoUlIter(capitolHill.salesUlId, capitolHill.salesArray);
  insertLiIntoUlIter(alki.salesUlId, alki.salesArray);
}