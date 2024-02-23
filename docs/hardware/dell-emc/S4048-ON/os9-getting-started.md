# Getting Started with OS9 (Basic Config)

[CLI Reference Guide for the S4048-ON System (9.14.2.4)](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.5-cli-pub/dell-command-line-reference-guide-for-the-s4048%E2%80%93on-system-9.14.2.5)

??? info "Dell OS9 Terminology"

    `OOB Management Port`

    :   The out-of-band management port is a dedicated port for management traffic. It is not associated with any VLANs and is not affected by any VLAN configuration. The OOB management port is used for management traffic only. It cannot be used for data traffic.

    `Port-Channel`

    :   Dell's implementation of a LAG (Link Aggregation Group). A port-channel is a logical interface that is composed of multiple physical interfaces. The physical interfaces can be on the same switch or on different switches. The port-channel is configured with a single IP address and MAC address. The port-channel is used to increase bandwidth and provide redundancy.

    `Enhanced VLT (eVLT)`

    :   Combining two VLT domains. eVLT can operate in layer 2 and layer 3 modes. eVLT is also known as mVLT.

    `RPM`

    :   Route Processor Module. The RPM is the main CPU of the switch. It runs the OS9 operating system and is responsible for all of the control plane functions of the switch.

    `VLT Backup Link`

    :   The backup link monitors the connectivity between the VLT peer switches. The backup link sends configurable, periodic keep alive messages between the VLT peer switches. Dell recommends using the OOB management network connection for the VLT backup link. The backup destination is the IP address of the peer that is not the local switch.

    `VLT Interconnect (VLTi)`

    :   The link used to synchronize states between the VLT peer switches. It is formed by creating one or more port-channels (LAGs) between the VLT peers.

    `VLT Domain`

    :   This domain includes both the VLT peer devices, VLT interconnect, and all of the port channels in the VLT connected to the attached devices. It is also associated to the configuration mode that you must use to assign VLT global parameters.

    `VLT Peer Device`

    :   One of a pair of devices that are connected with the special port-channel known as the VLT interconnect (VLTi).

    `VTY`

    :   Virtual Teletype or "VTY", is a virtual port used to get Telnet or SSH access to a device. VTY is solely used for inbound connections. These connections are all virtual with no hardware associated with them.

## CLI Modes

=== "EXEC Mode"

    - The default mode after login with the privilege level of 1. This mode allows you to view the system status, run diagnostic commands, and view system statistics. You cannot make configuration changes in this mode.
    - The prompt for this mode is the hostname followed by `>`. 

    !!! Example 
    
        `DellEMC> Hello world!`

=== "EXEC Privilege Mode"

    - Contains commands to view configurations, clear counters, manage configuration files, run diagnostics, and enable or disable debug operations. The privilege level is 15, which is unrestricted.
    - Enter this mode by using the `enable` command.
    - The prompt for this mode is the hostname followed by `#`.

    !!! Example 
    
        `DellEMC# Hello world!`
    
    !!! info

        Users entering the EXEC Privilege mode or any other configured privilege level can access configuration commands. To protect against unathorized access, use the `enable password` command to configure a password for the `enable` command at a specific privilege level. If no privilege level is specified, the defalt is level **15**.

        ```shell
        DellEMC(conf)# enable password <password> 
        ```

=== "CONFIGURATION Mode"

    - This mode allows you to configure security features, time settings, set logging and SNMP functions, configure static ARP and MAC addresses, and set line cards on the system.
        - Beneathe this mode are several submodes that apply to interfaces, protocols and features. For example, `interface` mode allows you to configure interface settings, `ip` mode allows you to configure IP settings, and `vlan` mode allows you to configure VLAN settings.
    - Enter this mode by using the `configure` command.
    - The prompt for this mode is the hostname followed by `(conf)#`.

    !!! Example
    
        `DellEMC(conf)# Hello world!`

!!! tip

    For more information on the OS9 CLI, see the [OS9 CLI Fundamentals](../S4048-ON/os9-cli-fundamentals.md) section.

## `exit`, `end`, `do`, and `show`. 

To exit a mode or its sub-mode and return to the previous mode, use the `exit` command.

To return to the EXEC Privilege mode from *any* mode, use the `end` command.

To run EXEC Privilege mode commands from the CONFIGURE mode, precede the command with `do`. This is useful for running `show` commands or saving the configuration without exiting the CONFIGURE mode.

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/cli-modes?guid=guid-c2dacafb-b58b-43bb-a295-669a21dc2d18&lang=en-us)

!!! tip "Obtaining Help"

    Enter `?` after a command prompt to list all of the available keywords. Entering `?` after a partial keyword lists all of the keywords that begin with the specified letters. Entering a [space] and then `?` after a keyword lists all of the keywords that can follow the specified keyword.

## Support Assist

When you access the CLI on a fresh system, you will be prompted to activate Support Assist. If you take what the prompt says at face value, you might be inclined to enter `support-assist activate` in EXEC PRIVILEGE mode which will fail on the word `activate`. Enter CONFIGURE mode to make changes to the support assist package.

To enable Support Assist and run the configuration wizard, start by accepting the EULA:

```shell
DellEMC# configure
DellEMC(conf)# eula-consent support-assist accept
DellEMC(conf)# support-assist activate
```

To disable Support Assist, reject the EULA:

```shell
DellEMC# configure
DellEMC(conf)# eula-consent support-assist reject
```

[*Reference*](https://www.dell.com/support/kbdoc/en-us/000122405/how-to-enable-supportassist-on-dell-networking-and-legacy-force10-s-series-switches)

## Setting the hostname

Enter CONFIGURE mode and use the `hostname` command.

```shell
DellEMC> enable
DellEMC# configure
DellEMC(conf)# hostname Switch-A
Switch-A(conf)#
```

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configuring-a-host-name?guid=guid-4fb6a556-a309-4d56-abfe-2fa6ccee1183&lang=en-us)

## Management Interface Configuration

You can configure the OOB management port on the rear of the switch or use a data port on the front of the device. 

The Out-of-Band (OOB) management network is a separate network that is solely for management traffic. The network uses the dedicated management port on the switch to connect to a management switch dedicated for management traffic. 

With in-band management, devices are managed through the production network switches, avoiding the need of purchasing a dedicated management switch. This solution requires that you initially configure each managed switch locally through a serial port connection.

### Out of Band Management (Recommended)

Enter CONFIGURE INTERFACE mode for `ManagementEthernet 1/1` to turn off DHCP, set the IP and enable the port.

```shell
DellEMC# configure
DellEMC(conf)# interface ManagementEthernet 1/1 #(1)
DellEMC(conf-if-ma-1/1)# no ip address dhcp #(2)
DellEMC(conf-if-ma-1/1)# ip address 10.1.1.1/24 #(3)
DellEMC(conf-if-ma-1/1)# no shutdown #(4)
DellEMC(conf-if-ma-1/1)# exit
```

1. The `interface` command is used to enter interface configuration submode.
2. The `no` command is used to negate a command. In this case, we are negating the `ip address dhcp` command and essentially removing that setting from the interface.
3. Setting the IP address of the management interface
4. This enables the interface and keeps it enabled after a reboot.

Set the management route from CONFIGURE mode.

```shell
DellEMC(conf)# management route 0.0.0.0/0 10.1.1.254 #(1)
```

1. This is the nexthop - typically your gateway.

!!! tip "To remove the management route, you must use the `no` command followed by the full management route: `no management route 0.0.0.0/0 10.1.1.254`."

[*Reference: Management Port IP*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configure-the-management-port-ip-address?guid=guid-d18626b7-74dd-4a2b-a4b7-bb8a852386e5&lang=en-us)</br>
[*Reference: Management Route*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configure-a-management-route?guid=guid-e615d634-8863-4c93-92d1-5b269fd756ab&lang=en-us)

### In-Band Management

Select a data port and enter CONFIGURE INTERFACE mode to prepare it for management.

```shell
DellEMC# configure
DellEMC(conf)# interface tengigabitethernet 1/48
DellEMC(conf-if-te-1/48)# description upstream network
DellEMC(conf-if-te-1/48)# portmode hybrid
DellEMC(conf-if-te-1/48)# switchport
DellEMC(conf-if-te-1/48)# no shutdown
DellEMC(conf-if-te-1/48)# exit
```

Configure the VLAN and IP address for connections to the upstream port 1/48.

```shell
DellEMC(conf)# interface vlan 10
DellEMC(conf-if-vl-10)# description Management VLAN
DellEMC(conf-if-vl-10)# ip address 192.168.1.10/24
DellEMC(conf-if-vl-10)# no shutdown
DellEMC(conf-if-vl-10)# tagged tengigabitethernet 1/48
```

[*Reference: Management Networks for Dell EMC Switches - Section 5.2.1*](https://infohub.delltechnologies.com/section-assets/dell-emc-mgmt-networking-may-2019-1)

## Configure a user for remote SSH accesss

Create user:

```shell
DellEMC(conf)# username <username> password <password> privilege 15 #(1)
```

1. The `privilege` level can range from 0-15. The default is 1 which only allows access to EXEC mode. Level 15 is the highest and allows access to all commands and CLI modes.

Enable SSH:

!!! info

    Starting with OS9 release 9.2(0.0), SSH server ver 2 is [enabled by default](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.5-cli-pub/ip-ssh-server?guid=guid-be099a43-0f16-477e-9c53-6892ba7f699e&lang=en-us#:~:text=NOTE%20Starting%20with%20Dell%20EMC%20Networking%20OS%20Release%209.2(0.0)%2C%20SSH%20server%20is%20enabled%20by%20default.). Entering these commands are mostly redundant...leaving for reference.

```shell
DellEMC(conf)# ip ssh server enable
DellEMC(conf)# ip ssh server version 2
```
!!! note

    When connected via SSH, the lowest CLI mode you have access to is EXEC Privilege. The mode below that is EXEC which is only accessible via the console port. 

!!! info 

    For more info on managing remote access to the terminal, see ["Managing Access to Terminal Lines"](../S4048-ON/os9-tty-access.md)

[*Reference: Username and Password*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configuring-a-username-and-password?guid=guid-5afd0af5-ceac-4a0c-b3c8-e14ee7bcddb4&lang=en-us)</br>
[*Reference: Enable SSH by Password*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s5048f-on-9.14.2.4-config/enabling-ssh-authentication-by-password?guid=guid-0685bdc9-9b7f-4fa1-b0be-9e6c83da445d&lang=en-us)</br>
[*Reference: `Enable Password`*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configuring-the-enable-password?guid=guid-cf0ca3a8-65f4-4859-b058-ecb7c424f0ec&lang=en-us)

## Configure time zone and NTP

Set UTC to 0:
```shell
DellEMC(conf)# clock timezone UTC 0 
```

Set the time (`clock set <time> <month> <day> <year>`):

```shell
DellEMC# clock set 16:20:00 sep 9 2017
```

Show current clock:

```shell
DellEMC(conf)# show clock
```

Set the NTP server:

!!! note "A Windows DC will not work as an NTP server..."

```shell
DellEMC(conf)# ntp server <ip>
```

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/system-time-and-date?guid=guid-047210d7-7dae-4a6d-86df-37a79e8e8b9f&lang=en-us)

## Configuring the Enable Password

EXEC Privilege mode is unrestricted by default and can be accessed via the console port from EXEC mode with the `enable` command. Configure a password as a basic security measure.

There are three types of passwords:

- `enable password` is stored in the running/startup configuration using a DES encryption method.
- `enable secret` is stored in the running/startup configuration using MD5 encryption method.
- `enable sha256-password` is stored in the running/startup configuration using sha256-based encryption method (PBKDF2).

Dell EMC Networking recommends using the enable sha256-password password.

Create a password to access EXEC Privilege mode from CONFIGURATION mode.

```txt
enable [password | secret | sha256-password] [level <level>] [encryption-type] <password>
```

- `level` is the privilege level. The default is 15.
- `encryption-type` specifies how you input the pasword, is 0 by default, and is not required.
      - 0 is to input the password in clear text.
      - 5 is to input a password that is already encrypted using MD5 encryption method. Obtain the encrypted password from the configuration file of another device.
      - 7 is to input a password that is already encrypted using DES encryption method. Obtain the encrypted password from the configuration file of another device.
      - 8 is to input a password that is already encrypted using sha256-based encryption method. Obtain the encrypted password from the configuration file of another device.


## Apply the Running Configuration to the Startup Configuration

The running config contains the current system configuration. If you do not copy (save) the running config to the startup config, any changes that you made will be lost after a reboot.

Save the running config to the startup config on the internal flash:

```shell
DellEMC# copy running-config startup-config
```

## Back-up a Configuration File

We prefer backing up to a USB flash drive.

Insert a USB flash drive into the front port of the switch and then run the following command:

```shell
DellEMC# copy running-config usbflash://OS9_Switch-A.conf
```

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/save-the-running-configuration?guid=guid-30740b60-fdc7-4980-b20e-06e195bbaf13&lang=en-us)

## Importing a Configuration File

Insert a USB flash drive into the front port of the switch and then run the following command:

!!! abstract "Dbl check with Matt...can't quite remember what he actually typed in."

```shell
DellEMC# copy usbflash://OS9_Switch-A.conf flash://running-config
```

## Upgrading the Firmware

OS9 switches have two boot banks, A and B. It's good practice to upload new firmware into on boot bank and keep the old firmware in the other in case you need to roll back.

1. Make a copy of the startup configuration

```shell
DellEMC> enable
DellEMC# copy startup-config usbflash://OS9_Switch-A.conf
```

2. Upload the new firmware to image B

```shell
DellEMC# upgrade system usbflash://FTOS-SK-9.14.bin b: 
```

3. Change active boot bank and reload

```shell
DellEMC# configure
DellEMC(conf)# boot system stack-unit 1 primary system b:
DellEMC(conf)# exit
DellEMC# reload
```