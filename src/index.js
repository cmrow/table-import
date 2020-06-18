window.addEventListener('load', async () => {
  const divapp = document.getElementById('app');
  const tabla = document.getElementById('el2');

  const data = await readSrc('api/datos.json');

  tabla.data = data;
  divapp.appendChild(createTable('Todas las importaciones', data));
});

function createTable(title, data) {
  let tableComp = new TableComponent();
  tableComp.heading = title;
  tableComp.data = data;
  return tableComp;
}
