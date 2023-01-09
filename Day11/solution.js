const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n\n").map(x => x.split("\n").map((_, i) => {
    const trimmed = _.trim();
    const initialPatternArr = [
        "Monkey ",
        "Starting items: ",
        "Operation: new = old ",
        "Test: divisible by ",
        "If true: throw to monkey ",
        "If false: throw to monkey "
    ]
    const subsSplit = [
        ":",
        ", ",
        " ",
        null,
        null,
        null
    ]

    return trimmed.split(initialPatternArr[i]).join("").split(subsSplit[i]).filter(Boolean).map(x => {
        if (isNaN(x)) {
            return x;
        } else {
            return parseInt(x);
        }
    });
}));

console.log(data);

const monkeyInspections = {}

let monkeyNum = 0;
for (const _ of data) {
    monkeyInspections[monkeyNum] = 0;
    monkeyNum++;
}

console.log(monkeyInspections);

const ROUNDS = 20;

function solution1() {
    // worry level in the array
    // after inspection, but before calc, take worry level and divide by 3 and floor it 
    // after inspection, apply the operation to the worry level
    // test then shows what calc to run on the worry level to see what action to take
    let currRound = 1;
    while (currRound <= ROUNDS) {
        for (let i = 0; i < data.length; i++) {
            const [_monkey, items, _operation, _test, _true, _false] = data[i];

            const monkey = _monkey[0];
            const test = _test[0];
            const [operation, operand] = _operation
            const trueCond = _true[0];
            const falseCond = _false[0];

            console.log(monkey, items, operation, operand, test, trueCond, falseCond);

            const initLen = items.length;

            for (let i = 0; i < initLen; i++) {
                const worry = items[0];
                console.log(worry);
                monkeyInspections[monkey]++;
                let newWorry;
                if (operation === "+") {
                    if (operand === "old") {
                        newWorry = worry + worry;
                    } else {
                        newWorry = worry + operand;
                    }
                } else {
                    if (operand === "old") {
                        newWorry = worry * worry;
                    } else {
                        newWorry = worry * operand;
                    }
                }
                console.log(newWorry, 'NEW WORRY');
                newWorry = Math.floor(newWorry / 3);
                console.log(newWorry, 'NEW WORRY');
                if (newWorry % test === 0) {
                    throwItem(newWorry, trueCond);
                } else {
                    throwItem(newWorry, falseCond);
                }
                items.shift();
            }

        }
        currRound++;
    }

    const sorted = Object.values(monkeyInspections).sort((a, b) => b - a);
    return sorted[0] * sorted[1];
}

const throwItem = (worry, monkey) => {
    data[monkey][1].push(worry);
}

console.log(solution1());

function solution2() {
    return;
}

console.log(solution2());