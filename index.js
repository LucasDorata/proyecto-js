const containerProducts = document.getElementById("container-products");
const containerFavoritesProducts = document.getElementById("container-favorites-products");

const obtenerProductosFavoritos = (productos) => {
  return productos.filter(p => p.cart === true);
};

const actualizarProductosDOM = (productos) => {
  containerProducts.innerHTML = "";
  containerFavoritesProducts.innerHTML = "";

  productos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add('card');
    div.innerHTML = `
      <img class='img-card' src="${p.image}" alt="${p.title}">
      <h3 class="txt-card">${p.title}</h3>
      <p class="txt-card">Precio: $${p.price}</p>
      <p class="txt-card">Categoría: ${p.category}</p>
      <button class='btn-card' data-id='${p.id}' data-cart='${p.cart}'>${p.cart ? "Sacar del carrito" : "Agregar al carrito"}</button>
    `;
    containerProducts.appendChild(div);

    if (p.cart) {
      const divFavorito = document.createElement("div");
      divFavorito.classList.add('card');
      divFavorito.innerHTML = `
        <img class='img-card' src="${p.image}" alt="${p.title}">
        <h3 class="txt-card">${p.title}</h3>
        <p class="txt-card">Precio: $${p.price}</p>
        <p class="txt-card">Categoría: ${p.category}</p>
        <button class='btn-card' data-id='${p.id}' data-cart='${p.cart}'>Sacar del carrito</button>
      `;
      containerFavoritesProducts.appendChild(divFavorito);
    };
  });

  const botonesCart = document.querySelectorAll('.btn-card');
  botonesCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = parseFloat(e.target.getAttribute('data-id'));
      const cart = e.target.getAttribute('data-cart') === "true";
      const index = productos.findIndex(p => p.id === id);
      productos[index].cart = !cart;

      actualizarProductosDOM(productos);
      guardarProductosEnLocalStorage(productos);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cambios guardados',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  guardarProductosEnLocalStorage(productos);
};

const guardarProductosEnLocalStorage = (productos) => {
  const productosJSON = JSON.stringify(productos);
  localStorage.setItem("productos", productosJSON);
};

const cargarProductosDesdeLocalStorage = () => {
  const productosJSON = localStorage.getItem("productos");

  if (productosJSON) {
    const productos = JSON.parse(productosJSON);
    actualizarProductosDOM(productos);
  } else {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(resp => resp.json())
      .then(productos => {
        guardarProductosEnLocalStorage(productos);
        actualizarProductosDOM(productos);
      });
  };
};

cargarProductosDesdeLocalStorage();