# Accessing the CLI

Embedded within the controller modules is a command-line interface (CLI) that enables you to manage and monitor the storage system. The CLI can be accessed in two ways:

- Use SSH or HTTPS on a management host that is remotely connected to a controller module network port through a LAN. HTTP and Telnet are supported, but not recommended.
- Use a micro-USB cable to establish a connection from a terminal emulator to the CLI port on a controller module. Refer back to the [controller module rear panel diagram](me5-overview.md#controller-module-4-port-sas-shown) for the location of the CLI ports.

1. Connect a micro-USB cable from a host computer to the USB CLI port on controller A.
2. Start a terminal emulator configured to use the following display and connection settings:
    1. Display Settings:
        - **Terminal emulation mode** - VT-100 or ANSI (for color support)
        - **Font** - Terminal
        - **Translations** - None
        - **Columns** - 80
    2. Connection Settings:
        - **Connector** - COM3
        - **Baud rate** - 115,200
        - **Data bits** - 8
        - **Parity** - None
        - **Stop bits** - 1
        - **Flow control** - None
3. Press `Enter` to display the CLI prompt if necessary.
4. If you are connecting to a storage system that has not been deployed:
    1. Type `setup` at the login prompt and press Enter.
    2. Do not type anything at the Password prompt and press Enter.
    3. Type Y at the prompt to continue.
    -  Otherwise, login with a user that has the *manage* role.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-a-network-port-ip-address-using-the-micro-usb-port?guid=guid-f6c01f88-2207-4dab-bb8e-8c407a002c81&lang=en-us)

## Set the network port IP addresses via DHCP

!!! info

    In DHCP mode, the network port IP address, subnet mask, and gateway are obtained from a DCHP server. If a DHCP server is not available, the current network addresses are not changed. To determine the addresses that are assigned to the controller modules, use the list of bindings on the DHCP server.

To obtain an IP address via DHCP, use the `set network-parameters dhcp` command.

## Set the network port IP addresses statically

To use a custom static IP address, use the following command. Run the command for controller module A first, and then for controller module B:

`set network-parameters ip <address> netmask <netmask> gateway <gateway> controller <a|b>`

Where:

- `<address>` is the IP address of the controller module
- `<netmask>` is the subnet mask
- `<gateway>` is the IP address of the subnet router
- `<a|b>` specifies the controller whose network parameters you are setting

!!! example

    ```shell
    set network-parameters ip 192.168.0.10 netmask 255.255.255.0 gateway 192.168.0.1 controller a
    set network-parameters ip 192.168.0.11 netmask 255.255.255.0 gateway 192.168.0.1 controller b
    ```

## Verifying the new IP addresses and connectivity

Show the IP address, subnet mask and gateway of a controller module: `show network-parameters`

Ping an address, such as the gateway: `ping 192.168.0.1`

From another host, ping the controllers . . .

!!! note

    If you can't access your storage system for at least three minutes after changing the IP address, restart the controllers using the CLI command `restart mc both`.
