// ========================
// 1. Pesan Selamat Datang & Judul
// ========================
function pesanSelamatDatang() {
    console.log("Selamat datang di Perpustakaan Aisyah!");
}

function ubahJudul() {
    document.querySelector("h1").innerHTML = "Jangan Lupa Untuk Kembali Lagi!";
}

// ========================
// 2. Cuaca dengan OpenWeatherMap
// ========================
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
        if (data.cod !== 200) throw new Error(data.message);

        document.getElementById('weather-result').innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>${data.weather[0].description}</p>
            <p>Temperatur: ${data.main.temp}°C</p>
            <p>Kelembaban: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

// ========================
// 3. Daftar Buku
// ========================
const books = [
    { title: "Laut Bercerita", author: "Leila S. Chudori", image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786024246945_Laut-Bercerita.png", description: "Novel yang menceritakan kisah aktivis yang hilang di era Orde Baru." },
    { title: "Bumi", author: "Tere Liye", image: "https://upload.wikimedia.org/wikipedia/id/d/dc/Bumi_Tere_Liye.jpg", description: "Petualangan Raib, Seli, dan Ali di dunia paralel yang penuh keajaiban." },
    { title: "Dilan 1990", author: "Pidi Baiq", image: "https://upload.wikimedia.org/wikipedia/id/8/82/Dilan_1990_sampul.jpg", description: "Kisah romantis remaja Bandung antara Dilan dan Milea." },
    { title: "Laskar Pelangi", author: "Andrea Hirata", image: "images/laskar-pelangi.jpg", description: "Novel inspiratif tentang perjuangan anak-anak Belitung." }
];

// ========================
// 4. Tampilkan Buku & Pencarian
// ========================
function displayBooks(filter = "") {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        if (book.title.toLowerCase().includes(filter.toLowerCase())) {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            bookDiv.innerHTML = `
                <img src="${book.image}" alt="${book.title}" onclick="openModal(${index})">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            `;

            bookList.appendChild(bookDiv);
        }
    });
}

// ========================
// 5. Modal Detail Buku
// ========================
function openModal(index) {
    const book = books[index];
    document.getElementById("modal-title").textContent = book.title;
    document.getElementById("modal-image").src = book.image;
    document.getElementById("modal-author").textContent = "Penulis: " + book.author;
    document.getElementById("modal-description").textContent = book.description;
    document.getElementById("book-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("book-modal").style.display = "none";
}

// ========================
// 6. Komentar Pengguna
// ========================
function addComment() {
    var commentInput = document.getElementById("comment-input");
    var commentText = commentInput.value;

    if (commentText.trim() !== "") {
        var commentList = document.getElementById("comment-list");
        var newComment = document.createElement("div");
        newComment.textContent = commentText;
        newComment.style.border = "1px solid #ccc";
        newComment.style.padding = "10px";
        newComment.style.marginTop = "5px";
        newComment.style.borderRadius = "4px";

        commentList.appendChild(newComment);
        commentInput.value = "";
    } else {
        alert("Komentar tidak boleh kosong!");
    }
}

// ========================
// 7. Dark Mode Toggle
// ========================
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const searchInput = document.getElementById("search");
    const body = document.body;

    // Cek dark mode sebelumnya
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });
    }

    // Aktifkan pencarian
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            displayBooks(this.value);
        });
    }

    // Tampilkan buku awal
    displayBooks();
});
