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
document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.createElement("div");
    cursor.style.width = "15px";
    cursor.style.height = "15px";
    cursor.style.backgroundColor = "rgba(255, 105, 180, 0.8)";
    cursor.style.position = "absolute";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "1000";
    cursor.style.transition = "transform 0.1s ease-out, background-color 0.3s ease";
    cursor.style.boxShadow = "0 0 10px rgba(255, 105, 180, 0.8)";
    document.body.appendChild(cursor);
    
    document.addEventListener("mousemove", function(e) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener("mouseenter", function() {
        cursor.style.backgroundColor = "rgba(255, 20, 147, 1)";
    });

    document.addEventListener("mouseleave", function() {
        cursor.style.backgroundColor = "rgba(255, 105, 180, 0.8)";
    });
});
