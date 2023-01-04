const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(x => x.split(","));

function findFullyOverlappingSections(section) {
    // convert to num...are you f'ing kidding me lmao
    const [[one, two], [three, four]] = section.map(x => x.split("-").map(Number));
    if (one >= three && two <= four) {
        return 1;
    } else if (three >= one && four <= two) {
        return 1;
    } else {
        return 0;
    };
}

function solution1() {
    return data.map(findFullyOverlappingSections).reduce((a, b) => a + b);
}

console.log(solution1());

function findOverlappingSections(section) {
    const [[one, two], [three, _four]] = section.map(x => x.split("-").map(Number)).sort((a, b) => a[0] - b[0]);
    if (one < three && two < three) {
        return 0;
    } else if (one > three && two > three) {
        return 0;
    } else {
        return 1;
    }
}

function solution2() {
    return data.map(findOverlappingSections).reduce((a, b) => a + b);
}

console.log(solution2());