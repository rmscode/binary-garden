---
status: new
---

# MkDocs: Getting started

!!! info

    MkDocs is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Documentation source files are written in Markdown, and configured with a single YAML configuration file. My documentation for MkDocs is quick and dirty. For a more in-depth guide, check out the official [MkDocs documentation](https://www.mkdocs.org/getting-started/).

I use [Material](https://squidfunk.github.io/mkdocs-material) for MkDocs, so thats what I'll cover installing in this guide. It's a pretty slick theme that also extends the functionality of MkDocs by quite a bit. 

## Requirements

- A recent version of [Python](https://www.python.org/)
- Python package manager ([pip](https://pip.readthedocs.io/en/stable/installing/))

!!! note "I have sometimes found it necessary to type `python3` and `pip3` instead of `python` and `pip` on Linux systems. This is because some distributions still default to Python 2.7."

=== "Install on Linux"

    You can check if Python and pip are already installed by running the following commands:

    ```console
    $ python --version
    Python 3.8.2
    $ pip --version
    pip 20.0.2 from /usr/local/lib/python3.8/site-packages/pip (python 3.8)
    ```

    Install Python with your package manager of choice. I'm on Ubuntu (WSL) so I use `apt`:

    ```bash
    sudo apt update && sudo apt install -y python3
    ```

    Recent versions of Python come with pip pre-installed. However, you may need to upgrade pip to the latest version:

    ```bash
    pip install --upgrade pip
    ```

    If you need to install pip for the first time, download [get-pip.py](https://bootstrap.pypa.io/get-pip.py) (wget, curl, etc.) and run:

    ```bash
    python get-pip.py
    ```

=== "Install on Windows"

    You can check if Python and pip are already installed by running the following commands:

    ```powershell
    PS> python --version
    Python 3.12.3
    PS> pip --version
    pip 20.0.2 from C:\Python311\Lib\site-packages\pip (python 3.11)
    ```

    Install Python by downloading the installer from [python.org](https://www.python.org/downloads/) and running it.
    
    !!! note

        Make sure to check the box to add Python to your PATH during installation.

        ![Add Python to PATH](../../assets/win-py-install.png)

    The Python installer for Windows already comes with pip. However, you may need to upgrade pip to the latest version:

    ```powershell
    python -m pip install --upgrade pip
    ```

## Installing MkDocs and Material

!!! note

    If you decide later that you would like to use a different theme, you can. The `mkdocs-material` pip package is just a convenient bundle that includes both MkDocs and the Material theme.

=== "Install on Linux"

    Install with `pip`, ideally by using a [virtual environment](https://realpython.com/what-is-pip/#using-pip-in-a-python-virtual-environment):

    !!! abstract "Admittedly, I don't use `venv`, but you probably should :-)"

    ```bash
    pip install mkdocs-material
    ```

    This will automatically install compatible versions of all dependencies: [MkDocs](https://www.mkdocs.org/), [Markdown](https://python-markdown.github.io/), [Pygments](https://pygments.org/) and [Python Markdown Extensions](https://facelessuser.github.io/pymdown-extensions/).

    You should now have the mkdocs command line installed on your system. You can verify this by running:

    ```console
    $ mkdocs --version
    mkdocs, version 1.5.3 from /home/user/.local/lib/python3.10/site-packages/mkdocs (Python 3.10)
    ```

=== "Install on Windows"

    Install with `pip`, ideally by using a [virtual environment](https://realpython.com/what-is-pip/#using-pip-in-a-python-virtual-environment):

    !!! abstract "Admittedly, I don't use `venv`, but you should probably use it :-)"

    ```powershell
    python -m pip install mkdocs-material
    ```

    This will automatically install compatible versions of all dependencies: [MkDocs](https://www.mkdocs.org/), [Markdown](https://python-markdown.github.io/), [Pygments](https://pygments.org/) and [Python Markdown Extensions](https://facelessuser.github.io/pymdown-extensions/).

    You should now have the mkdocs command line installed on your system. You can verify this by running:

    ```powershell
    PS> mkdocs --version
    mkdocs, version 1.5.3 from C:\Users\user\AppData\Local\Programs\Python\Python312\Lib\site-packages\mkdocs (Python 3.12)
    ```

<div class="grid cards" markdown>

-   [__Next: Creating your site__ :octicons-arrow-right-24:](creating-site.md)

</div>