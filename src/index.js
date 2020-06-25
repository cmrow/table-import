window.addEventListener('load', async () => {
  const divapp = document.getElementById('app');
  const tabla = document.getElementById('el2');
  const data = await obtenerDatos('api/datos.json');
  tabla.heading = "Todas las importacaiones";
  tabla.data = data;
  divapp.appendChild(createTable('Todas las importaciones', data));
});

function createTable(title, data) {
  let tableComp = new TableComponent();
  tableComp.heading = title;
  tableComp.data = data;
  return tableComp;
}

const obtenerDatos = async url => {
  const data = await fetch(url);
  return await data.json();
}