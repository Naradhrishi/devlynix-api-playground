# 🛠️ API Playground

A lightweight, browser-based API testing tool built for **Devlynix Buildathon 2.0**.

## 🚀 Live Demo
https://api-playground-v1.vercel.app/

## ✨ Features
- Send GET, POST, PUT, DELETE, PATCH requests
- Set custom headers and request body
- View formatted JSON responses with syntax highlighting
- Request history saved locally
- Reload request URL and body from history panel

## 🧰 Tech Stack
- React.js + Vite
- Tailwind CSS
- Axios
- Zustand
- React Syntax Highlighter

## 🧪 Quick Testing Guide
To verify the multi-header and dynamic payload parsing capabilities of this playground, you can test using the following mock endpoint:

- **Method:** `GET`
- **URL:** `https://jsonplaceholder.typicode.com/users`

- **Method:** `POST`
- **URL:** `https://jsonplaceholder.typicode.com/posts`
- **Headers:** 
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer devlynix_token_2026`
- **Body:**
```json
  {
    "title": "Devlynix Multi-Header Test",
    "body": "Testing multiple headers simultaneously.",
    "userId": 1
  }

## 🏃 Run Locally
Clone the project:
\```bash
git clone https://github.com/Naradhrishi/devlynix-api-playground.git
\```

Install dependencies:
\```bash
npm install
\```

Start the dev server:
\```bash
npm run dev
\```

## 👨‍💻 Built By
Naradhrishi — Devlynix Buildathon 2.0