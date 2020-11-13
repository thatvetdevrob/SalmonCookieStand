/* eslint-disable no-unused-vars */
'use strict';
/*
Robert Rizo
The fish app
*/
// global variables
var hours = [' 9am ', ' 10am ', ' 11am ', ' 12pm ', ' 1pm ', ' 2pm ', ' 3pm ', ' 4pm ', ' 5pm '];
var allcookieshops = [];
var cookieshopTable = document.getElementById('cookieTable');
/*
THIS IS THE ADDED EVENT LISTENER
*/
const form = document.getElementById('form');
form.addEventListener('submit', logSubmit);
function logSubmit(event) {
  CookieStoreForm(document.getElementById('name').value,document.getElementById('minC').value,document.getElementById('maxC').value,document.getElementById('cPS').value);
  event.preventDefault();
}
function CookieStoreForm(name,minC,maxC,cPH) {
  // console.log(name);
  // console.log(maxC);
  // console.log(minC);
  // console.log(cPH);
  //deletes the table and we can start fresh!
  var Table = document.getElementById('cookieTable');
  Table.innerHTML = '';
  //This creates new store
  new CookieStore(name, maxC, minC, cPH);
  makeHeaderRow();
  renderallcookieshops();
  totalCookiesPerHour();
}
//my object blue print
function CookieStore(name, minC, maxC, cPS) {
  this.location = name;
  this.minCust = minC;
  this.maxCust = maxC;
  this.cookiesPerSale = cPS;
  this.cookiesSoldPerHr = [];
  allcookieshops.push(this);
}
// get the people per hour between the ranges
CookieStore.prototype.custPerHr = function () {
  return Math.ceil(Math.random() * ((this.maxCust) - (this.minCust)) + this.minCust);
};
//get the cookies sold p/h
CookieStore.prototype.cookiesPerHr = function () {
  return Math.round(this.cookiesPerSale * this.custPerHr());
};
// now the render
CookieStore.prototype.render = function() {
  var tr = document.createElement('tr');
  
  var th = document.createElement('th');
  th.textContent = this.location;
  tr.appendChild(th);
  var cookies = 0;
  var totalCookies = 0;
  for (var i = 0; i < hours.length; i++) {
    cookies = this.cookiesPerHr();
    var td = document.createElement('td');
    td.textContent = cookies;
    tr.appendChild(td);
    this.cookiesSoldPerHr.push(cookies);
    totalCookies += cookies;
  }
  td = document.createElement('td');
  td.textContent = totalCookies;
  tr.appendChild(td);
  cookieshopTable.appendChild(tr);
};
function makeHeaderRow() { // Header Row Function
  var theadElement = document.createElement('thead');
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  thElement = document.createElement('th');
  thElement.textContent = 'Daily Totals';
  trElement.appendChild(thElement);
  theadElement.appendChild(trElement);
  cookieshopTable.appendChild(theadElement);
}
function totalCookiesPerHour() { // Bottom Totals
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);
  var grandTotalCookies = 0;
  for (var i = 0; i < hours.length; i++) {
    var totalCookies = 0;
    for( var j = 0; j < allcookieshops.length; j++) {
      totalCookies += allcookieshops[j].cookiesSoldPerHr[i];
      grandTotalCookies += allcookieshops[j].cookiesSoldPerHr[i];
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = totalCookies;
    trElement.appendChild(tdElement);
  }
  tdElement = document.createElement('td');
  tdElement.textContent = grandTotalCookies;
  trElement.appendChild(tdElement);
  cookieshopTable.appendChild(trElement);
}
//Calls function to generate arrays with random number of cookies
/*
Seattle 	23 	65 	6.3
Tokyo 	3 	24 	1.2
Dubai 	11 	38 	3.7
Paris 	20 	38 	2.3
Lima 	2 	16 	4.6
*/
new CookieStore('Seattle', 23, 65, 6.3);
new CookieStore('Tokyo', 3, 24, 1.2);
new CookieStore('Dubai', 11, 38, 3.7);
new CookieStore('Paris', 20, 38, 2.3);
new CookieStore('Lima', 2, 16, 4.6);
function renderallcookieshops() {
  for(var i in allcookieshops) {
    allcookieshops[i].render();
  }
}
makeHeaderRow();
renderallcookieshops();
totalCookiesPerHour();
//Why re-invent the wheel?