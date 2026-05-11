# Phase 4 — Backend Integration & Production Readiness

## Objective
Transition the application from mock data to real Backend API integration using JWT authentication via Http-only cookies.

## Tasks
1.  **Configure API Environments**: Setup environment variables for API URL.
2.  **Setup API Gateway Client**: Implement centralized `api-client` using Axios.
3.  **Implement JWT Cookie Logic**: Handle authentication flow with secure cookies.
4.  **Transition: Mock -> API**: Update React Query hooks to use real API endpoints.
5.  **Implement Auth Guard**: Protect restricted routes.
6.  **Global Error Handling**: Implement centralized API error management.

## Deliverables
- Functional authentication flow (Login/Logout/Refresh).
- API client configured with Base URL and Interceptors.
- All product/cart data fetched from real API endpoints.
- Error handling middleware.
