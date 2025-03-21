// Localizer (LLZ) Function to convert power from dBm to mW and W
function convertPowerLLZ() {
    let powerDbm = parseFloat(document.getElementById("powerInputLLZ").value);

    if (!isNaN(powerDbm)) {
        let powerMilliWatt = Math.pow(10, powerDbm / 10);
        let powerWatt = powerMilliWatt / 1000;

        // Display the calculated power in mW and W
        document.getElementById("outputPowerLLZ").innerText = `${powerMilliWatt.toFixed(4)} mW / ${powerWatt.toFixed(6)} W`;
    } else {
        // Display "Invalid input" if the input is not valid
        document.getElementById("outputPowerLLZ").innerText = "Invalid input";
    }
}






function calculateCourseWidthLLZ() {
    let y = parseFloat(document.getElementById("runwayLengthLLZ").value);
    
    // Check if the input is valid
    if (!isNaN(y) && y > 0) {
        // Calculate course width
        let courseWidth = 2 * Math.atan(106.68 / y) * (180 / Math.PI);
        
        // Update the result in the HTML span element
        document.getElementById("outputCourseWidthLLZ").innerText = `${courseWidth.toFixed(4)}°`;
    } else {
        // Display invalid input message if input is not valid
        document.getElementById("outputCourseWidthLLZ").innerText = "Invalid input";
    }
}








// Localizer (LLZ) Function to convert distance to DDM percentage
function convertDistanceLLZ() {
    let distance = parseFloat(document.getElementById("distanceLLZ").value);

    if (!isNaN(distance) && distance >= 0) {
        let ddm = 0.145 * distance; // Conversion factor for DDM
        // Display the calculated DDM % value
        document.getElementById("outputDDMLLZ").innerText = `${ddm.toFixed(2)}%`;
    } else {
        // Display "Invalid input" if the input is not valid
        document.getElementById("outputDDMLLZ").innerText = "Invalid input";
    }
}


// Function to calculate the current from DDM percentage
function calculateCurrentLLZ() {
    let distance = parseFloat(document.getElementById("distanceCurrentLLZ").value);
    
    if (!isNaN(distance) && distance >= 0) {
        // New formula for current calculation
        let current = (150 / 15.5) * distance; 
        // Display the calculated current value
        document.getElementById("outputCurrentLLZ").innerText = `${current.toFixed(2)} µA`;
    } else {
        // Display "Invalid input" if the input is not valid
        document.getElementById("outputCurrentLLZ").innerText = "Invalid input";
    }
}



function calculateSBORequiredLLZ() {
    let sboCurrent = parseFloat(document.getElementById("sboPresentLLZ").value);
    let widthMeasure = parseFloat(document.getElementById("widthMeasureLLZ").value);
    let widthRequired = parseFloat(document.getElementById("widthRequiredLLZ").value);
    let mulFactor = parseFloat(document.getElementById("mulFactorLLZ").value);

    if (!isNaN(sboCurrent) && !isNaN(widthMeasure) && !isNaN(widthRequired) && widthRequired > 0) {
        let sboRequired = sboCurrent + mulFactor * Math.log10(widthMeasure / widthRequired);
        
        // Update the result in the HTML span element for the calculated value
        document.getElementById("outputSBORequiredLLZ").innerText = `${sboRequired.toFixed(2)} dBm`;
    } else {
        // If input is invalid, show an error message
        document.getElementById("outputSBORequiredLLZ").innerText = "Invalid input";
    }
}


// Function to calculate SBO for Narrow Alarm
function calculateAlarmLLZN() {
    let alarmPercentageN = parseFloat(document.getElementById("alarmPercentageLLZN").value);
    let factor = parseFloat(document.getElementById("widthRequiredLLZ").value); // commissioned width is taken for calculation
    let sboRequired = parseFloat(document.getElementById("sbo").value);

    if (!isNaN(alarmPercentageN) && !isNaN(sboRequired)) {
        let sboNarrow = 20 * Math.log10(1 / (1 - (alarmPercentageN / 100))) + sboRequired;

        // Display the result with different color for the output values
        document.getElementById("outputNarrowValue").innerText = `${sboNarrow.toFixed(2)} dBm`;
    } else {
        document.getElementById("outputNarrowValue").innerText = "Invalid input";
    }
}

// Function to calculate SBO for Wide Alarm
function calculateAlarmLLZW() {
    let alarmPercentageW = parseFloat(document.getElementById("alarmPercentageLLZW").value);
    let factor = parseFloat(document.getElementById("widthRequiredLLZ").value); // commissioned width is taken for calculation
    let sboRequired = parseFloat(document.getElementById("sbo").value);

    if (!isNaN(alarmPercentageW) && !isNaN(sboRequired)) {
        let sboWide = 20 * Math.log10(1 / (1 + (alarmPercentageW / 100))) + sboRequired;

        // Display the result with different color for the output values
        document.getElementById("outputWideValue").innerText = `${sboWide.toFixed(2)} dBm`;
    } else {
        document.getElementById("outputWideValue").innerText = "Invalid input";
    }
}






// Function to calculate DDM % and Current based on angle inputs
function calculateDDMandCurrentGP() {
    // Get the angleAssign value or default to 3 if not provided
    let angleAssign = parseFloat(document.getElementById("angleAssignGP").value) || 3.0;
    let angleEnter = parseFloat(document.getElementById("angleEnterGP").value);
    
    if (!isNaN(angleEnter)) {
        // Calculate DDM using the new formula
        let ddm = (8.75 / 0.36) * (angleAssign-angleEnter); // Use angleAssign for DDM calculation
        // Calculate Current based on the calculated DDM
        let current = (75 / 8.75) * ddm;

        // Display the calculated DDM and Current values
        document.getElementById("outputDDMGP").innerText = `${ddm.toFixed(2)}`;
        document.getElementById("outputCurrentGP").innerText = `${current.toFixed(2)} µA`;
    } else {
        // Display "Invalid input" if the input is not valid
        document.getElementById("outputDDMGP").innerText = "Invalid input";
        document.getElementById("outputCurrentGP").innerText = "Invalid input";
    }
}
 

// Function to calculate DDMs for antennas
function calculateDDMsGP() {
    let middleDDM = parseFloat(document.getElementById("middleAntennaDDM").value);
    let widthMeasure = parseFloat(document.getElementById("widthMeasureGP").value);
    let widthRequired = parseFloat(document.getElementById("widthRequiredGP").value);

    // Check if inputs are valid numbers
    if (!isNaN(middleDDM) && !isNaN(widthMeasure) && !isNaN(widthRequired) && widthRequired > 0) {
        let lowerDDM = ((widthMeasure / widthRequired) * middleDDM) * 0.25;
        let middleDDMCalc = (widthMeasure / widthRequired) * middleDDM;
        let upperDDM150 = ((widthMeasure / widthRequired) * middleDDM) * 0.00125;
        let upperDDM90 = (-1) * upperDDM150;

        // Update the output values
        document.getElementById("outputLowerDDM").innerText = `${lowerDDM.toFixed(2)}`;
        document.getElementById("outputMiddleDDM").innerText = `${middleDDMCalc.toFixed(2)}`;
        document.getElementById("outputUpperDDM90").innerText = `${upperDDM90.toFixed(4)}`;
        document.getElementById("outputUpperDDM150").innerText = `${upperDDM150.toFixed(4)}`;

        return middleDDMCalc; // Return the middle DDM for use in alarm calculations
    } else {
        // Set invalid input message if the inputs are incorrect
        document.getElementById("outputLowerDDM").innerText = "Invalid input";
        document.getElementById("outputMiddleDDM").innerText = "Invalid input";
        document.getElementById("outputUpperDDM90").innerText = "Invalid input";
        document.getElementById("outputUpperDDM150").innerText = "Invalid input";
    }
}


// Function to calculate GP alarms for Narrow and Wide cases
function calculateAlarmGP() {
    let alarmPercentage = parseFloat(document.getElementById("alarmPercentageGP").value);

    // Calculate DDMs based on previous calculations (reuse calculateDDMsGP function)
    let middleDDMCalc = calculateDDMsGP(); // Get the calculated middle DDM

    if (!isNaN(alarmPercentage) && !isNaN(middleDDMCalc)) {
        // Narrow Alarm Calculations
        let lowerNarrow = ((middleDDMCalc) / (1 - (0.01 * alarmPercentage))) * 0.25;
        let middleNarrow = (middleDDMCalc) / (1 - (0.01 * alarmPercentage));
        let upperNarrow150 = ((middleDDMCalc) / (1 - (0.01 * alarmPercentage))) * 0.00125;
        let upperNarrow90 = (-1) * upperNarrow150;

        // Wide Alarm Calculations
        let lowerWide = ((middleDDMCalc) / (1 + (0.01 * alarmPercentage))) * 0.25;
        let middleWide = (middleDDMCalc) / (1 + (0.01 * alarmPercentage));
        let upperWide150 = ((middleDDMCalc) / (1 + (0.01 * alarmPercentage))) * 0.00125;
        let upperWide90 = (-1) * upperWide150;

        // Display results for narrow alarm
        document.getElementById("outputLowerAlarm").innerText = `Narrow: ${lowerNarrow.toFixed(2)} & Wide: ${lowerWide.toFixed(2)}`;
        document.getElementById("outputMiddleAlarm").innerText = `Narrow: ${middleNarrow.toFixed(2)} & Wide: ${middleWide.toFixed(2)}`;
        document.getElementById("outputUpperAlarm90").innerText = `Narrow: ${upperNarrow90.toFixed(4)} & Wide: ${upperWide90.toFixed(4)}`;
        document.getElementById("outputUpperAlarm150").innerText = `Narrow: ${upperNarrow150.toFixed(4)} & Wide: ${upperWide150.toFixed(4)}`;

    } else {
        // Display "Invalid input" if inputs are not valid
        document.getElementById("outputLowerAlarm").innerText = "Invalid input";
        document.getElementById("outputMiddleAlarm").innerText = "Invalid input";
        document.getElementById("outputUpperAlarm90").innerText = "Invalid input";
        document.getElementById("outputUpperAlarm150").innerText = "Invalid input";
    }
}



// Function to show the popup modal
function showPopup(formulaId) {
    document.getElementById(formulaId).style.display = 'block';
}

// Function to hide the popup modal
function hidePopup(formulaId) {
    document.getElementById(formulaId).style.display = 'none';
}

// Close the modal when clicking outside of it (optional)
window.onclick = function(event) {
    const modals = document.getElementsByClassName('popup-modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            hidePopup(modals[i].id);
        }
    }
}

// Function to reset input values
function resetValues() {
    // Reset logic for input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.value = ''; // Clear input fields
    });

    // Optionally, reset output values to default
    const outputValues = document.querySelectorAll('.output-value');
    outputValues.forEach(output => {
        output.innerText = ''; // Clear output display (or set to default)
    });
}

// Function to print the current page
function printPage() {
    window.print(); // Use the built-in print functionality
}




// Function to validate the login
function validateLogin() {
    // Set your predefined username and password
    const validUsername = "ils01";
    const validPassword = "ils01";

    // Get the input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the input values match the valid credentials
    if (username === validUsername && password === validPassword) {
        // Hide the login form
        document.getElementById("loginContainer").style.display = "none";

        // Show the ILS calibration tool with tabs
        document.getElementById("ilsContainer").style.display = "block";

        // Automatically open the first tab (General Calculations)
        openTab(event, 'general');
      openTab(event, 'limits');
    } else {
        document.getElementById("error-message").innerText = "Invalid Username or Password!";
    }
}

// Function to open a tab and hide the other content
function openTab(tabName) {
    // Hide all tab contents
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; // Hide all content
    }

    // Remove active class from all tablinks
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the selected tab's content and add the active class to the clicked tab
    document.getElementById(tabName).style.display = "block"; // Show clicked tab content
    document.getElementById(tabName).classList.add('active');
}


// Function to calculate the Clearance Current for Alarm
// Function to calculate the Clearance Current for Alarm
function calculateClearanceCurrent() {
    // Get the input values
    const minClearanceCurrentMKA = parseFloat(document.getElementById("minClearanceCurrentMKA").value);
    const presentClearancePowerDBM = parseFloat(document.getElementById("presentClearancePowerDBM").value);

    // Check if the inputs are valid numbers
    if (isNaN(minClearanceCurrentMKA) || isNaN(presentClearancePowerDBM)) {
        alert("Please enter valid numerical values.");
        return;
    }

    // Calculate the clearance current for alarm
    const clearanceCurrentForAlarm = presentClearancePowerDBM + (20 * Math.log10(160 / minClearanceCurrentMKA));

    // Display the output with separate color for the value
    document.getElementById("outputClearanceValue").innerText = `${clearanceCurrentForAlarm.toFixed(2)} dBm`;
}





// Function to filter the table based on the selected category
function filterCategory() {
    const category = document.getElementById('categorySelect').value;

    let tableBody = document.getElementById('limitsTableBody');
    
    // Clear the current table contents
    tableBody.innerHTML = '';

    // Define data for each category
    const data = {
        cat1: {
            icao: '35 FT OR 10.5 M OR ±14.6 MKA',
            alarm: '±15 MKA',
            aai: '±12 MKA',
        },
        cat2: {
            icao: '25 FT OR 7.5 M OR ±10.4 MKA',
            alarm: '±11 MKA',
            aai: '±9 MKA',
        },
        cat3: {
            icao: '10 FT OR 3 M OR ±4.2 MKA',
            alarm: '±8 MKA',
            aai: '±6 MKA',
        }
    };

    // Get the selected category data
    const selectedData = data[category];

    // Create the new row with the selected data
    const newRow = `
        <tr>
            <td>CENTER LINE</td>
            <td>${category.toUpperCase()}</td>
            <td>${selectedData.icao}</td>
            <td>${selectedData.alarm}</td>
            <td>${selectedData.aai}</td>
        </tr>
    `;

    // Insert the new row into the table body
    tableBody.innerHTML = newRow;
}

// Run the filterCategory function when the page loads to show CAT-I by default
window.onload = function() {
    filterCategory();
};

// Function to filter the table based on the selected category
function filterCategoryGP() {
    const category = document.getElementById('categorySelectGP').value;

    let tableBody = document.getElementById('limitsTableBodyGP');
    
    // Clear the current table contents
    tableBody.innerHTML = '';

    // Define data for each category
    const data = {
        cat1: {
            icao: '7.5%',
            alarm: '±45 MKA',
            aai: '±35 MKA',
        },
        cat2: {
              icao: '7.5%',
            alarm: '±45 MKA',
            aai: '±35 MKA',
        },
        cat3: {
             icao: '4.0%',
            alarm: '±24 MKA',
            aai: '±24 MKA',
        }
    };

    // Get the selected category data
    const selectedData = data[category];

    // Create the new row with the selected data
    const newRow = `
        <tr>
            <td>GLIDE ANGLE</td>
            <td>${category.toUpperCase()}</td>
            <td>${selectedData.icao}</td>
            <td>${selectedData.alarm}</td>
            <td>${selectedData.aai}</td>
        </tr>
    `;

    // Insert the new row into the table body
    tableBody.innerHTML = newRow;
}

// Run the filterCategory function when the page loads to show CAT-I by default
window.onload = function() {
    filterCategoryGP();
};



// General function to calculate and display the result
function calculateValues(inputValueId, inputPercentageId, resultId) {
    // Get input values for x (course width) and y (percentage variability)
    let x = parseFloat(document.getElementById(inputValueId).value);
    let y = parseFloat(document.getElementById(inputPercentageId).value);

    // Validate if the inputs are numbers
    if (!isNaN(x) && !isNaN(y)) {
        // Calculate the lowest and highest values
        let lowestValue = x / (1 + (0.01 * y));
        let highestValue = x / (1 - (0.01 * y));

        // Display the result
        document.getElementById('outputResult1').innerText = `${lowestValue.toFixed(2)} TO ${highestValue.toFixed(2)}`;
    } else {
        // Show error message if inputs are invalid
        document.getElementById('outputResult1').innerText = "Please enter valid numbers for both fields.";
    }
}


// General function to calculate and display the result
function calculateValuesA(inputPId, inputQId, resultId) {
    // Get the input values
    let inputP = parseFloat(document.getElementById(inputPId).value); // Assigned Course Width
    let inputQ = parseFloat(document.getElementById(inputQId).value); // Percentage Variability

    if (!isNaN(inputP) && !isNaN(inputQ)) {
        // Calculate both decreased and increased limits
        let decreasedValue = inputP * (1 - 0.01 * inputQ); // Decreased limit
        let increasedValue = inputP * (1 + 0.01 * inputQ); // Increased limit

        // Display the result with different color for the output values
        document.getElementById('outputValue1').innerText = `${decreasedValue.toFixed(2)} TO ${increasedValue.toFixed(2)}`;
    } else {
        // Display error if inputs are invalid
        document.getElementById('outputValue1').innerText = "Please enter valid numbers for both fields.";
    }
}







// Function to filter the table based on the selected category
// Function to open the selected tab
function openTabLimits(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Function to update table content based on category
function filterCategoryLimits() {
    const category = document.getElementById("categorySelectLimits").value;

    const llzDataLimits = {
        cat1: [
            {limits: 'Frequency', icao: '108 - 111.975 MHz', alarm: '±0.002%', remarks: 'NA'},
          {limits: 'Coverage', icao: '46.3 km (25 NM) within plus or minus 10 degrees from the front course line, 31.5 km (17 NM) between 10 degrees and 35 degrees from the front course line, 18.5 km (10 NM) outside of plus or minus 35 degrees from the front course line ', alarm: 'NA', remarks: 'the limits may be reduced down to 33.3 km (18 NM) within the plus or minus 10-degree sector and 18.5 km (10 NM) within the remainder of the coverage'},
            {limits: 'Course Width', icao: '17%', alarm: '±15%', remarks: 'SBO Power Adjustments'},
            {limits: 'Center Line Deviation', icao: '35 FT or 10.5 M', alarm: '±15 MKA', remarks: 'NA'},
          {limits: '90/150 Hz Frequency', icao: '2.5%', alarm: 'NA', remarks: 'Recommeded Limits 1.5%'},
          {limits: '90/150 Hz Modulation', icao: '20±2 & 20±2', alarm: 'NA', remarks: 'NA'},
           {limits: '90/150 Hz Phasing', icao: '20 Degree', alarm: 'NA', remarks: 'Phase Difference'},
           {limits: 'Zero Radiation', icao: '10 Second', alarm: 'NA', remarks: 'Monitor Action Time'},
          {limits: 'Field Strength', icao: 'For Facility Performance Category I localizers, the minimum field strength on the ILS glide path and within the localizer course sector from a distance of 18.5 km (10 NM) to a height of 60 m (200 ft) above the horizontal plane containing the threshold shall be not less than 90 microvolts per metre (minus 107 dBW/m2)', alarm: 'NA', remarks: 'the field strength shall be not less than 40 microvolts per metre (minus 114 dBW/m2)'},
          {limits: 'Course Structure', icao: 'Outer limit of coverage to ILS Point “A” 0.031(30 MKA) ILS Point “A” to ILS Point “B” 0.031(30 MKA) at ILS Point “A” decreasing at a linear rate to 0.015(15 MKA) at ILS Point “B” ILS Point “B” to ILS Point “C” 0.015', alarm: 'NA', remarks: 'NA'}
        ],
        cat2: [
         {limits: 'Frequency', icao: '108 - 111.975 MHz', alarm: '±0.002%', remarks: 'NA'},
          {limits: 'Coverage', icao: '46.3 km (25 NM) within plus or minus 10 degrees from the front course line, 31.5 km (17 NM) between 10 degrees and 35 degrees from the front course line, 18.5 km (10 NM) outside of plus or minus 35 degrees from the front course line ', alarm: 'NA', remarks: 'the limits may be reduced down to 33.3 km (18 NM) within the plus or minus 10-degree sector and 18.5 km (10 NM) within the remainder of the coverage'},
            {limits: 'Course Width', icao: '17%', alarm: '±15%', remarks: 'SBO Power Adjustments'},
            {limits: 'Center Line Deviation', icao: '25 FT or 7.5 M', alarm: '±11 MKA', remarks: 'NA'},
          {limits: '90/150 Hz Frequency', icao: '1.5%', alarm: 'NA', remarks: 'Recommeded Limits 1.5%'},
          {limits: '90/150 Hz Modulation', icao: '20±2 & 20±2', alarm: 'NA', remarks: 'NA'},
           {limits: '90/150 Hz Phasing', icao: '20 Degree', alarm: 'NA', remarks: 'Phase Difference'},
           {limits: 'Zero Radiation', icao: '05 Second', alarm: 'NA', remarks: 'Monitor Action Time'},
          {limits: 'Field Strength', icao: 'For Facility Performance Category II localizers, the minimum field strength on the ILS glide path and within the localizer course sector shall be not less than 100 microvolts per metre (minus 106 dBW/m2) at a distance of 18.5 km (10 NM) increasing to not less than 200 microvolts per metre (minus 100 dBW/m2) at a height of 15 m (50 ft) above the horizontal plane containing the threshold', alarm: 'NA', remarks: 'Rest Same as CAT-1'},
          {limits: 'Course Structure', icao: 'Outer limit of coverage to ILS Point “A” 0.031(30 MKA)  ILS Point “A” to ILS Point “B” 0.031(30 MKA)  at ILS Point “A” decreasing at a linear rate to 0.005(05 MKA)  at ILS Point “B” ILS Point “B” to the ILS reference datum 0.005(05 MKA)', alarm: 'NA', remarks: 'NA'}
        ],
        cat3: [
                {limits: 'Frequency', icao: '108 - 111.975 MHz', alarm: '±0.002%', remarks: 'NA'},
          {limits: 'Coverage', icao: '46.3 km (25 NM) within plus or minus 10 degrees from the front course line, 31.5 km (17 NM) between 10 degrees and 35 degrees from the front course line, 18.5 km (10 NM) outside of plus or minus 35 degrees from the front course line ', alarm: 'NA', remarks: 'the limits may be reduced down to 33.3 km (18 NM) within the plus or minus 10-degree sector and 18.5 km (10 NM) within the remainder of the coverage'},
            {limits: 'Course Width', icao: '10%', alarm: '±10%', remarks: 'SBO Power Adjustments'},
            {limits: 'Center Line Deviation', icao: '10 FT or 3 M', alarm: '±08 MKA', remarks: 'ALARM AT 20 FT OR 6 M'},
          {limits: '90/150 Hz Frequency', icao: '1%', alarm: 'NA', remarks: 'NA'},
          {limits: '90/150 Hz Modulation', icao: '20±2 & 20±2', alarm: 'NA', remarks: 'NA'},
           {limits: '90/150 Hz Phasing', icao: '20 Degree', alarm: 'NA', remarks: 'Phase Difference'},
           {limits: 'Zero Radiation', icao: '02 Second', alarm: 'NA', remarks: 'Monitor Action Time'},
          {limits: 'Field Strength', icao: 'For Facility Performance Category III localizers, the minimum field strength on the ILS glide path and within the localizer course sector shall be not less than 100 microvolts per metre (minus 106 dBW/m2) at a distance of 18.5 km (10 NM), increasing to not less than 200 microvolts per metre (minus 100 dBW/m2) at 6 m (20 ft) above the horizontal plane containing the threshold. From this point to a further point 4 m (12 ft) above the runway centre line, and 300 m (1 000 ft) from the threshold in the direction of the localizer, and thereafter at a height of 4 m (12 ft) along the length of the runway in the direction of the localizer, the field strength shall be not less than 100 microvolts per metre (minus 106 dBW/m2)'
, alarm: 'NA', remarks: 'NA'},
          {limits: 'Course Structure', icao: 'ILS reference datum to ILS Point “D” 0.005(5 MKA) ILS Point “D” to ILS Point “E” 0.005(5 MKA) at ILS Point “D” increasing at a linear rate to 0.010(10 MKA) at ILS Point “E”)', alarm: 'NA', remarks: 'NA'}
        ]
    };

    const gpDataLimits = {
        cat1: [
          {limits: 'Frequency', icao: '328.6-335.4', alarm: '±0.002%', remarks: 'NA'},
          {limits: 'Coverage', icao: 'in sectors of 8 degrees in azimuth on each side of the centre line of the ILS glide path, to a distance of at least 18.5 km (10 NM) up to 1.75 θ and down to 0.45 θ above the horizontal or to such lower angle, down to 0.30 θ', alarm: 'NA', remarks: 'NA'},
           {limits: 'Hlaf Course Width', icao: '0.36θ', alarm: '0.07 θ TO 0.14 θ', remarks: 'SBO Power Adjustments'},
            {limits: 'Glide Angle', icao: '7.5%', alarm: '±45 MKA', remarks: 'given at ±35 MKA'},
             {limits: 'Angular Displacement Sensitivity', icao: '25%', alarm: 'NA', remarks: 'NA'},
           {limits: 'DDM & SDM', icao: '40±2.5 & 80±5', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Frequency', icao: '2.5%', alarm: 'NA', remarks: 'Recommeded Limits 1.5%'},
            {limits: '90/150 Hz Modulation', icao: '25±2.5 & 55±2.5', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Phasing', icao: '20 Degree', alarm: 'NA', remarks: 'Phase Difference Limits'},
            {limits: 'Zero Radiation Period', icao: '10 Seconds', alarm: 'NA', remarks: 'Monitor Action Time'},
          {limits: 'Field Strength', icao: '400 microvolts per metre (minus 95 dBW/m2)', alarm: 'NA', remarks: 'Performance Category I glide paths, this field strength shall be provided down to a height of 30 m (100 ft)'},
          {limits: 'Course Structure', icao: 'Outer limit of coverage to ILS Point “C” 0.035 ', alarm: 'NA', remarks: 'NA'}
        ],
        cat2: [
            {limits: 'Frequency', icao: '328.6-335.4', alarm: '±0.002%', remarks: 'NA'},
          {limits: 'Coverage', icao: 'in sectors of 8 degrees in azimuth on each side of the centre line of the ILS glide path, to a distance of at least 18.5 km (10 NM) up to 1.75 θ and down to 0.45 θ above the horizontal or to such lower angle, down to 0.30 θ', alarm: 'NA', remarks: 'NA'},
           {limits: 'Hlaf Course Width', icao: '0.36θ', alarm: '0.12 θ below path with a tolerance of plus or minus 0.02 θ & 0.12 θ above path with a tolerance of plus 0.02 θ and minus 0.05 θ', remarks: 'SBO Power Adjustments'},
            {limits: 'Glide Angle', icao: '7.5%', alarm: '±45 MKA', remarks: 'given at ±35 MKA'},
             {limits: 'Angular Displacement Sensitivity', icao: '25%', alarm: 'NA', remarks: 'NA'},
           {limits: 'DDM & SDM', icao: '40±2.5 & 80±5', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Frequency', icao: '1.5%', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Modulation', icao: '25±2.5 & 55±2.5', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Phasing', icao: '20 Degree', alarm: 'NA', remarks: 'Phase Difference Limits'},
            {limits: 'Zero Radiation Period', icao: '05 Seconds', alarm: 'NA', remarks: 'Monitor Action Time'},
          {limits: 'Field Strength', icao: '400 microvolts per metre (minus 95 dBW/m2)', alarm: 'NA', remarks: '. For Facility Performance Categories II and III glide paths, this field strength shall be provided down to a height of 15 m (50 ft) above the horizontal plane containing the threshold'},
        {limits: 'Course Structure', icao: 'Outer limit of coverage to ILS Point “A” 0.035 ILS Point “A” to ILS Point “B” 0.035 at ILS Point “A” decreasing at a linear rate to 0.023 at ILS Point “B” ILS Point “B” to the ILS reference datum 0.023', alarm: 'NA', remarks: 'NA'}
        ],
        cat3: [
          {limits: 'Frequency', icao: '328.6-335.4', alarm: '±0.002%', remarks: 'NA'},
          {limits: 'Coverage', icao: 'in sectors of 8 degrees in azimuth on each side of the centre line of the ILS glide path, to a distance of at least 18.5 km (10 NM) up to 1.75 θ and down to 0.45 θ above the horizontal or to such lower angle, down to 0.30 θ', alarm: 'NA', remarks: 'NA'},
           {limits: 'Hlaf Course Width', icao: '0.36θ', alarm: '0.12 θ below path with a tolerance of plus or minus 0.02 θ & 0.12 θ above path with a tolerance of plus 0.02 θ and minus 0.05 θ', remarks: 'SBO Power Adjustments'},
            {limits: 'Glide Angle', icao: '4%', alarm: '±24 MKA', remarks: 'given at ±24 MKA'},
             {limits: 'Angular Displacement Sensitivity', icao: '25%', alarm: 'NA', remarks: 'NA'},
           {limits: 'DDM & SDM', icao: '40±2.5 & 80±5', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Frequency', icao: '1.5%', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Modulation', icao: '25±2.5 & 55±2.5', alarm: 'NA', remarks: 'NA'},
            {limits: '90/150 Hz Phasing', icao: '20 Degree', alarm: 'NA', remarks: 'Phase Difference Limits'},
            {limits: 'Zero Radiation Period', icao: '05 Seconds', alarm: 'NA', remarks: 'Monitor Action Time'},
          {limits: 'Field Strength', icao: '400 microvolts per metre (minus 95 dBW/m2)', alarm: 'NA', remarks: '. For Facility Performance Categories II and III glide paths, this field strength shall be provided down to a height of 15 m (50 ft) above the horizontal plane containing the threshold'},
        {limits: 'Course Structure', icao: 'Outer limit of coverage to ILS Point “A” 0.035 ILS Point “A” to ILS Point “B” 0.035 at ILS Point “A” decreasing at a linear rate to 0.023 at ILS Point “B” ILS Point “B” to the ILS reference datum 0.023', alarm: 'NA', remarks: 'NA'}
        ]
    };

    updateTableLimits('llzLimitsTableBodyLimits', llzDataLimits[category]);
    updateTableLimits('gpLimitsTableBodyLimits', gpDataLimits[category]);
}

// Function to update table rows
function updateTableLimits(tableId, data) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.limits}</td><td>${row.icao}</td><td>${row.alarm}</td><td>${row.remarks}</td>`;
        tableBody.appendChild(tr);
    });
}

// Default load with CAT-I values
document.getElementById("defaultOpenLimits").click();

// Run the filterCategory function when the page loads to show CAT-I by default
window.onload = function() {
    filterCategorylimits();
}


function calculate() {
            // Get input values
            let angleAssign = parseFloat(document.getElementById('angleAssign').value);
            let angleFound = parseFloat(document.getElementById('angleFound').value);

            // Calculate x = (angleAssign) - (angleFound)
            let x = angleAssign - angleFound;

            // Check if x is odd, if so make it even
            // Odd means the decimal part is not 0 or is 0.01, 0.03, etc.
            if (Math.round(x * 100) % 2 !== 0) {
                x = (x >= 0) ? x - 0.01 : x + 0.01;  // Adjust to make x even
            }

            // Ensure x is taken as absolute value for height and slot calculation
            let absX = Math.abs(x);

            // Determine the sign of x and set the arrow accordingly
            let arrow = x >= 0 ? "↓" : "↑";
            let arrowClass = x >= 0 ? "arrow-down" : "arrow-up";

  
  let isSymmetric = document.getElementById('symmetric').checked;
            let isAsymmetric = document.getElementById('asymmetric').checked;
            // Adjust heights and slots based on x
            
  if (isSymmetric) {
  let A2 = (5 / 0.02) * absX;  // Calculate height for A2
            let S2 = (2 / 0.02) * absX;   // Calculate slots for A2
             let heightA2 = Math.abs(A2);
              let slotsA2 = Math.abs(S2);
            // Calculate for A1 and A3
            let heightA1 = (heightA2 * 0.5);  // Half of A2's height
            let slotsA1 = (slotsA2 * 0.5);    // Half of A2's slots
            let heightA3 = (heightA2 * 1.5);  // 1.5 times A2's height
            let slotsA3 = (slotsA2 * 1.5);    // 1.5 times A2's slots

           document.getElementById('a2-height').innerHTML = Math.abs(heightA2).toFixed(2) + " cm " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a2-slot').innerHTML = Math.abs(slotsA2).toFixed(2) + " slots " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a1-height').innerHTML = Math.abs(heightA1).toFixed(2) + " cm " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a1-slot').innerHTML = Math.abs(slotsA1).toFixed(2) + " slots " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a3-height').innerHTML = Math.abs(heightA3).toFixed(2) + " cm " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a3-slot').innerHTML = Math.abs(slotsA3).toFixed(2) + " slots " + `<span class="${arrowClass}">${arrow}</span>`;
    
  }
  else if (isAsymmetric){
    
     let A2 = (5 / 0.02) * absX;  // Calculate height for A2
            let S2 = (2 / 0.02) * absX;   // Calculate slots for A2
             let heightA2 = Math.abs(A2);
              let slotsA2 = Math.abs(S2);
            // Calculate for A1 and A3
            let heightA1 = (heightA2 * 1);  // Half of A2's height
            let slotsA1 = (slotsA2 * 1);    // Half of A2's slots
            let heightA3 = (heightA2 * 1);  // 1.5 times A2's height
            let slotsA3 = (slotsA2 * 1);    // 1.5 times A2's slots

           document.getElementById('a2-height').innerHTML = Math.abs(heightA2).toFixed(2) + " cm " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a2-slot').innerHTML = Math.abs(slotsA2).toFixed(2) + " slots " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a1-height').innerHTML = Math.abs(heightA1).toFixed(2) + " cm " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a1-slot').innerHTML = Math.abs(slotsA1).toFixed(2) + " slots " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a3-height').innerHTML = Math.abs(heightA3).toFixed(2) + " cm " + `<span class="${arrowClass}">${arrow}</span>`;
    document.getElementById('a3-slot').innerHTML = Math.abs(slotsA3).toFixed(2) + " slots " + `<span class="${arrowClass}">${arrow}</span>`;
    
    
  }
     
}  
   
