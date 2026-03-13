"use strict";
function getParams() {
    return {
        MAX_SIZE: 100,
        MIN_SIZE: -100,
        COUNT: 10,
    };
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getMatrix(count, min, max) {
    const matrix = Array.from({ length: count }, () => Array.from({ length: count }, () => getRandomNumber(min, max)));
    return matrix;
}
function getReplacementCount(row) {
    const initialValues = {
        prevSign: 0,
        count: 1,
        replacements: 0,
    };
    const result = row.reduce((acc, curr) => {
        const curSign = Math.sign(curr);
        if (curSign === acc.prevSign && curSign !== 0) {
            acc.count++;
            if (acc.count === 3) {
                acc.replacements++;
                acc.count = 1;
            }
        }
        else {
            acc.count = 1;
        }
        acc.prevSign = curSign;
        return acc;
    }, initialValues);
    return result.replacements;
}
function findMinValue(matrix) {
    const minValue = Math.min(...matrix.flat());
    const minRowIndex = matrix.findIndex((row) => row.includes(minValue));
    return minRowIndex;
}
function findMinPositiveValue(matrixRow) {
    const positives = matrixRow.filter((v) => v > 0);
    return positives.length ? Math.min(...positives) : null;
}
function printMatrix(matrix) {
    const minRowIndex = findMinValue(matrix);
    console.log(`\nMatrix 10x10 \n`);
    matrix.forEach((row, i) => {
        const rowStr = row.map((v) => v.toString().padStart(5)).join(' ');
        const star = i === minRowIndex ? '*' : ' ';
        const minPos = findMinPositiveValue(row);
        const repl = getReplacementCount(row);
        const minPosStr = minPos !== null ? minPos.toString() : 'none';
        console.log(`${star} [${rowStr}] | min positive: ${minPosStr} | replacements needed: ${repl}`);
    });
}
function bootstrap() {
    const { COUNT, MAX_SIZE, MIN_SIZE } = getParams();
    const matrix = getMatrix(COUNT, MIN_SIZE, MAX_SIZE);
    printMatrix(matrix);
}
bootstrap();
