document.addEventListener('DOMContentLoaded', () => {
  iniciarApp()
})

const iniciarApp = () => {
  crearGaleria()
  scrollSnap()
}

const crearGaleria = () => {
  const galeria = document.querySelector('.galeria-imagenes')
  
  for(let i = 1; i <= 12; i++) {
    const imagen = document.createElement('picture')
    imagen.innerHTML = `
      <source srcset="/dist/img/thumb/${i}.avif" type="image/avif">
      <source srcset="/dist/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="/dist/img/thumb/${i}.jpg" alt="Imagen Galería">
    `

    imagen.onclick = () => {
      mostrarImagen(i)
    }
    galeria.appendChild(imagen)
  }
}

const mostrarImagen = id => {
  const imagen = document.createElement('picture')
  imagen.innerHTML = `
    <source srcset="/dist/img/grande/${id}.avif" type="image/avif">
    <source srcset="/dist/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="/dist/img/grande/${id}.jpg" alt="Imagen Galería">
  `

  //* Crea el overlay con la imagen
  const overlay = document.createElement('div')
  overlay.appendChild(imagen)
  overlay.classList.add('overlay')

  //* Boton para cerrar el modal
  const iconoCerrar = document.createElement('p')
  iconoCerrar.textContent = 'X'
  iconoCerrar.classList.add('btn-cerrar')
  iconoCerrar.onclick = () => {
    const body = document.querySelector('body')
    body.classList.remove('fijar-body')
    overlay.remove()
  }
  overlay.appendChild(iconoCerrar)

  //* Añadirlo al html
  const body = document.querySelector('body')
  body.appendChild(overlay)
  body.classList.add('fijar-body')
}

const scrollSnap = () => {
  const enlaces = document.querySelectorAll('.navegacion-principal a')
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault()
      const seccionScroll = e.target.attributes.href.value
      const seccion = document.querySelector(seccionScroll)
      seccion.scrollIntoView({ behavior: 'smooth' })
    })
  })
}