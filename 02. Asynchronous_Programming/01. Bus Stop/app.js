function getInfo() {
    const submitButton = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busesDiv = document.getElementById('buses');
    async function getBusInfo(value) {
        try{
            stopName.textContent = '';
            busesDiv.innerHTML = '';
            const result = await fetch('http://localhost:3030/jsonstore/bus/businfo/' + value);

            if(result.status !== 200){
                throw new Error('Stop ID not found');
            }

            const data = await result.json();

            stopName.textContent = data.name;
            Object.entries(data.buses).forEach(([bus,time]) => {
                const elLi = document.createElement('LI');
                elLi.textContent = `Bus ${bus} arrives in ${time} minutes`;
                busesDiv.appendChild(elLi);
            })

        }catch (err){
            stopName.textContent = 'Error';
        }

    }

    getBusInfo(submitButton.value);
}