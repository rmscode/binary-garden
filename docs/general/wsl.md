# Windows Subsystem for Linux (WSL)

## Accessing a Linux File System Format on Windows from WSL

If you find yourself needing to access the contents of a drive formatted in a Linux specific file system, but don't have immediate access to a computer running Linux, you can mount the media in WSL with this command - `sudo mount -t drvfs D: /mnt/d`.

`D:` being the drive letter assigned to the media in Windows and `/mnt/d` being the path you'd like to mount the media to in WLS. 

You can then navigate to that path with `cd /mnt/d`

!!! tip "The C drive and other internal Windows drives should already be automatically be mounted in WSL."
