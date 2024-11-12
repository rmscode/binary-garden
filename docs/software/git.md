# Git

A version control system written by Linus Torvalds.

For a quick reference of common commands, see the [Git Cheat Sheet](../general/cheat-sheets/git-cheat-sheet.md).

---

## Gitting Out of Trouble

### Recover a Dropped Stash

!!! note

    Eventually, we all learn the hard way that we should never stash changes we can't afford to lose. Save yourself from future headaches and get in the habit of using `apply` instead of `pop`. Better yet, just create temporary branches for your work...even the small stuff.

Run the following command to list all dangling commits (every lost commit, including every stash commit ever created):

```powershell title="PowerShell"
git fsck --no-reflog | select-string 'dangling commit' | foreach { $_.ToString().Split(" ")[2] }
```

```shell title="Linux"
git fsck --no-reflog | awk '/dangling commit/ {print $3}'
```

Pass this to `gitk` to make the stash easier to find:

```powershell title="PowerShell"
gitk --all $(git fsck --no-reflog | Select-String "(dangling commit )(.*)" | %{ $_.Line.Split(' ')[2] })
```

```shell title="Linux"
gitk --all $( git fsck --no-reflog | awk '/dangling commit/ {print $3}' )
```
This will launch a repository browser showing you *every single commit ever made in the repository*, regardless of whether it is reachable or not.

To spot stash commits, look for commit messages like this:

`WIP on somebranch: commithash Some old commit message`

!!! info "The commit message will only be in this form (starting with "WIP on") if you did not supply a message when you did `git stash`."

Once you know the hash, you can apply it as a stash:

```
git stash apply $stash_hash
```

[*Reference*](https://stackoverflow.com/a/91795/18121690)

### Amend Last Commit

Have you ever made a commit and then immediately realized you forgot to add a file or made a typo/formatting error? You can amend the last commit to include the changes you forgot with the following commands.

!!! warning

    Do not amend commits that have already been pushed to a public/shared branch. Only amend commits that exist in your local copy unless you want to have a bad time. 

```shell
git add . # or add individual files
git commit --amend --no-edit
```

??? note "Here's an amusing flowchart"

    This gives the correct recommendation for both the original issue (amend last commit) and for the question "What if it weren't the last commit?".

    [!flowchart](../assets/amend-commit.png)

### Change the Message of the Last Commit

Run this command and follow the prompts to change the commit message.

```shell
got commit --amend
```

### Move Last Commit to New Branch

As long as you haven't already pushed the commit to a public/shared branch and you haven't made any other commits on the wrong branch, you can move the commit to the correct branch pretty easily.

```shell
git branch new-branch-name
git reset HEAD~ --hard
git checkout new-branch-name
```

### Move Last Commit to a Different Branch

```shell
git checkout correct-branch-name
git cherry-pick master # or whatever branch the commit is  currently on
git checkout master
git reset HEAD~ --hard
```

### Undo Commit From the Past

Use the arrow keys to scroll up and down in history to find the commit and copy its hash.

```shell
git log
git revert $saved_hash
```

### Abort a Merge With Conflicts

If you're met with conflicts that need to be resolved before you can continue, but you're not ready to resolve them just yet, you can abort the merge and try again later.

```shell
git merge --abort
```
