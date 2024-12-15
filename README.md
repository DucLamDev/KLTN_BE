<h1 align="center">
SUPPORT AND MANAGEMENT SYSTEM FOR MULTI-SPECIALTY CLINICS</h1>

[1. Member](#1-member)
[2. System Architecture](#2-system-architecture)
[3. Teck Stack](#3-teck-stack)
[4. Use Case Diagram](#4-use-case-diagram)
[5. Database Diagram](#5-database-diagram)
[6. Run project locally](#6-run-project-locally)

### 1. Member

- **Name:** Bui Tran Thien An. **Role:** Main Front-End Developer with some involvement in the Back-End.
- **Name:** Ho Duc Lam. **Role:** Main Back-End Developer and Business Logic Handler.

### 2. System Architecture

![](https://res.cloudinary.com/drqbhj6ft/image/upload/v1734289222/learning-webdev-blog/clinic/Client_echt9o.png)

### 3. Teck Stack

- **Front-End:** NextJS, Typescript, ShadCN/UI & TailwindCSS for styling, Clerk for authentication with Google Account, Next Auth for authentication and session handling, Zustand for state management, Uploadthing for image uploading and storage, Zod & React Hook Form for form validation and handling.
- **Back-End:** Node.js & Express.js for building APIs, MongoDB for database management, Apache Kafka for send message and queue management, Redis for caching, Docker, AWS EC2, JWT.
- **Deployment tools:** Vercel (FE), Nginx (BE).

### 4. Use Case Diagram

![](https://res.cloudinary.com/drqbhj6ft/image/upload/v1734289388/learning-webdev-blog/clinic/Use_Case_uuqas1.png)

### 5. Database Diagram

![](https://res.cloudinary.com/drqbhj6ft/image/upload/v1734277960/learning-webdev-blog/clinic/Database_Diagram_d0shvf.png)

### 6. Run project locally

1. Clone git

```
git init
git clone https://github.com/DucLamDev/KLTN_BE.git
```

2. Install packages

```
npm i
```

1. Create ".env" file in root folder

```
<!-- MongoDB -->
MONGODB_URI =

PORT = 3000

<!-- Redis -->
PASSREDIS =
HOSTREDIS =
PORTREDIS = 18656
REDIS_HOST=redis
REDIS_PORT=6379

<!-- Kafka -->
KAFKA_BROKERS =

<!-- Jwt -->
JWT_SECRET=
JWT_EXPIRES_IN=
COOKIE_EXPIRES_IN=

NODE_ENV=development
```

4. Run application

```
npm start
```
