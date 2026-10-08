import {
    loadInstruments,card
}
from './main.js';
const area=document.querySelector('#featured');
try {
    const data=await loadInstruments();
    [data[0],data[7],data[14]].forEach(item=>area.append(card(item)));
}
catch {
    area.textContent= 'Instruments could not be loaded. Please try again later.';
}
