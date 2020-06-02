const divapp = document.getElementById('app');
let el = null;
const comp_importaciones = document.createElement('comp-importaciones');
const objImport = {
    url: 'json/datos.API.json',
    title: 'Todas las importaciones'
}

let objComp = new ComponenteImportaciones();
objComp.setAttribute('titulo', objImport.title);
objComp.setAttribute('url', objImport.url);
objComp.setAttribute('id', 'el1');

window.addEventListener('load', () => {
    console.log('window.onload');
    divapp.appendChild(objComp);
    el = document.getElementById('el1');
})
