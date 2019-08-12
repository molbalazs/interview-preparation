/*
    Given a grid of colors. Two cells are connected to each other if they have a shared border.
    Find the maximum number of connected cells with the same color.

    In the following grid:
    |R|R|Y|G|
    |G|R|G|G|
    |Y|R|Y|Y|
    the solution is 4, since there are 4 cells connected with each other with the same color.
*/


function getMaximumNumberOfConnectedCells(grid) {
    let result = {};
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (!grid[rowIndex][columnIndex]) {
                return;
            }

            result[cell] = Math.max(result[cell]|| 0,
                countTotalNumberOfConnectedCells(grid, rowIndex, columnIndex));
        });
    });
    return result;
}

function countTotalNumberOfConnectedCells(grid, rowIndex, columnIndex, match) {
    let totalNumber = 1;

    const current = grid[rowIndex][columnIndex] || match;

    if (!current) {
        return 0;
    };

    grid[rowIndex][columnIndex] = null;

    [[rowIndex, columnIndex - 1],
    [rowIndex, columnIndex + 1],
    [rowIndex - 1, columnIndex],
    [rowIndex + 1, columnIndex]]
    .forEach(coordinates => {
        if (grid[coordinates[0]] && grid[coordinates[0]][coordinates[1]] === current) {
            totalNumber += countTotalNumberOfConnectedCells(grid, coordinates[0], coordinates[1], current);
        }
    })

    return totalNumber;
}



console.log(getMaximumNumberOfConnectedCells([
    ['R', 'R', 'Y', 'G'],
    ['G', 'R', 'G', 'G'],
    ['Y', 'R', 'Y', 'Y']]));