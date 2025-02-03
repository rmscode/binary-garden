# General Linux Stuff...

The stuff here is mostly universal across all Linux distributions. It's a collection of commonly used commands, tips, and tricks that you can use to get around in a Linux environment.

## Disable `root` Login

The follow commands will disable `root` login for most flavors of Linux.

!!! warning "Don't lock yourself out!"

	Prior to doing this, make sure that you already have an existing user that is a member of the sudoers group! You should definitely be running the following commands logged in as that user. Test the configuration by opening a separate session before applying the changes and closing your current session.
	
1. Disable `root` login:<br />
	```shell
	sudo passwd -l root 
	```
2. Disable `root` SSH login:<br />
	```shell
	sudo sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
	```

    !!! note "This applies to OpenSSH installations only."

3. Restart the SSH service:<br />
	```shell
	sudo systemctl restart sshd
	```

## Prevent a user from logging into any shell (console)

You can change the shell (`chsh`) assigned to a user to `/usr/sbin/nologin` to prevent them from logging in.

`chsh [user] -s /usr/sbin/nologin`

## Find out what caused a system shutdown

Run this command and compare to the outputs below:

`last -x | head | tac`

!!! info "last, head and tac"

    - `last` prints information about connect times of users. Records are printed from most recent to least recent.
    - `head is used to keep the latest 10 events
    - `tac` is used to reverse the order of the output so that we don't get confused by the fact that the `last` prints from most recent to least recent event.

### Normal Shutdown Examples

A normal shutdown and power-up looks like this (note that you have a shutdown event and then a system boot event):

```shell
runlevel (to lvl 0)   2.6.32- Sat Mar 17 08:48 - 08:51  (00:02) 
shutdown system down  ... <-- first the system shuts down   
reboot   system boot  ... <-- afterwards the system boots
runlevel (to lvl 3)
```

In some cases you may see this (note that there is no line about the shutdown but the system was at runlevel 0which is the "halt state"):

```shell
runlevel (to lvl 0)   ... <-- first the system shuts down (init level 0)
reboot   system boot  ... <-- afterwards the system boots
runlevel (to lvl 2)   2.6.24-... Fri Aug 10 15:58 - 15:32 (2+23:34)
```

### Unexpected Shutdown Examples

An unexpected shutdown from power loss looks like this (note that you have a system boot event without a prior system shutdown event):

```shell
runlevel (to lvl 3)   ... <-- the system was running since this momemnt
reboot   system boot  ... <-- then we've a boot WITHOUT a prior shutdown
runlevel (to lvl 3)   3.10.0-693.21.1. Sun Jun 17 15:40 - 09:51  (18:11)
```

When an unexpected power off or hardware failure occurs the filesystems will not be properly unmounted so in the next boot you may get logs like this:

```shell
EXT4-fs ... INFO: recovery required ... 
Starting XFS recovery filesystem ...
systemd-fsck: ... recovering journal
systemd-journald: File /var/log/journal/.../system.journal corrupted or uncleanly shut down, renaming and replacing.
```

When the system powers off because user pressed the power button you get logs like this:

```shell
systemd-logind: Power key pressed.
systemd-logind: Powering Off...
systemd-logind: System is powering down.
```

Only when the system shuts down orderly you get logs like this:

```shell
rsyslogd: ... exiting on signal 15
```

When the system shuts down due to overheating you get logs like this:

```shell
critical temperature reached...,shutting down
```

[*Reference*](https://unix.stackexchange.com/questions/9819/how-to-find-out-from-the-logs-what-caused-system-shutdown)

## Watch logs in real time

### Method 1: `tail`

The `tail` command is so popular that admins often use the term "tail the log file".

```shell
tail -f location_of_log_file
```

> `-f` will follow the tail of a file. Meaning, it will keep on showing the new lines added to the file continuously.

### Method 2: `less`

The `less` command is more suited for reading through text files without cluttering the screen.

```shell
less +F location_of_log_file
```

> `+F` will start `less` in follow mode. This is similar to `tail -f` but you can exit follow mode by pressing `Ctrl+C` and then you can scroll up and down in the file.

[*Reference*](https://linuxhandbook.com/watch-logs-real-time)

## Get Hardware Information

If you're not opposed to installing a package, give `inxi` a try and run the `inxi -Fxz` command (`sudo atp install inxi`). Otherwise, use the methods below.

### CPU 

`lscpu | sed -nr '/Model name/ s/.*:\s*(.*) @ .*/\1/p'`

### GPU

`lspci | grep -i vga`

!!! info

    If the command is not found, install the `pciutils` package. If you would rather not install a package, you can try `sudo dmesg | grep -i VGA`.

### RAM 

`sudo dmidecode --type memory`

## The "Bash Read Command" File (`.bashrc`)

Located in the user's home directory, the `.bashrc` file is a configuration file for the bash shell. It is executed whenever a new terminal session is started. With that said, this makes it great for setting up aliases, functions, environment variables and executing commands at login.

The file is hidden by default, so a simple `ls` command will not show it. Use `ls -a` instead.

!!! note

    Changes made to the `.bashrc` file only apply to the current user. However, system-wide changes can be made to the `/etc/bash.bashrc` file instead.

For example, if you wanted to create the alias `la` for `ls -a`, you would add the following line to the `.bashrc` file:

```shell
alias la='ls -a'
```

Then reload the file with `source ~/.bashrc` or restart the terminal.