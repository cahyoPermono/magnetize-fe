# Magnetize Front End

## Setup

Make sure to install the dependencies

```bash
npm install
```

## Development
Configure the Port, Host, and Public API Base at .env

Start the development server

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

## Features

- Guest Book
- Departements, includes: notes and attachments
- Jobs, includes : Candidates, Summary, Team(inActive), Recomendation(inActive), Activities(inActive), Sourcing(inActive), Reports(inActive)
- Guests
- Administration: User Management
- Role Permission
- Login, Role, Permission, Auth, JwT

## Auth, Permission, Role

### Auth
Auth adalah proses dimana aplikasi melakukan pengenalan atau memastikan pengakuan. auth memastikan bahwa user yang masuk sudah melakukan proses login dan memiliki token. token yang digunakan adalah JWT. token didapatkan dari Back-End saat proses login, lalu disimpan dalam store (Pinia State Management)


### Permission
Permission adalah proses pengizinan oleh aplikasi untuk user agar bisa mengakses fitur yang disediakan. Permission diberikan melalui fitur "role permission" yang hanya dapat diakses oleh role admin.

### Role
Role adalah peran user. setiap user akan mendapatkan peran akan diberikan izin sehingga dapat mengakses fitur. role user dapat dilihat pada fitur user management.