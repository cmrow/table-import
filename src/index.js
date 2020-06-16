import "./stile.css";
import { Observable, from, of, fromEvent } from 'rxjs';
import { ComponenteImportaciones } from './components/minidemo';
import { ajax, AjaxResponse } from 'rxjs/ajax';
// import { datos } from './data';
const app = document.getElementById('app');
const url2 = '/src/api/datos.json';


fromEvent(window, 'load')
    .subscribe(event => {
    
    })


function crearComponente() {
    const table = new ComponenteImportaciones();
    table.setAttribute('heading', 'Tabla importaciones');
    table.datos = 
    app.appendChild(table);
    //aqui suscribe 

}

// observable

function datos() {
    ajax(table.getAttribute('url'))
        .subscribe(ajaxResponse => {
            let datos = ajaxResponse.response;
            table.setAttribute('data', datos);
            console.log(datos);
            console.log(table.getAttribute('data'));

        })
}
