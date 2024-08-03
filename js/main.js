// Variables y datos
let equipo = JSON.parse(localStorage.getItem('equipo')) || [];
let edadesJugadores = JSON.parse(localStorage.getItem('edadesJugadores')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

console.log("Datos iniciales cargados:", { equipo, edadesJugadores, carrito, isDarkMode });

// Productos
const productos = [
    { id: 1, nombre: "Camiseta", precio: "$45.000", images: ["./images/camiseta.jpeg", "./images/camiseta2.jpeg"] },
    { id: 2, nombre: "Botines Nike", precio: "$170.000", images: ["./images/botinesnik.jpeg"] },
    { id: 3, nombre: "Pelota", precio: "$15.000", images: ["./images/pelota.jpeg", "./images/pelota2.jpeg"] },
    { id: 4, nombre: "Short", precio: "$30.000", images: ["./images/pantalon.jpeg", "./images/pantalon2.jpeg"] },
    { id: 5, nombre: "Medias", precio: "$11.000", images: ["./images/medias.jpeg", "./images/medias2.jpeg"] },
    { id: 6, nombre: "Botines Adidas", precio: "$280.000", images: ["./images/botinesad.jpg"] },
    { id: 7, nombre: "Canilleras", precio: "$7.000", images: ["./images/canilleras.jpg"] },
    { id: 8, nombre: "Campera", precio: "$110.000", images: ["./images/campera.jpg"] },
];

console.log("Productos cargados:", productos);

// Funciones de almacenamiento
const guardarDatos = () => {
    localStorage.setItem('equipo', JSON.stringify(equipo));
    localStorage.setItem('edadesJugadores', JSON.stringify(edadesJugadores));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('darkMode', isDarkMode.toString());
    console.log("Datos guardados:", { equipo, edadesJugadores, carrito, isDarkMode });
};

// Funciones de renderizado
const renderJugadores = () => {
    const listaJugadores = document.getElementById('listaJugadores');
    listaJugadores.innerHTML = '';
    equipo.forEach(jugador => {
        const li = document.createElement('li');
        const nombreSpan = document.createElement('span');
        nombreSpan.textContent = `${jugador.nombre} `;
        const edadSpan = document.createElement('span');
        edadSpan.textContent = `${jugador.edad} años`;
        edadSpan.classList.add('edad-color');
        li.appendChild(nombreSpan);
        li.appendChild(edadSpan);
        listaJugadores.appendChild(li);
    });
    console.log("Jugadores renderizados:", equipo);
};

const renderCarrito = () => {
    const carritoCompras = document.getElementById('carritoCompras');
    carritoCompras.innerHTML = '';
    carrito.forEach((producto, index) => {
      const productoData = productos.find(p => p.nombre === producto.nombre);
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-around';
      li.style.alignItems = 'center';
      li.style.marginBottom = '10px';
      li.setAttribute('data-nombre', producto.nombre); // Add this line
      
      const nombre = document.createElement('span');
      nombre.textContent = producto.nombre;
  
      const imagen = document.createElement('img');
      imagen.src = productoData.images[0];
      imagen.alt = producto.nombre;
      imagen.style.width = '100px';
      imagen.style.height = '100px';
      imagen.style.margin = '5px 0';
      imagen.style.borderRadius = '10px';
  
      const precio = document.createElement('span');
      precio.textContent = producto.precio;
  
      const cantidadLabel = document.createElement('label');
      cantidadLabel.textContent = 'Cantidad:';
      cantidadLabel.style.margin = '10px 0';
  
      const cantidadInput = document.createElement('input');
      cantidadInput.type = 'number';
      cantidadInput.value = producto.cantidad || 1;
      cantidadInput.min = 1;
      cantidadInput.style.width = '70px';
      cantidadInput.style.margin = '5px 0';
      cantidadInput.style.backgroundColor = '#1b1b25'; 
      cantidadInput.style.color = 'white';
      cantidadInput.addEventListener('change', () => updateCantidadProducto(index, cantidadInput.value));
  
      const cantidadContainer = document.createElement('div');
      cantidadContainer.style.display = 'flex';
      cantidadContainer.style.flexDirection = 'column';
      cantidadContainer.style.alignItems = 'center';
      cantidadContainer.appendChild(cantidadLabel);
      cantidadContainer.appendChild(cantidadInput);
  
      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.classList.add('eliminarProducto');
      eliminarBtn.setAttribute('data-nombre', producto.nombre);
      eliminarBtn.addEventListener('click', () => eliminarProducto(producto.nombre));
  
      li.appendChild(nombre);
      li.appendChild(imagen);
      li.appendChild(precio);
      li.appendChild(cantidadContainer);
      li.appendChild(eliminarBtn);
      
      carritoCompras.appendChild(li);
    });
    calcularTotal();
    actualizarCantidadCarrito();
  };

const updateCantidadProducto = (index, cantidad) => {
    carrito[index].cantidad = parseInt(cantidad, 10);
    guardarDatos();
    renderCarrito();
};
// Funciones de jugadores
const agregarJugador = (nombre, edad) => {
    if (edad < 10 || edad > 50) {
        mostrarMensaje("Error: La edad del jugador debe estar entre 10 y 50 años", 'error');
        return;
    }
    equipo.push({ nombre, edad });
    edadesJugadores.push(edad);
    guardarDatos();
    renderJugadores();
    console.log(`Jugador añadido: ${nombre}, ${edad} años`);
    mostrarMensaje(`Jugador ${nombre} de ${edad} años ha sido añadido al equipo`, 'exito');
};

const buscarJugador = () => {
    let nombre = prompt("Ingresá el nombre del jugador que quieras buscar");
    let jugador = equipo.find(jugador => jugador.nombre.toLowerCase() === nombre.toLowerCase());
    if (jugador) {
        console.log(`Jugador encontrado: ${jugador.nombre}, ${jugador.edad} años`);
        mostrarMensaje(`Jugador encontrado: ${jugador.nombre}, ${jugador.edad} años`, 'exito');
    } else {
        console.log("Jugador no encontrado");
        mostrarMensaje("Error: Jugador no encontrado", 'error');
    }
};

const eliminarJugador = () => {
    let nombre = prompt("Ingresa el nombre del jugador que deseas eliminar");
    let index = equipo.findIndex(jugador => jugador.nombre.toLowerCase() === nombre.toLowerCase());
    if (index !== -1) {
        let jugador = equipo.splice(index, 1)[0];
        edadesJugadores.splice(index, 1);
        guardarDatos();
        renderJugadores();
        console.log(`Jugador eliminado: ${jugador.nombre}`);
        mostrarMensaje(`Jugador ${jugador.nombre} ha sido eliminado del equipo`, 'exito');
    } else {
        console.log("Jugador no encontrado");
        mostrarMensaje("Error: Jugador no encontrado", 'error');
    }
};

const calcularEdadPromedio = () => {
    if (edadesJugadores.length === 0) return;
    let suma = edadesJugadores.reduce((total, edad) => total + edad, 0);
    let promedio = suma / edadesJugadores.length;
    console.log(`Edad promedio calculada: ${promedio.toFixed(2)} años`);
    mostrarPromedioEdad(promedio.toFixed(2));
};

// Funciones de carrito
const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        guardarDatos();
        renderCarrito();
        showFloatingMessage(`El producto <span class="product-name">${producto.nombre}</span> ha sido añadido al carrito.`);
        console.log(`Producto añadido al carrito: ${producto.nombre}`);
    }
};

const showFloatingMessage = (message) => {
    const messageBox = document.getElementById('floatingMessageBox');
    messageBox.innerHTML = message; 
    messageBox.classList.add('show');
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
};

const eliminarProducto = (nombre) => {
    const index = carrito.findIndex(producto => producto.nombre === nombre);
    if (index !== -1) {
      const carritoCompras = document.getElementById('carritoCompras');
      const li = carritoCompras.querySelector(`li[data-nombre="${nombre}"]`);
      
      if (li) {
        // Add the animation class
        li.classList.add('blur-out-slide-left');
        
        // Wait for the animation to finish before removing the item
        li.addEventListener('animationend', () => {
          carrito.splice(index, 1);
          guardarDatos();
          renderCarrito();
        });
      }
    }
  };

const calcularTotal = () => {
    const totalCarrito = document.getElementById('totalCarrito');
    const total = carrito.reduce((acc, producto) => {
        const precioUnitario = parseFloat(producto.precio.replace('$', '').replace('.', ''));
        const cantidad = producto.cantidad || 1;
        return acc + (precioUnitario * cantidad);
    }, 0);
    const formattedTotal = total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 });
    totalCarrito.textContent = `Total: ${formattedTotal}`;
    console.log(`Total del carrito calculado: ${formattedTotal}`);
};

const actualizarCantidadCarrito = () => {
    const cantidadCarrito = document.getElementById('cantidadCarrito');
    const cantidad = carrito.length;
    cantidadCarrito.textContent = cantidad;
    console.log(`Cantidad de productos en el carrito actualizada: ${cantidad}`);
};

// Funciones de UI
const mostrarMensaje = (mensaje, tipo) => {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add(`${tipo}-mensaje`);
    divMensaje.textContent = mensaje;
    const cerrarBtn = document.createElement('button');
    cerrarBtn.classList.add('cerrar-btn');
    cerrarBtn.textContent = 'Cerrar';
    cerrarBtn.addEventListener('click', () => {
        divMensaje.classList.remove('mostrar');
        setTimeout(() => {
            divMensaje.remove();
        }, 300);
    });
    divMensaje.appendChild(cerrarBtn);
    document.body.insertBefore(divMensaje, document.body.firstChild);
    setTimeout(() => {
        divMensaje.classList.add('mostrar');
    }, 10);
    setTimeout(() => {
        divMensaje.classList.remove('mostrar');
        setTimeout(() => {
            divMensaje.remove();
        }, 300);
    }, 3000);
    console.log(`Mensaje mostrado: ${mensaje}, tipo: ${tipo}`);
};

const mostrarPromedioEdad = (promedio) => {
    const edadPromedio = document.getElementById('edadPromedio');
    edadPromedio.innerHTML = `La edad promedio es <span class="texto-color">${promedio} años</span><button id="cerrarEdadPromedio">x</button>`;
    edadPromedio.classList.add('mostrar');
    const cerrarEdadPromedioBtn = document.getElementById('cerrarEdadPromedio');
    cerrarEdadPromedioBtn.addEventListener('click', () => {
        edadPromedio.classList.remove('mostrar');
    });
    console.log(`Promedio de edad mostrado: ${promedio}`);
};

const toggleCarrito = () => {
    const carritoOverlay = document.getElementById('carritoOverlay');
    const carritoPanel = document.getElementById('carritoPanel');

    if (carritoOverlay.style.display === 'block') {
        carritoOverlay.classList.remove('active');
        carritoOverlay.style.display = 'none';
        console.log('Carrito cerrado');
    } else {
        carritoOverlay.classList.add('active');
        carritoOverlay.style.display = 'block';
        renderCarrito();
        console.log('Carrito abierto');
    }
};

// Funcionalidad de compra
const mostrarMensajeCompra = () => {
    Swal.fire({
        title: "",
        text: "Compra realizada con éxito. ¡Gracias por tu compra!",
        icon: "success",
        confirmButtonText: "Cerrar"
    });
    console.log("Modal de compra mostrado");
};

const comprarCarrito = () => {
    carrito = [];
    guardarDatos();
    renderCarrito();
    mostrarMensajeCompra();
    console.log("Compra realizada, carrito vaciado");
};

document.getElementById('comprarCarrito').addEventListener('click', comprarCarrito);

// Modal de imágenes
let currentImageIndex = 0;
let currentImages = [];
let isZoomed = false;
let startX, startY;

const showModal = (images) => {
    const modal = document.getElementById('imagenModal');
    const modalImg = document.getElementById('imgGrande');
    const captionText = document.getElementById('caption');
    const zoomBtn = document.createElement('button');
    zoomBtn.classList.add('zoomBtn');
    zoomBtn.textContent = 'Zoom';
    zoomBtn.id = 'zoomBtn';
    currentImages = images;
    currentImageIndex = 0;
    modal.style.display = "block";
    modalImg.src = currentImages[currentImageIndex];
    captionText.innerHTML = currentImages[currentImageIndex];
    const span = modal.querySelector('.cerrarModal');
    span.onclick = () => {
        modal.style.display = "none";
        zoomBtn.remove();
    }
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            zoomBtn.remove();
        }
    }
    document.body.appendChild(zoomBtn);
    zoomBtn.addEventListener('click', toggleZoom);

    // Touch 
    modalImg.addEventListener('touchstart', handleTouchStart, false);
    modalImg.addEventListener('touchmove', handleTouchMove, false);
    console.log("Modal de imagen mostrado", { currentImages, currentImageIndex });
}

const toggleZoom = () => {
    const modalImg = document.getElementById('imgGrande');
    const zoomBtn = document.getElementById('zoomBtn');
    if (isZoomed) {
        modalImg.style.transform = 'scale(1)';
        zoomBtn.textContent = 'Zoom';
    } else {
        modalImg.style.transform = 'scale(2)';
        zoomBtn.textContent = 'Salir Zoom';
    }
    isZoomed = !isZoomed;
    console.log(`Zoom toggled: ${isZoomed}`);
}

const handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0];
    startX = firstTouch.clientX;
    startY = firstTouch.clientY;
    console.log("Touch start", { startX, startY });
};

const handleTouchMove = (evt) => {
    if (!startX || !startY) {
        return;
    }

    let xDiff = startX - evt.touches[0].clientX;
    let yDiff = startY - evt.touches[0].clientY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { 
        if (xDiff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }

    startX = 0;
    startY = 0;
    console.log("Touch move", { xDiff, yDiff });
};

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    document.getElementById('imgGrande').src = currentImages[currentImageIndex];
    document.getElementById('caption').innerHTML = currentImages[currentImageIndex];
    console.log("Next image shown", { currentImageIndex, currentImage: currentImages[currentImageIndex] });
}

const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById('imgGrande').src = currentImages[currentImageIndex];
    document.getElementById('caption').innerHTML = currentImages[currentImageIndex];
    console.log("Previous image shown", { currentImageIndex, currentImage: currentImages[currentImageIndex] });
}

document.getElementById('nextImg').addEventListener('click', showNextImage);
document.getElementById('prevImg').addEventListener('click', showPrevImage);

// Inicialización
const init = () => {
    renderJugadores();
    renderCarrito();
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    document.getElementById('bienvenidaModal').style.display = 'block';
    console.log("Bienvenida modal");
};

document.getElementById('entrarBtn').addEventListener('click', () => {
    document.getElementById('bienvenidaModal').style.display = 'none';
    console.log("Bienvenida modal cerrada");
});

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
    guardarDatos();
    console.log("Dark mode toggled:", isDarkMode);
});

document.getElementById('carritoIcono').addEventListener('click', toggleCarrito);
document.getElementById('cerrarCarritoOverlay').addEventListener('click', toggleCarrito);
document.getElementById('limpiarCarrito').addEventListener('click', () => {
    const confirmModal = document.getElementById('confirmModal');
    confirmModal.style.display = 'block';
    document.getElementById('cancelBtn').addEventListener('click', () => {
        confirmModal.style.display = 'none';
        console.log("Confirmación de limpieza de carrito cancelada");
    });
    document.getElementById('confirmBtn').addEventListener('click', () => {
        carrito = [];
        guardarDatos();
        renderCarrito();
        confirmModal.style.display = 'none';
        console.log("Carrito limpiado");
    });
});

init();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formJugador').addEventListener('submit', (e) => {
        e.preventDefault();
        let nombre = document.getElementById('nombre').value;
        let edad = Number(document.getElementById('edad').value);
        if (nombre && !isNaN(edad)) {
            agregarJugador(nombre, edad);
            document.getElementById('formJugador').reset();
            console.log(`Formulario de jugador enviado: ${nombre}, ${edad}`);
        }
    });

    document.getElementById('buscarJugador').addEventListener('click', buscarJugador);
    document.getElementById('eliminarJugador').addEventListener('click', eliminarJugador);
    document.getElementById('calcularEdadPromedio').addEventListener('click', calcularEdadPromedio);
    document.getElementById('eliminarTodosJugadores').addEventListener('click', () => {
        equipo.length = 0;
        edadesJugadores.length = 0;
        guardarDatos();
        renderJugadores();
        console.log("Todos los jugadores eliminados");
    });

    document.getElementById('galeriaProductos').addEventListener('click', (e) => {
        if (e.target.classList.contains('agregarCarrito')) {
            const id = Number(e.target.parentElement.dataset.id);
            agregarAlCarrito(id);
        }
        if (e.target.tagName === 'IMG' && e.target.closest('.producto-imagen')) {
            const id = Number(e.target.closest('.producto').dataset.id);
            const producto = productos.find(p => p.id === id);
            if (producto) {
                showModal(producto.images);
                console.log(`Imagen del producto mostrada en modal: ${producto.nombre}`);
            }
        }
    });

    document.getElementById('carritoIcono').addEventListener('click', toggleCarrito);
    document.getElementById('cerrarCarritoOverlay').addEventListener('click', toggleCarrito);

    document.getElementById('limpiarCarrito').addEventListener('click', () => {
        document.getElementById('confirmModal').style.display = 'block';
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
        document.getElementById('confirmModal').style.display = 'none';
        console.log("Confirmación de limpieza de carrito cancelada");
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        carrito = [];
        guardarDatos();
        renderCarrito();
        document.getElementById('confirmModal').style.display = 'none';
        console.log("Carrito limpiado");
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminarProducto')) {
            const nombre = e.target.getAttribute('data-nombre');
            eliminarProducto(nombre);
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('bienvenidaModal')) {
            document.getElementById('bienvenidaModal').style.display = 'none';
            console.log("Bienvenida modal cerrada");
        }
    });

    init();
});

// URL base para la API de jugadores de fútbol
const API_URL = 'https://api.football-data.org/v4/persons';
const API_KEY = '2ef160e804144023b112f264054518fc';

// Función para mostrar jugadores
const createPlayerCard = (player) => {
    const playerCard = document.createElement('div');
    playerCard.innerHTML = `
       <p>Nombre: ${player.name}</p>
        <p>Posición: ${player.position || 'No disponible'}</p>
        <p>Fecha de Nacimiento: ${player.dateOfBirth || 'No disponible'}</p>
        <p>Nacionalidad: ${player.nationality || 'No disponible'}</p>
        <p>Número de Camiseta: ${player.jerseyNumber || 'No disponible'}</p>
        <p>Valor de Mercado: ${player.marketValue || 'No disponible'}</p>
        <p>Última Actualización: ${player.lastUpdated || 'No disponible'}</p>
    `;
    return playerCard;
}

// Función para buscar y mostrar jugadores
const fetchAndDisplayPlayers = async (playerId) => {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${API_URL}/${playerId}`, {
            headers: {
                'X-Auth-Token': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al buscar jugador');
        }

        const player = await response.json();
        
        const playersContainer = document.getElementById('playersContainer');
        playersContainer.innerHTML = '';

        if (player) {
            const playerCard = createPlayerCard(player);
            playersContainer.appendChild(playerCard);
        } else {
            playersContainer.innerHTML = '<p>No se encontró el jugador</p>';
        }
    } catch (error) {
        console.error('Error al buscar jugador:', error);
        const playersContainer = document.getElementById('playersContainer');
        playersContainer.innerHTML = '<p>Error al buscar jugador</p>';
    }
}

// Event listener para el formulario de búsqueda
document.getElementById('searchPlayerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const playerId = document.getElementById('playerId').value.trim();
    if (playerId) {
        fetchAndDisplayPlayers(playerId);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeGame(data.jugadores);
            populateJugadorDropdown(data.jugadores);
        });
});

function initializeGame(players) {
    const gameContainer = document.getElementById('memory-game');
    const quarterPlayers = players.slice(0, Math.ceil(players.length / 4) + 7);
    const cards = [...quarterPlayers, ...quarterPlayers];

    shuffle(cards);

    cards.forEach(player => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = player.nombre + ' ' + player.apellido;

        cardElement.innerHTML = `
            <div class="front-face">${player.numero}</div>
            <div class="back-face">
                <div class="player-name">${player.nombre} ${player.apellido}</div>
                <img src="${player.img}" alt="${player.nombre} ${player.apellido}">
            </div>
        `;

        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        

        firstCard.querySelector('img').classList.add('jello-vertical');
        secondCard.querySelector('img').classList.add('jello-vertical');

        setTimeout(() => {
            firstCard.querySelector('img').classList.remove('jello-vertical');
            secondCard.querySelector('img').classList.remove('jello-vertical');
        }, 900); 

        matchedPairs++;
        if (matchedPairs === quarterPlayers.length) {
            setTimeout(() => {
                showCelebration();
                Swal.fire({
                    title: '¡Juego Completado!',
                    text: "¿Quieres reiniciar el juego?",
                    showCancelButton: true,
                    confirmButtonText: 'Sí, reiniciar',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetGame();
                    }
                });
            }, 500);
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
        gameContainer.innerHTML = '';
        matchedPairs = 0;
        initializeGame(players);
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    
    function showCelebration() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#75aadb']
        });
    }
}

function populateJugadorDropdown(players) {
    const seleccionarJugador = document.getElementById('seleccionarJugador');
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = `${player.nombre} ${player.apellido}`;
        option.textContent = `${player.nombre} ${player.apellido}`;
        seleccionarJugador.appendChild(option);
    });

    seleccionarJugador.addEventListener('change', () => {
        const selectedPlayer = players.find(player => `${player.nombre} ${player.apellido}` === seleccionarJugador.value);
        displayPlayerDetails(selectedPlayer);
    });
}

function displayPlayerDetails(player) {
    const jugadorCard = document.getElementById('jugadorCard');
    if (player) {
        jugadorCard.innerHTML = `
        <h3>${player.nombre} ${player.apellido}</h3>
        <p>Edad: ${player.edad} años</p>
        <p>Posición: ${player.posición}</p>
        <p>Número: ${player.numero}</p>
        <img src="${player.img}" alt="${player.nombre} ${player.apellido}">
    `;
        jugadorCard.style.display = 'block';

        const jugadorImg = jugadorCard.querySelector('img');
        jugadorImg.style.background = 'rgb(27, 27, 37)';
        jugadorImg.style.borderRadius = '15px';
        jugadorImg.style.border = '1px solid #ffffff46';
        jugadorImg.style.margin = '10px';
    } else {
        jugadorCard.style.display = 'none';
    }
}
