import "./stile.css";
import { Observable, from, of, fromEvent } from 'rxjs';
import { ComponenteImportaciones } from './components/minidemo';
import { ajax, AjaxResponse } from 'rxjs/ajax';
// import { datos } from './data';
const app = document.getElementById('app');
const url2 = '/src/api/datos.json';


fromEvent(window, 'load')
    .subscribe(event => {
        ajax(url2)
            .subscribe(ajaxResponse => {
                console.log(ajaxResponse);
            })
    })
// const table = document.createElement('comp-importaciones');
// table.setAttribute('url', '../json/datos.API.json')
// app.appendChild(table);
// console.log(app);

