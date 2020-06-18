const divapp = document.getElementById('app');
debugger
const urlData = 'api/datos.json';

const objToShow = {
    title: 'Todas las importaciones',
    data: null
}

const loadData = (objToLoad, url) => {
    readSrc(objToLoad, url)
        .then(data => {
            objToLoad.data = data
        })
}
loadData(objToShow, urlData);


function createTable(obj) {
    let tableComp = new TableComponent();
    // debugger
    tableComp.heading = objToShow.title;
    tableComp.id = 'el1';
    tableComp.data = objToShow.data;
    console.log(tableComp.data);
    return tableComp;
}


window.addEventListener('load', () => {

    if (objToShow.data !== null) {
        el = createTable(objToShow);
        // console.log(el);
        divapp.appendChild(el);
    } 
})
// console.log(objToShow);