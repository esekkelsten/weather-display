/* fetch(url)
    .then(response => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    }); */

const userAgent = "Weather-Display erlend.sekkelsten@gmail.com";

async function getData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

getData();