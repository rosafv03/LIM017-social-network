// importamos la funcion que vamos a testear
import { Home } from '../../src/components/Home.js';
import { onNavigate } from '../../src/lib/application/controller.js';
// import { signOut } from '../../src/lib/application/__mock__/init.js';
import { signOut } from '../../src/lib/application/init.js';

jest.mock('../../src/lib/application/init.js');
jest.mock('../../src/lib/application/dataFirestore.js');
jest.mock('../../src/lib/application/controller.js');

describe('cerrar sesion', () => {
  it('debería ejecutar el click', () => {
    const viewHomePage = Home();
    viewHomePage.querySelector('#singOutBttn').dispatchEvent(new Event('click'));
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe('Probando botón de atrás', () => {
  fit('debería enviarnos atrás"', (done) => {
    // simulando contenedor en el test
    document.body.innerHTML = '<section id="root"></section>';
    // creando la vista que deseo a donde me lleve
    const home = Home();
    // eslint-disable-next-line max-len
    // qué espero, espero que me lleve con el onNavigate a la vista Home y que sea igual a la constante 'home'
    expect(onNavigate('/home')).toEqual(home);
    done()
  });
});
