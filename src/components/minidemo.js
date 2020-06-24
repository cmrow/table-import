class TableComponent extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'heading'];
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this.setData(newData);
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this.construirElementosHTML();
    this.inicializarVariables();
  }

  setData(data) {
    this._data = data;
    this._render();
  }

  inicializarVariables() {
    this.selected = null;
    this.heading = null;
    this._idColumna = null;

    this._data = [];
    this._columns = [];

    this._$heading = this._root.querySelector('.title');
    this._$thead = this._root.querySelector('thead');
    this._$tbody = this._root.querySelector('tbody');
    this._$rowSelected = null;
  }

  construirElementosHTML() {
    this._root.innerHTML =
      `<style>
        table {
            border-collapse: collapse;
            margin: 0px;
            border-bottom: 0px;
            width: 100%;
            table-layout: auto;
            empty-cells: unset;
        }
        tbody>tr{
          cursor:pointer
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
            padding: 0px;
            text-align: center;
            height:auto;
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
            width: 130%;
            /*
            fill-available;
            width:
            */
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
            height:auto;

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
            /*
              border-bottom: solid 2px;
              width:100%;
            */
            border-color: var(--grey_line);
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
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    this.asignarTitulo();

    if (this.data.length > 0) {
      this._extraerColumnas();
      this._construirEncabezado();
      this._contruirCuerpo();
    }
  }

  asignarTitulo() {
    this._$heading.textContent = this.heading || this.getAttribute('heading');
  }

  _extraerColumnas() {
    this._columns = Object.keys(this.data[0]);
    this._idColumna = this._columns[0];
  }

  _construirEncabezado() {
    let htmlEncabezado = '<tr class="main-thead">';
    htmlEncabezado += this._columns.reduce((anterior, columna) => anterior += `<th>${columna}</th>`, '');
    htmlEncabezado += '<th></th></tr>';
    this._$thead.innerHTML = htmlEncabezado;
  }

  _contruirCuerpo() {
    this.data.forEach(dato => this._construirFila(dato));
  }

  _construirFila(obj) {
    const fila = document.createElement('tr');
    this._agregarClasesCss(fila);
    this._insertarColumnasEnLaFila(fila, obj);
    this._escucharEventos(fila, obj);
    this._$tbody.appendChild(fila);
  }

  _agregarClasesCss(fila) {
    fila.classList.add('fila');
  }

  _escucharEventos(fila, obj) {
    fila.addEventListener('click', () => this._procesarClickFila(obj, fila));
  }

  _insertarColumnasEnLaFila(fila, obj) {
    this._columns.forEach(col => this._insertarColumnaEnLaFila(fila, obj, col));
    this._construirTdCheck(fila);
  }

  _construirTdCheck(fila) {
    const celda = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('check-row');
    celda.appendChild(checkbox);
    fila.appendChild(celda);
  }

  _insertarColumnaEnLaFila(fila, obj, col) {
    let td = document.createElement('td');
    td.textContent = this._obtenerValorObjeto(obj, col);
    fila.appendChild(td);
  }

  _obtenerValorObjeto(objeto, propiedad) {
    return ((objeto[propiedad] === null || objeto[propiedad] === "") ? 'null' : objeto[propiedad]);
  }

  _procesarClickFila(obj, fila) {
    this.selected = this._idColumna;
    if (this._$rowSelected)
      this._removerAtributosDeSeleccion();

    this._$rowSelected = fila;
    this._agregarAtributosDeSeleccion();
  }

  _agregarAtributosDeSeleccion() {
    this._$rowSelected.classList.add('selected');
    this._$rowSelected.querySelector('input[type="checkbox"]').checked = true;
  }

  _removerAtributosDeSeleccion() {
    this._$rowSelected.classList.remove('selected');
    this._$rowSelected.querySelector('input[type="checkbox"]').checked = false;
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

}

window.customElements.define("table-component", TableComponent);
