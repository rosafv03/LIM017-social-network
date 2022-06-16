/* eslint-disable no-alert */
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../lib/application/controller.js';
import { signOff } from '../lib/application/authFirebase.js';

export const Profile = () => {
  const profilePage = `
  <header class="header">
  <div><img class="logo" src="img/cuyMap.png" alt="" srcset="" </div>
  <div class='centerTitle'>
  <a href="" class="titleCuyViajero"> <strong>Cuy Viajero</strong></a>
  </div>
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul class="menu">
    <li><a type="button" class='buttonNav' id='buttonNavStart'>Inicio</a></li>
    <li><a type="button" class='buttonNav' id='buttonNavProfile'>Perfil</a></li>
    <li><a type="button" class='buttonNav' id='singOutBttn'>Cerrar sesión</a></li>
  </ul>
 </header>
 `;

  const viewProfilePage = document.createElement('div');
  viewProfilePage.className = 'viewContainerHome';
  viewProfilePage.innerHTML = profilePage;

  viewProfilePage.querySelector('#buttonNavStart').addEventListener('click', () => {
    onNavigate('/home');
  });
  viewProfilePage.querySelector('#buttonNavProfile').addEventListener('click', () => {
    onNavigate('/profile');
  });
  viewProfilePage.querySelector('#singOutBttn').addEventListener('click', () => {
    signOff()
      .then(() => onNavigate('/'))
      .catch((error) => {
        alert('No pudo cerrar sesión', error);
      });
  });
  return viewProfilePage;
};
