import {
    loadInstruments,card,getFavorites,toggleFavorite
}
from './main.js';
const grid=document.querySelector('#favorites-grid');
const select=document.querySelector('#instrument');
try {
    const data=await loadInstruments();
    data.forEach(x=> {
        const option=document.createElement('option');
        option.value=x.name;
        option.textContent=x.name;
        select.append(option);
    }
    );
    function render() {
        grid.replaceChildren();
        const selected=data.filter(x=>getFavorites().includes(x.id));
        if(!selected.length) {
            const p=document.createElement('p');
            p.className= 'empty';
            p.textContent= 'No favorites yet. Visit Explore to save an instrument.';
            grid.append(p);
        }
        selected.forEach(item=>grid.append(card(item, {
            favorites:true,onToggle:x=> {
                toggleFavorite(x.id);
                render();
            }
        }
        )));
    }
    render();
}
catch {
    grid.textContent= 'Unable to load your instrument list.';
}
