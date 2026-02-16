let allProducts = []; // store all products globally

const loadPost = () => {
    const url = "https://fakestoreapi.com/products";

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allProducts = data; // store all products
            displayPost(data);
        });
};

const displayPost = (posts) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // show only first 8 posts
    posts.slice(0, 8).forEach((post) => {
        const postCard = document.createElement("div");

        postCard.innerHTML = `
            <div class="bg-base-100 rounded-2xl shadow-md overflow-hidden">

                <!-- Image -->
                <div class="bg-gray-100 p-10 flex justify-center">
                    <img src="${post.image}" 
                         alt="${post.title}" 
                         class="h-64 object-contain">
                </div>

                <!-- Body -->
                <div class="p-6 space-y-3">

                    <!-- Top row -->
                    <div class="flex justify-between items-center">
                        <span class="badge badge-primary badge-outline capitalize">
                            ${post.category}
                        </span>

                        <div class="flex items-center gap-1 text-yellow-500">
                          <i class="fa-solid fa-star"></i> ${post.rating.rate}
                            <span class="text-gray-500 text-sm">
                                (${post.rating.count})
                            </span>
                        </div>
                    </div>

                    <!-- Title -->
                    <h2 class="text-lg font-semibold line-clamp-2">
                        ${post.title}
                    </h2>

                    <!-- Price -->
                    <p class="text-2xl font-bold">
                        $${post.price}
                    </p>

                    <!-- Buttons -->
                    <div class="flex gap-4 pt-2">
                        <button class="btn btn-outline flex-1 details-btn">
                           <i class="fa-regular fa-eye"></i> Details
                        </button>
                        <button class="btn btn-primary flex-1">
                           <i class="fa-solid fa-cart-shopping"></i> Add
                        </button>
                    </div>

                </div>
            </div>
        `;

        cardContainer.appendChild(postCard);

        // Modal event (kept same)
        const detailsButton = postCard.querySelector(".details-btn");
        detailsButton.addEventListener("click", () => showModal(post));
    });
};


// ============================
    // CATEGORY FILTER 
// ============================

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("category-btn")) {

        // remove active from all
        document.querySelectorAll(".category-btn")
            .forEach(btn => btn.classList.remove("active"));

        // add active to clicked
        e.target.classList.add("active");

        const category = e.target.dataset.category;

        if (category === "all") {
            displayPost(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product =>
                product.category === category
            );
            displayPost(filteredProducts);
        }
    }
});


// ============================
    // MODAL 
// ============================

const showModal = (post) => {
    document.getElementById("modal-image").src = post.image;
    document.getElementById("modal-image").alt = post.title;
    document.getElementById("modal-title").textContent = post.title;
    document.getElementById("modal-category").textContent = post.category;
    document.getElementById("modal-description").textContent = post.description;
    document.getElementById("modal-price").textContent = `$${post.price}`;
    document.getElementById("modal-rate").textContent = post.rating.rate;
    document.getElementById("modal-count").textContent = `(${post.rating.count})`;

    document.getElementById("product-modal").classList.remove("hidden");
};

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("product-modal").classList.add("hidden");
});

document.getElementById("product-modal").addEventListener("click", (e) => {
    if (e.target.id === "product-modal") {
        document.getElementById("product-modal").classList.add("hidden");
    }
});

loadPost();
