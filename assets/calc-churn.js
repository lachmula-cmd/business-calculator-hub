document.addEventListener('DOMContentLoaded', () => {
    const startInput = document.getElementById('start-customers');
    const churnInput = document.getElementById('churn-rate');
    const newInput = document.getElementById('new-customers');
    const finalCustEl = document.getElementById('final-customers');
    const totalLostEl = document.getElementById('total-lost');
    const tableBody = document.querySelector('#projection-table tbody');
    const resetBtn = document.getElementById('reset-btn');
    const shareBtn = document.getElementById('share-btn');
    const errorMsg = document.getElementById('error-msg');

    function calculate() {
        const start = Utils.parseInput(startInput.value);
        const churnRate = Utils.parseInput(churnInput.value);
        const newCust = Utils.parseInput(newInput.value);

        // Clear table and errors
        tableBody.innerHTML = '';
        errorMsg.style.display = 'none';

        // Validation
        if (churnRate < 0 || churnRate > 100) {
            showError("Churn rate must be between 0 and 100.");
            return;
        }
        if (start < 0) {
            showError("Starting customers cannot be negative.");
            return;
        }
        if (newCust < 0) {
            showError("New customers cannot be negative.");
            return;
        }

        if (!start && !churnRate && !newCust) {
            finalCustEl.textContent = '-';
            totalLostEl.textContent = '-';
            return;
        }

        let currentCustomers = start;
        let totalLost = 0;
        const churnDecimal = churnRate / 100;

        for (let i = 1; i <= 12; i++) {
            // Keep precision - calculate lost based on float
            const lost = currentCustomers * churnDecimal;
            totalLost += lost;

            const endCustomers = currentCustomers - lost + newCust;

            // Add row - Round ONLY for display
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i}</td>
                <td>${Math.round(currentCustomers)}</td>
                <td>${newCust}</td>
                <td style="color: #dc3545;">-${Math.round(lost)}</td>
                <td style="font-weight: bold;">${Math.round(endCustomers)}</td>
            `;
            tableBody.appendChild(row);

            currentCustomers = endCustomers;
        }

        finalCustEl.textContent = Utils.formatNumber(Math.round(currentCustomers), 0);
        totalLostEl.textContent = Utils.formatNumber(Math.round(totalLost), 0);
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
        finalCustEl.textContent = '-';
        totalLostEl.textContent = '-';
    }

    [startInput, churnInput, newInput].forEach(el => {
        el.addEventListener('input', calculate);
    });

    resetBtn.addEventListener('click', () => {
        startInput.value = '';
        churnInput.value = '';
        newInput.value = '';
        calculate();
    });

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            Utils.copyToClipboard(window.location.href, shareBtn);
        });
    }
});
