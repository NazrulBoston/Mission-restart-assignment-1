const loadPost = () => {
    const url = "https://fakestoreapi.com/products";

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayPost(data);
        });
};

const displayPost = (posts) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // show only first 2 like screenshot
    posts.forEach((post) => {

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
                            ⭐ ${post.rating.rate}
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
                        <button class="btn btn-outline flex-1">
                            👁 Details
                        </button>
                        <button class="btn btn-primary flex-1">
                            🛒 Add
                        </button>
                    </div>

                </div>
            </div>
        `;

        cardContainer.appendChild(postCard);
    });
};

loadPost()

