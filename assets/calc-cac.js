document.addEventListener('DOMContentLoaded', () => {
    const spendInput = document.getElementById('spend');
    const customersInput = document.getElementById('customers');
    const currencySelect = document.getElementById('currency');
    const cacEl = document.getElementById('result-cac');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const spend = Utils.parseInput(spendInput.value);
        const customers = Utils.parseInput(customersInput.value);
        const currency = currencySelect.value;

        if (!spend && !customers) {
            cacEl.textContent = '-';
            return;
        }

        if (customers === 0) {
            cacEl.textContent = '∞';
            return;
        }

        const cac = spend / customers;
        cacEl.textContent = Utils.formatCurrency(cac, currency);
    }

    [spendInput, customersInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        spendInput.value = '';
        customersInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `CAC: ${cacEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
