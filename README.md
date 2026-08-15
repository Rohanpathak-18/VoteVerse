# 🗳️ VoteVerse

### A Secure, Modern & Full-Stack Online Voting Platform

VoteVerse is a **full-stack online voting platform** built using the **MERN stack**, designed to make digital elections simple, secure, and accessible.

The platform supports **user authentication, role-based authorization, candidate management, public voting, private class elections, protected voting routes, and election results** through a modern and responsive interface.

---

## 🌐 Live Demo

🚀 **Live Website:** `https://voteverse-frontend.onrender.com/`

📦 **GitHub Repository:** `https://github.com/Rohanpathak-18/VoteVerse`

---

## 📌 About The Project

Traditional voting systems can be time-consuming and difficult to manage for small organizations, classrooms, clubs, and communities.

**VoteVerse** provides a digital solution where users can:

* Create an account
* Log in securely
* View candidates
* Participate in elections
* Vote for candidates
* Participate in private class elections
* View election results

Administrators can manage candidates and access protected administrative functionality.

The project was developed to gain practical experience in **full-stack development, REST APIs, authentication, authorization, database management, frontend-backend integration, and deployment**.

---

# ✨ Key Features

## 👤 User Authentication

VoteVerse provides secure authentication for users.

* User registration
* User login
* JWT-based authentication
* Password hashing with bcrypt
* Protected routes
* Authentication-aware frontend
* Secure API requests
* Role-based access control

---

## 🗳️ Online Voting

Users can participate in available elections through a simple voting interface.

### Voting workflow

```text
Login
  ↓
View Candidates
  ↓
Select Candidate
  ↓
Cast Vote
  ↓
Vote Recorded
  ↓
View Results
```

The voting system communicates with the backend through REST APIs and stores voting data in MongoDB.

---

# 🔒 Private Class Election

One of the major features of VoteVerse is the **Private Class Election** system.

This allows VoteVerse to be used for elections within a specific class, group, organization, or community instead of limiting the platform to general elections.

### Private Class Election provides:

* Dedicated class election section
* Private election access
* Candidate-based voting
* Protected election functionality
* Separate election experience
* Class-specific participation
* Election results
* Responsive interface

### Example Use Cases

Private Class Elections can be used for:

* 🏫 Class representative elections
* 🎓 College elections
* 👥 Student group elections
* 🏢 Organization elections
* 🤝 Club elections
* 🗣️ Community polls

### Private Election Flow

```text
User
 │
 ▼
Private Class Election
 │
 ▼
Access Election
 │
 ▼
View Candidates
 │
 ▼
Select Candidate
 │
 ▼
Cast Vote
 │
 ▼
Vote Recorded
 │
 ▼
View Results
```

This feature makes VoteVerse more than a basic voting application by allowing the platform to support **controlled, group-specific elections**.

---

# 🛡️ Admin Dashboard

VoteVerse provides administrative functionality for managing election-related data.

### Admin capabilities include:

* Admin authentication
* Protected admin routes
* Candidate management
* Add candidates
* Update candidate information
* Delete candidates
* Manage election-related data
* View voting information

Only authorized users with the appropriate role can access protected administrative functionality.

---

# 📊 Election Results

VoteVerse provides a results interface where users can view election outcomes.

Results can include:

* Candidate names
* Vote counts
* Election statistics
* Winning candidate information

The results are retrieved from the backend rather than being hardcoded in the frontend.

---

# 🎨 Modern User Interface

The frontend is designed using modern React components and responsive styling.

### UI highlights

* Responsive design
* Modern landing page
* Navigation bar
* Hero section
* Feature section
* Candidate cards
* Voting interface
* Results page
* Private Class Election section
* Admin dashboard
* Responsive footer
* Interactive animations
* Modern icons

The interface is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

---

# 🔐 Authentication & Security

VoteVerse uses **JWT authentication** to secure protected resources.

### Authentication Architecture

```text
                 User
                   │
                   ▼
            Signup / Login
                   │
                   ▼
          Backend Validation
                   │
                   ▼
          Password Verification
               (bcrypt)
                   │
                   ▼
              JWT Token
                   │
                   ▼
        Protected API Requests
                   │
                   ▼
          JWT Middleware
                   │
          ┌────────┴────────┐
          │                 │
       Valid             Invalid
          │                 │
          ▼                 ▼
       Allow              Reject
```

### Security mechanisms

* JWT authentication
* Password hashing
* Protected backend routes
* Role-based authorization
* Environment variables
* MongoDB authentication
* Protected admin functionality

---

# 🧑‍💼 Role-Based Authorization

VoteVerse separates functionality based on user roles.

```text
                User
                 │
        ┌────────┴────────┐
        │                 │
      User              Admin
        │                 │
        ▼                 ▼
   Vote / Results    Manage Candidates
                     Admin Dashboard
```

Regular users can participate in elections, while administrators can access protected management functionality.

---

# 🏗️ Project Architecture

```text
VoteVerse/
│
├── frontend/
│   │
│   ├── public/
│   │   ├── logo.png
│   │   └── ...
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Candidates.jsx
│   │   │   ├── CandidateCard.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ClassElection.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Candidate.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── candidateRoutes.js
│   │
│   ├── middleware/
│   │   └── jwt.js
│   │
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact folder structure may vary depending on the current version of the project.

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose           |
| ---------------- | ----------------- |
| React.js         | Frontend UI       |
| React Router DOM | Routing           |
| Tailwind CSS     | Styling           |
| Framer Motion    | Animations        |
| Axios            | API communication |
| Lucide React     | Icons             |

## Backend

| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | JavaScript runtime |
| Express.js | REST API           |
| MongoDB    | Database           |
| Mongoose   | MongoDB ODM        |
| JWT        | Authentication     |
| bcrypt     | Password hashing   |

## Development Tools

| Tool    | Purpose             |
| ------- | ------------------- |
| Git     | Version control     |
| GitHub  | Source code hosting |
| VS Code | Development         |
| Postman | API testing         |
| npm     | Package management  |

---

# 🔄 Application Flow

```text
                         VoteVerse
                            │
             ┌──────────────┴──────────────┐
             │                             │
          Register                        Login
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                     Authentication
                            │
             ┌──────────────┴──────────────┐
             │                             │
        General Voting              Private Election
             │                             │
             ▼                             ▼
       View Candidates              Access Election
             │                             │
             ▼                             ▼
         Cast Vote                   View Candidates
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                     Election Results
```

---

# 🔌 REST API

The backend exposes RESTful endpoints for authentication, candidates, voting, and election-related operations.

## Authentication

### Register

```http
POST /api/users/signup
```

Creates a new user account.

### Login

```http
POST /api/users/login
```

Authenticates a user and provides authentication credentials.

---

# 👥 Candidate APIs

### Get Candidates

```http
GET /api/candidates
```

Retrieves available candidates.

### Create Candidate

```http
POST /api/candidates
```

Creates a new candidate.

**Admin authorization required.**

### Update Candidate

```http
PUT /api/candidates/:id
```

Updates candidate information.

### Delete Candidate

```http
DELETE /api/candidates/:id
```

Deletes a candidate.

---

# 🗳️ Voting APIs

### Cast Vote

```http
POST /api/candidates/vote/:candidateId
```

Allows an authenticated user to vote for a candidate.

### Vote Count

```http
GET /api/candidates/vote/count
```

Retrieves candidate vote counts.

> Endpoint names should be kept synchronized with the routes implemented in the current backend.

---

# 🔑 Protected API Requests

Protected endpoints require authentication.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

The backend verifies the JWT before allowing access to protected resources.

---

# 🗄️ Database

VoteVerse uses **MongoDB** as its primary database with **Mongoose** for data modeling.

## User Model

The user model manages information such as:

```text
User
├── name
├── email
├── password
└── role
```

Passwords are stored as secure hashes rather than plain text.

---

## Candidate Model

The candidate model stores election candidate information and voting data.

```text
Candidate
├── name
├── party / details
└── voteCount
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Rohanpathak-18/VoteVerse.git
```

```bash
cd VoteVerse
```

---

# 📦 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The backend will normally run at:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Example

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/voteverse
JWT_SECRET=your_super_secret_key
PORT=5000
```

### ⚠️ Important

Never commit your `.env` file to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
node_modules/
```

---

# 🧪 API Testing With Postman

The backend APIs can be tested using Postman.

Recommended testing sequence:

```text
1. Signup
      ↓
2. Login
      ↓
3. Get authentication token
      ↓
4. Send token with protected requests
      ↓
5. Get candidates
      ↓
6. Cast vote
      ↓
7. Check vote count
```

For admin functionality:

```text
1. Login as admin
      ↓
2. Receive JWT
      ↓
3. Send JWT with admin requests
      ↓
4. Create / update / delete candidates
```

---

# 🚀 Deployment

VoteVerse can be deployed using modern cloud platforms.

### Frontend

Possible platforms:

* Vercel
* Netlify

### Backend

Possible platforms:

* Render
* Railway

### Database

* MongoDB Atlas

---

# 🌍 Production Configuration

During local development, the frontend may communicate with:

```text
http://localhost:5000
```

After deployment, update the frontend API configuration to use the deployed backend URL.

For example:

```text
https://your-voteverse-backend.onrender.com
```

Environment variables should also be configured directly in the deployment platform.

---

# 📱 Responsive Design

VoteVerse follows a responsive design approach.

The application adapts to:

```text
Desktop
   ↓
Tablet
   ↓
Mobile
```

The goal is to provide a consistent experience across different screen sizes.

---

# 📂 Main Application Sections

## 🏠 Home

The landing page introduces VoteVerse and explains its major capabilities.

## 🔐 Login

Allows registered users to securely authenticate.

## 📝 Signup

Allows new users to create an account.

## 🗳️ Voting

Displays candidates and allows authenticated users to participate in elections.

## 🔒 Class Election

Provides a dedicated experience for private class/group elections.

## 📊 Results

Displays election results and vote counts.

## 👨‍💼 Admin Dashboard

Provides authorized administrators with election management functionality.

---

# 💡 Why VoteVerse?

VoteVerse was built to explore how a real-world digital voting system can be developed using modern web technologies.

The project demonstrates practical implementation of:

* Authentication
* Authorization
* REST APIs
* Database management
* CRUD operations
* Protected routes
* Voting logic
* Private elections
* Frontend-backend communication
* Deployment

---

# 🧠 What I Learned

While building VoteVerse, I strengthened my understanding of:

### Frontend

* React component architecture
* React Router
* State management
* API integration
* Responsive UI development
* Tailwind CSS
* Animations

### Backend

* Node.js
* Express.js
* REST API design
* Middleware
* JWT authentication
* Role-based authorization
* Error handling

### Database

* MongoDB
* Mongoose
* Schemas
* Models
* CRUD operations

### Development

* Git & GitHub
* Postman
* Environment variables
* Deployment
* Debugging full-stack applications

---

# 🔮 Future Improvements

The following features can be added in future versions:

* [ ] Strict one-user-one-vote enforcement
* [ ] Election creation by administrators
* [ ] Election start and end dates
* [ ] Election status management
* [ ] Private election invitation/join codes
* [ ] Real-time voting results
* [ ] Email verification
* [ ] Forgot password / reset password
* [ ] Admin analytics
* [ ] Election history
* [ ] Vote audit logs
* [ ] Rate limiting
* [ ] Advanced fraud prevention
* [ ] Automated unit and integration testing
* [ ] Docker support
* [ ] CI/CD pipeline
* [ ] Enhanced accessibility

---

# 🔒 Production Security Note

VoteVerse is a **portfolio/educational project** and should not be considered suitable for conducting legally binding public elections without substantial additional security, auditing, identity verification, cryptographic vote-integrity mechanisms, privacy protections, and independent security review.

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

Create your own fork of the project.

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement and test your feature.

### 4. Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

### 5. Push the branch

```bash
git push origin feature/your-feature
```

### 6. Create a Pull Request

Open a Pull Request with a clear description of your changes.

---

# 📜 License

This project is developed for **educational and portfolio purposes**.

---

# 👨‍💻 Author

## Rohan Kumar Pathak

**B.Tech Computer Science Engineering Student**

### Areas of Interest

* Full-Stack Development
* MERN Stack
* Backend Development
* Generative AI
* Machine Learning
* Software Development

---

# ⭐ Support

If you found VoteVerse interesting or useful, consider giving the repository a ⭐ on GitHub.

---

<div align="center">

### 🗳️ VoteVerse

**Secure • Simple • Digital Voting**

Built with ❤️ by Rohan | MERN Stack

</div>
