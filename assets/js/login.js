const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8mXsl2fOTPLmvGECADgiNGLWfjyZ3EvQ",
  authDomain: "irc-2024-24dd9.firebaseapp.com",
  projectId: "irc-2024-24dd9",
  storageBucket: "irc-2024-24dd9.firebasestorage.app",
  messagingSenderId: "327289925461",
  appId: "1:327289925461:web:5cdc9c5c6b70196bce09dc",
  measurementId: "G-BNKTMRHWR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Handle Sign-Up
const signUpForm = document.querySelector(".sign-up-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("user-name").value;
  const organization = document.getElementById("user-organization").value;
  const session = document.getElementById("session").value;
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("sign-up-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Save additional user data to the database
      const userId = userCredential.user.uid;
      set(ref(db, "users/" + userId), {
        name: name,
        organization: organization,
        session: session,
        role: "user", // Default role
      });
      alert("Sign-up successful! Please sign in.");
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Handle Sign-In with Admin Email Check
const signInForm = document.querySelector(".sign-in-form");
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("sign-in-user-name").value;
  const password = document.getElementById("sign-in-password").value;

  // Check if the entered email and password match admin credentials
  if (email === "admin@mrt.ac.lk" && password === "ITUM1234") {
    // Redirect to admin dashboard
    window.location.href = "admin_dashboard.html";
  } else {
    // Handle regular user login via Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        const userRef = ref(db, "users/" + userId);

        // Fetch user data to determine the role
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              // Redirect to appropriate dashboard
              window.location.href = "user_dashboard.html";
            } else {
              alert("No user data found!");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert("Invalid email or password!");
      });
  }
});


