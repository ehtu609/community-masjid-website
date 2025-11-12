# Community Masjid Website

A modern, responsive website for a community masjid with contact form functionality using EmailJS.

## 📁 Project Structure

```
Demo_website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Styling and responsive design
├── js/
│   ├── config.js       # Configuration and logger setup
│   └── main.js         # Main functionality and form handling
├── images/             # Image assets
├── assets/             # Other assets (fonts, icons, etc.)
├── .env.example        # Example environment variables
├── .gitignore          # Git ignore rules
└── README.md          # This file
```

## 🚀 Quick Start

### 1. Clone or Copy the Project

```bash
cd Demo_website
```

### 2. Set Up EmailJS Credentials

- Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
- Create an account or sign in
- Create a service (Gmail, Outlook, or custom SMTP)
- Create an email template
- Copy your credentials:
  - **Service ID**
  - **Template ID**
  - **Public Key**

### 3. Update Configuration

Open `js/config.js` and update:

```javascript
const EMAIL_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
    RECEIVER_EMAIL: 'your-email@example.com'
};
```

### 4. Open in Browser

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if installed)
npx http-server
```

Then visit: `http://localhost:8000`

## 📝 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Contact form with EmailJS integration
- ✅ Form validation (name, email, message)
- ✅ Network status monitoring
- ✅ Error handling and logging
- ✅ Clean, modular code structure
- ✅ Professional styling

## 🔧 Email Template Setup (EmailJS)

Create an email template in EmailJS with these variables:

```
Template variables used in the code:
- {{from_name}} - Visitor's name
- {{from_email}} - Visitor's email
- {{message}} - Visitor's message
- {{to_email}} - Your email (receiver)
- {{reply_to}} - Auto-reply to visitor's email
```

Example template preview:
```
Subject: New Message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}
```

## 🐛 Debugging

The code includes comprehensive logging. Open browser Console (F12) to see:

- ✓ [INFO] messages - Normal operations
- ⚠ [WARN] messages - Warnings
- ✗ [ERROR] messages - Errors

Enable/disable debugging in `js/config.js`:

```javascript
const LOG_CONFIG = {
    DEBUG: true  // Set to false to disable logs
};
```

## 📱 Customization

### Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2c5f2d;      /* Green */
    --secondary-color: #d4af37;    /* Gold */
    --text-color: #333;
    --light-bg: #f5f5f5;
}
```

### Add Sections
- Add new sections in `index.html`
- Style them in `css/styles.css`
- Add functionality in `js/main.js`

## 🚢 Deployment

### GitHub Pages

1. Create a GitHub repository
2. Push code to `main` branch
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose `main` branch and `/root` folder
6. Your site will be live at `https://username.github.io/repository-name`

### Custom Domain

1. Purchase a domain
2. Update DNS settings to point to GitHub Pages
3. Add domain in GitHub → Settings → Pages

## 📋 Before Publishing Checklist

- [ ] Add your logo and images to `images/` folder
- [ ] Update content (About, Events, Contact email)
- [ ] Configure EmailJS with real credentials
- [ ] Test contact form
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Optimize images for web
- [ ] Add favicon
- [ ] Set up Google Analytics (optional)

## 🔐 Security Notes

- Never commit `.env` file with real credentials to public repository
- Use GitHub Secrets for sensitive data if using CI/CD
- Always validate and sanitize user input
- Keep EmailJS public key separate from server keys

## 📞 Support

For EmailJS issues: [EmailJS Documentation](https://www.emailjs.com/docs/)

## 📄 License

© 2025 Community Masjid. All rights reserved.

---

Happy coding! 🎉
