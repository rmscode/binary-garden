# Dell EMC Networking

## PowerSwitch S4048-ON

OS 9.14 CLI Modes

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

### Setting the hostnames

VLT Peer 1

```bash
DellEMC# configure
DellEMC(conf)# hostname VLT-1
VLT-1(conf)#
```

VLT Peer 2

```bash
DellEMC# configure
DellEMC(conf)# hostname VLT-2
VLT-2(conf)#
```

Access switch

```bash
DellEMC# configure
DellEMC(conf)# hostname ACCESS
ACCESS(conf)#
```

### OOB Management Interface Configuration

```bash
VLT-1# configure
VLT-1(conf)# interface ManagementEthernet 1/1
VLT-1(conf-if-ma-1/1)# no ip address dhcp
VLT-1(conf-if-ma-1/1)# ip address 10.1.1.1/24
VLT-1(conf-if-ma-1/1)# exit
VLT-1(conf)# 
```

> I set VLT-2 to 10.1.1.2

### VLT Configuration

#### 1. Enable STP globally on each VLT peer

```bash
VLT-1(conf)# protocol spanning-tree rstp
VLT-1(conf-rstp)# no disable
VLT-1(conf-rstp)# exit
```

#### 2. Create a VLT domain on each VLT peer

> The VLT domain requires an ID number (1-1000). Configure the same ID on both peers.

```bash
VLT-1(config)# vlt domain 1
VLT-1(conf-vlt-1)# exit
```

#### 3. Configure VLTi interfaces on each VLT peer

> **NOTE** Dell did not mention any specific requirements for the interfaces used for VLTi. They just insist on deploying more than one as best practice. Also, if you're reading this *after* reading my stesp for OS10 . . . This is quite a bit different.

```bash
VLT-1(conf)# interface range TenGigabitEthernet 1/8, TenGigabitEthernet 1/9
VLT-1(conf-if-range-te-1/8,te-1/9)# no shutdown
VLT-1(conf-if-range-te-1/8,te-1/9)# exit
VLT-1(conf)# interface port-channel 1000
VLT-1(conf-if-po-100)# no ip address
VLT-1(conf-if-po-100)# no shutdown
VLT-1(conf-if-po-100)# channel-member TenGigabitEthernet 1/8,9
VLT-1(conf-if-po-100)# exit
VLT-1(conf-if-range-te-1/8,te-1/9)# exit
VLT-1(conf)# 
```

#### 4. (Optional, but recommended) Manually configure the same default VLT MAC address on each VLT peer

This minimizes the time required to sync the default MAC of the VLT domain on both peers when one reboots

```bash
VLT-1(conf)# vlt domain 1
VLT-1(conf-vlt-1)# system-mac C2:AC:50:08:FE:D9
```

#### 5. Configure VLT heartbeat backup link on each VLT peer

> Dell [recommends using the OOB management network connection for the VLT backup link](https://www.dell.com/support/manuals/en-us/dell-emc-smartfabric-os10/smartfabric-os-user-guide-10-5-3/configure-the-vlt-peer-liveliness-check?guid=guid-d140525e-19a1-4d53-8334-e7ec196a9da1&lang=en-us).
>
> The backup destination is the IP address of the peer that is not the local switch.

*VLT Peer 1*:

```bash
VLT-1(conf-vlt-1)# backup destination 10.1.1.2
```

*VLT Peer 2*:

```bash
VLT-2(conf-vlt-1)# backup destination 10.1.1.1
```

#### 6. Configure VLT port channels (LAGs) between each VLT peer and attached devices

```bash
VLT-2(conf)# interface TenGigabit 1/1
VLT-2(conf-if-te-1/1)# port-channel-protocol LACP
VLT-2(conf-if-te-1/1-lacp)# port-channel 10 mode active
VLT-2(conf-if-te-1/1-lacp)# interface port-channel 10
VLT-2(conf-if-po-10)# portmode hybrid
VLT-2(conf-if-po-10)# switchport
VLT-2(conf-if-po-10)# vlt-peer-lag port-channel 10
VLT-2(conf-if-po-10)# end
```

> These steps should be repeated on both VLT peers. The device connected across this LAG should setup in a LACP LAG.  The device will not be aware it's connected to a VLT port-channel, it will perform like it's connected to a normal LACP port-channel.
