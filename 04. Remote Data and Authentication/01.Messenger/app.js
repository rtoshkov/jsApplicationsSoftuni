function attachEvents() {
    const textareaEl = document.getElementById('messages');
    const btnSend = document.getElementById('submit');
    btnSend.addEventListener('click', sendMessage);
    const btnRefresh = document.getElementById('refresh');
    btnRefresh.addEventListener('click', loadMessages);
    const nameInbox = document.querySelector('#controls input[name=author]');
    const messageInbox = document.querySelector('#controls input[name=content]');
    loadMessages();


    async function loadMessages() {
        textareaEl.value = '';
        const request = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await request.json();
        Object.values(data).forEach((e) => textareaEl.value += `${e.author}: ${e.content}` + '\n');
    }

    async function sendMessage() {
        const author = nameInbox.value;
        const content = messageInbox.value;
        const request = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author, content})
        })
        // const response = await request.json();
        // // console.log(response);
    }

}

attachEvents();