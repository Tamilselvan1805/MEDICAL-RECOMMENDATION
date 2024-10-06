document.getElementById('diagnose-button').onclick = function() {
    const symptoms = document.getElementById('symptoms').value;

    // Send the symptoms to the backend using a POST request
    fetch('http://localhost:5000/diagnose', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('result').innerHTML = `
            <h3>Diagnosis Result:</h3>
            <p><strong>Disease:</strong> ${data.diagnosis}</p>
            <p><strong>Precautions:</strong> ${data.precautions}</p>
            <p><strong>Workout:</strong> ${data.workout}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Medication:</strong> ${data.medication}</p>
            <p><strong>Diet:</strong> ${data.diet}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = '<p>An error occurred. Please try again.</p>';
    });
};
