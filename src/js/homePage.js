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
       class="card-img-top object-fit-cover my-2" alt="product-img">
  
              <div class="card-body w-100 mx-1 p-0 d-flex flex-column justify-content-around align-items-center " 
              title="${product.title}\n${product.description}">
  
                  <h5 class="card-title my-2 mx-1">
                  ${product.title.slice(0, 27)}...</h5>
                  <p class="card-text my-2 mx-1">
                  ${product.description.slice(0, 27)}...</p>
  
                  <p class="card-text text-center border-top border-bottom border-1 border-dark-subtle w-100 my-1 mx-0 px-1 py-3">
                  ₹ ${Math.round(product.price * 10)} 
                  <span class="original-price mx-2">
                  ₹ ${Math.round(product.price * 15)}</span>
                  </p>
  
                  <div class="product-btn-group">
                      <button class="btn bg-black text-white details">Details</button>

                      <a class="btn bg-black text-white add-cart"
                      data-id ="${product.id}" 
                      data-name = "${product.title}" 
                      data-description = "${product.description}"
                      data-price = "${product.price}"  
                      data-image = "${product.image}" 
                      >Add to Cart</a>
                  </div>
              </div>
      `;
      productContainer.appendChild(card);
    });

    document.querySelectorAll(".add-cart").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault(); // to prevent immediate navigation

        if (this.innerHTML === "Go to Cart") {
          window.location.href = "/src/html/cart.html";
          return;
        }

        let productData = {
          id: this.dataset.id,
          name: this.dataset.name,
          description: this.dataset.description,
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
