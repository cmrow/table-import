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
    this._selected = '';
    this.heading = '';

    this._data = [];
    this._columns = [];

    this._$heading = this._root.querySelector('.title');
    this._$thead = this._root.querySelector('thead');
    this._$tbody = this._root.querySelector('tbody');
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
            max-width: 100%;
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
      });
    }
  }

  get selected() {
    return this._selected;
  }

  attributeChangedCallback() {
    this._render();
  }

  _makeThead() {
    let trThead = document.createElement('tr');
    trThead.classList.add('main-thead');
    this._columns.forEach(p => {
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
    return trThead;
  }

  _render() {
    this._$heading.textContent = this.heading || this.getAttribute('heading');

    if (this.data !== null && this.data !== '') {
      this._columns = Object.keys(this.data[0]);
      this._$thead.appendChild(this._makeThead());
      let data = this.data;
      for (let index = 1; index < data.length; index++) {
        let _tr = document.createElement('tr');

        _tr.addEventListener('click', (e) => {
          _tr.querySelector('input').checked = true;
        });

        this._columns.forEach(p => {
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


  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

}

window.customElements.define("table-component", TableComponent);
