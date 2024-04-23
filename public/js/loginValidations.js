window.addEventListener('load', () => {

    // Captura de elementos del DOM

    let emailInput = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let contraseniaInput = document.getElementById('contrasenia');
    let contraseniaError = document.getElementById('contraseniaError');

    // Validaciones on time

    emailInput.addEventListener('blur', () => {
        if(emailInput.value == '') {
            emailError.innerText = 'El campo email no puede quedar vacío';
            emailError.style.color = 'red'
        }
        else {
            emailError.innerText = ''
        }
    });

    contraseniaInput.addEventListener('blur', () => {
        if(contraseniaInput.value == '') {
            contraseniaError.innerText = 'El campo contraseña no puede quedar vacío';
            contraseniaError.style.color = 'red'
        }
        else {
            contraseniaError.innerText = ''
        }
    });
});