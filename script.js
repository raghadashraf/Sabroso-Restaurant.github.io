// Sign IN/ Sign Up js

setTimeout(function () {
    document.getElementById("login-form").style.display = "block";
}, 2000); // 5 seconds in milliseconds

document.getElementById("login-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior of link
    document.getElementById("signup-form").style.display = "none"; // Hide signup form
    document.getElementById("login-form").style.display = "block"; // Show login form
});

// Function to show the signup form and hide the login form
function showSignupForm() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Event listener for the "Sign up" link
document.getElementById("signup-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior of link
    showSignupForm(); // Call the function to show the signup form
});

// Function to validate the signup form
function validateSignupForm() {
    var password = document.getElementById("signup-password").value;
    if (password.length < 8) {
        document.getElementById("password-error").innerText = "Password must be at least 8 characters long.";
        return false;
    }
    var phoneNumber = document.querySelector("#signup-form input[name='phone']").value;
    if (phoneNumber.length !== 11) {
        document.getElementById("phone-error").innerText = "Phone number must be 11 characters long.";
        return false;
    }

    var userData = {
        username: document.querySelector("#signup-form input[name='username']").value,
        email: document.querySelector("#signup-form input[name='email']").value,
        phone: phoneNumber
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Hide both signup and login forms after successful validation
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "none";

    return false; // Prevent form submission
}

function loginUser() {
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin") {
        // Redirect to admin.html
        window.location.href = "admin.html";
        return false; // Prevent form submission
    }

    // Check if username is empty
    if (username === "") {
        document.getElementById("username-error").innerText = "Please enter your username";
        return false; // Prevent form submission
    } else {
        document.getElementById("username-error").innerText = "";
    }

    // Check if password is empty
    if (password === "") {
        document.getElementById("password-error").innerText = "Please enter your password";
        return false; // Prevent form submission
    } else {
        document.getElementById("password-error").innerText = "";
    }

    // Simulating successful login for testing
    var isLoggedIn = true;

    if (isLoggedIn) {
        // Hide the login form after successful login
        document.getElementById("login-form").style.display = "none";
        return false; // Prevent form submission
    } else {
        // Display error message or perform other actions for failed login
        alert("Invalid username or password");
        return false; // Prevent form submission
    }
}

// Function to validate phone number
function validatePhoneNumber(input) {
    var phoneNumber = input.value;
    var errorMessage = document.getElementById("phone-error");
    if (phoneNumber.length !== 11) {
        errorMessage.innerText = "Phone number must be 11 characters long.";
    } else {
        errorMessage.innerText = "";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Function to hide signup form when "Sign Up" button is clicked
    function hideSignupForm() {
        console.log("Sign Up button clicked"); // Check if this message appears in the console
        document.getElementById("signup-form").style.display = "none";
        return false; // Prevent default form submission
    }
    

    // Event listener for the "Sign Up" button
    document.getElementById("signup-button").addEventListener("click", hideSignupForm);
});


// MyProfile js Function to create a row for each reservation
function createReservationRow(name, email, date, time, persons) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${persons}</td>
        <td><button class="cancel-btn" onclick="cancelReservation(this)">Cancel</button></td>
    `;
    return row;
}

// Function to display reservations
function displayReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const tableBody = document.querySelector("#reservationTable tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Add new rows for each reservation
    reservations.forEach(reservation => {
        const row = createReservationRow(reservation.name, reservation.email, reservation.date, reservation.time, reservation.person);
        tableBody.appendChild(row);
    });
}

// Function to display user profile information
function displayProfileInfo() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        var profileInfoDiv = document.getElementById("profile-info");
        profileInfoDiv.innerHTML = `
            <p><strong>Username:</strong> ${userData.username}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
        `;
    } else {
        // Handle case when there is no user data in localStorage
        var profileInfoDiv = document.getElementById("profile-info");
        profileInfoDiv.innerHTML = "<p>No profile information available.</p>";
    }
}
function cancelReservation(btn) {
    // Get the row to be removed
    var row = btn.closest("tr");
    // Remove the row from the table
    row.remove();
    // TODO: Add code to remove reservation from storage
}
// Call the functions to display profile information and reservations when the page loads
document.addEventListener("DOMContentLoaded", function() {
    displayProfileInfo();
    displayReservations();
});


// Reservation JS

function saveReservation() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const person = document.getElementById("person").value;

    const reservation = {
        name: name,
        email: email,
        date: date,
        time: time,
        person: person
    };

    // Save reservation to local storage
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // Add reservation to profile table
    const profileTable = document.getElementById("reservationTable").getElementsByTagName('tbody')[0];
    const newRow = profileTable.insertRow(-1); // Insert new row at the end of the table
    const cell1 = newRow.insertCell(0); // Insert cells
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    cell1.innerHTML = name; // Add data to cells
    cell2.innerHTML = email;
    cell3.innerHTML = date;
    cell4.innerHTML = time;
    cell5.innerHTML = person;
    cell6.innerHTML = '<button class="cancel-btn" onclick="cancelReservation(this)">Cancel</button>'; // Add cancel button
}

// Event listener for form submission
document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    saveReservation(); // Save reservation data
    // window.location.href = "myprofile.html"; // No need to redirect as the user is already on the profile page
});

// Function to cancel a reservation
function cancelReservation(btn) {
    // Get the row to be removed
    var row = btn.closest("tr");
    // Remove the row from the table
    row.remove();
    // TODO: Add code to remove reservation from storage
}

// Main Menu 
var swiper = new Swiper(".mySwiper", {
    direction: "horizontal", // Set the direction to horizontal
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "1",
    spaceBetween: 10, // Adjust the spacing between slides as needed
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 4,
            slideShadows: false
        },
        keyboard:{
            enabled: true
        },
        mousewheel:{
            thresholdDelta:70
        },
        initialSlide:0,
        on:{
            click(event){
                swiper.slideTo(this.clickedIndex)
            }
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            }
        }
    }
});
