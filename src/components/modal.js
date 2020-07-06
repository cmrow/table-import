class ModalComponent extends HTMLElement {
    static get atributos() {
        return {
            'titulo': '_renderTitulo',
            'abierto': 'open'
        };
    }

    static get observedAttributes() {
        return Object.keys(ModalComponent.atributos);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const fn = ModalComponent.atributos[name];
        name = this._quitarGuionNombreAtributo(name);
        this[name] = newValue;
        fn && this[fn]();
    }

    set titulo(val) {
        this._titulo = val;
        this._renderTitulo();
    }

    get titulo() {
        return this._titulo;
    }


    open() {
        this._abierto = true;
        this._addClass();
        this._dispararEvento('open');
    }
    close() {
        this._abierto = false;
        this._removeClass();
        this._dispararEvento('close');
    }
    _dispararEvento(nomEvento) {
        const event = new Event(nomEvento, { bubbles: true });
        this.dispatchEvent(event);
    }
    _renderTitulo() {
        this._$titulo.textContent = this._titulo;
    }
    _addClass() {
        this._$modal.classList.add('open');
    }
    _removeClass() {
        this._$modal.classList.remove('open');
    }
    constructor() {
        super();
        this._root = this.attachShadow({ mode: "open" });
        this._construirElementosHtml();
        this._inicializarVariables();
        this._agregarEvento();
    }
    _agregarEvento() {
        const fnCerrar = () => this.close();
        this._$modal.addEventListener('click', fnCerrar);

        this._$cerrar.addEventListener('click', fnCerrar);
        this._$modal.querySelectorAll('div,*:not(.close)')
            .forEach(el =>
                el.addEventListener('click', e => {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }, false)
            )
        window.addEventListener('keyup', e => {
            if (e.keyCode === 27) fnCerrar();
        });
    }

    _quitarGuionNombreAtributo(name) {
        const rg = /\-.?/g;
        return '_' + name.replace(rg, coincidencia => coincidencia.replace('-', '').toUpperCase());
    }

    _inicializarVariables() {
        this._abierto = false;
        
        this._$modal = this._root.querySelector('.frame');
        this._$cerrar = this._root.querySelector('.close');
        this._$titulo = this._root.querySelector('.title-content');
    }
    _construirElementosHtml() {
        this._root.innerHTML = `
        <style>
        *{
        }
        .frame {
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;            
            overflow: hidden;
            pointer-events: none;
            z-index: 1000;
            transition: background-color 300ms ease-in;
            display: flex;
            justify-content: center;
            align-items:center;
          }
          .container{
                background: #FFF;
                height: 80%;
                transform: translateY(-100vh);
                will-change: transform;
                transition: transform 300ms ease-in;
          } 
          .close {
                flex-grow: 0;
                flex-shrink: 0;
                cursor: pointer;
                user-select: none;
            }
            .frame.open {     
                pointer-events: auto;
                box-shadow: 1px 0 3px rgba(51,51,51,0.25);
                background-color: rgba(0, 0, 0, 0.25);
            }
            .frame.open .container {
                transform: none;
            }
            .header-componente{
                display:flex;
                justify-content: space-between;
                align-items: center;
                padding:1em;
                background-color: #104F863B;
                font-size: smaller;

            }
            .content{
                padding: 1em 1em 0 1em;
            }

        </style>
        <div class="frame" data-close="true">
          <div class="container">
            <div class="header-componente">
                <h1 class="title-content">
                </h1>
                <a class="close" data-close="true">&#10006;</a>
            </div>
            <div class="content">
                <slot class="content-slot"></slot>
            </div>
          </div>
        </div>
        `
    }

}
window.customElements.define('modal-component', ModalComponent);