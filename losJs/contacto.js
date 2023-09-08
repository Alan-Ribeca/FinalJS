document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
  
    if (nombre === '') {
      alert("Nombre y apelido incompleto")
      return;
    }
  
    if (!/^\d{7,}$/.test(telefono)) {
      alert("El número ingresado es inválido, debe contener solo dígitos y tener más de 7 dígitos")
      return;
    }
    
  
    console.log({
      nombre: nombre,
      email: email,
      telefono: telefono
    });

    document.querySelector(".form").reset();
});
  

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
  document.querySelector(".form").classList.toggle("dark")

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("modoOscuro", "true");
  } else {
    localStorage.setItem("modoOscuro", "false");
  }
})