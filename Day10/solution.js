const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(x => x.split(" "));

function getFinalSolution(obj) {
    let sum = 0;
    console.log(obj);
    for (const [cycle, value] of Object.entries(obj)) {
        console.log(parseInt(cycle) * value);
        sum += (parseInt(cycle) * value)
    }
    return sum;
}

function solution1() {
    let cycle = 0;
    let registerVal = 1;
    const signalStrength = {};
    for (const [instr, amount] of data) {
        console.log(cycle, registerVal);
        if (instr === "noop") {
            cycle++;
            if (cycle % 40 === 20) {
                signalStrength[cycle] = registerVal;
            }
            continue;
        };
        for (let i = 0; i < 2; i++) {
            cycle++;
            if (cycle % 40 === 20) {
                signalStrength[cycle] = registerVal;
            }
        }
        registerVal += parseInt(amount);
        // console.log(registerVal, 'rval');
    }
    return getFinalSolution(signalStrength)
}

console.log(solution1());

class CRT {
    divisor = 40;

    constructor(boardHeight, boardWidth) {
        this.board = this.drawBoard(boardHeight, boardWidth);
    }

    drawBoard(rowLen, colLen) {
        const grid = [];
        for (let i = 0; i < rowLen; i++) {
            const row = [];
            for (let j = 0; j < colLen; j++) {
                row.push(".");
            }
            grid.push(row);
        }
        return grid;
    }

    // have some method here that takes in the current value of the pixel and then also the value of the
    // also you draw at the position
    update(crtPos, spriteCenter) {
        // see if the crtPos overlaps with the sprite
        const row = Math.floor(crtPos / this.divisor);
        const col = crtPos % this.divisor;
        if (Math.abs(col - spriteCenter) < 2) {
            this.board[row][col] = "#";
        }
    }
}

function printString(grid) {
    for (const row of grid) {
        console.log(row.join(""));
    }
}

function solution2() {
    const SCREEN_HEIGHT = 6;
    const SCREEN_WIDTH = 40;

    const crtBoard = new CRT(SCREEN_HEIGHT, SCREEN_WIDTH);
    // console.log(crtBoard.board, 'the board is');

    // let's say that x is at 70, then you need to keep that as the center of the sprite, and then also track where the tube is at the time, and draw onto the board if there is overlap
    // Math.floor(42/40) => row = 1 (good)
    // 42 % 40 => col = 2 (good)

    let cycle = 0;
    let registerVal = 1;
    for (const [instr, amount] of data) {
        if (instr === "noop") {
            // check if the cycle (the position of the crt)
            // overlaps with the register val (the center of the sprite)
            crtBoard.update(cycle, registerVal);
            cycle++;
            // console.log(registerVal);
            continue;
        };
        for (let i = 0; i < 2; i++) {
            // console.log(registerVal);
            crtBoard.update(cycle, registerVal);
            cycle++;
        }
        registerVal += parseInt(amount);
    }
    printString(crtBoard.board);
}

console.log(solution2());