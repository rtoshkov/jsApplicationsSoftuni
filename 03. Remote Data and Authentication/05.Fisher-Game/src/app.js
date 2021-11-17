window.addEventListener('DOMContentLoaded', onStart);

function onStart(){
   const catchContainer = document.getElementById('catches');
   catchContainer.textContent = '';
   const userID = JSON.parse(window.localStorage.getItem('mySite')).id;
   console.log(userID);


    async function getCatches(){
        const request = await fetch('http://localhost:3030/data/catches/');
        const data = await request.json();
        Object.values(data).forEach((e) => {
            const elementDiv = document.createElement('DIV');
            elementDiv.classList.add('catch');
            elementDiv.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="Paulo Admorim">
<label>Weight</label>
<input type="text" class="weight" value="636">
<label>Species</label>
<input type="text" class="species" value="Atlantic Blue Marlin">
<label>Location</label>
<input type="text" class="location" value="Vitoria, Brazil">
<label>Bait</label>
<input type="text" class="bait" value="trolled pink">
<label>Capture Time</label>
<input type="number" class="captureTime" value="80">
<button class="update" data-id="${e._id}" ${userID === e._ownerId ? "" : 'disabled'}>Update</button>
<button class="delete" data-id="${e._id}" ${userID === e._ownerId ? "" : 'disabled'}>Delete</button>`
            catchContainer.appendChild(elementDiv);
            console.log(`userID ${userID} ownerID ${e._ownerId}`)
        })
    }

    getCatches();

}

















//
// <div className="catch">
//     <label>Angler</label>
//     <input type="text" className="angler" value="Paulo Admorim">
//         <label>Weight</label>
//         <input type="text" className="weight" value="636">
//             <label>Species</label>
//             <input type="text" className="species" value="Atlantic Blue Marlin">
//                 <label>Location</label>
//                 <input type="text" className="location" value="Vitoria, Brazil">
//                     <label>Bait</label>
//                     <input type="text" className="bait" value="trolled pink">
//                         <label>Capture Time</label>
//                         <input type="number" className="captureTime" value="80">
//                             <button className="update" data-id="07f260f4-466c-4607-9a33-f7273b24f1b4">Update</button>
//                             <button className="delete" data-id="07f260f4-466c-4607-9a33-f7273b24f1b4">Delete</button>
// </div>