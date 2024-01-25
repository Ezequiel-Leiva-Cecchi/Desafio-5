const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async (e) => {
    try {
        const result = await fetch('http://localhost:8080/api/session/logout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.ok) {
            // Si la respuesta es exitosa, muestra un mensaje y redirige al usuario al inicio de sesión
            alert('¡Has cerrado sesión con éxito!');
            window.location.href = 'http://localhost:8080/login';
        } else {
            // Si hay un problema con la respuesta, muestra un mensaje de error
            alert('Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
});