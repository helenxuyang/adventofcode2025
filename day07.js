const fs = require("node:fs");

fs.readFile("./day07.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  const grid = lines.map((line) =>
    line.split("").filter((char) => char !== "\r")
  );
  // grid.forEach((line) => console.log(line));

  // PART 1
  // let splits = 0;
  // grid.forEach((line, lineIndex) => {
  //   line.forEach((point, pointIndex) => {
  //     const prevLine = lineIndex > 0 ? grid[lineIndex - 1] : null;
  //     if (prevLine) {
  //       // empty space - beam continues
  //       if (point === ".") {
  //         if (prevLine[pointIndex] === "S" || prevLine[pointIndex] === "|") {
  //           line[pointIndex] = "|";
  //         }
  //       }
  //       // splitter - split
  //       else if (point === "^") {
  //         if (prevLine[pointIndex] === "|") {
  //           splits++;
  //           line[pointIndex - 1] = "|";
  //           line[pointIndex + 1] = "|";
  //         }
  //       }
  //     }
  //   });
  //   // grid.forEach((line) => console.log(line.join("")));
  //   // console.log("---");
  // });
  // console.log(splits);

  // PART 2

  /*
  probably recursion? # timelines if go left + # timelines if go right
  go row by row
  first row: S, extend it downwards - add | to row below, same col
  other rows: 
  if last row, we're done
  if no splitter below, add | 
  if yes splitter below, recurse for grid with | on left, and grid with | on right 

  this is super slow. maybe can improve by checking all rows under beam instead of only next row

  this is STILL super slow. maybe can memoize
  */

  // replace the S with | for simplicity
  grid[0] = grid[0].map((char) => (char === "S" ? "|" : char));

  const memo = {};

  const numTimelines = (grid) => {
    // console.log("###", grid.length);
    // grid.forEach((row) => console.log(row));
    // last row
    if (grid.length === 1) {
      return 1;
    }
    const gridStr = grid.map((row) => row.join("")).join("");
    // console.log(gridStr);

    if (memo[gridStr]) {
      return memo[gridStr];
    }
    // extend beam
    const beamColumnIndex = grid[0].indexOf("|");
    const beamColumn = grid.map((row) => row[beamColumnIndex]);
    const splitterRowIndex = beamColumn.indexOf("^");

    // if no splitter, it goes all the way down
    if (splitterRowIndex === -1) {
      return 1;
    }
    // if splitter, recurse
    const gridLeft = grid.slice(splitterRowIndex).map((row) => [...row]);
    const gridRight = grid.slice(splitterRowIndex).map((row) => [...row]);
    gridLeft[0][beamColumnIndex - 1] = "|";
    gridRight[0][beamColumnIndex + 1] = "|";
    const result = numTimelines(gridLeft) + numTimelines(gridRight);
    memo[gridStr] = result;
    return result;
  };
  console.log(numTimelines(grid));
});
