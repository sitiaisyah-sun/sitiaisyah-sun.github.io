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
        image: "https://books.google.co.id/books/publisher/content?id=U_-BBAAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U367vR6v7YFVJQq-uXRZqfo01r3-A&w=1280",
        description: "Kisah romantis remaja Bandung antara Dilan dan Milea.",
        pdf: "https://ia800904.us.archive.org/34/items/PidiBaiqDilan.pdf/Pidi%20baiq%20-%20Dilan.pdf.pdf"
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
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        if (book.title.toLowerCase().includes(filter.toLowerCase())) {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            let pdfButton = "";
            if (book.pdf) {
                pdfButton = `<a href="${book.pdf}" target="_blank" style="display:inline-block;margin-top:5px;color:white;background-color:#007bff;padding:5px 10px;border-radius:5px;text-decoration:none;">Baca PDF</a>`;
            }

            bookDiv.innerHTML = `
                <img src="${book.image}" alt="${book.title}" onclick="openModal(${index})">
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

/* Popup Beasiswa */
function tampilkanPopupBeasiswa() {
    document.getElementById("popup-beasiswa").style.display = "flex";
}

function tutupPopupBeasiswa() {
    document.getElementById("popup-beasiswa").style.display = "none";
}

// ========================
// 8. Cookie
// ========================

// Cek notifikasi cookie di awal
window.onload = function () {
  if (!getCookie("acceptedCookies")) {
    document.getElementById("cookie-notice").style.display = "block";
  }

  const savedName = getCookie("username");
  if (savedName) {
    document.getElementById("cookie-info").innerText = `Halo, ${decodeURIComponent(savedName)}!`;
  }
};

// Fungsi menerima cookie notice
function acceptCookieNotice() {
  setCookie("acceptedCookies", "true", 30);
  document.getElementById("cookie-notice").style.display = "none";
}

// Fungsi menyimpan cookie
function saveCookie() {
  const name = document.getElementById("cookie-name").value.trim();
  if (name) {
    setCookie("username", name, 7);
    alert("Cookie telah disimpan!");
    document.getElementById("cookie-info").innerText = `Halo, ${name}! Cookie Anda disimpan.`;
  } else {
    alert("Silakan masukkan nama.");
  }
}

// Fungsi menampilkan cookie
function showCookie() {
  const user = getCookie("username");
  if (user) {
    alert(`Cookie Anda: ${decodeURIComponent(user)}`);
  } else {
    alert("Tidak ada cookie disimpan.");
  }
}

// Fungsi menghapus cookie
function deleteCookie() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  alert("Cookie telah dihapus.");
  document.getElementById("cookie-info").innerText = "Cookie dihapus.";
}

// Fungsi mengambil cookie
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Fungsi menyetel cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}
