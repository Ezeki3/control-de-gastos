// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventtListeners();
function eventtListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases

// Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('Ingresa un presupuesto para que lo podamos gestionar...');

  console.log(presupuestoUsuario);

  if (presupuestoUsuario === '' || preguntarPresupuesto === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
    window.location.reload();
  }
}