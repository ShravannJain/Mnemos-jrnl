# Mnemos-jrnl

Welcome to the Mnemos-jrnl project! This is a personal journaling application built with Spring Boot for the backend and React for the frontend.

## Project Status
This project is currently under development and serves as a demonstration of full-stack development.

## Current Version Snapshot
<img width="1600" height="1280" alt="image" src="https://github.com/user-attachments/assets/29d38622-ae45-489d-b695-fe5a75fa5aef" />

## Key Features
- Journaling: Create, read, update, and delete journal entries.
- User Authentication: Secure user accounts.
- Modern UI: A clean and intuitive user interface.

## Tech Stack
- **Backend:** Java, Spring Boot
- **Frontend:** React, Vite
- **Database:** MongoDB

## Getting Started

### Prerequisites
*   Java Development Kit (JDK) 17+
*   Maven
*   MongoDB (running locally or accessible via MongoDB Atlas)
*   Node.js and npm (or yarn)

### Backend Setup
1.  Clone the repository:
    ```bash
    git clone https://github.com/ShravannJain/Mnemos-jrnl.git
    cd Mnemos-jrnl/mnemos
    ```
2.  Configure your MongoDB connection in `src/main/resources/application.properties`. Replace the placeholder with your actual MongoDB URI:
    ```properties
    spring.data.mongodb.uri=mongodb://localhost:27017/mnemosdb 
    ```
3.  Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd ../mnemos-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install 
    # or
    # yarn install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```

---

## Learning & Development
This project was a great way to learn about building full-stack applications.
