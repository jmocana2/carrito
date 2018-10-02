// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');

// Eventos
cargarEventListeners()
function cargarEventListeners(){
  cursos.addEventListener('click', anadirCarrito)
}

// Funciones
function anadirCarrito(e) {
  e.preventDefault(); 
  
  if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;

    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso){
  console.log(curso);
}

