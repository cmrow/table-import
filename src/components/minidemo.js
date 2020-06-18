class ComponenteImportaciones extends HTMLElement {
    static get observedAttributes() {
        return ['url', 'heading', 'data'];
    }
    constructor() {
        super();
        this.id = '';
        this.data = "";
        this.properties = "";
        this.heading = '';
        this._selected = "";
        this._root = this.attachShadow({ mode: "open" });
        this._$heading = "";
        this._$thead = null;
        this._$tbody = null;
    }
    set selected(index) {
        const $ipts = this._$tbody.querySelectorAll('input[type ="checkbox"]');
        if ($ipts !== null) {
            $ipts.forEach($ipt => {
                if ($ipt.dataset.id === index && $ipt.checked) {
                    $ipt.parentNode.parentNode.classList.add('selected');
                    this._selected = index;
                } else {
                    $ipt.parentNode.parentNode.classList.remove("selected");
                    $ipt.checked = false;
                }
            })
            console.log(this);
        }
    }
    get selected() {
        return this._selected;
    }
    set url(src) {
        if (src == this._url) return;
        this._url = src;
        this._render();
    }
    get url() {
        return this._url;
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
        input:checked {
            border: 1px solid blue;
          }
        input[type="checkbox"]{
            font-size: 21px;
            transform: scale(1.2);
        }
        tbody {
            background-color: var(--grey_bg);
            color: #38383A;
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
        input.check-row{
            height:2em;

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
                    <img src="assets/icons/auditoria.svg" alt="">
                </div>
                <div class="btn-accion" title="Editar">
                    <img src="assets/icons/edit.svg" alt="">
                </div>
                <div class="btn-accion" title="Borrar">
                    <img src="assets/icons/borrar.svg" alt="">
                </div>
                <div class="btn-crear" title="Crear Importaciones">
                    <img src="assets/icons/plus.svg" alt="">
                    Crear importación
                </div>
            </div>
        </header>
            <table>
            <thead>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    `;
        this._$heading = this._root.querySelector('.title');
        this._$thead = this._root.querySelector('thead');
        this._$tbody = this._root.querySelector('tbody');

        // this.heading = this.getAttribute("heading");
        this._$heading.textContent = this.heading;
        // this.data = this.getAttribute("data");
        this.properties = Object.keys(this.data[0]);
        // debugger
        console.log(this.properties);
        // // this._loadData();
        this._$tbody.addEventListener('click', (e) => {
            this._$tbody.querySelectorAll('input[type="checkbox"]')
                .forEach(($ipt) => {
                    if ($ipt === e.target) {
                        this.selected = $ipt.dataset.id;
                    }
                })
        })

        this._render();
    }
    _render() {
        // if (this._heading !== "" && this.heading !== null) {

        // } else 
        if (this.data != null && this.data != '') {
            let trThead = document.createElement('tr');
            trThead.classList.add('main-thead');
            trThead.dataset.id = 'thead';
            // const properties = this._data[0].propiedades;
            this.properties.forEach(p => {
                if (p === "opcion") {
                    let th = document.createElement('th');
                    let ipt = document.createElement('input');
                    ipt.setAttribute('type', 'checkbox');
                    th.appendChild(ipt);
                    trThead.appendChild(th);
                } else {
                    let th = document.createElement('th');
                    th.textContent = p
                    trThead.appendChild(th);
                }

            });
            this._$thead.appendChild(trThead);
            let data = this.data;
            for (let index = 1; index < data.length; index++) {
                let _tr = document.createElement('tr');
                this.properties.forEach(p => {
                    if (p === "opcion") {
                        let td = document.createElement('td');
                        let ipt = document.createElement('input');
                        ipt.setAttribute('type', 'checkbox');
                        ipt.dataset.id = data[index]["PIID"];
                        ipt.classList.add('check-row');
                        td.appendChild(ipt);
                        _tr.appendChild(td);
                    } else {
                        let cols = data[index];
                        let td = document.createElement('td');
                        let txt = cols[p];
                        td.textContent = ((txt === null || txt === "") ? 'null' : txt)
                        _tr.appendChild(td)
                    }
                })
                this._$tbody.appendChild(_tr);
            }
        }
    }
  
    attibuteChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'heading':
                    // this._heading = (newValue !== null);
                    this._render();
                    break;
                case 'id':
                    // this._id = (newValue !== null);
                    this._render()
                    break;
                case 'data':
                    this._render();
                    break;
            }
        }
    }

}

window.customElements.define("comp-importaciones", ComponenteImportaciones);

