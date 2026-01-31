document.addEventListener('DOMContentLoaded', () => {
    const gainInput = document.getElementById('gain');
    const costInput = document.getElementById('cost');
    const currencySelect = document.getElementById('currency');
    const roiEl = document.getElementById('result-roi');
    const profitEl = document.getElementById('result-profit');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const gain = Utils.parseInput(gainInput.value);
        const cost = Utils.parseInput(costInput.value);
        const currency = currencySelect.value;

        if (!gain && !cost) {
            roiEl.textContent = '-';
            profitEl.textContent = '-';
            return;
        }

        const profit = gain - cost;
        profitEl.textContent = Utils.formatCurrency(profit, currency);

        if (cost === 0) {
            roiEl.textContent = '-';
            roiEl.style.color = '';
        } else {
            const roi = (profit / cost) * 100;
            roiEl.textContent = Utils.formatNumber(roi, 2) + '%';

            if (roi < 0) {
                roiEl.style.color = '#dc3545';
            } else {
                roiEl.style.color = '#28a745';
            }
        }
    }

    [gainInput, costInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        gainInput.value = '';
        costInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `ROI: ${roiEl.textContent}\nNet Profit: ${profitEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
