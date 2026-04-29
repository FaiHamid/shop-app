# shop-app
# 🛒 Shop App (CRUD with Express)

## 🚀 Overview

**Shop App** is a simple backend application built with Express.js that demonstrates CRUD operations for managing orders.

The application follows the **MVC** (Model–View–Controller) pattern: routes/controllers handle HTTP, models describe data and business logic, and persistence is isolated from the presentation layer.

The database is accessed through **Sequelize** as the ORM (connection, models, migrations/queries).

The application allows you to create, read, update, delete, and filter orders using query parameters.

---

## 🗄️ Database

- **ORM:** Sequelize — define models, sync or migrate schema, query via Sequelize APIs.
- **Table `users`:** required; stores user accounts (fields such as `id` and any columns your domain needs).
- **Orders:** each order row includes **`userId`** — a foreign key referencing `users.id`, linking every order to a user.

---

## 👤 Users model (`users` table)

The **`users`** table must exist in the database. Each user typically has at least:

- `id` — unique identifier (primary key)
- `name` - string

Add users without registration.

---

## 📦 Order model

Each order has the following structure:

- `id` — unique identifier  
- `userId` — references the user who placed the order (`users.id`)  
- `date` — order creation date  
- `category` — product/category type  
- `cost` — order cost  

Example:

```json
{
  "id": "1",
  "userId": "42",
  "date": "2026-03-30",
  "category": "electronics",
  "cost": 250
}
```

## 🔧 Features

- Create User
   Add a new user

- Get Users
   Get all users
   Get one specific user

- Delete User
   Delete user and all related to him orders

- Create Order
   Add a new order

- Get Orders
   Get all orders
   Filter orders using query parameters

- Update Order
   Update an existing order by id

- Delete Order
   Remove an order by id


## 🔍 Filtering

You can filter orders using query parameters:

category — filter by category
dateFrom — start date
dateTo — end date

Example request:

GET /orders?category=electronics&dateFrom=2026-01-01&dateTo=2026-12-31
