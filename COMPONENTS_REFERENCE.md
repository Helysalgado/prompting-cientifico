# Components Quick Reference

Quick copy-paste reference for all available UI components.

## Callouts

```markdown
::: {.callout-note}
## Title
Content here
:::
```

**Variants**: `note`, `tip`, `warning`, `important`, `caution`

**Collapsible**: Add `collapse="true"`

## Cards

```markdown
::: {.card}
::: {.card-header}
Header
:::
::: {.card-body}
Content
:::
::: {.card-footer}
Footer
:::
:::
```

**Variants**: Add `.card-primary`, `.card-success`, `.card-warning`, `.card-danger`, `.card-info`

## Card Grid

```markdown
::: {.card-grid}

::: {.card}
::: {.card-body}
Card 1
:::
:::

::: {.card}
::: {.card-body}
Card 2
:::
:::

:::
```

## Tabs

```markdown
::: {.panel-tabset}

## Tab 1
Content 1

## Tab 2
Content 2

:::
```

## Learning Objectives

```markdown
::: {.learning-objectives}
### Learning Objectives

- Objective 1
- Objective 2
:::
```

## Exercise Box

```markdown
::: {.exercise-box}
### Exercise Title

Task description and instructions
:::
```

## Progress Bar

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

**Variants**: `.progress-bar-success`, `.progress-bar-warning`, `.progress-bar-danger`

## Alerts

```markdown
::: {.alert .alert-success}
Success message!
:::
```

**Variants**: `alert-success`, `alert-info`, `alert-warning`, `alert-danger`

## Feature Box

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

## Timeline

```markdown
::: {.timeline}

::: {.timeline-item}
::: {.timeline-marker}
:::
::: {.timeline-content}
::: {.timeline-date}
Week 1
:::
::: {.timeline-title}
Title
:::
Content
:::
:::

:::
```

## Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
```

## Buttons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
```

## Accordion

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

## Chapter Navigation

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

::: {.chapter-nav-item .chapter-nav-next}
::: {.chapter-nav-label}
Next
:::
::: {.chapter-nav-title}
Chapter Title
:::
:::

:::
```

## Code Blocks

### Basic

````markdown
```python
print("Hello, World!")
```
````

### With Filename

````markdown
```python
#| filename: "script.py"

print("Hello!")
```
````

### Collapsible

````markdown
```python
#| code-fold: true
#| code-summary: "Show code"

# Hidden by default
```
````

## Font Awesome Icons

```html
<i class="fas fa-rocket"></i>        <!-- Solid -->
<i class="far fa-star"></i>          <!-- Regular -->
<i class="fab fa-github"></i>        <!-- Brands -->
```

[Browse all icons](https://fontawesome.com/icons)

## Styled Lists

### Checkmarks

```html
<ul class="styled-list">
<li>Item with checkmark</li>
<li>Another item</li>
</ul>
```

### Numbered Circles

```html
<ol class="styled-list">
<li>First item</li>
<li>Second item</li>
</ol>
```

## Utility Classes

### Text Alignment
```html
<div class="text-center">Centered</div>
<div class="text-right">Right</div>
<div class="text-left">Left</div>
```

### Spacing
```html
<div class="mt-1">Small top margin</div>
<div class="mb-2">Medium bottom margin</div>
<div class="p-3">Large padding</div>
```

### Borders
```html
<div class="rounded">Rounded corners</div>
<div class="rounded-lg">Large rounded corners</div>
<div class="rounded-full">Fully rounded</div>
```

### Shadows
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
```

## Tips

- **Combine components**: Nest components for rich layouts
- **Use variables**: Reference `{{< meta variable >}}` for dynamic content
- **Stay consistent**: Use the same components throughout
- **Test responsive**: Check on different screen sizes
- **Check accessibility**: Ensure keyboard navigation works

---

For detailed examples, see [Component Library](components/component-examples.qmd)

