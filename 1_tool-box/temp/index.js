window.addEventListener('load', async () => {
    const divapp = document.getElementById('app');
    const tabla = document.getElementById('el2');
    const data = await obtenerDatos('http://localhost:3003/importaciones');
    const dataAudi = await obtenerDatos('http://localhost:3003/auditorias')
    tabla.data = data;
    tabla.dataAuditoria = dataAudi;
    divapp.appendChild(createTable('Todas las importaciones', data));
  });
  
function createTable(title, data) {
    let tableComp = new TableComponent();
    tableComp.heading = title;
    tableComp.data = data;
    tableComp.columnaId = 'PIID';
    return tableComp;
  }