const productoSeleccionado = JSON.parse(
    localStorage.getItem("productoSeleccionado")
);

const tarjetaCarrito = document.querySelector(".cardsCarrito");

function mostrarCarritoVacio() {
    tarjetaCarrito.innerHTML = `
    <div class="containerVacio">
      <h2 class="titleVacio"> Su carrito esta vacio... </h2>
      <div class="enlaceYBoton">
        <a href="productos.html">
          <button class="IrAProductos">Ir a productos</button>
        </a>
      </div>
    </div>
  `;
}


function generarTarjetasProductos() {
    let cardsACarrito = "";
    productoSeleccionado.forEach((product) => {
        const descuento = (product.price * product.discountPercentage) / 100;
        const precioFinal = product.price - descuento;

        cardsACarrito += `
      <div class="cardsCarro" id="producto-${product.id}">
        <div class="container-imgCarro">
          <img src= ${product.images[0]} alt=${product.title}>
        </div>
        <div class="infoCarro">
            <h2> 
              ${product.title}
            </h2>
            <div class="precios">
            <p class="original-price"> $${product.price} </p>
            <p> ${product.discountPercentage}%OFF
            </div>
            <p> $${precioFinal.toFixed(2)} </p>
            <p class="description"> ${product.description} </p>
            <div class="eventos">
              <button class="eliminar">Eliminar</button>
              <button class="comprarYa">Comprar ahora</button>
            </div>
       </div>
      </div> 
      `;
    });

    return cardsACarrito;
}

function generarResumenCarrito() {
    let totalProductos = 0;
    let precioTotal = 0;

    productoSeleccionado.forEach((product) => {
        const descuento = (product.price * product.discountPercentage) / 100;
        const precioFinal = product.price - descuento;
        totalProductos += 1;
        precioTotal += precioFinal;
    });

    const resumenCarrito = `
      <div class="contenedorResumen">
          <h2 class="resumen">
              Resumen de compra
          </h2>
        <div class="infoResumen">
          <p> Total productos: (${totalProductos})</p>
          <p> Precio total: $${precioTotal.toFixed(2)}
          <button class="eliminarTodo">Vaciar carrito</button>
        </di>
          <div class="botonResumen">
            <button class="Finalizar-compra">Finalizar compra</button>
            <a href="productos.html">
            <button class="verMas">Agregar mas Productos</button>
            </a>
          </div>
      </div>
    `;

    return resumenCarrito;
}

function agregarEventosBotones() {
    // eliminar todo
    document.querySelector(".eliminarTodo").addEventListener("click", () => {
        localStorage.removeItem("productoSeleccionado");
        mostrarCarritoVacio();
    });

    // eliminar de a una tarjeta
    document.querySelectorAll(".eliminar").forEach((button, index) => {
        button.addEventListener("click", () => {
            let data = JSON.parse(localStorage.getItem("productoSeleccionado"));

            data.splice(index, 1);

            localStorage.setItem("productoSeleccionado", JSON.stringify(data));

            location.reload();
        });
    });

    // comprar todo
    document.querySelector(".Finalizar-compra").addEventListener("click", () => {
        localStorage.removeItem("productoSeleccionado");
        Toastify({
            text: "Compra exitosa",
            className: "info",
            grabity: "top",
            position: "center",
            style: { background: "linear-gradient(to right, #228b22, #32cd32)" },
        }).showToast();

        setTimeout(() => {
            location.reload();
        }, 1000);
    });

    // comprar un solo producto
    document.querySelectorAll(".comprarYa").forEach((button, index) => {
        button.addEventListener("click", () => {
            Toastify({
                text: "Compra exitosa",
                className: "info",
                grabity: "top",
                position: "center",
                style: { background: "linear-gradient(to right, #228b22, #32cd32)" },
            }).showToast();

            let data = JSON.parse(localStorage.getItem("productoSeleccionado"));
            data.splice(index, 1);
            localStorage.setItem("productoSeleccionado", JSON.stringify(data));

            setTimeout(() => {
                location.reload();
            }, 1000);
        });
    });
}

// verificar si el carrito tiene tarjetas o esta vacio 
if (!productoSeleccionado || productoSeleccionado.length === 0) {
    mostrarCarritoVacio();
} else {
    tarjetaCarrito.innerHTML = generarTarjetasProductos();
    tarjetaCarrito.innerHTML += generarResumenCarrito();
    agregarEventosBotones();
}

// activar modo oscuro

const botonModoOscuro = document.querySelector("#color_mode")

if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark");
  document.querySelector(".search__button").classList.add("dark");
  botonModoOscuro.checked = true;
}

botonModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".search__button").classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    localStorage.setItem('modoOscuro', "true");
  } else {
    localStorage.setItem('modoOscuro', "false");
  }
})