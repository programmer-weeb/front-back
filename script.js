const baseUrl = 'http://localhost:5000';
const form = document.querySelector('#add_person_form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent the default form submission

    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const email = document.querySelector('#email').value;

    console.log({ name, age, gender, email });

    try {
        const response = await fetch(`${baseUrl}/persons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, gender, email })
        });
        
        if (response.ok) {
            // handle success
            console.log('New person added to the server!');
        } else {
            // handle error
            console.error('Failed to add new person to the server.');
        }
    } catch (error) {
        console.error(error);
    }

    // reload the page
    // window.location.reload();

    const res = await fetch (`${baseUrl}/persons`, { method: 'GET' });
    const arrOfPersonsObj = await res.json();

    printPersons(arrOfPersonsObj)
});

window.onload = async () => {
    console.log('loaded');
    const res = await fetch(`${baseUrl}/persons`, {
        method: 'GET'
    });
    const arrOfPersonsObj = await res.json();
    console.log(arrOfPersonsObj);
    printPersons(arrOfPersonsObj)
}

function printPersons(arrOfPersonObj) {
    const divElement = document.querySelector('.allPersons'); // replace "myDiv" with the ID of your div element
    let output = "<table>";
    output += "<tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Email</th></tr>";
    for (let i = 0; i < arrOfPersonObj.length; i++) {
        output += "<tr>";
        output += "<td>" + arrOfPersonObj[i].id + "</td>";
        output += "<td>" + arrOfPersonObj[i].name + "</td>";
        output += "<td>" + arrOfPersonObj[i].age + "</td>";
        output += "<td>" + arrOfPersonObj[i].gender + "</td>";
        output += "<td>" + arrOfPersonObj[i].email + "</td>";
        output += "</tr>";
    }
    output += "</table>";
    divElement.innerHTML = output;
}


