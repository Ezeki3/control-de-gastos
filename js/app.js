// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventtListeners();
function eventtListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

  formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    console.log(this.gastos);
  }
}

class UI {
  insertarPresupuesto(cantidad) {

    // Extraemos los valores
    const { presupuesto, restante } = cantidad;

    // Agregamos al HTML
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }

  ImprimirAlerta(mensaje, tipo) {
    // Crear el div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert')

    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Insertar en el HTML
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    // Quitamos del HTML
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarGastoListado(gastos) {

    // iteramos sobre los gastos
    gastos.forEach(gasto => {

      const { cantidad, nombre, id } = gasto;

      // creamos un LI 
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      nuevoGasto.dataset.id = id; //seteamos el id al gasto
      console.log(nuevoGasto);

    })
  }
}

// Instanciar
const ui = new UI();
let presupuesto;

// Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('Ingresa un presupuesto para que lo podamos gestionar...');

  //en caso de que ingrese texto  isNaN(presupuestoUsuario) 
  if (presupuestoUsuario === '' || preguntarPresupuesto === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
    window.location.reload();
  }

  // Presupuesto valido
  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto);
}

// Añade gastos
function agregarGasto(e) {
  e.preventDefault();

  // Leer los datos de los inputs del formulario
  const nombre = document.querySelector('#gasto').value;
  const cantidad = document.querySelector('#cantidad').value;

  // Validar
  if (nombre === '' || cantidad === '') {
    ui.ImprimirAlerta('Ambos campos son obligatorios', 'error');
    return; //en caso de que se cumpla alguna condicion hasta ahi termina y retorna el mensaje

  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.ImprimirAlerta('Cantidad no valida', 'error');
    return;//en caso de que se cumpla alguna condicion hasta ahi termina y retorna el mensaje
  }

  // Generar un objeto con el gasto
  const gasto = {
    nombre,
    cantidad,
    id: Date.now() //hacemos la simulacion de un id con la propiedad Date, devuelve el número de milisegundos transcurridos desde la medianoche del 1 de enero de 1970
  }

  // Añadimos un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  // Mandamos el mensaje para que imprima
  ui.ImprimirAlerta('Gasto agregado correctamente');

  // Imprimimos solo los gastos 
  const { gastos } = presupuesto;
  ui.agregarGastoListado(gastos);

  // Reseteamos el formulario
  formulario.reset();

}