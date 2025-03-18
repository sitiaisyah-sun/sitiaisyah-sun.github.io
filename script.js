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
    { title: "Laut Bercerita", author: "Leila S. Chudori", image: "laut-bercerita.jpg", url: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786024246945_Laut-Bercerita.png" },
    { title: "Bumi", author: "Tere Liye", image: "bumi.jpg", url: "https://www.goodreads.com/book/show/20733402-bumi" },
    { title: "Dilan 1990", author: "Pidi Baiq", image: "dilan-1990.jpg", url: "https://www.goodreads.com/book/show/22919642-dilan-dia-adalah-dilanku-tahun-1990" },
    { title: "Hujan", author: "Tere Liye", image: "hujan.jpg", url: "https://www.goodreads.com/book/show/28964247-hujan" },
    { title: "Ayah", author: "Andrea Hirata", image: "ayah.jpg", url: "https://www.goodreads.com/book/show/26226366-ayah" },
    { title: "Pulang", author: "Tere Liye", image: "pulang.jpg", url: "https://www.goodreads.com/book/show/31548858-pulang" }
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

const books = [
    { 
        title: "Laut Bercerita", 
        author: "Leila S. Chudori", 
        image: "https://upload.wikimedia.org/wikipedia/id/7/70/Laut_Bercerita.jpg", 
        description: "Novel yang menceritakan kisah aktivis yang hilang di era Orde Baru."
    },
    { 
        title: "Bumi", 
        author: "Tere Liye", 
        image: "https://upload.wikimedia.org/wikipedia/id/d/dc/Bumi_Tere_Liye.jpg", 
        description: "Petualangan Raib, Seli, dan Ali di dunia paralel yang penuh keajaiban."
    },
    { 
        title: "Dilan 1990", 
        author: "Pidi Baiq", 
        image: "https://upload.wikimedia.org/wikipedia/id/8/82/Dilan_1990_sampul.jpg", 
        description: "Kisah romantis remaja Bandung antara Dilan dan Milea."
    }
];

function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}" onclick="openModal(${index})">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;

        bookList.appendChild(bookItem);
    });
}

function openModal(index) {
    const book = books[index];

    document.getElementById("modal-title").textContent = book.title;
    document.getElementById("modal-image").src = book.image;
    document.getElementById("modal-author").textContent = "Penulis: " + book.author;
    document.getElementById("modal-description").textContent = book.description;

    document.getElementById("book-modal").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const books = [
        {
            title: "Laskar Pelangi",
            author: "Andrea Hirata",
            image: "images/laskar-pelangi.jpg",
            description: "Novel inspiratif tentang perjuangan anak-anak Belitung."
        },
        {
            title: "Dilan 1990",
            author: "Pidi Baiq",
            image: "images/dilan-1990.jpg",
            description: "Kisah cinta Dilan dan Milea yang penuh nostalgia."
        },
        {
            title: "Bumi",
            author: "Tere Liye",
            image: "images/bumi.jpg",
            description: "Petualangan seorang anak dalam dunia paralel."
        }
    ];

    const bookList = document.getElementById("book-list");
    const searchInput = document.getElementById("search");

    function displayBooks(filter = "") {
        bookList.innerHTML = ""; 
        books.forEach(book => {
            if (book.title.toLowerCase().includes(filter.toLowerCase())) {
                const bookDiv = document.createElement("div");
                bookDiv.classList.add("book");
                bookDiv.innerHTML = `
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <button onclick="showDetail('${book.title}', '${book.image}', '${book.description}')">Lihat Detail</button>
                `;
                bookList.appendChild(bookDiv);
            }
        });
    }

    searchInput.addEventListener("input", function () {
        displayBooks(this.value);
    });

    displayBooks();
});

function showDetail(title, image, description) {
    alert(`${title}\n\n${description}`);
}

<link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

    // Menyimpan komentar dalam array
let comments = [];

// Fungsi menambahkan komentar
function addComment() {
    let commentInput = document.getElementById("comment-input");
    let commentText = commentInput.value.trim();

    if (commentText !== "") {
        comments.push(commentText); // Tambah komentar ke array
        commentInput.value = ""; // Kosongkan textarea
        displayComments(); // Perbarui tampilan komentar
    }
}

// Fungsi menampilkan komentar
function displayComments() {
    let commentList = document.getElementById("comment-list");
    commentList.innerHTML = ""; // Bersihkan daftar komentar

    comments.forEach(comment => {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.textContent = comment;
        commentList.appendChild(commentDiv);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Cek apakah sebelumnya pengguna sudah memilih dark mode
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Simpan preferensi pengguna
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});
