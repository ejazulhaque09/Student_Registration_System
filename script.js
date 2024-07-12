// Taking reference of the input 
const form = document.getElementById('studentForm');

// Taking reference for the output
const recordsBody = document.getElementById('recordsBody');

loadRecords();

// Listener for submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = form.studentName.value.trim();
    const studentId = form.studentId.value.trim();
    const emailId = form.emailId.value.trim();
    const contactNo = form.contactNo.value.trim();

    if (!studentName || !studentId || !emailId || !contactNo) {
        alert("All fields are required !");
        return;
    }

    addRecords({ studentName, studentId, emailId, contactNo }); 
    form.reset(); // reset the form after submit
});

// Adds to record
function addRecords(record) {  
    const records = getRecords();
    records.push(record);
    saveRecords(records)
    renderRecords();
}

function renderRecords() {
    recordsBody.innerHTML = '';
    const records = getRecords();

    records.forEach((record, index) => {
        const row = document.createElement('tr');   // creates new tr element

        row.innerHTML = `
            <td class="p-2 text-center border-b-2 border-gray-300">${record.studentName}</td> 
            <td class="p-2 text-center border-b-2 border-gray-300">${record.studentId}</td>
            <td class="p-2 text-center border-b-2 border-gray-300">${record.emailId}</td>
            <td class="p-2 text-center border-b-2 border-gray-300">${record.contactNo}</td>
            <td class="p-2 text-center border-b-2 border-gray-300 "> 
                <button class="edit m-1 w-20 btn bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition transform hover:scale-105" onClick = "editRecord(${index})">Edit</button> 
                <button class="delete m-1 w-20 btn bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition transform hover:scale-105" onClick = "deleteRecord(${index})">Delete</button> 
            </td>`;


        recordsBody.appendChild(row);  // Appends to recordsBody
    });
}


//Function for editing the records
function editRecord(index) {
    const records = getRecords();
    const record = records[index];

    form.studentName.value = record.studentName;
    form.studentId.value = record.studentId;
    form.emailId.value = record.emailId;
    form.contactNo.value = record.contactNo;

    deleteRecord(index);  // Deletes the record to avoid duplicate record
}


//Function for deleting the records
function deleteRecord(index) {
    const records = getRecords();
    records.splice(index, 1);
    saveRecords(records);
    renderRecords();
}

//Fetching the records for local storage
function getRecords() {
    return JSON.parse(localStorage.getItem('students')) || [];
    //returns the prrevious data or empty array
}

//Saves the records to local storage
function saveRecords(records) {
    localStorage.setItem('students', JSON.stringify(records));
}

function loadRecords() {
    renderRecords();
}
