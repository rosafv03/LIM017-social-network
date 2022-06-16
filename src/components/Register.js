/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../lib/application/controller.js';
import {
 registerWithEmail, signInWithGoogle, sendEmailVerificationFirebase, modiedPerfil,
} from '../lib/application/authFirebase.js';

export const Register = () => {
  const registerPage = `
  <section class='text-container'>
    <h1>CUY VIAJERO</h1>
    <img class='img-responsive' src='img/cuyLog.png'>
    <p class=text-Register>Registro</p>
    <form>
      <label for='nameUser'>Nombre de usuario
        <input type='text' id='createName' placeholder ='Ejm: usuario' name ='nameUser'>
      </label>
      <label for='inputEmail'>Email
        <input type='text' id='createEmail' placeholder ='usuario@example.com' name ='nameEmail'>
      </label>
      <p id='messageEmail'></p>
      <label for='namePassword'>Contraseña
        <input type= 'password' id='createPassword' placeholder ='Mayor a 6 carácteres' name ='namePassword'>
      </label>
    </form>
      <p id='messagePassword'></p>
      <p id='messageVerificado'></p>
      <button id='buttonUserRegister' class='buttonHome'> Crear Ususario</button>
      <button id='buttonGoogle'> Iniciar con <img class='logo-Google' src='img/google.png'> </button>
      <button id='buttonBackHome' class='buttonHome' ></button>
  </section>
  `;

  const viewRegiterPage = document.createElement('div');
  viewRegiterPage.innerHTML = registerPage;
  viewRegiterPage.className = 'viewContainer';

  viewRegiterPage.querySelector('#buttonUserRegister').addEventListener('click', (e) => {
    e.preventDefault();
    const nameValue = viewRegiterPage.querySelector('#createName').value;
    const emailValue = viewRegiterPage.querySelector('#createEmail').value;
    const passwordValue = viewRegiterPage.querySelector('#createPassword').value;
    const messageEmail = viewRegiterPage.querySelector('#messageEmail');
    const messagePassword = viewRegiterPage.querySelector('#messagePassword');
    const messageVerificado = viewRegiterPage.querySelector('#messageVerificado');
    registerWithEmail(emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .then(() => {
        messageVerificado.innerHTML = 'Usuario creado correctamente';
        modiedPerfil(nameValue);
        console.log(modiedPerfil);
        sendEmailVerificationFirebase().then(() => {
      alert('Ya se envio tu correo de verificación');
    })
    .catch((err) => {
      alert(err.message);
    });
        setTimeout(() => {
          onNavigate('/login');
        }, 5000);
    }).catch((error) => {
      alert(error);
    switch (error.message) {
      case 'Firebase: Error (auth/missing-email).': messageEmail.innerHTML = 'El correo es obligatorio'; break;
      case 'Firebase: Error (auth/invalid-email).': messageEmail.innerHTML = 'Digite un correo válido'; break;
      case 'Firebase: Error (auth/email-already-in-use).': messageEmail.innerHTML = 'El correo electrónico proporcionado esta siendo utilizado por otro miembro, verifica e intente de nuevo.'; break;
      case 'Firebase: Error (auth/internal-error).': messagePassword.innerHTML = 'La contraseña es obligatoria'; break;
      default: return error.message;
    }
    return error.message;
  });
});
  viewRegiterPage.querySelector('#buttonGoogle').addEventListener('click', () => {
    signInWithGoogle()
    .then(() => { onNavigate('/home'); });

  });
  viewRegiterPage.querySelector('#buttonBackHome').addEventListener('click', () => onNavigate('/'));

  return viewRegiterPage;
};
