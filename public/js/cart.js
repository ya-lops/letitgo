document.addEventListener("alpine:init", () => {
  Alpine.store("cart"), Alpine.store("count");
});

function letitgo() {
  items = JSON.parse(sessionStorage.shoppingCart || "[]");
  count = JSON.parse(sessionStorage.shoppingCartCount || 0);
  Alpine.store("cart", items);
  Alpine.store("count", count);
  const orderDialog = document.getElementById("orderDialog");
  orderList = '';

  return {
    product() {
      return {
        inCart: false,
        buyBtnTitle: "В корзину",

        init() {
          Alpine.store("cart", items);
          const product = {};
          product.code = this.$el.dataset.code;

          if (Alpine.store("cart").some((e) => e.code === product.code)) {
            this.inCart = true;
          }
        },
      };
    },

    updateStorage() {
      sessionStorage.setItem("shoppingCart", JSON.stringify(items));
      sessionStorage.setItem("shoppingCartCount", count);
      Alpine.store("cart", items);
      Alpine.store("count", count);
    },

    clearStorage() {
      sessionStorage.setItem("shoppingCart", []);
      sessionStorage.setItem("shoppingCartCount", 0);
      Alpine.store("cart", []);
      Alpine.store("shoppingCartCount", 0);
    },

    toCart() {
      const product = {};
      product.url = this.$el.dataset.url;
      product.code = this.$el.dataset.code;
      product.name = this.$el.dataset.name;
      product.price = this.$el.dataset.price;
      product.image = this.$el.dataset.image;

      if (!Alpine.store("cart").some((e) => e.code === product.code)) {
        this.inCart = true;
        items.push(product);
        count = ++count;
        this.updateStorage();
      }
    },

    removeFromCart(product) {
      items = Alpine.store("cart").filter((e) => e.code !== product.code);
      count = Alpine.store("count") - 1;
      this.updateStorage();
      this.products = items;
    },

    clearCart() {
      this.products = [];
      this.clearStorage();
    },

    getCartCount() {
      return Alpine.store("count") > 0 ? Alpine.store("count") : "";
    },

    getTotalPrice() {
      return this.products.reduce((total, cur) => total + Number(cur.price), 0);
    },

    openOrderDialog() {
      orderDialog.showModal();
      cartList = '';
      
      for (const item of JSON.parse(sessionStorage.shoppingCart)) {
        cartList += ` - *${item.name}* (${item.code}, ${item.price}р.)\n`;
      }

      this.orderList = cartList;
    },

    // getOrderList() {
    //   return orderListTotalPrice = this.getTotalPrice;
    // },

    submitOrder() {
      console.log("submit clicked");
      this.orderSubmiting = true;

      emailjs.sendForm("service_72h0drh", "template_61e5xwp", this.$el).then(
        () => {
          console.log("SUCCESS!");
          this.closeOrderDialog();
          this.clearCart();
        },
        (error) => {
          console.log("FAILED...", error);
        },
      );
    },

    closeOrderDialog() {
      orderDialog.close();
      this.clearInputs();
    },

    clearInputs() {
      document.querySelectorAll("input").forEach((input) => (input.value = ""));
      document
        .querySelectorAll("textarea")
        .forEach((textarea) => (textarea.value = ""));
    },
  };
}
