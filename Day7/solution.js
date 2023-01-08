const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(x => x.split(" "));

const totalSpace = 70000000;
const unused = 30000000;

function getFinalSolution(obj, part2 = false) {
    const minToFree = unused - (totalSpace - obj["/"]);

    let sum = 0;
    let minGreaterThanMin = Infinity;

    for (const val of Object.values(obj)) {
        if (val <= 100000 && !part2) {
            sum += val;
        } else if (part2 && (val >= minToFree && val < minGreaterThanMin)) {
            minGreaterThanMin = val;
        }
    }
    if (!part2) return sum;
    return minGreaterThanMin
    console.log(minToFree);
}

function getSolution(part2 = false) {
    // all you have to do is keep track of the current path, and then just add whatever value that is to the object
    const path = [];
    const pathSums = {};

    for (let i = 0; i < data.length; i++) {
        if (data[i][1] === "ls") continue;

        if (data[i][1] === "cd") {
            if (data[i][2] === "..") {
                path.pop();
            } else {
                path.push(data[i][2]);
            }
        }

        const val = parseInt(data[i][0]);

        if (val) {
            for (let i = 0; i < path.length; i++) {
                // take the splice and then add it in
                const _path = path.slice(0, i + 1).join("");
                if (!pathSums[_path]) {
                    pathSums[_path] = 0;
                }
                pathSums[_path] += val;
            }
        }
    }

    return getFinalSolution(pathSums, part2)
}

console.log(getSolution());
console.log(getSolution(true));