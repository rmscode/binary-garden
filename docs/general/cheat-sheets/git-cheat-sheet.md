# Git Cheat Sheet

## Setup

!!! info "Configuring user information used across all local repositories"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git config --global user.name "[name]"`           | set a name that is identifiable for credit when review version history
| `git config --global user.email "[email address]"` | set an email address that will be associated with each history marker
| `git config --global color.ui auto`                | set automatic command line coloring for Git for easy reviewing

## Setup & Init

!!! info "Configuring user information, initializing and cloning repositories"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git init`                                         | initialize an existing directory as a Git repository
| `git clone [url]`                                  | retrieve an entire repository from a hosted location via URL

## Stage and Snapshot

!!! info "Working with snapshots and the Git staging area"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git status`                                       | show modified files in working directory, staged for your next commit
| `git add [file]`                                   | add a file as it looks now to your next commit (stage)
| `git reset [file]`                                 | unstage a file while retaining the changes in working directory
| `git diff`                                         | diff of what is changed but not staged
| `git diff --staged`                                | diff of what is staged but not yet committed
| `git commit -m "[descriptive message]"`            | commit your staged content as a new commit snapshot

## Branches & Merge

!!! info "Isolating work in branches, changing context, and integrating changes"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git branch`                                       | list your branches. a `*` will appear next to the currently active branch
| `git branch [branch-name]`                         | create a new branch at the current commit
| `git checkout`                                     | switch to another branch and check it out into your working directory
| `git merge [branch]`                               | merge the specified branch’s history into the current one
| `git log`                                          | show all commits in the current branch’s history

## Inspect & Compare

!!! info "Examining logs, diffs and object information"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git log`                                          | show the commit history for the currently active branch
| `git log branchB..branchA`                         | show the commits on branchA that are not on branchB
| `git log --follow [file]`                          | show the commits that changed file, even across renames
| `git show [SHA]`                                   | show any object in Git in human-readable format

## Tracking Path Changes

!!! info "Versioning file removes and path changes"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git rm [file]`                                    | delete the file from project and stage the removal for commit
| `git mv [existing-path] [new-path]`                | change an existing file path and stage the move
| `git log --stat -M`                                | show all commit logs with indication of any paths that moved

## Ignoring Patterns

!!! info "Preventing unintentional staging or committing of files"

Save a file with desired patterns as .gitignore with either direct string matches or wildcard globs.

For example:

```txt
logs/
*.notes
pattern*/
```

```bash
# system wide ignore pattern for all local repositories
git config --global core.excludesfile [file]
```
## Share & Update

!!! info "Retrieving updates from another repository and updating local repos"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git remote add [alias] [url]`                     | add a git URL as an alias
| `git fetch [alias]`                                | fetch down all the branches from that Git remote
| `git merge [alias]/[branch]`                       | merge a remote branch into your current branch to bring it up to date
| `git push -u origin [branch]`                      | publish your local branch to the remote repository (`-u` is short for `--set-upstream`)
| `git push [alias] [branch]`                        | transmit local branch commits to the remote repository branch
| `git pull`                                         | fetch and merge any commits from the tracking remote branch

## Rewrite History

!!! info "Rewriting branches, updating commits and clearing history"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git rebase [branch]`                              | apply any commits of current branch ahead of specified one
| `git reset --hard [commit]`                        | clear staging area, rewrite working tree from specified commit

## Temporary Commits

!!! info "Temporarily store modified, tracked files in order to chnage branches"

| Command                                            | Description
| -------------------------------------------------- | -----------
| `git stash`                                        | save modified and staged changes
| `git stash save [description]`                     | save modified and staged changes with a unique description/name
| `git stash list`                                   | list stack-order of stashed file changes
| `git stash pop`                                    | write working from top of stash stack and then discard that stash
| `git stash apply`                                  | write working from top of stash stack and keep that stash for possible reuse later
| `git stash drop`                                   | discard the changes from top of stash stack
| `git stash drop [n]`                               | discard the changes from the nth stash in the stack

!!! note "Using `git stash drop [n]` will *change* the `stash@{n}` designations of all stashes further down the stack."
