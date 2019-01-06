import Tetris from './tetris.js';

export default class TetrisElement extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'closed' })
        this.width = 240;
        this.height = 327;

        shadow.innerHTML = `
            <div class="score"></div>
            <canvas class="screen" width="${this.width}" height="${this.height}"></canvas>
        `;

        this.game = new Tetris(
            shadow.querySelector('.screen'),
            shadow.querySelector('.score')
        );
    }

    connectedCallback() {
        this.game.start();
    }

    moveRight() {
        this.game.playerMove(1);
    }
    
    moveLeft() {
        this.game.playerMove(-1);
    }

    moveDown() {
        this.game.playerDrop();
    }

    rotate() {
        this.game.playerRotate(1);
    }
}

