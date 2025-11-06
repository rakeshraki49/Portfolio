# Modern Portfolio Website - Rakesh M

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript featuring an animated background in the hero section, designed for an engineering student.

## Features

- **Animated floating shapes background** in hero section with dark overlay
- **Dark theme** with cyan/teal accent colors
- **Glassmorphism effects** with blur and transparency
- **Smooth animations** and scroll effects
- **Typewriter effect** for hero tagline
- **Responsive design** for all devices
- **Mobile hamburger menu**
- **Contact form** with validation
- **Interactive project cards**
- **Timeline experience section**
- **Skills showcase** with technology tags

## Sections

1. **Hero** - Animated floating shapes background with name, title, and CTA buttons
2. **About** - Bio, stats, and profile photo for engineering student
3. **Skills** - Technology stack with icons in grid layout
4. **Projects** - Featured projects with images, descriptions, and links
5. **Achievements** - Academic and coding achievements
6. **Experience** - Timeline of education and academic journey
7. **Contact** - Email contact and resume download functionality
8. **Footer** - Social links and copyright

## Technologies Used

- HTML5
- CSS3 (with CSS Grid, Flexbox, and animations)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts (Inter)
- Unsplash images

## Setup Instructions

1. **Download a background video** (optional):
   - Replace `videos/hero-bg.mp4` with your own video
   - Recommended: 1920x1080, MP4 format, under 10MB for web optimization
   - The video should be muted, autoplay, and loop

2. **Open the website**:
   ```bash
   # Navigate to the project directory
   cd /path/to/portfolio
   
   # Open in browser
   firefox index.html
   # or
   google-chrome index.html
   # or
   xdg-open index.html
   ```

3. **Customize content**:
   - Edit `index.html` to update personal information
   - Replace placeholder images with your own
   - Update project details and links
   - Modify colors in `style.css` if desired

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css          # CSS styles
├── script.js          # JavaScript functionality
├── README.md          # This file
├── images/            # Image assets (optional)
├── videos/            # Background video
│   └── hero-bg.mp4    # Hero section background video
└── icons/             # Icon assets (optional)
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes

- Video is optimized for web (autoplay, muted, loop)
- Images are loaded from Unsplash CDN
- CSS and JS are minified for production
- Smooth scrolling and animations are hardware-accelerated

## Customization

### Colors
The main color scheme can be changed by updating CSS variables:
- Primary: `#06b6d4` (cyan)
- Background: `#0f172a` (dark blue)
- Text: `#e2e8f0` (light gray)

### Content
- Update personal information in HTML
- Replace project images and descriptions
- Modify skills and experience sections
- Add your own background video

## License

This project is open source and available under the MIT License.
