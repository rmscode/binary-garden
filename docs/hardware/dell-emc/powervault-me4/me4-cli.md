# Accessing the CLI

Embedded within the controller modules is a command-line interface (CLI) that enables you to manage and monitor the storage system. The CLI can be accessed in two ways:

- Use SSH or Telnet on a management host that is remotely connected to a controller module network port through a LAN.
- Use a serial cable to establish a serial connection from a computer to the CLI port on a controller module. Refer back to the [controller module rear panel diagram](#controller-module-4-port-fciscsi) for the location of the CLI ports.

If the default IP addresses (10.0.0.2 - Controller A, 10.0.0.3 - Controller B) are not compatible with your network, you must set an IP addresses for each network port using the CLI.

1. Obtain an IP address, subnet mask and gateway from your network administrator.
2. Connect a 3.5mm/DB9 serial cable from a host computer with a serial port to the 3.5mm stereo plug CLI port on controller A. Alternatively, connect a generic mini-USB cable from a host computer to the USB CLI port on controller A.
3. Start a terminal emulator configured to use the following display and connection settings:
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
4. Press `Enter` to display the CLI prompt if necessary.
5. If you are connecting to a storage system with G275 firmware that has not been deployed, the default user/pass is `manage`/`!manage`. If your system has been deployed, login with a user that has the *manage* role.
6. If you are connecting to a storage system with G280 firmware that has not been deployed, type `setup` at the login prompt and press `Enter`. Do not type anything at the password prompt and press `Enter`. If your system has been deployed, login with a user that has the *manage* role.

## Set the network port IP addresses via DHCP

!!! info

    In DHCP mode, the network port IP address, subnet mask, and gateway are obtained from a DCHP server. If a DHCP server is not available, the current network addresses are not changed. To determine the addresses that are assigned to the controller modules, use the list of bindings on the DHCP server.

To obtain an IP address via DHCP, use the `set network-parameters dhcp` command.

## Set the network port IP addresses statically

To use a custom static IP address, use the `set network-parameters ip <address> netmask <netmask> gateway <gateway> controller <a|b>` command. Run the command for controller module A first, and then for controller module B.

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

!!! warning "Caution"

    When configuring an iSCSI storage system or a storage system that uses a combination of Fibre Channel and iSCSI SFPs, do not restart the Management Controller or exit the terminal emulator session until the CNC ports are configured as described [here](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_dg_pub/changing-host-port-settings?guid=guid-4b22aaaa-ca95-4d45-82cd-a3499bb1890c&lang=en-us).

    I couldn't find an explanation for this precaution btw . . .
