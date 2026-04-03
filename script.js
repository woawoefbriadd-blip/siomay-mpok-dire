// Array untuk menyimpan pesanan
let orders = [];
let totalHarga = 0;

// Tambah item ke keranjang
document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", function() {
    const card = this.parentElement;
    const menu = card.getAttribute("data-menu");
    const harga = parseInt(card.getAttribute("data-harga"));

    // Tambahkan ke array orders
    orders.push({ menu, harga });
    totalHarga += harga;

    updateKeranjang();
  });
});

// Update tampilan keranjang
function updateKeranjang() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  orders.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `${o.menu} - Rp${o.harga.toLocaleString("id-ID")}`;
    orderList.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: Rp${totalHarga.toLocaleString("id-ID")}`;
}

// Checkout ke WhatsApp
document.getElementById("checkout").addEventListener("click", function() {
  if (orders.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  // Ambil nama pemesan
  const namaPemesan = document.getElementById("namaPemesan").value.trim();
  if (!namaPemesan) {
    alert("Silakan masukkan nama pemesan terlebih dahulu.");
    return;
  }

  // Format pesan
  const pesananList = orders.map(o => `• ${o.menu} - Rp${o.harga.toLocaleString("id-ID")}`).join("\n");
  const pesan = `Halo, saya mau pesan untuk makan di tempat.\nNama: ${namaPemesan}\n\nPesanan:\n${pesananList}\n\nTotal: Rp${totalHarga.toLocaleString("id-ID")}`;

  // Nomor WA penjual (format internasional tanpa spasi/tanda hubung)
  const nomorWA = "6285212015720"; // +62 852-1201-5720
  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

  // Buka WhatsApp
  window.open(url, "_blank");
});
