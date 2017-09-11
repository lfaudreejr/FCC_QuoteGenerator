window.onload = function() {
  (function loaded() {
    const BTN = document.getElementById("button");
    const QUOTE = document.getElementById("quote");

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

    const COLORS = [
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


    class Twidget {
      constructor(frame, quote, tweet) {
        this.frame = frame
        this.quote = quote
        this.tweet = tweet
      }
      makeTwidget() {
        return twttr.widgets.createShareButton('/', this.frame, {
          count: 'one',
          text: this.quote,
          size: 'large'
        })
      }
      removeTwidget() {
        this.frame.removeChild(this.tweet)
      }
    }

    BTN.onclick = function () {
      let getRandomQuote = get('https://api.chucknorris.io/jokes/random').then((data) => {
        const frame = document.getElementById('tweet-container')
        const tweet = document.getElementById('tweet-container').firstChild
        const hero = document.getElementById('hero')
        const TWIDGER = new Twidget(frame, data.value, tweet)
        quote.innerText = `'${data.value}'`
        hero.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
        if (tweet) {
          TWIDGER.removeTwidget()
        }
        TWIDGER.makeTwidget()
      })
    }
  })();
};
