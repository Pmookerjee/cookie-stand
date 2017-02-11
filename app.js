


var PikePlace = {
  min: 17,
  max: 88,
  avg: 5.2,
  cookiesPerHr:[],
  totalCookies: 0,
  getRandom: function(min, max){
    min = this.min;
    max = this.max;
    return Math.round(Math.random() * (max - min) + min);
  },
  getCookiesPerHr: function(num) {
    var cookies = num * this.avg;
    this.cookiesPerHr.push(cookies.toFixed(0));
    console.log('cookies per hour is ' + this.cookiesPerHr);
  },
  renderData: function(hour, index) {
    var header = document.getElementById('PikePlace');
    var newUl = document.createElement('ul');
    var newLi = document.createElement('li');
    var content = hour + ': ' + this.cookiesPerHr[index] + ' cookies';
    var newLiText = document.createTextNode(content);
    newLi.appendChild(newLiText);
    newUl.appendChild(newLi);
    header.appendChild(newUl);

    //If we have just computed our last hour, render the total number of cookies
    if(index === 7) {
      var total = 'Total: ' + this.totalCookies + ' cookies';
      var header = document.getElementById('PikePlace');
      var newUl = document.createElement('ul');
      var newLi = document.createElement('li');
      var newLiText = document.createTextNode(total);
      newLi.appendChild(newLiText);
      newLi.appendChild(newLiText);
      newUl.appendChild(newLi);
      header.appendChild(newUl);
    }
  },
  addToTotal(index){
    this.totalCookies += +this.cookiesPerHr[index];
  }
};

// var SeaTac = {
//   min: 6,
//   max: 24,
//   avg: 1.2,
//   cookiesPerHr:[],
//   totalCookies:0,
//   getRandom: function(min, max){
//     min = this.min;
//     max = this.max;
//     return Math.round(Math.random() * (max-min) + min);
//   },
//   getCookiesPerHr: function(num) {
//     var cookies = num * this.avg;
//     this.cookiesPerHr.push(cookies.toFixed(0));
//   },
//   renderData: function(hour, index){
//     var header = document.getElementById('SeaTac');
//     var newUl = document.createElement('ul');
//     var newLi = document.createElement('li');
//     var content = hour + ': ' + this.cookiesPerHr[index] + ' cookies';
//     var newLiText = document.createTextNode(content);
//     newLi.appendChild(newLiText);
//     newUl.appendChild(newLi);
//     header.appendChild(newUl);
//
//     //If we have just computed our last hour, render the total number of cookies
//     if(index === 7) {
//       var total = 'Total: ' + this.totalCookies + ' cookies';
//       var header = document.getElementById('SeaTac');
//       var newUl = document.createElement('ul');
//       var newLi = document.createElement('li');
//       var newLiText = document.createTextNode(total);
//       newLi.appendChild(newLiText);
//       newLi.appendChild(newLiText);
//       newUl.appendChild(newLi);
//       header.appendChild(newUl);
//     }
//   },
//   addToTotal: function(index){
//     this.totalCookies += +this.cookiesPerHr[index];
//   }
// };

//Put an array in here and another loop for the location names....
//also, add beginning and endvalue variables
var locationName = ['PikePlace', 'SeaTac', 'SouthCenter', 'BellevueSquare', 'Alki'];

for(var j = 0; j<locationName[j].length; j++){
  for(var i = 0; i < 8; i++){
    var hour = ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
    console.log('location is ' + locationName[j]);
    var location2 = locationName[j];
    var randomNum = location2.getRandom();
    location2.getCookiesPerHr(randomNum);
    location2.addToTotal(i);
    location2.renderData(hour[i], i);
  }
}
