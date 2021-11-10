const mainSection = document.getElementById('main');

async function getArticlesIDs(){
    const request = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    return await request.json();
}

async function getContent(id){
    const request = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
    return await request.json();
}

function createBox(id, title){
    const divAccordion = document.createElement('DIV');
    divAccordion.classList.add('accordion');
    const divHead = document.createElement('DIV');
    divHead.classList.add('head');
    const spanEl = document.createElement('SPAN');
    spanEl.textContent = title;
    const button = document.createElement('BUTTON');
    button.classList.add('button');
    button.id = id;
    button.textContent = 'More';
    button.addEventListener('click', onClick);
    const divExtra = document.createElement('DIV');
    divExtra.classList.add('extra');
    const pEl = document.createElement('P');

    mainSection.appendChild(divAccordion);
    divAccordion.appendChild(divHead);
    divHead.appendChild(spanEl);
    divHead.appendChild(button);
    divAccordion.appendChild(divExtra);
    divExtra.appendChild(pEl);

    async function onClick(){
        if(button.textContent === 'More'){
            button.textContent = 'Less';
            const article = await getContent(button.id)
            pEl.textContent = article.content;
            divExtra.classList.toggle('extra');
        }else{
            button.textContent = 'More';
            pEl.textContent = ''
            divExtra.classList.toggle('extra');
        }
    }
}

getArticlesIDs()
    .then(
        (data => Object.values(data)
            .forEach((e => createBox(e._id,e.title) )))
    )
