# Be Bold Beauty Store

A responsive beauty e-commerce landing page enhanced with interactive JavaScript features and Vercel serverless APIs.

## Live Project

- Live site: [https://ecommerce-beauty-products.vercel.app](https://ecommerce-beauty-products.vercel.app)
- GitHub repo: [https://github.com/Amisha65/E-Commerce-Website--Beauty-Products](https://github.com/Amisha65/E-Commerce-Website--Beauty-Products)

## Features

- Responsive hero section with refined product-card overlap layout
- Interactive product showcase with category filters and live search
- Shopping bag drawer with localStorage persistence
- Newsletter form with backend validation
- Consultation form with backend validation
- Fallback storefront data if the product API is unavailable
- Static frontend deployed with Vercel production hosting
- Serverless backend endpoints for product, subscribe, and contact actions

## Project Structure

```text
.
|-- api/
|   |-- _lib/catalog.js
|   |-- contact.js
|   |-- products.js
|   `-- subscribe.js
|-- images/
|-- home.html
|-- index.html
|-- media.css
|-- script.js
`-- style.css
```

## API Endpoints

- `GET /api/products`
  Returns product and category data for the storefront.

- `POST /api/subscribe`
  Validates newsletter email submissions.

- `POST /api/contact`
  Validates consultation form submissions.

## Local Development

1. Clone the repository.
2. Open the project folder in your editor.
3. Run Vercel locally if you want to test the serverless APIs:

```bash
npx vercel dev
```

4. Open the local URL shown by Vercel in your browser.

## Deployment

This project is configured to deploy on Vercel. Production updates are published to:

[https://ecommerce-beauty-products.vercel.app](https://ecommerce-beauty-products.vercel.app)

## Notes

- `home.html` redirects to `index.html`
- The shopping bag is client-side only and stored in browser localStorage
- Form endpoints currently validate and return responses, but do not store submissions in a database
