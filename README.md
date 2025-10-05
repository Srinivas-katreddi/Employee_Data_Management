
#  Employee Data Management

##  Project Overview
The **Employee Data Management** project is a simple, web-based CRUD (Create, Read, Update, Delete) application that manages employee records.  
It is built using **HTML, CSS, and JavaScript**, and connected to **AWS services** — API Gateway, Lambda, and DynamoDB — to store and manipulate employee data securely.

Users can view all employees, add new ones, update existing records, or delete them through an easy-to-use interface.

---
<img width="1280" height="720" alt="Employee Data Management (1)" src="https://github.com/user-attachments/assets/7ab164c3-c7be-4c45-a2f3-91873b6d416c" />

## 🚀 Features
- ✅ **View Employees:** Displays all employee data fetched from DynamoDB via AWS API Gateway.  
- ➕ **Add Employee:** Redirects to a form to add new employee details.  
- ✏️ **Update Employee:** Allows users to update employee information by entering an Employee ID.  
- ❌ **Delete Employee:** Removes an employee record based on the entered Employee ID.  

---

## ⚙️ Project Structure
```

Employee_Data_Management/
│
├── index.html               # Displays all employee data
├── addEmployee.html         # Page to add a new employee
├── updateEmployee.html      # Page to update employee details
├── deleteEmployee.html      # Page to delete an employee
├── style.css                # CSS file for styling
├── script.js                # JavaScript file handling API calls
└── README.md                # Project documentation

````

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Srinivas-katreddi/Employee_Data_Management.git
````

### 2. Navigate to the Project Directory

```bash
cd Employee_Data_Management
```

### 3. Open the Application

You can open the `index.html` file directly in your browser:

* **Option 1:** Double-click `index.html`
* **Option 2 (Recommended):** Use a live server in VS Code:

  ```
  Right-click → "Open with Live Server"
  ```

### 4. AWS Configuration

Ensure that:

* AWS **API Gateway** endpoints are active and publicly accessible.
* Each endpoint connects to a **Lambda function** performing the respective CRUD operation on **DynamoDB**.
* **CORS** is enabled for all API routes to allow browser access.

---

## 🧪 Running Test Cases (Manual Testing)

Since this project is frontend-based, manual testing can be done through the browser:

### ➤ **1. View All Employees**

Open `index.html` → All employee records should appear from DynamoDB.

### ➤ **2. Add Employee**

Click **“Add Employee”** → Fill in the form → Submit → The new employee appears in DynamoDB and UI.

### ➤ **3. Update Employee**

Click **“Update Employee”** → Enter Employee ID → Modify details → Submit → Updated data reflects in DynamoDB.

### ➤ **4. Delete Employee**

Click **“Delete Employee”** → Enter Employee ID → Submit → Record gets deleted from DynamoDB.

Use browser console (F12 → Console tab) to verify API responses and logs.

---

## 💡 Assumptions & Design Choices

* 🌐 **Frontend-based App:** All CRUD logic handled via AWS backend services.
* 🔐 **CORS Enabled:** Required for browser requests to AWS API Gateway.
* ⚙️ **Stateless Design:** No session management or authentication; assumes internal trusted users.
* 🎨 **Simple UI:** Focused on core functionality, not complex UI frameworks.
* 🧩 **Error Handling:** Basic alerts and console messages used for success/error feedback.

---

## ☁️ Tech Stack

| Component   | Technology            |
| ----------- | --------------------- |
| Frontend    | HTML, CSS, JavaScript |
| Backend     | AWS Lambda (Node.js)  |
| Database    | AWS DynamoDB          |
| API Gateway | AWS API Gateway       |

---

## 👨‍💻 Author

**Sai Srinivas Katreddi**
📎 [GitHub Profile](https://github.com/Srinivas-katreddi)

---
