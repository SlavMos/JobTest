const gridEl = document.getElementById("grid");
const searchEl = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filters__btn");

let activeCategory = "all";
let query = "";

// Рендер карточек
function render() {
  gridEl.innerHTML = "";

  const filtered = COURSES.filter((course) => {
    const matchCat =
      activeCategory === "all" || course.category === activeCategory;
    const matchQuery = course.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    gridEl.innerHTML = `<p class="empty">No courses found</p>`;
    return;
  }

  filtered.forEach((course) => {
    const normalized = course.category
      .toLowerCase()
      .replace(/[\s&–—\/]+/g, "-"); // пробелы, &, тире и слеш → "-"

    gridEl.innerHTML += `
      <div class="card">
        <img src="${course.avatar}" alt="${course.title}" class="card__avatar">
        <span class="label label--${normalized}">${course.category}</span>
        <h3 class="card__title">${course.title}</h3>
        <div>        
        <span class="card__price">${course.price}</span>
        <span class="card__author">${course.author}</span>
        </div
      </div>
    `;
  });
}
// Считаем количество курсов в каждой категории
function updateCategoryCounts() {
  const counts = {};

  // Считаем по массиву COURSES
  COURSES.forEach((course) => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });
  // Обновляем текст на кнопках
  filterBtns.forEach((btn) => {
    const category = btn.dataset.category;
    if (category === "all") {
      btn.textContent = `All ${COURSES.length}`;
    } else {
      btn.textContent = `${category} ${counts[category] || 0}`;
    }
  });
}
// Смена категории
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("filters__btn--active"));
    btn.classList.add("filters__btn--active");

    activeCategory = btn.dataset.category;
    render();
  });
});

// Поиск
searchEl.addEventListener("input", (e) => {
  query = e.target.value;
  render();
});

// Первый рендер
render();
updateCategoryCounts();
