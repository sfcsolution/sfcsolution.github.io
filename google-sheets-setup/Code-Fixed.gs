/**
 * Google Apps Script for SFC Solution Contact Form
 * SIMPLIFIED VERSION - Works around CORS limitations
 */

function doPost(e) {
  try {
    // Enhanced debugging for the request
    console.log('doPost called with:', {
      eExists: !!e,
      eKeys: e ? Object.keys(e) : 'no e object',
      postDataExists: !!(e && e.postData),
      postDataKeys: (e && e.postData) ? Object.keys(e.postData) : 'no postData',
      contentsExists: !!(e && e.postData && e.postData.contents),
      requestMethod: e && e.parameter ? e.parameter : 'no parameter',
      rawContents: (e && e.postData && e.postData.contents) ? e.postData.contents.substring(0, 100) + '...' : 'no contents'
    });
    
    // Check if request data exists
    if (!e) {
      console.error('No event object (e) provided');
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'No event object provided - this may be a test call'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!e.postData) {
      console.error('No postData in event object');
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'No postData found - ensure this is a POST request with data'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!e.postData.contents) {
      console.error('No contents in postData');
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'No contents in postData - request body is empty'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the JSON data from the request
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      console.log('Received form data:', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        timestamp: data.timestamp
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Invalid JSON format'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet (create one first if it doesn't exist)
    let sheet;
    try {
      sheet = SpreadsheetApp.getActiveSheet();
    } catch (sheetError) {
      console.error('Error accessing spreadsheet:', sheetError);
      // Try to create a new spreadsheet
      try {
        const spreadsheet = SpreadsheetApp.create('SFC Solution Contact Form Submissions');
        sheet = spreadsheet.getActiveSheet();
        console.log('Created new spreadsheet:', spreadsheet.getId());
      } catch (createError) {
        console.error('Error creating spreadsheet:', createError);
        return ContentService
          .createTextOutput(JSON.stringify({
            status: 'error',
            message: 'Could not access or create spreadsheet'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // If this is the first submission, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name', 
        'Email',
        'Phone',
        'Company',
        'Project Type',
        'Budget',
        'Timeline',
        'Message',
        'Source'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      
      console.log('Added headers to spreadsheet');
    }
    
    // Prepare the row data
    const rowData = [
      new Date(data.timestamp || new Date()),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || 'Not provided',
      data.company || 'Not provided',
      data.projectType || 'Not specified',
      data.budget || 'Not specified',
      data.timeline || 'Not specified',
      data.message || '',
      data.source || 'Website'
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    console.log('Added row to spreadsheet:', rowData.length, 'columns');
    
    // Auto-resize columns for better readability
    try {
      sheet.autoResizeColumns(1, sheet.getLastColumn());
    } catch (resizeError) {
      console.warn('Could not auto-resize columns:', resizeError);
    }
    
    // Send email notification (optional - comment out if causing issues)
    try {
      sendEmailNotification(data);
      console.log('Email notification sent');
    } catch (emailError) {
      console.warn('Could not send email notification:', emailError);
      // Don't fail the whole request if email fails
    }
    
    // Return success response
    console.log('Form submission successful');
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to process form submission: ' + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Simple GET endpoint for testing
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'SFC Solution Contact Form API is running',
      timestamp: new Date().toISOString(),
      version: '2.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send email notification when a new form is submitted
 */
function sendEmailNotification(data) {
  try {
    // Configure email settings - UPDATE THESE
    const recipient = 'contact@digifact.vn'; // Change to your email
    const subject = `New Contact Form Submission - ${data.firstName} ${data.lastName}`;
    
    const body = `
New contact form submission received:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Project Type: ${data.projectType || 'Not specified'}
Budget: ${data.budget || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

Message:
${data.message}

Submitted: ${data.timestamp}
Source: ${data.source}

---
This email was automatically generated from your website contact form.
    `;
    
    MailApp.sendEmail(recipient, subject, body);
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
}

/**
 * Test function to verify the setup
 */
function testSubmission() {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    projectType: 'Fullstack Development',
    budget: '$10,000 - $25,000',
    timeline: '1-3 months',
    message: 'This is a test submission to verify the setup is working correctly.',
    timestamp: new Date().toISOString(),
    source: 'Test'
  };
  
  // Simulate the request object
  const mockRequest = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  console.log('Running test submission...');
  const result = doPost(mockRequest);
  console.log('Test result:', result.getContent());
  
  return result;
}

/**
 * Debug function to check the deployment status
 */
function debugDeployment() {
  console.log('=== DEPLOYMENT DEBUG INFO ===');
  console.log('Current time:', new Date().toISOString());
  console.log('Script ID:', ScriptApp.getScriptId());
  
  try {
    // Test if we can access a spreadsheet
    const testSheet = SpreadsheetApp.getActiveSheet();
    console.log('Spreadsheet access: SUCCESS');
    console.log('Sheet name:', testSheet.getName());
  } catch (sheetError) {
    console.log('Spreadsheet access: FAILED -', sheetError.toString());
    console.log('Will need to create new spreadsheet on first submission');
  }
  
  try {
    // Test email functionality
    console.log('Email service available:', typeof MailApp !== 'undefined');
  } catch (emailError) {
    console.log('Email service error:', emailError.toString());
  }
  
  console.log('=== END DEBUG INFO ===');
  return 'Debug complete - check logs';
}

/**
 * Simple test without parameters to check basic functionality
 */
function simpleTest() {
  console.log('=== SIMPLE TEST ===');
  console.log('Function can execute:', true);
  console.log('Current time:', new Date().toISOString());
  
  // Test doGet
  try {
    const getResult = doGet(null);
    console.log('doGet works:', true);
    console.log('doGet result:', getResult.getContent());
  } catch (getError) {
    console.log('doGet error:', getError.toString());
  }
  
  // Test doPost with missing data (should return appropriate error)
  try {
    const postResult = doPost(null);
    console.log('doPost with null:', postResult.getContent());
  } catch (postError) {
    console.log('doPost error:', postError.toString());
  }
  
  console.log('=== END SIMPLE TEST ===');
  return 'Simple test complete';
}
