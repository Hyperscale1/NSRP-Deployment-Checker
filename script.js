function checkDeployment() {
    const unitInfo = document.getElementById('unitInfo').value.trim();
    const unitRows = unitInfo.split('\n');

    // Define the call sign prefixes and their counts
    const divisionCallsigns = {
        "HWY": 6,
        "INT": 4,
        "CIRT": 7,
        "PORT": 2
    };

    // Get the callsign from the unitRow and nothing else EG 201 
    const callsigns = unitRows.map(row => row.split(/\s+/)[1]); // Adjusted to get the second part of the split

    // Count the number of callsigns for each division
    const divisionCounts = {};
    for (const division in divisionCallsigns) {
        divisionCounts[division] = callsigns.filter(callsign => callsign.startsWith(divisionCallsigns[division])).length;
    }

    // Calculate the required number of units for each division
    const requiredUnits = {};
    for (const division in divisionCallsigns) {
        requiredUnits[division] = divisionCounts[division] >= divisionCallsigns[division]? divisionCounts[division] : divisionCounts[division] + 3;
    }

    // Display the deployment status for each division
    const deploymentResult = document.getElementById('deploymentResult');
    deploymentResult.innerHTML = `
        <h2>Deployment Check Result</h2>
        ${Object.entries(requiredUnits).map(([division, count]) => `
            <p>${division}: ${count} Call Signs Required</p>
            <p>${count >= divisionCallsigns[division]? "Deployable" : "Not deployable"}</p>
        `).join('')}
    `;
}
