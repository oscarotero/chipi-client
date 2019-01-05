export default class Tetris {
    constructor(canvas, score) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.context.scale(20, 20);
        this.score = score;

        this.colors = [
            null,
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF',
            '#FF8E0D',
            '#FFE138',
            '#3877FF',
            '#38DFFF',
        ];
        
        this.arena = createMatrix(12, 20);
        
        this.player = {
            pos: {x: 0, y: 0},
            matrix: null,
            score: 0,
        };

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
    }

    start() {
        this.playerReset('C');
        this.updateScore();
        this.update();
    }

    playerReset(piece) {
        if (!piece) {
            const pieces = 'TJLOSZI';
            piece = pieces[pieces.length * Math.random() | 0];
        }
        this.player.matrix = createPiece(piece);
        this.player.pos = {
            y: 0,
            x: (this.arena[0].length / 2 | 0) - (this.player.matrix[0].length / 2 | 0)
        };

        if (this.collide()) {
            this.arena.forEach(row => row.fill(0));
            this.player.score = 0;
            updateScore();
        }
    }

    playerDrop() {
        this.player.pos.y++;

        if (this.collide()) {
            this.player.pos.y--;

            this.player.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        this.arena[y + this.player.pos.y][x + this.player.pos.x] = value;
                    }
                });
            });

            this.playerReset();
            this.arenaSweep();
            this.updateScore();
        }

        this.dropCounter = 0;
    }

    playerMove(offset) {
        this.player.pos.x += offset;

        if (this.collide()) {
            this.player.pos.x -= offset;
        }
    }

    playerRotate(dir) {
        const pos = this.player.pos.x;
        let offset = 1;

        this.rotate(dir);

        while (this.collide()) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > this.player.matrix[0].length) {
                rotate(-dir);
                this.player.pos.x = pos;
                return;
            }
        }
    }

    draw() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.drawMatrix(this.arena, {x: 0, y: 0});
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    rotate(dir) {
        const {matrix} = this.player;

        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }
    
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    update(time = 0) {
        const deltaTime = time - this.lastTime;

        this.dropCounter += deltaTime;

        if (this.dropCounter > this.dropInterval) {
            this.playerDrop();
        }

        this.lastTime = time;

        this.draw();
        requestAnimationFrame(time => this.update(time));
    }

    updateScore() {
        this.score.innerText = this.player.score;
    }

    arenaSweep() {
        let rowCount = 1;

        outer: for (let y = this.arena.length -1; y > 0; --y) {
            for (let x = 0; x < this.arena[y].length; ++x) {
                if (this.arena[y][x] === 0) {
                    continue outer;
                }
            }
    
            const row = this.arena.splice(y, 1)[0].fill(0);
            this.arena.unshift(row);
            ++y;
    
            this.player.score += rowCount * 10;
            rowCount *= 2;
        }
    }

    collide() {
        const m = this.player.matrix;
        const o = this.player.pos;

        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                   (this.arena[y + o.y] &&
                    this.arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

function createPiece(type)
{
    switch (type) {
        case 'I':
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
    
        case 'L':
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ];
        case 'J':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
        case 'O':
            return [
                [4, 4],
                [4, 4],
            ];
        case 'Z':
            return [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ];
        case 'S':
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        case 'T':
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ];
        case 'C':
            return [
                [0, 0, 0, 0, 0],
                [8, 8, 8, 0, 8],
                [8, 0, 8, 0, 0],
                [8, 8, 8, 0, 8],
                [8, 0, 0, 0, 0],
            ];
    }
}

function createMatrix(w, h) {
    const matrix = [];

    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}
