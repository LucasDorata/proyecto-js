const containerProducts = document.getElementById("container-products");
const containerFavoritesProducts = document.getElementById("container-favorites-products");

let productos = [
  { nombre: "Teclado", img: "https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_1280.jpg", Precio: 7000, cart: false, Marca: "Redragon", id: Math.random() },
  { nombre: "Parlantes", img: "https://cdn.pixabay.com/photo/2018/10/14/22/07/speakers-3747617_1280.jpg", Precio: 12000, cart: false, Marca: "Genius", id: Math.random() },
  { nombre: "Monitor", img: "https://i.blogs.es/ad1894/gaming/1024_2000.jpg", Precio: 140000, cart: false, Marca: "Samsung", id: Math.random() },
];

const obtenerProductosFavoritos = (productos) => {
  return productos.filter(p => p.cart === true);
}

const actualizarProductosDOM = () => {
  containerProducts.innerHTML = "";
  containerFavoritesProducts.innerHTML = "";

  productos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add('card');
    div.innerHTML = `
    <img class='img-card' src="${p.img}" alt="${p.nombre}">
      <h3 class="txt-card">${p.nombre}</h3>
      <p class="txt-card">Precio: $${p.Precio}</p>
      <p class="txt-card">Marca: ${p.Marca}</p>
      <button class='btn-card' data-id='${p.id}'>Agregar al carrito</button>
    `;
    containerProducts.appendChild(div);

    if (p.cart === true) {
      const divFavorito = document.createElement("div");
      divFavorito.classList.add('card');
      divFavorito.innerHTML = `
      <img class='img-card' src="${p.img}" alt="${p.nombre}">
        <h3 class="txt-card">${p.nombre}</h3>
        <p class="txt-card">Precio: $${p.Precio}</p>
        <p class="txt-card">Marca: ${p.Marca}</p>
        <button class='btn-card' data-id='${p.id}'>Sacar del carrito</button>
      `;
      containerFavoritesProducts.appendChild(divFavorito);
    }
  });

  const botonesCart = document.querySelectorAll('.btn-card');
  botonesCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = parseFloat(e.target.getAttribute('data-id'));
      const index = productos.findIndex(p => p.id === id);
      productos[index].cart = !productos[index].cart;
      actualizarProductosDOM();
      guardarProductosEnLocalStorage(productos);
    });
  });

  guardarProductosEnLocalStorage(productos);
};

const guardarProductosEnLocalStorage = (productos) => {
  const productosJSON = JSON.stringify(productos);
  localStorage.setItem("productos", productosJSON);
}

const cargarProductosDesdeLocalStorage = () => {
  const productosJSON = localStorage.getItem("productos");
  if (productosJSON === true) {
    productos = JSON.parse(productosJSON);
  }
}

cargarProductosDesdeLocalStorage();
actualizarProductosDOM();
