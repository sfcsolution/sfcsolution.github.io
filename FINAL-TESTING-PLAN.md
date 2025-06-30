# Final Testing Plan for SFC Contact Form

## Pre-Testing Checklist
- [ ] Google Apps Script deployed with fixed code (Code-Fixed.gs)
- [ ] Web app deployed with "Execute as: Me" and "Anyone" access
- [ ] New deployment URL copied
- [ ] Website updated with new scriptURL
- [ ] Changes committed and pushed to GitHub
- [ ] Website live at https://sfcsolution.github.io

## Test Scenarios

### 1. Basic Form Submission Test
**Objective**: Verify successful form submission with valid data

**Steps**:
1. Open https://sfcsolution.github.io
2. Click "Contact Us" button
3. Fill out the form with valid data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "0123456789" (Vietnamese format)
   - Message: "This is a test submission"
4. Click "Send Message"
5. **Expected**: Success message appears
6. **Verify**: Check Google Sheet for new row with submitted data

### 2. Validation Testing
**Objective**: Test client-side validation

**Test Cases**:
- [ ] Empty form submission (should show required field errors)
- [ ] Invalid email format (should show email error)
- [ ] Invalid phone number in Vietnamese (should show phone error)
- [ ] Valid submission (should succeed)

### 3. Multi-Language Testing
**Objective**: Test internationalization

**Steps**:
1. Test form in English
2. Switch to Vietnamese
3. Test form validation messages in Vietnamese
4. Test successful submission in Vietnamese

### 4. Error Handling Testing
**Objective**: Test error scenarios

**Test Cases**:
- [ ] Network error simulation (disconnect internet briefly)
- [ ] Invalid script URL (temporarily change URL)
- [ ] Server error simulation

### 5. Browser Compatibility Testing
**Objective**: Test across different browsers

**Browsers to Test**:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## Success Criteria
- ✅ Form submits successfully without CORS errors
- ✅ Data appears correctly in Google Sheet
- ✅ Success/error messages display properly
- ✅ Validation works for all languages
- ✅ No console errors
- ✅ Works across all major browsers

## Debugging Tools
If issues occur, check:
1. **Browser Console**: Look for JavaScript errors
2. **Network Tab**: Check for failed requests
3. **Google Apps Script Logs**: Check execution logs
4. **Google Sheet**: Verify data structure and permissions

## Post-Testing Cleanup
After successful testing:
- [ ] Remove or comment out debug functions in Apps Script
- [ ] Update documentation with final deployment details
- [ ] Monitor form submissions for any ongoing issues

## Emergency Rollback Plan
If major issues occur:
1. Revert to previous scriptURL
2. Check Apps Script deployment settings
3. Verify Google Sheet permissions
4. Use contact-form-test.html for isolated testing
