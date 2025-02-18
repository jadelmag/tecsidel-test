# TECSIDEL TEST

Develop a small React application using Typescript, leveraging any necessary tools to expedite the development process. The application should meet the following requirements:

- Retrieve 100 rows of data from the specified API (https://fakerapi.it/api/v1/books?_quantity={count}&_locale=es_ES).

- Present the data in a tabular format with a simplistic design, excluding the 'id' and 'image' fields.

- Show author "avatar" in the first column, get a random avatar image from https://robohash.org/{hash} using the author name as hash.

- Offer the option to color alternate rows for improved readability.

- Enable users to delete individual rows and provide a feature to restore the initial state, allowing for the recovery of all deleted rows.

- Implement error handling to address any potential issues that may arise.

- Incorporate a filtering mechanism that allows users to search data by author, with debouncing to prevent excessive rendering on each keystroke.

- Enable sorting functionality(alphabetically for author and title) by clicking on column headers and ensure that unnecessary renders are avoided when adjusting sorting or filtering options.

## Implementation

- React application created with vite and Typescript. Implemented hexagonal architecture with SOLID principles.

- Added Unit Tests.
