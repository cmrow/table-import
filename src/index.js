window.addEventListener('load', async () => {
  const tabla = document.getElementById('el2');
  const data = await obtenerDatos('http://localhost:3003/importaciones');
  tabla.data = data;
  tabla.tieneNav = true;
  tabla.titulo = "Todas las Importaciones";
  tabla.columnaId = "PIID";
  tabla.addEventListener('rowselected',
    filaSelecionada(document.getElementById('modal')));
});

const filaSelecionada = modal => async ({ objetoSeleccionado:
  { PIID } }) => {
  const dataAudi = await obtenerDatos('http://localhost:3003/auditorias');//acá se deberia enviar el id selecionado al api.
  //el siguiente filter ya no existirá cuando funcione el api por id.
  const auditoria = dataAudi.filter(({ idImportacion }) => idImportacion === PIID)
  const tabla = crearTabla(`Auditoria proceso N° ${PIID}`, auditoria);
  modal.addEventListener('open', () => {
    modal.innerHTML = '';
    modal.appendChild(tabla);

  })
  modal.open();
}

function crearTabla(title, data) {
  let tableComp = new TableComponent();
  tableComp.titulo = title;
  tableComp.data = data;
  return tableComp;
}



const obtenerDatos = async url => {
  const data = await fetch(url);
  return await data.json();
}