class ComponenteImportaciones extends HTMLElement {
    constructor() {
        super();
        //shadowroot
        this._root = this.attachShadow({ mode: "open" });
        this._id = '';
        this._data = "";
        this._url = "";
        this._titulo = '';
        this._$title = "";
        this._$container = "";
        this._$selected = "";
        this._$section_tabla = "";
        //  "js/json/datos.API.json";
    }
    connectedCallback() {
        this._root.innerHTML =
            `<style>
        table {
            border-collapse: collapse;
            margin: 0px;
            border-bottom: 0px;
            width: 100%;
        }
        th {
            height: 1em;
            border-right: var(--white) solid 1px;
            padding: 1em;
        }
        th:last-child, td:last-child {
            border-right: 0px;
        }
        tr:last-child {
            border-bottom: 0px;
            border-right: 0px;
        }
        td:first-child {
            border-left: 0px;
        }
        tr > td {
            border: 1px solid var(--grey_line);
            padding: 2px;
            text-align: center;
            min-height: 2em;
        }
        .selected {
            background-color: var(--green_soft);
        }
        tbody tr:hover {
            background-color: var(--green_soft);
        }
        tbody {
            background-color: var(--grey_bg);
        }
        .contenedor-componente {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            display: flex;
            flex-direction: column;
            background-color: var(--white);
            font-size: smaller;
            margin: 1em;
            border: solid var(--grey_thead) 1px;
        }
        .botons {
            display: flex;
        }
        
        .btn-crear:hover {
            border: 1px;
            background: var(--grey_thead);
            border-style: inset;
        }
        .btn-accion {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3em;
            width: 3em;
            background: var(--bg_soft);
            border-radius: 1px;
            cursor: pointer;
            border: solid var(--grey_bg) 1px;
        }
        .btn-accion:hover {
            background-color: #E2E7FC;
            border: var(--grey_bg) 1px;
            border-style: outset;
        }
        .main-thead {
            background-color: var(--grey_thead);
            color: var(--white);
            width: 100%;
        }
        .header-componente {
            background: #104F863B;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em;
            color: var(--grey_thead);
            /* border-bottom: solid 2px; */
            /* border-color: var(--grey_line); */
        }
        .title {
            font-size: 2rem;
        }
        div.btn-crear {
            background-color: var(--blue_sinco);
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            margin-left: 1em;
            padding: 0 1em 0 1em;
            color: #FFFFFF;
            border-radius: 1px;
            height: 3em;
            width: 10em;
            border: solid var(--grey_bg) 1px;
            cursor: pointer;
        }
    </style>
    <div class="contenedor-componente">
        <header class="header-componente">
            <h1 class="title"></h1>
            <div class="botons">
                <div class="btn-accion" title="Auditoria">
                    <img src="../assets/css/icons/auditoria.svg" alt="">
                </div>
                <div class="btn-accion" title="Editar">
                    <img src="../assets/css/icons/edit.svg" alt="">
                </div>
                <div class="btn-accion" title="Borrar">
                    <img src="../assets/css/icons/borrar.svg" alt="">
                </div>
                <div class="btn-crear" title="Crear Importaciones">
                    <img src="../assets/css/icons/plus.svg" alt="">
                    Crear importación
                </div>
            </div>
        </header>
        <section class="tabla">

        </section>
    </div>
    `;
        this._$title = this._root.querySelector('.title');
        this._$section_tabla = this._root.querySelector('.tabla');
        this._setTitle(this.getAttribute("titulo"));
        this._url = this.getAttribute("url");

        this._loadData();
        this._render();
    }
    _render() {
        if (this._data != null && this._data != '') {
            this._$title.innerHTML = this.getAttribute('titulo');
            this._$section_tabla.innerHTML = "";
            let tabla = document.createElement('table');
            let thead = document.createElement('thead');
            let tr = document.createElement('tr');
            tr.classList.add('main-thead');
            const properties = this._data[0].propiedades;
            properties.forEach(p => {
                if (p === "opcion") {
                    let th = document.createElement('th');
                    let ipt = document.createElement('input');
                    ipt.setAttribute('type', 'checkbox');
                    th.appendChild(ipt);
                    tr.appendChild(th);
                } else {
                    let th = document.createElement('th');
                    th.textContent = p
                    tr.appendChild(th);
                }
            });
            thead.appendChild(tr);
            tabla.appendChild(thead);
            let tbody = document.createElement('tbody');
            let data = this._data;
            for (let index = 1; index < data.length; index++) {
                let _tr = document.createElement('tr');
                properties.forEach(p => {
                    if (p === "opcion") {
                        let td = document.createElement('td');
                        let ipt = document.createElement('input');
                        ipt.setAttribute('type', 'checkbox');
                        td.appendChild(ipt);
                        _tr.appendChild(td);
                    } else {
                        let prop = p;
                        let txt = data[index];
                        let td = document.createElement('td');
                        td.textContent = txt[p];
                        _tr.appendChild(td)
                    }
                })
                tbody.appendChild(_tr)
            }
            tabla.appendChild(tbody);
            this._$section_tabla.appendChild(tabla);
        }
    }
    _setTitle(title) {
        if (this._titulo === title) return;
        this._titulo = title;
        this._render();
    }
    _setUrl(url) {
        if (this._url === url) return;
        this._url = url;
        this._render();
    }
    _loadData() {
        readSrc(this, this._url)
            .then(data => {
                this._setData(data);
            }
            );
    }
    _setData(datos) {
        if (this._data === datos) return;
        this._data = datos;
        this._render();
    }
    attibuteChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'titulo':
                    this._setTitle(newValue);
                    break;
                case 'id':
                    this._id = (newValue !== null);
                    break;
                case 'url':
                    break;
                case 'data':
                    this._data = this._setData(newValue)
                    break;
            }
        }
    }
    static get observedAttributes() {
        return ['url', 'titulo', 'data'];
    }

    set data(data) {
        if (this._data === data) return;
        this._data = data;
        this._render();
    }
    get data() {
        return this._data;
    }


}


window.customElements.define("comp-importaciones", ComponenteImportaciones);

