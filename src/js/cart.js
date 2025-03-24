document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemContainer = document.getElementById("item-container");
  let displayRow = document.getElementById("display-row");
  let productContainer = document.getElementById("product");
  //   showEmptyCart() function begins here
  function showEmptyCart() {
    displayRow.classList.add("hidden");
    let emptyCart = document.createElement("div");
    emptyCart.classList.add(
      "d-flex",
      "row",
      "justify-content-center",
      "text-center"
    );
    emptyCart.innerHTML = `
                    <div class="col-10">
                        <div class="card">
                            <div class="d-flex flex-column card-body align-items-center justify-content-center">
                                <h2>your cart is empty</h2>
                                <a class="btn btn-primary w-lg-50" href="/src/html/product.html" role="button">
                                    <button type="button" class="btn btn-lg btn-primary">explore products to purchase</button>
                                </a>
                            </div>
                        </div>
                    </div>
  `;

    itemContainer.appendChild(emptyCart);
    return;
  }
  //   showEmptyCart() function ENDS here

  displayItem(); // onload the page atleast once display function should run

  function displayItem() {
    let totalPrice = 0;
    let totalCount = 0;
    const shipping = 30;

    // chekcing if cart is empty or not   //

    if (cart.length === 0) {
      showEmptyCart();
      return;
    } else {
      displayRow.classList.remove("hidden");
    }
    //   ---------------------------------- //
    // for displaying each product from the array of objects stored in the 'cart'
    cart.forEach((item) => {
      let itemPrice = Math.round(item.price * 10);
      let itemCount = item.qty;

      const productCard = document.createElement("div");
      productCard.classList.add(
        "d-flex",
        "flex-column",
        "flex-lg-row",
        "row",
        "align-items-md-center",
        "text-start",
        "mb-1",
        "border"
      );

      productCard.innerHTML = `
                    <div class="col-lg-3 d-flex justify-content-center my-md-2">
                        <img src="${item.image}" alt="product"
                            class="card-img-top mx-lg-2 my-2" style="width: 9rem; height: 11rem;">
                    </div>

                    <div class="col-lg-5 my-md-2">
                        <h3 class="fs-5 fw-bold name">
                            ${item.name.slice(0, 27)}...
                        </h3>
                        <p class="description fs-6 fw-medium">
                            ${item.description.slice(0, 27)}...
                        </p>
                    </div>

                    <div
                        class="col-lg-4 d-flex flex-lg-column flex-md-row justify-content-between my-md-2">
                                <p class="fs-4 my-2 price">₹ ${Math.round(
                                  item.price * 10
                                )}
                                     &ThickSpace;
                                        <span class="text-decoration-line-through text-secondary original-price">₹ ${Math.round(
                                          item.price * 15
                                        )}</span>
                                </p>

                                <div
                                class="d-flex align-items-center justify-content-center controls gap-1 my-2">
                                    <button class="btn decrease-btn fs-3 fw-bolder">-</button>
                                        <span class="fs-3 fw-bolder item-count">${
                                          item.qty
                                        }</span>
                                    <button class="btn fs-3 fw-bolder increase-btn">+</button>
                                </div>
                    </div>
                `;

      productContainer.appendChild(productCard);

      totalPrice += itemPrice;
      totalCount += itemCount;
    });
    // ------------------>  item display function ENDS here
    //  ------------------> order summary related operations starts here
    let finalPrice = totalPrice + shipping;
    const priceSummary = document.querySelector(".price-summary");
    priceSummary.innerHTML = `
                            <p>Products (${totalCount}): <span class="float-end">₹ ${totalPrice}</span></p>
                                <p>Shipping: <span class="float-end">₹ ${shipping}</span></p>
                                <hr>

                                <h5>Total Amount: <span class="float-end">₹ ${finalPrice}</span></h5>
                                
                                <button class="btn btn-dark w-100 mt-3">Go to Checkout</button>
                    `;
  }

  document.getElementById("clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    cart = [];
    displayItem();
  });
});
