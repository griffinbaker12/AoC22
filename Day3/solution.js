const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n");

// create object with priority values: a: 1, b: 2, c: 3...
const priorities = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acc, cur, i) => {
    acc[cur] = i + 1;
    acc[cur.toLocaleUpperCase()] = i + 27;
    return acc;
}, {});

function getSackValue(sack) {
    const foundLettersInFirst = new Map();
    const sackDivider = Math.floor(sack.length / 2);
    sack.slice(0, sackDivider).split("").map(letter => foundLettersInFirst.set(letter, 1));
    const secondHalf = sack.slice(sackDivider);
    for (const letter of secondHalf) {
        if (foundLettersInFirst.has(letter)) {
            return priorities[letter];
        }
    }
}

function solution1() {
    return data.map(getSackValue).reduce((a, b) => a + b);
}

console.log(solution1());

function splitData(data) {
    const newData = [];

    for (let i = 0; i < data.length; i += 3) {
        const newSegment = [];
        let itemsPushed = 0;
        let j = i;
        while (itemsPushed < 3) {
            newSegment.push(data[j]);
            j++;
            itemsPushed++;
        }
        newData.push(newSegment);
    }

    return newData;
}

// and then here we just need to add all of the values into the object from the 3 in the array and then when the letter has reached a count of 3, return the value from the priorities object
function getSackValueTwo(sacks) {
    const foundLetters = {};
    let foundLetter;
    for (let i = 0; i < sacks.length; i++) {
        const currSack = sacks[i];
        for (const letter of currSack) {
            if (!foundLetters.hasOwnProperty(letter)) {
                foundLetters[letter] = { count: 1, index: i }
            } else {
                if (foundLetters[letter].index === i) {
                    continue;
                } else {
                    const count = foundLetters[letter].count + 1;
                    foundLetters[letter].count = count;
                    if (count === 3) {
                        foundLetter = letter;
                    }
                    foundLetters[letter].index = i;
                }
            }
        }
    }
    return priorities[foundLetter];
}

function solution2() {
    const dataSplitIntoThrees = splitData(data);
    return dataSplitIntoThrees.map(getSackValueTwo).reduce((a, b) => a + b);
}

console.log(solution2());