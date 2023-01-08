const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(x => x.split(" "));

// console.log(data);

const moves = {
    R: {
        x: 1,
        y: 0
    },
    L: {
        x: -1,
        y: 0
    },
    U: {
        x: 0,
        y: 1
    },
    D: {
        x: 0,
        y: -1
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dir) {

        const { x: _x, y: _y } = moves[dir];
        this.x += _x;
        this.y += _y;
    }

    // this is for diagonal movement
    follow(x, y, dir) {
        // move in that same direction, and then have to either move:
        // L/R if (up / down)
        // U/D if (left / right)
        this.move(dir);
        if (dir === "U" || dir === "D") {
            if (x > this.x) {
                this.move("R");
            } else {
                this.move("L");
            }
        } else {
            if (y > this.y) {
                this.move("U");
            } else {
                this.move("D");
            }
        }
    }
}

function solution1() {
    const head = new Point(0, 0);
    const tail = new Point(0, 0);

    // can we just use `${x}-${y}` and then count the length at the end? think so, let's see
    const seen = new Set();

    seen.add(`${tail.x}-${tail.y}`);

    for (const [direction, distance] of data) {
        // console.log(direction, 'dir is');
        for (let i = 1; i <= Number(distance); i++) {
            head.move(direction);
            // move diag
            if ((Math.abs(head.x - tail.x) !== 0 && Math.abs(head.y - tail.y) > 7) ||
                (Math.abs(head.y - tail.y) !== 0 && Math.abs(head.x - tail.x) > 7)
            ) {
                // console.log('FOLLOW', head, tail);
                tail.follow(head.x, head.y, direction);
                if (!seen.has(`${tail.x}-${tail.y}`)) {
                    seen.add(`${tail.x}-${tail.y}`);
                }
            } else if ((Math.abs(head.x - tail.x) == 7) || (Math.abs(head.y - tail.y) == 7)) {
                // console.log('MOVE');
                tail.move(direction);
                if (!seen.has(`${tail.x}-${tail.y}`)) {
                    seen.add(`${tail.x}-${tail.y}`);
                }
            }

            // console.log('SEEN IN', seen, "TAIL", tail);
        }
    }

    // console.log(seen);

    return seen.size;
}

console.log(solution1());

function solution2() {
    return;
}

console.log(solution2());