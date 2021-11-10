function lockedProfile() {
    const mainDiv = document.getElementById('main');
    mainDiv.innerHTML = '';
    let userCounter = 0;

    async function getUsers() {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
            if (response.status !== 200) {
                throw new Error('Unable to fetch data');
            }
            return await response.json();
        } catch (error) {
            //TODO not required
            return -1;
        }
    }

    function createUser(username, email, age) {
        userCounter++
        const divProfile = document.createElement('DIV');
        divProfile.classList.add('profile');

        const elImage = document.createElement('IMG');
        elImage.src = './iconProfile2.png';
        elImage.classList.add('userIcon');

        const elLabel1 = document.createElement('LABEL');
        elLabel1.textContent = 'Lock ';

        const elInput1 = document.createElement('INPUT');
        elInput1.type = 'radio';
        elInput1.setAttribute('name', `user${userCounter}Locked`);
        elInput1.value = 'lock';
        elInput1.checked = true;

        const elLabel2 = document.createElement('LABEL');
        elLabel2.textContent = 'Unlock ';

        const elInput2 = document.createElement('INPUT');
        elInput2.type = 'radio';
        elInput2.setAttribute('name', `user${userCounter}Locked`);
        elInput2.value = 'unlock';


        const elHr1 = document.createElement('HR');

        const elLabel3 = document.createElement('LABEL');
        elLabel3.textContent = 'Username ';

        const elInput3 = document.createElement('INPUT');
        elInput3.type = 'text';
        elInput3.setAttribute('name', `user${userCounter}Username`);
        elInput3.setAttribute('value', username);
        elInput3.disabled = true;
        elInput3.readOnly = true;


        const hiddenDiv = document.createElement('DIV');
        hiddenDiv.id = `user${userCounter}HiddenFields`;
        hiddenDiv.style.display = 'none';

        const elHr2 = document.createElement('HR');

        const elLabel4 = document.createElement('LABEL');
        elLabel4.textContent = 'Email: ';

        const elInput4 = document.createElement('INPUT');
        elInput4.type = 'email';
        elInput4.setAttribute('name', `user${userCounter}Email`);
        elInput4.setAttribute('value', email);
        elInput4.disabled = true;
        elInput4.readOnly = true;


        const elLabel5 = document.createElement('LABEL');
        elLabel5.textContent = 'Age: ';

        const elInput5 = document.createElement('INPUT');
        elInput5.type = 'email';
        elInput5.setAttribute('name', `user${userCounter}Age`);
        elInput5.setAttribute('value', age);
        elInput5.disabled = true;
        elInput5.readOnly = true;

        const button = document.createElement('BUTTON');
        button.textContent = 'Show more';
        button.addEventListener('click', onClick);

        mainDiv.appendChild(divProfile);
        divProfile.appendChild(elImage);
        divProfile.appendChild(elLabel1);
        divProfile.appendChild(elInput1);
        divProfile.appendChild(elLabel2);
        divProfile.appendChild(elInput2);
        divProfile.appendChild(elHr1);
        divProfile.appendChild(elLabel3);
        divProfile.appendChild(elInput3);
        divProfile.appendChild(hiddenDiv);
        divProfile.appendChild(button);
        hiddenDiv.appendChild(elHr2);
        hiddenDiv.appendChild(elLabel4);
        hiddenDiv.appendChild(elInput4);
        hiddenDiv.appendChild(elLabel5);
        hiddenDiv.appendChild(elInput5);

        function onClick(){
            if(elInput1.checked === true){
                return;
            }
            if (button.textContent === 'Show more'){
                button.textContent = 'Hide it';
                hiddenDiv.style.display = 'block';
            }else{
                button.textContent = 'Show more';
                hiddenDiv.style.display = 'none';
            }
        }
    }

    async function populatePage() {
        let users = await getUsers();
        Object.values(users).forEach((e) => createUser(e.username, e.email, e.age));
    }

    populatePage();
}

