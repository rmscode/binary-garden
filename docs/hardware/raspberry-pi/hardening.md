# Hardening

In an attempt to "harden" a Raspberry Pi deployed in the wild that may be easily accessed, like behind a lobby TV, there are few things you can do. Keep in mind that any of the methods listed below are NOT bullet proof. A highly motivated bad actor will still do whatever they can to gain access to your systems.

## Disable USB Ports

Cutting power from the USB ports to render them unusable can mitigate unauthorized physical access.

Install [uhubctl](https://github.com/mvp/uhubctl):

```bash
sudo apt install -y uhubctl
```

USB control (prefix with `sudo`):

=== "Raspberry Pi B+,2B,3B"

    ```
    uhubctl -l 1-1 -p 2 -a 0
    ```

=== "Raspberry Pi 3B+"

    ```
    uhubctl -l 1-1 -p 2 -a 0
    ```

=== "Raspberry Pi 4B"

    ```
    uhubctl -l 1-1 -a 0
    ```

=== "Raspberry Pi 5"

    ```
    uhubctl -l 1 -a 0
    uhubctl -l 3 -a 0
    ```

!!! tip "Turning the USB ports back on is as simple as changing the `0` at the end of the command to a `1`."

!!! note "Note: Power *will* be restored after a reboot."

    You can easily automate this process by adding the command to .bashrc file in the home directory of the user that is automatically logged in when the Pi boots up.