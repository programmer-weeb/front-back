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
            console.log('New person added to the server!');
        } else {
            console.error('Failed to add new person to the server.');
        }
    } catch (error) {
        console.error(error);
    }

    printPersonsToTable(await newGETtoReturnAllPersons())
});

window.onload = async () => {
    printPersonsToTable(await newGETtoReturnAllPersons())
}

function printPersonsToTable(arrOfPersonObj) {
    const divElement = document.querySelector('.allPersons');
    let output = "<table>";
    output += "<tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Email</th><th>Action</th></tr>";
    for (let i = 0; i < arrOfPersonObj.length; i++) {
        output += "<tr>";
        output += "<td>" + arrOfPersonObj[i].id + "</td>";
        output += "<td>" + arrOfPersonObj[i].name + "</td>";
        output += "<td>" + arrOfPersonObj[i].age + "</td>";
        output += "<td>" + arrOfPersonObj[i].gender + "</td>";
        output += "<td>" + arrOfPersonObj[i].email + "</td>";
        output += "<td>";
        output += "<button onclick='deletePerson(" + arrOfPersonObj[i].id + ")'>Delete</button>";
        output += "<button onclick='handleEditPerson(" + arrOfPersonObj[i].id + ")'>Edit</button>";
        output += "</td>";
        output += "</tr>";
    }
    output += "</table>";
    divElement.innerHTML = output;
}

async function deletePerson(personId) {
    console.log("Delete person with ID:", personId);
    await fetch(`${baseUrl}/persons/${personId}`, { method: 'DELETE' })
    printPersonsToTable(await newGETtoReturnAllPersons())
}

async function handleEditPerson(personId) {
    console.log("Edit person with ID:", personId);

    // show the edit form
    document.getElementById('editArea').style.display = 'block';

    // clear the form
    document.getElementById('editName').value = '';
    document.getElementById('editAge').value = '';
    document.getElementById('editGender').value = '';
    document.getElementById('editEmail').value = '';

    // add event listener to "Save Edit" button
    const saveEditBtn = document.getElementById('editSubmitBtn');
    const theEventListenerFunction = async () => {
        let theNewPersonObj = {
            name: document.getElementById('editName').value,
            age: document.getElementById('editAge').value,
            gender: document.getElementById('editGender').value,
            email: document.getElementById('editEmail').value
        }
        // send a PUT request to update the person
        await sendAPutRequestToTheServerWithTheUpdatedPerson(theNewPersonObj, personId);
        // update the table
        printPersonsToTable(await newGETtoReturnAllPersons());
        // hide the edit form
        document.getElementById('editArea').style.display = 'none';
        // remove the event listener
        saveEditBtn.removeEventListener('click', theEventListenerFunction);
    };
    saveEditBtn.addEventListener('click', theEventListenerFunction);
}


async function sendAPutRequestToTheServerWithTheUpdatedPerson(theNewPersonObj, personId) {
    await fetch(`${baseUrl}/persons/${personId}`, {
        method: "PUT",
        body: JSON.stringify(theNewPersonObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

async function newGETtoReturnAllPersons() {
    const res = await fetch(`${baseUrl}/persons`, {
        method: 'GET'
    });
    const arrOfPersonsObj = await res.json();
    return arrOfPersonsObj;
}
