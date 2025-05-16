// ========================
// 1. Pesan Selamat Datang & Judul
// ========================
function pesanSelamatDatang() {
    console.log("Selamat datang di Perpustakaan Aisyah!");
}

function ubahJudul() {
    const h1 = document.querySelector("h1");
    if (h1) {
        h1.innerHTML = "Jangan Lupa Untuk Kembali Lagi!";
    }
}

// ========================
// 2. Cuaca dengan OpenWeatherMap
// ========================

const apiKey = 'YOUR_API_KEY'; // Ganti dengan API Key OpenWeatherMap asli

async function getWeather() {
    const cityInput = document.getElementById('city');
    if (!cityInput) {
        alert("Element input kota tidak ditemukan!");
        return;
    }
    const city = cityInput.value.trim();
    if (!city) {
        alert("Masukkan nama kota terlebih dahulu");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);

        const weatherResult = document.getElementById('weather-result');
        if (weatherResult) {
            weatherResult.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>${data.weather[0].description}</p>
                <p>Temperatur: ${data.main.temp}°C</p>
                <p>Kelembaban: ${data.main.humidity}%</p>
            `;
        }
    } catch (error) {
        const weatherResult = document.getElementById('weather-result');
        if (weatherResult) {
            weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
        }
    }
}

// ========================
// 3. Daftar Buku
// ========================
const books = [
    {
        title: "Laut Bercerita",
        author: "Leila S. Chudori",
        image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786024246945_Laut-Bercerita.png",
        description: "Novel yang menceritakan kisah aktivis yang hilang di era Orde Baru",
        pdf: "https://dn720001.ca.archive.org/0/items/laut-bercerita-leila-s.-chudori/Laut%20Bercerita%20%28Leila%20S.%20Chudori%29.pdf"
    },
    {
        title: "Bintang",
        author: "Tere Liye",
        image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2023/4/10/ccmq4kges6gstnsrrtxabw.jpg",
        description: "Petualangan Raib, Seli, dan Ali di dunia paralel yang penuh keajaiban.",
        pdf: "https://ia802203.us.archive.org/33/items/TereLiyeBintang/Tere%20Liye%20-%20Bintang.pdf"
    },
    {
        title: "Dilan 1990",
        author: "Pidi Baiq",
        image: "https://upload.wikimedia.org/wikipedia/id/thumb/6/66/Dilan_1990_cover.jpg/220px-Dilan_1990_cover.jpg", // Ganti dengan gambar valid dari Wikipedia
        description: "Kisah romantis remaja Bandung antara Dilan dan Milea.",
        pdf: "https://ia800904.us.archive.org/34/items/PidiBaiqDilan/Pidi%20Baiq%20-%20Dilan%201990.pdf" // Ganti URL pdf valid
    },
    {
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489732961i/1362193.jpg",
        description: "Novel inspiratif tentang perjuangan anak-anak Belitung.",
        pdf: "https://dn790002.ca.archive.org/0/items/AndreaHirataLaskarPelangi_201805/Andrea%20Hirata%20-%20Laskar%20Pelangi.pdf"
    }
];

// ========================
// 4. Tampilkan Buku & Pencarian
// ========================
function displayBooks(filter = "") {
    const bookList = document.getElementById("book-list");
    if (!bookList) return;

    bookList.innerHTML = "";

    books.forEach((book, index) => {
        if (book.title.toLowerCase().includes(filter.toLowerCase())) {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            let pdfButton = "";
            if (book.pdf) {
                pdfButton = `<a href="${book.pdf}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:5px;color:white;background-color:#007bff;padding:5px 10px;border-radius:5px;text-decoration:none;">Baca PDF</a>`;
            }

            bookDiv.innerHTML = `
                <img src="${book.image}" alt="${book.title}" style="cursor:pointer;" onclick="openModal(${index})">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                ${pdfButton}
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
    if (!book) return;

    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalAuthor = document.getElementById("modal-author");
    const modalDescription = document.getElementById("modal-description");
    const bookModal = document.getElementById("book-modal");

    if (modalTitle) modalTitle.textContent = book.title;
    if (modalImage) modalImage.src = book.image;
    if (modalAuthor) modalAuthor.textContent = "Penulis: " + book.author;
    if (modalDescription) modalDescription.textContent = book.description;
    if (bookModal) bookModal.style.display = "block";
}

function closeModal() {
    const bookModal = document.getElementById("book-modal");
    if (bookModal) bookModal.style.display = "none";
}

// ========================
// 6. Komentar Pengguna
// ========================
function addComment() {
    const commentInput = document.getElementById("comment-input");
    if (!commentInput) return;

    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        const commentList = document.getElementById("comment-list");
        if (!commentList) return;

        const newComment = document.createElement("div");
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

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            displayBooks(this.value);
        });
    }

    displayBooks();
});

// ========================
// Popup Beasiswa
// ========================
function tampilkanPopupBeasiswa() {
    const popup = document.getElementById("popup-beasiswa");
    if (popup) popup.style.display = "flex";
}

function tutupPopupBeasiswa() {
    const popup = document.getElementById("popup-beasiswa");
    if (popup) popup.style.display = "none";
}

// ========================
// 8. Cookie
// ========================
window.onload = function () {
    const cookieBar = document.getElementById("cookie-bar");
    if (cookieBar && !getCookie("acceptedCookies")) {
        cookieBar.style.display = "flex";
    }

    const user = getCookie("username");
    const cookieInfo = document.getElementById("cookie-info");
    if (user && cookieInfo) {
        cookieInfo.innerText = `Halo, ${decodeURIComponent(user)}!`;
    }
};

function acceptAllCookies() {
    setCookie("acceptedCookies",
