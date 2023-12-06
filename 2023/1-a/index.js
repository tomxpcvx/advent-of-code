async function readFile(path) {
    const file = Bun.file(path);
    return file.text();
}

function sumFirstAndLastDigit(line) {
    const digitMatch = line.match(/\d/g);
    console.log("LINE:      ", line);
    console.log("DIGITS:    ", digitMatch);
    let firstDigit;
    let lastDigit;
    if (digitMatch) {
        firstDigit = parseInt(digitMatch[0], 10);
        if(digitMatch.length !== 1) {
            lastDigit = parseInt(digitMatch[digitMatch.length - 1], 10);
        } else {
            lastDigit = parseInt(digitMatch[0], 10);
        }
    }
    console.log("");
    return parseInt(firstDigit.toString() + lastDigit.toString(), 10);
}

const path = "data.txt";
const content = await readFile(path);
const lines = content.split(/\r?\n|\r|\n/g);
const linesOfSums = lines.map(line => {
    return sumFirstAndLastDigit(line)
});
const sum = linesOfSums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
}, 0);

console.log("FULL SUM:  ", sum)
