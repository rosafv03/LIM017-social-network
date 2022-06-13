/* import { onNavigate } from '../../../../application/controller.js'; */
import { Login } from '../../src/components/Login';
import { signInWithGoogle } from '../../src/lib/application/authFirebase';

jest.mock('../../src/lib/application/init.js');

describe('boton envias a la vista login', () => {
  it('deberia retornar la vista login', () => {
    document.body.innerHTML = '<section class="text-container"> </section>';
    const viewLoginTest = Login();
    const btnGmail = viewLoginTest.querySelector('#buttonGoogle');
    btnGmail.dispatchEvent(new Event('click'));
    setTimeout(() => {
      expect(signInWithGoogle).toHaveBeenCalled();
    });
  });
});
