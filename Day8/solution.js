const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split("\n").map(row => row.split("").map(Number));

function tallerThan(dir, value, grid, i, j) {
    const rowLen = grid.length;
    const colLen = grid[0].length;

    // if we see a value bigger than this, then we can return false
    let largest = value;

    console.log(value);

    // tallerThan("left", curr, data, i, j - 1) ||
    // tallerThan("right", curr, data, i, j + 1) ||
    // tallerThan("top", curr, data, i - 1, j) ||
    // tallerThan("bottom", curr, data, i + 1, j)

    if (dir === "left") {
        // if the current is bigger than largest, return false
        let currJ = j;
        while (currJ >= 0) {
            if (grid[i][currJ] >= largest) {
                console.log(grid[i][currJ], largest, 'FALSE');
                return false;
            }
            currJ--;
        }
    } else if (dir === "right") {
        let currJ = j;
        while (currJ < rowLen) {
            if (grid[i][currJ] >= largest) {
                console.log(grid[i][currJ], largest, "FALSE");
                return false;
            }
            currJ++;
        }
    } else if (dir === "top") {
        let currI = i;
        while (currI >= 0) {
            if (grid[currI][j] >= largest) {
                console.log(grid[currI][j], largest, "FALSE");
                return false;
            }
            currI--;
        }
    } else {
        let currI = i;
        while (currI < colLen) {
            if (grid[currI][j] >= largest) {
                console.log(grid[currI][j], largest, "FALSE");
                return false;
            }
            currI++;
        }
    }

    console.log(largest, "VISIBLE");
    return true;
}

// the length of the array is 5, the inner array is 5 too

function solution1() {
    // start with the edges
    // let visibleCount = (data[0].length * 2) + ((data.length - 2) * 2);
    let visibleCount = 0;

    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            const curr = data[i][j];
            // if its bigger than adj and those adj are visible, if it is not bigger, then must be bigger than the biggest in the row / col
            if (
                tallerThan("left", curr, data, i, j - 1) ||
                tallerThan("right", curr, data, i, j + 1) ||
                tallerThan("top", curr, data, i - 1, j) ||
                tallerThan("bottom", curr, data, i + 1, j)
            ) {
                visibleCount++;
                grid[i][j] = 1;
            }
        }
    }

    // console.log(grid, 'the final grid');
    return visibleCount;
}

// console.log(solution1());


function look(dir, value, grid, i, j) {
    const rowLen = grid.length;
    const colLen = grid[0].length;

    // if we see a value bigger than this, then we can return false
    let viewable = 0;

    if (dir === "left") {
        // if the current is bigger than largest, return false
        let currJ = j;
        while (currJ >= 0) {
            if (grid[i][currJ] < value) {
                viewable++;
                currJ--;
            } else if (grid[i][currJ] >= value) {
                viewable++;
                break;
            } else {
                break;
            }
        }
    } else if (dir === "right") {
        let currJ = j;
        while (currJ < rowLen) {
            if (grid[i][currJ] < value) {
                viewable++;
                currJ++;
            } else if (grid[i][currJ] >= value) {
                viewable++;
                break;
            } else {
                break;
            }
        }
    } else if (dir === "up") {
        let currI = i;
        while (currI >= 0) {
            if (grid[currI][j] < value) {
                viewable++;
                currI--;
            } else if (grid[currI][j] >= value) {
                viewable++;
                break;
            } else {
                break;
            }
        }
    } else {
        let currI = i;
        while (currI < colLen) {
            if (grid[currI][j] < value) {
                viewable++;
                currI++;
            } else if (grid[currI][j] >= value) {
                viewable++;
                break;
            } else {
                break;
            }
        }
    }
    return viewable;
}

function solution2() {
    let scenicScore = -Infinity;

    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            const curr = data[i][j];

            const left = look("left", curr, data, i, j - 1);
            const right = look("right", curr, data, i, j + 1);
            const up = look("up", curr, data, i - 1, j);
            const down = look("down", curr, data, i + 1, j);

            const score = left * right * up * down;

            console.log(left, right, up, down);

            if (score > scenicScore) {
                scenicScore = score;
            }
        }
    }

    return scenicScore;
}

console.log(solution2());