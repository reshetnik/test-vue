# Another test project

### Requirements:

- Vue 3 (Composition API)
- Pinia
- Any UI library
- Tailwind CSS
- TypeScript
- Fully typed code

API: https://dummyjson.com/docs/products

---

### User story:

As a user I want to see a table of products. I should see following columns: name, description and price (formatted like $1 000.00). I should be able to search products using search field (type to search), switch to the next/prev page. Also I want to see current page number, total amount of pages and total number of products available (sum in DB).
Click on a row of the table should trigger opening a page with product details immediately (no data loading).
I should see just a few fields (name, description and price).
If I directly open non existing product I should see a toast message with error and redirected back to the list.
