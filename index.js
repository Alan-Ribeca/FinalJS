const url = `https://dummyjson.com/products?limit=15`;

fetch(url)
  .then((respuesta) => respuesta.json())
  .then((informacion) => {
    cardsAHtml(informacion.products);
  });

const cardsAHtml = (data) => {
  const cardsDescuento = data.reduce((acc, element) => {
    const descuento = (element.price * element.discountPercentage) / 100;
    const precioFinal = element.price - descuento;
    return (
      acc +
      `
          <div class="cards" id="producto-${element.id}">
              <div class="container-img">
                   <img src= ${element.images[0]} alt=${element.title}>
              </div>
              <div class="info">
               <h2> 
                  ${element.title}
               </h2>
                  <p> ${element.category} </p>
                  <p> ${element.description} </p>
                  <div class="precios">
                  <p class="original-price"> $${element.price} </p>
                  <p> ${element.discountPercentage}%OFF
                  </div>
                  <p> $${precioFinal.toFixed(2)} </p>
               </div>
              <button class="comprar">Comprar ahora</button>
          </div> 
          `
    );
  }, "");

  document.querySelector(".cardsOfertas").innerHTML = cardsDescuento;

  document.querySelectorAll(".comprar").forEach((button, index) => {
    button.addEventListener("click", () => {
      let productoSeleccionado = JSON.parse(localStorage.getItem("productoSeleccionado")) || [];

      productoSeleccionado.push(data[index]);

      localStorage.setItem("productoSeleccionado", JSON.stringify(productoSeleccionado));
      window.location.href = "pages/carrito.html";
    });
  });
};


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
        <div class="eventos">
          <button class="eliminar">Eliminar</button>
          <button class="comprarYa">Comprar ahora</button>
        </div>
          <div class="precios">
            <p class="original-price"> $${product.price} </p>
            <p> ${product.discountPercentage}%OFF
          </div>
            <p> $${precioFinal.toFixed(2)} </p>
            <p class="description"> ${product.description} </p>
     </div>
    </div> 
    `;
  });

  return cardsACarrito;
}


const botonModoOscuro = document.querySelector("#color_mode");


if (localStorage.getItem('modoOscuro') === 'true') {
  document.body.classList.add("dark");
  document.querySelector(".search__button").classList.add("dark");
  document.querySelector(".categoria-productos").classList.add("dark");
  botonModoOscuro.checked = true;
}

botonModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".search__button").classList.toggle("dark");
  document.querySelector(".categoria-productos").classList.toggle("dark");


  if (document.body.classList.contains("dark")) {
    localStorage.setItem("modoOscuro", "true");
  } else {
    localStorage.setItem("modoOscuro", "false");
  }
});
