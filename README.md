## 🧾 User Table with Infinite Scroll

This project is a full-stack web application that displays a paginated and searchable user list with infinite scroll and virtualization.

Built with:

- **Backend:** Node.js + Express
- **Frontend:** React + Vite + @tanstack/react-table + @tanstack/react-virtual

---

## 🛠️ Setup Instructions

### 🔙 Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```

   The server runs at:  
   📍 **http://localhost:5000**

---

### 🔜 Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

   The app runs at:  
   📍 **http://localhost:5173** (or as shown in terminal)

---

## ✨ Features Implemented

- ✅ Paginated API fetching (`/api/user?page=1&limit=50`)
- ✅ Infinite scroll with **manual scroll event + debounce**
- ✅ Search users by name or email (debounced)
- ✅ Sort by Name or Email columns
- ✅ Virtualized rendering of rows for performance
- ✅ Combined `Company (City)` field
- ✅ Phone number formatted as `+1-XXX-XXX-XXXX`
- ✅ Responsive design with clean CSS
- ✅ Graceful handling of loading, error, and empty states

---

## 📦 Technologies Used

| Category    | Stack/Libraries                          |
|-------------|-------------------------------------------|
| Backend     | Node.js, Express.js, JSON file            |
| Frontend    | React.js (Vite), CSS                      |
| Table       | @tanstack/react-table v8                  |
| Virtualizer | @tanstack/react-virtual                   |

---

## 📁 Folder Structure

```
markopolo/
├── backend/
│   ├── server.js
│   └── users.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── components/
│   │   │   └── UserTable.jsx
│   │   └── hooks/
│   │       └── usePaginatedUsers.js
```

---

## 📄 API Example

### ✅ Success
```
GET /api/user?page=1&limit=50
```

```json
{
  "data": [...],
  "total": 5000,
  "page": 1,
  "limit": 50
}
```

### ❌ Error
```json
{
  "error": "Invalid page or limit"
}
```

---

## ✅ Bonus Features Implemented

- Sorting
- Searching with debounce
- Manual scroll debounce
- Virtualized rendering
- Phone formatting
- Responsive styling
- Modular file structure

---

## 📬 Contact

For any queries or issues:

📧 **ashwakshaik15@gmail.com**
