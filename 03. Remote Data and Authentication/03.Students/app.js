const tbody = document.querySelector('#results tbody');
const inputFirstName = document.querySelector('.inputs input[name="firstName"]');
const inputLastName = document.querySelector('.inputs input[name="lastName"]');
const inputFacultyNumber = document.querySelector('.inputs input[name="facultyNumber"]');
const inputGrade = document.querySelector('.inputs input[name="grade"]');
const form = document.querySelector('form');
form.addEventListener('submit', onClick);


loadStudents();


async function loadStudents(){
    const request = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await request.json();
    Object.values(data).forEach((e) => populateTable(e));
}

function populateTable(obj){
    const elTR = document.createElement('TR');
    const firstNameTD = document.createElement('TD');
    firstNameTD.textContent = obj.firstName;
    const lastNameTD = document.createElement('TD');
    lastNameTD.textContent = obj.lastName;
    const facultyNumberTD = document.createElement('TD');
    facultyNumberTD.textContent = obj.facultyNumber;
    const gradeTD = document.createElement('TD');
    gradeTD.textContent = obj.grade;
    tbody.appendChild(elTR);
    elTR.appendChild(firstNameTD);
    elTR.appendChild(lastNameTD);
    elTR.appendChild(facultyNumberTD);
    elTR.appendChild(gradeTD);
}

async function onClick(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
        firstName: formData.get('firstName').trim(),
        lastName: formData.get('lastName').trim(),
        facultyNumber: formData.get('facultyNumber').trim(),
        grade: formData.get('grade').trim()
    }

    try {
    if(Object.values(data).some((k) => k === '')){
        throw new Error('All fields have to be populated')
    }
    const request =  await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(request);
    if(request.ok !== true){
        throw new Error(request.message)
    }

    const result = request.json();

    } catch(error){
        alert(error);
    }
}