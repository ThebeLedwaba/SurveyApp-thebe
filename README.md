# 🌱 Lifestyle Survey App (MERN Stack)

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success)

A modern survey application that collects lifestyle preferences and provides real-time statistics visualization. Built with the MERN stack (MongoDB, Express, React, Node.js) with emphasis on clean UI and data integrity.

## ✨ Features

- **Interactive Survey Form** with animated transitions
- **Real-time Statistics Dashboard** showing survey aggregates
- **Responsive Design** works on desktop & mobile
- **Data Validation** both client-side and server-side
- **Persistent Storage** using MongoDB Atlas
- **Modern UI** with gradient backgrounds and card-based layout

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React | Interactive UI components |
| Axios | HTTP client for API calls |
| Chart.js | Data visualization |
| Tailwind CSS | Modern styling utility classes |
| Framer Motion | Smooth animations |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express | Web application framework |
| Mongoose | MongoDB object modeling |
| Express-validator | Input sanitization |
| CORS | Cross-origin resource sharing |

### Database
| Technology | Purpose |
|------------|---------|
| MongoDB | NoSQL document storage |
| MongoDB Atlas | Cloud database service |

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ThebeLedwaba/lifestyle-survey-mern.git
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
cd ../client
npm install
npm start
Access the application
Frontend: http://localhost:3000
API Server: http://localhost:5001
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submits survey form
    Frontend->>Backend: POST /api/surveys
    Backend->>Database: Validate & Save
    Database-->>Backend: Success confirmation
    Backend-->>Frontend: 201 Created
    Frontend->>User: Show success message
    
    User->>Frontend: Requests statistics
    Frontend->>Backend: GET /api/statistics
    Backend->>Database: Aggregate data
    Database-->>Backend: Statistics
    Backend-->>Frontend: 200 OK with data
    Frontend->>User: Visualize results
 Development Roadmap
Current Features
Multi-field survey form

Data validation pipeline

Statistics dashboard

Responsive layout

Planned Improvements
User authentication (JWT)

Real-time updates with Socket.io

PDF report generation

Admin dashboard

Multi-language support
 Known Issues
Mobile Safari sometimes has animation glitches
Form submission loading state needs improvement
Chart tooltips occasionally misalign
   cd lifestyle-survey-mern

