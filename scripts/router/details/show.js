export default function (app) {
    const { results } = app.data;

    const panel = document.createElement('chipi-panel');
        panel.classList.add('app-panel');
        panel.innerHTML = `<article class="detail">
        <div class="detail-body">
          <p>Hey Carlos, was talking with Jing about you, no rush to be back to work, take a decent rest to recover fully before getting back to work 😀</p>
        </div>
      </article>`;

    results.after(panel);
}
