# Contact Form Troubleshooting Guide

## Current Issue: "Sorry, there was an error sending your message"

This error typically occurs due to one of several common issues. Follow this step-by-step troubleshooting guide:

## 🔍 **Step 1: Check Browser Console**

1. Open your website in a browser
2. Press `F12` or right-click and select "Inspect"
3. Go to the "Console" tab
4. Try to submit the contact form
5. Look for error messages in red

**Common error messages and solutions:**

### Error: "Failed to fetch" or "Network Error"
**Cause:** CORS (Cross-Origin Resource Sharing) issue or network connectivity
**Solutions:**
1. Ensure your Google Apps Script is deployed as a web app with proper permissions
2. Check if the scriptURL in your HTML is correct and accessible
3. Test the script URL directly in a browser

### Error: "Unauthorized" or "403 Forbidden"
**Cause:** Google Apps Script permissions or execution policy
**Solutions:**
1. Redeploy your Google Apps Script with "Anyone" access permissions
2. Make sure the script execution is set to "Anyone, even anonymous"

### Error: "Script function not found"
**Cause:** Missing or incorrect doPost function in Google Apps Script
**Solution:** Ensure your Google Apps Script has the correct doPost function

## 🔧 **Step 2: Verify Google Apps Script Setup**

### Check Script URL:
Your current script URL is:
```
https://script.google.com/macros/s/AKfycbwQUAFlNaDfmw04ITcyZcvL40d_Z05HgbldjdiunqafMKyo5HWXrdB2oXgUo8JnkRRmvA/exec
```

### Test Script URL:
1. Open the script URL directly in a browser
2. You should see either:
   - A blank page (which is normal for a POST endpoint)
   - An error message that gives more details

### Redeploy Instructions:
1. Go to your Google Apps Script project
2. Click "Deploy" → "Manage deployments"
3. Click the edit icon (pencil) next to your current deployment
4. Change the version to "New version"
5. Ensure "Execute as" is set to "Me"
6. Ensure "Who has access" is set to "Anyone"
7. Click "Deploy"
8. Copy the new Web app URL
9. Update the scriptURL in your HTML file

## 🧪 **Step 3: Test with Simple Data**

Add this test function to your debugging process:

```javascript
// Test function - add this temporarily to your script section
async function testContactForm() {
    const testData = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "This is a test message",
        timestamp: new Date().toISOString(),
        source: "Test"
    };
    
    try {
        const response = await fetch('YOUR_SCRIPT_URL_HERE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
        } else {
            console.log('Error response:', await response.text());
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the test
testContactForm();
```

## 🔄 **Step 4: Alternative Solutions**

If Google Apps Script continues to fail, consider these alternatives:

### Option 1: Use Netlify Forms (if hosting on Netlify)
```html
<form name="contact" method="POST" data-netlify="true">
    <!-- your form fields -->
</form>
```

### Option 2: Use Formspree
1. Sign up at https://formspree.io/
2. Get your form endpoint
3. Update your form action

### Option 3: Use EmailJS
1. Sign up at https://www.emailjs.com/
2. Set up email templates
3. Use their JavaScript SDK

## 📋 **Step 5: Quick Fixes to Try**

### Fix 1: Update Error Handling
The current error handling might be too strict. Try this updated version:

```javascript
// In your form submission code, replace the error handling section with:
} catch (error) {
    console.error('Contact form error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
    });
    
    // Show more specific error message
    let errorText;
    if (error.name === 'AbortError') {
        errorText = currentLang === 'vi' ? 
            'Yêu cầu hết thời gian chờ. Vui lòng thử lại.' : 
            'Request timed out. Please try again.';
    } else if (error.message.includes('Failed to fetch')) {
        errorText = currentLang === 'vi' ? 
            'Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối internet.' : 
            'Unable to connect to server. Please check your internet connection.';
    } else {
        errorText = currentLang === 'vi' ? 
            'Có lỗi kỹ thuật xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.' : 
            'A technical error occurred. Please try again later or contact us directly via email.';
    }
    
    const errorSpan = errorMessage.querySelector('span');
    if (errorSpan) {
        errorSpan.textContent = errorText;
    }
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 8000); // Show error longer for debugging
}
```

### Fix 2: Add Request Logging
Add this before the fetch request:

```javascript
console.log('Making request to:', scriptURL);
console.log('Request payload:', JSON.stringify(data, null, 2));
console.log('Request headers will be:', {
    'Content-Type': 'application/json'
});
```

## 📞 **Getting Help**

If none of these solutions work:

1. **Check the browser console** for specific error messages
2. **Share the exact error message** from the console
3. **Test the Google Apps Script URL** directly in a browser
4. **Verify the Google Apps Script** has the correct permissions

## 🚨 **Emergency Contact Method**

As a temporary workaround, you can add a "mailto:" link as a fallback:

```html
<p style="text-align: center; margin-top: 20px;">
    <a href="mailto:contact@digifact.vn?subject=Contact%20Form%20Inquiry&body=Please%20include%20your%20project%20details%20here" 
       style="color: #3b82f6; text-decoration: underline;">
        Or email us directly at contact@digifact.vn
    </a>
</p>
```

This ensures visitors can still contact you even if the form is not working.
