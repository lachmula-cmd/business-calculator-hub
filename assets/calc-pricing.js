document.addEventListener('DOMContentLoaded', () => {
    const unitCostInput = document.getElementById('unit-cost');
    const overheadInput = document.getElementById('overhead');
    const unitsInput = document.getElementById('expected-units');
    const marginInput = document.getElementById('margin');
    const currencySelect = document.getElementById('currency');

    const priceEl = document.getElementById('result-price');
    const detailUnitCostEl = document.getElementById('detail-unit-cost');
    const detailOverheadEl = document.getElementById('detail-overhead');
    const detailTotalCostEl = document.getElementById('detail-total-cost');
    const errorMsg = document.getElementById('error-msg');

    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');

    function calculate() {
        const unitCost = Utils.parseInput(unitCostInput.value);
        const overhead = Utils.parseInput(overheadInput.value);
        const units = Utils.parseInput(unitsInput.value);
        const marginPercent = Utils.parseInput(marginInput.value);
        const currency = currencySelect.value;

        errorMsg.style.display = 'none';

        if (!unitCost && !overhead && !units && !marginPercent) {
            priceEl.textContent = '-';
            detailUnitCostEl.textContent = '-';
            detailOverheadEl.textContent = '-';
            detailTotalCostEl.textContent = '-';
            return;
        }

        // Guard: If overhead > 0, units must be > 0
        if (overhead > 0 && units <= 0) {
            errorMsg.textContent = "Units must be > 0 to allocate overhead.";
            errorMsg.style.display = 'block';
            priceEl.textContent = '-';
            detailOverheadEl.textContent = '-';
            detailTotalCostEl.textContent = '-';
            return;
        }

        let overheadPerUnit = 0;
        if (units > 0) {
            overheadPerUnit = overhead / units;
        } else if (overhead === 0) {
            overheadPerUnit = 0;
        }

        const totalCostPerUnit = unitCost + overheadPerUnit;

        // Margin calculation
        let price = 0;
        const marginDecimal = marginPercent / 100;

        if (marginDecimal >= 1) {
            priceEl.textContent = "Error (Margin < 100%)";
            return;
        }

        price = totalCostPerUnit / (1 - marginDecimal);

        priceEl.textContent = Utils.formatCurrency(price, currency);

        // Details
        detailUnitCostEl.textContent = Utils.formatCurrency(unitCost, currency);
        detailOverheadEl.textContent = Utils.formatCurrency(overheadPerUnit, currency);
        detailTotalCostEl.textContent = Utils.formatCurrency(totalCostPerUnit, currency);
    }

    [unitCostInput, overheadInput, unitsInput, marginInput, currencySelect].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        unitCostInput.value = '';
        overheadInput.value = '';
        unitsInput.value = '';
        marginInput.value = '';
        calculate();
    });

    copyBtn.addEventListener('click', () => {
        const text = `Recommended Price: ${priceEl.textContent}`;
        Utils.copyToClipboard(text, copyBtn);
    });
});
