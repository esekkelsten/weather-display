/* fetch(url)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    }); */

const url = "https://api.met.no/weatherapi/nowcast/2.0/complete?lat=59.90&lon=10.81"; // Location: NHV25
const userAgent = "Weather-Display erlend.sekkelsten@gmail.com";
const headers = new Headers({"Origin": userAgent});
let responseExpires;

async function getWeather() {
    console.log("Kjører script.")
    console.log("Sjekker expiration…");
    let nowDate = new Date;
    console.log(
        "nowDate: " + nowDate + "\n" + "Expire: " + responseExpires
    );
    
    if (nowDate < responseExpires) {
        throw new Error("For tidlig!");
    } else {
        for (const pair of headers.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        let response = await fetch(url, {method: "GET"/* , headers: headers */});        
        console.log("Henter headers…")
        let responseHeaders = await response.headers;
        responseExpires = responseHeaders.get('Expires');

        console.log(
            "Expires: " + responseExpires
        );
        
        console.log("Henter body…")
        let weatherData = await response.json();
        let nowWeather = weatherData.properties.timeseries[0].data.instant.details;
        console.log(nowWeather);
        console.log("Putter JSON på siden…");
        let weatherString = JSON.stringify(await nowWeather);
        document.getElementById("kode").innerHTML = weatherString;
        document.getElementById("temp").innerHTML = Math.round(nowWeather.air_temperature) + "°";
        console.log("Ferdig.")
    }
}

async function getAzure() {
    let response = await fetch("https://prod-12.norwayeast.logic.azure.com:443/workflows/c26c7b54077740b281afefaa048469cb/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=YTli5x3-IeTuEYrWhw0gNnQr7GHHZCoHSog4LFgbKAk", {headers: {"origin": "Erlend"}});
    let finalResponse = await response.json();
    console.log(finalResponse);
}

async function newGetWeather() {
    await fetch(url, {headers: {"User-Agent": userAgent, "Origin": userAgent}})
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("Error:" + error);
        });
}

/*

1. Sjekk expires-header om nå er nyere.
2. Om nei: Stopp
3. Om ja eller ikke finnes:
    1. Hent fra API

*/