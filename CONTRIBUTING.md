# Contributing to Quarto Course Template

Thank you for your interest in contributing! 🎉

This document provides guidelines for contributing to this project. By participating, you agree to maintain a respectful and collaborative environment.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

### Our Pledge

We pledge to make participation in this project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, or sexual identity and orientation

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**

- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:

1. **Check the documentation** to see if the issue is already addressed
2. **Search existing issues** to avoid duplicates
3. **Try the latest version** to see if it's already fixed

When submitting a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Quarto version, browser)
- **Error messages or logs**

**Template:**

```markdown
**Describe the bug**
A clear and concise description.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS 13.0]
- Quarto Version: [e.g., 1.3.0]
- Browser: [e.g., Chrome 119]

**Additional context**
Any other relevant information.
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

1. **Check existing feature requests** first
2. **Provide clear use cases**
3. **Explain the benefits**
4. **Consider implementation complexity**

**Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or references.
```

### Improving Documentation

Documentation improvements are always valuable:

- Fix typos or grammatical errors
- Clarify confusing sections
- Add missing information
- Improve examples
- Translate content

### Contributing Code

#### Types of Contributions

1. **Bug Fixes**: Resolve existing issues
2. **New Features**: Add functionality
3. **Components**: Create new UI components
4. **Templates**: Design content templates
5. **Styles**: Enhance CSS/design
6. **Scripts**: Improve JavaScript functionality

## Development Setup

### Prerequisites

- [Quarto](https://quarto.org/docs/get-started/) v1.3+
- [Git](https://git-scm.com/downloads)
- A text editor (VS Code, RStudio, etc.)
- Basic knowledge of:
  - Markdown/Quarto
  - CSS/SCSS
  - JavaScript (for interactive features)

### Setup Steps

1. **Fork the repository**

   Click the "Fork" button on GitHub.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/quarto-course-template.git
   cd quarto-course-template
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/original/quarto-course-template.git
   ```

4. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

5. **Make your changes**

   Edit files, test locally.

6. **Preview changes**

   ```bash
   quarto preview
   ```

7. **Test thoroughly**

   - Check all pages render correctly
   - Test responsive design (mobile, tablet, desktop)
   - Verify dark mode works
   - Test accessibility (keyboard navigation, screen readers)
   - Check browser compatibility

## Style Guidelines

### Markdown/Quarto

- Use ATX-style headers (`#` not `===`)
- Leave blank lines between sections
- Use fenced code blocks with language tags
- Wrap lines at 80-100 characters (where practical)
- Use relative links for internal references

**Example:**

```markdown
## Section Title

Paragraph text that explains the concept clearly.

### Subsection

More detailed information.

```python
# Code example
def example():
    return "Hello"
```
```

### CSS

- Use 2 spaces for indentation
- Use meaningful class names (BEM methodology preferred)
- Add comments for complex styles
- Group related properties
- Use CSS variables for values used multiple times

**Example:**

```css
/* Component: Card */
.card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: var(--space-lg);
  margin: var(--space-md) 0;
  
  /* Appearance */
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### JavaScript

- Use modern ES6+ syntax
- Add JSDoc comments for functions
- Use meaningful variable names
- Handle errors gracefully
- Prefer `const` over `let`, avoid `var`

**Example:**

```javascript
/**
 * Calculate reading time for article content
 * @param {string} text - The text to analyze
 * @returns {number} Estimated reading time in minutes
 */
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

### File Naming

- Use lowercase with hyphens: `my-new-chapter.qmd`
- Be descriptive: `exercise-data-analysis.qmd` not `ex1.qmd`
- Use consistent prefixes for related files
- Avoid spaces and special characters

### Accessibility

- Provide alt text for all images
- Use semantic HTML/Markdown
- Maintain proper heading hierarchy
- Ensure sufficient color contrast
- Test with keyboard navigation
- Test with screen readers

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc (not CSS)
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI configuration changes

### Examples

```bash
feat(components): add progress bar component

Add a customizable progress bar component with variants
for success, warning, and danger states.

Closes #42
```

```bash
fix(css): correct dark mode color contrast

Improve text readability in dark mode by adjusting
color values to meet WCAG AA standards.

Fixes #89
```

```bash
docs(readme): update installation instructions

Clarify prerequisites and add troubleshooting section
for common installation issues.
```

### Guidelines

- Use imperative mood: "add" not "added"
- Don't capitalize first letter of subject
- No period at end of subject
- Limit subject line to 50 characters
- Wrap body at 72 characters
- Explain *what* and *why*, not *how*
- Reference issues and PRs in footer

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** if applicable
3. **Run linters** and fix issues
4. **Preview locally** and verify changes
5. **Update CHANGELOG** if significant
6. **Rebase on latest main** to resolve conflicts

### Submitting

1. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open Pull Request** on GitHub

3. **Fill out the template**

   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Style/refactoring
   - [ ] Performance improvement
   
   ## Testing
   How you tested your changes
   
   ## Screenshots
   If applicable
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-reviewed my code
   - [ ] Commented complex code
   - [ ] Updated documentation
   - [ ] No new warnings
   - [ ] Added tests (if applicable)
   - [ ] All tests pass
   - [ ] Checked accessibility
   ```

4. **Respond to feedback**

   - Address review comments
   - Make requested changes
   - Ask questions if unclear

### Review Process

- **Automated checks** must pass
- **At least one approval** required
- **No unresolved conversations**
- **Up-to-date with main branch**

### After Merge

- **Delete your branch** (on GitHub)
- **Update your local repo**

   ```bash
   git checkout main
   git pull upstream main
   ```

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code contributions and reviews

### Getting Help

- Check the [documentation](README.md)
- Search [existing issues](../../issues)
- Ask in [discussions](../../discussions)
- Tag maintainers if urgent

### Recognition

Contributors are recognized in:

- README acknowledgments
- Release notes
- GitHub contributors page

## Questions?

Don't hesitate to ask! Open an issue with the `question` label or start a discussion.

---

Thank you for contributing! 🙏

Your efforts help make this template better for everyone.

