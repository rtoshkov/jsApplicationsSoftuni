function solve() {
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');
    const divInfo = document.querySelector('#info span.info');

    let nextStop = {
        name: 'Not Connected',
        next: 'depot'
    };

    function throwErrorIfNotValid(data) {
        if (data.status !== 200) {
            throw new Error('Error')
        }
    }

    async function depart() {

        try {
            divInfo.textContent = '';
            const result = await fetch('http://localhost:3030/jsonstore/bus/schedule/' + nextStop.next);
            throwErrorIfNotValid(result);
            const data = await result.json();
            btnDepart.disabled = true;
            btnArrive.disabled = false;
            divInfo.textContent = `Next stop ${data.name}`;
            nextStop.next = data.next;
            nextStop.name = data.name;

        } catch (err) {
            console.log(err.message);
        }
    }

    function arrive() {
        btnDepart.disabled = false;
        btnArrive.disabled = true;
        divInfo.textContent = `Arriving at ${nextStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();