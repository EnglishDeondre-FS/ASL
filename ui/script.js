document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:8080'; // Replace with your API URL
  
    // --- Utility Functions ---
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return response.json();
    };
  
    const postData = async (url, data, contentType = 'application/json') => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': contentType,
        },
        body: contentType === 'application/json' ? JSON.stringify(data) : data,
      });
      if (!response.ok) {
        throw new Error(`Failed to post data to ${url}`);
      }
      return response.json();
    };
  
    // --- Galaxy Elements ---
    const galaxyListElement = document.getElementById('galaxies');
    const galaxyDetailsElement = document.getElementById('galaxy-info');
    const createGalaxyForm = document.getElementById('create-galaxy-form');
    const galaxyImageUploadForm = document.getElementById(
      'galaxy-image-upload-form',
    );
    const galaxyImageInput = document.getElementById('galaxy-image-input');
  
    // --- Star Elements ---
    const starListElement = document.getElementById('stars');
    const starDetailsElement = document.getElementById('star-info');
    const createStarForm = document.getElementById('create-star-form');
    const starImageUploadForm = document.getElementById('star-image-upload-form');
    const starImageInput = document.getElementById('star-image-input');
  
    // --- Planet Elements ---
    const planetListElement = document.getElementById('planets');
    const planetDetailsElement = document.getElementById('planet-info');
    const createPlanetForm = document.getElementById('create-planet-form');
    const planetImageUploadForm = document.getElementById(
      'planet-image-upload-form',
    );
    const planetImageInput = document.getElementById('planet-image-input');
  
    let currentGalaxyId = null;
    let currentStarId = null;
    let currentPlanetId = null;
  
    // --- Galaxy Functions ---
    const fetchGalaxies = async () => fetchData(`${API_BASE_URL}/galaxies`);
    const fetchGalaxy = async (id) => fetchData(`${API_BASE_URL}/galaxies/${id}`);
    const createGalaxy = async (galaxyData) =>
      postData(`${API_BASE_URL}/galaxies`, galaxyData);
    const uploadGalaxyImage = async (galaxyId, formData) =>
      postData(`${API_BASE_URL}/galaxies/${galaxyId}/image`, formData, false);
  
    const displayGalaxyDetails = (galaxy) => {
      galaxyDetailsElement.innerHTML = `
        <h3>${galaxy.Name}</h3>
        <p>ID: ${galaxy.id}</p>
        ${
          galaxy.imageUrl
            ? `<img src="${galaxy.imageUrl}" alt="Galaxy Image">`
            : '<p>No image available</p>'
        }
      `;
      currentGalaxyId = galaxy.id;
    };
  
    const populateGalaxyList = (galaxies) => {
      galaxyListElement.innerHTML = '';
      galaxies.forEach((galaxy) => {
        const listItem = document.createElement('li');
        listItem.textContent = galaxy.Name;
        listItem.addEventListener('click', () => {
          fetchGalaxy(galaxy.id)
            .then(displayGalaxyDetails)
            .catch((error) => {
              console.error('Error fetching galaxy details:', error);
              alert('Failed to fetch galaxy details.');
            });
        });
        galaxyListElement.appendChild(listItem);
      });
    };
  
    // --- Star Functions ---
    const fetchStars = async () => fetchData(`${API_BASE_URL}/stars`);
    const fetchStar = async (id) => fetchData(`${API_BASE_URL}/stars/${id}`);
    const createStar = async (starData) =>
      postData(`${API_BASE_URL}/stars`, starData);
    const uploadStarImage = async (starId, formData) =>
      postData(`${API_BASE_URL}/stars/${starId}/image`, formData, false);
  
    const displayStarDetails = (star) => {
      starDetailsElement.innerHTML = `
        <h3>${star.Name}</h3>
        <p>ID: ${star.id}</p>
        ${
          star.imageUrl
            ? `<img src="${star.imageUrl}" alt="Star Image">`
            : '<p>No image available</p>'
        }
      `;
      currentStarId = star.id;
    };
  
    const populateStarList = (stars) => {
      starListElement.innerHTML = '';
      stars.forEach((star) => {
        const listItem = document.createElement('li');
        listItem.textContent = star.Name;
        listItem.addEventListener('click', () => {
          fetchStar(star.id)
            .then(displayStarDetails)
            .catch((error) => {
              console.error('Error fetching star details:', error);
              alert('Failed to fetch star details.');
            });
        });
        starListElement.appendChild(listItem);
      });
    };
  
    // --- Planet Functions ---
    const fetchPlanets = async () => fetchData(`${API_BASE_URL}/planets`);
    const fetchPlanet = async (id) => fetchData(`${API_BASE_URL}/planets/${id}`);
    const createPlanet = async (planetData) =>
      postData(`${API_BASE_URL}/planets`, planetData);
    const uploadPlanetImage = async (planetId, formData) =>
      postData(`${API_BASE_URL}/planets/${planetId}/image`, formData, false);
  
    const displayPlanetDetails = (planet) => {
      planetDetailsElement.innerHTML = `
        <h3>${planet.Name}</h3>
        <p>ID: ${planet.id}</p>
        ${
          planet.imageUrl
            ? `<img src="${planet.imageUrl}" alt="Planet Image">`
            : '<p>No image available</p>'
        }
      `;
      currentPlanetId = planet.id;
    };
  
    const populatePlanetList = (planets) => {
      planetListElement.innerHTML = '';
      planets.forEach((planet) => {
        const listItem = document.createElement('li');
        listItem.textContent = planet.Name;
        listItem.addEventListener('click', () => {
          fetchPlanet(planet.id)
            .then(displayPlanetDetails)
            .catch((error) => {
              console.error('Error fetching planet details:', error);
              alert('Failed to fetch planet details.');
            });
        });
        planetListElement.appendChild(listItem);
      });
    };
  
    // --- Initial Data Load ---
    fetchGalaxies()
      .then(populateGalaxyList)
      .catch((error) => {
        console.error('Error fetching initial galaxy list:', error);
        alert('Failed to fetch galaxies.');
      });
  
    fetchStars()
      .then(populateStarList)
      .catch((error) => {
        console.error('Error fetching initial star list:', error);
        alert('Failed to fetch stars.');
      });
  
    fetchPlanets()
      .then(populatePlanetList)
      .catch((error) => {
        console.error('Error fetching initial planet list:', error);
        alert('Failed to fetch planets.');
      });
  
    // --- Galaxy Event Listeners ---
    createGalaxyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const galaxyName = document.getElementById('galaxy-name').value;
      createGalaxy({ Name: galaxyName })
        .then(() => fetchGalaxies())
        .then(populateGalaxyList)
        .then(() => {
          document.getElementById('galaxy-name').value = '';
        })
        .catch((error) => {
          console.error('Error creating galaxy:', error);
          alert('Failed to create galaxy.');
        });
    });
  
    galaxyImageUploadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!currentGalaxyId) {
        alert('Please select a galaxy first.');
        return;
      }
  
      const imageFile = galaxyImageInput.files[0];
      if (!imageFile) {
        alert('Please select an image file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', imageFile);
  
      uploadGalaxyImage(currentGalaxyId, formData)
        .then(() => fetchGalaxy(currentGalaxyId))
        .then(displayGalaxyDetails)
        .catch((error) => {
          console.error('Error uploading galaxy image:', error);
          alert('Failed to upload galaxy image.');
        });
    });
  
    // --- Star Event Listeners ---
    createStarForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const starName = document.getElementById('star-name').value;
      createStar({ Name: starName })
        .then(() => fetchStars())
        .then(populateStarList)
        .then(() => {
          document.getElementById('star-name').value = '';
        })
        .catch((error) => {
          console.error('Error creating star:', error);
          alert('Failed to create star.');
        });
    });
  
    starImageUploadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!currentStarId) {
        alert('Please select a star first.');
        return;
      }
  
      const imageFile = starImageInput.files[0];
      if (!imageFile) {
        alert('Please select an image file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', imageFile);
  
      uploadStarImage(currentStarId, formData)
        .then(() => fetchStar(currentStarId))
        .then(displayStarDetails)
        .catch((error) => {
          console.error('Error uploading star image:', error);
          alert('Failed to upload star image.');
        });
    });
  
    // --- Planet Event Listeners ---
    createPlanetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const planetName = document.getElementById('planet-name').value;
      createPlanet({ Name: planetName })
        .then(() => fetchPlanets())
        .then(populatePlanetList)
        .then(() => {
          document.getElementById('planet-name').value = '';
        })
        .catch((error) => {
          console.error('Error creating planet:', error);
          alert('Failed to create planet.');
        });
    });
  
    planetImageUploadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!currentPlanetId) {
        alert('Please select a planet first.');
        return;
      }
  
      const imageFile = planetImageInput.files[0];
      if (!imageFile) {
        alert('Please select an image file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', imageFile);
  
      uploadPlanetImage(currentPlanetId, formData)
        .then(() => fetchPlanet(currentPlanetId))
        .then(displayPlanetDetails)
        .catch((error) => {
          console.error('Error uploading planet image:', error);
          alert('Failed to upload planet image.');
        });
    });
  });
  