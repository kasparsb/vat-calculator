function formatNumber(number, precision) {
    return formatDelimiter(number.toFixed(precision));
}

function formatDelimiter(number) {
    return (number+'').replace('.', ',');
}

export default formatNumber;