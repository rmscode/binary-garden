---
status: new
---

# MkDocs: Creating your site

Now that you have [installed](./getting-started.md) MkDocs, you can bootstrap your documentation site using the `mkdocs` executable. Navigate to the directory where you would like to create your site and run:

```
mkdocs new .
```

Alternatively, you can specify a directory name and MkDocs will create it for you:

```
mkdocs new my-project
```

The following project structure will be created:

```
.
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

There is single configuration file named `mkdocs.yml`, and a folder called `docs` that will contain your documentation source files.

## Configuration (Minimal)

!!! info 

    For a more in-depth guide on configuration, visit the official documentation for [MkDocs](https://www.mkdocs.org/user-guide/configuration/) and [Material](https://squidfunk.github.io/mkdocs-material/creating-your-site/#advanced-configuration).

Open `mkdocs.yml` in your favorite text editor, set the `site_name` and add the following lines (highlighted) to enable the theme:

```yaml hl_lines="3-4"
site_name: MyDocs
site_url: https://mydomain.org/mydocs
theme:
  name: material
```

## Adding pages

Add new pages to your site by creating Markdown files in the `docs` directory. You can also create subdirectories to organize your content. 

As you add content to MkDocs, you'll want to update the `nav` settings in `mkdocs.yml` to reflect your site structure. Here's an example:

```yaml
nav:
  - Home: index.md
  - Toast:
    - Buttered: toast/buttered.md
    - Jammed: toast/jammed.md
  - About: about.md
```

!!! tip "Tip: Reviewing as you write"

    MkDocs comes with a built-in dev-server that supports auto-reloading. To start the server, run:

    ```sh
    mkdocs serve # (1)!
    ```

    1. If you have a large documentation project, it might take minutes until MkDocs has rebuilt all pages for you to preview. If you're only interested in the current page, the --dirtyreload flag will make rebuilds much faster: `mkdocs serve --dirtyreload`.

## Building your site

When you're finished editing, you can build a static site from your Markdown source files with:

```
mkdocs build
```

This will create a new directory called `site` and if you take a peak inside you'll see the HTML files that make up your project. You can deploy this directory to your web server or use a service like [GitHub Pages](https://pages.github.com/) to host your site. I cover that next in [Publishing Your Site](./publishing.md).

!!! tip 

    If you're using source control such as `git`, you probably don't want to check your site builds into the repository. Add `site/` to your `.gitignore` file.