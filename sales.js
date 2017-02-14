//define objects
var firstAndPike = {
  location: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerCust: 6.3,
};

var seaTacAirport = {
  location: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookiesPerCust: 1.2
};

var seattleCenter = {
  location: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  avgCookiesPerCust: 3.7
};

var capitolHill = {
  location: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookiesPerCust: 2.3
};

var alki = {
  location: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookiesPerCust: 4.6
};

function genRandomCust() {
  Math.floor(Math.random() * (this.maxCustomers + 1 - this.minCustomers) - this.minCustomers);
}

firstAndPike.genRandomCust = genRandomCust;
seaTacAirport.genRandomCust = genRandomCust;
seattleCenter.genRandomCust = genRandomCust;
capitolHill.genRandomCust = genRandomCust;
alki.genRandomCust = genRandomCust;

document.onload = function() {
    //create for loop to generate list elements
};