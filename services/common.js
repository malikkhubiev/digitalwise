const transformNumber = (number) => {
    if (number > 999999) {
        number = `${number / 1000000}M`;
    } else if (number > 9999) {
        number = `${number / 1000}K`;
    };
    return `${number}`;
};

module.exports = {transformNumber}