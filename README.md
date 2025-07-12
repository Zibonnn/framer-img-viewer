# Image Viewer - Lightweight JavaScript Image Modal

🌐 **Live Demo**: [https://zibonnn.github.io/framer-img-viewer/](https://zibonnn.github.io/framer-img-viewer/)

A lightweight JavaScript solution that automatically makes all images on a webpage clickable, opening them in a full-screen modal overlay. Perfect for CMS content where you can't use native lightbox features.

## 🌟 Features

- ✅ **Automatic detection** of all images on the page
- ✅ **Dynamic content support** - works with CMS content that loads after page load
- ✅ **No dependencies** - pure vanilla JavaScript
- ✅ **Ad-blocker friendly** - uses generic class names and no external requests
- ✅ **Mobile responsive** - works on all screen sizes
- ✅ **Keyboard accessible** - ESC key closes the modal
- ✅ **Framer compatible** - designed to work with Framer websites

## 🚀 Quick Start

### Option 1: Direct Script Tag (Recommended)
Add this single line to your website's `<head>` section:

```html
<script src="https://raw.githubusercontent.com/Zibonnn/framer-img-viewer/main/image-viewer.js"></script>
```

### Option 2: Copy and Paste
Copy the contents of `image-viewer.js` and paste it directly into your website's `<head>` section:

```html
<script>
// Paste the entire script content here
</script>
```

### Option 3: Framer Integration
1. Go to your Framer project settings
2. Navigate to "Custom Code"
3. Add the script to the "Head" section
4. Publish your site

## 📖 Documentation

This repository includes a complete documentation website:

- **Home Page** (`index.html`) - Overview, features, and live demo
- **How To Use** (`how-to-use.html`) - Detailed installation guide with screenshots

## 🎯 How it Works

Once installed, the script automatically:
1. Scans the page for all `<img>` elements
2. Makes them clickable with a pointer cursor
3. Opens clicked images in a full-screen modal
4. Continues monitoring for new images (useful for dynamic CMS content)

### Technical Details

- **Automatic Detection**: Scans the entire document for images
- **Dynamic Monitoring**: Uses MutationObserver to detect new images added by CMS
- **Multiple Initialization**: Tries several times to ensure it works with various loading patterns
- **Event Handling**: Prevents event bubbling and handles clicks properly

## 🎨 Customization

The script is self-contained and doesn't require configuration, but you can modify the styles by editing the CSS in the script:

- **Modal background**: Change `rgba(0, 0, 0, 0.9)` for different overlay colors
- **Image size**: Modify `max-width: 90%` and `max-height: 90%` for different image sizes
- **Close button**: Customize the `×` symbol or its styling

## 🌐 Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📁 Repository Structure

```
framer-img-viewer/
├── image-viewer.js      # The working JavaScript script
├── index.html           # Home page with demo
├── how-to-use.html      # Detailed installation guide
├── styles.css           # Modern CSS styling
├── README.md            # This file
├── LICENSE              # MIT license
└── .gitignore           # Git ignore file
```

## 🔧 Development

To run the documentation site locally:

1. Clone the repository
2. Open `index.html` in your browser
3. Navigate between pages to see the full documentation

## 📸 Screenshots

To add screenshots to the documentation:

1. Create an `img/` folder in the root directory
2. Add your screenshots with the following names:
   - `installation-1.png` - HTML head section with script tag
   - `installation-2.png` - HTML with embedded script
   - `framer-settings.png` - Framer project settings
   - `framer-custom-code.png` - Custom Code section
   - `framer-head-script.png` - Script added to head section

## 🤝 Contributing

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use in any project.

## 🆘 Troubleshooting

**Images not clickable?**
- Check browser console for any errors
- Ensure the script is loaded before your content
- Try refreshing the page

**Modal not appearing?**
- Check if there are any CSS conflicts with `z-index: 9999`
- Ensure images have valid `src` attributes

**Not working with CMS content?**
- The script includes multiple fallback mechanisms
- Check console logs for initialization messages
- Try the test button if available

## 👨‍💻 About the Creator

**Zibon** - A passionate designer and developer who loves creating tools that make the web better.

- 🌐 **Portfolio**: [zibon.design](https://zibon.design)
- 📝 **Bangla Blog**: [zibonthinks.framer.ai](https://zibonthinks.framer.ai/) (Built this tool for this blog!)
- 🎨 **Dribbble**: [dribbble.com/Zibon](https://dribbble.com/Zibon)
- 🐦 **X (Twitter)**: [x.com/Zibonnn](https://x.com/Zibonnn)
- ✉️ **Email**: zibon@duck.com

## 🌟 Made with ❤️

This project is designed to make the web a better place, one clickable image at a time. Built specifically for my Bangla blog to enhance the reading experience. 