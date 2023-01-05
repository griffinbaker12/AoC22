const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trimEnd().split("\n\n");

const [_stacks, moves] = data;

// at every "first" character there is something that we care about; last row is useless
const stackArr = _stacks.split('\n').map(line => [...line].filter((_val, i) => i % 4 === 1)).slice(0, -1);

const stacks = {};

for (const stack of stackArr) {
    for (let i = 0; i < stack.length; i++) {
        if (stack[i] !== " ") {
            if (!stacks[i + 1]) {
                stacks[i + 1] = [];
            }
            stacks[i + 1].unshift(stack[i]);
        }
    }
}

// STACK SCHEMA
// { '1': [ 'Z', 'N' ], '2': [ 'M', 'C', 'D' ], '3': [ 'P' ] }


// MOVES SCHEMA: MOVE (Q) FROM (COL) TO (COL)
// [
//     [ '1', '2', '1' ],
//     [ '3', '1', '3' ],
//     [ '2', '2', '1' ],
//     [ '1', '1', '2' ]
//   ]
const movesArr = moves.split('\n').map(line => line.split(" ").filter((_val, i) => i % 2 !== 0));

function generateStacks() {
    // iterate over all the moves and pop off as many blocks as you need to from the end and them move them where they need to go (use splice)
    for (const move of movesArr) {
        const [q, from, to] = move;
        const toMove = stacks[from].splice(-q);
        for (let i = toMove.length - 1; i >= 0; i--) {
            stacks[to].push(toMove[i])
        }
    }
    // loop over all of the entries and pop the last value from the end of all of the keys
    return Object.values(stacks).map(stack => stack.pop()).join("");
}

function generateStacks2() {
    // iterate over all the moves and pop off as many blocks as you need to from the end and them move them where they need to go (use splice)
    for (const move of movesArr) {
        const [q, from, to] = move;
        const toMove = stacks[from].splice(-q);
        for (const block of toMove) {
            stacks[to].push(block);
        }
    }
    // loop over all of the entries and pop the last value from the end of all of the keys
    return Object.values(stacks).map(stack => stack.pop()).join("");
}

function solution1() {
    return generateStacks();
}

// console.log(solution1());


function solution2() {
    return generateStacks2();
}

console.log(solution2());