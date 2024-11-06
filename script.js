const apiUrl = "https://api.thedogapi.com/v1/";
const apiKey = "TheDogAPI";

const breedListElement = document.getElementById("breed-list");
const breedInfoElement = document.getElementById("breed-info");

document.addEventListener("DOMContentLoaded", function() {
    if (breedListElement) {
        fetchBreeds();
    }

    if (breedInfoElement) {
        const breedId = new URLSearchParams(window.location.search).get("id");
        fetchBreedDetails(breedId);
    }
});

// Fetch the list of dog breeds
async function fetchBreeds() {
    try {
        const response = await fetch(`${apiUrl}breeds?api_key=${apiKey}`);
        const breeds = await response.json();

        breeds.forEach(breed => {
            const breedDiv = document.createElement("div");
            breedDiv.classList.add("breed");

            const breedLink = document.createElement("a");
            breedLink.href = `breed.html?id=${breed.id}`;
            breedLink.innerHTML = `<img src="${breed.image.url}" alt="${breed.name}"><p>${breed.name}</p>`;
            breedDiv.appendChild(breedLink);

            breedListElement.appendChild(breedDiv);
        });
    } catch (error) {
        console.error("Error fetching breeds:", error);
    }
}

// Fetch details about a specific breed
async function fetchBreedDetails(breedId) {
    try {
        const response = await fetch(`${apiUrl}breeds/${breedId}?api_key=${apiKey}`);
        const breed = await response.json();

        breedInfoElement.innerHTML = `
            <h2>${breed.name}</h2>
            <img src="${breed.image.url}" alt="${breed.name}">
            <p><strong>Breed Group:</strong> ${breed.breed_group}</p>
            <p><strong>Life Span:</strong> ${breed.life_span}</p>
            <p><strong>Temperament:</strong> ${breed.temperament}</p>
        `;
    } catch (error) {
        console.error("Error fetching breed details:", error);
    }
}
