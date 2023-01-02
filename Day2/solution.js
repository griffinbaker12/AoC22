const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n");

const moves = {
    rock: 1,
    paper: 2,
    scissors: 3
}

const mapInput = {
    A: moves.rock,
    B: moves.paper,
    C: moves.scissors,
    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors
}

function getResult(other, your) {
    let score = your;
    if (
        (your === 1 && other === 3) ||
        (your === 2 && other === 1) ||
        (your === 3 && other === 2)
    ) {
        return score + 6;
    } else if (other === your) {
        return score + 3;
    } else {
        return score;
    }
}

function solution1() {
    return data.map(([otherMove, _, yourMove]) => getResult(mapInput[otherMove], mapInput[yourMove])
    ).reduce((a, b) => a + b, 0);
}

console.log(solution1(data));

const roundResult = {
    X: 0,
    Y: 3,
    Z: 6
}

function getResult2(other, endResult) {
    // play rock
    if (
        (other === 1 && endResult === 3) ||
        (other === 2 && endResult === 0) ||
        (other === 3 && endResult === 6)
    ) {
        return endResult + 1;
    } else if (
        (other === 1 && endResult === 6) ||
        (other === 2 && endResult === 3) ||
        (other === 3 & endResult === 0)
    ) {
        return endResult + 2;
    } else {
        return endResult + 3;
    }
}

// x means we need to lose
// y means we need to draw
// z means we need to win
function solution2() {
    return data.map(([otherMove, _, endResult]) => getResult2(mapInput[otherMove], roundResult[endResult])).reduce((a, b) => a + b, 0);
}

console.log(solution2(data));
