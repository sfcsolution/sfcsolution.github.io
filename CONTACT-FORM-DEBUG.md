# Contact Form Error Debugging Guide

## Recent Fixes Applied

I've updated your contact form to be more robust and include better error handling and debugging. Here's what I fixed:

### 🔧 **Fixes Applied:**

1. **Improved Error Handling**
   - Added safe error message handling with null checks
   - Better error text for both English and Vietnamese
   - Enhanced timeout error messages

2. **Added Debugging Console Logs**
   - Form submission start logging
   - Current language detection logging
   - Form data validation logging
   - Validation failure specific logging
   - Data submission logging

3. **Enhanced Phone Number Validation**
   - Language-specific phone validation (Vietnamese vs. international)
   - Vietnamese validation only applies when language is set to Vietnamese
   - General international phone validation for English and other languages
   - Updated phone input placeholders based on selected language

## 🐛 **How to Debug the Contact Form:**

### Step 1: Open Browser Developer Tools
1. Right-click on your webpage → "Inspect" or press `F12`
2. Go to the "Console" tab
3. Try submitting the contact form

### Step 2: Check Console Messages
Look for these messages in the console:

```
✅ Good Messages (Normal Flow):
- "Form submission started..."
- "Current language: en" (or "vi")
- "Form data: {firstName: "...", lastName: "...", ...}"
- "All validations passed, submitting form..."
- "Sending data to Google Sheets: {...}"
- "Contact form submitted successfully: {...}"

❌ Error Messages to Watch For:
- "Validation failed: Missing required fields"
- "Validation failed: Invalid email format"
- "Validation failed: Invalid Vietnamese phone format" (when language is Vietnamese)
- "Validation failed: Invalid Vietnamese phone prefix" (when language is Vietnamese)
- "Validation failed: Invalid general phone format" (when language is English/other)
- "Error span not found"
- "Contact form error: ..."
- "Request timed out"
- "Submission error: ..."
```

### Step 3: Common Issues & Solutions

#### **Issue 1: "Error span not found"**
**Cause:** The error message HTML structure is missing
**Solution:** Check if the error message div has a `<span>` element inside

#### **Issue 2: "Validation failed: Missing required fields"**
**Cause:** Required fields are empty
**Solution:** Fill in First Name, Last Name, Email, and Message

#### **Issue 3: "Request timed out"**
**Cause:** Google Apps Script not responding
**Solution:** 
- Check your Google Apps Script URL
- Verify the script is deployed and accessible
- Test the script directly in Google Apps Script

#### **Issue 4: HTTP Error (400, 500, etc.)**
**Cause:** Google Apps Script error or configuration issue
**Solution:**
- Check Google Apps Script logs
- Verify the script permissions
- Ensure the script is deployed as a web app

## 🔗 **Google Apps Script Debugging:**

### Check Your Script URL
Current URL in your code:
```
https://script.google.com/macros/s/AKfycbwQUAFlNaDfmw04ITcyZcvL40d_Z05HgbldjdiunqafMKyo5HWXrdB2oXgUo8JnkRRmvA/exec
```

### Test the Script Directly
1. Open Google Apps Script editor
2. Run the `testSubmission` function
3. Check for any errors in the execution log

### Verify Deployment
1. In Google Apps Script, click "Deploy" → "Manage deployments"
2. Ensure the web app is deployed and accessible to "Anyone"
3. Copy the correct web app URL

## 📋 **Test Checklist:**

- [ ] Open browser console before testing
- [ ] Fill in all required fields (First Name, Last Name, Email, Message)
- [ ] Check console for "Form submission started..." message
- [ ] Verify current language detection (should show "Current language: en" or "vi")
- [ ] Verify validation passes with "All validations passed..." message
- [ ] Check for successful Google Sheets submission
- [ ] Test with both English and Vietnamese languages
- [ ] Test phone number validation (optional field):
  - **Vietnamese language**: Must be Vietnamese format (+84, 0, or 84 prefix)
  - **English/Other languages**: Accepts international phone formats

## 🌏 **Language-Specific Phone Validation:**

### Vietnamese Language (vi):
- **Required format**: +84901234567, 0901234567, or 84901234567
- **Validation**: Strict Vietnamese mobile/landline prefix validation
- **Error messages**: Vietnamese language error text

### English/Other Languages (en):
- **Accepted formats**: +1234567890, (123) 456-7890, 123-456-7890, etc.
- **Validation**: General international format (7-15 digits)
- **Error messages**: English language error text

**To test language-specific validation:**
1. Switch language using the language dropdown
2. Enter a phone number
3. Check console for "Phone validation passed for language: [en/vi]"

## 🚨 **If Form Still Doesn't Work:**

1. **Check Network Tab:**
   - Go to "Network" tab in developer tools
   - Submit the form
   - Look for the request to your Google Apps Script URL
   - Check the response status and content

2. **Verify HTML Structure:**
   - Ensure the error message div exists: `<div id="errorMessage"><span></span></div>`
   - Ensure the success message div exists: `<div id="successMessage"><span></span></div>`
   - Verify form fields have correct `name` attributes

3. **Test Google Apps Script:**
   - Open your Google Apps Script project
   - Run the test function manually
   - Check execution logs for errors

## 📞 **Contact Information for Debugging:**

If you see specific error messages in the console, share them and I can help you troubleshoot further. The console logs will now provide much better information about what's going wrong.

---

**Remember:** Always test with the browser console open to see the detailed debug information!
