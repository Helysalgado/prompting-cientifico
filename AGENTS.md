# AGENTS.md

## Project Overview

This is a Quarto website template for educational courses with modern UX design and comprehensive component library.

- **Static site generator**: Quarto (https://quarto.org)
- **Output format**: HTML website with responsive design
- **Design system**: Custom CSS with Nord-inspired color palette
- **Component library**: 15+ reusable UI components for educational content
- **Purpose**: Create professional, accessible online courses

## Development Commands

### Preview & Build

```bash
# Preview locally with hot reload
quarto preview

# Render entire site
quarto render

# Render single file
quarto render path/to/file.qmd

# Check project configuration
quarto check
```

### File Structure

```
.
├── _quarto.yml              # Main Quarto configuration - edit for navigation
├── _variables.yml           # Global variables (colors, metadata)
├── index.qmd                # Home page
├── about.qmd                # About page
├── chapters/                # Course chapters (*.qmd files)
│   ├── sesion-01-fundamentos/  # Session 1 content
│   │   ├── index.qmd
│   │   ├── prompting-cientifico.qmd
│   │   ├── patrones-avanzados.qmd
│   │   ├── glosario.qmd
│   │   └── recursos.qmd
│   ├── example-chapter-01/
│   └── example-chapter-02/
├── exercises/               # Exercise pages
│   └── sesion-01-analisis-prompts.qmd
├── templates/               # Reusable templates
│   ├── chapter-template.qmd
│   └── exercise-template.qmd
├── components/              # Component library reference
│   └── component-examples.qmd
├── assets/
│   ├── css/                # Main styles (DO NOT modify directly)
│   │   ├── styles.css      # Main stylesheet
│   │   └── components.css  # UI components
│   ├── scss/               # SCSS themes (modify these for styling)
│   │   ├── custom-light.scss
│   │   └── custom-dark.scss
│   ├── js/                 # Custom JavaScript
│   │   └── custom.js
│   └── images/             # Images and assets
└── resources/              # Downloadable resources
```

## Customization Guidelines

### Colors & Branding

**Edit colors in**: `_variables.yml` (YAML format)

```yaml
colors:
  primary: "#2E3440"      # Main brand color
  secondary: "#5E81AC"    # Secondary brand color
  accent: "#88C0D0"       # Accent color
```

**DO NOT edit** `assets/css/*.css` directly - these are compiled outputs.
**Instead, modify** `assets/scss/custom-light.scss` or `custom-dark.scss` for theme changes.

### Creating New Content

**New Chapter:**

1. Copy from: `templates/chapter-template.qmd`
2. Place in: `chapters/your-chapter-name/index.qmd`
3. Update navigation in: `_quarto.yml` under `sidebar.contents`

```yaml
sidebar:
  contents:
    - section: "Your Section"
      contents:
        - text: "Chapter Title"
          href: chapters/your-chapter/index.qmd
```

**New Exercise:**

1. Copy from: `templates/exercise-template.qmd`
2. Place in: `exercises/your-exercise-name.qmd`
3. Link from exercises index or chapter

### Component Usage

Standard components (see `components/component-examples.qmd` for full reference):

**Callouts** (5 types):

```markdown
::: {.callout-note}
## Title
Content
:::
```

Variants: `.callout-note`, `.callout-tip`, `.callout-warning`, `.callout-important`, `.callout-caution`

**Cards**:

```markdown
::: {.card}
::: {.card-header}
Header
:::
::: {.card-body}
Content
:::
:::
```

Variants: `.card-primary`, `.card-success`, `.card-warning`, `.card-danger`, `.card-info`

**Learning Objectives**:

```markdown
::: {.learning-objectives}
### Learning Objectives

- Objective 1
- Objective 2
:::
```

**Exercise Boxes**:

```markdown
::: {.exercise-box}
### Exercise Title
Task description
:::
```

**Progress Bars**:

```markdown
::: {.progress-container}
::: {.progress-label}
<span>Label</span>
<span>75%</span>
:::
::: {.progress}
<div class="progress-bar" style="width: 75%;"></div>
:::
:::
```

**Feature Boxes**:

```markdown
::: {.feature-box}
::: {.feature-icon}
<i class="fas fa-rocket"></i>
:::
::: {.feature-content}
### Title
Description
:::
:::
```

**Tabs (Panel Sets)**:

```markdown
::: {.panel-tabset}
## Tab 1
Content 1

## Tab 2
Content 2
:::
```

**Accordions**:

```markdown
::: {.accordion}
::: {.accordion-item}
::: {.accordion-header}
Click to expand
:::
::: {.accordion-body}
Hidden content
:::
:::
:::
```

**Chapter Navigation**:

```markdown
::: {.chapter-nav}
::: {.chapter-nav-item .chapter-nav-prev}
::: {.chapter-nav-label}
Previous
:::
::: {.chapter-nav-title}
Chapter Title
:::
:::
:::
```

**Always close divs properly**: `:::` must match opening `:::`

## Code Style & Conventions

### Markdown/Quarto Files

- Use ATX-style headers (`#` not `===`)
- Leave blank line before and after code blocks
- Use fenced code blocks with language tags
- Reference images with relative paths from file location
- Wrap lines at 80-100 characters (where practical)

### YAML Frontmatter

Required fields for chapters:

```yaml
---
title: "Chapter Title"
subtitle: "Optional subtitle"
author: "{{< meta author >}}"
date: last-modified
date-format: "DD/MM/YYYY"
description: "Brief description for SEO"
categories: [tag1, tag2]
---
```

### Component Nesting Rules

- Always close Quarto divs properly: `:::` must match opening `:::`
- Callouts can contain markdown, code, tables
- Cards can contain callouts and other components
- Don't nest panel-tabsets inside callouts
- Feature boxes should not contain other feature boxes

## File Naming Conventions

- **Chapters**: lowercase with hyphens (`my-chapter-title/index.qmd`)
- **Exercises**: `exercise-` prefix or session-based (`sesion-01-analisis-prompts.qmd`)
- **Resources**: descriptive names (`dataset-rnaseq.csv`)
- **No spaces** in filenames
- Use `.qmd` extension for Quarto files

## Navigation Updates

When adding new pages, update `_quarto.yml`:

**Navbar** (top navigation):

```yaml
navbar:
  left:
    - text: "Menu Item"
      menu:
        - text: "Page Title"
          href: path/to/file.qmd
```

**Sidebar** (left navigation):

```yaml
sidebar:
  contents:
    - section: "Section Name"
      contents:
        - text: "Page Title"
          href: path/to/file.qmd
```

## Testing Before Commit

1. Run `quarto preview` and check all pages load
2. Test dark mode toggle works
3. Check responsive design (resize browser window)
4. Verify all internal links work
5. Check code blocks render correctly
6. Test accordions and collapsible elements
7. Verify images display properly

## Common Gotchas

- **Indentation matters** in Quarto divs - use consistent spacing (3 spaces per level)
- **Images need alt text** for accessibility: `![Alt text](path)`
- **External links** automatically open in new tabs in Quarto
- **Custom CSS goes in SCSS files**, not directly in CSS
- **Preview server caches** - restart if changes don't appear: `Ctrl+C` then `quarto preview`
- **Font Awesome icons** require proper class: `<i class="fas fa-icon-name"></i>`
- **Callout titles** use `##` after opening `:::`
- **Spacing around divs** - always leave blank lines before and after `:::`

## Output Directory

- **Generated site**: `_site/` (git-ignored, auto-generated on render)
- **DO NOT edit files** in `_site/` - they're overwritten on each render
- **Only edit source files**: `*.qmd`, `*.yml`, `*.scss`, `*.js`

## Deployment

### GitHub Pages

1. Push to GitHub
2. Enable Pages in Settings → Pages
3. Set up GitHub Actions with:

```yaml
# .github/workflows/publish.yml
name: Publish Quarto Site
on:
  push:
    branches: main
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: quarto-dev/quarto-actions/setup@v2
      - uses: quarto-dev/quarto-actions/render@v2
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

### Netlify

- Build command: `quarto render`
- Publish directory: `_site`

### Manual

```bash
quarto render
# Upload contents of _site/ to web server
```

## Accessibility Requirements

- **All images** must have alt text
- **Maintain heading hierarchy** (don't skip levels: h1 → h2 → h3)
- **Use semantic HTML/Markdown**
- **Ensure color contrast** meets WCAG AA standards
- **Test keyboard navigation** (Tab, Enter, Esc keys)
- **Screen reader friendly** - use proper ARIA labels

## Security Notes

- **DO NOT commit** sensitive data to repo
- Keep `.gitignore` up to date
- External links open in new tab automatically
- **No inline scripts** in markdown files for security

## Quarto-Specific Tips

- Use `{{< meta variable >}}` to reference metadata
- Cross-references: `@fig-label`, `@tbl-label`
- Code folding: `#| code-fold: true` in code chunk
- Code filename: `#| filename: "script.py"`
- Figure captions: `#| fig-cap: "Caption text"`
- Collapsible callouts: `collapse="true"` in callout div

## Session 1 Content Structure

The Sesión 1 content demonstrates best practices:

- **Main chapter** (`index.qmd`): Overview and introduction
- **Subcapters**: Detailed topics (prompting-cientifico.qmd, patrones-avanzados.qmd)
- **Support pages**: Glosario (glossary), Recursos (resources)
- **Exercises**: Separate file in `exercises/` folder
- **Navigation**: Hierarchical structure in sidebar
- **Components**: Extensive use of callouts, feature boxes, cards, accordions

This structure can be replicated for additional sessions.

## Font Awesome Icons

Available via CDN (already included):

```html
<i class="fas fa-icon-name"></i>  <!-- Solid -->
<i class="far fa-icon-name"></i>  <!-- Regular -->
<i class="fab fa-icon-name"></i>  <!-- Brands -->
```

Browse icons: https://fontawesome.com/icons

## Variables System

Global variables in `_variables.yml` can be referenced as:

```markdown
{{< meta author >}}
{{< meta email >}}
{{< meta project.name >}}
```

## Troubleshooting

**Changes not appearing?**
- Restart preview server
- Clear browser cache
- Check console for errors

**Navigation not working?**
- Verify file paths in `_quarto.yml`
- Check for typos in href values
- Ensure files exist at specified paths

**Components not rendering?**
- Check div closing (`:::`)
- Verify proper indentation
- Look for missing blank lines

**Styles not applying?**
- SCSS files need `quarto render` to compile
- Check browser dev tools for CSS errors
- Verify class names match component library

## Getting Help

- **Quarto Docs**: https://quarto.org/docs/
- **Component Reference**: `components/component-examples.qmd`
- **Template Examples**: `chapters/example-chapter-*/`
- **Issue Tracker**: GitHub issues for this repo

---

This template follows best practices for educational content with Quarto. Maintain this structure when adding new content for consistency and maintainability.

