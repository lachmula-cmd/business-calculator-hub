document.addEventListener('DOMContentLoaded', () => {
    const costInput = document.getElementById('cost');
    const revenueInput = document.getElementById('revenue');
    const currencySelect = document.getElementById('currency');
    const profitEl = document.getElementById('result-profit');
    const marginEl = document.getElementById('result-margin');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const cost = Utils.parseInput(costInput.value);
        const revenue = Utils.parseInput(revenueInput.value);
        const currency = currencySelect.value;

        if (!cost && !revenue) {
            profitEl.textContent = '-';
            marginEl.textContent = '-';
            return;
        }

        const profit = revenue - cost;

        profitEl.textContent = Utils.formatCurrency(profit, currency);

        // Margin % = Profit / Revenue * 100
        // Handle divide by zero
        if (revenue === 0) {
            marginEl.textContent = '-';
            marginEl.style.color = '';
        } else {
            const margin = (profit / revenue) * 100;
            marginEl.textContent = Utils.formatNumber(margin, 2) + '%';

            // Color coding
            if (margin < 0) {
                marginEl.style.color = '#dc3545'; // Red
            } else {
                marginEl.style.color = '#28a745'; // Green
            }
        }
    }

    // Event listeners for inputs
    [costInput, revenueInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
        costInput.value = '';
        revenueInput.value = '';
        calculate();
    });

    // Copy results
    copyBtn.addEventListener('click', () => {
        const text = `Profit: ${profitEl.textContent}\nMargin: ${marginEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
