// Require file system and read file
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

// Hold every line in file as element of inputArr, hold dirtPatches as an array of arrays containing coordinates
const inputArr = input.split("\n");
const grid = inputArr[0].split(" ").map(Number);
const GRID_LOWER = 0;
const GRID_UPPER = grid[1];
const initialPos = inputArr[1].split(" ").map(Number);
let cleanPos = [];
// Driving instructions are always on last line
const drivingInstructions = inputArr[inputArr.length - 1].split("");
let dirtPatches = [];

for (let i = 0; i < inputArr.length - 3; i++) {
  // Start at element 2 (3rd element, after grid and initialPos, begin dirt patches)
  dirtPatches[i] = inputArr[i + 2].split(" ").map(Number);
}

function checkBoundaries(inputPos) {
  // Returns true if boundaries are within 0 - 5
  return inputPos >= GRID_LOWER && inputPos <= GRID_UPPER;
}

function processInstructions(initialPos, drivingInstructions) {
  // Go through fall NESW instructions and increment/decrement as needed
  // Add visited locations to array (cleanPos)
  let nextPos = initialPos;
  for (let i = 0; i < drivingInstructions.length; i++) {
    switch (drivingInstructions[i]) {
      case "N":
        if (checkBoundaries(nextPos[1] + 1)) {
          nextPos[1] = nextPos[1] + 1;
          cleanPos = cleanPos.concat(cleanPos, nextPos);
        }
        break;
      case "E":
        if (checkBoundaries(nextPos[0] + 1)) {
          nextPos[0] = nextPos[0] + 1;
          cleanPos = cleanPos.concat(cleanPos, nextPos);
        }
        break;
      case "S":
        if (checkBoundaries(nextPos[1] - 1)) {
          nextPos[1] = nextPos[1] - 1;
          cleanPos = cleanPos.concat(cleanPos, nextPos);
        }
        break;
      case "W":
        if (checkBoundaries(nextPos[0] - 1)) {
          nextPos[0] = nextPos[0] - 1;

          cleanPos = cleanPos.concat(cleanPos, nextPos);
        }
        break;
    }
  }
  return nextPos;
}

function makeUnique(cleanPos) {
  // go through all element pairs and if there are duplicates, remove duplicate
  for (let i = 0; i < cleanPos.length; i++) {
    if (i % 2 === 0) {
      cleanPos[i] + cleanPos[i + 1];
      for (let j = i + 2; j < cleanPos.length; j++) {
        if (
          cleanPos[i] === cleanPos[j] &&
          cleanPos[i + 1] === cleanPos[j + 1]
        ) {
          cleanPos.splice(j, 1);
          cleanPos.splice(j + 1, 1);
        }
      }
    }
  }

  return cleanPos;
}

function checkClean(cleanPos, dirtPatches) {
  // Match element pairs against visited locations (cleanPos) against
  // dirt patches, increment if there is a match
  cleanPos = makeUnique(cleanPos);
  let counter = 0;
  for (let i = 0; i < cleanPos.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < dirtPatches.length; j++) {
        if (
          cleanPos[i] === dirtPatches[j][0] &&
          cleanPos[i + 1] === dirtPatches[j][1]
        ) {
          counter++;
        }
      }
    }
  }

  return counter;
}
console.log(processInstructions(initialPos, drivingInstructions));
console.log(checkClean(cleanPos, dirtPatches));
