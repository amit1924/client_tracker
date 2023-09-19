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
}

// Function to download an entry as a CSV file
function downloadEntryAsCSV(entry) {
  const csvData = [
    [
      "Name",
      "Country",
      "City",
      "Contact Number",
      "Email",
      "Expertise",
      "Rate",
      "Notice Period",
      "Experience",
      "Payg",
      "Date",
      "Day",
      "Description",
      "Reminder",
    ],
    [
      entry.name,
      entry.country,
      entry.city,
      entry.contactNumber,
      entry.email,
      entry.expertise,
      entry.rate,
      entry.noticePeriod,
      entry.experience,
      entry.payg,
      entry.date,
      entry.day,
      entry.description,
      entry.reminder,
    ],
  ];

  // Convert the CSV data to a string
  const csvString = csvData.map((row) => row.join(",")).join("\n");

  // Create a Blob object containing the CSV data
  const blob = new Blob([csvString], { type: "text/csv" });

  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = "tracker_entry.csv";
  document.body.appendChild(a);
  a.click();

  // Clean up by revoking the Blob URL
  window.URL.revokeObjectURL(url);

  // Remove the temporary anchor element
  document.body.removeChild(a);
}

// Function to download an entry as a PDF file
// Function to download an entry as a PDF file
// function downloadEntryAsPDF(entry) {
//     // Create a div element to hold the content of the PDF
//     const pdfContent = document.createElement('div');
//     pdfContent.innerHTML = `
//         <h2>${entry.name}</h2>
//         <p>Country: ${entry.country}</p>
//         <p>City: ${entry.city}</p>
//         <p>Contact Number: ${entry.contactNumber}</p>
//         <p>Email: ${entry.email}</p>
//         <p>Expertise: ${entry.expertise}</p>
//         <p>Rate: ${entry.rate}</p>
//         <p>Notice Period: ${entry.noticePeriod}</p>
//         <p>Experience: ${entry.experience}</p>
//         <p>Payg: ${entry.payg}</p>
//         <p>Date: ${entry.date}</p>
//         <p>Day: ${entry.day}</p>
//         <p>Description: ${entry.description}</p>
//         <p>Reminder: ${entry.reminder}</p>
//     `;

//     // Options for html2pdf
//     const pdfOptions = {
//         margin: 10,
//         filename: 'tracker_entry.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//     };

//     // Generate PDF from the content
//     const element = pdfContent; // Element to be converted to PDF
//     html2pdf().from(element).set(pdfOptions).outputPdf().then(function(pdf) {
//         // Create a Blob object containing the PDF data
//         const blob = new Blob([pdf], { type: 'application/pdf' });

//         // Create a temporary URL for the Blob
//         const url = window.URL.createObjectURL(blob);

//         // Create a temporary anchor element to trigger the download
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'tracker_entry.pdf';
//         document.body.appendChild(a);
//         a.click();

//         // Clean up by revoking the Blob URL
//         window.URL.revokeObjectURL(url);

//         // Remove the temporary anchor element
//         document.body.removeChild(a);
//     });
// }

//Json Downloader Functions

const heading = document.getElementById("typingHeading");
const phrases = [
  "Client Record",
  "Manage Data",
  "Track Progress",
  "Stay Organized",
];
let index = 0;

function typeHeading() {
  heading.textContent = phrases[index];
  index = (index + 1) % phrases.length;
}

setInterval(typeHeading, 5000); // Change the heading every 5 seconds
