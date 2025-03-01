# SmartConsult - Frontend

🚀 A full-stack consultation booking system built with **Next.js 14 (App Router), React 18, TypeScript, ShadCN UI, and Cypress for testing**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Components:** ShadCN, Radix UI, Lucide Icons
- **Validation:** Zod, React Hook Form
- **State Management:** React Hooks
- **Testing:** Cypress
- **Deployment:** Cloudflare Pages

---

## 📈 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Dhineshdhinu07/SmartConsult.git
cd SmartConsult
```

### 2️⃣ Create a Next.js 14 Project with TypeScript
```sh
npx create-next-app@14 frontend --ts --use-npm
cd frontend
```

### 3️⃣ React Version 18
```sh
npm install react@18 react-dom@18
```

### 4️⃣ Install Required Dependencies
```sh
npm install shadcn-ui @radix-ui/react-icons lucide-react
npm install zod react-hook-form @hookform/resolvers
npm install cypress --save-dev  # For testing
```

### 5️⃣ Set Up ShadCN UI
```sh
npx shadcn@latest init
```
- Choose **TypeScript**
- Select **App Router**
- Use `src/components/ui` as the directory

### 6️⃣ Configure TypeScript Strict Mode
Edit `tsconfig.json` and set:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 7️⃣ Set Up Environment Variables
Create a `.env.local` file:
```sh
NEXT_PUBLIC_API_URL="http://127.0.0.1:8787"
```

### 8️⃣ Start the Development Server
```sh
npm run dev
```
🔗 **Visit:** `http://localhost:3000`

---

## ✅ Testing with Cypress
To run Cypress tests:
```sh
npx cypress open
```

---

## 📈 Features

- 📝 **User Authentication** (JWT-based login/register)
- 📅 **Consultation Booking** (File upload + Payment)
- 🔎 **Search, Filter, and Pagination** (Bookings List)
- ⚡ **Admin Dashboard** (Manage bookings, edit, delete)
- 💳 **Payment Processing** (Cashfree API)
- 🎥 **Meeting Integration** (Zoho Meet API)
- 🌚 **Dark Mode Toggle** (Optional)

---

## 🚀 Deployment Guide

### 1️⃣ Build for Production
```sh
npm run build
npm run start
```

### 2️⃣ Deploy to Cloudflare Pages
1. Create a **Cloudflare Pages** project.
2. Connect your GitHub repository.
3. Set the build command:
   ```
   npm run build
   ```
4. Set the output directory:
   ```
   .next
   ```
5. Deploy! 🎉

---

## 📈 Folder Structure
```
frontend/
│── public/               # Static assets
│── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Next.js page routes
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│── .env.local            # Environment variables
│── package.json          # Dependencies & scripts
│── tsconfig.json         # TypeScript config
│── README.md             # Project documentation
```

---

## 📈 API Endpoints (Backend Integration)

### **Authentication**
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive JWT token

### **User Actions**
- `POST /booking` – Book a consultation
- `GET /bookings` – View user bookings
- `PUT /booking/:id` – Edit a booking
- `DELETE /booking/:id` – Delete a booking

### **Admin Actions**
- `GET /admin/bookings` – View all bookings
- `PUT /admin/booking/:id` – Update booking status
- `DELETE /admin/booking/:id` – Delete a booking

---

## 🛠️ Troubleshooting

🤔 **Next.js version issue?**  
Reinstall with:
```sh
npx create-next-app@14 frontend --ts --use-npm
```

🤔 **React version incorrect?**  
Force downgrade:
```sh
npm install react@18 react-dom@18 --legacy-peer-deps
```

🤔 **ShadCN UI not working?**  
Reinstall:
```sh
npx shadcn@latest init
```

---

## 📄 Contributions
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to GitHub (`git push origin feature-branch`)
5. Open a **Pull Request**

---
