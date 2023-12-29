# Linux Cheat Sheet

A collection of commonly used commands/task in various linuz operating systems. If the distrobutiuon is not specifically mentioned, its safe to assume the command is universal.

## File System Navigation

| Command   | Description
| --------- | -----------
| `ls`      | List all the files in a directory
| `ls -l`   | List all files and their details (owner, mtime, size, etc)
| `ls -a`   | List all the files in a directory (including hidden files)
| `pwd`     | Show the current working directory
| `cd`      | Change directory to some other location
| `file`    | View the type of any file

## View, Create, Edit, and Delete Files and Directories

| Command        | Description
| -------------- | -----------
| `mkdir`        | Create a new directory
| `touch`        | Create a new, empty file, or update the modified time of an existing one
| `cat > file`   | Create a new file with the text you type after
| `cat file`     | View the contents of a file
| `grep`         | View the contents of a file that match a pattern
| `nano file`    | Open a file (or create new one) in nano text editor
| `vim file`     | Open a file (or create new one) in vim text editor
| `rm` or `rmdir`| Remove a file or empty directory
| `rm -r`        | Remove a directory that isn’t empty (Recursively)
| `mv`           | Move or rename a file or directory
| `cp`           | Copy a file or directory
| `rsync`        | Synchronize the changes of one directory to another

## Search for Files and Directories

| Command | Description
| ------- | ----------- 
| `locate`| Quickly find a file or directory that has been cached
| `find`  | Seach for a file or directory based on name and other parameters

## Basic Administration Commands

| Command       | Description
| ------------- | ----------- 
| `whoami`      | See which user you are currently logged in as 
| `sudo`        | Execute a command with root permissions
| `apt install` | Install a package on Debian based systems
| `dnf install` | Install a package on Red Hat based systems
| `apt remove`  | Remove a package on Debian based systems
| `dnf remove`  | Remove a package on Red Hat based systems
| `reboot`      | Reboot the system
| `poweroff`    | Shut down the system

## Hard Drive and Storage Commands

| Command            | Description
| ------------------ | -----------
| `df or df -h`      | See the current storage usage of mounted partitions
| `sudo fdisk -l`    | See information for all attached storage devices
| `du`               | See disk usage of a directory’s contents
| `tree`             | View the directory structure for a path   
| `mount and umount` | Mount and unmount a storage device or ISO file

## Compression Commands


## Networking Commands


## File Permissions and Ownership


## User Management Commands


## System Resource Management Commands


## Environment Variable Commands


## Kernel Information and Module Management


## Hardware Information Commands


