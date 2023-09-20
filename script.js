// JavaScript code to handle form submission and generate CSV and PDF files
const trackerForm = document.getElementById("trackerForm");
const entriesContainer = document.getElementById("entries");

trackerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Capture the values of the form fields
  const name = document.getElementById("name").value;
  const contactNumber = document.getElementById("contactNumber").value;
  const email = document.getElementById("email").value;
  const expertise = document.getElementById("expertise").value;
  const rate = document.getElementById("rate").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const noticePeriod = document.getElementById("noticePeriod").value;
  const experience = document.getElementById("experience").value;
  const payg = document.getElementById("payg").value;
  const date = document.getElementById("date").value;
  const day = document.getElementById("day").value;
  const description = document.getElementById("description").value;
  const reminder = document.getElementById("reminder").value;

  // Create a new entry object
  const entry = {
    name,
    contactNumber,
    email,
    expertise,
    rate,
    country,
    city,
    noticePeriod,
    experience,
    payg,
    date,
    day,
    description,
    reminder,
  };

  // Display the entry
  displayEntry(entry);

  // Clear the form
  trackerForm.reset();
});

// Function to display an entry and add a download button for that entry (CSV and PDF)
function displayEntry(entry) {
  const entryDiv = document.createElement("div");
  entryDiv.className = "entry";

  // Include the form field values in the displayed entry as plain text
  const entryHTML = `
        <h2>${entry.name}</h2>
        <p>Country: ${entry.country}</p>
        <p>City: ${entry.city}</p>
        <p>Contact Number: ${entry.contactNumber}</p>
        <p>Email: ${entry.email}</p>
        <p>Expertise: ${entry.expertise}</p>
        <p>Rate: ${entry.rate}</p>
        <p>Notice Period: ${entry.noticePeriod}</p>
        <p>Experience: ${entry.experience}</p>
        <p>Payg: ${entry.payg}</p>
        <p>Date: ${entry.date}</p>
        <p>Day: ${entry.day}</p>
        <p>Description: ${entry.description}</p>
        <p>Reminder: ${entry.reminder}</p>
        <button class="downloadEntryCSV">Download Entry as CSV</button>
        <button class="downloadEntryPDF">Download Entry as PDF</button>
        <button class="edit-entry">Edit</button>
        <button class="delete-entry">Delete</button>
    `;

  entryDiv.innerHTML = entryHTML;
  entriesContainer.appendChild(entryDiv);

  // Add event listener to the download button for CSV
  const downloadButtonCSV = entryDiv.querySelector(".downloadEntryCSV");
  downloadButtonCSV.addEventListener("click", function () {
    downloadEntryAsCSV(entry);
  });

  // Add event listener to the download button for PDF
  const downloadButtonPDF = entryDiv.querySelector(".downloadEntryPDF");
  downloadButtonPDF.addEventListener("click", function () {
    downloadEntryAsPDF(entry);
  });

  // Add event listener to the edit button
  const editButton = entryDiv.querySelector(".edit-entry");
  editButton.addEventListener("click", function () {
    openEditForm(entry, entryDiv);
  });

  // Add event listener to the delete button
  const deleteButton = entryDiv.querySelector(".delete-entry");
  deleteButton.addEventListener("click", function () {
    deleteEntry(entryDiv);
  });
}

// Function to open an edit form
function openEditForm(entry, entryDiv) {
  // You can create form fields and populate them with entry data here
  // Implement the logic to update the entry and display changes
  // Example: Create form fields, update entry object, update displayed entry
  const editForm = document.createElement("form");
  editForm.innerHTML = `
        <!-- Create form fields and populate them with entry data here -->
        <label for="editName">Edit Name:</label>
        <input type="text" id="editName" name="editName" value="${entry.name}" required /><br /><br />
        <!-- Create other form fields and populate them similarly -->

        <button type="button" class="save-edit">Save</button>
        <button type="button" class="cancel-edit">Cancel</button>
    `;

  // Add event listener to the "Save" button
  const saveEditButton = editForm.querySelector(".save-edit");
  saveEditButton.addEventListener("click", function () {
    saveEditChanges(entry, entryDiv, editForm);
  });

  // Add event listener to the "Cancel" button
  const cancelEditButton = editForm.querySelector(".cancel-edit");
  cancelEditButton.addEventListener("click", function () {
    closeEditForm(entryDiv, editForm);
  });

  entryDiv.appendChild(editForm);
}

// Function to save edit changes
function saveEditChanges(entry, entryDiv, editForm) {
  // Retrieve updated data from edit form fields
  // Update the entry object with the new data
  // Update the displayed entry with the updated data
  // Close the edit form
  const updatedName = document.getElementById("editName").value;
  // Retrieve and update other fields similarly

  entry.name = updatedName;
  // Update other entry fields similarly

  // Update the displayed entry with the updated data
  updateDisplayedEntry(entryDiv, entry);

  // Close the edit form
  closeEditForm(entryDiv, editForm);
}

// Function to update the displayed entry after editing
function updateDisplayedEntry(entryDiv, updatedEntry) {
  // Implement logic to update the displayed entry with updated data
  // You can replace the innerHTML of entryDiv with the updated data
  // Example:
  entryDiv.innerHTML = `
        <h2>${updatedEntry.name}</h2>
        <p>Country: ${updatedEntry.country}</p>
        <!-- Update other fields similarly -->
        <button class="downloadEntryCSV">Download Entry as CSV</button>
        <button class="downloadEntryPDF">Download Entry as PDF</button>
        <button class="edit-entry">Edit</button>
        <button class="delete-entry">Delete</button>
    `;
}

// Function to close the edit form
function closeEditForm(entryDiv, editForm) {
  // Remove the edit form from the entryDiv
  entryDiv.removeChild(editForm);
}

// Function to delete an entry
function deleteEntry(entryDiv) {
  // Remove the entryDiv from the entriesContainer
  entriesContainer.removeChild(entryDiv);
}

// Function to handle CSV download
function downloadEntryAsCSV(entry) {
  // Create a CSV string from the entry data
  const csvData = `Name,Contact Number,Email,Expertise,Rate,Country,City,Notice Period,Experience,Payg,Date,Day,Description,Reminder\n
                   ${entry.name},${entry.contactNumber},${entry.email},${entry.expertise},${entry.rate},${entry.country},${entry.city},${entry.noticePeriod},${entry.experience},${entry.payg},${entry.date},${entry.day},${entry.description},${entry.reminder}\n`;

  // Create a Blob containing the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  // Create a temporary anchor element for downloading
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);

  // Set the filename for the download
  link.download = "entry.csv";

  // Trigger the click event to start the download
  link.click();
}

// Function to handle PDF download
function downloadEntryAsPDF(entry) {
  // Create a PDF document
  const pdfDoc = new jsPDF();
  
  // Define the content for the PDF (you can customize this)
  const pdfContent = `
    Name: ${entry.name}
    Contact Number: ${entry.contactNumber}
    Email: ${entry.email}
    Expertise: ${entry.expertise}
    Rate: ${entry.rate}
    Country: ${entry.country}
    City: ${entry.city}
    Notice Period: ${entry.noticePeriod}
    Experience: ${entry.experience}
    Payg: ${entry.payg}
    Date: ${entry.date}
    Day: ${entry.day}
    Description: ${entry.description}
    Reminder: ${entry.reminder}
  `;
  
  // Add the content to the PDF
  pdfDoc.text(pdfContent, 10, 10);
  
  // Save or download the PDF
  pdfDoc.save("entry.pdf");
}


// Function to handle form validation and error handling
function validateForm() {
  // Get the form input values
  const name = document.getElementById("name").value;
  const contactNumber = document.getElementById("contactNumber").value;
  const email = document.getElementById("email").value;
  const expertise = document.getElementById("expertise").value;
  const rate = document.getElementById("rate").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const noticePeriod = document.getElementById("noticePeriod").value;
  const experience = document.getElementById("experience").value;
  const payg = document.getElementById("payg").value;
  const date = document.getElementById("date").value;
  const day = document.getElementById("day").value;
  const description = document.getElementById("description").value;

  // Perform your form validation here
  // You can check if the input values meet your requirements

  // Example: Check if the name is not empty
  if (name.trim() === "") {
    alert("Name cannot be empty.");
    return false; // Prevent form submission
  }

  // Example: Check if the email is in a valid format using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return false; // Prevent form submission
  }

  // You can add more validation rules as needed

  // If all validation passes, you can allow the form submission
  return true;
}

// Function to change the heading text periodically
function typeHeading() {
  const heading = document.getElementById("typingHeading");
  const phrases = [
    "Client Record",
    "Manage Data",
    "Track Progress",
    "Stay Organized",
  ];
  let index = 0;

  heading.textContent = phrases[index];
  index = (index + 1) % phrases.length;
}

// Set up a timer to change the heading periodically
setInterval(typeHeading, 5000); // Change the heading every 5 seconds
