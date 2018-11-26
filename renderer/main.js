//Browser
if (document.location.protocol.startsWith('http')) {
    document.documentElement.classList.add('is-browser');
}

//Import components
import './components/app.js';
import './components/command.js';
import './components/flag.js';
import './components/logo.js';
import './components/navlist.js';
import './components/panel.js';
import './components/searchbox.js';
import './components/welcome.js';
import './components/session.js';
import './components/results/suggestion.js';
import './components/results/result.js';
import './components/details/detail.js';

//Create the app
// const app = document.getElementById('app');

// const tmpl = html`
//     <div class="app-front">
//         <chipi-search></chipi-search>
//     </div>

//     <div class="app-back"></div>

//     <div class="help">
//         <p>
//             <span class="help-keyboard"
//                 ><svg width="10px" height="10px" viewBox="0 0 10 10">
//                     <polygon id="Path" points="30 30 20 30 25 20"></polygon></svg
//             ></span>
//             <span class="help-keyboard"
//                 ><svg width="10px" height="10px" viewBox="0 0 10 10">
//                     <polygon id="Path" points="30 30 20 30 25 20"></polygon></svg
//             ></span>
//             <strong class="help-text">Press Up/Down to select a result</strong>
//         </p>
//         <p>
//             <span class="help-keyboard"
//                 ><svg width="10px" height="10px" viewBox="0 0 10 10">
//                     <polygon id="Path" points="30 30 20 30 25 20"></polygon></svg
//             ></span>
//             <strong class="help-text">Press Right to view details</strong>
//         </p>
//     </div>
// `;

// render(tmpl, app);

// const front = app.querySelector('.app-front');
// const back = app.querySelector('.app-back');

// // front.querySelector('.session-avatar').addEventListener('click', showConfig);
// // back.addEventListener('click', hideConfig);

// function showConfig() {
//     front.animate(
//         {
//             transform: ['rotateY(0)', 'rotateY(-180deg)']
//         },
//         {
//             duration: 600,
//             easing: 'ease-in-out',
//             fill: 'both'
//         }
//     );
//     back.animate(
//         {
//             transform: ['rotateY(180deg)', 'rotateY(0)'],
//             opacity: [0, 0, 1]
//         },
//         {
//             duration: 600,
//             easing: 'ease-in-out',
//             fill: 'both'
//         }
//     );
// }
// function hideConfig() {
//     front.animate(
//         {
//             transform: ['rotateY(-180deg)', 'rotateY(0)']
//         },
//         {
//             duration: 600,
//             easing: 'ease-in-out',
//             fill: 'both'
//         }
//     );
//     back.animate(
//         {
//             transform: ['rotateY(0)', 'rotateY(180deg)'],
//             opacity: [1, 1, 0]
//         },
//         {
//             duration: 600,
//             easing: 'ease-in-out',
//             fill: 'both'
//         }
//     );
// }
