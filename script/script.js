async function allPost() {
  const link = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await link.json();
  dataContainer(data["posts"]);
}

const dataContainer = (posts) => {
  const userContainer = document.getElementById("user-container");
  posts.forEach((post) => {
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
      id
    } = post;
    const card = document.createElement("div");
    card.className = "bg-gray-200 w-[48.25rem] rounded-2xl p-8 flex gap-8";
    card.innerHTML = `
        <div class="bg-gray-200 w-[48.25rem] rounded-2xl p-8 flex gap-8">
            <div class="relative">
              <div class="w-[72px] h-[72px] bg-white rounded-3xl">
              <img class="h-full w-full rounded-3xl" src=${image}>
              </div>
              <div class="w-4 h-4 ${isActive ? "bg-emerald-500" : "bg-red-500"} rounded-full absolute top-0 right-0"></div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-8 text-finely font-bold">
                <p>#${category}</p>
                <p>Author : ${name}</p>
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
                  <button onclick="btnClick()" class="bg-btn-primary w-8 h-8 rounded-full"><i class="fa-solid fa-message text-white"></i></button>
                </div>
              </div>
            </div>
          </div>
        `;
    userContainer.append(card);
  });
};

let counts = 0;
const btnClick = async () => {
  counts++;
  const titleContainer = document.getElementById("title-container");
  const count = document.getElementById("count");
  count.innerText = counts;

  titleContainer.innerHTML = '';

  const link = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await link.json();
  const titleContent = data["posts"];

  titleContent.map((item) => {
    const card = document.createElement("div");
    card.className = "flex p-4 bg-white rounded-xl";
    card.innerHTML = `
    <h2 class="text-text-primary font-black text-lg">10 Kids Unaware of Their Halloween Costume</h2>
    <p class="text-text-primary font-black text-lg">icon</p>
    `;

    titleContainer.append(card)
  });
};

allPost();
