# Google Sheets Contact Form Integration Setup

This guide will help you set up the Google Sheets integration for your SFC Solution website contact form.

## Prerequisites

- Google Account
- Access to Google Sheets and Google Apps Script
- Basic understanding of Google Apps Script deployment

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "SFC Solution - Contact Submissions" (or any name you prefer)
4. Keep this sheet open for the next steps

### 2. Set up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. This will open the Google Apps Script editor
3. Delete any existing code in the editor
4. Copy and paste the entire content from `Code.gs` file in this folder
5. Save the project (Ctrl+S or Cmd+S)
6. Name your project "SFC Solution Contact Form Handler"

### 3. Configure Email Notifications

1. In the `Code.gs` file, find line 81:
   ```javascript
   const recipient = 'your-email@gmail.com'; // Change this to your email
   ```
2. Replace `'your-email@gmail.com'` with your actual email address
3. Save the file

### 4. Test the Setup

1. In the Apps Script editor, select the function `testSubmission` from the dropdown
2. Click the **Run** button (▶️)
3. You may be prompted to authorize the script - click **Review permissions**
4. Choose your Google account and click **Allow**
5. Check your Google Sheet - you should see a test entry
6. Check your email - you should receive a notification email

### 5. Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Type" and select **Web app**
3. Configure the deployment:
   - **Description**: SFC Solution Contact Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** - you'll need this for your website

### 6. Update Your Website

1. Open your `index.html` file
2. Find the contact form JavaScript section (around line 2250-2260)
3. Look for this line:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/AKfycbxRvKgJLQkUvVPuBjdLHpxXcxiKOdZOgAWPJ6v_HqfQGBLGsH4VWtxQGHZ6ZRn6Z9rQ/exec';
   ```
4. Replace the URL with the Web app URL you copied in step 5

### 7. Test the Live Form

1. Open your website in a browser
2. Fill out and submit the contact form
3. Check your Google Sheet for the new submission
4. Check your email for the notification

## Google Sheet Structure

Your Google Sheet will automatically have these columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| First Name | Contact's first name |
| Last Name | Contact's last name |
| Email | Contact's email address |
| Phone | Contact's phone number |
| Company | Contact's company name |
| Project Type | Type of project requested |
| Budget | Project budget range |
| Timeline | Expected project timeline |
| Message | Detailed project description |
| Source | Source of the submission (always "Website") |

## Customization Options

### Email Template
You can customize the email notification by modifying the `sendEmailNotification` function in `Code.gs`.

### Additional Fields
If you want to add more fields to your contact form:
1. Add the field to your HTML form
2. Update the JavaScript to include the new field in the form data
3. Add the new field to the `rowData` array in `Code.gs`
4. Add the field name to the `headers` array in `Code.gs`

### Data Validation
You can add data validation in the Google Apps Script to ensure data quality before saving to the sheet.

## Troubleshooting

### Common Issues

1. **"Script function not found" error**
   - Make sure you've deployed the script as a web app
   - Check that the Web app URL is correct in your website

2. **Permission denied errors**
   - Re-run the authorization process in Apps Script
   - Make sure "Execute as" is set to "Me" in deployment settings

3. **Form submissions not appearing in sheet**
   - Check the browser console for JavaScript errors
   - Verify the Web app URL is correct
   - Test the `testSubmission` function in Apps Script

4. **Email notifications not working**
   - Check your spam/junk folder
   - Verify the email address is correct in the script
   - Make sure Gmail service is enabled in Apps Script

### Testing Your Setup

Run this test checklist:

- [ ] Google Sheet is created and accessible
- [ ] Apps Script code is saved and authorized
- [ ] Test function runs without errors
- [ ] Web app is deployed and URL is copied
- [ ] Website form URL is updated with correct script URL
- [ ] Live form submission works
- [ ] Data appears in Google Sheet
- [ ] Email notification is received

## Security Considerations

- The Web app URL contains a unique script ID that acts as a security token
- Only form data from your website should be submitted to this endpoint
- Consider adding additional validation if needed
- Monitor your Google Sheet for any unusual activity

## Support

If you encounter any issues:
1. Check the Google Apps Script execution logs for errors
2. Verify all steps in this guide have been completed
3. Test individual components (sheet creation, script execution, web app deployment)

---

**Note**: This integration is free for normal usage levels. Google Apps Script has quotas for heavy usage, but they're more than sufficient for typical contact form usage.
