window.addEventListener('load', () => {

    // Captura de elementos de los formularios
    let nameInput = document.getElementById('nombre');
    let nameError = document.getElementById('nameError');
    let apellidoInput = document.getElementById('apellido');
    let apellidoError = document.getElementById('apellidoError');
    let emailInput = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let dirInput = document.getElementById('dir');
    let dirError = document.getElementById('dirError');
    let telInput = document.getElementById('telefono');
    let telError = document.getElementById('telError');
    let passInput = document.getElementById('contrasenia');
    let passError = document.getElementById('passError');


    // Validaciones on time
    nameInput.addEventListener('blur', () => {
        if(nameInput.value == '') {
            nameError.innerText = 'El campo nombre no puede quedar vacío';
            nameError.style.color = 'red';
        }
        else if(nameInput.value.length < 2) {
            nameError.innerText = 'El campo nombre debe tener al menos 2 caracteres';
            nameError.style.color = 'red';
        }
        else {
            nameError.innerText = ''
        }
    });

    apellidoInput.addEventListener('blur', () => {
        if(apellidoInput.value == '') {
            apellidoError.innerText = 'El campo apellido no puede quedar vacío';
            apellidoError.style.color = 'red';
        }
        else if(apellidoInput.value.length < 2) {
            apellidoError.innerText = 'El campo apellido debe tener al menos 2 caracteres';
            apellidoError.style.color = 'red';
        }
        else {
            apellidoError.innerText = ''
        }
    });

    emailInput.addEventListener('blur', () => {
        if(emailInput.value == '') {
            emailError.innerText = 'El campo email no puede quedar vacío';
            emailError.style.color = 'red';
        }
        else {
            emailError.innerText = ''
        }
    });

    dirInput.addEventListener('blur', () => {
        if(dirInput.value == '') {
            dirError.innerText = 'El campo dirección no puede quedar vacío';
            dirError.style.color = 'red';
        }
        else {
            dirError.innerText = ''
        }
    });

    telInput.addEventListener('blur', () => {
        if(telInput.value == '') {
            telError.innerText = 'El campo teléfono no puede quedar vacío';
            telError.style.color = 'red';
        }
        else {
            telError.innerText = ''
        }
    });

    passInput.addEventListener('blur', () => {
        if(passInput.value == '') {
            passError.innerText = 'El campo contraseña no puede quedar vacío';
            passError.style.color = 'red';
        }
        else if(passInput.value.length < 8) {
            passError.innerText = 'El campo contraseña debe tener al menos 8 caracteres';
            passError.style.color = 'red';
        }
        else {
            passError.innerText = ''
        }
    });

});