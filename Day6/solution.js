const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("");

function areAllUnique(...args) {
    const seen = new Set();
    for (const letter of args) {
        if (seen.has(letter)) return false;
        seen.add(letter);
    }
    return true;
}

function getSpecifiedAmountFromData(num, i) {
    const arr = [];
    for (let inc = 0; inc < num; inc++) {
        arr.push(data[i + inc]);
    }
    return arr;
}

function solution(packetStart) {
    for (let i = 0; i < data.length - (packetStart - 1); i++) {
        if (areAllUnique(...getSpecifiedAmountFromData(packetStart, i))) return i + packetStart;
    }
}

console.log(solution(14));