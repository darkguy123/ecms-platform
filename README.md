# ECMS - Electronic Court Management System

This is a portable, high-performance Next.js implementation of the Electronic Court Management System (ECMS).

## 🚀 Deployment Guide (GitHub)

Follow these steps to upload your project to GitHub:

### 1. Create a GitHub Repository
1. Log in to your [GitHub account](https://github.com/).
2. Click the **"+"** icon in the top right and select **"New repository"**.
3. Name your repository (e.g., `ecms-platform`).
4. Keep it **Public** or **Private** based on your preference.
5. **Do not** initialize with a README, license, or gitignore (we already have them).
6. Click **"Create repository"**.

### 2. Push Code from your Terminal
Open your terminal in this project folder and run the following commands:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ECMS Portable Edition"

# Rename branch to main
git branch -M main

# Link to your GitHub repo (Replace <URL> with your actual repo link)
git remote add origin https://github.com/YOUR_USERNAME/ecms-platform.git

# Push to GitHub
git push -u origin main
```

### 3. Hosting on Vercel (Recommended)
1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **"Add New"** > **"Project"**.
3. Import your `ecms-platform` repository.
4. Vercel will automatically detect Next.js settings.
5. Click **"Deploy"**.

---

## 📂 Project Structure & Portability

- **Zero Database Dependency**: This version uses `src/data/site-data.ts` as the source of truth for all content. 
- **Easy Customization**: To change website text, simply edit the values in `src/data/site-data.ts`.
- **Admin Panel**: Accessible at `/admin`. Note that for a fully database-less experience on GitHub, changes should be made directly in the code files.
- **Styling**: Powered by Tailwind CSS and ShadCN UI.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: Lucide Icons, Radix UI (ShadCN)
- **AI Integration**: Genkit (Optional for SEO/Blog generation)
