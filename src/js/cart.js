document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-container");
  let cartTotal = document.getElementById("cart-total");
  let productCount = document.getElementById("product-count");
  let orderTotal = document.getElementById("order-total");
  let shippingCost = document.getElementById("shipping-cost");
  let finalTotal = document.getElementById("final-total");

  function displayCartItems() {
    cartContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;
    let shipping = 30;

    if (cart.length === 0) {
      cartContainer.innerHTML = `
                <div class="text-center">
                    <h2>Your cart is empty</h2>
                    <a href="/src/html/product.html" class="btn btn-primary">Explore Products</a>
                </div>`;
      cartTotal.innerText = "0";
      productCount.innerText = "0";
      orderTotal.innerText = "0";
      finalTotal.innerText = shipping;
      return;
    }

    cart.forEach((item, index) => {
      let productDiv = document.createElement("div");
      productDiv.classList.add("col-md-8", "mb-3");

      productDiv.innerHTML = `
                <div class="card">
                    <div class="card-body row align-items-center">
                        <div class="col-lg-3 text-center">
                            <img src="${
                              item.image
                            }" class="img-fluid" style="width: 9rem; height: auto;">
                        </div>
                        <div class="col-lg-5">
                            <h3 class="fw-bold">${item.name}</h3>
                            <p class="text-muted">${
                              item.description || "No description available."
                            }</p>
                        </div>
                        <div class="col-lg-4 d-flex flex-column align-items-end">
                            <p class="fs-5">₹ ${
                              item.price
                            } <span class="text-decoration-line-through text-secondary">₹ ${
        item.originalPrice || item.price * 1.5
      }</span></p>
                            <div class="d-flex gap-2 align-items-center">
                                <button class="btn decrease-btn fw-bolder fs-3" data-index="${index}">-</button>
                                <span class="item-count fs-4">${
                                  item.quantity || 1
                                }</span>
                                <button class="btn increase-btn fw-bolder fs-3" data-index="${index}">+</button>
                            </div>
                            <button class="btn btn-danger remove-item mt-2" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>`;

      cartContainer.appendChild(productDiv);
      total += item.price * (item.quantity || 1);
      itemCount += item.quantity || 1;
    });

    // Update Order Summary
    cartTotal.innerText = total;
    productCount.innerText = itemCount;
    orderTotal.innerText = total;
    finalTotal.innerText = total + shipping;
  }

  displayCartItems();

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      let index = event.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }

    if (event.target.classList.contains("increase-btn")) {
      let index = event.target.dataset.index;
      cart[index].quantity = (cart[index].quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }

    if (event.target.classList.contains("decrease-btn")) {
      let index = event.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1); // Remove item if quantity reaches zero
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }
  });

  document.getElementById("clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    cart = [];
    displayCartItems();
  });
});
