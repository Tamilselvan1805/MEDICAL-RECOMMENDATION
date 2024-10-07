document.getElementById("diagnose-button").onclick = function () {
  const symptoms = document.getElementById("symptoms").value;

  // Send the symptoms to the backend using a POST request
  fetch("http://localhost:5000/diagnose", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symptoms: symptoms }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("result").innerHTML = `
      <div class="diagnosis_result">
            <h3>Diagnosis Result:</h3>
            <p><strong>Disease:</strong><br> ${data.diagnosis}</p>
            <p><strong>Precautions:</strong><br> ${data.precautions}</p>
            <p><strong>Workout:</strong><br> ${data.workout}</p>
            <p><strong>Description:</strong><br> ${data.description}</p>
            <p><strong>Medication:</strong><br> ${data.medication.replace(/[\[\]]/g, '')}</p>
            <p><strong>Diet:</strong><br> ${data.diet.replace(/[\[\]]/g,'')}</p>
      </div>
        `;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").innerHTML =
        "<p>An error occurred. Please try again.</p>";
    });
};
