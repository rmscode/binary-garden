# Linux Cheat Sheet

A collection of commonly used commands in various Linux operating systems. If the Linux ditro is not specifically mentioned, its safe to assume the command is universal.

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

!!! tip "For info on accessing a drive on Windows from WSL, see [here](../../general/wsl.md#accessing-a-linux-file-system-format-on-windows-from-wsl)."

    This is particularly useful for when you need to access the contents of storage media that is formatted in a Linux file system, but don't have immediate access to a computer running Linux.

## Compression Commands

| Command                    | Description
| -------------------------- | -----------
| `tar cf my_dir.tar my_dir` | Create an uncompressed tar archive
| `tar cfz my_dir.tar my_dir`| Create a tar archive with gzip compression
| `gzip file`	             |  Compress a file with gzip compression
| `tar xf file`	             |  Extract the contents of any type of tar archive
| `gunzip file.gz`	         |  Decompress a file that has gzip compression

## Networking Commands

| Command                | Description
| ---------------------- | -----------
| `ip a`	             | Show IP address and other information for all active interfaces
| `ip r`	             | Show IP address of default gateway
| `cat /etc/resolv.conf` | See what DNS servers your system is configured to use
| `ping`	             | Send a ping request to a network device
| `traceroute`	         | Trace the network path taken to a device
| `ssh`	                 | Login to a remote device with SSH

## File Permissions and Ownership

| Command            | Description
| ------------------ | -----------
| `chmod`            | Change the file permissions for a file or directory
| `chown`            | Change the owner of a file or directory
| `chgrp`            | Change the group of a file or directory

## User Management Commands

| Command            | Description
| ------------------ | -----------
| `useradd`          | Low level utility for adding new user accounts
| `adduser`          | High level utility for adding new user accounts
| `deluser`          | Delete a user account
| `usermod`          | Modify a user account
| `groupadd`         | Create a new group
| `delgroup`         | Delete a group

## System Resource Management Commands

| Command                   | Description
| ------------------------- | -----------
| `free -m`	                | See how much memory is in use and free
| `top`                     | See a list of processes and their resource usage
| `htop`                    | A more human readable and interactive version of top
| `nice`                    | Start a new process with a specified priority
| `renice`                  | Change the nice value of a currently running process
| `ps aux` OR `ps -ef`      | View all of the currently running processes
| `kill` or `killall`       | Terminate a process
| `kill -9` or `killall -9` | Terminate a process with SIGKILL signal
| `bg`                      | Send a task to the background
| `fg`                      | Bring a task to the foreground

## Environment Variable Commands

| Command                                | Description
| -------------------------------------- | -----------
| `printenv` or `printenv variable_name` | List all environment variables on a Linux system, or a specific one
| `whereis` and `which`                  | Find where a command in PATH is located
| `export MY_SITE="linuxconfig.org"`     | Set a temporary environment variable (just an example, but use the same syntax)
| `echo $VARIABLE`                       | Display the value of a variable
| `unset`                                | Remove a variable

## Hardware Information Commands

| Command                        | Description
| ------------------------------ | -----------
| `lspci`                        | See general information about host bridge, VGA controller, ethernet controller, USB controller, SATA controller, etc.
| `dmidecode`                    | See some information about BIOS, motherboard, chassis, etc.
| `cat /proc/cpuinfo`            | Retrieve processor type, socket, speed, configured flags, etc.
| `x86info or x86info -a`        | See information about the CPU
| `cat /proc/meminfo`            | See detailed information about system RAM
| `lshw`                         | List all hardware components and see their configuration details
| `lshw -C memory -short`        | Detect number of RAM slots used, speed, and size
| `hwinfo`                       | List details for all hardware, including their device files and configuration options
| `biosdecode`                   | Get some general information about your system’s BIOS
| `dmidecode -s bios-vendor`     | Retrieve the name of your BIOS vendor with this simple command
| `lsusb`                        | Get a list of USB devices plugged into your system
| `ls -la /dev/disk/by-id/usb-*` | Retrieve a list of USB device files
| `hdparm -I /dev/sdx`           | Get information about your hard drive’s make, model, serial number, firmware version, and configuration
| `hdparm -tT /dev/sdx`	         | Show the speed of an installed hard drive – including cached reads and buffered disk reads
| `wodim --devices`	             | Locate CD or DVD device file

```bash
echo "Please enter the first 3 octets of the subnet you would like to scan (e.g., 10.0.10):"
read subnet
for octet in {1..254}; do ping -c 1 $subnet.$octet -W 1 >> pingsweep.txt & done
numTargets=$(cat pingsweep.txt | grep "bytes from" | wc -l)
echo "$numTargets potential targets have been found and written to targets.txt"
cat pingsweep.txt | grep "bytes from" | cut -d " " -f4 | cut -d ":" -f1 | sort -n -t . -k 1,1 -k 2,2 -k 3,3 -k 4,4 > targets.txt

# Scan each IP in targets.txt for open ports using nmap
while read ip; do
    nmap -p 22,25,53,80,443,445,1433,3306,3389,5800,5900,8080,8443 $ip
done < targets.txt
```