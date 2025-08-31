interface ContactFormData {
  name: string;
  email: string;
  year: string;
  otherYear: string;
  instrument: string;
  subject: string;
  message: string;
}

export const submitToGoogleSheets = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Google Apps Script Web App URL - Replace with your actual deployment URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    // Prepare data for submission
    const submissionData = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      year: formData.year === 'other' ? formData.otherYear : formData.year,
      instrument: formData.instrument,
      subject: formData.subject,
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
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Check if this is the first submission (setup headers)
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 7).setValues([[
        'Timestamp', 'Name', 'Email', 'Year', 'Instrument', 'Subject', 'Message'
      ]]);
      
      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }
    
    // Add the new row
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.year,
      data.instrument,
      data.subject,
      data.message
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 7);
    
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