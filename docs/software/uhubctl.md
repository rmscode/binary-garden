# USB Hub Control (uhubctl - Linux)

[uhubctl](https://github.com/mvp/uhubctl) is utility to control USB power per-port on smart USB hubs. Smart hub is defined as one that implements per-port power switching.

## Installation (Debian/Ubuntu)

```shell
sudo apt install uhubctl
```

## Usage

I have used this utility to prevent unauthorized access to Raspberry Pi devices by disabling the USB ports. This is useful in a situation where the Pi is deployed in the wild and may be easily accessed, like behind a TV used for signage. You can learn more about compatible devices and how to control their USB ports [here](https://github.com/mvp/uhubctl).

**To list all supported hubs**:

```shell
uhubctl
```

**Control the power on a USB port(s) like this**:

```shell
sudo uhubctl -a off -p 2
```

### Raspberry Pi Devices

Raspberry Pi turns power off to *all* ports, not just the one you specify.

=== "Raspberry Pi B+,2B,3B"

    ```
    sudo uhubctl -l 1-1 -p 2 -a 0
    ```

=== "Raspberry Pi 3B+"

    ```
    sudo uhubctl -l 1-1 -p 2 -a 0
    ```

=== "Raspberry Pi 4B"

    ```
    sudo uhubctl -l 1-1 -a 0
    ```

=== "Raspberry Pi 5"

    ```
    sudo uhubctl -l 2 -a 0 && uhubctl -l 4 -a 0
    ```

!!! tip "Turning the USB ports back on is as simple as changing the `0` at the end of the command to a `1`."

!!! note "Note: Power *will* be restored after a reboot."

    You can easily automate this process by adding the command to .bashrc file in the home directory of the user that is automatically logged in when the Pi boots up.