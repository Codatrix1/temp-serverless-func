const result = document.querySelector(".result");

const fetchProducts = async () => {
  try {
    // const { data } = await axios.get("/api/3-airtable");
    const { data } = await axios.get("/api/3-z-complete");

    const products = data
      .map((product) => {
        const { id, image, name, price } = product;
        return `<a href="product.html?id=${id}" class="product">
        <img src="${image}" alt="${name}"/>
        <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price / 100}</h5>
        </div>
        </a>`;
      })
      .join("");
    result.innerHTML = products;
  } catch (error) {
    result.innerHTML = "<h4>There was an error...</h4>";
  }
};

fetchProducts();
