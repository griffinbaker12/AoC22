const { day } = require("./day");
const fs = require("fs");
const process = require("process");

// increment day by 1
let _day = day + 1;

try {

    // make a new folder for the new day
    fs.mkdirSync(`./Day${_day}`);
    // include an input.txt file
    fs.writeFileSync(`./Day${_day}/input.txt`, "");
    // include a solution.js file that copies the contents of solutionShell.js
    fs.writeFileSync
        (
            `./Day${_day}/solution.js`,
            fs.readFileSync("./solutionShell.js", "utf8")
        );

    // rewrite day.js with new day
    fs.writeFileSync("./day.js", `const day = ${_day};\n\nmodule.exports = { day }`)

    // update the terminal to change directory to the new day
    console.log('New day created! Run \ncd Day' + _day + '\nto get started.');
} catch (err) {
    console.error("Error: ", err);
}
