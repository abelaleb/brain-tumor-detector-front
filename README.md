# 🧠 Brain Disease Detector/Classification Frontend

This is the **frontend React/Next.js app** built with **Next.js**, allowing users to upload Brain MRI images and receive AI-driven predictions for brain tumor types, stroke types, Hemorrhage or not and Parkinson's or not .

## 🚀 Features

- Drag-and-drop or click to upload MRI scans
- Real-time analysis results with prediction & confidence
- User authentication (login/signup) with role-based access
- Feedback submission system (text + optional image re-upload)
- Admin dashboard to view feedback and manage users/models
- Responsive UI using TailwindCSS and shadcn/ui
- Supports formats: JPG, PNG, WEBP (max size 10MB)

## 📦 Tech Stack

- Next.js
- TypeScript
- Supabase (for auth and PostgreSQL DB)
- Tailwind CSS
- shadcn/ui
- Lucide icons


## 🔐 Authentication Setup

This project uses [Supabase](https://supabase.com/) for authentication and database.

1. Go to [Supabase](https://app.supabase.com/) and create a project.
2. Enable Email/Password auth in the "Authentication" tab.
3. Create the following tables in Supabase Database:
   - `users` (id, email, role)
   - `feedback` (id, user_id, predicted_class, actual_class, comments, image_url, created_at)
4. Update your `.env.local` file:

```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🛠️ Admin Dashboard

Admins can:
- View feedback submitted by users
- Filter feedback by class or date
- View original and re-uploaded images
- Manage user roles (assign or revoke admin access)


## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mri-analyzer-frontend.git
cd mri-analyzer-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a .env.local file and set your API endpoint:

```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run the development server

```bash
npm run dev
```

App will run at: http://localhost:3000

### Test Prediction

- Upload a valid MRI scan (JPG/PNG).
- Wait for the analysis result.
- See prediction, confidence, and optional heatmap.
