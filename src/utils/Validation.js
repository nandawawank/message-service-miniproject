const ValidationParams = (columns, array) => {
    let index = 0;
    while (index < columns.length) {
        if (!array.includes(columns[index])) {
            return columns[index];
        }
        index++;
    }

    return true;
}

module.exports = {
    ValidationParams
};