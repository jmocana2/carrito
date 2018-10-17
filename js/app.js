// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const tablaCarrito = document.querySelector('#carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');

// Eventos
cargarEventListeners()
function cargarEventListeners(){
  //añade un curso al carrito
  cursos.addEventListener('click', anadirCarrito)
  //Borra un curso del carrito
  carrito.addEventListener('click', borrarCursoCarrito);
  //Borra todos los cursos del carrito
  vaciarCarrito.addEventListener('click', borrarCursos);
  //Guarda los cursos en LocalStorage al cargar el documento
  document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

// Funciones
function anadirCarrito(e) {
  e.preventDefault(); 
  
  if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;

    const articulo = leerDatosCurso(curso);
    pintarArticulo(articulo, true);

  }
}

function leerDatosCurso(curso){
  const id = curso.querySelector('.agregar-carrito').getAttribute('data-id');
  const foto = curso.querySelector('.imagen-curso').src;
  const titulo = curso.querySelector('h4').textContent;
  const precio = curso.querySelector('.precio').textContent;
  const articulo = {id, foto, titulo, precio};
  return articulo;
}

function pintarArticulo(curso, guardar){

  const row = document.createElement('tr');

  row.innerHTML = `
    <tr>
      <td><img src="${curso.foto}" alt="${curso.titulo}" width=100 /></td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td><a href="${curso.foto}" class="borrar-curso" data-id="${curso.id}" />X</a>
    </tr>
  `

  tablaCarrito.appendChild(row);
  if(guardar){
    guardarCursosLS(curso);
  }
}

function borrarCursoCarrito(e) {
  e.preventDefault();

  let curso;

  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove();
  }

  curso = e.target.parentElement.parentElement;
  let cursoId = curso.querySelector('a').getAttribute('data-id');

  //borramos curso de Local Storage
  borrarCursosLocalStorage(cursoId)
}

function borrarCursos(e) {
  e.preventDefault();

  //Borramos todos los cursos del carrito
  while(tablaCarrito.firstChild){
    tablaCarrito.removeChild(tablaCarrito.firstChild);
  }

  // vaciamos Local Storage
  localStorage.clear();
  
  return false;
}

function guardarCursosLS(curso){
  let cursos;
  
  cursos = obtenerCursosLS();
  console.log(cursos);
  cursos.push(curso); 

 localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLS(){
  let cursosLS;

  if(localStorage.getItem('cursos') === null){
    cursosLS = [];
  }else{
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }

  return cursosLS;
}

function leerLocalStorage(){
   let cursos = obtenerCursosLS();
   
   cursos.map(curso => {
    pintarArticulo(curso, false);
   })
}


// Borra un curso de Local Storage
function borrarCursosLocalStorage(cursoId){
  
  // Obtenemos array con todos los cursos del carrito
  let cursosLS = obtenerCursosLS();

  // Recorremos el array y eliminamos curso con id cursoId
  cursosLS.forEach(curso => {
    if(curso.id === cursoId){
      cursosLS.splice(curso, 1);
    }
  });

  // Guardamos array sin curso en Local Storage
  localStorage.setItem('cursos', JSON.stringify(cursosLS));

}

