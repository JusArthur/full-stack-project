# Sprint 3 Architecture (Yunfei Wu)

This document explains the Sprint 3 refactor using the hook–service–repository pattern.
The goal is to improve maintainability by separating concerns:
- **Hooks**: presentation / UI state logic
- **Services**: business rules
- **Repositories**: data access (currently test data; later API)

---

## Hook: useMenuItems

### What does this do?
`useMenuItems` loads menu items through the repository, then manages UI-friendly state:
- search term
- favorites (ids)
- derived lists: `filteredItems`, `favoriteItems`
- loading/error flags for UI rendering

### Why is this logic in a hook?
This logic is reused in more than one component (Menu + Orders) and is presentation-focused:
- it stores UI state (search term, favorites)
- it derives lists used directly by UI
It does **not** contain cart business rules and does **not** directly access test data (repository does).

### Where is it used?
- `src/components/menu/Menu.tsx`: uses `searchTerm`, `filteredItems`, `favoriteItems`, `toggleFavorite` to render menu UI.
- `src/components/pages/OrdersPage.tsx`: uses `filteredItems` to render “Add from Menu” buttons.

Files:
- `src/hooks/useMenuItems.ts`

---

## Service: cartService

### What does this do?
`cartService` defines cart business logic as pure functions:
- add an item (merge quantity if exists)
- update quantity (+/- with remove at 0)
- remove an item
- calculate cart count and total price

### Why is this logic in a service?
These are reusable business rules that should not live inside React components:
- services are easier to test and reuse
- no React state / rendering
- no data access

### Where is it used?
- `src/components/layout/CartContext.tsx`: state is stored in context, but updates/totals are calculated via `cartService`.
- `src/components/cart/CartDrawer.tsx`: total price is calculated using `cartService.getTotalPrice(cartItems)`.

Files:
- `src/services/cartService.ts`

---

## Repository: menuItemRepository

### What does this do?
`menuItemRepository` provides CRUD-like methods for menu items.
For Sprint 3 it reads from local **test data** (TypeScript array), but the rest of the app does not depend on where the data comes from.

### Why is this logic in a repository?
All external data access should be centralized so we can later replace test data with API calls without changing UI components.
This keeps components and hooks focused on UI/presentation.

### Where is it used?
- `src/hooks/useMenuItems.ts`: calls `menuItemRepository.getAll()` to load items.

Files:
- `src/repositories/menuItemRepository.ts`
- `src/components/menu/data/menuData.ts` (test data source)
- `src/components/menu/types/menu.ts` (resource type)
