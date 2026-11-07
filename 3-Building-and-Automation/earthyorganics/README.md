# Earthy Organics - Natural Lion's Mane Supplements Website

**Developer:** StynerDev  
**Portfolio:** [styner.dev](https://www.styner.dev/)  
**GitHub:** [@stynerdev225](https://github.com/stynerdev225)  
**Project Type:** Multi-page Business Website  
**Tech Stack:** HTML5, CSS3, JavaScript, Bootstrap  
**Version:** 1.0.0  
**Last Updated:** December 22, 2025

---

## 📋 Project Overview

Professional e-commerce website for Earthy Organics, a Lion's Mane supplement company based in San Francisco. The site features product catalogs, educational content, blog functionality, and a complete shopping experience.

### Key Features
- ✅ 17 responsive HTML pages
- ✅ Full e-commerce product display
- ✅ Blog with detailed articles
- ✅ FAQ and educational resources
- ✅ Contact forms and newsletter signup
- ✅ Mobile-responsive design
- ✅ Optimized for Lion's Mane supplement brand

---

## 🚀 Quick Start

### Prerequisites
- Python 3.x (for local server)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)

### Running Locally

1. **Navigate to project directory:**
   ```bash
   cd "/path/to/earthlyorganics/download version"
   ```

2. **Start local server:**
   ```bash
   python3 -m http.server 3000
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Alternative (using npm):
```bash
npm install
npm run dev
```

---

## 📁 Project Structure

```
earthlyorganics/
├── download version/          # Main website files
│   ├── index.html            # Homepage
│   ├── about.html            # About page
│   ├── products-grid-sidebar.html
│   ├── product-details-sidebar.html
│   ├── services.html         # Events & Education
│   ├── service-details.html  # Event details
│   ├── blog.html             # Blog listing
│   ├── blog-details.html     # Article template
│   ├── faq.html              # FAQ page
│   ├── contact.html          # Contact form
│   ├── cart.html             # Shopping cart
│   ├── checkout.html         # Checkout page
│   ├── pricing-plan.html     # Subscription plans
│   ├── gallery.html          # Image gallery
│   ├── history.html          # Company story
│   ├── account.html          # User account
│   ├── 404.html              # Error page
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css     # Main stylesheet (13,000+ lines)
│   │   │   └── bootstrap.min.css
│   │   ├── js/
│   │   │   ├── main.js       # Custom JavaScript
│   │   │   └── vendor/       # jQuery, plugins
│   │   ├── img/
│   │   │   ├── products/     # Product images
│   │   │   ├── blog/         # Blog images
│   │   │   ├── hero/         # Hero banners
│   │   │   ├── icons/        # Icon assets
│   │   │   └── logos/        # Brand logos
│   │   └── sass/             # SCSS source files
│   │
│   ├── fix-image-frame.css   # Custom image fixes
│   └── fix-image-box.css     # Additional fixes
│
├── package.json              # Node dependencies
└── README.md                # This file
```

---

## 🎨 Customization Guide

### Updating Brand Colors
Edit `/download version/assets/css/style.css`:
```css
:root {
  --theme-color: #your-color;
  --theme-color2: #your-secondary-color;
}
```

### Changing Contact Information
Global contact info locations:
- **Email:** Search for `hello@earthyorganics.org` and replace
- **Phone:** Search for `1800-CANTICLE-FARM` and replace
- **Address:** Search for `1455 Market Street, Suite 1600, San Francisco, CA 94103`

### Adding New Products
1. Navigate to `products-grid-sidebar.html`
2. Copy an existing product block
3. Update:
   - Product image path
   - Product title
   - Price
   - Description
   - Link to detail page

### Updating Footer Text
Search for: `Wellness, simplified. Natural Lion's Mane supplements designed for focus, clarity, and everyday balance.`

---

## 🛠️ Technical Details

### Dependencies
- **Bootstrap 5.x** - Grid system and responsive utilities
- **jQuery 3.6.0** - DOM manipulation
- **Slick Slider** - Product carousels
- **Nice Select** - Custom select dropdowns
- **Font Awesome** - Icon library

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Optimized images (PNG format)
- Minified CSS and JavaScript
- Lazy loading for images
- Efficient carousel implementation

---

## 📝 Content Management

### Updating Blog Posts
**Location:** `/download version/blog-details.html`

1. Edit the article title (line ~425)
2. Update main content paragraphs
3. Change author information
4. Update categories and tags
5. Modify publish date

### Modifying FAQ
**Location:** `/download version/faq.html`

Each FAQ follows this structure:
```html
<div class="accordion-item">
  <h2 class="accordion-header">
    <button>Your Question</button>
  </h2>
  <div class="accordion-collapse">
    <div class="accordion-body">Your Answer</div>
  </div>
</div>
```

### Adding Pages to Navigation
Edit navigation in each HTML file (around line 140-310):
```html
<nav class="main-menu">
  <ul>
    <li><a href="your-new-page.html">New Page</a></li>
  </ul>
</nav>
```

---

## 🚀 Deployment

### Option 1: Traditional Hosting (cPanel/FTP)
1. Compress entire `/download version/` folder
2. Upload to public_html or www directory
3. Extract files
4. Point domain to hosting
5. Test all links

### Option 2: Static Hosting (Netlify/Vercel)
1. Create account on Netlify or Vercel
2. Connect to Git repository OR drag & drop folder
3. Deploy automatically
4. Custom domain configuration

### Option 3: AWS S3 Static Website
1. Create S3 bucket
2. Enable static website hosting
3. Upload files
4. Configure CloudFront (optional)
5. Point DNS to S3

### Pre-Deployment Checklist
- [ ] All images load correctly
- [ ] Contact forms point to correct email
- [ ] Phone numbers are correct
- [ ] Address information is accurate
- [ ] All links work (no 404s)
- [ ] Mobile responsiveness tested
- [ ] Browser compatibility verified
- [ ] SSL certificate configured
- [ ] Analytics tracking added (if needed)

---

## 🔧 Maintenance

### Regular Updates
- Product prices and availability
- Blog posts and articles
- FAQ content
- Team member information
- Seasonal promotions

### Monitoring
- Check broken links monthly
- Review contact form submissions
- Monitor page load speeds
- Update dependencies annually
- Backup files regularly

---

## 📞 Developer Contact

**StynerDev**  
Professional Web Development Services

For technical support, updates, or new features:
- 🌐 Portfolio: [styner.dev](https://www.styner.dev/)
- 💼 GitHub: [@stynerdev225](https://github.com/stynerdev225)
- 📧 Inquiries: Available through portfolio
- 🚨 Emergency support available

---

## 📄 License & Credits

**Website Development:** StynerDev © 2024-2025  
**Client:** Earthy Organics  
**Framework:** Bootstrap 5  
**Icons:** Font Awesome  

All rights reserved. This website and its contents are proprietary to Earthy Organics.

---

## 🔄 Version History

### v1.0.0 (December 22, 2025)
- ✅ Initial website launch
- ✅ 17 fully responsive pages
- ✅ Complete Lion's Mane product content
- ✅ Blog and FAQ functionality
- ✅ E-commerce shopping experience
- ✅ Mobile optimization
- ✅ Contact forms integrated
- ✅ Professional branding complete

---

**Built with ❤️ by StynerDev**
