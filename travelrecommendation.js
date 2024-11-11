let searchBtn = document.getElementById("searchbtn");
let clearBtn = document.getElementById("clearbtn");
let resultContainer = document.getElementById("resultContainer");
let dropdown = document.getElementById("dropdown");
let closeBtn = document.getElementById("close-btn");
let searchInput = document.getElementById("searchinput");

// Clear search input and hide results
const clearSearch = () => {
  searchInput.value = "";
  dropdown.style.display = "none";
  console.log("Clearing");
};

clearBtn.addEventListener("click", clearSearch);

// Display search result
const showResult = (name, img, info) => {
  dropdown.style.display = "block";
  resultContainer.innerHTML = `
    <h2 class="title">${name}</h2>
    <img class="search-img" src="${img}" alt="${name}">
    <p class="description">${info}</p>
  `;
};

// Hide dropdown and clear input
const closeDropdown = () => {
  dropdown.style.display = "none";
  searchInput.value = "";
};

closeBtn.addEventListener("click", closeDropdown);

// Display error when no results found
const showSearchError = () => {
  dropdown.style.display = "block";
  resultContainer.innerHTML = `<p class="notfound">Sorry, we can't find your search</p>`;
};

// Fetch data and search functionality
const fetchDataAndInitializeSearch = async () => {
  try {
    const response = await fetch("travelrecommendation.json");
    const data = await response.json();

    const search = () => {
      const searchQuery = searchInput.value.trim().toLowerCase();
      if (!searchQuery) return; // Exit if search input is empty

      let notFound = true;

      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          console.log("${city.name}");
          if (city.name.toLowerCase().includes(searchQuery)) {
            showResult(city.name, city.imageUrl, city.description);
            notFound = false;
          }
        });
      });

      data.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(searchQuery)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          notFound = false;
        }
      });

      data.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(searchQuery)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          notFound = false;
        }
      });

      if (notFound) {
        showSearchError();
      }
    };

    searchBtn.addEventListener("click", search);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Initialize fetch and search setup
fetchDataAndInitializeSearch();
