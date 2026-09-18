# LMS Frontend (Student + Trainer)

React + Vite frontend for an existing LMS backend.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and check the URLs:
   - `VITE_API_BASE_URL=http://localhost:5001/api`
   - `VITE_SERVER_URL=http://localhost:5001` (used for profile images)
3. `npm run dev` and open http://localhost:5173

## Folder structure

```
src/
  api/         axios instance + all student/trainer API calls
  context/     StudentAuthContext + TrainerAuthContext (separate logins)
  components/  Navbars, ProtectedRoute, Loader, Message, CourseCard
  pages/
    student/   signup, otp, login, forgot password, courses, my courses
    trainer/   signup, otp, login, dashboard, courses, sales, students
  App.jsx      all routes
  main.jsx     app entry
```

Student token is kept in `studentToken` / `studentUser`, trainer token in
`trainerToken` / `trainerUser`, so both sides can be logged in separately.
