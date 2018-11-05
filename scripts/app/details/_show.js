import {parse} from '../../utils/helpers.js';

export default function (app, result) {
    const { container, results } = app.parent.data;

    results.classList.add('is-background');
    result.classList.add('is-selected');
    result.blur();

    const panel = parse(`
      <chipi-panel class="app-panel" tabindex="0">
        <article class="detail">
          <div class="detail-body">
            <p>Hey Carlos, was talking with Jing about you, no rush to be back to work, take a decent rest to recover fully before getting back to work 😀</p>
          </div>
        </article>
      </chipi-panel>
    `).firstElementChild;

    container.append(panel);
    panel.focus();

    panel.addEventListener('keydown', e => {
        if (e.code === 'ArrowLeft') {
          panel.destroy().then(() => {
            results.classList.remove('is-background');
            result.classList.remove('is-selected');
            result.focus();
          })
        }
    })

    panel.addEventListener('click', e => {
      if (e.target === panel) {
        panel.destroy().then(() => {
          results.classList.remove('is-background');
          result.classList.remove('is-selected');
          result.focus();
        })
      }
    })
}
