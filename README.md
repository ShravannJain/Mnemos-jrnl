# Mnemos-jrnl 📓

A personal journaling REST API built with **Spring Boot** and **MongoDB**. This project is a learning journey into building scalable backend systems, focusing on CRUD operations, database relationships, and (eventually) secure authentication.

## 🚀 Current Project Status
This project is currently **under active development**. 

### Completed Features:
- [x] **User Management**: Create, Read, Update, and Delete (CRUD) operations for users.
- [x] **Journaling System**: Core logic for managing journal entries.
- [x] **Database Integration**: Fully integrated with MongoDB using Spring Data MongoDB.
- [x] **Relational Mapping**: implemented `@DBRef` to link Journal Entries to specific Users.
- [x] **Lombok Integration**: Used to reduce boilerplate code (Getters, Setters, etc.).

### 🛠 Tech Stack
- **Backend:** Java 17+, Spring Boot 3.x
- **Database:** MongoDB (NoSQL)
- **Build Tool:** Maven
- **Libraries:** Spring Web, Spring Data MongoDB, Lombok

---

## 🏗 Project Architecture
The project follows a standard layered architecture:
- **Controller Layer**: Handles HTTP requests and returns responses.
- **Service Layer**: Contains business logic (the "brains" of the app).
- **Repository Layer**: Interfaces with MongoDB using Spring Data.
- **Entity Layer**: Defines the data models (`Users`, `JournalEntry`).

---

## 🚦 Getting Started

### Prerequisites
- JDK 17 or higher
- MongoDB (Running locally or on Atlas)
- Maven

### Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShravannJain/Mnemos-jrnl.git
   cd Mnemos-jrnl/mnemos
   ```

2. **Configure Database:**
   Update `src/main/resources/application.properties` with your MongoDB URI:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/mnemosdb
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

---

## 🗺 Roadmap (Learning Goals)
- [ ] **Security**: Implement BCrypt password hashing.
- [ ] **Authentication**: Add Spring Security for JWT-based auth.
- [ ] **Validation**: Add request body validation (e.g., ensuring usernames aren't empty).
- [ ] **Error Handling**: Implement a Global Exception Handler for cleaner API responses.
- [ ] **Testing**: Write JUnit and Mockito tests for the Service layer.

---

## 📜 License
This project is for educational purposes. Feel free to explore and learn along!
