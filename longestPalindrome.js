function getLondestPalindrome(input) {
    if (input.length <= 1) {
        return input;
    }
    
    if (isPalindrome(input)) {
        return input;
    }

    let withoutFirstChar = getLondestPalindrome(input.slice(1));
    let withoutLastChar = getLondestPalindrome(input.slice(0, input.length -1));
    return withoutFirstChar.length > withoutLastChar.length
        ? withoutFirstChar
        : withoutLastChar;
}

function isPalindrome(input) {
    let isPalindrome = true;
    let index = 0;
    while (isPalindrome) {
        if (index >= input.length) {
            break;
        }  
        isPalindrome = input[index].toUpperCase() === input[(input.length - 1) - index].toUpperCase();
        index++;
    }
    return isPalindrome;
}

console.log(getLondestPalindrome('banana'));
console.log(getLondestPalindrome('a'));
console.log(getLondestPalindrome('ab'));
console.log(getLondestPalindrome('Gézakékazég'));
console.log(getLondestPalindrome(''));