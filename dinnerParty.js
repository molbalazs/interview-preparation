/*
    Let's say you are organising a dinner party. You have a list of friends to invite, but the size of the table
    is limited. Write a function which gets you all the different combinations you could possibly invite your friends
    to the party.

        As an example for an input of ['Adam', 'Bob', 'Claire', 'Dorothy'] and the table size of 3
        the function gets you the following list of dinner parties:

        ['Adam', 'Bob', 'Claire'],
        ['Adam', 'Bob', 'Dorothy'],
        ['Adam', 'Claire', 'Dorothy'],
        ['Bob', 'Claire', 'Dorothy']
*/

function getDinnerParties(friends, tableSize) {
    if (!friends.length || !tableSize) {
        return null;
    }

    let dinnerParties = [];
    combineFriends(friends, tableSize, 0, [], dinnerParties);
    return dinnerParties;
}

function combineFriends(friends, tableSize, currentPosition, currentGroup, dinnerParties) {
    if (currentPosition > friends.length) {
        return;
    }

    if (currentGroup.length < tableSize) {
        combineFriends(friends, tableSize, currentPosition + 1, [...currentGroup, friends[currentPosition]], dinnerParties);
        combineFriends(friends, tableSize, currentPosition + 1, currentGroup, dinnerParties);
    }

    if (currentGroup.length === tableSize || currentGroup.length === friends.length) {
        dinnerParties.push(currentGroup);
    }
}

// TEST

[getDinnerParties].forEach(func => {
    console.log('TESTING: ' + func.name);

    console.log('Expected: ');
    console.log([['Adam', 'Bob', 'Claire'],
    ['Adam', 'Bob', 'Dorothy'],
    ['Adam', 'Claire', 'Dorothy'],
    ['Bob', 'Claire', 'Dorothy']]);
    console.log('Actual: ');
    console.log(func(['Adam', 'Bob', 'Claire', 'Dorothy'], 3));

    console.log('Expected: ');
    console.log(null);
    console.log('Actual: ');
    console.log(func(['Adam', 'Bob', 'Claire', 'Dorothy'], 0));

    console.log('Expected: ');
    console.log(null);
    console.log('Actual: ');
    console.log(func([], 3));

    console.log('Expected: ');
    console.log([['A']]);
    console.log('Actual: ');
    console.log(func(['A'], 3));

    console.log('Expected: ');
    console.log([['A', 'B']]);
    console.log('Actual: ');
    console.log(func(['A', 'B'], 3));
});