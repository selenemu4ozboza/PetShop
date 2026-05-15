const productos = [
    {
        id: 1,
        title: "Pienso Premium Adulto 15kg",
        category: "perros",
        price: 45.99,
        rating: 5,
        badge: "top",
        image: "https://tse2.mm.bing.net/th/id/OIP.Hbschrsm5N9A0p-PhCNFCwHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 2,
        title: "Rascador Árbol Gigante",
        category: "gatos",
        price: 20.99,
        rating: 4,
        badge: "",
        image: "https://img.aosomcdn.com/100/product/2025/01/23/EUn1f8194931e6eb5.jpg"
    },
    {
        id: 3,
        title: "Acuario Cristal 60L",
        category: "peces",
        price: 120.00,
        rating: 5,
        badge: "nuevo",
        image: "https://cdn.netzshopping.de/productimages/2/Y/2/B096B5V2Y2.jpg"
    },
    {
        id: 4,
        title: "Jaula Espaciosa Premium",
        category: "aves",
        price: 55.00,
        rating: 4,
        badge: "oferta",
        image: "https://img.aosomcdn.com/100/product/2022/01/13/jjy4d817e513bc808.jpg"
    },
    {
        id: 5,
        title: "Juguete Cuerda Resistente",
        category: "perros",
        price: 12.99,
        rating: 4,
        badge: "",
        image: "https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dweae3ff87/images/tootoy_Juguete_cuerda_para_perros_TOO42042_M.jpg?sw=780&sh=780&sm=fit&q=85"
    },
    {
        id: 6,
        title: "Arena Aglomerante 10L",
        category: "gatos",
        price: 18.50,
        rating: 5,
        badge: "top",
        image: "https://tse2.mm.bing.net/th/id/OIP.2tADDjz_lFE67ix0RQCd7AHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 7,
        title: "Filtro Cascada Silencioso",
        category: "peces",
        price: 34.20,
        rating: 4,
        badge: "",
        image: "https://cdn.netzshopping.de/productimages/V/X/H/B0DNQCDHXV.jpg"
    },
    {
        id: 8,
        title: "Comida Mixta Loros 2kg",
        category: "aves",
        price: 15.75,
        rating: 5,
        badge: "",
        image: "https://tse1.mm.bing.net/th/id/OIP.8sP-LgUUwGK1vkfnaL7w6gHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

let carrito = [];
let categoriaActual = "all";
let ordenActual = "default";
let usuarioLogueado = true;
let nombreUsuario = "Selene";

let productsGrid = document.getElementById("productsGrid");
let filterBtns = document.querySelectorAll(".filter-btn");
let cartCount = document.getElementById("cartCount");
let cartItemsContainer = document.getElementById("cartItems");
let cartSubtotal = document.getElementById("cartSubtotal");
let cartShipping = document.getElementById("cartShipping");
let cartTotal = document.getElementById("cartTotal");

document.addEventListener("DOMContentLoaded", function () {
    let nombreEl = document.getElementById("userName");
    if (usuarioLogueado) {
        nombreEl.textContent = "Hola, " + nombreUsuario;
    }

    mostrarProductos();

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            cambiarCategoria(btn.dataset.category);
        });
    });

    let sortSelect = document.getElementById("sortSelect");
    sortSelect.addEventListener("change", function () {
        ordenActual = sortSelect.value;
        mostrarProductos();
    });

    let btnCarrito = document.getElementById("cartIconBtn");
    let modalCarrito = document.getElementById("cartModalOverlay");
    let btnCerrar = document.getElementById("closeCartBtn");

    btnCarrito.addEventListener("click", function () {
        modalCarrito.classList.add("active");
    });

    btnCerrar.addEventListener("click", function () {
        modalCarrito.classList.remove("active");
    });

    modalCarrito.addEventListener("click", function (e) {
        if (e.target === modalCarrito) {
            modalCarrito.classList.remove("active");
        }
    });

    let menuBtn = document.getElementById("mobileMenuBtn");
    let nav = document.getElementById("navMenu");
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});

function mostrarProductos() {
    productsGrid.innerHTML = "";

    let lista = [];
    for (let i = 0; i < productos.length; i++) {
        if (categoriaActual === "all" || productos[i].category === categoriaActual) {
            lista.push(productos[i]);
        }
    }

    if (ordenActual === "price-asc") {
        lista.sort(function (a, b) {
            return a.price - b.price;
        });
    } else {
        lista.sort(function (a, b) {
            return a.id - b.id;
        });
    }

    if (lista.length === 0) {
        productsGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No se encontraron productos.</p>";
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let producto = lista[i];
        let card = document.createElement("div");
        card.className = "product-card";

        let badgeHTML = "";
        if (producto.badge === "nuevo") {
            badgeHTML = "<span class='product-badge badge-nuevo'>Nuevo</span>";
        } else if (producto.badge === "oferta") {
            badgeHTML = "<span class='product-badge badge-oferta'>Oferta</span>";
        } else if (producto.badge === "top") {
            badgeHTML = "<span class='product-badge badge-top'>Top Ventas</span>";
        }

        let estrellas = "";
        for (let j = 0; j < 5; j++) {
            if (j < producto.rating) {
                estrellas += "<i class='ph-fill ph-star'></i>";
            } else {
                estrellas += "<i class='ph ph-star'></i>";
            }
        }

        card.innerHTML = badgeHTML +
            "<img src='" + producto.image + "' alt='" + producto.title + "' class='product-img'>" +
            "<span class='product-category'>" + producto.category + "</span>" +
            "<h3 class='product-title'>" + producto.title + "</h3>" +
            "<div class='product-rating'>" + estrellas + "</div>" +
            "<div class='product-footer'>" +
            "<span class='product-price'>" + producto.price.toFixed(2) + "€</span>" +
            "<button class='add-to-cart-btn' onclick='addToCart(" + producto.id + ")' aria-label='Añadir al carrito'>" +
            "<i class='ph ph-plus'></i>" +
            "</button>" +
            "</div>";

        productsGrid.appendChild(card);
    }
}

function cambiarCategoria(categoria) {
    categoriaActual = categoria;

    filterBtns.forEach(function (btn) {
        btn.classList.remove("active");
        if (btn.dataset.category === categoria) {
            btn.classList.add("active");
        }
    });

    mostrarProductos();
}

function filterCategory(categoria) {
    document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
    cambiarCategoria(categoria);
}

function addToCart(id) {
    let producto = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            producto = productos[i];
        }
    }

    if (producto === null) return;

    carrito.push(producto);
    actualizarCarrito();

    let btnCarrito = document.getElementById("cartIconBtn");
    btnCarrito.style.transform = "scale(1.3)";
    setTimeout(function () {
        btnCarrito.style.transform = "scale(1)";
    }, 200);
}

function removeFromCart(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    cartCount.textContent = carrito.length;
    cartItemsContainer.innerHTML = "";

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        for (let i = 0; i < carrito.length; i++) {
            let item = carrito[i];
            let div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML =
                "<img src='" + item.image + "' alt='" + item.title + "'>" +
                "<div class='cart-item-info'>" +
                "<div class='cart-item-title'>" + item.title + "</div>" +
                "<div class='cart-item-price'>" + item.price.toFixed(2) + "€</div>" +
                "</div>" +
                "<i class='ph ph-trash remove-item' onclick='removeFromCart(" + i + ")'></i>";
            cartItemsContainer.appendChild(div);
        }
    }

    calcularTotal();
}

function calcularTotal() {
    let subtotal = 0;
    for (let i = 0; i < carrito.length; i++) {
        subtotal += carrito[i].price;
    }

    let envio = 0;
    if (subtotal > 0 && subtotal < 30) {
        envio = 5.99;
    }

    let total = subtotal + envio;

    cartSubtotal.textContent = subtotal.toFixed(2) + "€";

    if (subtotal === 0) {
        cartShipping.textContent = "0.00€";
    } else if (envio === 0) {
        cartShipping.textContent = "Gratis";
    } else {
        cartShipping.textContent = envio.toFixed(2) + "€";
    }

    cartTotal.textContent = total.toFixed(2) + "€";
}