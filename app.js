


function Location(min, max, avg, storeId) {
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.storeId = storeId;
  this.cookiesPerHr = [];
  this.totalCookies = 0;
  this.getRandom = function(){
    return Math.round(Math.random() * (this.max - this.min) + this.min);
  };
  this.getCookiesPerHr = function(num) {
    var cookies = num * this.avg;
    this.cookiesPerHr.push(cookies.toFixed(0));
    console.log('cookies per hour is ' + this.cookiesPerHr);
  };
  this.renderTableHeader = function(headerNames){
    var header = document.getElementById('table_header');

      for (var i=0; i<headerNames.length; i++){
        var newTh = document.createElement('th');
        var headerName = document.createTextNode(headerNames[i]);
        newTh.appendChild(headerName);
        header.appendChild(newTh);
      }
  };
  this.renderTableBody = function(hour, index) {
    var header = document.getElementById(this.storeId);
    var newUl = document.createElement('ul');
    var newLi = document.createElement('li');
    var content = hour + ': ' + this.cookiesPerHr[index] + ' cookies';
    var newLiText = document.createTextNode(content);
    newLi.appendChild(newLiText);
    newUl.appendChild(newLi);
    header.appendChild(newUl);

    //If we have just computed our last hour, render the total number of cookies
    if(index ===lastHour) {
      var total = 'Total: ' + this.totalCookies + ' cookies';
      var header = document.getElementById(this.storeId);
      var newUl = document.createElement('ul');
      var newLi = document.createElement('li');
      var newLiText = document.createTextNode(total);
      newLi.appendChild(newLiText);
      newLi.appendChild(newLiText);
      newUl.appendChild(newLi);
      header.appendChild(newUl);
    }
  };
  this.renderTableFooter = function(){};
  this.addToTotal = function(index){
    this.totalCookies += +this.cookiesPerHr[index];
  };
}

//Put an array in here and another loop for the location names....
//also, add beginning and endvalue variables
//var locationName = ['PikePlace', 'SeaTac', 'SouthCenter', 'BellevueSquare', 'Alki'];

var headers = ['      ', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm']
var firstHour = 0
var lastHour = 7;
var PikePlace = new Location(17, 88, 5.2, 'PikePlace');
var store = [PikePlace];
PikePlace.renderTableHeader(headers);

// for (var j=0; j<store.length; j++){
//   for(var i = firstHour; i <= lastHour; i++){
//     var randomNum = store[j].getRandom();
//     store[j].getCookiesPerHr(randomNum);
//     store[j].addToTotal(i);
//     store[j].renderData(hour[i], i);
//   }
// }
