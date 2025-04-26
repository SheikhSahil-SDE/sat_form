// Function to validate the form
function validateForm(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get form fields
    const patientName = document.getElementById('patientName').value.trim();
    const fileNumber = document.getElementById('fileNumber').value.trim();
    const hospitalUnit = document.getElementById('hospitalUnit').value;
    const treatmentSatisfaction = document.querySelector('input[name="treatmentSatisfaction"]:checked')?.value;
    const facilitiesSatisfaction = document.querySelector('input[name="facilitiesSatisfaction"]:checked')?.value;
    const comments = document.getElementById('comments').value.trim();

    // Validate fields
    if (!patientName || !fileNumber || !hospitalUnit || !treatmentSatisfaction || !facilitiesSatisfaction) {
        alert('Please fill out all required fields.');
        return;
    }

    // Send data to the backend
    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            patientName,
            fileNumber,
            hospitalUnit,
            treatmentSatisfaction,
            facilitiesSatisfaction,
            comments,
        }),
    })
    .then(response => {
        if (response.ok) {
            alert('Form submitted successfully!');
        } else {
            alert('Error submitting form.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form.');
    });
}

// Attach the validateForm function to the form's submit event
document.querySelector('form').addEventListener('submit', validateForm);