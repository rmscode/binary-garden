# Dell EMC Networking

## PowerSwitch S4048-ON

OS 9 CLI Modes

- EXEC: The default mode after login with the privilege level of 1. The most used command in this mode is `show`.
- EXEC Privilege:  Contains commands to view configurations, clear counters, manage configuration files, run diagnostics, and enable or disable debug operations. The privilege level is 15, which is unrestricted.
- CONFIGURATION mode: This mode allows you to configure security features, time settings, set logging and SNMP functions, configure static ARP and MAC addresses, and set line cards on the system.
  - Beneathe this mode are several submodes that apply to interfaces, protocols and features. For example, `interface` mode allows you to configure interface settings, `ip` mode allows you to configure IP settings, and `vlan` mode allows you to configure VLAN settings.

The prompt changes to indicate the mode you are in . . .

| Mode           | Command                         | Prompt                    |
| -------------- | ------------------------------- | ------------------------- |
| EXEC           | None. This is the default mode. | `Dell> Hello world!`      |
| EXEC Privilege | `enable`                        | `Dell# Hello world!`      |
| CONFIGURE      | `configure`                     | `Dell(conf)# Hello word!` |

To exit a mode or its sub-mode and return to the previous mode, use the `exit` command.

To return to the EXEC Privilege mode from any mode, use the `end` command.

To run an EXEC Privilege mode command from the CONFIGURE mode, precede the command with the `do` command. This is useful for running `show` commands or saving the configuration without exiting the CONFIGURE mode.

### Setting the hostname

```shell
DellEMC> enable
DellEMC# configure
DellEMC(conf)# hostname Switch-A
Switch-A(conf)#
```

### OOB Management Interface Configuration

```shell
DellEMC# configure
DellEMC(conf)# interface ManagementEthernet 1/1
DellEMC(conf-if-ma-1/1)# no ip address dhcp
DellEMC(conf-if-ma-1/1)# ip address 10.1.1.1/24
DellEMC(conf-if-ma-1/1)# no shutdown
DellEMC(conf-if-ma-1/1)# management route 0.0.0.0/0 10.1.1.10/24
DellEMC(conf-if-ma-1/1)# exit
DellEMC(conf)# 
```

### Configure username & password for remote SSH accesss

```shell
DellEMC(conf)# enable password <password>
DellEMC(conf)# username <username> password <password>
DellEMC(conf)# ip ssh server enable
```

### Configure time zone and NTP

```shell
DellEMC(conf)# clock timezone UTC -5
DellEMC(conf)# ntp server <ip>
DellEMC(conf)# show ntp associations
DellEMC(conf)# show ntp status
DellEMC(conf)# show clock
```

### VLT Configuration

#### 1. Enable STP globally on each VLT peer

> Dell recommends, at least initially, to enable STP globally on each VLT peer. This is to prevent loops in the event of a misconfiguration. Once the VLT domain is configured, STP can be disabled.

```bash
VLT-1(conf)# protocol spanning-tree rstp
VLT-1(conf-rstp)# no disable
VLT-1(conf-rstp)# exit
```

#### 2. Establish VLT interconnect (VLTi) between the peers

> **NOTE** Dell does not mention any specific requirements for which interfaces to use for the VLTi. They just insist on using more than one as best practice.

```shell
DellEMC# configure
DellEMC(conf)# interface range FortyGigabitEthernet 1/49-1/50
DellEMC(conf-if-range-fo-1/47,fo-1/48)# no shutdown
DellEMC(conf-if-range-fo-1/47,fo-1/48)# exit
DellEMC(conf)# interface port-channel 1000
DellEMC(conf-if-po-1000)# description "VLT Interconnect"
DellEMC(conf-if-po-1000)# channel-member FortyGigabitEthernet 1/49
DellEMC(conf-if-po-1000)# channel-member FortyGigabitEthernet 1/50
DellEMC(conf-if-po-1000)# no shutdown
DellEMC(conf-if-po-1000)# exit
```

#### 3. Create and join switches to the VLT domain

> The VLT domain requires an ID number (1-1000). Configure the same ID on both peers.

```shell
DellEMC(conf)# vlt domain 1
DellEMC(conf-vlt-1)# back-up destination <mgmt IP of peer>
DellEMC(conf-vlt-1)# peer-link port-channel 1000
DellEMC(conf-vlt-1)# primary-priority 1
DellEMC(conf-vlt-1)# exit
```

#### 4. To improve convergence, configure the same default VLT MAC address on both peers. This is optional, but recommended

```bash
DellEMC(conf)# vlt domain 1
DellEMC(conf-vlt-1)# system-mac 00:11:22:33:44:55
```

#### 6. Confirm the state of the VLT domain

```shell
DellEMC# show vlt brief
DellEMC# show vlt statistics
DellEMC# show vlt backup-link
DellEMC# show interface port-channel 1000
```

#### 7. Create a VLT port-channel (LAG) on each peer to connect them to an upstream switch

```bash
DellEMC(conf)# interface FortyGigabitEthernet 1/51
DellEMC(conf-if-te-1/1)# port-channel-protocol LACP
DellEMC(conf-if-te-1/1-lacp)# port-channel 10 mode active
DellEMC(conf-if-te-1/1-lacp)# interface port-channel 10
DellEMC(conf-if-po-10)# portmode hybrid
DellEMC(conf-if-po-10)# switchport
DellEMC(conf-if-po-10)# vlt-peer-lag port-channel 10
```

> **NOTE** Form a link aggregation on the interfaces of the upstream switch that are connected to the VLT domain's port-channel. If this is another Dell switch, you can create a port-channel in the same way as shown above excluding the `vlt-peer-lag` command.