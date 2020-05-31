"use strict"
class TablaImportaciones extends HTMLElement {
    constructor() {
        super();
        //shadowroot
        this._root = this.attachShadow({ mode: "open" });
        this._data = null;
        this._url = "js/json/datos.API.json";
        //  "js/json/datos.API.json";
    }
    connectedCallback() {
        this._root.innerHTML = `
        <style>
            table {
                /* border-collapse: collapse; */
                border: solid black 1px;
                width: 100%;
            }
            th, td {
                text-align: left;
                padding: 8px;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2
            }
            th {
                background-color: #4CAF50;
                color: white;
            }
        </style>
        `;
        

        // this._render();
    }
    _render() {

    }
    attibuteChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'url':
                    debugger

                //this._url = (newValue !== null);
                //this._data = readSrc(this._url);
                //this._root.innerHTML = '';
            }
        }
    }
    static get observedAttributes() {
        return ['url'];
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
window.customElements.define("tabla-importaciones", TablaImportaciones);

