window.onload = (function(){

  var btn = document.getElementById("button");

  function get(url){
    return new Promise(function(resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.onload = function(){
        if(xhttp.status == 200){
          resolve(JSON.parse(xhttp.response));
        } else {
          reject(xhttp.statusText);
        }
      };
      xhttp.onerror = function(){
        reject(xhttp.statusText);
      };
      xhttp.send();
    });
  }


  //btn.onclick = function(){
  //  var quote = document.getElementById("quote");
  //  var promise = get("https://random-quote-generator.herokuapp.com/api/quotes/random").then(function(quotes){
  //    quote.innerText = quotes.quote + " - " + quotes.author;
  //  })
  //};

  btn.onclick = function()
  {
    var quote = document.getElementById("quote");
    var promise = get("https://api.chucknorris.io/jokes/random")
    .then(function(promise) {
      console.log(promise);
      quote.innerText = "'" + promise.value + "'";
    })
    .then(function(promise){
        twttr.widgets.createShareButton(
          '/',
          document.getElementById('share'),
          {
            text: document.getElementById('quote').innerText
          }
        );
      });
    }
});