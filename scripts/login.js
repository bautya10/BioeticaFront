const API_UR = "http://localhost:8000/api/users/login"

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Credenciales incorrectas. Por favor, intenta de nuevo.';

        // Realiza la llamada HTTP para iniciar sesión
        try {
            const response = await fetch(API_UR, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Almacena el estado de autenticación y el rol en localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('role', data.user.role); // Asegúrate de que tu backend envíe el rol
            
                // Redirige al usuario a la página de actividades
                window.location.href = "./index.html";
            
            } else {
                // Muestra un mensaje de error si las credenciales no son correctas
                loginError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            loginError.style.display = 'block';
        } finally {
            // Oculta el mensaje de error después de 2.2 segundos
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 2200);
        }
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
});
