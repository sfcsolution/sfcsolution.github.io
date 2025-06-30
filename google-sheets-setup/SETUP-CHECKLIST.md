# Quick Setup Checklist

## Google Sheets Contact Form Integration

### ✅ Preparation
- [ ] Have a Google Account ready
- [ ] Access to Google Sheets and Google Apps Script

### ✅ Step 1: Create Google Sheet
- [ ] Go to sheets.google.com
- [ ] Create new spreadsheet
- [ ] Name it "SFC Solution - Contact Submissions"

### ✅ Step 2: Set up Apps Script
- [ ] In Google Sheet: Extensions → Apps Script
- [ ] Delete existing code
- [ ] Copy-paste code from `Code.gs`
- [ ] Save project as "SFC Solution Contact Form Handler"

### ✅ Step 3: Configure Email
- [ ] Edit line 81 in Code.gs
- [ ] Replace 'your-email@gmail.com' with your real email
- [ ] Save the file

### ✅ Step 4: Test Setup
- [ ] Select `testSubmission` function
- [ ] Click Run button
- [ ] Authorize permissions when prompted
- [ ] Check Google Sheet for test entry
- [ ] Check email for notification

### ✅ Step 5: Deploy Web App
- [ ] Click Deploy → New deployment
- [ ] Select Web app type
- [ ] Execute as: Me
- [ ] Who has access: Anyone
- [ ] Click Deploy
- [ ] Copy Web app URL

### ✅ Step 6: Update Website
- [ ] Open index.html
- [ ] Find line with 'YOUR_SCRIPT_ID'
- [ ] Replace with your Web app URL
- [ ] Save file

### ✅ Step 7: Final Test
- [ ] Open website in browser
- [ ] Submit contact form
- [ ] Check Google Sheet for new entry
- [ ] Check email for notification

## Important URLs to Keep

**Google Sheet URL**: ________________________________

**Apps Script URL**: ________________________________

**Web App URL**: ________________________________

## Support Contact
If you need help, contact your web developer or refer to the full README.md guide.

---
**Setup Date**: ___________  
**Completed by**: ___________
