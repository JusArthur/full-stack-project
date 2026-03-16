# Sprint 3 Architecture (Home Page Refactor)

This document explains the Hook-Service-Repository pattern implemented for the Community Board on the Home Page.

## Hook: useCommunityPosts

* **What does it do?** It acts as the bridge for the UI. It stores the `posts` array in state, manages loading/error states, and exposes `addPost` and `removePost` functions to the React components.
* **Why this logic?** It handles React-specific presentation logic (`useState`, `useEffect`) so the components stay clean. It orchestrates calls to the service (for validation) and the repository (for data fetching/saving).
* **Where is it used?** Invoked in `src/components/pages/HomePage.tsx`.

## Service: communityPostService

* **What does it do?** It handles purely business logic: it validates new posts (ensuring names are >2 characters and fields aren't empty) and constructs the final post object (generating an ID and timestamp).
* **Why this logic?** This isolates our business rules from our UI components. If we ever want to change validation rules or how a post object is structured, we only have to change it here. It has no knowledge of React or how data is stored.
* **Where is it used?** Invoked inside the `useCommunityPosts` hook.

## Repository: communityPostRepository

* **What does it do?** It provides CRUD methods (`getAll`, `create`, `delete`) to interact with the mock test data source.
* **Why this logic?** It isolates data-access. When we switch to a real back-end API in the next sprint, we only have to update this repository file. The rest of the application will not need to change.
* **Where is it used?** Invoked inside the `useCommunityPosts` hook.
