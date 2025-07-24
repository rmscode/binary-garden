# [The Binary Garden](https://rmscode.github.io/binary-garden/)

This is my digital garden — a wiki where I share knowledge, primarily within the scope of computers and technology (I work in IT), presented as an [online MkDocs book](https://www.mkdocs.org/).

*It is best experienced in the [web format](https://rmscode.github.io/binary-garden/), or you can [build it yourself](#building-and-serving-the-site).*

## Contributing

Contributions are welcome when errors or improvements are identified. Click the **edit** button at the top right of any page to propose changes via a pull request. Alternatively, you can open an [issue](https://github.com/rmscode/binary-garden/issues/new) for me to review.

### Guidelines

I follow [Angular's commit message guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) and encourage you to do the same.

```
{type_of_change}({file_changed}): {short_description}

{full_description}
```

> **Note**: Omit the file extension. For example, if you are editing `README.md`, use `README` in the commit message.

#### Correcting existing content:

```
fix(cats): removed inaccurate statement about cats having souls

Cats do not have souls. They are soulless, evil creatures.
```

#### Correct grammar, spelling or broken links:

```
style(dogs): fixed broken links to external dog wiki

An incorrect link was pasted in the dogs.md file multiple times. Fixed all occurrences.
```

#### Improving existing content:

```
perf(birds): added more examples of how birds are actually surveillance drones

Found and added totally legit examples from the BirdsArentReal subreddit. Trust me bro.
```

#### Update the dependencies required to build the site (plugins, mkdocs config, etc).

```
chore(mkdocs): update page tree
```

## Building and serving the site

To build this MkDocs site yourself:

1. Create a Python virtual environment:
    - `python -m venv .venv`
2. Activate the virtual environment:
    - Windows: `.\.venv\Scripts\Activate.ps1`
    - Linux or macOS: `source .venv/Scripts/activate`
3. Install the requirements: `pip install -r requirements.txt`
4. Build a static site with `mkdocs build` or use `mkdocs serve` to serve the site locally.