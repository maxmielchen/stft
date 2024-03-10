
function nec(value): number {
    if (value === "" || value === undefined || value === null || isNaN(parseFloat(value))) {
        return 0;
    }
    return parseFloat(value);
}

export default nec;