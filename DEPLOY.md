# Deploy LaundryGo

LaundryGo terdiri dari dua app:

- `backend`: Express API + MySQL
- `frontend`: React/Vite

Deploy paling mudah adalah backend di Railway dan frontend di Vercel.

## 1. Siapkan Database MySQL

Di Railway:

1. Buat project baru.
2. Tambahkan service `MySQL`.
3. Buka tab database MySQL, lalu jalankan isi file `backend/schema.sql`.

Railway akan memberi variabel seperti host, port, user, password, dan database.

## 2. Deploy Backend ke Railway

1. Tambahkan service baru dari GitHub repo ini.
2. Set `Root Directory` ke:

```txt
backend
```

3. Set environment variables:

```txt
DB_HOST=<host mysql railway>
DB_PORT=<port mysql railway>
DB_USER=<user mysql railway>
DB_PASSWORD=<password mysql railway>
DB_NAME=<nama database mysql railway>
JWT_SECRET=<isi bebas yang panjang dan rahasia>
```

4. Railway akan menjalankan:

```txt
npm install
npm start
```

5. Setelah deploy selesai, buka URL backend. Kalau benar akan muncul:

```txt
LaundryGo API Running
```

Contoh URL:

```txt
https://laundrygo-production.up.railway.app
```

## 3. Deploy Frontend ke Vercel

1. Import repo yang sama ke Vercel.
2. Set `Root Directory` ke:

```txt
frontend
```

3. Set environment variable:

```txt
VITE_API_URL=https://URL-BACKEND-RAILWAY-ANDA
```

Jangan tambahkan `/api` di belakangnya.

4. Build settings Vercel:

```txt
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Deploy. Link dari Vercel adalah link website yang siap digunakan.

## Catatan Penting

- Semua halaman frontend sekarang memakai `VITE_API_URL`, jadi login, register, order, admin dashboard, dan QR Code akan memakai backend yang sama.
- Jangan commit file `backend/.env` ke GitHub. Pakai `backend/.env.example` sebagai contoh saja.
- Jangan commit folder `node_modules`. Railway dan Vercel akan install dependency sendiri saat deploy.
