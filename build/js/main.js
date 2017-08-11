window.onload = function() {
  (function loaded() {
    var btn = document.getElementById("button");
    var quote = document.getElementById("quote");

    function get(url) {
      return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onload = function() {
          if (xhttp.status == 200) {
            resolve(JSON.parse(xhttp.response));
          } else {
            reject(xhttp.statusText);
          }
        };
        xhttp.onerror = function() {
          reject(xhttp.statusText);
        };
        xhttp.send();
      });
    }

    var colors = [
      "#6b8e23",
      "#318fbd",
      "#4b31bd",
      "#bb31bd",
      "#bd9b31",
      "#4bdf64",
      "#727672",
      "#f63653",
      "#cc5e2e",
      "#6dcbe8",
      "#ff6060",
      "#4ee2bf",
      "#da6aee"
    ];

    function remove(frame) {
      frame.parentNode.removeChild(frame);
    }

    function setTweet(value) {
      twttr.widgets
        .createShareButton("/", document.getElementById("tweet-container"), {
          count: "one",
          text: value,
          size: "large"
        })
        .then(function(el) {
          console.log("Button created.");
        });
    }

    btn.onclick = function() {
      var promise = get("https://api.chucknorris.io/jokes/random")
        .then(function(promise) {
          quote.innerText = "'" + promise.value + "'";
          var frame = document.getElementById("tweet-container").firstChild;
          if (frame) {
            remove(frame);
          }
          setTweet(promise.value);

          return promise.value;
        })
        .then(function() {
          var hero = document.getElementById("hero");
          hero.style.background =
            colors[Math.floor(Math.random() * colors.length)];
        });
    };
  })();
};
