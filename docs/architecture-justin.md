# Sprint 3 Architecture (Justin Xia)

This document explains the Sprint 3 refactor for the **Community Board** feature using the hook–service–repository pattern.
The goal is to strictly separate concerns for the Community Post resource:
- **Hooks**: Manage UI state (loading, list of posts) and expose actions to components.
- **Services**: Handle business rules like validation and sorting.
- **Repositories**: Handle data access (currently in-memory test data).

---

## Hook: usePosts

### What does this do?
`usePosts` serves as the bridge between the UI and the data layer. It manages the following state:
- `posts`: The current list of community posts.
- `isLoading`: A boolean flag for UI loading states.
- `error`: To capture any failures during data fetching.

It exposes methods (`addPost`, `removePost`) that orchestrate the flow of data:
1. Call **Service** to validate input.
2. Call **Repository** to persist changes.
3. Refresh local state.

### Why is this logic in a hook?
This abstraction allows the `HomePage` component to remain purely presentational. The component doesn't need to know *how* data is fetched or validated; it just calls `addPost`. This logic is now reusable if we decide to show recent posts on other pages (e.g., a dashboard widget).

### Where is it used?
- `src/components/pages/HomePage.tsx`: Uses `posts` to render the list and `addPost`/`removePost` to handle user interactions.

**Files:**
- `src/hooks/usePosts.ts`

---

## Service: postService

### What does this do?
`postService` contains pure, stateless business logic for Community Posts:
- **Validation**: Ensures authors are not empty and messages meet minimum length requirements (`validatePost`).
- **Sorting**: Enforces that the newest posts appear first (`sortPostsByDate`).
- **Formatting**: Handles date object formatting for display (optional/future).

### Why is this logic in a service?
Business rules should be independent of the UI framework (React). By isolating validation and sorting here:
- We can easily unit test these rules without rendering components.
- We ensure consistent rules are applied regardless of which component adds a post.
- We prevent "spaghetti code" inside the Hook or Component.

### Where is it used?
- `src/hooks/usePosts.ts`: Calls `postService.validatePost` before attempting to add data to the repository.

**Files:**
- `src/services/postService.ts`

---

## Repository: postRepository

### What does this do?
`postRepository` abstracts the data layer. It provides asynchronous methods to interact with `CommunityPost` resources:
- `getAll()`: Retrieves posts (simulated async delay).
- `add(post)`: Persists a new post.
- `delete(id)`: Removes a post by ID.

Currently, it interacts with local **Test Data**, but it is designed to return Promises so it can be swapped for a real API/Database in Sprint 4 without breaking the app.

### Why is this logic in a repository?
This separates **Data Access** from **Presentation**. The UI does not know (and should not know) if the data comes from a hardcoded array, LocalStorage, or a remote SQL database. This satisfies the "Data Persistence" requirement (I.1).

### Where is it used?
- `src/hooks/usePosts.ts`: Calls repository methods to fetch and modify data.
- `src/testData/postTestData.ts`: The source of truth for the mock data.

**Files:**
- `src/repositories/postRepository.ts`
- `src/testData/postTestData.ts` (Test Data)
- `src/components/home/types/communitypost.ts` (Resource Type)