const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(x => x.split(" -> ").map(_ => _.split(",").map(Number)));

// console.log(data);

function getInput() {
    const map = new Set();

    let maxY = 0;

    //498,4 -> 498,6 -> 496,6


    let currentPoint = data.shift();
    while (data.length) {
        let targetPoint = data.shift();

        // Draw a line between currentPoint and targetPoint
        while (
            currentPoint.x !== targetPoint.x ||
            currentPoint.y !== targetPoint.y
        ) {
            map.add(`${currentPoint.x},${currentPoint.y}`);
            if (currentPoint.x !== targetPoint.x) {
                const delta =
                    (targetPoint.x - currentPoint.x) /
                    Math.abs(targetPoint.x - currentPoint.x);
                currentPoint.x += delta;
            } else {
                const delta =
                    (targetPoint.y - currentPoint.y) /
                    Math.abs(targetPoint.y - currentPoint.y);
                currentPoint.y += delta;
            }
        }
        map.add(`${currentPoint.x},${currentPoint.y}`);
    }


    return [map, maxY];
}

const dropPoint = [500, 0]

function solution1() {
    const [populatedSet, maxY] = getInput();
    let canKeepDropping = true;
    console.log(maxY);
    let sandCount = 0;
    // return;
    while (canKeepDropping) {
        // console.log(canKeepDropping, 'can keep');
        let dx = 0
        let dy = 0;
        let [currX, currY] = dropPoint;
        // console.log('new loop', populatedSet.size);
        // console.log(currX, currY);
        while (true) {
            // console.log(currX + dx, currY + dy);
            if (!populatedSet.has(`${currX + dx}-${currY + dy + 1}`)) {
                dy++;
            } else if (!populatedSet.has(`${currX + dx - 1}-${currY + dy + 1}`)) {
                dx--;
                dy++;
            } else if (!populatedSet.has(`${currX + dx + 1}-${currY + dy + 1}`)) {
                dx++;
                dy++;
            } else {
                populatedSet.add(`${currX + dx}-${currY + dy}`);
                sandCount++;
                break;
            }
        }
        if (dy >= maxY) {
            canKeepDropping = false;
        }
    }
    return sandCount;
}

console.log(solution1());

function solution2() {
    return;
}

console.log(solution2());