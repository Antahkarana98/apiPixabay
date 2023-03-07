const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


window.onload = () => {
  formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector('#termino').value.trim();

  if(terminoBusqueda === ''){
    mostrarAlerta("Agregar un termino de busqueda");
    return;
  }

  buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector('.bg-red-100');

  if(!existeAlerta){

    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4',
    'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">${mensaje}</span>
    `;
    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }

}

function buscarImagenes(termino) {
  const key = "34186713-f9ab67c25633920de31a48e02";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

  fetch(url)
    .then(response => response.json())
    .then(results => {
        mostrarImagenes(results.hits);
    })
}

function mostrarImagenes(imagenes) {
  imagenes.forEach(imagen => {
    const { likes, views, previewURL, largeImageURL } = imagen;

    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
          <div class="bg-white">
              <img class="w-full" src="${previewURL}"/>
              <div class="p-4">
                <p class="font-bold">${likes} <span class="font-light"> Me Gusta </span> </p>
                <p class="font-bold">${views} <span class="font-light"> Vistas </span> </p>
                <a
                  class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white"
                  href=${largeImageURL}
                  rel="noopener noreferrer"
                  target="_blank">
                  Ver Imagen
                </a>
              </div>
          </div>
      </div>
    `;
  })
}
