const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(_ => _.split(""));

console.log(data);

const E = [];

for (let i = 0; i < data.length; i++) {
    const row = [];
    for (let j = 0; j < data.length; j++) {
        if (data[i][j] === "S") {
            row.push('a'.charCodeAt());
        } else if (data[i][j] === 'E') {
            row.push('z'.charCodeAt());
        } else {
            row.push(data[i][j].charCodeAt());
        }
    }
    E.push(row);
}

console.log(E);

function solution1() {
    const queue = [];
    const seen = new Set();
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j] === "S") queue.push([[i, j], 0]);
        }
    }
    while (queue.length) {
        const [[currI, currJ], steps] = queue.shift();
        if (seen.has(`${currI}-${currJ}`)) continue;
        seen.add(`${currI}-${currJ}`);
        // console.log(steps, currI, currJ);
        if (data[currI][currJ] === "E") return steps;
        for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const newRow = currI + di;
            const newCol = currJ + dj;
            // console.log(newRow);
            if (0 <= newRow && newRow < data.length && 0 <= newCol && newCol < data[0].length && (E[newRow][newCol] <= (1 + E[currI][currJ]))) {
                console.log(newRow, newCol, steps + 1);
                queue.push([[newRow, newCol], steps + 1]);
            }
        }
    }
}

console.log(solution1());