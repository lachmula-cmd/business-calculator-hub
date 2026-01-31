document.addEventListener('DOMContentLoaded', () => {
    const arpuInput = document.getElementById('arpu');
    const marginInput = document.getElementById('gross-margin');
    const churnInput = document.getElementById('churn');
    const currencySelect = document.getElementById('currency');
    const ltvEl = document.getElementById('result-ltv');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const arpu = Utils.parseInput(arpuInput.value);
        const margin = Utils.parseInput(marginInput.value);
        const churn = Utils.parseInput(churnInput.value);
        const currency = currencySelect.value;

        if (!arpu && !margin && !churn) {
            ltvEl.textContent = '-';
            return;
        }

        if (churn === 0) {
            ltvEl.textContent = '∞ (Churn cannot be 0)';
            return;
        }

        // LTV = (ARPU * GrossMargin%) / Churn%
        // If margin is 70, use 0.7. If churn is 5, use 0.05.
        const marginDecimal = margin / 100;
        const churnDecimal = churn / 100;

        const ltv = (arpu * marginDecimal) / churnDecimal;

        ltvEl.textContent = Utils.formatCurrency(ltv, currency);
    }

    [arpuInput, marginInput, churnInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        arpuInput.value = '';
        marginInput.value = '';
        churnInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `LTV: ${ltvEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
