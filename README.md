MERN Lifestyle Survey App
A simple and responsive survey application built using the MERN stack. Users can submit lifestyle preferences, and the system calculates summary statistics based on the data collected.

📁 Project Structure
lifestyle-survey-mern-thebe/
├── survey-backend/
│   ├── controllers/
│   │   └── surveyController.js
│   ├── models/
│   │   └── Survey.js
│   ├── routes/
│   │   └── surveyRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   └── index.html
└── README.md
🚀 Technologies Used
Frontend:

HTML – Structure

CSS – Styling, responsiveness, gradients, and animations

JavaScript – Form handling and Axios for API communication

Backend:

Node.js & Express.js – API development

Express-validator – Server-side input validation

Database:

MongoDB – Data storage and retrieval

Development Tools:

Visual Studio Code

Live Server (for frontend preview)

Bandicam (for demo screen recording)

🛠️ Development Process
UI Design: Created two main screens using HTML and styled them with CSS to include gradient backgrounds, animations, and a card-based layout.

Backend Setup: Built RESTful APIs using Node.js and Express.js, and connected to MongoDB using Mongoose.

Validation: Implemented both client-side and server-side validation for robust data integrity, including checks for age (5–120) and rating (1–5).

Testing & Debugging: Tested each module (form submission, database save, stats retrieval) thoroughly and iteratively refined the codebase.

Enhancements: Added the “Pasta” option as a late addition to fully align with all food preference criteria.

⚙️ Challenges & Solutions
Validation Consistency:
Ensuring age and rating constraints were enforced on both the frontend and backend. Solved by applying the same validation rules in JavaScript and Express-validator.

Design Adjustments:
Longer stat labels affected the layout. Fixed using responsive CSS styling—flexible card heights and proper text wrapping.

Port Mismatch:
Axios initially pointed to port 5000 while the backend was running on 5001. Corrected by updating all API URLs.

Audio Quality in Demo:
The voice in the demo was too low. Adjusted microphone settings in Bandicam to resolve the issue.

🔮 Future Improvements
Real-Time Updates:
Implement WebSockets or polling to update stats without needing to refresh or switch tabs.

User Authentication:
Introduce a login system to personalize survey submissions (noting exemption from POPI Act requirements for this academic demo).

Mobile Optimization:
Improve touch responsiveness and layout on mobile devices.

Data Export:
Add functionality to export survey responses as CSV for further analysis.

🔧 Setup Instructions
Set environment variables:

bash
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
PORT=5001
Start the backend:

bash
Copy
Edit
cd survey-backend
npm install
npm start
Run the frontend:

Open frontend/index.html in your browser using Live Server (e.g. http://127.0.0.1:5500/frontend/index.html)