function attachEvents() {
    const inpField = document.getElementById('location');
    const button = document.getElementById('submit');
    const divForecast = document.getElementById('forecast');
    const divCurrent = document.getElementById('current')
    const divUpcoming = document.getElementById('upcoming');

    const weather = {
        'Sunny' : '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    }

    button.addEventListener('click', onClick);

    async function onClick() {
        try {
            const requestLocation = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
            const locations = await requestLocation.json();
            let codeLocation = locations.find((e) => e.name.toLowerCase() === inpField.value.toLowerCase()).code;

            if (codeLocation === undefined) {
                throw new Error('Not found');
            }

            const [conditions, forecast] = await Promise.all([
                currentConditions(codeLocation),
                getForecast(codeLocation)
            ])

            //TODO remove
            console.log(conditions);

            divForecast.style.display = 'block';
            divCurrent.innerHTML = '<div class="label">Current conditions</div>';

            const divForForecast = document.createElement('DIV');
            divForForecast.classList.add('forecasts');
            const spanForSymbol = document.createElement('SPAN');
            spanForSymbol.classList.add('condition');
            spanForSymbol.classList.add('symbol');
            const symbol = conditions.forecast.condition;
            spanForSymbol.textContent = weather[symbol];
            const spanContainer = document.createElement('SPAN');
            spanContainer.classList.add('condition');
            const spanFData1 = document.createElement('SPAN');
            spanFData1.classList.add('forecast-data');
            spanFData1.textContent = conditions.name;
            const spanFData2 = document.createElement('SPAN');
            spanFData2.classList.add('forecast-data');
            spanFData2.textContent = `${conditions.forecast.low}°/${conditions.forecast.high}°`;
            const spanFData3 = document.createElement('SPAN');
            spanFData3.classList.add('forecast-data');
            spanFData3.textContent = symbol;

            divCurrent.appendChild(divForForecast);
            divForForecast.appendChild(spanForSymbol);
            divForForecast.appendChild(spanContainer);
            spanContainer.appendChild(spanFData1);
            spanContainer.appendChild(spanFData2);
            spanContainer.appendChild(spanFData3);





        } catch (err) {
            console.log(err.message);
        }
    }

    async function currentConditions(code) {
        let request = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
        return await request.json();
    }

    async function getForecast(code) {
        let request = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
        return await request.json();
    }


}

attachEvents();