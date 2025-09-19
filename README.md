# 🏥 MediMatch - AI Healthcare Assistant

MediMatch is a modern web-based healthcare assistant designed to help patients connect seamlessly with doctors.  
It provides AI-assisted symptom analysis, appointment scheduling, and access to verified medical professionals.

---

## 🔗 Live Demo

[View MediMatch](https://meghanak358.github.io/MediMatch/)

---

## 📂 Project Structure

The project contains the following files:

- **index.html** – Main homepage with AI-powered Symptom Checker, Appointment Planner, Features, and Testimonials :contentReference[oaicite:0]{index=0}  
- **about.html** – About page describing MediMatch’s mission, vision, and services :contentReference[oaicite:1]{index=1}  
- **appointments.html** – Multi-step appointment booking workflow (Specialty → Doctor → Date/Time → Confirmation) :contentReference[oaicite:2]{index=2}  
- **doctors.html** – List of doctors with specialties, experience, and hospital details :contentReference[oaicite:3]{index=3}  
- **login.html** – Login form (validates against stored credentials in localStorage) :contentReference[oaicite:4]{index=4}  
- **register.html** – Registration form (stores credentials in localStorage) :contentReference[oaicite:5]{index=5}  

---

## 🚀 Features

- **AI Symptom Checker** – Enter symptoms to receive possible conditions and recommended specialists.  
- **Appointment Booking** – Step-by-step flow to select specialty, doctor, date & time, and confirm appointments.  
- **Doctor Directory** – View detailed profiles of certified doctors with experience and hospital info.  
- **User Authentication** – Simple login/registration system using localStorage.  
- **Responsive Design** – Works on desktop and mobile devices.  

---

## ⚙️ Setup Instructions

1. Clone or download this repository.  
2. Place all files in the same directory (ensure `index.html` is the entry point).  
3. Open `index.html` in your browser.  
4. To test login/registration:  
   - Register a new account via `register.html`.  
   - Login with the same credentials via `login.html`.  

---

## 📸 Screenshots (Optional)

- Home page with AI Symptom Checker.  
- Appointment booking steps.  
- Doctor listing page.  

---

## 📌 Notes

- Currently, the login/registration system uses **localStorage** and is **not secure** for production use.  
- For real-world deployment, integrate with a backend (Node.js, Django, or Flask) and a database (MySQL, MongoDB, etc.).  
- Appointment and doctor data can be connected to APIs for real-time updates.  

---

## 📜 License

This project is for **educational/demo purposes only** and is not intended for real-world medical use.  
