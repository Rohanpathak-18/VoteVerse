# 🗳️ VoteVerse

> A secure and modern online voting platform built with the **MERN Stack** that enables authenticated users to vote while allowing administrators to manage candidates efficiently.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

# 📖 Overview

VoteVerse is a secure online voting system built using the **MERN Stack**. It provides a robust backend API for managing users, candidates, authentication, and voting while ensuring that each authenticated user can cast only one vote.

The project follows RESTful API principles and uses JWT-based authentication with role-based authorization for administrators.

---

# ✨ Features

- 🔐 JWT Authentication & Authorization
- 👤 User Registration & Login
- 🔑 Secure Password Hashing with bcrypt
- 🗳️ One Vote Per User
- 👑 Admin Role-Based Access
- ➕ Add Candidates
- ✏️ Update Candidate Details
- ❌ Delete Candidates
- 📊 View Live Vote Count
- 🌐 RESTful APIs
- ⚡ MongoDB Database Integration
- 🔒 Protected Routes

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Token (JWT)
- bcrypt

## Tools
- Postman
- Git
- GitHub
- dotenv

---

# 📂 Project Structure

```text
VoteVerse/
│
├── models/
│   ├── User.js
│   └── Candidate.js
│
├── routes/
│   ├── userRoutes.js
│   └── candidateRoutes.js
│
├── middleware/
│   └── jwt.js
│
├── db.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Rohanpathak-18/VoteVerse.git
```

## Navigate into the Project

```bash
cd VoteVerse
```

## Install Dependencies

```bash
npm install
```

## Create a .env File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run the Server

```bash
npm start
```

or

```bash
npm run dev
```

---

# 🔗 API Endpoints

## User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Register User |
| POST | /login | Login User |
| GET | /profile | Get Logged-in User |

---

## Candidate Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /candidate | Get All Candidates |
| POST | /candidate | Add Candidate (Admin Only) |
| PUT | /candidate/:id | Update Candidate |
| DELETE | /candidate/:id | Delete Candidate |
| POST | /candidate/vote/:id | Vote for Candidate |
| GET | /candidate/vote/count | Get Vote Count |

---

# 🔐 Authentication

Most endpoints require a JWT token.

Include the token in the request header:

```http
Authorization: Bearer <your_jwt_token>
```

---

# 🛡 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected Routes
- Environment Variables
- MongoDB Validation

---

# 📸 API Testing

Use **Postman** to test all API endpoints.

You can add screenshots here:

```
images/
├── signup.png
├── login.png
├── add-candidate.png
├── vote.png
└── vote-count.png
```

---

# 🚀 Future Enhancements

- React Frontend
- Election Scheduling
- Real-Time Vote Results
- Admin Dashboard
- Email Verification
- Password Reset
- Docker Support
- CI/CD Deployment
- Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Rohan Kumar Pathak**

GitHub: https://github.com/Rohanpathak-18

LinkedIn: *(Add your LinkedIn profile here)*

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It motivates me to build more awesome projects!

---

## 📜 License

This project is licensed under the MIT License.

---

### Made with ❤️ by Rohan Kumar Pathak
