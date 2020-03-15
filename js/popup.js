var background = chrome.extension.getBackgroundPage();

const timeUnit = {
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day'
}

function closeTabs(tabAgeLimit, tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (background.tabsToCreationTimeMap[tabs[i].id] < tabAgeLimit) {
            background.tabsToCreationTimeMap.delete(tabs[i].id);
            chrome.tabs.remove(tabs[i].id);
        }
    }
}

function getTimeLimit(currentTime, timeValue, timeUnitValue) {
    var timeLimit = new Date(currentTime);
    switch (timeUnitValue) {
        case timeUnit.MINUTE:
            timeLimit.setMinutes(currentTime.getMinutes() - timeValue);
            break;
        case timeUnit.HOUR:
            timeLimit.setHours(currentTime.getHours() - timeValue);
            break;
        case timeUnit.DAY:
            var numHours = timeValue * 24;
            timeLimit.setHours(currentTime.getHours - numHours);
            break;
    }
    return timeLimit;
}

function setStatus(color, text) {
    var statusSpan = document.getElementById("status");
    statusSpan.textContent = text;
    statusSpan.style.color = color;
}

(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Get all form-groups in need of validation
        var validateGroup = document.getElementsByClassName('validate-me');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                for (var i = 0; i < validateGroup.length; i++) {
                    validateGroup[i].classList.add('was-validated');
                }
            }, false);
        });
    }, false);
})();

document.addEventListener('DOMContentLoaded', function () {
    var tabAwayButton = document.getElementById('tabAwayBtn');

    tabAwayButton.addEventListener('click', function () {
        var timeValueInput = document.getElementById('timeValueInput');
        const validTimeValue = timeValueInput.checkValidity();

        if (validTimeValue) {
            var timeValue = timeValueInput.value;

            var timeUnitSelect = document.getElementById('sel1');
            var timeUnit = timeUnitSelect.options[timeUnitSelect.selectedIndex].value;

            chrome.tabs.query({}, function (tabs) {
                var currentTime = new Date(Date.now());
                var limit = getTimeLimit(currentTime, timeValue, timeUnit);
                closeTabs(limit, tabs);
            });
        } else {
            //            setStatus("red", "Invalid time value");
        }
    }, false);
}, false);
