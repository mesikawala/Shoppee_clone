export default function Footer() {
  const columns = [
    {
      title: "Layanan Pelanggan",
      links: ["Bantuan", "Cara Belanja", "Cara Pembayaran", "Lacak Pesanan", "Pengembalian Barang"],
    },
    {
      title: "Tentang Belanja.in",
      links: ["Tentang Kami", "Karir", "Kebijakan Privasi", "Syarat & Ketentuan"],
    },
    {
      title: "Mulai Berjualan",
      links: ["Cara Berjualan", "Pusat Edukasi Penjual", "Program Promosi"],
    },
  ];

  return (
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="container-shop grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-semibold text-ink">{col.title}</h3>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-500 hover:text-brand">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 py-4">
        <p className="container-shop text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Belanja.in — Dibuat dengan Next.js. Proyek demo, bukan toko sungguhan.
        </p>
      </div>
    </footer>
  );
}
