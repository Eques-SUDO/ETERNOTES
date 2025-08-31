# Google Sheets Integration Setup Guide

## Overview
Your ETERNOTES contact form is now configured to automatically send submissions to a Google Spreadsheet. Follow these steps to complete the setup.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ETERNOTES Contact Form Submissions"
4. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit`
   - ID: `1ABC123DEF456`

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `src/utils/googleSheets.ts` (the `GOOGLE_APPS_SCRIPT_CODE` constant)
4. Update these values in the script:
   - Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID from Step 1
5. Save the project and name it "ETERNOTES Form Handler"

## Step 3: Deploy the Apps Script

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set these options:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the deployment URL (it will look like: `https://script.google.com/macros/s/ABC123/exec`)

## Step 4: Update Your Website

1. Open `src/utils/googleSheets.ts`
2. Replace `YOUR_SCRIPT_ID` in the `GOOGLE_SCRIPT_URL` with your deployment URL

## Step 5: Test the Integration

1. Fill out your contact form on the website
2. Submit the form
3. Check your Google Spreadsheet - you should see the submission appear automatically

## Spreadsheet Structure

The spreadsheet will automatically create these columns:
- **Timestamp**: When the form was submitted
- **Name**: Applicant's full name
- **Email**: Contact email address
- **Year**: Academic year (freshman, sophomore, etc.)
- **Instrument**: Musical instrument they play
- **Subject**: Reason for contact (join, question, etc.)
- **Message**: Their detailed message

## Benefits

✅ **Automatic Collection**: All form submissions go directly to your spreadsheet
✅ **Real-time Updates**: Instant data collection with timestamps
✅ **Easy Management**: View, sort, and export member applications
✅ **No Backend Required**: Serverless solution using Google's infrastructure
✅ **Professional Setup**: Organized data for club management

## Troubleshooting

- **Form not submitting**: Check the Google Apps Script deployment URL
- **No data in sheets**: Verify spreadsheet ID and Apps Script permissions
- **Errors in console**: Check browser developer tools for specific error messages

## Security Notes

- The Apps Script runs with your Google account permissions
- Form data is securely transmitted to Google's servers
- No sensitive data is exposed in the frontend code