window.onload = function() {
    console.log(import.meta.env);
    const apiKey = import.meta.env.VITE_API_KEY;
    const searchInput = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const weatherCard = document.querySelector('.card');
    const locationElement = document.getElementById('location');
    const overallElement = document.getElementById('overall');
    const tempLabel = document.getElementById('templabel');
    const tempElement = document.getElementById('temp');
    const feelsLabel = document.getElementById('feelslabel');
    const feelsElement = document.getElementById('feels');
    const windLabel = document.getElementById('windlabel');
    const windElement = document.getElementById('wind');
    const imgContainer = document.getElementById('img-container');

    searchButton.addEventListener('click', function() {
        const city = searchInput.value.trim();
        searchInput.value = '';

        if (!city) return; // Prevent API calls for empty input

        const APIKey = apiKey;
        const accessKey = '-xByj5OXARIzmlHcL6wg469QQOeR4E9IVOhXWtnaerU';
        const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;
        const imageURL = `http://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${accessKey}`;

        // Fetch image data
        fetch(imageURL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const imgLink = data.results[0]?.urls.raw; // Optional chaining for safety
                if (imgLink) {
                    weatherCard.style.backgroundImage = `url("${imgLink}")`;
                }
            })
            .catch(error => console.error('Error fetching image:', error));

        // Fetch weather data
        fetch(weatherURL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                locationElement.textContent = data.location.name;
                overallElement.textContent = data.current.condition.text;

                // Update temperature and feels-like values
                updateWeatherInfo(data);

                // Update the weather image
                updateWeatherImage(data.current.condition.text);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });

    function updateWeatherInfo(data) {
        tempLabel.style.display = 'block';
        tempElement.textContent = `${data.current.temp_f} F°`;
        tempElement.style.display = 'block';

        feelsLabel.style.display = 'block';
        feelsElement.textContent = `${data.current.feelslike_f} F°`;
        feelsElement.style.display = 'block';

        windLabel.style.display = 'block';
        windElement.textContent = `${data.current.gust_mph} mph`;
        windElement.style.display = 'block';
    }

    function updateWeatherImage(conditionText) {
        let img = document.getElementById('weather-image');

        if (!img) {
            img = document.createElement('img');
            img.id = 'weather-image';
            imgContainer.appendChild(img);
        }

        const conditionMap = {
            "Clear": "images/sunny-weather-1-16.png",
            "Sunny": "images/sunny-weather-1-16.png",
            "Partly Cloudy": "images/cloudy-weather-16.png",
            "rain": "images/light-rain-weather-16.png",
            "snow": "images/snow-weather-16.png"
        };

        img.src = conditionMap[conditionText] || "images/sunny-weather-1-16.png"; // Fallback to default image
        img.width = 100;
        img.height = 100;
    }
};