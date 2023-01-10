const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(row => row.split(""));

console.log(data);
// a => z (lowest to highest elevation)
// you are at S (which has elevation a), and you want to get to E (which has elevation z), and you can only move one step at a time

const elevationDict = 'abcdefghijklmnopqrstuvwxyzSE'.split("").reduce((a, b, i) => {
    if (b === "S") {
        a[b] = 1;
    } else if (b === "E") {
        a[b] = 26;
    } else {
        a[b] = i + 1;
    }
    return a;
}, {})

function getStartingPosition() {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j] === "S") {
                return [i, j];
            }
        }
    }
}

// return an array of the steps [x, y] that you could take
function getValidSteps(x, y, elevation) {
    const up = x - 1;
    const down = x + 1;
    const right = y + 1;
    const left = y - 1;

    console.log(x, y);

    const steps = [];

    if (up > 0) {
        const _el = elevationDict[data[up][y]];
        if (Math.abs(_el - elevation) <= 1) {
            steps.push([up, y]);
        }
    }

    if (down < data.length) {
        const _el = elevationDict[data[down][y]];
        if (Math.abs(_el - elevation) <= 1) {
            steps.push([down, y]);
        }
    }

    if (right < data[0].length) {
        const _el = elevationDict[data[x][right]];
        if (Math.abs(_el - elevation) <= 1) {
            steps.push([x, right]);
        }
    }

    if (left > 0) {
        const _el = elevationDict[data[x][left]];
        if (Math.abs(_el - elevation) <= 1) {
            steps.push([x, left]);
        }
    }

    return steps;
}


const visited = new Set();
function solution1(steps = 0, x = 0, y = 0) {
    if (!steps && !x && !y) {
        [x, y] = getStartingPosition();
    }

    console.log(steps, 'steps is', data[x][y]);
    // we made it, return the steps, which is the final answer
    if (data[x][y] === "E") {
        console.log('steps', steps);
        return;
    }

    visited.add(`${steps}-${x}-${y}`);

    //check around us for valid steps, and then take those steps, and pass the coords into this function (and maybe you can get all the way home, but if you can't then have to backtrack and try the others)
    const validSteps = getValidSteps(x, y, elevationDict[data[x][y]], visited)
    for (const [_x, _y] of validSteps) {
        if (visited.has(`${_x}-${_y}`)) continue;
        solution1(steps + 1, _x, _y);
    }
}

console.log(solution1());

function solution2() {
    return;
}

console.log(solution2());