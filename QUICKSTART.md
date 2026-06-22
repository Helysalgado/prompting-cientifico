# Quick Start Guide

Get your course up and running in 5 minutes! ⚡

## Step 1: Copy This Template

Choose one method:

### Option A: Use as Template on GitHub
1. Click "Use this template" button on GitHub
2. Create your new repository
3. Clone to your local machine

### Option B: Download ZIP
1. Download the ZIP file
2. Extract to your desired location
3. Initialize git repository (optional)

## Step 2: Customize Your Course

### Essential Configuration

Edit `_variables.yml`:

```yaml
project:
  name: "Your Course Title"
  
author:
  name: "Your Name"
  email: "your.email@example.com"
  
colors:
  primary: "#YourColor"    # Your brand color
  secondary: "#YourColor"  # Secondary brand color
```

Edit `_quarto.yml`:

```yaml
website:
  title: "Your Course Title"
  site-url: "https://yourusername.github.io/your-course"
  repo-url: "https://github.com/yourusername/your-course"
```

### Update Home Page

Edit `index.qmd` with your course information.

## Step 3: Add Your Content

### Create a New Chapter

1. **Copy the template**:
   ```bash
   cp -r templates/chapter-template.qmd chapters/chapter-01/index.qmd
   ```

2. **Edit the content**

3. **Add to navigation** in `_quarto.yml`:
   ```yaml
   sidebar:
     contents:
       - text: "Chapter 1: Your Title"
         href: chapters/chapter-01/index.qmd
   ```

### Create an Exercise

1. **Copy the template**:
   ```bash
   cp templates/exercise-template.qmd exercises/exercise-01.qmd
   ```

2. **Customize for your needs**

3. **Link from exercises page**

## Step 4: Preview Locally

```bash
quarto preview
```

Your course will open in your browser at `http://localhost:4200`

## Step 5: Deploy

### GitHub Pages (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial course setup"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages
   - Select source: GitHub Actions
   - Add the workflow file (see README.md)

3. **Your site will be live at**:
   `https://yourusername.github.io/your-course`

### Alternative: Manual Build

```bash
quarto render
# Upload contents of _site/ to your server
```

## Next Steps

1. ✅ Customize colors and branding
2. ✅ Add your logo to `assets/images/`
3. ✅ Write your content
4. ✅ Test thoroughly
5. ✅ Deploy!

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🎨 Explore [Component Library](components/component-examples.qmd)
- 📝 Check [Templates](templates/)
- 🐛 Report issues on GitHub
- 💬 Join discussions

## Quick Tips

### Useful Commands

```bash
# Preview with specific port
quarto preview --port 4200

# Render entire site
quarto render

# Render single file
quarto render index.qmd

# Check for issues
quarto check
```

### File Structure Reminder

```
your-course/
├── _quarto.yml          # Main config - edit this!
├── _variables.yml       # Colors, metadata - edit this!
├── index.qmd            # Home page - edit this!
├── chapters/            # Your chapters go here
│   └── chapter-01/
│       └── index.qmd
├── exercises/           # Your exercises go here
├── assets/
│   ├── css/            # Styles (usually no need to edit)
│   ├── js/             # Scripts (usually no need to edit)
│   └── images/         # Add your images here!
└── resources/          # Datasets, downloads, etc.
```

### Common Gotchas

1. **Links not working?**
   - Use relative paths: `chapters/chapter-01/index.qmd`
   - Or use absolute URLs

2. **Styles not applying?**
   - Clear browser cache
   - Check CSS file paths in `_quarto.yml`

3. **Images not showing?**
   - Verify image path is correct
   - Images should be in `assets/images/`

4. **Changes not visible?**
   - Stop and restart `quarto preview`
   - Sometimes needs a full render

## Checklist Before Launch

- [ ] Updated `_variables.yml` with your information
- [ ] Updated `_quarto.yml` with your URLs
- [ ] Replaced placeholder images with your own
- [ ] Wrote or adapted at least one chapter
- [ ] Tested all navigation links
- [ ] Checked responsive design (mobile, tablet)
- [ ] Tested dark mode
- [ ] Verified accessibility (keyboard navigation)
- [ ] Spell-checked content
- [ ] Set up deployment
- [ ] Announced your course!

## Ready to Go! 🚀

You now have a professional, modern course website. Focus on creating great content - the template handles the rest!

---

**Questions?** Open an issue or start a discussion on GitHub.

**Happy Teaching!** 🎓

