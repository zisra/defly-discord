fetch(`https://s.defly.io/mystats?s=${window.localStorage["sessionId"]}`)
    .then(response => response.text())
    .then(resp_text => 
        JSON.parse(resp_text.split("\n")[0])
        )
    .then(json =>
        json.reduce((sum, element) => sum += element["end"] - element["start"], 0)
        )
    .then(milliseconds => {
        return Math.round(milliseconds/1000/60/60);
    })
    .then(console.log);