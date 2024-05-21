# Hardware Watchdog

The Raspberry Pi features a hardware watchdog that can automatically restart the system when the kernel panics (crashes).

## Install the system service

```bash
sudo apt-get update
sudo apt-get install -y watchdog
```

## Enable the hardware watchdog timer

```bash
sudo su #(1)!
echo 'dtparam=watchdog=on' >> /boot/config.txt #(2)!
reboot now
```

1. The `su` (short for substitute or switch user) utility allows you to run commands with another user’s privileges, by default the root user. It's useful when you want to save yourself from typing `sudo` multiple times.
2. FYI: `echo '<string>' >> <path_to_file>` appends the given string to the given file on a new line.

## Configure the timeouts and watchdog refresh intervals

```bash
sudo su
echo 'watchdog-device = /dev/watchdog' >> /etc/watchdog.conf #(1)!
echo 'watchdog-timeout = 15' >> /etc/watchdog.conf #(2)!
echo 'max-load-1 = 6' >> /etc/watchdog.conf #(3)!
echo 'RuntimeWatchdogSec=10' >> /etc/systemd/system.conf #(4)!
echo 'ShutdownWatchdogSec=10min' >> /etc/systemd/system.conf #(5)!
```

1. Specifies the device file for the hardware watchdog.
2. Specifies the period of inactivity after which the watchdog timer will expire and the system will be rebooted. This is essentially the max amount of time that can pass without the watchdog daemon "kicking" or resetting the watchdog timer before the system is considered unresponsive.
3. Specifies the max average system load over the last 1 minute, above which the watchdog reboots the system. 
4. Refreshes the watchdog every 10 seconds and if the refresh fails, power cycle the system.
5. On shutdown, if the system takes longer than 10 minutes to reboot, power cycle the system.

!!! note "Important note on `max-load-1`"

    The system load is a measure of the amount of computational work that a system performs. The value is a floating point number. For example, if set to `4` on a 4-core system, the watchdog will trigger a reboot if the 1-min load average exceeds 4, which essentially means all cores were fully utilized for the last minute. However, you typically want to set `max-load-1` to the maximum possible value, because the system might occasionally reach full utilization under normal operation. Instead, you might want to set the `max-load-1` to a value that indicates the system is overloaded. 
    
    For example, on a 4-core Raspberry Pi, you might set `max-load-1` to 5.0 or 6.0. These values indicate that the system is overloaded, because the system load is higher than the number of cores.

## Enable and check the service

```bash
sudo systemctl enable watchdog
sudo systemctl start watchdog
sudo systemctl status watchdog
```

!!! tip "If you want to test the watchdog, you can "fork bomb" the system to make the kernel panic."

    ```bash
    sudo bash -c ':(){ :|:& };:'
    ```