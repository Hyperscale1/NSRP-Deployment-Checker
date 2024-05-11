function checkDeployment() {
    const unitInfo = document.getElementById('unitInfo').value.trim();
    const unitRows = unitInfo.split('\n');

    // Define the call sign prefixes and their ratios
    const divisionRatios = {
        "HWY": 2,
        "PORT": 4,
        "INT": 6,
        "CIRT": "LEADERSHIP DISCRETION",
    };

    // Get the callsign from the unitRow and nothing else EG 201 
    const callsigns = unitRows.map(row => row.split(/\s+/)[1]);
    console.log(callsigns)

    // Initialize a Map to hold the count of callsigns for each division
    const divisionCounts = new Map();
    // Iterate over the callsigns and update the count for each division
    callsigns.forEach(callsign => {
        if (!callsign) return; // Skip if callsign is undefined or empty
        if (callsign.startsWith("6")) {
            divisionCounts.set("HWY", (divisionCounts.get("HWY") || 0) + 1);
        } else if (callsign.startsWith("2") &&!callsign.startsWith("PORT")) {
            divisionCounts.set("GD", (divisionCounts.get("GD") || 0) + 1);
        } else if (callsign.startsWith("4")) {
            divisionCounts.set("INT", (divisionCounts.get("INT") || 0) + 1);
        } else if (callsign.startsWith("7")) {
            divisionCounts.set("CIRT", (divisionCounts.get("CIRT") || 0) + 1);
        }
    });

    for (const division in divisionRatios) {
        console.log(division)
        const deployableThreshold = divisionRatios[division] * 2;
        const currentValue = divisionCounts.get(division) || 0;
        
    
        // Perform the calculation to determine if the unit is deployable
        const newValue = currentValue >= divisionRatios[division]? currentValue : currentValue + (divisionRatios[division] - currentValue);
    
        // Check if newValue is NaN
        if (!isNaN(newValue)) {
            // If not NaN, update the divisionCounts
            divisionCounts.set(division, newValue);
        } else {
            // If NaN, log a warning and continue with the next iteration
            console.warn(`Warning: Ignored NaN result for division ${division}.`);
        }
    
        // Log if the unit is deployable
        if (newValue > deployableThreshold) {
            console.log(`Unit in division ${division} is deployable.`);
        } else {
            console.log(`Unit in division ${division} is not deployable.`);
        }
    }
    
    


    // Assuming divisionCounts is already populated with the counts for each division
// and divisionRatios is defined as shown in your previous messages

const deploymentResult = document.getElementById('deploymentResult');
deploymentResult.innerHTML = `
    <h2>Deployment Result:</h2>
    <table>
        <thead>
            <tr>
                <th>Division</th>
                <th>Current Units</th>
                <th>Deployable</th>
            </tr>
        </thead>
        <tbody>
            ${Array.from(divisionCounts.entries()).map(([division, count]) => `
                <tr>
                    <td>${division}</td>
                    <td>${count}</td>
                    <td>${count > divisionRatios[division] * 2? 'Yes' : 'No'}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
`;


}