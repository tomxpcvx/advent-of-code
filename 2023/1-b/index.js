
async function readFile(path) {
    const file = Bun.file(path);
    return file.text();
}

function convertWordsToNumberStrings(word) {
    const wordMap = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8", 
        "nine": "9"
    };

    return wordMap[word] || null;
}

function repair(line) {
    const stringRepair = {
        "oneight": "oneeight",
        "twone": "twoone",
        "threeight": "threeeight",
        "fiveight": "fiveeight",
        "sevenine": "sevennine",
        "eightwo": "eighttwo",
        "eighthree": "eightthree",
        "nineight": "nineeight",
    };
    let repairedLine = line;
    Object.keys(stringRepair).forEach(e => {
        const regex = new RegExp(e, 'g');
        repairedLine = repairedLine.replace(regex, stringRepair[e]);
    });
    return repairedLine;
}

function sumFirstAndLastDigit(line) {
    const repairedLine = repair(line);
    console.log("LINE:      ", repairedLine);
    let digitMatch = repairedLine.match(/\d|one|two|three|four|five|six|seven|eight|nine/gi);
    console.log("MATCH:     ", digitMatch);
    const convertedLine = digitMatch.map(digit => {
        return isNaN(digit) ? convertWordsToNumberStrings(digit) : digit
    });
    let firstDigit;
    let lastDigit;
    if (convertedLine) {
        firstDigit = parseInt(convertedLine[0], 10);
        if(convertedLine.length !== 1) {
            lastDigit = parseInt(convertedLine[convertedLine.length - 1], 10);
        } else {
            lastDigit = parseInt(convertedLine[0], 10);
        }
    }
    const buildedSum = parseInt(firstDigit.toString() + lastDigit.toString(), 10);
    console.log("LINESUM:   ", buildedSum);
    console.log("");
    return buildedSum;
}

const path = "data.txt";
const content = await readFile(path);
const lines = content.split(/\r?\n|\r|\n/g);
const lineSums = lines.map(line => {
    return sumFirstAndLastDigit(line)
});
const sum = lineSums.reduce((acc, sum) => {
    return acc + sum
}, 0);

console.log("FULL SUM:  ", sum)