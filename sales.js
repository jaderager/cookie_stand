'use strict';

/*  The all-important Store object constructor */
function Store(locString, minCustomers, maxCustomers, avgCookiesPerCust) {
  this.locString = locString;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCust = avgCookiesPerCust;

  this.salesOutputArray = [];

  /*  generates number of customers */
  this.genRandomCust = function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  /*  multiply number of customers by rate */
  this.cookiesPerHour = function cookiesPerHour() {
    return Math.round(this.genRandomCust() * this.avgCookiesPerCust);
  };

  this.genSalesStrings = function genSalesStrings() {

    for (var i = 6; i <= 20; i++) {
      this.salesOutputArray.push(this.cookiesPerHour());
    }
    console.log('.genSalesStrings() :: finished building salesOutputArray: ' + this.salesOutputArray);
  };
  this.genSalesStrings();
}
/*  will contain pregenerated strings to be created as text nodes, following format:
    6am: 315 cookies  */

Store.prototype.headingOutputArray = [];
Store.prototype.genHeadingStrings = function genHeadingStrings() {

  for (var i = 6; i <= 20; i++) {
    var workingString = ''; //temp string
    var time = parseHr12(i);

    /*  begin building string. mock string output follows in comments */
    workingString += time[0]; // '6'
    if (!time[1]) {
      workingString += ':00am'; // '6' + 'am: '
    } else if (time[1]) {
      workingString += ':00pm'; // '6' + 'pm: '
    }

    this.headingOutputArray.push(workingString); //finally, push complete string
  }
  console.log('.genHeadingStrings() :: finished building headingOutputArray: ' + this.headingOutputArray);
};
Store.prototype.genHeadingStrings();

/*  Initialize Store objects  */
var firstAndPike = new Store('1st and Pike', //locString
23, 65, 6.3); //minCustomers, maxCustomers, avgCookiesPerCust

var seaTacAirport = new Store('SeaTac Airport', //locString
3, 24, 1.2); //minCustomers, maxCustomers, avgCookiesPerCust

var seattleCenter = new Store('Seattle Center', //locString
11, 38, 3.7); //minCustomers, maxCustomers, avgCookiesPerCust

var capitolHill = new Store('Capitol Hill',
20, 38, 2.3); //minCustomers, maxCustomers, avgCookiesPerCust

var alki = new Store('Alki', //locString
2, 16, 4.6); //minCustomers, maxCustomers, avgCookiesPerCust

var superStore = [firstAndPike,seaTacAirport,seattleCenter,capitolHill,alki]; //IMPORTANT: index of all Store objects

/*  GENERIC PARSING FUNCTIONS   */
function parseHr12 (hr24) {
  var amPmFlag; //12hr am/pm bit
  var hr12; //12hr hour value

  if (hr24 < 12) { //if before noon...
    amPmFlag = 0;
    hr12 = hr24;
  } else if (hr24 === 12) { //if noon...
    amPmFlag = 1;
    hr12 = 12; //naturally. value of 0 for below calc would not work.
  } else {
    amPmFlag = 1;
    hr12 = hr24 - 12; //convert to 12hr. does not work at noon
  } //don't need to make it work for midnight, outside store hours. I'm sure this will become its own Y2K (T2400?) bug should the owner decide to expand business hours to a 24/7 model.

  return [hr12, amPmFlag];
}

/*  GENERIC DOM MANIPULATION FUNCTIONS  */
/*  Note to self: consider removing parameter type analysis in favor of accepting only direct nodes, do all node selection at function call.
    e.g. insertNode(document.getElementById('htmlId'), 'li')
    This will avoid redundancy and improve performance, at cost of...? Readability? Think on it. */

/*  Inserts node of element type nodeType as child of target. */
function insertNode (target, nodeType) {
  console.log('FUNCTION_EXECUTE insertNode(' + target + ',' + nodeType + ')');
  console.log('insertNode() :: typeof target parameter is ' + typeof target);

  var targetNodeObj;
  var newNode;

  if (typeof target === 'string') { //if passing target id of a node
    targetNodeObj = document.getElementById(target);
  } else if (typeof target === 'object') { //if directly passing node
    targetNodeObj = target;
  }

  newNode = document.createElement(nodeType);

  targetNodeObj.appendChild(newNode);
  console.log('insertNode() :: RETURN lastChild ' + targetNodeObj.lastChild + 'of targetNode ' + targetNodeObj);
  return targetNodeObj.lastChild; //this is the reason we check the typeof target. somewhere in the chain of calls it can break if a DOM node is being passed to a function such as this one which expects a string referencing an HTML id.
}

/*  As above, but creates a child text node.  */
function insertNodeWithText (target, nodeType, textInput) {
  console.log('insertNodeWithText() :: FUNCTION_EXECUTE(' + target + ',' + nodeType + ',' + textInput + ')');
  console.log('insertNodeWithText() :: typeof target parameter is ' + typeof target);

  var targetNodeObj;
  var newNode;
  var newTextNode;

  if (typeof target === 'string') { //if passing target id of a node
    targetNodeObj = document.getElementById(target);
  } else if (typeof target === 'object') { //if directly passing node
    targetNodeObj = target;
  }

  newNode = document.createElement(nodeType);
  newTextNode = document.createTextNode(textInput);

  newNode.appendChild(newTextNode);
  console.log('insertNodeWithText() :: appending newNode ' + newNode + ' to targetNode ' + targetNodeObj);
  targetNodeObj.appendChild(newNode);
  console.log('insertNodeWithText() :: RETURN lastChild (' + targetNodeObj.lastChild + ') of targetNode (' + targetNodeObj + ')');
  return targetNodeObj.lastChild; //this is the reason we check the typeof target. somewhere in the chain of calls it can break if a DOM node is being passed to a function such as this one which expects a string referencing an HTML id.
}

/*  MAIN EXECUTION  */

/*  WILL NOT WORK IF NODE PASSED DIRECTLY TO, USE ID INSTEAD
    Used to recursively add elements.
    Tightly coupled with Store objects, only a wrapper function.  */
function generateSalesElements (target, objIndex) { //takes wrapper element as argument
  console.log('generateSalesElements() :: FUNCTION_EXECUTE');

  var targetSectionNodeObj = document.getElementById(target);
  var targetTableNodeObj;
  var targetTableRowNodeObj;

  //must generate new table object and capture for rest of function to use
  targetTableNodeObj = insertNode(targetSectionNodeObj, 'table');

  /*  GENERATE TABLE HEADING  */
  //create corner cell...
  targetTableRowNodeObj = insertNode(targetTableNodeObj, 'tr');
  insertNode(targetTableRowNodeObj, 'td');

  //fill out rest of table heading
  for (var i = 0; i < Store.prototype.headingOutputArray.length; i++) {
    insertNodeWithText(targetTableRowNodeObj, 'td', Store.prototype.headingOutputArray[i]);
  }

  //now we have to generate as many table rows as there are stores...
  for (i = 0; i < (objIndex.length); i++) {


    targetTableRowNodeObj = insertNode(targetTableNodeObj, 'tr'); //begin row
    insertNodeWithText(targetTableRowNodeObj, 'td', objIndex[i].locString); //create first cell with store location name

    //while generate a row, make sure to add TDs
    for (var j = 0; j < (objIndex[i].salesOutputArray.length); j++) {
      insertNodeWithText(targetTableRowNodeObj, 'td', objIndex[i].salesOutputArray[j]);
    }

    /* insertNodeWithText(targetSectionNodeObj, 'h1', objIndex[i].locString);
    targetUlNodeObj = insertNode(targetSectionNodeObj, 'ul'); //not only append ul element to targetNodeObj, but pass its new child node(HTML Obj) to targetUl for future appending to */
  }
  console.log('FUNCTION_BREAK insertUlLiIter()');
}



/*I'm using this function as a wrapper with the onload HTML attr to ensure all list elements are extant by the time it executes. The linter doesn't recognize that it's being used that way.*/
function execUponLoad() { //eslint-disable-line
  console.log('document loaded');

  generateSalesElements('salesSection', superStore);

}