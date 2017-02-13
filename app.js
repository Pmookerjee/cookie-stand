var headers = ['      ','10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm']
var totals = [];

//Initialize the Location objects...
var PikePlace = new Location('Pike Place', 17, 88, 5.2);
var SeaTac = new Location('SeaTac Airport', 6, 24, 1.2);
var Southcenter = new Location('Southcenter', 11, 38, 1.9);
var BellevueSquare = new Location('Bellevue Square', 20, 48, 3.3);
var Alki = new Location('Alki', 3, 24, 2.6);

//Store the objects in an array
var store = [PikePlace, SeaTac, Southcenter, BellevueSquare, Alki];

//Draw the table header once
renderTableHeader(headers);

for(var j=0; j<store.length; j++){
  for (var i=0; i<headers.length-1; i++){
    var randomNum = store[j].getRandom();
    store[j].getCookiesPerHr(randomNum);
    store[j].addToTotal(i);

  }
  //Store the totals for all stores in a 2d array
  totals[j] = store[j].cookiesPerHr;
  store[j].renderTableBody();
}

renderTotals(totals);

function renderTotals(t) {
  var tbody = document.getElementById('table_body');
  var newTr = document.createElement('tr');
  var newTd = document.createElement('td');
  newTd.setAttribute('id', 'totals');
  var content = document.createTextNode('Totals');
  newTd.appendChild(content);
  newTr.appendChild(newTd);
  tbody.appendChild(newTr);
  for(var i=0; i<headers.length-1; i++){
    var total = 0;
    for(var j=0; j<store.length; j++){
      total += +t[j][i];
    }
    var newTd = document.createElement('td');
    newTd.setAttribute('id', 'totals');
    var cookieData = document.createTextNode(total);
    newTd.appendChild(cookieData);
    newTr.appendChild(newTd);
    tbody.appendChild(newTr);
  }
}

function Location(name, min, max, avg) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.cookiesPerHr = [];
  this.totalCookies = 0;

  this.getRandom = function(){
    return Math.round(Math.random() * (this.max - this.min) + this.min);
  };
  this.getCookiesPerHr = function(num) {
    var cookies = num * this.avg;
    this.cookiesPerHr.push(cookies.toFixed(0));
  };

  this.renderTableBody = function() {
    //check if location name has already been displayed in table row
    var tbody = document.getElementById('table_body');
    var newTr = document.createElement('tr');
    var newTd = document.createElement('td');
    var content = document.createTextNode(this.name);
    newTd.appendChild(content);
    newTr.appendChild(newTd);
    tbody.appendChild(newTr);
    for(var i=0; i<this.cookiesPerHr.length; i++){
      var newTd = document.createElement('td');
      var cookieData = document.createTextNode(this.cookiesPerHr[i]);
      newTd.appendChild(cookieData);
      newTr.appendChild(newTd);
      tbody.appendChild(newTr);
    }
  };
  this.renderTableFooter = function(){};
  this.addToTotal = function(index){
    this.totalCookies += +this.cookiesPerHr[index];
  };
}

function renderTableHeader(headerNames){
  var header = document.getElementById('table_header');
  for (var i=0; i<headerNames.length; i++){
    var newTh = document.createElement('th');
    var headerName = document.createTextNode(headerNames[i]);
    newTh.appendChild(headerName);
    header.appendChild(newTh);
  }
};
