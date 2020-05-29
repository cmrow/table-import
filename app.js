//recibir parametros json-data
readSrc(this, this._url)
    .then(data => {
        this._root.innerHTML = `${JSON.stringify(data[0])}`
        console.log(JSON.stringify(data[0]));
    });


const tabla = new TablaImportaciones();

const divapp = document.getElementById('app');
// tabla.url= "js/json/datos.API.json";
tabla.id = 'tablaImportaciones';
divapp.appendChild(tabla);
