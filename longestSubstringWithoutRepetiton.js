/*
    Given a string, return the length of the longest string without repetition
*/

function lengthOfLongestSubstring(input) {
    let longest = 0;

    let i = 0;
    let current = [];

    while (i < input.length) {

        if (current.indexOf(input[i]) === -1) {
            current += input[i];

            if (current.length > longest) {
                longest = current.length;
            }
        } else {
            current = current.slice(current.indexOf(input[i]) + 1) + input[i];
        }

        i++;
        
        let shouldContinue = (current.length + input.slice(i).length) > longest;
        if (!shouldContinue) {
            break;
        }
    }

    return longest;
}

console.log('Expected: 10, Actual: ', lengthOfLongestSubstring('abrkaabcdefghijjxxx'));
console.log('Expected: 1, Actual: ', lengthOfLongestSubstring('a'));
console.log('Expected: 0, Actual: ', lengthOfLongestSubstring(''));
console.log('Expected: 1, Actual: ', lengthOfLongestSubstring('aaaaaaa'));
console.log('Expected: 8, Actual: ', lengthOfLongestSubstring('abcdefgh'));
console.log('Expected: 8, Actual: ', lengthOfLongestSubstring('abcdefgha'));
console.log('Expected: 8, Actual: ', lengthOfLongestSubstring('abcdefghabcdefghabcdefghabcdefghabcdefgh'));
console.log('Expected: 8, Actual: ', lengthOfLongestSubstring('abcdefghaaaaaaaa'));