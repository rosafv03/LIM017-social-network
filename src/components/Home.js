/* eslint-disable no-alert */
/* eslint-disable indent */
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../lib/application/controller.js';
// eslint-disable-next-line import/no-cycle
import { signOff } from '../lib/application/authFirebase.js';
import {
  postCollection, onGetPosts, deletePost, getPostPublication, fuctionEditPost,
} from '../lib/application/dataFirestore.js';

export const Home = () => {
  const homePage = `
      <section class="header">
      <div>
            <div><img class="logo" src="img/cuyMap.png" alt="" srcset="" ></div>
            <div class='centerTitle'>
            <a href="" class="titleCuyViajero"> <strong>Cuy Viajero</strong></a>
            </div>
            <div>
            <button class='buttonNav' id='singOutBttn'><img class='out' src='img/salida.png'></button>
            </div>
            </div>
            </section>
        <div id='box-comment'>
          <section class='abc'>
            <div class="photoProfile">
            <img id="iconUser"class="iconProfile" >          
            </div>
            <form id='form-post-publication' class='form' target="_blank">
            
              
              <p><textarea  class="comment-post" id="comment-post" spellcheck="true" placeholder="Cuéntanos tu experiencia viajando..."></textarea></p>
              <div id='btn-coment'>
              <input type="reset" id='deleteCamp' value="Borrar campo">
              <input type="button" id='publish' value="Publicar">
              </div>
            </form>
            <section id="showPost">
            </section>
          </section>
      </div>
      <div id='post-Publish'>
      </div>
  `;
  const viewHomePage = document.createElement('div');

  viewHomePage.className = 'viewContainerHome';
  viewHomePage.innerHTML = homePage;

  const postContainer = viewHomePage.querySelector('#post-Publish'); // espacio para almacenar los post

  onGetPosts((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
      const dataPost = doc.data();

      const edit = (localStorage.userEmail === dataPost.author) ? ` <div id='btnModificacion'>
      <button data-id="${doc.id}" class='btn-Delete'${dataPost.author === localStorage.getItem('userEmail') ? '' : 'disabled'}></button>
      <button data-id="${doc.id}" class='btn-edit'${dataPost.author === localStorage.getItem('userEmail') ? '' : 'disabled'}></button>
      </div>` : '';
      // console.log(doc.id);
      // console.log(doc.data());
      // doc.data transforma los datos de un objeto de firebase a un objeto de javascript
      html += `
            
            <div class='post-separacion'>
            ${edit}
            <div class="boxPerfil">
                <img class='perfilPhoto' id='perfilPhoto' alt='Foto'src="${dataPost.photo}" alt=""><div class='nameUser'><strong>${dataPost.nameUser} </strong></div>
                <div id='nameUserPost'>(${dataPost.author})</div>
                </div>
            <div class='infoDate'>
             <div> Fecha: ${dataPost.date}</div>
            </div>
            <textarea readonly id='textarea-${doc.id}' class='publicationPost'>${dataPost.text} </textarea>
            <button style='display:none' class='refresh'  id='btn-${doc.id}' ><img class='log-act' src='img/refresh.png'></button>
            </div>
            </div>
            `;
    });
    postContainer.innerHTML = html;
    /* -----------------------BOTON ELIMINAR POST ----------------------------------------- */
    const btnDelete = postContainer.querySelectorAll('.btn-Delete'); // Lista de botones eliminar
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        try {
          const confirmDelet = Window.confirm('Estás seguro que quieres borrar?');
          if (confirmDelet === true) {
            await deletePost(dataset.id);
          }
        } catch (error) {
          // console.log(error);
          // console.log(error);
        }
      });
    });
    /* -------------------------------BOTON EDITAR ----------------------------------------- */
    const btnsEdit = postContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getPostPublication(e.target.dataset.id);
        const editPost = document.querySelector(`#textarea-${doc.id}`);
        editPost.removeAttribute('readonly');
        const btnRefresh = document.querySelector(`#btn-${doc.id}`);
        btnRefresh.style = 'display:block';
        btnRefresh.addEventListener('click', () => {
          editPost.setAttribute('readonly', '');
          fuctionEditPost(doc.id, { text: editPost.value });
          btnRefresh.style = 'display:none';
        });
    });
    });
  });

  /* ----------EVENTO PUBLICAR EL POST--------- */
  const savePost = viewHomePage.querySelector('#publish');
  savePost.addEventListener('click', (e) => {
    e.preventDefault();
    const postBox = viewHomePage.querySelector('#comment-post').value; // Valor del post
    if (postBox === '') {
      alert('Debes ingresar u texto antes de publicar');
    } else postCollection(postBox);
    viewHomePage.querySelector('#comment-post').value = '';
    // console.log(postBox);
    /* savePost.reset(); */
  });

  /* --------BOTONES BARRA DE NAVEGACIÓN ---------*/
  // viewHomePage.querySelector('#buttonNavStart').addEventListener('click', () => {
  //   onNavigate('/home');
  // });
  // viewHomePage.querySelector('#buttonNavProfile').addEventListener('click', () => {
  //   onNavigate('/profile');
  // });

  viewHomePage.querySelector('#singOutBttn').addEventListener('click', () => {
    signOff()
      .then(() => {
       const confirmsignOff = Window.confirm('Estás seguro de cerrar sesión?');
      if (confirmsignOff === true) {
         onNavigate('/');
      }
  })
      .catch(() => {
        // console.log('No pudo cerrar sesión', error);
      });
  });
  return viewHomePage;
};
