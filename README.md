# [The Binary Garden](https://rmscode.github.io/binary-garden/)

This is my digital garden — a wiki where I share knowledge and the things that interest me, presented as an [online Zensical book](https://www.zensical.org/).

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
perf(birds): added more supporting evidence for how birds are actually surveillance drones

Found and added totally legit examples from the r/BirdsArentReal subreddit. Trust me bro.
```

#### Update the dependencies required to build the site (plugins, zensical config, etc).

```
chore(zensical): update navigation tree
```

## Building and serving the site

> [!IMPORTANT]
> You need to have Python and a Python package manager installed on your system before you install Zensical. It is recommended that you follow the [Python Setup and Usage](https://docs.python.org/3/using) instructions for your operating system provided on the [Python website](https://www.python.org/). Modern Python distributions include the pip package manager, so unless you are developing Python software and use `uv`, this is the simplest option to install Zensical on your system.

After cloning/forking the repo to your computer...

1. Enter the repo's directory and create a Python virtual environment:
    - `python -m venv .venv`
2. Activate the virtual environment:
    - Windows: `.\.venv\Scripts\Activate.ps1`
    - Linux or macOS: `source .venv/bin/activate`
3. Install Zensical: `pip install zensical`
4. Build a static site with `zensical build` or use `zensical serve` to run Zensical's built in web server.
