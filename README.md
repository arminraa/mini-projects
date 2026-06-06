# Mini Projects

A collection of small frontend projects built with modern React ecosystem tools.

---

## ⚙️ Setup

Before running Tanstack-Practice project, you must start the JSON server:

```bash
npx json-server server/db.json
```

This will provide the fake REST API used by the project.

---

## 📁 Projects

### 1. Draggable Todo App (Next.js + Zustand)

A simple todo application built with **Next.js** and **Zustand** state management.

#### Features:

* Add todos
* Drag and drop todos to reorder them
* Global state management using Zustand

---

### 2. React App (TanStack Query)

A React application demonstrating data fetching and server-state management using **TanStack Query**.

#### Home Page

After opening the app, you will see three sections:

* Todos
* Products
* Comments

---

### 📝 Todos Page

* Uses **TanStack Query + JSON Server**
* Add new todos with title and description
* Data is synced with the server

---

### 📦 Products Page

* Implements **infinite scrolling**
* Uses TanStack Query for fetching data
* Click **Load More** to fetch additional products

---

### 💬 Comments Page

* Displays a list of comments
* Uses **pagination with TanStack Query**
* Navigate through pages of comments

---

## 🚀 Tech Stack

* Next.js
* React
* Zustand
* TanStack Query
* JSON Server

---

## ▶️ How to Run

1. Start JSON server for Tanstack project:

```bash
npx json-server server/db.json
```

2. Run each project separately:

```bash
npm install
npm run dev
```

---

## 📌 Notes

This project is built for learning purposes to practice state management, server-state handling, and API integration with modern React tools.
