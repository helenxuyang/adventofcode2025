const fs = require("node:fs");

fs.readFile("./day09.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  //   data = `7,1
  // 11,1
  // 11,7
  // 9,7
  // 9,5
  // 2,5
  // 2,3
  // 7,3`;

  const tiles = data.split("\n").map((input) => {
    const commaIndex = input.indexOf(",");
    return {
      row: Number(input.substring(commaIndex + 1)),
      col: Number(input.substring(0, commaIndex)),
    };
  });
  // tiles.forEach((tile) => console.log(tile));

  let maxArea = 0;
  // BRUTE FORCE N^2:
  // for (let tile1 of tiles) {
  //   for (let tile2 of tiles) {
  //     maxArea = Math.max(
  //       maxArea,
  //       (Math.abs(tile1.row - tile2.row) + 1) *
  //         (Math.abs(tile1.col - tile2.col) + 1)
  //     );
  //   }
  // }

  // SORT?
  //  tiles.sort((a, b) => {
  //   if (a.row < b.row) {
  //     return -1;
  //   } else if (a.row === b.row) {
  //     return 0;
  //   } else {
  //     return b.col - a.col;
  //   }
  // });

  const minCol = Math.min(...tiles.map((tile) => tile.col));
  const maxCol = Math.max(...tiles.map((tile) => tile.col));
  const minRow = Math.min(...tiles.map((tile) => tile.row));
  const maxRow = Math.max(...tiles.map((tile) => tile.row));

  const edgeTiles = tiles.filter(
    (tile) =>
      tile.row === minRow ||
      tile.row === maxRow ||
      tile.col === minCol ||
      tile.col === maxCol
  );

  for (let tile1 of edgeTiles) {
    for (let tile2 of edgeTiles) {
      maxArea = Math.max(
        maxArea,
        (Math.abs(tile1.row - tile2.row) + 1) *
          (Math.abs(tile1.col - tile2.col) + 1)
      );
    }
  }

  console.log({ minCol, maxCol, minRow, maxRow }, edgeTiles);

  console.log({ maxArea });
});
