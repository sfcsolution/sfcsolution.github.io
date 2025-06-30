/**
 * Google Apps Script for SFC Solution Contact Form
 * This script receives form submissions and stores them in Google Sheets
 */

// Handle CORS preflight requests
function doOptions(e) {
  return HtmlService.createHtmlOutput()
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    });
}

// Handle GET requests (for testing and CORS)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'SFC Solution Contact Form API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (you'll need to create this first)
    const sheet = SpreadsheetApp.getActiveSheet();
    
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
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, sheet.getLastColumn());
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to process form submission'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

/**
 * Send email notification when a new form is submitted
 * Replace 'your-email@gmail.com' with your actual email
 */
function sendEmailNotification(data) {
  try {
    const recipient = 'your-email@gmail.com'; // Change this to your email
    const subject = `New Contact Form Submission - ${data.firstName} ${data.lastName}`;
    
    const body = `
New contact form submission from SFC Solution website:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Project Type: ${data.projectType}
Budget: ${data.budget}
Timeline: ${data.timeline}

Message:
${data.message}

Submitted at: ${new Date(data.timestamp).toLocaleString()}
Source: ${data.source}

---
This email was automatically generated from your website contact form.
    `;
    
    MailApp.sendEmail(recipient, subject, body);
  } catch (error) {
    console.error('Error sending email notification:', error);
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
  
  const mockRequest = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockRequest);
  console.log('Test result:', result.getContent());
}
