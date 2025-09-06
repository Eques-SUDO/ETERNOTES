interface ContactFormData {
  firstName: string;
  lastName: string;
  age: string;
  cni: string;
  email: string;
  phone: string;
  university: string;
  year: string;
  otherYear: string;
  instrument: string;
  subject: string;
  message: string;
}

export const submitToGoogleSheets = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Google Apps Script Web App URL - Replace with your actual deployment URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBFb01VEUaKsRjmEOhoNzdy8pWvcI_XEvW4J4TT2FxjjQmiV1kuygwhRLky7KvhINAEw/exec';
    
    // Prepare data for submission with Casablanca timezone
    const casablancaTime = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Casablanca',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const submissionData = {
      timestamp: casablancaTime,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      cni: formData.cni,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      university: formData.university,
      year: formData.year === 'other' ? formData.otherYear : 
            formData.year === 'freshman' ? '1st Year (L1)' :
            formData.year === 'sophomore' ? '2nd Year (L2)' :
            formData.year === 'junior' ? '3rd Year (L3)' :
            formData.year === 'senior' ? "Master's (M1/M2)" :
            formData.year,
      instrument: formData.instrument || 'Not specified',
      subject: formData.subject === 'theory' ? 'Music Theory Lessons' :
               formData.subject === 'instrument' ? 'Learn an Instrument' :
               formData.subject === 'singing' ? 'Learn How to Sing' :
               formData.subject,
      message: formData.message
    };

    // Submit to Google Sheets via Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
      mode: 'no-cors' // Required for Google Apps Script
    });

    // Since mode is 'no-cors', we can't read the response
    // We'll assume success if no error is thrown
    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};

// Google Apps Script code template (to be deployed separately)
export const GOOGLE_APPS_SCRIPT_CODE = `
function doPost(e) {
  try {
    // Get the active spreadsheet (create one first and get its ID)
    const spreadsheetId = '1whptfzf5YL46Dm9EQfAkFw_pG-uYObjgrKn1tZ5t74o';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Check if this is the first submission (setup headers)
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Time', 'First Name', 'Last Name', 'Age', 'CNI', 'Email', 
        'Phone', 'University', 'Academic Year', 'Instrument/Skill', 'Interest', 'Message'
      ]]);
      
      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#00D4FF');
      headerRange.setFontColor('white');
      
      // Set column widths for better readability
      sheet.setColumnWidth(1, 120); // Time
      sheet.setColumnWidth(2, 120); // First Name
      sheet.setColumnWidth(3, 120); // Last Name
      sheet.setColumnWidth(4, 80);  // Age
      sheet.setColumnWidth(5, 120); // CNI
      sheet.setColumnWidth(6, 200); // Email
      sheet.setColumnWidth(7, 150); // Phone
      sheet.setColumnWidth(8, 250); // University
      sheet.setColumnWidth(9, 120); // Year
      sheet.setColumnWidth(10, 150); // Instrument
      sheet.setColumnWidth(11, 120); // Interest
      sheet.setColumnWidth(12, 300); // Message
    }
    
    // Add the new row
    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.lastName,
      data.age,
      data.cni,
      data.email,
      data.phone,
      data.university,
      data.year,
      data.instrument,
      data.subject,
      data.message
    ]);
    
    // Auto-resize columns and wrap text for messages
    const messageColumn = sheet.getRange('L:L');
    messageColumn.setWrap(true);
    
    // Auto-resize the row that was just added
    const lastRow = sheet.getLastRow();
    sheet.setRowHeight(lastRow, 80); // Set minimum height for readability
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;