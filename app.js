var PikePlace = {
  min: 17,
  max: 88,
  avg: 5.2,
  cookiesPerHr:[],
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
    var header = document.getElementById('location');
    var newUl = document.createElement('ul');
    var newLi = document.createElement('li');
    var content = hour + ': ' + this.cookiesPerHr[index] + ' cookies';
    var newLiText = document.createTextNode(content);
    newLi.appendChild(newLiText);
    newUl.appendChild(newLi);
    header.appendChild(newUl);
    // 2. Create a UL element
    // 3. Create and populate an LI element for each of the data points that you want to render
    // 4. Append the LI to the UL
    // 5. Append the UL to the element that you stored in step 1
  }
};

for(var i = 0; i < 8; i++){
  var hour = ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
  var randomNum = PikePlace.getRandom();
  console.log(randomNum);
  PikePlace.getCookiesPerHr(randomNum);
  PikePlace.renderData(hour[i], i);
}

//var el = getElementById('')
