export function setupLayout() {
    const button=document.querySelector('.menu-toggle');
    const nav=document.querySelector('#primary-nav');
    button?.addEventListener('click',()=> {
        const open=nav.classList.toggle('open');
        button.setAttribute('aria-expanded',String(open));
    }
    );
    const current=location.pathname.split('/').pop()|| 'index.html';
    document.querySelectorAll('nav a').forEach(a=> {
        if(a.getAttribute('href')===current)a.setAttribute('aria-current', 'page');
    }
    );
    const year=document.querySelector('#year');
    if(year)year.textContent=new Date().getFullYear();
}
export async function loadInstruments() {
    try {
        const response=await fetch('data/instruments.json');
        if(!response.ok)throw new Error(`HTTP ${response.status}`);
        const data=await response.json();
        if(!Array.isArray(data))throw new Error('Invalid instrument data');
        return data;
    }
    catch(error) {
        console.error('Unable to load instruments:',error);
        throw error;
    }
}
const key= 'mie-favorites-v1';
export function getFavorites() {
    try {
        const data=JSON.parse(localStorage.getItem(key)|| '[]');
        return Array.isArray(data)?data:[]
    }
    catch {
        return[]
    }
}
export function toggleFavorite(id) {
    const current=getFavorites();
    const next=current.includes(id)?current.filter(x=>x!==id):[...current,id];
    localStorage.setItem(key,JSON.stringify(next));
    return next;
}
export function card(item, {
    favorites=false,onToggle=null,onDetails=null
}
= {
}
) {
    const article=document.createElement('article');
    article.className= 'card';
    const img=document.createElement('img');
    img.src=item.image;
    img.alt= `Illustrated card for ${item.name}`;
    img.loading= 'lazy';
    img.width=640;
    img.height=400;
    article.append(img);
    const content=document.createElement('div');
    content.className= 'card-content';
    const tag=document.createElement('span');
    tag.className= 'pill';
    tag.textContent=item.family;
    const h=document.createElement('h3');
    h.textContent=item.name;
    const detail=document.createElement('p');
    detail.textContent= `${item.difficulty} · ${item.method}`;
    const actions=document.createElement('div');
    actions.className= 'actions';
    if(onDetails) {
        const btn=document.createElement('button');
        btn.className= 'action';
        btn.type= 'button';
        btn.textContent= 'View details';
        btn.addEventListener('click',()=>onDetails(item));
        actions.append(btn);
    }
    if(onToggle) {
        const btn=document.createElement('button');
        btn.className= 'secondary action';
        btn.type= 'button';
        btn.textContent=favorites? 'Remove favorite' : 'Save favorite';
        btn.setAttribute('aria-label', `${favorites?'Remove':'Save'} ${item.name} ${favorites?'from':'to'} favorites`);
        btn.addEventListener('click',()=>onToggle(item));
        actions.append(btn);
    }
    content.append(tag,h,detail,actions);
    article.append(content);
    return article;
}
setupLayout();
