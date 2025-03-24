# 🚚 Baggage Transport 

**🚀 Secure and scalable backend system for luggage transportation services**

## 📚 Table of Contents
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Features](#-features)
- [🐳 Docker Deployment](#-docker-deployment)
- [📦 Local Development](#-local-development)
- [📝 License](#-license)

## 🛠 Tech Stack

### Core Technologies
| Component          | Technology               |
|--------------------|--------------------------|
| Runtime            | Node.js 18+             |
| Framework          | Express 4.x             |
| Database ORM       | Prisma 5.20             |
| Authentication     | JWT + Bcrypt            |
| Validation         | Joi 17.x                |
| File Upload        | Multer 1.4              |
| Containerization   | Docker 20.x             |

### Development Tools
| Tool               | Purpose                  |
|--------------------|--------------------------|
| TypeScript 5.6     | Type checking            |
| Nodemon            | Hot reloading            |
| Prisma Studio      | Database visualization   |

## 🚀 Features

### Core Functionality
- **User Authentication** (JWT + Bcrypt)
- **Booking Management System**
- **File Upload Handling** (Multer)
- **CORS Security Configuration**
- **Data Validation** (Joi schemas)

### Advanced Features
- **Role-based Access Control** (Admin, User)
- **Email Notifications** (SendGrid)
- **Payment Gateway Integration** (Stripe)
- **Real-time Chat Support** (Socket.io)

## 🐳 Docker Deployment

1. **Build Docker Image**
    ```bash
    docker build -t baggage-transport .
    ```
2. **Run Docker Container**
    ```bash
    docker run -p 3000:3000 baggage-transport
    ```

## 📦 Local Development

1. **Install Dependencies**
    ```bash
    npm install
    ```
2. **Run Development Server**
    ```bash 
    npm run dev
    ```
3. **Run Prisma Migrations**
    ```bash
    npx prisma migrate dev
    ```



## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
---

## 📬 Contact

For any questions, feel free to contact me:

- **Email**: [aboulouafareda@gmail.com]
- **LinkedIn**: [Reda Aboulouafa](www.linkedin.com/in/reda-aboulouafa-993a11220)
