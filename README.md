# HumanityHub - Full Stack Web App

HumanityHub is a full-stack humanitarian donation platform that allows users to support active campaigns through secure Stripe payment processing.
The project consists of a static frontend built with HTML, CSS, and JavaScript hosted on GitHub Pages, and an ASP.NET Core backend API hosted on Azure App Service.

Backend repository:
https://github.com/LeonJ12/HumanityHub-Backend

# Live Demo
https://leonj12.github.io/HumanityHub/

## Tech Stack
  
### Frontend
- **HTML/CSS/JavaScript**
- Vanilla JavaScript, functionalities
- Session storage for client-side state
- Weather and Time API integration

### Backend
- **ASP.NET Core 10** — REST API - Layered Architecture
- **Entity Framework Core 10** — ORM
- **PostgreSQL (Neon)** — Cloud database
- **Npgsql** — PostgreSQL driver for .NET
- **Stripe.net** — Payment processing
- **Swashbuckle** — Swagger

### Infrastructure
- **GitHub Pages** — Frontend hosting
- **Azure App Service (Windows, F1 Free)** — Backend hosting
- **Neon** — Serverless PostgreSQL hosting
- **Stripe** — Payment gateway (Checkout + Webhooks)
- **GitHub Actions** — CI/CD pipeline

## Features

### Frontend

- Mobile-friendly and fully responsive
- Browse active humanitarian campaigns
- Dynamic campaign cards rendered from backend API data
- Select a campaign and navigate to the donation page
- Client-side form validation for donor name, email, and donation amount
- Session Storage is used to persist selected campaign data between pages
- Stripe Checkout redirection after successful payment session creation
- Real-time weather and local time display for campaign locations using external APIs
- Responsive navigation with hamburger menu
- Scroll-to-top button for improved user experience
- Dynamic DOM rendering using Vanilla JavaScript
- Fetch API used for asynchronous communication with backend services

### Backend

**Campaign Management**
- Campaign CRUD — create, retrieve, update, and delete campaigns
- Automatic campaign deactivation when `CurrentAmount >= GoalAmount`

**Donation Management**
- Retrieve donations
- Delete donations
- Donation creation handled via `IPaymentService` abstraction
  
**Payment Integration**
- Stripe Checkout integration for a secure hosted payment page
- Webhook handling for automatic donation processing
- Donations are created only after successful payment confirmation

**Security**
- API Key middleware protecting admin endpoints
- Stripe signature validation for secure webhook processing
- Data annotations validation for automatic request validation
- Rate Limiter protects an app from abuse by limiting the number of requests a user or client can make in a given time period.

**Error Handling**
- Global exception handler middleware
- Custom exception hierarchy (`NotFoundException`, `BadRequestException`, `ConflictException`)
- Standardized error responses using RFC 7807 `ProblemDetails`

**Code Quality**
- Interface-based services for loose coupling
- Manual DTO mapping using extension methods
- Layered architecture (`Controllers → Services → DbContext`)

#### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/campaign` | Public | Get all campaigns with donations |
| POST | `/api/campaign` | API Key | Create a new campaign |
| PUT | `/api/campaign/{id}` | API Key | Update an existing campaign |
| DELETE | `/api/campaign/{id}` | API Key | Delete a campaign |

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/donation` | API Key | Get all donations |
| DELETE | `/api/donation/{id}` | API Key | Delete a donation |

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payment/checkout` | Public | Create Stripe Checkout Session |
| POST | `/api/payment/webhook` | Stripe Signature | Handle Stripe payment confirmation |

## Author
**Leon Jerković** — Student at FERIT, Osijek


