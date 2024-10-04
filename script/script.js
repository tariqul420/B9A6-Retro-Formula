const search = () => {
  const searchValue = document.getElementById("searchValue").value.trim();

  if (searchValue) {
    allPost(searchValue);
  } else {
    alert("Please provide a valid search input");
  }

  document.getElementById("searchValue").value = "";
};

async function allPost(category) {
  const link = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ""}`);
  const data = await link.json();
  dataContainer(data["posts"], category);
}

const dataContainer = (posts, category) => {
  const userContainer = document.getElementById("user-container");

  userContainer.innerHTML = "";

  const filteredPosts = category ? posts.filter((post) => post.category.toLowerCase().includes(category.toLowerCase())) : posts;

  if (filteredPosts.length === 0) {
    const noDataCard = document.createElement("div");
    noDataCard.className = "bg-gray-200 w-[48.25rem] rounded-2xl p-8 flex justify-center items-center";
    noDataCard.innerHTML = `<h2 class="text-text-primary font-bold text-xl">No data found</h2>`;
    userContainer.append(noDataCard);
    return;
  }

  filteredPosts.forEach((post) => {
    const {
      category,
      author: { name },
      title,
      description,
      comment_count,
      view_count,
      posted_time,
      image,
      isActive,
      id,
    } = post;

    const card = document.createElement("div");
    card.className = "bg-gray-200 w-[48.25rem] rounded-2xl p-8 flex gap-8";
    card.innerHTML = `
      <div class="relative">
        <div class="w-[72px] h-[72px] bg-white rounded-3xl">
          <img class="h-full w-full rounded-3xl" src=${image}>
        </div>
        <div class="w-4 h-4 ${isActive ? "bg-emerald-500" : "bg-red-500"} rounded-full absolute top-0 right-0"></div>
      </div>
      <div class="space-y-4">
        <div class="flex items-center gap-8 text-finely font-bold">
          <p>#${category}</p>
          <p>Author: ${name}</p>
        </div>
        <h2 class="text-text-primary font-bold text-xl">${title}</h2>
        <p class="text-text-secondary font-semibold">${description}</p>
        <div class="border-t border-dashed border-text-primary"></div>
        <div class="flex items-center justify-between gap-8">
          <div class="flex items-center gap-8">
            <p class="text-text-finely font-black"><i class="fa-solid fa-message"></i> ${comment_count}</p>
            <p class="text-text-finely font-black"><i class="fa-solid fa-eye"></i> ${view_count}</p>
            <p class="text-text-finely font-black"><i class="fa-solid fa-clock"></i> ${posted_time}</p>
          </div>
          <div>
            <button onclick="btnClick(${id})" class="bg-btn-primary w-8 h-8 rounded-full"><i class="fa-solid fa-message text-white"></i></button>
          </div>
        </div>
      </div>
    `;
    userContainer.append(card);
  });
};

let counts = 0;
const btnClick = async (postId) => {
  counts++;
  const titleContainer = document.getElementById("title-container");
  const count = document.getElementById("count");
  count.innerText = counts;

  const link = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await link.json();
  const titleContent = data["posts"];

  titleContent.forEach((post) => {
    if (post.id === postId) {
      const card = document.createElement("div");
      card.className = "flex p-4 bg-white rounded-xl";
      card.innerHTML = `
        <h2 class="text-text-primary font-black text-lg">${post.title}</h2>
        <p class="text-text-primary font-black text-lg flex justify-center items-center gap-4"><i class="fa-solid fa-eye"></i> ${post.view_count}</p>
      `;
      titleContainer.append(card);
    }
  });
};

allPost();
