var PikePlace = {
  min: 17,
  max: 88,
  avg: 5.2,
  cookiesPerHr:0,
  getRandom: function(min, max){
    min = this.min;
    max = this.max;
    return Math.round(Math.random() * (max - min) + min);
  },
  getCookiesPerHr: function(num) {
    var cookies = num * this.avg;
    this.cookiesPerHr = cookies.toFixed(0);
     console.log('cookies per hour is ' + this.cookiesPerHr);
  },
  storeCookiesPerHr: function(){

  },
  renderData: function() {
    // render your object data to the DOM as an unordered list of data points!!
    // 1. Get an element by Id from your html
    // 2. Create a UL element
    // 3. Create and populate an LI element for each of the data points that you want to render
    // 4. Append the LI to the UL
    // 5. Append the UL to the element that you stored in step 1
  }
};
var randomNum = PikePlace.getRandom();
console.log(randomNum);
PikePlace.getCookiesPerHr(randomNum);
//var el = getElementById('')
