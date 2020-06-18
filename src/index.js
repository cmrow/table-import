const divapp = document.getElementById('app');
debugger

let el = null;
const url = 'api/datos.json';
const objToShow = {
    title: 'Todas las importaciones',
    data: null
}

function loadData(objToLoad, url) {
    readSrc(objToLoad, url)
        .then(data => {
            objToLoad.data = data
        })
}
loadData(objToShow, url);


function createTable(obj) {
    let tableComp = new ComponenteImportaciones();
    // debugger
    tableComp.heading = objToShow.title;
    tableComp.id = 'el1';
    //tableComp.setAttribute('heading', objToShow.title);
    //tableComp.setAttribute('id', 'el1');
    tableComp.data = objToShow.data;
    console.log(tableComp.data);
    return tableComp;
}


window.addEventListener('load', () => {

    if (objToShow.data !== null) {
        el = createTable(objToShow);
        console.log(el);
        divapp.appendChild(el);
        el = document.getElementById('el1');
    }

})
// console.log(objToShow);