# Google Apps Script Deployment Instructions

## Prerequisites
- Make sure you've copied the fixed code from `google-sheets-setup/Code-Fixed.gs` to your Google Apps Script project
- Ensure your Google Sheet is properly set up with the correct headers

## Deployment Steps

### 1. Open Your Google Apps Script Project
- Go to [script.google.com](https://script.google.com)
- Open your existing project (or create a new one if needed)

### 2. Replace the Code
- Delete all existing code in Code.gs
- Copy and paste the entire contents from `google-sheets-setup/Code-Fixed.gs`
- Save the project (Ctrl+S)

### 3. Deploy as Web App
1. Click the **"Deploy"** button (top right)
2. Select **"New deployment"**
3. Click the gear icon ⚙️ next to "Type"
4. Select **"Web app"**
5. Configure the deployment:
   - **Description**: "SFC Contact Form Handler v2" (or similar)
   - **Execute as**: **"Me"** (your email)
   - **Who has access**: **"Anyone"** 
6. Click **"Deploy"**

### 4. Authorization
- You'll be prompted to authorize the script
- Click **"Authorize access"**
- Sign in with your Google account
- Review permissions and click **"Allow"**

### 5. Copy the Web App URL
- After deployment, you'll see a **Web app URL**
- It looks like: `https://script.google.com/macros/s/{SCRIPT_ID}/exec`
- **Copy this URL** - you'll need it for the next step

### 6. Test the Deployment
You can test the deployment by:
1. Opening the Web app URL in a browser (should show API status)
2. Using the test functions in the Apps Script editor:
   - Run `testSubmission()` function
   - Check the execution logs

## Important Notes
- ✅ Use **"Execute as: Me"** (not "User accessing the web app")
- ✅ Use **"Who has access: Anyone"** (this allows your website to submit forms)
- ✅ Make sure your Google Sheet has the correct column headers
- ✅ The script includes extensive logging for debugging

## Next Steps
After deployment:
1. Update the `scriptURL` in your website's `index.html`
2. Test the contact form from your live website
3. Check the Google Sheet for successful submissions
4. Monitor the Apps Script logs for any issues

## Troubleshooting
If deployment fails:
- Check that you've authorized all required permissions
- Ensure your Google account has access to Google Sheets API
- Try creating a new deployment instead of updating an existing one
- Check the Apps Script execution logs for detailed error messages
