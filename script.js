/* fetch(url)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    }); */

const url = "https://api.met.no/weatherapi/nowcast/2.0/complete?lat=59.90&lon=10.81"; // Location: NHV25
const userAgent = "Weather-Display erlend.sekkelsten@gmail.com";
const headers = new Headers({"origin": userAgent});
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
        let response = await fetch(url, {mode: 'cors', method: "GET", headers: headers});        
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

async function newGetWeather() {
    await fetch(url, { headers: {"User-Agent": userAgent, "Origin": userAgent}})
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("Error:" + error);
        });
}