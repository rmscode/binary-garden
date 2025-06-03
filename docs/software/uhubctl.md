# USB Hub Control (uhubctl - Linux)

[uhubctl](https://github.com/mvp/uhubctl) is utility to control USB power per-port on smart USB hubs. Smart hub is defined as one that implements per-port power switching.

!!! note

    I have used this utility to prevent unauthorized access to Raspberry Pi devices by disabling the USB ports. This is useful in a situation where the Pi is deployed in the wild and may be easily accessed, like behind a TV used for signage.

## Installation (Debian/Ubuntu)

```shell
sudo apt install uhubctl
```

## Usage

**To list all supported hubs**:

```shell
sudo uhubctl
```

**Control the power of a USB port like this**:

```shell
sudo uhubctl -a off -p 2
```

This means operate on default smart hub and turn power off (`-a off` or `-a 0`) on port 2 (`-p 2`). Supported actions are `off`/`on`/`cycle`/`toggle` (or `0`/`1`/`2`/`3`). `cycle` means turn power off, wait some delay (configurable with `-d`) and turn it back on. Ports can be comma separated list, and may use `-` for ranges e.g. `2`, or `2,4`, or `2-5`, or `1-2,5-8`.

For more on the usage, see the [uhubctl GitHub page](https://github.com/mvp/uhubctl?tab=readme-ov-file#usage).

### Raspberry Pi Examples

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

    !!! note

        Version 2.6 or later is required. If you installed uhubctl from your distro's package manager, its very likely to be version 2.5 or earlier. If that is the case, you will need to clone the repo and [compile it from source](https://github.com/mvp/uhubctl?tab=readme-ov-file#compiling).

    ```
    sudo uhubctl -l 2 -a 0 && uhubctl -l 4 -a 0
    ```

!!! info "Changes do not persist across reboots"

    You can easily get around this by adding the command to `.bashrc` file so it is executed automatically on login.