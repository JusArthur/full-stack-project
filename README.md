# Full Stack Project

## Team Hortons

### Team Members

- Fan Luo
- Justin Xia
- Yunfei Wu

---

## Project Description

This project is a restaurant web app inspired by the Tim Hortons website, created by Team Hortons. Users can browse the menu, view detailed information about food and drink items, and search or filter to quickly find their favorites. The app aims to provide a simple, modern, and user-friendly experience for exploring a restaurant’s offerings.

### High-Level User Stories

1. **As a user, I want to browse the menu, so that I can see all available food and drink items.**
2. **As a user, I want to view detailed information about each menu item, so that I can make informed choices.**
3. **As a user, I want to filter or search menu items, so that I can quickly find what I’m looking for.**

---

## Local Setup

To run this application locally, you must configure both the frontend and backend environments.

### 1. Environment Variables

You must create `.env` files in both the frontend and backend directories.

**Backend (`/backend/.env`):**

```env
DATABASE_URL="your_postgresql_database_connection_string"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

**Frontend (`/frontend/.env`):**

```env
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
```

### 2. Install Dependencies

Before running the application, make sure you install the necessary packages for both sides of the project.

Open a terminal in the `/backend` directory and run:

```bash
npm install
```

Then, open a terminal in the `/frontend` directory and run:

```bash
npm install
```

### 3. Data Setup

Once your environment variables are configured and dependencies are installed, open a terminal in the `/backend` directory and run the following commands to initialize your local database:

```bash
# Sync the Prisma schema with your database
npx prisma db push

# Seed the database with the initial menu items
npm run db:seed
```

### 4. Running the Application

To start the project, you will need to run the development servers for both the frontend and the backend simultaneously. Open two separate terminal windows:

- In the **backend** directory, run:

  ```bash
  npm run dev
  ```

- In the **frontend** directory, run:

  ```bash
  npm run dev
  ```

---

## Sprint 1 Kanban Contributions

The following Kanban items were completed or contributed to during this sprint:

- **G.1: Organize Your Group**  
  *Contributors:* Team

- **G.2: Pick a Theme**  
  *Contributors:* Team

- **O.1: Set Up CSS Framework**  
  *Contributors:* Team

- **T.1: Set Up Project Git Repository (P0)**  
  *Contributor:* Justin Xia

- **T.2: Project Initialization (P0)**  
  *Contributor:* Justin Xia

- **T.3: Project README (P1)**  
  *Contributor:* Fan Luo

- **T.4: App Integration (P2)**  
  *Contributor:* Fan Luo & Yunfei

- **T.5: App Stylesheet and Style Guide (P2)**  
  *Contributors:* Team (written by Yunfei Wu)

- **T.6: Team Vercel Account and Management (P0)**  
  *Contributor:* Justin Xia (with team support)

- **I.1: High-Level Components (P1)**  
  *Contributors:*  
  - Yunfei Wu: Header  
  - Fan Luo: Footer  
  - Justin Xia & Fan Luo: Menu  
  Team members collaborated and assisted each other with blockers.

- **I.2: Styling (P2)**  
  *Contributors:* Team  
  Each member styled their own components using the Tailwind Framework.

## Sprint 2 Kanban Contributions

The following Kanban items were completed or contributed to during this sprint:

- **T.1: Multi-page Navigation (P0)**  
  *Contributor:* Yunfei Wu

- **T.2: Navigation Interface(s) (P2)**  
  *Contributor:* Yunfei Wu

- **T.3: Shared State Across Pages (P0)**  
  *Contributor:* Justin Xia

- **I.1: Feature Pages (P1)**  
  *Contributors:*  
  - Fan Luo: Home Page  
  - Justin Xia: Menu Page  
  - Yunfei Wu: Order Page

- **I.2: Form Component (P1)**  
  *Contributors:*  
  - Fan Luo: Home Page  
  - Justin Xia: Menu Page  
  - Yunfei Wu: Order Page

- **I.3: Element Addition/Removal (P2)**  
  *Contributors:*  
  - Fan Luo: Home Page  
  - Justin Xia: Menu Page  
  - Yunfei Wu: Order Page

## Sprint 3 Kanban Contributions

The following Kanban items were completed or contributed to during this sprint:

- **T.1: Hook Definition(s) (P0)**
  *Contributors:* Team

- **T.2: Service Definition(s) (P0)**  
  *Contributors:* Team

- **T.4: Shared-page-state Refactor (P1)**  
  *Contributor:* Yunfei Wu

- **I.1: Repository Definition(s) and Integration (P0)**  
  *Contributors:*  
  - Fan Luo: src/repositories/communityPostRepository.ts
  - Justin Xia: src/repositories/menuReviewRepository.ts
  - Yunfei Wu: src/repositories/menuItemRepository.ts

- **I.2: Test Data (P1)**  
  *Contributors:*  
  - Fan Luo: src/testData/communityPostsTestData.ts
  - Justin Xia: src/testData/menuReviewsTestData.ts
  - Yunfei Wu: src/testData/menuItemsTestData.ts

- **I.3: New / Refactored Component(s) (P2)**  
  *Contributors:*  
  - Fan Luo: src/hooks/useCommunityPosts.ts
  - Justin Xia: src/hooks/useMenuReviews.ts
  - Yunfei Wu: src/hooks/useMenuItems.ts

- **I.4: Architectural Layout Document (P2)**  
  *Contributors:*  
  - Fan Luo: docs/architecture-FL.md
  - Justin Xia: docs/architecture-JX.md
  - Yunfei Wu: docs/architecture-yunfei.md

## Sprint 4 Kanban Contributions

The following Kanban items were completed or contributed to during this sprint:

- **T.1: Back-end App Initialization (P0)**  
  *Contributors:* Team

- **T.2: Development SQL Database (P0)**  
  *Contributors:* Team

- **T.3: Prisma Installation and Client Initialization (P1)**  
  *Contributors:* Team

- **T.4: Back-end CORS Configuration (P2)**  
  *Contributors:* Team

- **I.1: Back-end Resource Endpoint (P1)**  
  *Contributors:*
  - Fan Luo: Home Page / Community Post Endpoints  
  - Justin Xia: Menu Page / Review Endpoints  
  - Yunfei Wu: Order Page / Menu Item Endpoints  

- **I.2: Resource Database Schema (P1)**  
  *Contributors:*
  - Fan Luo: Community Post Model & Migrations  
  - Justin Xia: Menu Review Model & Migrations  
  - Yunfei Wu: Menu Item Model & Migrations  

- **I.3: Front-end Repository sends requests to back-end (P2)**  
  *Contributors:*
  - Fan Luo: Home Page Repository Refactor  
  - Justin Xia: Menu Page Repository Refactor  
  - Yunfei Wu: Order Page Repository Refactor  

- **I.4: Application State Persistence (P2)**  
  *Contributors:*
  - Fan Luo: Home Page Persistence  
  - Justin Xia: Menu Page Persistence  
  - Yunfei Wu: Order Page Persistence

## Sprint 5 Kanban Contributions

The following Kanban items were completed or contributed to during this sprint:

- **T.1: Clerk Auth Setup (P0)**
  *Contributors:* Team

- **T.2: Team Vercel Account/Management (P0)**
  *Contributors:*
  - Team
  - Justin Xia: Owner

- **T.3: Back-end User Management (P0)**
  *Contributors:*
  - Team

- **T.4: User Login/Registration (P2)**
  *Contributors:*
  - Team

- **T.5: Local Setup Instructions (P2)**
  *Contributors:*
  - Fan

- **I.1: Custom User-Associated Data and Session Management (P1)**
  *Contributors:*
  - Fan Luo: Home Page / Community Post Endpoints  
  - Justin Xia: Menu Page / Review Endpoints  
  - Yunfei Wu: Order Page / Menu Item Endpoints

- **I.2: Project Retrospective (P2)**
  *Contributors:*
  - Team

## License

This project is licensed under the MIT License.
