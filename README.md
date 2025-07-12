# 🚨 **WORK IN PROGRESS - DOES NOT WORK YET** 🚨

## ⚠️ **IMPORTANT NOTICE**

**This image viewer extension is currently NOT WORKING and is under active development.**

### **Current Status:**
- ❌ **Not functional** in Framer sites
- ❌ **Multiple approaches attempted** but blocked by Framer restrictions
- ❌ **CMS Rich Content limitations** prevent proper implementation
- 🔄 **Work in progress** - exploring alternative solutions

### **Attempted Solutions:**
1. ✅ **JavaScript-based lightbox** - Works locally, fails in Framer
2. ✅ **Code overrides** - Attempted but doesn't work with Rich Content
3. ✅ **CSS + Minimal JS** - Developed but still blocked by Framer
4. ✅ **Multiple selector strategies** - All approaches tested

### **Technical Challenges:**
- **Framer CMS Rich Content** has severe JavaScript restrictions
- **Custom Code limitations** prevent DOM manipulation
- **5,000 character limit** for Custom Code
- **Security policies** block many lightbox approaches

---

# Image Viewer Extension for Framer

## Overview
A lightweight image lightbox/viewer extension designed to work with Framer's CMS Rich Content components. Currently exploring solutions to work around Framer's restrictions.

## Features (Planned)
- 🖼️ **Automatic image detection** in Rich Content
- 🔍 **Click to enlarge** functionality  
- 📱 **Responsive design** for all devices
- ⌨️ **Keyboard navigation** (ESC to close)
- 🎨 **Smooth animations** and transitions
- 🚫 **No CMS modifications** required

## File Structure

### **Current Implementations:**
- `image-viewer.js` - Various JavaScript approaches attempted
- `css-lightbox.css` - CSS-only lightbox styles
- `css-lightbox-helper.js` - Minimal JavaScript helper (2,525 chars)
- `rich-content-override.tsx` - Framer code override attempt
- `framer-minified.html` - Combined CSS+JS for Framer (3,632 chars)

### **Test Files:**
- `test.html` - Local testing environment
- `css-lightbox-test.html` - CSS lightbox testing
- `how-to-use.html` - Implementation guide

### **Documentation:**
- `README.md` - This file
- `LICENSE` - MIT License

## Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Character Count Status
- **CSS + JS Combined:** 3,632 characters ✅ (under 5,000 limit)
- **JavaScript only:** 2,525 characters ✅ (under 5,000 limit)

## Development Notes

### **What Works Locally:**
- ✅ Image detection and processing
- ✅ Hover effects and visual feedback
- ✅ Lightbox modal functionality
- ✅ Keyboard and click-outside closing
- ✅ Dynamic content detection

### **What Fails in Framer:**
- ❌ Event handlers not attaching to CMS images
- ❌ DOM manipulation restricted
- ❌ Code overrides limited for Rich Content
- ❌ Timing issues with Framer's loading

### **Approaches Attempted:**

#### **1. Standard JavaScript Lightbox**
- **Status:** ❌ Failed
- **Issue:** Framer's Custom Code restrictions

#### **2. Framer Code Overrides**  
- **Status:** ❌ Failed
- **Issue:** Rich Content component limitations

#### **3. CSS-Only + Minimal JS**
- **Status:** ❌ Failed  
- **Issue:** Still blocked by Framer security

#### **4. External Hosted Solution**
- **Status:** 🔄 To be explored
- **Potential:** Iframe embedding approach

## Next Steps
1. **Investigate iframe-based solutions**
2. **Explore Framer's official component store**
3. **Consider server-side image processing**
4. **Test with different Framer plan tiers**

## Contributing
This project is currently in research phase. Contributions and ideas for working around Framer's restrictions are welcome.

## License
MIT License - see LICENSE file for details. 