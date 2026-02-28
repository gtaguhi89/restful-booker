# Restful Booker API Automation 🧪

Automated API testing suite for the Restful Booker API built with Playwright and TypeScript.

This project contains end-to-end automated tests covering core REST API operations including creation, retrieval, update, and deletion of Booking data.

---

## 👩‍💻 Author

Taguhi Gegoghlanyan  
QA Automation Engineer | Playwright | API Testing 
GitHub: https://github.com/gtaguhi89

---

## 📌 Project Overview

The goal of this project is to automate tests for the Restful Booker API:

🔗 https://restful-booker.herokuapp.com

The suite covers:

- ✔ HTTP status code verification
- ✔ Proper CRUD (Create, Read, Update, Delete) workflows
- ✔ Response validation
- ✔ Header and schema checks
- ✔ Token authentication for secured endpoints

This automation suite is written in TypeScript and uses Playwright API testing for stability and readability.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Playwright | API automation framework |
| TypeScript | Strong typing & sustainable code |
| Node.js & npm | Dependency management |
| REST API testing | API validation logic |

---

## 📂 Project Structure


restful-booker/
│
├── tests/
│   ├── api/
│   │   └── booking_api.spec.ts
│
├── fixtures/
│   └── sample-data.json
│
├── playwright.config.ts
├── package.json
├── .gitignore
├── README.md
└── node_modules/

---

## 🔧 Installation

### 📥 1. Clone the repository

git clone https://github.com/karinegasesyan/restful-booker.git

### 📁 2. Navigate to project folder

cd restful-booker

### 📦 3. Install dependencies

npm install

### 📌 4. Install Playwright browsers (if required)

npx playwright install

## 🚀 Running Tests

### Run all tests

npx playwright test

### Run tests in UI mode

npx playwright test --ui

---

## 🧪 Test Coverage

### ✅ Create Booking

- Create a new booking
- Validate response payload
- Verify booking details

### ✅ Retrieve Booking

- Get booking list
- Retrieve booking by ID
- Validate response status & body

### ✅ Update Booking

- Modify booking data
- Validate updated fields
- Verify PUT & PATCH handling

### ✅ Delete Booking

- Delete a specific booking
- Verify success status

### ✅ Token Authentication

- Create and validate auth token
- Ensure secure endpoint access

---

## 🔎 Example Validations

Common assertions include:

- expect(response.status()).toBe(200)
- Check required fields in response body
- Validate returned JSON matches expected schema
- Verify DELETE returns appropriate code

---

## 🎯 Key Skills Demonstrated

This project highlights:

- API automation using Playwright
- End-to-end API flow coverage
- Authentication handling
- Test data management
- Clean, maintainable TypeScript code

---

## 📈 Project Benefits

This suite showcases essential QA automation competencies:

✔ Designing test workflows  
✔ Verifying backend service behavior  
✔ Writing scalable API tests  
✔ Combining authentication + CRUD operations

---

## 📫 Contact & Portfolio

Karine Gasesyan — QA Automation Engineer  
GitHub: https://github.com/gtaguhi89 

---

⭐ Feel free to explore the tests and connect for collaboration or questions!