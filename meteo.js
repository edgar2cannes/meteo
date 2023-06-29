// // Récupération de la configuration de la ville depuis le fichier conf.json
// fetch('conf.json')
//     .then(response => response.json())
//     .then(data => {
//         const city = data.city;
//         const apiKey = 'b03950496db8897ad2e864c060d14593'; // Remplace avec ta clé API OpenWeatherMap

//         // Appel à l'API pour récupérer les données météorologiques
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
//             .then(response => response.json())
//             .then(data => {
//                 // Récupération des données météorologiques
//                 const tempC = data.main.temp;
//                 const feelsLike = data.main.feels_like;
//                 const condition = data.weather[0].description;
//                 const humidity = data.main.humidity;
//                 const icon = data.weather[0].icon;

//                 console.log(data)

//                 // Affichage des données météorologiques dans l'élément HTML approprié
//                 const weatherInfoDiv = document.getElementById('weather-info');
//                 weatherInfoDiv.innerHTML = `
//                     <h2>${city}</h2>
//                     <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
//                     <p>Temperature: ${tempC}°C</p>
//                     <p>Condition: ${condition}</p>
//                     <p>Humidity: ${humidity}%</p>
//                     <p>Feels Like: ${feelsLike}°C</p>
                    
//                 `;
//             })
//             .catch(error => {
//                 console.log('Error fetching weather data:', error);
//             });
//     })
//     .catch(error => {
//         console.log('Error fetching city configuration:', error);
//     });




// Fonction pour enregistrer la configuration de la ville dans le fichier conf.json
function saveCityConfiguration(city) {
    const config = { city: city };
    const configData = JSON.stringify(config);
  
    // Appel à l'API pour enregistrer la configuration de la ville dans le fichier conf.json
    fetch('conf.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: configData
    })
      .then(() => {
        console.log('City configuration saved successfully.');
        fetchWeatherData(city); // Appel à la fonction pour récupérer les données météorologiques
      })
      .catch(error => {
        console.log('Error saving city configuration:', error);
      });
  }
  
  // Fonction pour récupérer les données météorologiques de la ville spécifiée
  function fetchWeatherData(city) {
    const apiKey = 'b03950496db8897ad2e864c060d14593'; // Remplace avec ta clé API OpenWeatherMap
  
    // Appel à l'API pour récupérer les données météorologiques
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Récupération des données météorologiques
        const tempC = data.main.temp;
        const feelsLike = data.main.feels_like;
        const condition = data.weather[0].description;
        const humidity = data.main.humidity;
        const icon = data.weather[0].icon;
  
        console.log(data);
  
        // Affichage des données météorologiques dans l'élément HTML approprié
        const weatherInfoDiv = document.getElementById('weather-info');
        weatherInfoDiv.innerHTML = `
          <h2>${city}</h2>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
          <p>Temperature: ${tempC}°C</p>
          <p>Condition: ${condition}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Feels Like: ${feelsLike}°C</p>
        `;
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
      });
  }
  
  // Vérifie si la ville est déjà configurée dans le fichier conf.json
  fetch('conf.json')
    .then(response => response.json())
    .then(data => {
      const city = data.city;
      if (city) {
        fetchWeatherData(city); // Appel à la fonction pour récupérer les données météorologiques
      } else {
        const cityInput = prompt('Veuillez entrer une ville:');
        if (cityInput) {
          saveCityConfiguration(cityInput);
        }
      }
  
      // Met à jour les données météorologiques toutes les heures
      setInterval(() => {
        fetchWeatherData(city);
      }, 3600000); // 3600000 millisecondes = 1 heure
    })
    .catch(error => {
      console.log('Error fetching city configuration:', error);
    });
  