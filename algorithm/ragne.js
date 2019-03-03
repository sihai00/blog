/**
 * 56.Merge Intervals
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
  if (!intervals.length) return intervals

  intervals = intervals.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end)
  var pre = intervals[0]
  var res = [pre]

  for(var cur of intervals) {
    if (cur.start <= pre.end) {
      pre.end = Math.max(cur.end, pre.end)
    } else {
      res.push(cur)
      pre = cur
    }
  }

  return res
};

/**
 * 57.Insert Interval
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
var insert = function(intervals, newInterval) {
  intervals.push(newInterval)
  if (!intervals.length) return intervals

  intervals = intervals.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end)
  var pre = intervals[0]
  var res = [pre]

  for(var cur of intervals) {
    if (cur.start <= pre.end) {
      pre.end = Math.max(cur.end, pre.end)
    } else {
      res.push(cur)
      pre = cur
    }
  }

  return res
};