// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import Logo from './components/logo.js';

customElements.define('chipi-logo', Logo);

const selector = document.querySelector('select');
const logo = document.querySelector('chipi-logo');

selector.addEventListener('change', change);

function change() {
    const [state, color] = selector.value.split(',', 2);
    logo.state = state;
    logo.style.color = color;
}
