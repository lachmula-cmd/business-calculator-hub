document.addEventListener('DOMContentLoaded', () => {
    const costInput = document.getElementById('cost');
    const priceInput = document.getElementById('price');
    const currencySelect = document.getElementById('currency');
    const markupEl = document.getElementById('result-markup');
    const profitEl = document.getElementById('result-profit');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const cost = Utils.parseInput(costInput.value);
        const price = Utils.parseInput(priceInput.value);
        const currency = currencySelect.value;

        if (!cost && !price) {
            markupEl.textContent = '-';
            profitEl.textContent = '-';
            return;
        }

        // Profit = Price - Cost
        const profit = price - cost;
        profitEl.textContent = Utils.formatCurrency(profit, currency);

        // Markup % = (Profit / Cost) * 100
        if (cost === 0) {
            markupEl.textContent = '-';
        } else {
            const markup = (profit / cost) * 100;
            markupEl.textContent = Utils.formatNumber(markup, 2) + '%';
        }
    }

    [costInput, priceInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        costInput.value = '';
        priceInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `Markup: ${markupEl.textContent}\nProfit: ${profitEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
