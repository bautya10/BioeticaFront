document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2200);
        
        // Credenciales predefinidas
        const validEmail = "jornada@bioetica.com";
        const validPassword = "Bioetica2024%";
        if (email === validEmail && password === validPassword) {
            // Almacena el estado de autenticación en localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            // Redirige al usuario a la página de actividades
            window.location.href = "./index.html";
        } else {
            // Muestra un mensaje de error
            loginError.style.display = 'block';
        }
    });
});
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        this.textContent = 'Mostrar';
    }
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "jornada@bioetica.com" && password === "Bioetica2024%") {
        // Guardar estado de autenticación en localStorage
        localStorage.setItem("profesorEmail", email);
        localStorage.setItem("isAuthenticated", "true");

        // Redirigir a la página principal
        window.location.href = "./index.html";
    } else {
        // Mostrar error si las credenciales no son correctas
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 2200);
    }
});
