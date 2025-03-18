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
// Daftar novel
const books = [
    { title: "Laut Bercerita", author: "Leila S. Chudori", image: "laut-bercerita.jpg" },
    { title: "Bumi", author: "Tere Liye", image: "bumi.jpg" },
    { title: "Dilan 1990", author: "Pidi Baiq", image: "dilan-1990.jpg" },
    { title: "Hujan", author: "Tere Liye", image: "hujan.jpg" },
    { title: "Ayah", author: "Andrea Hirata", image: "ayah.jpg" },
    { title: "Pulang", author: "Tere Liye", image: "pulang.jpg" }
];

// Fungsi untuk menampilkan daftar novel
function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Kosongkan daftar sebelum menambahkan elemen baru

    books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;

        bookList.appendChild(bookItem);
    });
}

// Fungsi untuk mencari novel
function searchBooks() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));

    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Kosongkan daftar sebelum menampilkan hasil pencarian

    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;

        bookList.appendChild(bookItem);
    });
}

// Panggil fungsi untuk menampilkan novel saat halaman dimuat
window.onload = displayBooks;
