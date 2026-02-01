# BE-NodeJS-FE-ReactNative

A full-stack application with a Node.js backend API and a React Native frontend for user and friend management.

## 🚀 About the Project

This project consists of a RESTful backend API built with Node.js, Express, and MongoDB, and a React Native frontend for mobile app development. The backend provides endpoints for user CRUD operations, while the frontend consumes these APIs using Redux Toolkit for state management.

## 🛠️ Tech Stack

### Backend

- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **ESLint** – Code linter
- **Prettier** – Code formatter
- **Nodemon** – Auto-reload during development
- **Joi** – Data validation
- **Morgan** – HTTP request logger

### Frontend

- **React Native** – Mobile framework
- **Redux Toolkit** – State management
- **React Navigation** – Navigation library
- **TypeScript** – Type safety
- **Jest** – Testing framework

## 📋 Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- React Native development environment (Android Studio for Android, Xcode for iOS)

## 🔧 Installation

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root:

   ```env
   MONGO_URI=mongodb+srv://your-user:your-password@your-cluster.mongodb.net/your-database
   PORT=3000
   ```

4. Start the server:

   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. For iOS, install CocoaPods:

   ```bash
   bundle install
   cd ios && bundle exec pod install && cd ..
   ```

4. Start Metro:

   ```bash
   npm start
   ```

5. Run the app:

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

## 📁 Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB configuration
│   │   ├── controllers/
│   │   │   └── userController.js  # Endpoint logic
│   │   ├── models/
│   │   │   └── User.js            # User schema
│   │   ├── routes/
│   │   │   └── userRoutes.js      # Route definitions
│   │   ├── services/
│   │   │   └── userService.js     # Business logic
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js    # Global error handling
│   │   │   └── logger.js          # Logging middleware
│   │   └── server.js              # Main file
│   ├── eslint.config.mjs
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Divider.tsx
│   │   │   ├── FriendCard.tsx
│   │   │   ├── InfoList.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ToggleCell.tsx
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx
│   │   ├── screens/
│   │   │   ├── FriendProfileView.tsx
│   │   │   ├── HomeView.tsx
│   │   │   ├── ProfileView.tsx
│   │   │   └── SearchView.tsx
│   │   ├── store/
│   │   │   ├── friendSlice.tsx
│   │   │   ├── index.tsx
│   │   │   ├── types.tsx
│   │   │   └── userSlice.tsx
│   │   ├── utils/
│   │   │   └── dataUtils.tsx
│   │   └── App.tsx
│   ├── android/
│   ├── ios/
│   ├── package.json
│   └── README.md
└── README.md
```

## 📝 Available Scripts

### Backend

```bash
# Start server in development mode
npm run dev

# Start server in production
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Frontend

```bash
# Start Metro
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test
```

## 🧭 Roadmap

### ✅ Stage 1 — Create the API

- ✅ **Data validation** with Joi or express-validator
- ✅ **Secure environment variables** (.env + dotenv)
- ✅ **Global error handling** (error middleware)
- ✅ **Logs** with Morgan

### ✅ Stage 2 — BE Deploy

- ✅ Deploy on Render.com
- ✅ Add CI/CD

### ✅ Stage 3 — Create the frontend to consume the API

- ✅ React Native setup
- ✅ React Navigation
- ✅ Redux Toolkit
- ✅ Connect with API (RTK Query)
  - ✅ TODO: Implement pull-to-refresh functionality
  - ✅ TODO: Add error handling and retry mechanism
- ✅ Implement screens
  - Home ✅
  - Profile ✅
  - Search ✅
  - FriendProfile ✅
- ✅ i18n

### 🔴 Stage 4 — Security and authentication

- ⏳ Authentication (JWT + bcrypt)
- ⏳ Authorization (roles & ownership)
- ⏳ Helmet (security headers)
- ⏳ Rate limiting
- ⏳ Refresh tokens
- ⏳ DTOs (input / output)
- ⏳ Automated tests
- ⏳ Production logs
- ⏳ Config per environment
- ⏳ Health check

### 🔴 Stage 5 — Documentation

- ⏳ Update README
- ⏳ Swagger for API documentation

### 🔴 Stage 6 - Frontend Improvements Tasks

[FE Improvements Planning Document](./frontend/IMPROVEMENTS.md)

- ⏳ Migration to RTK Query (API Layer & Cache)
- ⏳ Real Authentication Flow (Auth Layer)
- ⏳ Local Persistence (Redux Persist)
- ⏳ Network State Management (Loading/Error/Empty)
- ⏳ Dynamic Navigation with Parameters
- ⏳ Optimistic Updates (High Performance UI)
- ⏳ implement pagination for large friend lists

## 🔐 Environment Variables

### Backend

- `MONGO_URI` – MongoDB connection string
- `PORT` – Server port (default: 3000)

## ⚙️ ESLint Configuration

The backend uses ESLint with Prettier for code quality. Rules are configured in `eslint.config.mjs`.

## 🤝 Contributing

1. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC license.

## 👨‍💻 Author

**Guilherme Ferreira Lenzolari**

GitHub: https://github.com/guilenzolari

---

Built by a FE developer to learn about BE
