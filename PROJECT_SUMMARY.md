# Recipe Management System - Project Summary

## 1. Project Overview
The **Recipe Management System** is a responsive, modern full-stack web application that allows users to discover, create, view, edit, and manage recipes. Designed with a clean and visually premium interface, it enables food enthusiasts to organize their culinary adventures, specify ingredients and detailed preparation steps, browse by tags, and even link to YouTube video tutorials.

---

## 2. Technical Architecture
The system follows a separated frontend-backend architecture with a REST API interface:

- **Frontend**: React + Vite Single Page Application (SPA)
- **Backend**: Django REST Framework (DRF)
- **Interface**: REST API over HTTP with Axios

---

## 3. Technology Stack

### Backend (Python & Django)
- **Framework**: Django & Django REST Framework (DRF)
- **Database**: SQLite3 (Local storage)
- **Media Storage**: Django Media Storage for handling recipe image uploads.
- **Security & Authentication**: Token-based authentication using Django's security middleware.

### Frontend (Modern JavaScript)
- **Framework**: React.js with **Vite** as the fast build tool.
- **Styling**: Tailwind CSS (Fully responsive, clean gradients, modern typography, and curated color palettes).
- **Icons & Visuals**: Premium food-themed images pulled dynamically and curated UI design tokens.
- **Routing**: React Router DOM (Declarative routing, protected user routes).
- **State Management**: React Context API for global Authentication.

---

## 4. Key Database Models

### User Model
Extends Django's `AbstractBaseUser` and `PermissionsMixin` for secure user authentication:
- `email`: Primary identifier (Username).
- `name`: User's display name.
- `password`: Hashed securely via Django's authentication backends.

### Recipe Model
- `title`: Name of the dish.
- `description`: Textual introduction or context.
- `instructions`: Step-by-step cooking steps.
- `cooking_time`: Estimated duration in minutes.
- `price`: Average cost to prepare.
- `tags`: Many-to-Many relationship with Tag model.
- `youtube_url`: Optional link to an external tutorial, dynamically rendered as an embedded video on the frontend.
- `image`: Cover photo of the dish.

### Ingredient Model
- `name`: Ingredient name.
- `quantity`: Measurement or quantity of that ingredient.
- `recipe`: ForeignKey pointing back to the recipe (Cascade delete on recipe removal).

### Tag Model
- `name`: Unique tag string used for categorizing and searching (e.g., *Vegetarian*, *Dessert*).

---

## 5. Core Application Features

### 1. User Authentication
- Complete sign-up, sign-in, and sign-out flows.
- Use of secure tokens for authorization in the HTTP headers.
- **Route Protection**: Prevents unauthenticated users from accessing protected actions like creating, updating, or deleting recipes.

### 2. Comprehensive Recipe Listing
- Clean, searchable, and filterable UI for discovering recipes.
- Beautiful dynamic Unsplash placeholders as fallbacks and elegant cards that wow the audience.
- Filtering by categories/tags.

### 3. Detailed Recipe View
- Beautiful Hero image.
- Organized dual columns: Sidebar for **Ingredients**, and main body for **Description**, **Preparation Instructions**, and **Embedded YouTube Video Player**.

### 4. Interactive Recipe Management
- Dynamic creation forms allowing users to add/delete ingredients on-the-fly using a single page.
- Direct image uploads and customizable tags selection.

---

## 6. How to Run & Present (Steps for the Demo)

### A. Run Backend
1. Initialize Python environment and install dependencies:
   ```bash
   pip install -r backend_requirements.txt
   ```
2. Run database migrations:
   ```bash
   python manage.py migrate
   ```
3. Start Django Server:
   ```bash
   python manage.py runserver
   ```

### B. Run Frontend
1. Navigate to project root, install packages, and start dev server:
   ```bash
   npm install
   npm run dev
   ```

### C. Live Presentation Strategy
- **Flow 1**: Start by opening the Recipe list page to show the clean UI and existing recipe data.
- **Flow 2**: Sign up or log in to a user account.
- **Flow 3**: Add a new recipe with tags, cooking times, ingredients, instructions, and paste a YouTube link.
- **Flow 4**: View the new recipe, showing the auto-embedded video tutorial.
- **Flow 5**: Highlight the responsiveness of the application by showing it on desktop and mobile viewports.
