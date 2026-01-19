# Email Contact Form Setup Guide

## Option 1: EmailJS (Recommended - Free & Easy)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy the **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} <{{from_email}}>

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Copy the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Environment Variables
Edit `.env.local` file with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Step 6: Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email inbox for the message

---

## Option 2: Netlify Forms (If deploying to Netlify)

If you deploy to Netlify, you can use their built-in form handling:

1. Add `netlify` attribute to your form:
```html
<form netlify name="contact" onSubmit={handleSubmit}>
```

2. Add a hidden input:
```html
<input type="hidden" name="form-name" value="contact" />
```

---

## Option 3: Formspree (Alternative service)

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create account and get form endpoint
3. Update form action to point to Formspree endpoint

---

## Option 4: Backend API (Most robust)

For production applications, consider creating a backend API with:
- Node.js + Express + Nodemailer
- Python + FastAPI + SMTP
- Serverless functions (Vercel, Netlify Functions)

---

## Current Status

✅ EmailJS integration is ready
✅ Environment variables configured
✅ Form validation included
✅ Success/error handling implemented

**Next Steps:**
1. Set up EmailJS account
2. Update `.env.local` with your credentials
3. Test the contact form