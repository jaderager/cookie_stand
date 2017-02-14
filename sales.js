//define objects
var firstAndPike = {
  location: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerCust: 6.3,
  salesArray: []
};

var seaTacAirport = {
  location: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookiesPerCust: 1.2,
  salesArray: []
};

var seattleCenter = {
  location: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  avgCookiesPerCust: 3.7,
  salesArray: []
};

var capitolHill = {
  location: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookiesPerCust: 2.3,
  salesArray: []
};

var alki = {
  location: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookiesPerCust: 4.6,
  salesArray: []
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
    }

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

document.onload = function() {
    //create for loop to generate list elements
};