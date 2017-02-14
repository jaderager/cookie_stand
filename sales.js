'use strict';

//define objects

function Store(locstring, minCustomers, maxCustomers, avgCookiesPerCust, salesUlId) {
  this.locstring = locstring;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.salesUlId = salesUlId;
  this.salesArray = [];

  this.genRandomCust = function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  this.cookiesPerHour = function cookiesPerHour() {
    return this.genRandomCust() * this.avgCookiesPerCust;
  };

  this.genHourlySales = function genHourlySales() {

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
  };
}

var firstAndPike = new Store('1st and Pike',
23,65,6.3,
'firstAndPikeSalesList');

var seaTacAirport = new Store('SeaTac Airport',
3,24,1.2,
'seattleCenterSalesList');

var seattleCenter = new Store('seattle Center',
11,38,3.7,
'seattleCenterSalesList');

var capitolHill = new Store('Capitol Hill',
20,38,2.3,
'capitolHillSalesList');

var alki = new Store('Alki',
2,16,4.6,
'alkiSalesList');

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