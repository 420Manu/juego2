// Lista de palabras para el juego
const palabras = [
    "javascript",
    "html",
    "css",
    "programacion",
    "computadora",
    "desarrollo",
    "tecnologia"
  ];
  
  // Palabra aleatoria seleccionada para el juego
  let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  
  // Arreglo para almacenar las letras adivinadas
  let letrasAdivinadas = [];
  
  // Número máximo de intentos permitidos
  const maxIntentos = 6;
  
  // Contador de intentos restantes
  let intentosRestantes = maxIntentos;
  
  // Elementos del DOM
  const wordContainer = document.getElementById('word-container');
  const lettersContainer = document.getElementById('letters');
  const attemptsCount = document.getElementById('attempts-count');
  
  // Inicialización del juego
  function iniciarJuego() {
    letrasAdivinadas = [];
    intentosRestantes = maxIntentos;
    actualizarIntentos();
    mostrarPalabra();
    mostrarLetras();
  }
  
  // Función para mostrar la palabra con letras adivinadas y guiones para las faltantes
  function mostrarPalabra() {
    let displayWord = '';
    for (let letra of palabraSeleccionada) {
      if (letrasAdivinadas.includes(letra)) {
        displayWord += letra + ' ';
      } else {
        displayWord += '_ ';
      }
    }
    wordContainer.textContent = displayWord.trim();
  }
  
  // Función para mostrar las letras disponibles para adivinar
  function mostrarLetras() {
    lettersContainer.innerHTML = '';
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    for (let letra of letras) {
      const letraBtn = document.createElement('button');
      letraBtn.textContent = letra;
      letraBtn.onclick = function() {
        verificarLetra(letra);
      };
      lettersContainer.appendChild(letraBtn);
    }
  }
  
  // Función para verificar si la letra está en la palabra seleccionada
  function verificarLetra(letra) {
    if (!letrasAdivinadas.includes(letra)) {
      letrasAdivinadas.push(letra);
      if (!palabraSeleccionada.includes(letra)) {
        intentosRestantes--;
        actualizarIntentos();
      }
      mostrarPalabra();
      mostrarLetras();
      verificarFinJuego();
    }
  }
  
  // Función para actualizar el contador de intentos en el DOM
  function actualizarIntentos() {
    attemptsCount.textContent = intentosRestantes;
  }
  
  // Función para verificar si el juego ha terminado (victoria o derrota)
  function verificarFinJuego() {
    if (intentosRestantes <= 0) {
      alert('¡Has perdido! La palabra era: ' + palabraSeleccionada.toUpperCase());
      resetGame();
    } else if (palabraCompleta()) {
      alert('¡Felicidades! ¡Has ganado!');
      resetGame();
    }
  }
  
  // Función para verificar si se ha adivinado completamente la palabra
  function palabraCompleta() {
    for (let letra of palabraSeleccionada) {
      if (!letrasAdivinadas.includes(letra)) {
        return false;
      }
    }
    return true;
  }
  
  // Función para reiniciar el juego
  function resetGame() {
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    iniciarJuego();
  }
  
  // Iniciar el juego al cargar la página
  document.addEventListener('DOMContentLoaded', iniciarJuego);
  