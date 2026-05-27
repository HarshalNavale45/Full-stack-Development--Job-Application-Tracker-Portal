# 🚀 Premium Job Application Tracker Portal

Developed by **[Navle Harshal](https://www.linkedin.com/in/harshal-navale-a3882a383?utm_source=share_via&utm_content=profile&utm_medium=member_android)**  
👉 **[GitHub Portfolio](https://github.com/HarshalNavale45)** | **[LinkedIn Profile](https://www.linkedin.com/in/harshal-navale-a3882a383?utm_source=share_via&utm_content=profile&utm_medium=member_android)**

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-007acc?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A premium, production-ready Full Stack Web Application engineered with the modern **MERN stack** (MongoDB, Express, React, Node.js) and optimized with high-fidelity glassmorphism aesthetics. Designed as a centralized dashboard to replace clunky spreadsheets, this system empowers job seekers, students, and professionals to seamlessly log, manage, and analyze their job search progress in real time.

---

## 📖 Project Overview

### The Problem It Solves
Tracking multiple applications across different platforms (LinkedIn, Indeed, direct sites) is challenging and disorganized. Standard spreadsheets lack interactivity, reminders, and analytics. The **Job Application Tracker Portal** solves this by consolidating all job hunt activities into a single interactive cockpit, ensuring you never miss a follow-up, interview date, or career opportunity.

### Key Capabilities & Highlights
- 📊 **Dynamic Analytics Dashboard**: Automated success rates and visual metrics utilizing custom **Recharts** integrations to show your progress breakdown (Applied, Interview, Offer, Rejected).
- 🔐 **Cryptographically Secure Authentication**: Bulletproof JWT-based authentication paired with server-side bcryptjs password hashing and custom route protection middleware.
- 💼 **Full Job Lifecycle Management (CRUD)**: Create, Read, Update, and Delete job entries instantly with intuitive pop-up control panels.
- 🔎 **Multi-criteria Filtering & Search**: Instant real-time filtering by company name, job position, application status, or interview readiness.
- ✨ **High-Fidelity UI/UX**: Designed using sleek dark mode aesthetics, custom typography, micro-interactions, and fluid, responsive layouts powered by Tailwind CSS and Framer Motion.

---

## 🛠 Technology Ecosystem

### Frontend Architecture
- **React.js (Vite)**: Lightning-fast hot module replacement (HMR) and optimized builds.
- **Context API**: Clean, single-source global state management for authorization and session handling.
- **Tailwind CSS**: Custom utility classes used to construct a modern, high-contrast, responsive glassmorphic aesthetic.
- **Framer Motion**: Smooth entry/exit animations, hover interactions, and responsive card transition effects.
- **Recharts**: Responsive SVG charts representing complex quantitative metrics.
- **React Hot Toast**: Beautiful, non-blocking toast notifications for immediate user feedback.

### Backend Infrastructure
- **Node.js & Express.js**: Asynchronous, event-driven, and highly scalable REST API server.
- **MongoDB & Mongoose**: Flexible, schema-based ODM mapping data directly to JSON objects.
- **JSON Web Tokens (JWT)**: Secure stateless authorization headers matching logged-in users to their database profiles.
- **bcryptjs**: Cryptographic password hashing before persistence.

---

## 🏗 Directory & Architecture Map

The project is structured logically into separate frontend (`client`) and backend (`server`) modules:

```text
Job-Application-Tracker-Portal/
├── client/                     # React Frontend Workspace
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobCard.jsx     # Card component rendering job details & actions
│   │   │   ├── JobModal.jsx    # Pop-up modal containing Add/Edit forms
│   │   │   └── Navbar.jsx      # Navigation bar with user context controls
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global user sign-in & JWT state provider
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Main view rendering interactive analytical widgets
│   │   │   ├── JobsList.jsx    # Tabular and card layout of all user jobs
│   │   │   ├── Login.jsx       # Beautiful login interface with validation
│   │   │   └── Register.jsx    # User sign-up page with real-time feedback
│   │   ├── index.css           # Global typography, animations & style variables
│   │   └── main.jsx            # Frontend entrypoint
│   ├── tailwind.config.js      # Custom theme configurations & animations
│   └── vite.config.js          # Proxy definitions and server configurations
│
└── server/                     # Express & Node.js Backend Workspace
    ├── config/
    │   └── db.js               # MongoDB connection wrapper
    ├── controllers/
    │   ├── authController.js   # Logic for user register, login & profile lookup
    │   └── jobController.js    # Logic for jobs CRUD operations
    ├── middleware/
    │   ├── authMiddleware.js   # Intercepts requests to check and decode JWT headers
    │   └── errorMiddleware.js  # Global handling of 404 & runtime server errors
    ├── models/
    │   ├── User.js             # Mongoose Schema detailing user attributes & password methods
    │   └── Job.js              # Mongoose Schema detailing job listing parameters
    ├── routes/
    │   ├── authRoutes.js       # Routes mapping authorization controllers
    │   └── jobRoutes.js        # Routes mapping job data operations
    └── server.js               # Main server listener & entrypoint
```

---

## 🗄 Database Schemas

### User Model (`server/models/User.js`)
Stores user profiles and handles security operations.
- `name` (String, Required): User's full name.
- `email` (String, Required, Unique): Used for login and profile lookup.
- `password` (String, Required): Cryptographically hashed password via `bcrypt.js`.
- `timestamps` (Boolean): Automatically generates `createdAt` and `updatedAt` markers.

### Job Model (`server/models/Job.js`)
Stores job applications mapped to a specific user via Mongoose references.
- `user` (ObjectId, Required, Ref: `'User'`): Establishes a 1-to-many relationship.
- `company` (String, Required): Name of hiring organization.
- `position` (String, Required): Title of the position.
- `status` (String, Enum: `['Applied', 'Interview', 'Offer', 'Rejected']`): Status of application.
- `dateApplied` (Date, Default: `Date.now`): When the application was sent.
- `interviewDate` (Date, Optional): Scheduled interview date.
- `notes` (String, Optional): Specific context, links, or details for the listing.

---

## 🔌 API Documentation

All endpoints reside under the `/api` namespace. Endpoints marked with 🔒 require an `Authorization` header containing the JWT token.

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required | Request Payload Example |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Create a new user profile | No | `{ "name": "John Doe", "email": "john@example.com", "password": "securepassword" }` |
| **POST** | `/api/auth/login` | Validate user credentials & get token | No | `{ "email": "john@example.com", "password": "securepassword" }` |
| **GET** | `/api/auth/me` | Retrieve currently logged-in user profile | **Yes (JWT)** 🔒 | *None (Header token)* |

### Jobs CRUD Endpoints
| Method | Endpoint | Description | Auth Required | Request Payload Example |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/jobs` | Retrieve all job applications for logged-in user | **Yes (JWT)** 🔒 | *None (Header token)* |
| **POST** | `/api/jobs` | Create a new job application entry | **Yes (JWT)** 🔒 | `{ "company": "Google", "position": "Software Engineer", "status": "Applied", "notes": "Applied on referral" }` |
| **PUT** | `/api/jobs/:id` | Update an existing job application status/details | **Yes (JWT)** 🔒 | `{ "status": "Interview", "interviewDate": "2026-06-15T10:00:00Z" }` |
| **DELETE** | `/api/jobs/:id` | Permanent deletion of job record | **Yes (JWT)** 🔒 | *None (Header token)* |

---

## 🚀 Getting Started — How to Run This Project Locally

Follow these **step-by-step instructions** to clone this repository from GitHub and run the full application on your own computer.

---

### ✅ Step 1: Prerequisites

Before you begin, make sure you have the following installed on your system:

| Tool | Version | Download Link |
| :--- | :--- | :--- |
| **Node.js** | v16.x or newer | [nodejs.org](https://nodejs.org/) |
| **Git** | Any recent version | [git-scm.com](https://git-scm.com/) |
| **MongoDB** | Local installation OR Atlas URI | [mongodb.com](https://www.mongodb.com/) |

---

### ✅ Step 2: Clone the Repository from GitHub

Open your terminal (CMD, PowerShell, or Git Bash) and run:

```bash
git clone https://github.com/HarshalNavale45/Full-stack-Development--Job-Application-Tracker-Portal.git
```

Then navigate into the project directory:

```bash
cd Full-stack-Development--Job-Application-Tracker-Portal
```

---

### ✅ Step 3: Setup & Run the Backend Server

Navigate into the `server` folder and install all dependencies:

```bash
cd server
npm install
```

Now create a **`.env`** file inside the `server` folder and add the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/job-tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

> 💡 **Note:** If you are using **MongoDB Atlas** (cloud), replace `MONGO_URI` with your Atlas connection string.

Now start the backend development server:

```bash
npm run dev
```

✅ **Success Message you should see:**
```
Server running in development mode on port 5000
MongoDB Connected: 127.0.0.1
```

---

### ✅ Step 4: Setup & Run the Frontend Client

Open a **new terminal window** (keep the backend server running), go back to the project root, then navigate into the `client` folder:

```bash
cd ../client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

✅ **Success Message you should see:**
```
VITE v5.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

---

### ✅ Step 5: Open in Browser

Open **Google Chrome** (or any browser) and go to:

**👉 [http://localhost:3000/](http://localhost:3000/)**

You will see the Job Application Tracker Portal running live on your machine. Register a new account and start tracking your job applications!

---

> ⚠️ **Windows Users Note:** If `npm` gives an error in PowerShell, run this command first:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
> ```

---

## 💡 Learning Outcomes & Best Practices Demonstrated

By building and polishing this system, the following critical software engineering principles were implemented:
- **Component-Driven UI/UX Design**: Creating modular, decoupled, and reusable React modules (`JobCard`, `JobModal`, `Navbar`) that react fluidly to states.
- **Stateless RESTful Architecture**: Building Express controllers that adhere to standard HTTP verbs, maintaining clean API routes, and responding with unified JSON shapes.
- **Comprehensive Database Integrity**: Crafting strong Mongoose Schemas utilizing robust enumerations, unique indexing, and automated timestamps.
- **Cryptographic Security**: Utilizing standard password salting patterns via `bcrypt.js` and securely managing user state via signed JSON Web Tokens.
- **Data Visualization & Analytics**: Designing responsive graphs with Recharts that recalculate metrics dynamically as records are added, edited, or removed.

## 👨‍💻 Author & Connect

**Navle Harshal**
* **LinkedIn**: [harshal-navale](https://www.linkedin.com/in/harshal-navale-a3882a383?utm_source=share_via&utm_content=profile&utm_medium=member_android)
* **GitHub**: [@HarshalNavale45](https://github.com/HarshalNavale45)

Feel free to reach out for collaboration, questions, or opportunities!

---
*Developed with ❤️ by Navle Harshal to empower professionals and demonstrate Full-Stack Engineering excellence.*
