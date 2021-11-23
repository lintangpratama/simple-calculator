const CACHE_KEY = "calculation_history"

function checkForStorage() {
    return typeof(Storage) !== undefined;
}

function putHistoryToLocal(data) {
    if (checkForStorage()) {
        let historyData = null;

        // Checking the "calculation_history" localStorage and set the historyData
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        // Limit the displayed history data to 5 history
        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function getHistoryFromLocal() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY));
    } else {
        return [];
    }
}

function showHistory() {
    const historyData = getHistoryFromLocal();
    console.log(historyData[0].firstNumber);
    console.log(historyData);
    let historyList = document.querySelector("#historyList")

    // Reset the HTML in historyList id to prevent the doubled data
    historyList.innerHTML = "";

    // Create a table row element and its value per calculation history
    for (let history of historyData) {
        let row = document.createElement('tr');

        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        console.log(row);
        
        historyList.appendChild(row);
    }
}

showHistory()