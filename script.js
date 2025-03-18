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
    cursor.style.width = "10px";
    cursor.style.height = "10px";
    cursor.style.backgroundColor = "pink";
    cursor.style.position = "absolute";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "1000";
    cursor.style.transition = "transform 0.1s ease-out";
    document.body.appendChild(cursor);
    
    document.addEventListener("mousemove", function(e) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener("click", function(e) {
        const signature = document.createElement("span");
        signature.textContent = "✍";
        signature.style.position = "absolute";
        signature.style.left = `${e.clientX}px`;
        signature.style.top = `${e.clientY}px`;
        signature.style.fontSize = "20px";
        signature.style.color = "pink";
        signature.style.pointerEvents = "none";
        document.body.appendChild(signature);

        setTimeout(() => {
            signature.remove();
        }, 1000);
    });
});
