HumanityHub is a humanitarian donation platform that enables users to donate to active campaigns through Stripe payment integration. 
The project consists of an HTML, CSS, and JavaScript frontend hosted on GitHub Pages and an ASP.NET Core backend hosted on Azure App Service. (https://github.com/LeonJ12/HumanityHub-Backend)

## Tech Stack
- Layered Architecture (N-Tier)
  
### Frontend
- **HTML/CSS/JavaScript** — JS, no frameworks
- **GitHub Pages** — Static hosting
- Session storage, Weather and Time API

### Backend
- **ASP.NET Core 10** — REST API - Layered Architecture
- **Entity Framework Core 10** — ORM
- **PostgreSQL (Neon)** — Cloud database
- **Npgsql** — PostgreSQL driver for .NET
- **Stripe.net** — Payment processing
- **Swashbuckle** — Swagger/OpenAPI documentation

### Infrastructure
- **Azure App Service (Windows, F1 Free)** — Backend hosting
- **Neon** — Serverless PostgreSQL hosting
- **Stripe** — Payment gateway (Checkout + Webhooks)
- **GitHub Actions** — CI/CD pipeline



