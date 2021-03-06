class TableComponent extends HTMLElement {
  static get atributos() {
    return {
      'titulo': '_renderTitulo',
      'columna-id': null,
      'data': '_renderDatos',
      'tienenav': '_renderNavBar',
      'editable': null
    };
  }

  static get observedAttributes() {
    return Object.keys(TableComponent.atributos);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const fn = TableComponent.atributos[name];
    name = this._quitarGuionNombreAtributo(name);
    newValue = this._convertirDatosJson(newValue);
    this[name] = newValue;
    fn && this[fn]();
  }

  get tieneNav() {
    return this._tieneNav;
  }

  set tieneNav(newData) {
    this.setNav(newData);
  }
  get data() {
    return this._data;
  }

  set data(newData) {
    this.setData(newData);
  }
  get dataAuditoria() {
    return this._dataAuditoria;
  }

  set dataAuditoria(newData) {
    this.setDataAuditoria(newData);
  }

  get columnaId() {
    return this._columnaId;
  }

  set columnaId(columnaId) {
    this.setColumnaId(columnaId);
  }

  set titulo(val) {
    this.setTitulo(val);
  }

  get titulo() {
    return this._titulo;
  }


  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this.construirElementosHTML();
    this.inicializarVariables();

  }
  setNav(val) {
    if (val) {
      this._tieneNav = val;
      this._renderNavBar();
    }

  }
  setData(data) {
    this._data = data;
    this._renderDatos();
  }
  setDataAuditoria(data) {
    this._dataAuditoria = data;
  }

  setColumnaId(columnaId) {
    this._columnaId = columnaId;
  }

  setTitulo(val) {
    this._titulo = val;
    this._renderTitulo();
  }

  inicializarVariables() {
    this._selected = null;
    this._titulo = null;
    this._columnaId = null;
    this._tieneNav = false;
    this._editable = false;

    this._data = [];
    this._dataAuditoria = [];
    this._columns = [];

    this._$titulo = this._root.querySelector('.title');
    this._$thead = this._root.querySelector('thead');
    this._$tbody = this._root.querySelector('tbody');
    this._$rowSelected = null;
    this._$btns = this._root.querySelectorAll('.btn');
    this._$nav = this._root.querySelector('nav.botons');
    this._botones = {
      'btn-editar': '_fnEditar',
      'btn-borrar': '_fnBorrar',
      'btn-enviar': '_fnEnviar'
    };

  }


  _construirNavBar() {
    let nav =
      `<div class="btn btn-accion" name="btn-editar" title="Editar">
            <img src="assets/icons/edit.svg" alt="">
        </div>
        <div class="btn btn-accion" name="btn-borrar" title="Borrar">
            <img src="assets/icons/borrar.svg" alt="">
        </div>
        <div class="btn btn-crear" name="btn-enviar" title="Crear Importaciones">
            <img src="assets/icons/plus.svg" alt="">
            Crear importación
        </div>`;
    this._$nav.innerHTML = nav;
  }

  _construirBotones() {
    let divBtn = document.createElement('div');
  }

  _renderNavBar() {
    this._construirNavBar();
  }

  construirElementosHTML() {
    this._root.innerHTML =
      `<style> 
        :host{
            pointer-events = none;
            z-index = 1000;
            background-color = rgba(0,0,0,0.5);
        }
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
            border: solid var(--grey_thead) 1px;
            width:auto;
            
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
            <nav class="botons">
            </nav>
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

  _escucharEventosBotones() {
    this._$btns.forEach(btn => {
      let fn = this._botones[btn.getAttribute('name')];
      btn.addEventListener('click', () => this[fn](btn))
    });
  }



  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  _convertirDatosJson(value) {
    try {
      value = JSON.parse(value);
    }
    catch (e) { }
    return value;
  }

  _quitarGuionNombreAtributo(name) {
    const rg = /\-.?/g;
    return '_' + name.replace(rg, coincidencia => coincidencia.replace('-', '').toUpperCase());
  }

  _renderDatos() {
    if (this.data.length > 0) {
      this._extraerColumnas();
      this._construirEncabezado();
      this._construirCuerpo();
      this._escucharEventosBotones();

    }
  }

  _renderTitulo() {
    this._$titulo.textContent = this._titulo;
  }

  _extraerColumnas() {
    this._columns = Object.keys(this.data[0]);
  }

  _construirEncabezado() {
    let htmlEncabezado = '<tr class="main-thead">';
    htmlEncabezado += this._columns.reduce((anterior, columna) => anterior += `<th>${columna}</th>`, '');
    htmlEncabezado += '<th></th></tr>';
    this._$thead.innerHTML = htmlEncabezado;
  }

  _construirCuerpo() {
    this.data.forEach(dato => this._construirFila(dato));
  }

  _construirFila(obj) {
    const fila = document.createElement('tr');
    this._agregarClasesCss(fila);
    this._insertarColumnasEnLaFila(fila, obj);
    this._escucharEventos(fila, obj);
    this._$tbody.appendChild(fila);
  }

  _fnEditar(btn) {
    console.log(btn);
  }
  _fnBorrar(btn) {
    console.log(btn);
  }
  _fnEnviar(btn) {
    console.log(btn);
  }

  _agregarClasesCss(fila) {
    fila.classList.add('fila');
  }

  _escucharEventos(fila, obj) {
    if (!this._editable) {
      fila.addEventListener('click', () => this._procesarClickFila(obj, fila));
    }
  }

  _insertarColumnasEnLaFila(fila, obj) {
    let columnas = this._columns.reduce((anterior, columna) => anterior += `<td>${this._obtenerValorObjeto(obj, columna)}</td>`, '');
    columnas += '<td><input type="checkbox" class="check-row" /></td>';
    fila.innerHTML = columnas;
  }

  _obtenerValorObjeto(objeto, propiedad) {
    return ((objeto[propiedad] === null || objeto[propiedad] === "") ? 'null' : objeto[propiedad]);
  }

  _procesarClickFila(obj, fila) {
    if (this._$rowSelected) {
      this._removerAtributosDeSeleccion();
    }
    this._$rowSelected = fila;
    this._agregarAtributosDeSeleccion();
    const event = new Event('rowselected', { bubbles: true });
    event.objetoSeleccionado = obj;
    this.dispatchEvent(event);
  }

  _agregarAtributosDeSeleccion() {
    this._$rowSelected.classList.add('selected');
    this._$rowSelected.querySelector('input[type="checkbox"]').checked = true;
  }

  _removerAtributosDeSeleccion() {
    this._$rowSelected.classList.remove('selected');
    this._$rowSelected.querySelector('input[type="checkbox"]').checked = false;
  }

}

window.customElements.define("table-component", TableComponent);
