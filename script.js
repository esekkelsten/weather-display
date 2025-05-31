/* fetch(url)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    }); */

const userAgent = "Weather-Display erlend.sekkelsten@gmail.com";

async function getUsers() {
    console.log("Kjører script.")
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log("Henter headers…")
    let responseHeaders = await response.headers;
    for (const pair of responseHeaders.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }
    console.log("Henter body…")
    let users = await response.json();
    console.log(users);
    console.log("Putter JSON på siden…");
    let usersString = JSON.stringify(await users);
    document.getElementById("kode").innerHTML = usersString;
    console.log("Ferdig.")
}