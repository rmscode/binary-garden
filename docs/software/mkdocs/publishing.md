---
status: new
---

# MkDocs: Publishing Your Site

The site that MkDocs builds only uses static files so you can host it from pretty much anywhere. Simply upload the contents of the entire `site` directory to wherever you're hosting your website and you're done. Alternatively, you can deploy your site to [GitHub Pages](https://pages.github.com/). Thats the great thing about hosting project documentation in a `git` repository -- the ability to deploy the latest version automatically when new changes are pushed.

## GitHub Pages

If you already have your project hosted on GitHub, [GitHub Pages](https://pages.github.com/) is without a doubt the easiest way to publish your documentation . . . and it's free. 

### Manually with MkDocs

If you prefer to deploy manually (*why?*), you can just invoke the following command from the directory where you project's `mkdocs.yml` file lives:

```sh
mkdocs gh-deploy --force
```

This will deploy your docs to a new branch called `gh-pages`. Check out [this overview](https://www.mkdocs.org/user-guide/deploying-your-docs/#project-pages) for more information.

!!! warning

    Never edit the files in your pages repository by hadn if you're using `gh-deploy` because you will lose you work the next time you run the command. 

    If there are any untracked files or uncommitted work in the local repository where `mkdocs gh-deploy` is run, these will be included in the pages that are deployed.

### Automated with GitHub Actions

Using [GitHub Actions](https://github.com/features/actions) you can automate the deployment of your documentation. At the root of your repository, create a new GitHub Actions workflow, e.g. `.github/workflows/ci.yml`, and copy/paste the following contents:

``` yaml
name: mydocs-gh-pages-deploy # (1)!
on:
    push:
    branches:
        - master # (2)!
        - main
permissions:
    contents: write
jobs:
    deploy:
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v4
        - name: Configure Git Credentials
        run: |
            git config user.name github-actions[bot]
            git config user.email 41898282+github-actions[bot]@users.noreply.github.com
        - uses: actions/setup-python@v5
        with:
            python-version: 3.x
        - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV # (3)!
        - uses: actions/cache@v4
        with:
            key: mkdocs-material-${{ env.cache_id }}
            path: .cache
            restore-keys: |
            mkdocs-material-
        - run: pip install mkdocs-material # (4)!
        - run: mkdocs gh-deploy --force
```

1.  You can change the name to your liking.

2.  At some point, GitHub renamed `master` to `main`. If your default branch
    is named `master`, you can safely remove `main`, vice versa.

3.  Store the `cache_id` environmental variable to access it later during cache
    `key` creation. The name is case-sensitive, so be sure to align it with `${{ env.cache_id }}`.

    - The `--utc` option makes sure that each workflow runner uses the same time zone.
    - The `%V` format assures a cache update once a week.
    - You can change the format to `%F` to have daily cache updates.

    You can read the [manual page] to learn more about the formatting options of the `date` command.

4.  This is the place to install further [MkDocs plugins] or Markdown
    extensions with `pip` to be used during the build:

    ``` sh
    pip install \
        mkdocs-material \
        mkdocs-awesome-pages-plugin \
        ...
    ```

Now, every time a new commit is pushed to either the `master` or `main` branches, MkDocs will automatically build the static site and deploy it to GitHub Pages. Your documentation should appear at `https://<username>.github.io/<repository>` within a few minutes.

!!! info "If the GitHub Page doesn't show up after a few minutes, go to the settings of your repository and ensure that [the publishing source branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for your GitHub Page is set to gh-pages."

## Deploying to a Local Network Share

In addition to GitHub Pages, I publish my docs to a local network share. Below is a little PowerShell function I wrote to make that process easier. Just copy and paste it into your PowerShell profile and update the paths to match your environment.

!!! tip "You can find your PowerShell profile by running `$PROFILE` in a PowerShell console."

```powershell
# Update-MyDocs
function Update-MyDocs {
    $currentDir = Get-Location
    $targetDir = "<Path to the root of your documentation>" # (1)!

    if ($currentDir -ne $targetDir) {
        Set-Location -Path $targetDir
    }

    mkdocs build
    Robocopy "<Path to the 'site' directory in your documentation folder>" "<Path to the network location>" /mir # (2)!

    # Change back to the original directory
    Set-Location -Path $currentDir
}
```

1.  For example, mine looks like this:
    `C:\Users\rmscode\Repositories\MyDocs\`
2.  For example, mine looks like this:
    `"C:\Users\rmscode\Repositories\MyDocs\site\" "\\file001\shared\users\Ricky\MyDocs\site\"`

Now, whenever I want to update documentation locally, I just open a PowerShell console and run `Update-MyDocs`. The function will build the site and copy the files to the network share.