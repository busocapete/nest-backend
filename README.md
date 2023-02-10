# Billing API Pay As You Go / Inclusive Volume

Write billing API.
Two pricing models: Pay-As-You-Go, Inclusive Volume
Pricing model per organisation.
Inclusive-Volume: Each SIM has a minimum commitment
Task for candidate: Please provide list of all shortcomings + ideas for future improvements (inline comments)!

    - Security, Security, Security
        - CORS
        - Rate Throttling
        - Api-key / secret Header
        - Authentication - Authorization
        - Short lived tokens & refresh tokens
        - Roles / Policies
        - MFA
        - Device Management, i.e. devices that can access
        - input validation on all endpoints
    - Versioning
        - Especially if ever to be used on mobile devices
            users don't update apps often enough
    - Dynamic pricing models
    - automation of cdr entities from devices
    - more detailed currency support
    - comprehesive subscription management APIs
    - reporting & analytics - internal & external
    - Payment gateway integrations
    - User management
    - Possibly implement caching
    - pagination - bill months, sims / cdrs?
    - pagination links - nextpage / previous page links in json repsonse
    - custom headers
        -api keys
        - response shaping (full, hateoas)
    - database migrations with ORM

# To Start:

- install docker, postman
- docker-compose up

# Run Tests with test db - resets to seed data when launched

- cd app
- npm run test:e2e

# Run dev database - data persists unless docker volume manually removed

- cd app
- npm run start:dev

# Quests take as much as you like:

- change port served to 8000
- create an endpoint which gives you the bill for a specific organisation
  - 'http://localhost:8000/api/v1/organisations/2/bill
- implement an approach do different currency's
  -'http://localhost:8000/api/v1/organisations/2/bill?currency=EUR'
  available curencies are EUR, GBP, USD
- provide an approach to implement to Inclusive volume (each Org has an inclusive volume when it exceeds it is charged as before)
  - inclusive volume for organisation 1 & 2
    - i.e
      -'http://localhost:8000/api/v1/organisations/1/bill'
      -'http://localhost:8000/api/v1/organisations/2/bill'
  - payg with no inclusive volume for organisation 3
    -'http://localhost:8000/api/v1/organisations/3/bill'

# Business logic for bill calculation

Found in /app/organisation/organisation-subscriber.ts

Logic to convert currencies in /app/bill/bill-controller && /app/bill/bill-service.ts
