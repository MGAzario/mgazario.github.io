// Carga header y footer compartidos en todas las páginas
(function () {
  // Detectar la ruta base del proyecto
  // En GitHub Pages: /  o /repo-name/
  // En file://: calcular ruta relativa según la profundidad
  function getBasePath() {
    if (window.location.protocol === 'file:') {
      // Contar cuántos niveles estamos desde la raíz del proyecto
      // La raíz tiene index.html, nosotros.html, etc.
      var path = window.location.pathname.replace(/\\/g, '/');
      // Buscar dónde termina la carpeta raíz del proyecto
      var parts = path.split('/');
      var depth = 0;
      // Si estamos en equipo/diseno/index.html -> depth = 2
      // Si estamos en nosotros.html -> depth = 0
      // Buscar index.html o nosotros.html en la ruta para determinar la raíz
      for (var i = parts.length - 1; i >= 0; i--) {
        if (parts[i] === 'equipo') {
          // Encontramos la carpeta equipo, la raíz es un nivel arriba
          depth = parts.length - 1 - i - 1;
          break;
        }
        if (parts[i] === 'index.html' || parts[i] === 'nosotros.html') {
          // Estamos en la raíz
          depth = 0;
          break;
        }
      }
      // Si la URL actual tiene /equipo/ en ella, calcular profundidad
      if (path.indexOf('/equipo/') !== -1) {
        // equipo/AREA/index.html = 2 niveles
        depth = 2;
      }
      var prefix = '';
      for (var j = 0; j < depth; j++) {
        prefix += '../';
      }
      return prefix;
    }
    // Para servidores web (GitHub Pages, localhost, etc.)
    return '/';
  }

  var basePath = getBasePath();

  function loadComponent(url, targetSelector) {
    var target = document.querySelector(targetSelector);
    if (!target) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0) { // status 0 for file://
          var html = xhr.responseText;
          // Reemplazar rutas absolutas / con la ruta base correcta
          html = html.replace(/href="\//g, 'href="' + basePath);
          html = html.replace(/src="\//g, 'src="' + basePath);
          target.innerHTML = html;

          // Actualizar año en el footer
          var yearSpans = document.querySelectorAll('.js-current-year');
          yearSpans.forEach(function (span) {
            span.textContent = new Date().getFullYear();
          });
        }
      }
    };
    xhr.send();
  }

  loadComponent(basePath + 'components/header.html', '#site-header');
  loadComponent(basePath + 'components/footer.html', '#site-footer');
})();
