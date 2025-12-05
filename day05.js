const fs = require("node:fs");

fs.readFile("./day05.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(data);

  // PART 1
  let freshRanges = [];
  let ids = [];
  const lines = data.split("\n");
  for (let line of lines) {
    if (line.includes("-")) {
      freshRanges.push({
        min: Number(line.substring(0, line.indexOf("-"))),
        max: Number(line.substring(line.indexOf("-") + 1)),
      });
    } else if (line !== "\n") {
      ids.push(Number(line));
    }
  }
  // console.log({ freshRanges, ids });
  const freshIds = ids.filter((id) => {
    for (let range of freshRanges) {
      if (id >= range.min && id <= range.max) {
        return true;
      }
    }
    return false;
  });
  // console.log(freshIds.length);

  // PART 2

  // freshRanges = [
  //   { min: 99, max: 100 },
  //   { min: 200, max: 200 },
  //   { min: 3, max: 5 },
  //   { min: 10, max: 14 },
  //   { min: 16, max: 20 },
  //   { min: 12, max: 18 },
  //   { min: 1, max: 2 },
  //   { min: 1, max: 1 },
  //   { min: 20, max: 30 },
  // ];
  let mergedFreshRanges = [];
  freshRanges.sort((range1, range2) => {
    return range1.min - range2.min;
  });

  const log = false;

  if (log) freshRanges.forEach((range) => console.log(range));

  let checkIndex = 1;
  let currRange = freshRanges[0];

  while (checkIndex < freshRanges.length) {
    const rangeToCheck = freshRanges[checkIndex];
    const hasOverlap = currRange.max >= rangeToCheck.min;
    if (log) console.log("checking", currRange, rangeToCheck);
    if (hasOverlap) {
      currRange = {
        min: currRange.min,
        max: Math.max(currRange.max, rangeToCheck.max),
      };
      if (log) console.log("merging", currRange);
    } else {
      if (log) console.log("adding", currRange);
      mergedFreshRanges.push(currRange);
      currRange = freshRanges[checkIndex];
    }
    checkIndex++;
  }
  mergedFreshRanges.push(currRange);
  if (log) mergedFreshRanges.forEach((range) => console.log(range));

  let numFreshIds = 0;
  for (let range of mergedFreshRanges) {
    numFreshIds += range.max - range.min + 1;
  }
  console.log({ numFreshIds });
});

/*

3-5
10-14
16-20
12-18

sort by min

3-5
10-14
12-18
16-20

on 3-5, check 10-14. no overlap so move on
on 10-14, check 12-18. overlap, so merge into 10-18 (min of curr - max of next)
on 10-18, check 16-20. overlap, so merge into 10-20
*/
