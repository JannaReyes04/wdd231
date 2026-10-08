import {
    loadInstruments,card,getFavorites,toggleFavorite
}
from './main.js';
const grid=document.querySelector('#instrument-grid');
const search=document.querySelector('#search');
const family=document.querySelector('#family');
const difficulty=document.querySelector('#difficulty');
const count=document.querySelector('#result-count');
const dialog=document.querySelector('#instrument-dialog');
const body=document.querySelector('#dialog-body');
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
let instruments=[];
function showDetails(item) {
    body.replaceChildren();
    const title=document.createElement('h2');
    title.id= 'dialog-title';
    title.textContent=item.name;
    const img=document.createElement('img');
    img.src=item.image;
    img.alt= `Illustrated card for ${item.name}`;
    img.width=640;
    img.height=400;
    const meta=document.createElement('p');
    meta.textContent= `Family: ${item.family} | Difficulty: ${item.difficulty} | Playing method: ${item.method}`;
    const desc=document.createElement('p');
    desc.textContent=item.description;
    body.append(title,img,meta,desc);
    dialog.showModal();
}
function render() {
    const q=search.value.trim().toLowerCase();
    const result=instruments.filter(x=>(family.value=== 'all' ||x.family===family.value)&&(difficulty.value=== 'all' ||x.difficulty===difficulty.value)&&x.name.toLowerCase().includes(q));
    grid.replaceChildren();
    count.textContent= `Showing ${result.length} of ${instruments.length} instruments`;
    const saved=getFavorites();
    result.forEach(item=>grid.append(card(item, {
        favorites:saved.includes(item.id),onDetails:showDetails,onToggle:x=> {
            toggleFavorite(x.id);
            render();
        }
    }
    )));
    if(!result.length) {
        const p=document.createElement('p');
        p.className= 'empty';
        p.textContent= 'No instruments match your filters.';
        grid.append(p);
    }
}
[search,family,difficulty].forEach(el=>el.addEventListener(el===search? 'input' : 'change',render));
try {
    instruments=await loadInstruments();
    [...new Set(instruments.map(x=>x.family))].sort().forEach(name=> {
        const option=document.createElement('option');
        option.value=name;
        option.textContent=name;
        family.append(option);
    }
    );
    render();
}
catch {
    count.textContent= 'Could not load instrument data. Run the site using a local web server.';
}
