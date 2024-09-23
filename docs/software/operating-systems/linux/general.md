# General Linux Stuff...

The stuff here is mostly universal across all Linux distributions. It's a collection of commonly used commands, tips, and tricks that you can use to get around in a Linux environment.

## Prevent a user from logging into any shell (console)

`chsh [user] -s /usr/sbin/nologin`

## Find out what caused a system shutdown

Run this command and compare to the outputs below:

`last -x | head | tac`

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
