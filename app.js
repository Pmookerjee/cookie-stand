var headers = ['      ','10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm']
//Totals holds all the cookiesPerHr arrays for every store
var totals = [];
//Store holds all the Location objects
var store = [];

//Initialize the Location objects...
var PikePlace = new Location('Pike Place', 17, 88, 5.2);
var SeaTac = new Location('SeaTac Airport', 6, 24, 1.2);
var Southcenter = new Location('Southcenter', 11, 38, 1.9);
var BellevueSquare = new Location('Bellevue Square', 20, 48, 3.3);
var Alki = new Location('Alki', 3, 24, 2.6);

//index for totals[], for event form submit
var row = 0;

form.addEventListener('submit', handleFormSubmit);

function Location(name, min, max, avg) {
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.cookiesPerHr = [];
  this.totalCookies = 0;
  store.push(this);
}

Location.prototype.getRandom = function(){
  var beans = Math.floor(Math.random() * (this.max - this.min)) + this.min;
  return beans;
};

Location.prototype.getCookiesPerHr = function(num) {
  var cookies = num * this.avg;
  this.cookiesPerHr.push(cookies.toFixed(0));
};

Location.prototype.renderTableRow = function() {
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

Location.prototype.addToTotal = function(index){
  this.totalCookies += +this.cookiesPerHr[index];
};

function renderTableHeader(headerNames){
  var header = document.getElementById('table_header');
  for (var i=0; i<headerNames.length; i++){
    var newTh = document.createElement('th');
    var headerName = document.createTextNode(headerNames[i]);
    newTh.appendChild(headerName);
    header.appendChild(newTh);
  }
};

function deleteTableFooter(){
  var removeTr = document.getElementById('totals_row');
  var containerTr = removeTr.parentNode;
  containerTr.removeChild(removeTr);
}

function renderTableFooter(t) {
  //Check if Totals row exists: if so remove the row...
  if(document.getElementById('totals_row')) { deleteTableFooter(); }

  //Draw first only the Row header called 'Totals'
  var tbody = document.getElementById('table_footer');
  var newTr = document.createElement('tr');
  newTr.setAttribute('id', 'totals_row')
  var newTd = document.createElement('td');
  newTd.setAttribute('id', 'totals');
  var content = document.createTextNode('Totals');
  newTd.appendChild(content);
  newTr.appendChild(newTd);
  tbody.appendChild(newTr);

  //Go by column to get the cookie totals for each hour
  for(var i=0; i<headers.length-1; i++){
    var total = 0;
    for(var j=0; j<store.length; j++){
      total += +t[j][i];
    }

    //Render the content of the current total
    var newTd = document.createElement('td');
    newTd.setAttribute('id', 'totals');
    var cookieData = document.createTextNode(total);
    newTd.appendChild(cookieData);
    newTr.appendChild(newTd);
    tbody.appendChild(newTr);
  }
}
function locationExists(location){
    for (var i = 0; i<store.length; i++){
      if (store[i].name===location){
        return store[i];
      }
    }
    return false;
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log(event);

  var location = event.target.location.value;
  var min = parseInt(event.target.min.value);
  var max = parseInt(event.target.max.value);
  var avg = parseFloat(event.target.avg.value);
  debugger;

  var storeLocation = locationExists(location);

  if (storeLocation){

    var index = store.indexOf(storeLocation);
    document.getElementById('table_body').deleteRow(index);
    store[index].min = min;
    store[index].max = max;
    store[index].avg = avg;
    for (var i=0; i<headers.length-1; i++){
      randomNum = store[index].getRandom();
      store[index].getCookiesPerHr(randomNum);
      store[index].addToTotal(i);
    }
  totals[index] = store[index].cookiesPerHr;
      store[index].renderTableRow();
} else{
    row++;

    var newLocation = new Location(location, min, max, avg);

    //Do the calculations on the new user inputed data
    for (var i=0; i<headers.length-1; i++){
      randomNum = newLocation.getRandom();
      newLocation.getCookiesPerHr(randomNum);
      newLocation.addToTotal(i);
    }
    //Add new row data to the totals[]
    totals[row] = newLocation.cookiesPerHr;
    //Draw the new row
    newLocation.renderTableRow();
}
  //Draw the new totals per time of day
  renderTableFooter(totals);

  event.target.location.value = null;
  event.target.min.value = null;
  event.target.max.value = null;
  event.target.avg.value = null;
}

//Run all the things...
(function runTheApp() {

  //First draw the table header once
  renderTableHeader(headers);

  //Iterate though all the stores, get the total cookies per hour
  for(var j=0; j<store.length; j++){
    for (var i=0; i<headers.length-1; i++){
      var randomNum = store[j].getRandom();
      store[j].getCookiesPerHr(randomNum);
      store[j].addToTotal(i);
    }
    //Store the totals for all stores in a 2d array
    totals[j] = store[j].cookiesPerHr;
    //Draw the table
    store[j].renderTableRow();
  }
  //Set row to be the last row added to totals[]
  row = j-1;

  //Draw the totals for each column
  renderTableFooter(totals);
})();
