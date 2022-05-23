/* -------VISTA WELCOME  25/04/2022 ----------- */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../lib/application/controller.js';

export const Welcome = () => {
  const welcome = `

  <section class='containerWelcome'>
  <div class='text-container'>
  <div class='videoCuy'>
    <video autoplay muted loop id='video-phone'>
    <source src='img/cuy-video.mp4' type='video/mp4'>
    </video>
  </div>
  <div id='buttomWelcome'>
    <button id='buttonRegister'> Regístrate</button>
    <button id='buttonLogin'> Inicia sesión </button>
  </div>
    </div>

    </section>
    `;

  const viewWelcomePage = document.createElement('div');
  viewWelcomePage.className = 'viewContainerWelcome';
  viewWelcomePage.innerHTML = welcome;

  viewWelcomePage
    .querySelector('#buttonRegister')
    .addEventListener('click', () => onNavigate('/register'));
  viewWelcomePage
    .querySelector('#buttonLogin')
    .addEventListener('click', () => onNavigate('/login'));

  return viewWelcomePage;
// eslint-disable-next-line eol-last
};