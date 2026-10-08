import './main.js';
const target=document.querySelector('#form-results');
const params=new URLSearchParams(location.search);
const fields=[['Name', 'name'],['Email', 'email'],['Instrument', 'instrument'],['Experience', 'experience'],['Message', 'message']];
if(!fields.some(([,key])=>params.has(key))) {
    target.textContent= 'No form answers were provided.';
}
else {
    const dl=document.createElement('dl');
    fields.forEach(([label,key])=> {
        const dt=document.createElement('dt');
        dt.style.fontWeight= '700';
        dt.textContent=label;
        const dd=document.createElement('dd');
        dd.textContent=(params.get(key)|| 'Not provided').slice(0,500);
        dl.append(dt,dd);
    }
    );
    target.append(dl);
}
