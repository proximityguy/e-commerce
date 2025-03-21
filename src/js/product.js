const productContainer = document.querySelector(".product-container");
const PlaceholderCard = document.querySelector(".placeholder-card");

for (let i = 0; i < 8; i++) {
  productContainer.appendChild(PlaceholderCard.cloneNode(true));
}

document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = "https://fakestoreapi.com/products";

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error fetching data:", error);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  const products = await fetchData(apiUrl);
  productContainer.innerHTML = "";
  createObject(products);
  // //////////////////////////////////////

  // products.forEach((ele) => console.log(ele.category));
  // for all
  document.getElementById("allProducts").addEventListener("click", function () {
    productContainer.innerHTML = "";
    document.querySelectorAll(".btn.active-tab").forEach((button) => {
      button.classList.remove("active-tab");
    });

    this.classList.add("active-tab");
    createObject(products);
  });

  // for men's clothing
  document.getElementById("menClothing").addEventListener("click", function () {
    productContainer.innerHTML = "";
    document.querySelectorAll(".btn.active-tab").forEach((button) => {
      button.classList.remove("active-tab");
    });

    this.classList.add("active-tab");
    createObject(products.filter((obj) => obj.category === "men's clothing"));
  });

  // for women's clothing
  document
    .getElementById("womenClothing")
    .addEventListener("click", function () {
      productContainer.innerHTML = "";
      document.querySelectorAll(".btn.active-tab").forEach((button) => {
        button.classList.remove("active-tab");
      });

      this.classList.add("active-tab");
      createObject(
        products.filter((obj) => obj.category === "women's clothing")
      );
    });

  // for jewellery
  document.getElementById("jewellery").addEventListener("click", function () {
    productContainer.innerHTML = "";
    document.querySelectorAll(".btn.active-tab").forEach((button) => {
      button.classList.remove("active-tab");
    });

    this.classList.add("active-tab");
    createObject(products.filter((obj) => obj.category === "jewelery"));
    // here spelling of 'jewllery' is misspelt in the API i.e., 'jewelery'
  });

  // for electronic items
  document.getElementById("electronics").addEventListener("click", function () {
    productContainer.innerHTML = "";
    document.querySelectorAll(".btn.active-tab").forEach((button) => {
      button.classList.remove("active-tab");
    });

    this.classList.add("active-tab");
    createObject(products.filter((obj) => obj.category === "electronics"));
  });
  // //////////////////////////////////////
  function createObject(products) {
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add(
        "card",
        "mx-2",
        "my-2",
        "d-flex",
        "justify-content-around",
        "align-items-center"
      );

      card.innerHTML = `
      <img src="${product.image}" 
       class="card-img-top my-2 object-fit-cover" alt="product-img">
  
              <div class="d-flex flex-column card-body align-items-center justify-content-around p-0 w-100 mx-1" 
              title="${product.title}\n${product.description}">
  
                  <h5 class="card-title mx-1 my-2">
                  ${product.title.slice(0, 27)}...</h5>
                  <p class="card-text mx-1 my-2">
                  ${product.description.slice(0, 27)}...</p>
  
                  <p class="card-text border-1 border-bottom border-dark-subtle border-top text-center w-100 mx-0 my-1 px-1 py-3">
                  ₹ ${Math.round(product.price * 10)} 
                      <span class="mx-2 original-price">
                      ₹ ${Math.round(product.price * 15)}</span>
                  </p>
  
                  <div class="product-btn-group">
                      <button class="btn bg-black text-white details">Details</button>

                      <button class="btn bg-black text-white add-cart"
                      data-id ="${product.id}" 
                      data-name = "${product.title}" 
                      data-price = "${product.price}"  
                      data-image = "${product.image}" 
                      >Add to Cart</button>
                  </div>
              </div>
      `;
      productContainer.appendChild(card);
    });

    document.querySelectorAll(".add-cart").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // to prevent the immediate navigation

        if (this.innerHTML === "Go to Cart") {
          window.location.href = "/src/html/cart.html";
          return;
        }

        let qty = 0;
        let productData = {
          id: this.dataset.id,
          name: this.dataset.name,
          price: this.dataset.price,
          image: this.dataset.image,
          qty: 1,
        };

        addToCart(productData);
        this.innerHTML = "Go to Cart";
      });
    });
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find((item) => item.id === product.id);
    if (!existingProduct) {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // run this direct in the console to check that onclick the it is storing the data into localStorage or not
    // console.log("updated cart: ", localStorage.getItem("cart"));
  }
});
