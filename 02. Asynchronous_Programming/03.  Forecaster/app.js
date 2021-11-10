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
            let codeLocation = locations.find((e) => e.name.toLowerCase() === inpField.value.toLowerCase());

            if (codeLocation === undefined) {
                throw new Error('Not found');
            }

            codeLocation = codeLocation.code

            const [conditions, forecast] = await Promise.all([
                currentConditions(codeLocation),
                getForecast(codeLocation)
            ])

            //TODO remove
            console.log(forecast);

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

            divUpcoming.innerHTML = '<div class="label">Three-day forecast</div>';
            const forecastDivInfo = document.createElement('DIV');
            forecastDivInfo.classList.add('forecast-info');
            divUpcoming.appendChild(forecastDivInfo);

            for (let i=0; i<3; i++){
                const forecastSpanUpcoming = document.createElement('SPAN');
                forecastSpanUpcoming.classList.add('upcoming');
                const forecastSpanSymbol = document.createElement('SPAN');
                forecastSpanSymbol.classList.add('symbol');
                const forecastSymbol = forecast.forecast[i].condition;
                forecastSpanSymbol.textContent = weather[forecastSymbol];
                const forecastData1 = document.createElement('SPAN');
                forecastData1.classList.add('forecast-data');
                forecastData1.textContent = `${forecast.forecast[i].low}°/${forecast.forecast[i].high}°`;
                const forecastData2 = document.createElement('SPAN');
                forecastData2.classList.add('forecast-data');
                forecastData2.textContent = forecastSymbol;

                forecastDivInfo.appendChild(forecastSpanUpcoming);
                forecastSpanUpcoming.appendChild(forecastSpanSymbol);
                forecastSpanUpcoming.appendChild(forecastData1);
                forecastSpanUpcoming.appendChild(forecastData2);

            }




        } catch (err) {
            console.log(`My Error: ${err.message}`);
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