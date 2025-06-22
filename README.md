# Personal Portfolio Website for TryroT136

This repository contains the source code for my personal portfolio website, hosted on GitHub Pages at [tryrot136.github.io](https://tryrot136.github.io).

The site is built with pure HTML and CSS, and powered by two vanilla JavaScript files that dynamically load a shared header and generate project cards. This makes site-wide updates and adding new projects simple and efficient.

## File Structure

-   **`index.html`**: The main homepage, featuring a hero section and some featured projects.
-   **`/pages/*.html`**: All other pages, such as `minecraft.html`, `python.html`, `links.html`, `examples.html`, etc.
-   **`header.html`**: A single HTML file that defines the entire header and navigation bar. **This is the single source of truth for navigation.**
-   **`style.css`**: Contains all styling for the website, including layout, colors, and animations.
-   **`loader.js`**: A script that fetches the content of `header.html` and injects it into every page. It also handles setting the "active" link and disabling the search bar.
-   **`main.js`**: The main script that finds all custom `<project-card>` elements on a page and dynamically converts them into styled HTML cards. It also powers the live search feature.
-   **`/assets/`**: A folder for storing images and other assets, like `modrinth.svg`.

## How It Works: Dynamic Content

The site uses two key JavaScript-powered systems:

1.  **Shared Header**: On page load, `loader.js` finds the `<header data-include="header.html"></header>` tag, fetches the content of `header.html`, and places it inside. This means you only ever need to edit `header.html` to update the navigation on all pages.

2.  **Project Card Generator**: After the header is loaded, `main.js` scans the page for any `<project-card>` elements and builds the styled HTML for them based on their attributes. This lets you define complex projects with simple, readable tags.

## How to Manage Your Website

### How to Add or Edit a Project

This is the most common task. You do not need to write complex HTML.

1.  Open the appropriate project page (e.g., `python.html`).
2.  Find the `<div id="project-container">`.
3.  Add a new `<project-card>` element using the template below.

#### Project Card Template:
```html
<project-card
  name="Your Project Name"
  icon-type="fa-solid fa-rocket"
  buttons='[
    {"text": "Live Demo", "href": "https://example.com"},
    {"text": "View Source", "href": "https://github.com/your-repo"}
  ]'>
  This is the project description. It can be multiple lines long. You can use <code>code</code> tags here for inline code.
</project-card>
```

#### Project Card Attribute Reference:
-   **`name="..."`** (Required): The title of the project.
-   **`icon-type="..."`** (Optional): Specifies the icon.
    -   **Directly:** You can use any Font Awesome class name (e.g., `icon-type="fa-brands fa-itch-io"`).
    -   **By Preset:** You can use a shorthand from the map in `main.js` (e.g., `minecraft`, `python`, `config`).
-   **`image-src="..."`** (Optional): A URL to an image. **This will always override the `icon-type`**.
-   **`buttons='[...]'`** (Optional): A JSON array of button objects.
    -   Each object needs a `text` and `href`.
    -   **Automatic Styling**: The first button is primary, all others are secondary.
    -   **Manual Override**: Force a style with `"secondary": true` or `"secondary": false`.
-   **Description**: The text between the `<project-card>` tags becomes the description.

### How to Add a New Project Page

1.  Create a new HTML file (e.g., `new-category.html`). Use an existing project page as a template.
2.  Update the `<title>` and `<section class="hero">` content.
3.  Populate the `<div id="project-container">` with your new project cards.
4.  Open **`header.html`** and add a new link to your page inside the `<div class="dropdown-content">`.

### How to Edit the Navigation Bar

To add, remove, or reorder links in the header, edit **`header.html`** directly. The changes will automatically apply to all pages.

### How to Disable the Search Bar on a Page

On any HTML page, you can disable the search bar by adding `data-search-disabled="true"` to the header placeholder.

```html
<!-- This header will have no search bar -->
<header data-include="header.html" data-search-disabled="true"></header>

<!-- This header will have a search bar -->
<header data-include="header.html"></header>
```

### How to Organize a Project Page

Inside the `<div id="project-container">`, you can use `<hr>` tags to create visual separators and `<h2 class="showcase-header">Title</h2>` to create section titles, just like on the `examples.html` page.
