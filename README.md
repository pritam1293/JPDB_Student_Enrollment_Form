## Project Title: Student Enrollment Form using JsonPowerDB
A simple, dynamic, and responsive student enrollment form built with HTML, JavaScript, and JsonPowerDB for storing student details in a database with real-time validation, control flow, and DB integration.

## Table of Contents

- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Illustrations](#illustrations)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Project Status](#project-status)
- [Sources](#sources)
- [Other Information](#other-information)


## Description:
This project enables you to store and manage student information, including Roll Number, Full Name, Class, Birth Date, Address, and Enrollment Date, in the `STUDENT-TABLE` of the `SCHOOL-DB` using JsonPowerDB. It provides create, read, and update functionalities through a sleek web interface with real-time validation logic based on the existence of the primary key (Roll No).

## Benefits of using JsonPowerDB
- It is lightweight, which maximizes data processing performance, minimizes development costs, and reduces total ownership costs.
- It has high performing capability
- No external setup needed, easy to plug-and-play
- Supports real-time update and retrieval
- It also supports various types of data models, and offers fast CRUD operations due to in-memory indexing
- It also provides high security because it has secured token-based REST APIs

## Release History:
- Version: 1.0.0
- Date: 29/05/2025
- Description: Initial release with full form functionality


## Illustrations
![Student Enrollment Form UI](https://github.com/user-attachments/assets/d3fd947f-3588-47a0-ba73-0a1cd01bc324)
*Figure 1: UI of the Student Enrollment Form*

## Scope of Functionalities

- Form auto-resets on load or button click
- `Roll No` based validation as primary key
- Enable/Disable buttons dynamically
- Save new entries if the Roll No doesn't exist
- Update existing entries if Roll No exists
- JSON validation to ensure no empty fields
- Integration with JsonPowerDB via REST API

## Examples of Use
To save new data

 let jsonObj = {
  rollNo: "102",
  fullName: "Jhon Doe",
  class: "XI",
  birthDate: "15/08/2008",
  address: "Mumbai",
  enrollmentDate: "29/05/2025"
};

let putObj = create_put_request(token, dbName, relationName, jsonStudentDataObj);

This will create the object, which will be saved in the database

## Project Status
Making a login page for valid customers to log in, and also working on deleting a student's data by entering the roll number

## Sources

- **JPDB Documentation:** [JSONPowerDB Docs](https://login2explore.com/jpdb/docs.html) for API references, usage examples, and integration guidelines.
- **Database Library:**  [jpdb-commons.js v0.0.3](https://login2explore.com/jpdb/) via [Login2Explore CDN](https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js) for interacting with JSONPowerDB (JPDB) APIs.
- **HTML Reference:** [HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML) from MDN Web Docs for standard HTML elements and usage guidelines.
- **JavaScript Reference:** [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript) from MDN Web Docs for core JavaScript concepts, syntax, and APIs.
- **CSS Framework:** [Bootstrap 5.3.0](https://getbootstrap.com/) via [jsDelivr CDN](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css) for responsive UI components and styling.
- **JavaScript Library:** [jQuery 3.5.1](https://jquery.com/) via [Google CDN](https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js) for simplified DOM manipulation and event handling.

## Other Information

- Database Name: SCHOOL-DB
- Table Name: STUDENT-TABLE
- Primary Key: Roll-No
- Ensure the token setup from [login2explore.com](https://login2explore.com/) is completed to run this project.

