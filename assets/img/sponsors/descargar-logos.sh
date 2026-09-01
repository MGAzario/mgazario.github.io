#!/usr/bin/env bash
# Descarga los logos reales de los sponsors y reemplaza los placeholders.
# Uso: parado en la RAÍZ del proyecto, correr:  bash assets/img/sponsors/descargar-logos.sh
set -e
cd "$(dirname "$0")"

dl () { curl -sSL -A "Mozilla/5.0" -o "$2" "$1" && echo "OK  $2" || echo "FALLO $2 -> $1"; }

dl "https://www.frba.utn.edu.ar/wp-content/uploads/2019/10/logo-utn-ba.png" utnba.png
dl "https://cognitive.com.ar/wp-content/uploads/2022/05/Logo-Cognitive-Horizontal-Fondo-Blanco.png" cognitive.png
dl "https://www.emayer.com.ar/img/logo.png" emayer.png
dl "https://polimetalprocesos.com.ar/wp-content/uploads/2019/01/logo-polimetal.png" polimetal.png
dl "https://printalot.com.ar/img/cms/Logo%20Printalot%20Horizontal%20(2).png" printalot.png
dl "https://acerosmunro.com.ar/wp-content/uploads/2021/05/logo-aceros-munro.png" acerosmunro.png
dl "https://www.ansys.com/content/dam/logos/ansys-logo-black.png" ansys.png
dl "https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/images/responsive/global/mathworks-logo.svg" matlab.svg
dl "https://www.bender.de/fileadmin/template/img/logo.svg" bender.svg

echo "Listo. Revisá que los logos se vean bien y volvé a subir la carpeta assets/img/sponsors/"
