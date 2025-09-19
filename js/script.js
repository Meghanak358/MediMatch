document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav items
    document.querySelectorAll('nav ul li a').forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            navMenu.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'scale(1)';
            });
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active');
                c.style.opacity = '0';
            });
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            tabContent.classList.add('active');
            
            // Animate content appearance
            setTimeout(() => {
                tabContent.style.opacity = '1';
            }, 10);
        });
    });
    
    // Symptom Checker Functionality
    const symptoms = [
        "Headache", "Fever", "Cough", "Fatigue", "Nausea", 
        "Dizziness", "Chest pain", "Shortness of breath", 
        "Abdominal pain", "Joint pain", "Rash", "Sore throat",
        "Muscle aches", "Chills", "Runny nose", "Sneezing",
        "Swelling", "Back pain", "Diarrhea", "Constipation",
        "Blurred vision", "Hearing loss", "Insomnia", "Anxiety",
        "Depression", "Palpitations", "Weight loss", "Weight gain"
    ];
    
    const symptomsList = document.getElementById('symptoms-list');
    const symptomInput = document.getElementById('symptom-input');
    const addSymptomBtn = document.getElementById('add-symptom');
    let selectedSymptoms = [];
    
    // Display symptoms
    function displaySymptoms(filter = '') {
        symptomsList.innerHTML = '';
        const filteredSymptoms = symptoms.filter(symptom => 
            symptom.toLowerCase().includes(filter.toLowerCase()));
        
        filteredSymptoms.forEach(symptom => {
            const isSelected = selectedSymptoms.includes(symptom);
            const symptomElement = document.createElement('div');
            symptomElement.className = `symptom-tag ${isSelected ? 'selected' : ''}`;
            symptomElement.innerHTML = `
                ${symptom}
                <i class="fas fa-${isSelected ? 'times' : 'plus'}"></i>
            `;
            symptomElement.addEventListener('click', () => {
                if (isSelected) {
                    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
                } else {
                    selectedSymptoms.push(symptom);
                }
                displaySymptoms(symptomInput.value);
            });
            symptomsList.appendChild(symptomElement);
        });
    }
    
    // Initial display of symptoms
    displaySymptoms();
    
    // Filter symptoms based on input
    symptomInput.addEventListener('input', () => {
        displaySymptoms(symptomInput.value);
    });
    
    // Add new symptom
    addSymptomBtn.addEventListener('click', () => {
        if (symptomInput.value.trim() && !symptoms.includes(symptomInput.value.trim())) {
            symptoms.push(symptomInput.value.trim());
            selectedSymptoms.push(symptomInput.value.trim());
            symptomInput.value = '';
            displaySymptoms();
        }
    });
    
    symptomInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && symptomInput.value.trim() && !symptoms.includes(symptomInput.value.trim())) {
            symptoms.push(symptomInput.value.trim());
            selectedSymptoms.push(symptomInput.value.trim());
            symptomInput.value = '';
            displaySymptoms();
        }
    });
    
    // Symptom checker functionality
    const checkSymptomsBtn = document.getElementById('check-symptoms');
    const symptomResults = document.getElementById('symptom-results');
    const conditionResults = document.getElementById('condition-results');
    const specialistResults = document.getElementById('specialist-results');
    const symptomSpinner = document.getElementById('symptom-spinner');
    const bookFromResultsBtn = document.getElementById('book-from-results');
    
    checkSymptomsBtn.addEventListener('click', () => {
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const details = document.getElementById('symptom-details').value;
        
        if (!age || !gender || selectedSymptoms.length === 0) {
            showAlert('Please fill in all required fields and select at least one symptom.', 'error');
            return;
        }
        
        // Show loading spinner
        symptomSpinner.style.display = 'flex';
        symptomResults.style.display = 'none';
        
        // Simulate AI processing delay
        setTimeout(() => {
            // Hide spinner and show results
            symptomSpinner.style.display = 'none';
            symptomResults.style.display = 'block';
            
            // Generate mock AI results based on symptoms
            const conditions = generateMockConditions(selectedSymptoms);
            const specialists = generateMockSpecialists(conditions);
            
            // Display conditions
            conditionResults.innerHTML = '';
            conditions.forEach(condition => {
                const conditionElement = document.createElement('div');
                conditionElement.className = 'result-item';
                conditionElement.innerHTML = `
                    <h4>${condition.name}</h4>
                    <p>${condition.description}</p>
                    <div class="confidence-meter">
                        <div class="confidence-level" style="width: 75%"></div>
                    </div>
                    <p>Confidence: ${condition.confidence}%</p>
                `;
                conditionResults.appendChild(conditionElement);
            });
            
            // Display specialists
            specialistResults.innerHTML = '';
            specialists.forEach(specialist => {
                const specialistElement = document.createElement('div');
                specialistElement.className = 'result-item';
                specialistElement.innerHTML = `
                    <h4>${specialist.specialty}</h4>
                    <p>Recommended for: ${specialist.recommendedFor.join(', ')}</p>
                `;
                specialistResults.appendChild(specialistElement);
            });
            
            // Animate confidence meters
            document.querySelectorAll('.confidence-level').forEach(meter => {
                const width = meter.style.width;
                meter.style.width = '0';
                setTimeout(() => {
                    meter.style.width = width;
                }, 100);
            });
            
            // Scroll to results
            setTimeout(() => {
                symptomResults.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }, 2000);
    });
    
    // Book from results button
    bookFromResultsBtn.addEventListener('click', () => {
        // Switch to appointment tab
        document.querySelector('.tab[data-tab="appointment-planner"]').click();
        
        // Try to auto-select specialty based on recommended specialists
        const firstSpecialist = document.querySelector('#specialist-results .result-item h4');
        if (firstSpecialist) {
            const specialty = firstSpecialist.textContent.toLowerCase();
            const specialtySelect = document.getElementById('appointment-specialty');
            
            for (let i = 0; i < specialtySelect.options.length; i++) {
                if (specialtySelect.options[i].value && 
                    specialty.includes(specialtySelect.options[i].value)) {
                    specialtySelect.value = specialtySelect.options[i].value;
                    break;
                }
            }
            
            // Trigger change event to load doctors
            specialtySelect.dispatchEvent(new Event('change'));
        }
    });
    
    // Mock AI function to generate conditions based on symptoms
    function generateMockConditions(selectedSymptoms) {
        const conditionsDatabase = [
            {
                name: "Common Cold",
                description: "Viral infection of the upper respiratory tract",
                symptoms: ["Cough", "Sore throat", "Runny nose", "Sneezing", "Fever"],
                confidence: 0
            },
            {
                name: "Influenza (Flu)",
                description: "Viral infection affecting the respiratory system",
                symptoms: ["Fever", "Cough", "Muscle aches", "Fatigue", "Chills"],
                confidence: 0
            },
            {
                name: "Migraine",
                description: "Neurological condition characterized by intense headaches",
                symptoms: ["Headache", "Nausea", "Dizziness", "Blurred vision"],
                confidence: 0
            },
            {
                name: "Allergic Reaction",
                description: "Immune system response to a foreign substance",
                symptoms: ["Rash", "Sneezing", "Runny nose", "Swelling"],
                confidence: 0
            },
            {
                name: "Gastroenteritis",
                description: "Inflammation of the stomach and intestines",
                symptoms: ["Nausea", "Diarrhea", "Abdominal pain", "Fever"],
                confidence: 0
            },
            {
                name: "Anxiety Disorder",
                description: "Mental health disorder characterized by feelings of worry or fear",
                symptoms: ["Anxiety", "Palpitations", "Insomnia", "Fatigue"],
                confidence: 0
            }
        ];
        
        // Calculate confidence for each condition based on symptom matches
        conditionsDatabase.forEach(condition => {
            const matchedSymptoms = condition.symptoms.filter(symptom => 
                selectedSymptoms.includes(symptom));
            const matchPercentage = (matchedSymptoms.length / condition.symptoms.length) * 100;
            condition.confidence = Math.min(Math.round(matchPercentage + (Math.random() * 20)), 95);
        });
        
        // Sort by confidence and return top 3
        return conditionsDatabase.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
    }
    
    // Mock AI function to generate specialists based on conditions
    function generateMockSpecialists(conditions) {
        const specialistsDatabase = [
            {
                specialty: "General Practitioner",
                recommendedFor: ["Common Cold", "Influenza (Flu)", "Gastroenteritis"]
            },
            {
                specialty: "Neurologist",
                recommendedFor: ["Migraine"]
            },
            {
                specialty: "Allergist",
                recommendedFor: ["Allergic Reaction"]
            },
            {
                specialty: "Psychiatrist",
                recommendedFor: ["Anxiety Disorder"]
            },
            {
                specialty: "Cardiologist",
                recommendedFor: ["Palpitations", "Chest pain"]
            },
            {
                specialty: "Dermatologist",
                recommendedFor: ["Rash", "Swelling"]
            }
        ];
        
        // Get all condition names
        const conditionNames = conditions.map(c => c.name);
        
        // Find specialists that match any of the conditions
        const recommendedSpecialists = specialistsDatabase.filter(specialist => 
            specialist.recommendedFor.some(condition => 
                conditionNames.includes(condition)));
        
        return recommendedSpecialists;
    }
    
    // Appointment Planner Functionality
    const specialtySelect = document.getElementById('appointment-specialty');
    const findDoctorsBtn = document.getElementById('find-doctors');
    const doctorsList = document.getElementById('doctors-list');
    const backToSpecialtyBtn = document.getElementById('back-to-specialty');
    const backToDoctorBtn = document.getElementById('back-to-doctor');
    const confirmAppointmentBtn = document.getElementById('confirm-appointment');
    const newAppointmentBtn = document.getElementById('new-appointment');
    
    // Sample doctors data
    const doctorsDatabase = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "cardiologist",
            specialtyName: "Cardiologist",
            image: "images/doctor1.jpg",
            rating: 4.8,
            bio: "Board certified cardiologist with 15 years of experience in treating heart conditions.",
            availableDays: [1, 2, 3, 4], // Monday to Thursday
            location: "MediMatch Heart Center, Floor 3"
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialty: "dermatologist",
            specialtyName: "Dermatologist",
            image: "images/doctor2.jpg",
            rating: 4.6,
            bio: "Specializes in skin conditions and cosmetic dermatology. 10 years of experience.",
            availableDays: [2, 3, 4, 5], // Tuesday to Friday
            location: "MediMatch Skin Clinic, Floor 2"
        },
        {
            id: 3,
            name: "Dr. Emily Wilson",
            specialty: "neurologist",
            specialtyName: "Neurologist",
            image: "images/doctor3.jpg",
            rating: 4.9,
            bio: "Expert in neurological disorders with a focus on migraine treatment.",
            availableDays: [1, 3, 5], // Monday, Wednesday, Friday
            location: "MediMatch Neurology Center, Floor 4"
        },
        {
            id: 4,
            name: "Dr. Robert Garcia",
            specialty: "general",
            specialtyName: "General Practitioner",
            image: "images/doctor4.jpg",
            rating: 4.7,
            bio: "Primary care physician with broad experience in family medicine.",
            availableDays: [0, 1, 2, 3, 4, 5], // Monday to Saturday
            location: "MediMatch Primary Care, Floor 1"
        },
        {
            id: 5,
            name: "Dr. Lisa Park",
            specialty: "pediatrician",
            specialtyName: "Pediatrician",
            image: "images/doctor5.jpg",
            rating: 4.8,
            bio: "Specializes in child health and development. Gentle approach with young patients.",
            availableDays: [1, 2, 4, 5], // Monday, Tuesday, Thursday, Friday
            location: "MediMatch Children's Center, Floor 2"
        },
        {
            id: 6,
            name: "Dr. David Miller",
            specialty: "orthopedist",
            specialtyName: "Orthopedist",
            image: "images/doctor6.jpg",
            rating: 4.5,
            bio: "Orthopedic surgeon specializing in joint pain and sports injuries.",
            availableDays: [3, 4, 5, 6], // Wednesday to Saturday
            location: "MediMatch Orthopedic Center, Floor 3"
        }
    ];
    
    // Enable find doctors button when specialty is selected
    specialtySelect.addEventListener('change', function() {
        findDoctorsBtn.disabled = !this.value;
    });
    
    // Find doctors button click
    findDoctorsBtn.addEventListener('click', function() {
        const specialty = specialtySelect.value;
        if (!specialty) return;
        
        // Move to doctor selection step
        changeAppointmentStep('step-doctor');
        
        // Filter doctors by specialty
        const filteredDoctors = doctorsDatabase.filter(doctor => doctor.specialty === specialty);
        
        // Display doctors
        doctorsList.innerHTML = '';
        filteredDoctors.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            doctorCard.dataset.doctorId = doctor.id;
            doctorCard.innerHTML = `
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-image">
                <div class="doctor-info">
                    <div class="doctor-name">${doctor.name}</div>
                    <div class="doctor-specialty">${doctor.specialtyName}</div>
                    <div class="doctor-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(doctor.rating))}
                        ${doctor.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(doctor.rating))}
                        ${doctor.rating}
                    </div>
                    <div class="doctor-bio">${doctor.bio}</div>
                    <button class="btn btn-primary select-doctor">
                        <i class="fas fa-calendar-alt"></i> Select Doctor
                    </button>
                </div>
            `;
            doctorsList.appendChild(doctorCard);
        });
        
        // Add event listeners to select buttons
        document.querySelectorAll('.select-doctor').forEach(button => {
            button.addEventListener('click', function() {
                const doctorCard = this.closest('.doctor-card');
                const doctorId = parseInt(doctorCard.dataset.doctorId);
                const doctor = doctorsDatabase.find(d => d.id === doctorId);
                
                // Set selected doctor and show scheduler
                currentDoctor = doctor;
                document.getElementById('selected-doctor-image').src = doctor.image;
                document.getElementById('selected-doctor-name').textContent = doctor.name;
                document.getElementById('selected-doctor-specialty').textContent = doctor.specialtyName;
                document.getElementById('selected-doctor-rating').innerHTML = `
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(doctor.rating))}
                    ${doctor.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(doctor.rating))}
                    ${doctor.rating}
                `;
                
                // Initialize calendar with doctor's availability
                initializeCalendar(doctor);
                
                // Move to schedule step
                changeAppointmentStep('step-schedule');
            });
        });
    });
    
    // Back to specialty button
    backToSpecialtyBtn.addEventListener('click', function() {
        changeAppointmentStep('step-specialty');
    });
    
    // Back to doctor button
    backToDoctorBtn.addEventListener('click', function() {
        changeAppointmentStep('step-doctor');
    });
    
    // Change appointment step
    function changeAppointmentStep(stepId) {
        document.querySelectorAll('.appointment-step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(stepId).classList.add('active');
    }
    
    // Calendar functionality
    const calendarMonth = document.getElementById('calendar-month');
    const calendarDates = document.getElementById('calendar-dates');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlots = document.getElementById('time-slots');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let currentDoctor = null;
    let selectedDate = null;
    let selectedTime = null;
    
    // Initialize calendar
    function initializeCalendar(doctor) {
        renderCalendar(currentMonth, currentYear, doctor);
        
        // Month navigation
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear, doctor);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear, doctor);
        });
    }
    
    // Render calendar
    function renderCalendar(month, year, doctor) {
        // Set month and year in header
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                           "July", "August", "September", "October", "November", "December"];
        calendarMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and total days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Clear previous dates
        calendarDates.innerHTML = '';
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day disabled';
            calendarDates.appendChild(emptyCell);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            const isAvailable = doctor.availableDays.includes(dayOfWeek);
            const isPast = date < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            
            const dayCell = document.createElement('div');
            dayCell.className = `calendar-day ${!isAvailable || isPast ? 'disabled' : ''}`;
            dayCell.textContent = day;
            
            if (isAvailable && !isPast) {
                dayCell.addEventListener('click', function() {
                    // Remove selected class from all days
                    document.querySelectorAll('.calendar-day').forEach(cell => {
                        cell.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked day
                    this.classList.add('selected');
                    
                    // Set selected date and show time slots
                    selectedDate = date;
                    renderTimeSlots();
                    
                    // Enable confirm button if time is already selected
                    if (selectedTime) {
                        confirmAppointmentBtn.disabled = false;
                    }
                });
            }
            
            calendarDates.appendChild(dayCell);
        }
    }
    
    // Render time slots
    function renderTimeSlots() {
        timeSlots.innerHTML = '';
        selectedTime = null;
        confirmAppointmentBtn.disabled = true;
        
        // Generate time slots from 9AM to 5PM every 30 minutes
        for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = timeString;
                
                timeSlot.addEventListener('click', function() {
                    // Remove selected class from all time slots
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        slot.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked time slot
                    this.classList.add('selected');
                    selectedTime = timeString;
                    
                    // Enable confirm button
                    confirmAppointmentBtn.disabled = false;
                });
                
                timeSlots.appendChild(timeSlot);
            }
        }
    }
    
    // Confirm appointment
    confirmAppointmentBtn.addEventListener('click', function() {
        if (!selectedDate || !selectedTime) {
            showAlert('Please select a date and time for your appointment.', 'error');
            return;
        }
        
        // Format date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString('en-US', options);
        
        // Set confirmation details
        document.getElementById('confirmation-doctor').textContent = currentDoctor.name;
        document.getElementById('confirmation-specialty').textContent = currentDoctor.specialtyName;
        document.getElementById('confirmation-date').textContent = formattedDate;
        document.getElementById('confirmation-time').textContent = selectedTime;
        document.getElementById('confirmation-location').textContent = currentDoctor.location;
        
        // Move to confirmation step
        changeAppointmentStep('step-confirmation');
    });
    
    // New appointment button
    newAppointmentBtn.addEventListener('click', function() {
        // Reset and go back to specialty selection
        specialtySelect.value = '';
        findDoctorsBtn.disabled = true;
        selectedDate = null;
        selectedTime = null;
        currentDoctor = null;
        changeAppointmentStep('step-specialty');
    });
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    sliderPrev.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonialCards.length - 1;
        showTestimonial(newIndex);
    });
    
    sliderNext.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialCards.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialCards.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
    
    // Show alert function
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }
    
    // Initialize the first testimonial
    showTestimonial(0);
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('a[href="#login"]').addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "login.html"; // or "/login"
    });

    document.querySelector('a[href="#register"]').addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "register.html"; // or "/register"
    });
   
     document.querySelector('a[href="#doctors"]').addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "doctors.html";
    });
     document.querySelector('a[href="#appointments"]').addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "appointments.html";
    });
     document.querySelector('a[href="#about"]').addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "about.html";
    });
});

