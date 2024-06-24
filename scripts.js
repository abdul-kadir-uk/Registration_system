//  define Elements 
const studentForm = document.getElementById("studentForm");
const registerBtn = document.getElementById("register-btn");
const viewRecordsBtn = document.querySelector("#records_btn a");

if (studentForm) {

  const nameInput = document.getElementById("studentName");
  const classInput = document.getElementById("class");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("emailID");

  // to enable capitalization 
  nameInput.addEventListener("blur", function () {
    nameInput.value = capitalizeFirstLetter(nameInput.value);
  });

  classInput.addEventListener("blur", function () {
    classInput.value = capitalizeFirstLetter(classInput.value);
  });

  addressInput.addEventListener("blur", function () {
    addressInput.value = capitalizeFirstLetter(addressInput.value);
  });

  // email in small letters 
  emailInput.addEventListener("blur", function () {
    emailInput.value = emailInput.value.toLowerCase();
  });


  studentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // disable the default behaviour like page reload
    // get the students array from local storage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // create the student object 
    const student = {
      name: document.getElementById("studentName").value,
      id: document.getElementById("studentID").value,
      class: document.getElementById("class").value,
      address: document.getElementById("address").value,
      email: document.getElementById("emailID").value,
      contact: document.getElementById("contactNo").value
    };

    // update the students array 
    const editIndex = registerBtn.dataset.editIndex;
    if (editIndex !== undefined) {
      students[editIndex] = student;
      delete registerBtn.dataset.editIndex;
      registerBtn.textContent = "Register";
      alert("Form updated successfully");
    } else {
      students.push(student);
      alert("Form submitted successfully");
    }

    // save it to the local storage 
    localStorage.setItem("students", JSON.stringify(students));
    studentForm.reset();
  });
}

if (viewRecordsBtn) {
  viewRecordsBtn.addEventListener("click", function () {
    loadRecords();
  });
}
// load the records on the records page 
if (document.getElementById("studentRecords")) {
  loadRecords();
}

// load records function for displaying records 
function loadRecords() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const tbody = document.querySelector("#studentRecords tbody");
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    const srNoCell = document.createElement("td");
    srNoCell.textContent = index + 1;
    row.appendChild(srNoCell);

    Object.keys(student).forEach(key => {
      const cell = document.createElement("td");
      cell.textContent = student[key];
      row.appendChild(cell);
    });

    const actionsCell = document.createElement("td");
    const editIcon = document.createElement("span");
    editIcon.innerHTML = `<i style="margin:5px 10px;" title="Edit" class="fa-solid fa-pen-to-square"></i>`;
    editIcon.style.cursor = "pointer";
    editIcon.addEventListener("click", function () {
      editRecord(index);
    });

    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = `<i style="margin:5px 10px"; title="Delete" class="fa-solid fa-trash"></i>`;
    deleteIcon.style.cursor = "pointer";
    deleteIcon.addEventListener("click", function () {
      deleteRecord(index);
    });

    actionsCell.appendChild(editIcon);
    actionsCell.appendChild(deleteIcon);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
}

// edit records  
function editRecord(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "index.html";
}

// delete records 
function deleteRecord(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  loadRecords();
}

// load the data in the form 
if (studentForm && localStorage.getItem("editIndex") !== null) {
  const editIndex = localStorage.getItem("editIndex");
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[editIndex];
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentID").value = student.id;
  document.getElementById("class").value = student.class;
  document.getElementById("address").value = student.address;
  document.getElementById("emailID").value = student.email;
  document.getElementById("contactNo").value = student.contact;
  registerBtn.dataset.editIndex = editIndex;
  registerBtn.textContent = "Update";
  localStorage.removeItem("editIndex");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
