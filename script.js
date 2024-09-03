document.querySelector('#push').onclick = function() {
    const tasksContainer = document.querySelector('#tasks');
    const inputField = document.querySelector('#newtask input[type="text"]');
    const timeField = document.querySelector('#task-time');

    if (inputField.value.length == 0) {
        alert("Please Enter a Task");
    } else {
        // Check if today's date header already exists
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        let formattedDate = mm + '/' + dd + '/' + yyyy;

        // Check if a header with ID based on the date exists
        if (!document.getElementById(`date-${formattedDate}`)) {
            // If not, create a new date element
            let dateHeader = document.createElement('div');
            dateHeader.className = 'date-header';
            dateHeader.id = `date-${formattedDate}`;
            dateHeader.innerText = "Tasks for " + formattedDate;
            tasksContainer.appendChild(dateHeader);
        }

        // Add new task below the date header
        tasksContainer.innerHTML += `
            <div class="task">
                <span class="check"><i class="far fa-circle"></i></span>
                <span id="taskname">
                    ${inputField.value} - ${timeField.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        // Update delete button functionality
        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function() {
                this.parentNode.remove();
            }
        }

        // Update check functionality
        var checks = document.querySelectorAll(".check");
        for (var i = 0; i < checks.length; i++) {
            checks[i].onclick = function() {
                this.classList.toggle('completed');
                this.innerHTML = this.classList.contains('completed') ? '<i class="far fa-check-circle"></i>' : '<i class="far fa-circle"></i>';
                this.parentNode.querySelector('#taskname').classList.toggle('completed');
            }
        }

        // Clear input after adding task
        inputField.value = "";
        timeField.value = "";
    }
};
