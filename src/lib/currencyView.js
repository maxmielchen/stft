
function currencyView(number) {
    return number.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default currencyView;