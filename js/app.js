// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const tablaCarrito = document.querySelector('#carrito tbody');

// Eventos
cargarEventListeners()
function cargarEventListeners(){
  //añade un curso al carrito
  cursos.addEventListener('click', anadirCarrito)
  //Borra un curso del carrito
  carrito.addEventListener('click', borrarCursoCarrito);
}

// Funciones
function anadirCarrito(e) {
  e.preventDefault(); 
  
  if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;

    const articulo = leerDatosCurso(curso);
    pintarArticulo(articulo);

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

function pintarArticulo(curso){

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
}

function borrarCursoCarrito(e) {
  e.preventDefault();

  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove();
  }
}

