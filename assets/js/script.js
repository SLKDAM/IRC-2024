//togglebar 
function toggleMenu() {
  const nav = document.querySelector('.navbar ul');
  nav.classList.toggle('active');
}

//scroll button
document.getElementById("scrollToTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

function loginFunction(){
  window.location.href = "login.html";
}