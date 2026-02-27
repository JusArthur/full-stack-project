# Sprint 3 Architecture Documentation
**Author:** Justin Xia

This document outlines the architecture implemented for the Menu Page to satisfy the Hook-Service-Repository pattern. This structure enforces a strict separation of concerns between presentation logic, business logic, and data access.

## 1. Custom Hooks

### `useMenuReviews` (and `useMenuItems`)
* **What does this hook do?**
  These hooks act as the state-management and presentation bridge for the UI. For instance, `useMenuReviews` maintains the `reviews` array and `averageRating` in local React state, handles the side effect (`useEffect`) of fetching data when the component mounts, and exposes an `addReview` function to update that state.
* **How did you decide what logic to include?**
  Any logic that relies on React APIs (`useState`, `useEffect`) was placed here. By handling the component lifecycle and state updates inside the hook, the actual React components (`Menu.tsx`, `MenuItem.tsx`) are stripped of complex logic and are solely responsible for rendering the UI. The hook delegates data fetching to the repository and calculations to the service.
* **Where is this implementation used and how?**
  * `MenuItem.tsx`: Invokes `useMenuReviews(item.id)` to fetch and display the specific average rating and review count dynamically for a single menu item.
  * `Menu.tsx`: Invokes `useMenuReviews()` without an ID to fetch system-wide reviews globally for the header statistics, and uses `useMenuItems()` to map out the daily specials.

## 2. Services

### `menuReviewService` (and `cartService`)
* **What does this service do?**
  It contains strictly reusable business logic. `menuReviewService` calculates the numerical average rating from an array of review objects and validates user input for new reviews (checking rating ranges and comment lengths).
* **How did you decide what logic to include?**
  Business logic should be pure TypeScript functions with no dependencies on the UI (React) or the database (Data Access). If the rules for what constitutes a "valid" review change, or if we decide to implement a weighted average calculation, those changes happen strictly in this file. It isolates the "rules" of the application.
* **Where is this implementation used and how?**
  It is invoked inside the `useMenuReviews` hook. When a user tries to submit a new review, the hook first passes the data to `menuReviewService.validateReview()`. When the hook receives new data from the repository, it passes it through `menuReviewService.calculateAverageRating()` before setting the React state.

## 3. Repositories

### `menuReviewRepository` (and `menuItemRepository`)
* **What does this repository do?**
  It provides the standard CRUD (Create, Read, Update, Delete) data access methods for our external resources. Currently, it retrieves arrays and filters data from our static `menuReviewsTestData` and `menuItemsTestData` objects.
* **How did you decide what logic to include?**
  The repository is strictly for data access. It does not know anything about React state or application business rules. Creating this isolation layer means that when we swap out our static test data for a real backend API/database in the next module, we *only* have to update the fetch calls inside these repository files. The hooks, components, and services will remain completely untouched.
* **Where is this implementation used and how?**
  It is invoked by the custom hooks. For example, `useMenuReviews` calls `menuReviewRepository.getByMenuItemId(id)` inside its `useEffect` to retrieve the initial data payload required by the view.