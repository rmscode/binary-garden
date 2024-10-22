# Git

## Recover a Dropped Stash

Eventually, we all learn the hard way that we should never stash changes we can't afford to lose.

Run the following command to list all dangling commits (every lost commit, including every stash commit ever created):

```powershell title="PowerShell
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
This will launch a repository browser showing you *every single commit* in the repository ever, regardless of whether it is reachable or not.

To spot stash commits, look for commit messages like this:

`WIP on somebranch: commithash Some old commit message`

!!! note "The commit message will only be in this form (starting with "WIP on") if you did not supply a message when you did git stash."

Once you know the hash, you can apply it as a stash:

```
git stash apply $stash_hash
```

[*Reference*](https://stackoverflow.com/a/91795/18121690)
