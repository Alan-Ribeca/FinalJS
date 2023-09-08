const todosLosProductos = "https://dummyjson.com/products?limit=0";
let informacionNueva;

fetch(todosLosProductos)
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    informacionNueva = datos;
    fullProductos(informacionNueva.products);
  });



const fullProductos = (datos, orden) => {
  const datosFiltrados = datos.filter(
    (dato) =>
      dato.category !== "skincare" &&
      dato.category !== "groceries" &&
      dato.category !== "tops" &&
      dato.category !== "womens-dresses" &&
      dato.category !== "womens-shoes" &&
      dato.category !== "mens-shirts" &&
      dato.category !== "mens-shoes" &&
      dato.category !== "mens-watches" &&
      dato.category !== "womens-watches" &&
      dato.category !== "womens-bags" &&
      dato.category !== "womens-jewellery" &&
      dato.category !== "lighting"
  );

  datosFiltrados.sort((a, b) => {
    if (orden === 'asc') {
      return a.title.localeCompare(b.title);
    } else if (orden === 'desc') {
      return b.title.localeCompare(a.title);
    } else {
      return 0;
    }
  });

  const cards = datosFiltrados.reduce((acc, elementos) => {
    const descuento = (elementos.price * elementos.discountPercentage) / 100;
    const precioFinal = elementos.price - descuento;
    return (
      acc +
      `
    <div class="cards" id="producto-${elementos.id}">
    <div class="container-img">
         <img src= ${elementos.images[0]} alt=${elementos.title}>
    </div>
    <div class="info">
     <h2> 
        ${elementos.title}
     </h2>
        <p> ${elementos.category} </p>
        <p> ${elementos.description} </p>
        <div class="precios">
        <p class="original-price"> $${elementos.price} </p>
        <p> ${elementos.discountPercentage}%OFF
        </div>
        <p> $${precioFinal.toFixed(2)} </p>
     </div>
     <div class="botonComprar"> 
    <button class="comprar" id="buttonclick-${elementos.id
      }">Comprar ahora</button>
    </div>
    </div> 
    `
    );
  }, "");
  document.querySelector(".containerFullProductos").innerHTML = cards;

  // boton comprar
  document.querySelectorAll(".comprar").forEach((button, index) => {
    button.addEventListener("click", () => {
      const productoSeleccionado =
        JSON.parse(localStorage.getItem("productoSeleccionado")) || [];

      productoSeleccionado.push(datosFiltrados[index]);

      localStorage.setItem(
        "productoSeleccionado",
        JSON.stringify(productoSeleccionado)
      )
      window.location.href = "carrito.html";
    })
  })

  // ordenar alfabeticamente
  document.getElementById('orden').addEventListener('change', function() {
    var orden = this.value;
    fullProductos(informacionNueva.products, orden);
  });

};


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
  document.querySelector("#orden").classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    localStorage.setItem('modoOscuro', "true");
  } else {
    localStorage.setItem('modoOscuro', "false");
  }
})