/*
Imagine that you need a function that can take two inputs:
    1) a list of integers and
    2) another list of integers.
The first list could be thousands of integers long. It can contain positive and negative numbers.
It’s not sorted in any way. Any integer could be at any position. 
The second list is similar except that it’s equal in length to the first list or shorter.

What we want to do with these lists is find where in the first list we could substitute the second list,
integer for integer, that would create the least amount of change in each integer from the original list.
For this problem, we consider change to be measured in number line distance (i.e. absolute value).
So, you can’t use some negative distance to offset some positive distance.
If you substitute -2 for 2, that’s a change of 4.

An example would be something like this:

original =    [1, 2, 3, 4, 5]
replacement = [3, 5, 3]

In this example, the “disruption” created by each possible substitution looks like this:

0th position swapping
 0  1  2  3  4
---------------
[1, 2, 3, 4, 5]
[3, 5, 3] 
 2, 3, 0 -- total disruption of 5

1st position swapping
 0  1  2  3  4
---------------
[1, 2, 3, 4, 5]
   [3, 5, 3] 
    1, 2, 1 -- total disruption of 4

2nd position swapping
 0  1  2  3  4
---------------
[1, 2, 3, 4, 5]
      [3, 5, 3] 
       0, 1, 2 -- total disruption of 3

You can see from this, that the best replacement choice here would be the 2nd index,
which would create a subrange disruption of just 3, compared to all the other options.
*/

function getLeastDisruptiveIndex(fullList, partList) {
    const DEFAULT = -1;
    if (!fullList.length || !partList.length) {
        return DEFAULT;
    }

    let minDisruption = Infinity;
    let minDisruptionIndex = DEFAULT;

    for (let fullIndex = 0; fullIndex <= fullList.length - partList.length; fullIndex++) {

        let disruption = 0;
        for (let partIndex = 0; partIndex < partList.length; partIndex++) {
            disruption += Math.abs(fullList[fullIndex + partIndex] - partList[partIndex]);
        }

        if (disruption === 0) {
            return fullIndex;
        }

        if (minDisruption > disruption) {
            minDisruption = disruption;
            minDisruptionIndex = fullIndex;
        }
    }
    return minDisruptionIndex;
}

// Functional solution
function getLeastDisruptiveIndexFunc(fullList, partList) {
    let leastDisruptive = fullList
        .map((e, i) => fullList.slice(i, i + partList.length))
        .filter(arr => arr.length === partList.length)
        .map(arr => getDisruption(arr, partList));

    return leastDisruptive.indexOf(Math.min(...leastDisruptive));
}

function getDisruption(subrange, partList) {
    return subrange
        .map((val, i) => Math.abs(partList[i] - val))
        .reduce((val, acc) => acc += val, 0);
}


// TEST

[getLeastDisruptiveIndex, getLeastDisruptiveIndexFunc].forEach(func => {
    console.log('TESTING: ' + func.name);
    console.log('Expected: 2, Actual: ' + func([1, 2, 3, 4, 5], [3, 4, 5]));
    console.log('Expected: 4, Actual: ' + func([1, 2, 3, 4, 5, 6, 7, 8, 9], [5, 6]));
    console.log('Expected: 3, Actual: ' + func([1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 5]));
    console.log('Expected: 2, Actual: ' + func([-1, -2, -3, -4, -5], [-3, -4, -5]));
    console.log('Expected: 0, Actual: ' + func([1, 2, 3, 4, 5], [0, 0, 0]));
    console.log('Expected: 0, Actual: ' + func([0, 0, 0], [0, 0, 0]));
    console.log('Expected: 2, Actual: ' + func([5, 4, 3], [-1]));
    console.log('Expected: -1, Actual: ' + func([0, 0, 0], [0, 0, 0, 0]));
    console.log('Expected: -1, Actual: ' + func([], [-1]));
    console.log('Expected: -1, Actual: ' + func([], []));
});