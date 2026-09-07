# CityPulse – Smart Civic Issue Reporting System

CityPulse is a simple web-based civic issue reporting system that allows citizens to report common problems in their city, such as potholes, garbage, broken streetlights, water leaks, and traffic issues.

The system helps citizens submit complaints and allows administrators to view and manage reported issues.

## Features

* User registration and login
* Report civic issues
* Select issue category
* Add issue description and location
* Upload an image of the issue
* Get current location using GPS
* View submitted reports
* View complaint details
* Admin can view reported complaints
* Admin can update complaint status
* Simple and responsive user interface

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Bootstrap

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQLite

### APIs / Tools

* OpenStreetMap Nominatim API
* Browser Geolocation API
* Git & GitHub

## Project Structure

```text
CityPulse/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
│
├── .gitignore
└── README.md
```

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/pallavi-b28/citypulse.git
cd citypulse
```

## Backend Setup

Open a terminal and go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

## How It Works

1. A user registers or logs into CityPulse.
2. The user opens the **Report Issue** page.
3. The user selects the issue category.
4. The user enters the description and location.
5. The user can upload an image of the issue.
6. GPS location can be obtained using the browser's location service.
7. The complaint is submitted to the Django backend.
8. The administrator can view the complaint.
9. The administrator can update its status.
10. Users can view their submitted reports and their current status.

## Example Issues

CityPulse can be used to report:

* 🕳️ Potholes
* 💡 Broken streetlights
* 🗑️ Garbage problems
* 💧 Water leaks
* 🚦 Traffic-related issues
* 📍 Other civic issues

## Future Improvements

Some possible future improvements include:

* Email/SMS notifications
* Complaint priority detection
* Interactive city map
* AI-based issue classification
* Complaint analytics dashboard
* Mobile application
* Location-based complaint tracking

## Author

**Pallavi Bhat**

Computer Science and Business Systems

## License

This project is created for educational and project purposes.
