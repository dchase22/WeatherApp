window.onload = function() {
    const searchInput = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function() {
        let city = searchInput.value;
        let APIKey = '8f5ec20da4b84b8a999234645240309'
        let accessKey = '-xByj5OXARIzmlHcL6wg469QQOeR4E9IVOhXWtnaerU'
        let ReqURL = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`
        searchInput.value = '';
        let ReqURL2 = `http://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${accessKey}`
        let imgLink;
        fetch (ReqURL2)
            .then(response => {
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Converts the response body into usable JSON data
            })
            .then (data => {
                imgLink = data.results[0].urls.raw
            })

        fetch(ReqURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(data => {
                document.querySelector('.card').style.backgroundImage = `url("${imgLink}")`
                document.getElementById('location').textContent = data.location.name
                document.getElementById('overall').textContent = data.current.condition.text
                document.getElementById('templabel').style.display = 'block'
                document.getElementById('temp').textContent = data.current.temp_f + "F°"
                document.getElementById('temp').style.display = 'block'
                document.getElementById('feelslabel').style.display = 'block'
                document.getElementById('feels').textContent = data.current.feelslike_f + "F°"
                document.getElementById('feels').style.display = 'block'
                document.getElementById('windlabel').style.display = 'block'
                document.getElementById('wind').textContent = data.current.gust_mph + " mph"
                document.getElementById('wind').style.display = 'block'

                // Check if the image element already exists
                let img = document.getElementById('weather-image');

                if (!img) {
                    // If the image doesn't exist, create it
                    img = document.createElement('img');
                    img.id = 'weather-image'; // Add an ID to the image
                    document.body.appendChild(img); // Append the image to the body (or any other container)
                }

                // Update the image source based on the condition
                if (data.current.condition.text === "Clear" || data.current.condition.text === "Sunny"){
                    img.src = "images/sunny-weather-1-16.png";
                }
                else if (data.current.condition.text === "Partly Cloudy"){
                    img.src = "images/cloudy-weather-16.png";
                }
                else if (data.current.condition.text === "rain"){
                    img.src = "images/light-rain-weather-16.png";
                }
                else if (data.current.condition.text === "snow"){  // Use '===' for comparison
                    img.src = "images/snow-weather-16.png";
                }
                else {
                    img.src = "images/sunny-weather-1-16.png";
                }
                img.width = 100;
                img.height = 100;


                document.getElementById('img-container').appendChild(img);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

    });


};

