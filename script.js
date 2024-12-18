document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    
    // Ask the user if they are interested in using the stopwatch
    const isInterested = confirm('Are you interested in using this stopwatch web application?');

    if (isInterested) {
        app.innerHTML = `
            <div class="stopwatch-container">
                <div class="display" id="display">00:00:00.000</div>
                <div class="buttons">
                    <button id="startStopButton">Start</button>
                    <button id="resetButton">Reset</button>
                </div>
            </div>
        `;

        // Initialize variables
        let startTime;
        let updatedTime;
        let difference;
        let timerInterval;
        let running = false;

        const display = document.getElementById('display');
        const startStopButton = document.getElementById('startStopButton');
        const resetButton = document.getElementById('resetButton');

        // Define functions
        function startStopwatch() {
            startTime = new Date().getTime();
            timerInterval = setInterval(showTime, 10);
        }

        function stopStopwatch() {
            clearInterval(timerInterval);
        }

        function resetStopwatch() {
            clearInterval(timerInterval);
            display.innerHTML = '00:00:00.000';
            running = false;
            startStopButton.innerHTML = 'Start';
        }

        function showTime() {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;

            let hours = Math.floor(difference / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            let milliseconds = Math.floor((difference % 1000) / 10);

            hours = (hours < 10) ? '0' + hours : hours;
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            milliseconds = (milliseconds < 10) ? '00' + milliseconds : (milliseconds < 100) ? '0' + milliseconds : milliseconds;

            display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }

        // Add event listeners
        startStopButton.addEventListener('click', function() {
            if (!running) {
                startStopwatch();
                startStopButton.innerHTML = 'Stop';
                running = true;
            } else {
                stopStopwatch();
                startStopButton.innerHTML = 'Start';
                running = false;
            }
        });

        resetButton.addEventListener('click', resetStopwatch);
    } else {
        const box = document.createElement('div');
        box.classList.add('message-box');
        box.innerHTML = '<p>Thank you for visiting. If you change your mind, refresh the page to use the stopwatch.</p>';
        app.appendChild(box);
    }
});
