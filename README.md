# 🚀 User Contact Management App

I’ve built a **User Management & Contact Management System** using **Node.js, Express, MongoDB, and JWT authentication**. This app allows users to **sign up, log in, and manage their contacts securely**.

---

## 🌟 Features

### **1️⃣ User Authentication (Signup & Login)**
- Users **sign up** with a **unique email and password**.
- Users **log in** and receive a **JWT token** for authentication.
- **Protected routes** ensure only authenticated users can access contacts.

### **2️⃣ Contacts CRUD Operations**
A **logged-in user** can:
- ✅ **Create** a new contact  
- ✅ **Read** (get) their saved contacts  
- ✅ **Update** their own contacts  
- ✅ **Delete** their own contacts  

🔹 **Multiple users can save the same contact**, but they **cannot see or modify contacts belonging to other users**.

---

## 🔑 **Key Components of This App**
### **1️⃣ Authentication (User Model & JWT)**
- Secure **password hashing** using `bcryptjs`.
- `jsonwebtoken (JWT)` for authentication.

### **2️⃣ Contacts (CRUD with User-Specific Access)**
- Each contact is linked to a specific user via `user_id`.
- **Contacts are private** to each user.
- Multiple users **can save the same contact**, but cannot access others' contacts.

---

## 📌 **API Endpoints**

| **Method** | **Route**               | **Functionality**           | **Auth Required?** |
|------------|-------------------------|-----------------------------|--------------------|
| `POST`     | `/api/users/register`    | User Signup                 | ❌ No  |
| `POST`     | `/api/users/login`       | User Login (Get JWT Token)  | ❌ No  |
| `GET`      | `/api/users/current`     | Get Logged-in User Info     | ✅ Yes |

| **Method** | **Route**               | **Functionality**          | **Auth Required?** |
|------------|-------------------------|----------------------------|--------------------|
| `POST`     | `/api/contacts`          | Create Contact             | ✅ Yes |
| `GET`      | `/api/contacts`          | Get User’s Contacts        | ✅ Yes |
| `GET`      | `/api/contacts/:id`      | Get User Contact           | ✅ Yes |
| `PUT`      | `/api/contacts/:id`      | Update Contact             | ✅ Yes |
| `DELETE`   | `/api/contacts/:id`      | Delete Contact             | ✅ Yes |

---

## 🛠 **Technologies Used**
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (JSON Web Token), bcryptjs  
- **Environment Variables:** dotenv  
- **Validation & Error Handling:** Express Middleware  

---
