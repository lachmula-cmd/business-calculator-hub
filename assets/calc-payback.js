document.addEventListener('DOMContentLoaded', () => {
    const investmentInput = document.getElementById('investment');
    const cashflowInput = document.getElementById('cashflow');
    const monthsEl = document.getElementById('result-months');
    const yearsEl = document.getElementById('result-years');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const investment = Utils.parseInput(investmentInput.value);
        const cashflow = Utils.parseInput(cashflowInput.value);

        if (!investment && !cashflow) {
            monthsEl.textContent = '-';
            yearsEl.textContent = '';
            return;
        }

        if (cashflow <= 0) {
            monthsEl.textContent = 'Never';
            yearsEl.textContent = '(Cash flow must be positive)';
            return;
        }

        const months = investment / cashflow;
        const years = months / 12;

        monthsEl.textContent = Utils.formatNumber(months, 1) + ' Months';
        if (years >= 1) {
            yearsEl.textContent = `approx. ${Utils.formatNumber(years, 1)} Years`;
        } else {
            yearsEl.textContent = '';
        }
    }

    [investmentInput, cashflowInput].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        investmentInput.value = '';
        cashflowInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `Payback Period: ${monthsEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
