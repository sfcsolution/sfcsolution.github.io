#!/bin/bash
# Website Update Script for New Google Apps Script URL

# Instructions:
# 1. Deploy your Google Apps Script following DEPLOYMENT-INSTRUCTIONS.md
# 2. Copy the new Web App URL from the deployment
# 3. Replace the URL below with your new deployment URL
# 4. Run this script or manually update the index.html file

# Current scriptURL in index.html:
# https://script.google.com/macros/s/AKfycbwQUAFlNaDfmw04ITcyZcvL40d_Z05HgbldjdiunqafMKyo5HWXrdB2oXgUo8JnkRRmvA/exec

# Replace this with your NEW deployment URL:
NEW_SCRIPT_URL="YOUR_NEW_DEPLOYMENT_URL_HERE"

echo "To update the website with your new Google Apps Script URL:"
echo "1. Open index.html"
echo "2. Find line 2289 (around line 2289)"
echo "3. Replace the scriptURL value with your new deployment URL"
echo ""
echo "Current:"
echo "const scriptURL = 'https://script.google.com/macros/s/AKfycbwQUAFlNaDfmw04ITcyZcvL40d_Z05HgbldjdiunqafMKyo5HWXrdB2oXgUo8JnkRRmvA/exec';"
echo ""
echo "Replace with:"
echo "const scriptURL = 'YOUR_NEW_DEPLOYMENT_URL_HERE';"
echo ""
echo "Then save the file and commit your changes to GitHub!"
