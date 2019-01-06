import Tetris from './tetris.js';

export default class TetrisElement extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({ mode: 'closed' })
        this.width = 240;
        this.height = 400;

        shadow.innerHTML = `
            <style>
                .wrapper {
                    position: relative;
                }
                .score {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 2;
                }
            </style>
            <div class="wrapper">
                <div class="score"></div>
                <canvas class="screen" width="${this.width}" height="${this.height}"></canvas>
            </div>
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

