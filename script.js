function pesanSelamatDatang() {
    console.log("Selamat datang di Perpustakaan Aisyah!");
}

function ubahJudul() {
    document.querySelector("h1").innerHTML = "Jangan Lupa Untuk Kembali Lagi!";
}
async function getWeather() {
    const apiKey = 'YOUR_API_KEY'; // Ganti dengan API Key OpenWeatherMap
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Masukkan nama kota terlebih dahulu");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) {
            throw new Error(data.message);
        }
        document.getElementById('weather-result').innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>${data.weather[0].description}</p>
            <p>Temperatur: ${data.main.temp}°C</p>
            <p>Kelembaban: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
}

#search-input {
    width: 50%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

#book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.book-item {
    background: white;
    border-radius: 10px;
    padding: 15px;
    width: 200px;
    text-align: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.book-item img {
    width: 100px;
    height: 150px;
    border-radius: 5px;
}
