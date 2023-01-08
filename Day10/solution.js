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
    }
    return getFinalSolution(signalStrength)
}

console.log(solution1());

function solution2() {
    return;
}

console.log(solution2());