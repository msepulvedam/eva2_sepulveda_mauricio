// ============================================
// MUNICIPALIDAD DE CHOLCHOL - JavaScript
// Eventos, validaciones y cambios en el DOM
// ============================================

// Se ejecuta cuando la pagina termina de cargar
document.addEventListener('DOMContentLoaded', function () {

  console.log('Pagina cargada.');

  // Iniciar animacion de numeros en el hero
  animarNumeros();

  // Activar los filtros de servicios
  activarFiltros();

  // Activar los botones de noticias
  activarBotonesNoticias();

  // Activar validaciones en tiempo real
  activarValidacionTiempoReal();

  // Activar contador de caracteres
  activarContador();

  // Activar scroll del navbar
  activarScrollNavbar();

});


// ── EVENTO 1: MODO OSCURO ────────────────────
// Click en el boton cambia el tema de la pagina

document.getElementById('btn-tema').addEventListener('click', function () {
  document.body.classList.toggle('oscuro');

  if (document.body.classList.contains('oscuro')) {
    this.textContent = 'Modo claro';
  } else {
    this.textContent = 'Modo oscuro';
  }
});


// ── EVENTO 2: FILTROS DE SERVICIOS ───────────
// Click en los botones filtra las tarjetas visibles

function activarFiltros() {
  var botones = document.querySelectorAll('.btn-filtro');

  botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
      // Marcar boton activo
      botones.forEach(function (b) { b.classList.remove('activo'); });
      this.classList.add('activo');

      var categoria = this.dataset.categoria;

      // Mostrar o esconder tarjetas segun categoria
      var items = document.querySelectorAll('.item-servicio');
      items.forEach(function (item) {
        if (categoria === 'todos' || item.dataset.categoria === categoria) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}


// ── EVENTO 3: VER MAS EN NOTICIAS ───────────
// Click en "Ver mas" muestra u oculta el detalle

function activarBotonesNoticias() {
  var botones = document.querySelectorAll('.btn-ver-mas');
  botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var info = this.dataset.info;
      var contenedor = this.parentElement;
      var detalle = contenedor.querySelector('.detalle-noticia');

      if (detalle) {
        // Ya esta abierto, cerrarlo
        detalle.remove();
        this.textContent = 'Ver mas';
      } else {
        // Crear el detalle y agregarlo al DOM
        var nuevoDetalle = document.createElement('p');
        nuevoDetalle.className = 'detalle-noticia';
        nuevoDetalle.textContent = info;
        contenedor.insertBefore(nuevoDetalle, this.nextSibling);
        this.textContent = 'Cerrar';
      }
    });
  });
}




// ── EVENTO 5: FORMULARIO CON VALIDACIONES ────
// Submit valida todos los campos antes de enviar

document.getElementById('mi-formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  // Limpiar errores anteriores
  limpiarErrores();

  var nombre  = document.getElementById('inp-nombre').value.trim();
  var correo  = document.getElementById('inp-correo').value.trim();
  var mensaje = document.getElementById('inp-mensaje').value.trim();

  var hayError = false;

  // Validacion 1: nombre obligatorio
  if (nombre === '') {
    marcarError('inp-nombre', 'err-nombre', 'El nombre es obligatorio.');
    hayError = true;
  }
  // Validacion 2: nombre minimo 3 letras
  else if (nombre.length < 3) {
    marcarError('inp-nombre', 'err-nombre', 'El nombre debe tener al menos 3 caracteres.');
    hayError = true;
  }

  // Validacion 3: correo obligatorio
  if (correo === '') {
    marcarError('inp-correo', 'err-correo', 'El correo es obligatorio.');
    hayError = true;
  }
  // Validacion 4: formato correo valido
  else if (!esCorreoValido(correo)) {
    marcarError('inp-correo', 'err-correo', 'Ingrese un correo valido (ej: nombre@correo.com).');
    hayError = true;
  }

  // Validacion 5: mensaje obligatorio
  if (mensaje === '') {
    marcarError('inp-mensaje', 'err-mensaje', 'El mensaje es obligatorio.');
    hayError = true;
  }
  // Validacion 6: mensaje minimo 10 caracteres
  else if (mensaje.length < 10) {
    marcarError('inp-mensaje', 'err-mensaje', 'El mensaje debe tener al menos 10 caracteres.');
    hayError = true;
  }

  if (hayError) return;

  // Mostrar datos en consola (requerimiento del trabajo)
  console.log('Formulario enviado:');
  console.log('Nombre:', nombre);
  console.log('Correo:', correo);
  console.log('Mensaje:', mensaje);

  // Mostrar aviso de exito
  document.getElementById('aviso-ok').style.display = 'block';

  // Limpiar el formulario
  this.reset();
  document.getElementById('cuenta-chars').textContent = '0 / 500';

  // Ocultar aviso despues de 5 segundos
  setTimeout(function () {
    document.getElementById('aviso-ok').style.display = 'none';
  }, 5000);
});


// ── EVENTO 6: VALIDACION EN TIEMPO REAL ──────
// Quita el error apenas el usuario corrige el campo

function activarValidacionTiempoReal() {
  document.getElementById('inp-nombre').addEventListener('input', function () {
    if (this.value.trim().length >= 3) {
      this.classList.remove('con-error');
      document.getElementById('err-nombre').textContent = '';
    }
  });

  document.getElementById('inp-correo').addEventListener('input', function () {
    if (esCorreoValido(this.value.trim())) {
      this.classList.remove('con-error');
      document.getElementById('err-correo').textContent = '';
    }
  });
}


// ── CAMBIO DINAMICO: CONTADOR DE CARACTERES ──
// Muestra cuantos caracteres lleva el textarea

function activarContador() {
  document.getElementById('inp-mensaje').addEventListener('input', function () {
    var cantidad = this.value.length;
    document.getElementById('cuenta-chars').textContent = cantidad + ' / 500';
  });
}


// ── CAMBIO DINAMICO: SCROLL NAVBAR ───────────
// Resalta el link del menu segun la seccion visible

function activarScrollNavbar() {
  window.addEventListener('scroll', function () {
    var secciones = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nav-link');

    secciones.forEach(function (seccion) {
      var desde = seccion.offsetTop - 80;
      var hasta = desde + seccion.offsetHeight;

      if (window.scrollY >= desde && window.scrollY < hasta) {
        links.forEach(function (link) { link.classList.remove('active'); });
        var linkActual = document.querySelector('a[href="#' + seccion.id + '"]');
        if (linkActual) linkActual.classList.add('active');
      }
    });
  });
}


// ── CAMBIO DINAMICO: ANIMACION DE NUMEROS ────
// Cuenta desde 0 hasta el numero objetivo

function animarNumeros() {
  contarHasta('num-habitantes', 14500, 1500);
  contarHasta('num-servicios', 24, 1200);
  contarHasta('num-proyectos', 8, 1000);
}

function contarHasta(idElemento, objetivo, duracion) {
  var elemento = document.getElementById(idElemento);
  var inicio = 0;
  var paso = Math.ceil(objetivo / (duracion / 30));

  var intervalo = setInterval(function () {
    inicio += paso;
    if (inicio >= objetivo) {
      inicio = objetivo;
      clearInterval(intervalo);
    }
    elemento.textContent = inicio.toLocaleString('es-CL');
  }, 30);
}


// ── FUNCIONES DE APOYO ────────────────────────

function marcarError(idCampo, idError, texto) {
  document.getElementById(idCampo).classList.add('con-error');
  document.getElementById(idError).textContent = texto;
}

function limpiarErrores() {
  document.querySelectorAll('.error-campo').forEach(function (e) { e.textContent = ''; });
  document.querySelectorAll('.con-error').forEach(function (c) { c.classList.remove('con-error'); });
  document.getElementById('aviso-ok').style.display = 'none';
}

function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}
