document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-container");
  let cartTotal = document.getElementById("cart-total");

  console.log("Cart data loaded:", cart); // Debugging log

  function displayCartItems() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.innerText = "0";
      return;
    }

    cart.forEach((item, index) => {
      let div = document.createElement("div");
      div.classList.add("col-md-4", "mb-3");

      div.innerHTML = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Price: ₹ ${item.price}</p>
                        <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;

      cartContainer.appendChild(div);
      total += Number(item.price);
    });

    cartTotal.innerText = total;
  }

  displayCartItems();

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      let index = event.target.dataset.index;
      cart.splice(index, 1);
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
