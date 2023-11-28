# Documentation & Notes

This static site made with [Material](https://squidfunk.github.io/mkdocs-material/) for [MkDocs](https://www.mkdocs.org).

## MkDocs Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs gh-deploy` - Deploy the documentation to GitHub Pages.
* `mkdocs -h` - Print help message and exit.

## Special Markdown

### Admonitions

Admonitions are special highlighted blocks for displaying information. The following are available: `note`, `abstract`, `info`, `tip`, `success`, `question`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`.

!!! example

    ```md
    !!! note

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
        nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
        massa, nec semper lorem quam in massa.
    ```

    !!! note

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
        nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
        massa, nec semper lorem quam in massa.

### Definition Lists

Adds the ability to add definition lists (more commonly known as description lists – dl in HTML) via Markdown to a document.

!!! example

    ```md
    `PEBKAC`

    :   Problem Exists Between Keyboard And Chair
    ```

    `PEBKAC`
    :   Problem Exists Between Keyboard And Chair
