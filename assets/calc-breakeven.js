document.addEventListener('DOMContentLoaded', () => {
    const fixedInput = document.getElementById('fixed-cost');
    const priceInput = document.getElementById('price');
    const variableInput = document.getElementById('variable-cost');
    const currencySelect = document.getElementById('currency');
    const unitsEl = document.getElementById('result-units');
    const revenueEl = document.getElementById('result-revenue');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const fixed = Utils.parseInput(fixedInput.value);
        const price = Utils.parseInput(priceInput.value);
        const variable = Utils.parseInput(variableInput.value);
        const currency = currencySelect.value;

        if (!fixed && !price) {
            unitsEl.textContent = '-';
            revenueEl.textContent = '-';
            return;
        }

        // Contribution = Price - VariableCost
        const contribution = price - variable;

        if (contribution <= 0) {
            unitsEl.textContent = '-'; // Not achievable
            revenueEl.textContent = '-';
            return;
        }

        // Break-even units = Fixed / Contribution
        // Use Ceil because you sell whole units
        const units = Math.ceil(fixed / contribution);

        // Break-even revenue = Units (Ceiled) * Price 
        const revenue = units * price;

        unitsEl.textContent = Utils.formatNumber(units, 0);
        revenueEl.textContent = Utils.formatCurrency(revenue, currency);
    }

    [fixedInput, priceInput, variableInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        fixedInput.value = '';
        priceInput.value = '';
        variableInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `Break-Even Units: ${unitsEl.textContent}\nBreak-Even Revenue: ${revenueEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
