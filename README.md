# Belanja.in — Marketplace Clone (Next.js)

Website e-commerce marketplace modern (terinspirasi dari Shopee) dibangun
penuh dengan Next.js (App Router) — frontend & backend (API routes) dalam
satu project yang sama.

## Fitur yang sudah ada

- Halaman utama: banner promo, kategori, **Flash Sale** dengan hitung mundur,
  dan rekomendasi produk
- Halaman daftar produk: filter kategori, pencarian, sorting, pagination
- Halaman detail produk: galeri gambar, rating, info toko, produk serupa
- Keranjang belanja: pilih item, ubah jumlah, hapus, total otomatis
  (tersimpan di `localStorage` browser)
- Checkout: form alamat, pilih metode pengiriman & pembayaran, ringkasan
  pesanan, dan konfirmasi pesanan
- API routes: `GET /api/products`, `GET /api/products/:id`, `POST /api/orders`

## Tech stack

- **Next.js 14** (App Router) — frontend sekaligus backend (API routes)
- **TypeScript**
- **Tailwind CSS** untuk styling
- **lucide-react** untuk ikon
- Data produk saat ini berupa **mock data** di `lib/data.ts`

## Cara menjalankan

```bash
npm install
npm run dev
```

Lalu buka `http://localhost:3000`.

## Struktur folder

```
app/
  page.tsx                  -> Halaman utama
  products/page.tsx         -> Daftar produk (filter/sort/pagination)
  products/[id]/page.tsx    -> Detail produk
  cart/page.tsx             -> Keranjang belanja
  checkout/page.tsx         -> Checkout
  api/products/route.ts     -> GET daftar produk
  api/products/[id]/route.ts-> GET detail produk
  api/orders/route.ts       -> POST buat pesanan
  layout.tsx                -> Root layout (font, Header, Footer, CartProvider)
  globals.css               -> Style global + Tailwind

components/                 -> Semua komponen UI (Header, ProductCard, dll)
context/CartContext.tsx     -> State keranjang belanja (React Context + localStorage)
lib/
  types.ts                  -> Tipe data (Product, Category, CartItem, dst)
  data.ts                   -> MOCK DATA produk & kategori
  products.ts                -> Fungsi akses data (async, siap diganti ke MongoDB)
  format.ts                 -> Helper format Rupiah & angka terjual
```

## Menghubungkan ke MongoDB Atlas (nanti, sesuai rencanamu)

Project ini sengaja dipisah jadi 2 layer supaya mudah disambungkan ke
MongoDB Atlas tanpa mengubah halaman/komponen:

1. **`lib/data.ts`** — sumber data mentah (saat ini array di memori).
2. **`lib/products.ts`** — fungsi `async` yang dipanggil oleh halaman & API
   route (`getProducts`, `getProductById`, dst). Halaman & API route TIDAK
   pernah mengimpor `lib/data.ts` langsung.

Saat kamu sudah siap pasang MongoDB Atlas, langkah-langkahnya kira-kira:

1. Install driver: `npm install mongoose`
2. Tambahkan `MONGODB_URI=...` di file `.env.local` (jangan di-commit ke git)
3. Buat `lib/mongodb.ts` untuk koneksi singleton ke Atlas
4. Buat model Mongoose, misalnya `models/Product.ts` mengikuti bentuk
   `Product` di `lib/types.ts`
5. Ganti isi fungsi di `lib/products.ts` (BUKAN nama/parameter fungsinya)
   dari membaca array `products` menjadi `await Product.find(filter)`,
   `await Product.findById(id)`, dst.
6. Lakukan hal yang sama untuk koleksi `orders` di `app/api/orders/route.ts`
   (sudah ada komentar `TODO` di file tersebut).

Dengan begitu, seluruh UI (home, listing, detail, cart, checkout) tidak
perlu disentuh sama sekali — cukup ganti "isi dalam" `lib/products.ts`.

## Catatan

- Gambar produk memakai placeholder dari `picsum.photos` (acak tapi
  konsisten per produk) — domainnya sudah didaftarkan di `next.config.js`.
  Saat sudah ada gambar produk asli (misalnya dari MongoDB/storage seperti
  Cloudinary/S3), tambahkan domain tersebut juga ke `images.remotePatterns`.
- Belum ada sistem login/register & dashboard penjual — sesuai fokus awal
  (alur belanja inti: home → produk → keranjang → checkout). Bisa
  dikembangkan lagi kalau dibutuhkan.
- Pembayaran masih simulasi (tidak ada integrasi payment gateway).
