/**
 * 401. Binary Watch
 * Example:
 * Input: n = 1
 * Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
 *
 * @param {number} num
 * @return {string[]}
 */
var readBinaryWatch = function(num) {
  const output = [];

  for (let h = 0; h < 12; h++) {
    for (let m = 0; m < 60; m++) {
      // 计算出占多少个1
      const ones = Number(h * 64 + m).toString(2).split('').filter(d => d === '1').length;
      if (ones === num) output.push(m < 10 ? `${h}:0${m}` : `${h}:${m}`);
    }
  }

  return output;
};
