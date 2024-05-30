document.addEventListener('DOMContentLoaded', (event) => {
    const value1 = document.getElementById('value1');
    const value2 = document.getElementById('value2');
    const value3 = document.getElementById('value3');
    const value4 = document.getElementById('value4');

    function generateRandomValues() {
        const randomValue1 = (Math.random() * 10).toFixed(2);
        const randomValue2 = (Math.random() * 10).toFixed(2);
        const randomValue3 = (Math.random() * 10).toFixed(2);
        const randomValue4 = (Math.random() * 10).toFixed(2);

        value1.textContent = `${randomValue1}`;
        value2.textContent = `${randomValue2}`;
        value3.textContent = `${randomValue3}`;
        value4.textContent = `${randomValue4}`;
    }

    setInterval(generateRandomValues, 1000);

    const openMonitorBtn = document.getElementById('openMonitorBtn');
    const monitorModal = document.getElementById('monitorModal');
    const closeMonitorBtn = document.getElementById('closeMonitorBtn');

    openMonitorBtn.addEventListener('click', () => {
        monitorModal.style.display = 'flex';
    });

    closeMonitorBtn.addEventListener('click', () => {
        monitorModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == monitorModal) {
            monitorModal.style.display = 'none';
        }
    });

    document.querySelectorAll(".switch-toggle input[type='checkbox']").forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            var status = this.checked ? "on" : "off";
            var lightId = this.id.replace("checkbox_", ""); // Extract the light ID from the checkbox id
            toggleLEDBulb(lightId, status); // Toggle the LED bulb
            console.log(`Checkbox changed: ${this.id}, Status: ${status}`); // Debug log for checkbox change
            sendDataToSpreadsheet(lightId + status); // Send the light ID along with the status
        });
    });

    function toggleLEDBulb(lightId, status) {
        var bulb = document.getElementById(lightId);
        if (status === "on") {
            bulb.classList.add("on");
        } else {
            bulb.classList.remove("on");
        }
    }

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxJfDdIlDGdzuVAN6E3LaInPmLQVfED02FVvetrhRrxwnh6Vkmgv6nqLLBYNO--Z5L_Qg/exec?read=true';

    async function fetchSheetData() {
        try {
            const response = await fetch(webAppUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function updateValue() {
        const currentValue = await fetchSheetData();
        const currentValueDiv = document.getElementById('currentValue');
        if (currentValue !== null) {
            currentValueDiv.textContent = currentValue;
        } else {
            currentValueDiv.textContent = 'Error fetching data';
        }
    }

    updateValue();
    setInterval(updateValue, 30000);

    setInterval(updateValue, 1000);
});

function sendDataToSpreadsheet(status) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Data sent successfully");
        }
    };
    xhttp.open("GET", "https://script.google.com/macros/s/AKfycbwicZyi22fyskl_Jjb7XhKgsw-ZEpZbQqaV26Ju3zCFUoDtygv-QYcpocCfRWaBi3ez7w/exec?status=" + status, true);
    xhttp.send();
}
document.addEventListener('DOMContentLoaded', (event) => {
    const value1 = document.getElementById('value1');
    const value2 = document.getElementById('value2');
    const value3 = document.getElementById('value3');
    const value4 = document.getElementById('value4');

    const status1 = document.getElementById('status_1');
    const status2 = document.getElementById('status_2');
    const status3 = document.getElementById('status_3');
    const status4 = document.getElementById('status_4');

    function generateRandomValues() {
        const randomValue1 = (Math.random() * 10).toFixed(2);
        const randomValue2 = (Math.random() * 10).toFixed(2);
        const randomValue3 = (Math.random() * 10).toFixed(2);
        const randomValue4 = (Math.random() * 10).toFixed(2);

        value1.textContent = `${randomValue1}`;
        value2.textContent = `${randomValue2}`;
        value3.textContent = `${randomValue3}`;
        value4.textContent = `${randomValue4}`;

        updateStatus(status1, randomValue1);
        updateStatus(status2, randomValue2);
        updateStatus(status3, randomValue3);
        updateStatus(status4, randomValue4);
    }

    function updateStatus(statusElement, value) {
        if (parseFloat(value) > 2) {
            statusElement.textContent = 'WORKING';
            statusElement.classList.remove('not-working');
            statusElement.classList.add('working');
        } else {
            statusElement.textContent = 'NOT WORKING';
            statusElement.classList.remove('working');
            statusElement.classList.add('not-working');
        }
    }

    setInterval(generateRandomValues, 1000);
});


