const idRanges = [
  "4077-5314",
  "527473787-527596071",
  "709-872",
  "2487-3128",
  "6522872-6618473",
  "69137-81535",
  "7276-8396",
  "93812865-93928569",
  "283900-352379",
  "72-83",
  "7373727756-7373754121",
  "41389868-41438993",
  "5757-6921",
  "85-102",
  "2-16",
  "205918-243465",
  "842786811-842935210",
  "578553879-578609405",
  "9881643-10095708",
  "771165-985774",
  "592441-692926",
  "7427694-7538897",
  "977-1245",
  "44435414-44469747",
  "74184149-74342346",
  "433590-529427",
  "19061209-19292668",
  "531980-562808",
  "34094-40289",
  "4148369957-4148478173",
  "67705780-67877150",
  "20-42",
  "8501-10229",
  "1423280262-1423531012",
  "1926-2452",
  "85940-109708",
  "293-351",
  "53-71",
];

// PART 1
// let sum = 0;
// for (let range of idRanges) {
//   const dashIndex = range.indexOf("-");
//   const start = Number(range.substring(0, dashIndex));
//   const end = Number(range.substring(dashIndex + 1));

//   for (let num = start; num <= end; num++) {
//     const numStr = String(num);
//     if (numStr.length % 2 === 0) {
//       const halfIndex = numStr.length / 2;
//       const firstHalf = numStr.substring(0, halfIndex);
//       const secondHalf = numStr.substring(halfIndex);
//       // console.log({ num, firstHalf, secondHalf });
//       if (firstHalf === secondHalf) {
//         sum += num;
//       }
//     }
//   }
// }
// console.log({ sum });

// 101101101
// see 1 [1]
// see 0 [10]
// see 1 [10, 101]
// see 1 [101, 1011]
// see 0 [101, 10110]
// see 1 [101, 10110]
// see 1 [101, 1011011]
// see 0 [101, 10110110]
// see 1 [101, 101101101]

/*
keep a set of possible patterns until reach end?
map possible pattern -> index of possible pattern that we're checking if the next number is equal to?


or find factors of # digits and loop thru those, check substrings
*/

// PART 2
let sum = 0;
for (let range of idRanges) {
  const dashIndex = range.indexOf("-");
  const start = Number(range.substring(0, dashIndex));
  const end = Number(range.substring(dashIndex + 1));

  for (let num = start; num <= end; num++) {
    const numStr = String(num);
    // console.log({ num });
    const factors = new Array(numStr.length)
      .keys()
      .map((i) => i + 1)
      .filter((i) => i < numStr.length && numStr.length % i === 0);
    let isRepeating = false;
    // console.log(factors);
    for (let factor of factors) {
      let substrings = [];
      for (let i = 0; i < numStr.length; i += factor) {
        substrings.push(numStr.substring(i, i + factor));
      }
      isRepeating =
        isRepeating || substrings.every((sub) => sub === substrings[0]);
      // console.log(substrings);
    }
    if (isRepeating) {
      console.log("repeats", num);
      sum += num;
    }
  }
}
console.log({ sum });
