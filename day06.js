const fs = require("node:fs");

/*
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  


results = [0, 0, 0, 0]
for each line i, for each num, results[i] *= or += num
*/

fs.readFile("./day06.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  //   data = `123 328  51 64
  //  45 64  387 23
  //   6 98  215 314
  // *   +   *   +  `;

  const lines = data.split("\n");
  // console.log(lines);
  // const operators = lines[lines.length - 1]
  //   .split(" ")
  //   .filter((input) => input.length > 0); // 1000 long

  // let results = new Array(operators.length).fill(0); // 1000 long

  // PART 1
  // 5 lines, exclude operators
  // lines.forEach((line, lineIdx) => {
  //   if (lineIdx < lines.length - 1) {
  //     const nums = line
  //       .split(" ")
  //       .filter((input) => input.length > 0)
  //       .map((input) => Number(input));

  //     // 1000 nums
  //     nums.forEach((num, numIdx) => {
  //       if (lineIdx === 0) {
  //         results[numIdx] = num;
  //       } else {
  //         const operator = operators[numIdx];
  //         if (operator === "*") {
  //           results[numIdx] *= num;
  //         } else if (operator === "+") {
  //           results[numIdx] += num;
  //         }
  //       }
  //     });
  //   }
  // });
  // console.log(results);
  // const sum = results.reduce((acc, curr) => {
  //   return acc + curr;
  // }, 0);
  // console.log({ sum });

  // PART 2
  /*
  123 328  51 64 
   45 64  387 23 
    6 98  215 314
  *   +   *   +  

   add 0s where there's spaces to make everything the same length
   045 640 387 230
   006 980 215 314

   results = [0,0,0,0]
   
   columns
   [64, 23, 314] +
   [51, 387, 215] *
   [328, 64, 98] + 
   [123, 45, 6] *

   for each num, add 0s so they're the same length? or find # digits of longest one, multiply each by 10^(diff # digits) ?
   314 is 3 digits 
   64 is 2 digits so *= (10^1) = 640
   6 is 1 digit so *= (10^2) = 600

   640 230 314
  grab the digits and concat to get the number, ignore leading zeros -> Number() should do this
  623
  431
  004 -> 4
  then add/multiply
  */

  /* HMM ABANDONING THIS BECAUSE I DIDN'T DO 0S RIGHT
  let humanNums = []; // 2d array of all nums
  // console.log(lines);
  lines.forEach((line, lineIdx) => {
    if (lineIdx < lines.length - 1) {
      const nums = line
        .split(" ")
        .filter((input) => input.length > 0)
        .map((input) => Number(input));
      humanNums.push(nums);
    }
  });
  humanNums.forEach((arr) => console.log(arr));

  for (let colIdx = 0; colIdx < humanNums[0].length; colIdx++) {
    console.log(`COLUMN ${colIdx}`);
    const nums = humanNums.map((line) => line[colIdx]);
    const maxNum = Math.max(...nums);
    console.log(nums);

    const paddedNumStrs = nums.map(
      (num) =>
        String(num) + "0".repeat(String(maxNum).length - String(num).length)
    );
    console.log(paddedNumStrs);

    let cephlapodNums = [];
    for (let digitIdx = String(maxNum).length - 1; digitIdx >= 0; digitIdx--) {
      const cephlapodNum = Number(
        paddedNumStrs
          .map((str) => str.charAt(digitIdx))
          .reduce((acc, curr) => (acc += curr), "")
      );
      cephlapodNums.push(cephlapodNum);
    }
    console.log(cephlapodNums);
  }
  const operator = operators[colIdx];
  const result = cephlapodNums.reduce(
    (acc, curr) => (operator === "*" ? (acc *= curr) : (acc += curr)),
    operator === "*" ? 1 : 0
  );
  console.log({ result });
  */

  // console.log(lines);
  // const dataGrid = lines.map((line) => line.split(""));
  // dataGrid.forEach((line) => console.log(line));

  /*
    123 328  51 64 
     45 64  387 23 
      6 98  215 314
    *   +   *   +  

    iterate from R to L, top to bottom 
    collect digits into a num
    at end of line, new num
    at operator, add/multiply 

    [4]
    EOL
    [4, 4]
    [4, 43]
    [4, 431]
    EOL
    [4, 431, 623]
    + -> result=1058
    [175, 581, 32]
    * -> 
  */

  const dataGrid = lines.map((line) =>
    line.split("").filter((char) => char !== "\r")
  );
  dataGrid.forEach((line) => console.log(line));

  let results = [];
  let nums = [];
  let currentNum = "";
  for (let c = dataGrid[0].length - 1; c >= 0; c--) {
    for (let r = 0; r < dataGrid.length; r++) {
      const dataPoint = dataGrid[r][c];
      if (dataPoint === " ") {
        // console.log({ dataPoint, currentNum });
        if (currentNum !== "") {
          nums.push(Number(currentNum));
        }
        currentNum = "";
      } else if (dataPoint === "*" || dataPoint === "+") {
        if (currentNum !== "") {
          nums.push(Number(currentNum));
        }
        const initialValue = dataPoint === "*" ? 1 : 0;
        const result = nums.reduce(
          (acc, curr) =>
            dataPoint === "*" ? (acc *= Number(curr)) : (acc += Number(curr)),
          initialValue
        );
        results.push(result);
        // console.log(nums, { result });
        currentNum = "";
        nums = [];
      } else if (dataPoint !== " " && dataPoint !== "") {
        currentNum += dataPoint;
      }
      // console.log({ dataPoint, currentNum }, nums, results);
    }
  }

  console.log(results);
  console.log(
    "sum",
    results.reduce((acc, curr) => acc + curr, 0)
  );
});
