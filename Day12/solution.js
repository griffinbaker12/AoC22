const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(_ => _.split(""));

console.log(data);

const E = [];

for (let i = 0; i < data.length; i++) {
    const row = [];
    for (let j = 0; j < data[0].length; j++) {
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
        // the crucial idea here, and why we can just use bfs, is that if we have already seen a node, that means that we have gotten there in less steps from somewhere else, so don't follow this path (and if it was the right path, we wouldn't be here re-visiting it)
        // with dfs, you can find a path that is not the shortest one, but then you hit and then we are done
        if (seen.has(`${currI}-${currJ}`)) continue;
        if (data[currI][currJ] === "E") return steps;
        for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const newRow = currI + di;
            const newCol = currJ + dj;
            if (0 <= newRow && newRow < data.length && 0 <= newCol && newCol < data[0].length) {
                if (E[newRow][newCol] <= E[currI][currJ] + 1) {
                    queue.push([[newRow, newCol], steps + 1]);
                    // can add it right away b/c the first time that we see a node is the shortest path
                    seen.add(`${currI}-${currJ}`);
                }
            }
        }
    }
}

console.log(solution1());