# ZephyraTech Client — Frontend

A modern, high-performance authentication interface built with **Next.js 16**, **React 19**, and **TypeScript**. Designed with a Glassmorphism aesthetic, real-time UX feedback loops, and a security-first routing architecture.

---

## Overview

The ZephyraTech frontend is a production-grade client application that interfaces with a Spring Boot REST API, providing a frictionless authentication experience without sacrificing security or visual quality. Every interaction — from password evaluation to token-gated routing — is handled with purpose.

---

## Features

**Glassmorphism UI**  
Crafted entirely with Tailwind CSS. Animated aurora orbs run in the background while frosted-glass card components sit in the foreground, creating a layered, depth-driven visual hierarchy.

**Real-Time Password Strength Meter**  
Client-side evaluation as the user types. Regex patterns assess complexity across three axes: character length, symbol usage, and character variety. Feedback is immediate and color-coded — Red → Orange → Green — before a single network request is made.

**Protected Routing**  
The Dashboard is a hard gate. Without a valid JWT present in application state, access is denied. No workarounds, no flash of unauthorized content.

**Centralized API Client**  
An Axios instance handles all HTTP communication. Base URL configuration, interceptors, and error normalization are defined once and consumed everywhere — clean separation between transport logic and UI concerns.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| HTTP Client | Axios |

---

## Prerequisites

- Node.js `v18` or higher
- A package manager: `npm`, `yarn`, or `pnpm`

---

## Getting Started

**1. Navigate to the frontend directory**
```bash
  cd frontend
```

**2. Install dependencies**
```bash
  npm install
```

**3. Start the development server**
```bash
  npm run dev
```

The application will be running at `http://localhost:3000`.

---

## Project Structure
```
frontend/
├── app/                  # Next.js App Router — layouts, pages, and routing
├── lib/                  # Axios instance and shared utilities
├── public/               # Static assets
```

---

## Notes

- Ensure the Spring Boot backend is running and reachable on port 8080 before starting the client.
- JWT tokens are persisted securely in localStorage to maintain sessions across page refreshes.
- All password strength validation runs client-side to provide instant UI feedback, while the backend enforces strict validation as the final source of truth.

---

*Built as part of the ZephyraTech Authentication Task.*