const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n\n");

function sumRow(row) {
    const splitRow = row.split("\n").map(Number);
    return splitRow.reduce((a, b) => a + b, 0);
}

function solution() {
    return Math.max(...data.map(row => sumRow(row)));
}

console.log(solution(data));

function solution2() {
    return data.map(row => sumRow(row)).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
}

console.log(solution2(data));