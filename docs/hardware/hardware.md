# Dell EMC Networking

## OS9

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
DellEMC(conf)# interface port-channel 100
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
DellEMC(conf-vlt-1)# peer-link port-channel 100
DellEMC(conf-vlt-1)# primary-priority 1
DellEMC(conf-vlt-1)# exit
```

#### 4. To improve convergence, configure the same default VLT MAC address on both peers. This is optional, but recommended

```bash
DellEMC(conf)# vlt domain 1
DellEMC(conf-vlt-1)# system-mac mac-address 00:11:22:33:44:55
```

#### 6. Confirm the state of the VLT domain

```shell
DellEMC# show vlt brief
DellEMC# show vlt statistics
DellEMC# show vlt backup-link
DellEMC# show interface port-channel 100
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

> **NOTE** Form a link aggregation with the interfaces of the upstream switch that are connected to the VLT domain's port-channel. If this is another Dell switch, you can create a port-channel in the same way as shown above excluding the `vlt-peer-lag` command.

### Upgrading the Firmware

OS9 switches have two boot banks, A and B. It's good practice to upload new frmware into on boot bank and keep the old firmware in the other in case you need to roll back.

#### 1. Make a copy of the running configuration

```shell
DellEMC> enable
DellEMC# copy startup-config tftp://10.1.1.25/OS9_Switch-A.conf
```

#### 2. Upload the new firmware to image B

```shell
DellEMC# upgrade system tftp://10.1.1.25/FTOS-SK-9.14.bin b: 
```

#### 3. Change active boot bank and reload

```shell
DellEMC# configure
DellEMC(conf)# boot system stack-unit 1 primary system b:
DellEMC(conf)# exit
DellEMC# reload
```

### Flow control for iSCSI

To avoid dropping packets during heavy utilization, enable flow control on the interfaces connected to iSCSI storage.

```shell
DellEMC(conf)# interface range Te1/1,2,3,4
DellEMC(conf-if-range-te-1/1,2,3,4)# flowcontrol rx on tx on
```

## OS10

When labbing in GNS3, it takes quite a bit a time for the OS10 appliances to boot the first time. Be patient. Login with linuxadmin/linuxadmin and then logout. Skipping this will result in an "incorrect login" notice when trying to login to the default admin/admin. I have no idea why that is...

[This](https://sharifulhoque.blogspot.com/2021/07/stacking-switches-part-vi-dell-os10-vlt.html) was a helpful companion to the [Dell VLT docs](https://www.dell.com/support/manuals/en-us/dell-emc-smartfabric-os10/smartfabric-os-user-guide-10-5-3/configure-vlt?guid=guid-d858a76d-b0ed-46ce-a7dd-0624235d92bc&lang=en-us).

The switch I used for the VLT peers and access switch in this lab - "Dell OS10 S5248F-10.5.6.0.47".

> **NOTE** The default QEMU adapter count in the appliance's settings is 10. I tried to expand this to 57 get the full range of the appliance's interfaces (1/1/1-1/1/56), but the appliance failed to boot. I left it at 10 and just used the first 10 interfaces (1x mgmt, 9x eth).

### Setting the hostnames

VLT Peer 1

```bash
OS10# configure
OS10(config)# hostname VLT-1
VLT-1(config)#
```

VLT Peer 2

```bash
OS10# configure
OS10(config)# hostname VLT-2
VLT-2(config)#
```

Access switch

```bash
OS10# configure
OS10(config)# hostname ACCESS
ACCESS(config)#
```

### OOB management Interface Configuration

```bash
VLT-1# configure
VLT-1(config)# interface mgmt 1/1/1
VLT-1(conf-if-ma-1/1/1)# no ip address dhcp
VLT-1(conf-if-ma-1/1/1)# ip address 10.1.1.1/24
VLT-1(conf-if-ma-1/1/1)# exit
VLT-1(config)# exit
VLT-1# show running-configuration interface mgmt 1/1/1
!
interface mgmt1/1/1
 no shutdown
 no ip address dhcp
 ip address 10.1.1.1/24
 ipv6 address autoconfig
VLT-1#
```

> I set VLT-2 to 10.1.1.2

### VLT Configuration

#### 1. Enable STP globally on each VLT peer

```bash
VLT-1# configure
VLT-1(config)# spanning-tree mode rstp
```

#### 2. Create a VLT domain on each VLT peer

> The VLT domain requires an ID number (1-255). Configure the same ID on both peers.

```bash
VLT-1(config)# vlt-domain 1
VLT-1(conf-vlt-1)# exit
```

#### 3. Configure VLTi interfaces on each VLT peer

> Before you configure the VLTi on peer interfaces, remove each interface from L2 mode with `no switchport`. This is shown below.

> **NOTE** Dell did not mention any specific requirements for the interfaces used for VLTi. They just insist on deploying more than one as best practice.

```bash
VLT-1(config)# interface ethernet 1/1/8
VLT-1(conf-if-eth1/1/9)# no switchport
VLT-1(conf-if-eth1/1/9)# exit
VLT-1(config)# interface ethernet 1/1/9
VLT-1(conf-if-eth1/1/9)# no switchport
VLT-1(conf-if-eth1/1/9)# exit
VLT-1(config)# vlt-domain 1
VLT-1(conf-vlt-1)# discovery-interface ethernet 1/1/8-1/1/9
```

#### 4. (Optional) Manually configure the same default VLT MAC address on each VLT peer. This minimizes the time required to sync the default MAC of the VLT domain on both peers when one reboots

> While configuring a VLT MAC address, if the 8th bit of the MAC address is a 1, then the MAC address is considered to be a multicast MAC address. There are locally defined MAC addresses. For these addresses, the second least significant bit in the first byte must be a 1, which signifies a locally defined address.
>
>The correct MAC addresses must have xxxxxx10 bits set in the first octet, such as x2, x6, xA, xE, and so on.
>
> I fed that information to Chat-GPT to generate a MAC address for me.

```bash
VLT-1(conf-vlt-1)# vlt-mac C2:AC:50:08:FE:D9
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

It was at this point that I linked eth 1/1/8-1/1/9 of each switch together. VLT Peer 1 immediately recognized both links and indicated that "VLT unit 2 is up" and that "VLT interconnect link between unit 1 and unit 2 is up". However, when I checked the status of the heartbeat link, it was down. This made sense. The backup links couldn't communicate with eachother because they weren't physically connected to a network. For the purposes of this lab, I directly connected the two interfaces together. In a production environment, the heart beat will traverse the management network the interfaces are connected to.

```bash
VLT-1(conf-vlt-1)# exit
VLT-1(config)# show vlt 1 backup-link
VLT Backup Link
------------------------
Destination                    : 10.1.1.2
Peer Heartbeat status          : Down
Heartbeat interval             : 30
Heartbeat timeout              : 90
Destination VRF                : default

**Connected the management interfaces of each VLT peer together**

VLT-1(config)#<165>1 2023-11-01T16:40:15.610812+00:00 VLT-1 dn_alm 687 - - Node.1-Unit.1:PRI [event], Dell (OS10) %VLT_HB_UP: VLT peer heartbeat link is up
VLT-1(config)# show vlt 1 backup-link
VLT Backup Link
------------------------
Destination                    : 10.1.1.2
Peer Heartbeat status          : Up    
Heartbeat interval             : 30
Heartbeat timeout              : 90
Destination VRF                : default
```

> **BE ADVISED** Upon this successful VLT-peer formation; the switches automatically created a non-configurable *port-channel 1000* interface consisting of our VLTi interfaces and *VLAN 4094*. Each are reserved for internal VLT communication.

#### 6. Configure VLT port channels (LAGs) between each VLT peer and attached devices

> Remember, *port channel 1000* is reserved. Port channel IDs can be any number between *1 to 999* or *1001 to 2000*.

```bash
VLT-1(conf-vlt-1)# exit
VLT-1(confg)# interface port-channel 10   <-Creating the port channel
VLT-1(conf-if-po-10)# no shutdown
VLT-1(conf-if-po-10)# vlt-port-channel 10   <-Enabling VLT on the port channel
VLT-1(conf-if-po-10)# exit
VLT-1(confg)# interface ethernet 1/1/1
VLT-1(conf-if-eth1/1/1)# channel-group 10 mode active   <-Assigning port channel to interface
VLT-1(conf-if-eth1/1/1)# exit
VLT-1(config)#
```

A port-channel was also added to the access switch on interfaces eth 1/1/1 and 1/1/2...

#### 7. Verification

```bash
VLT-1(config)# exit
VLT-1# show vlt 1 vlt-port-detail
vlt-port-channel ID : 10
VLT Unit ID    Port-Channel      Status    Configured ports    Active ports
-------------------------------------------------------------------------------
* 1            port-channel10     up        1                   0
  2            port-channel10     up        1                   0
```

> The asterisk indicates what VLT peer I am currently logged into.

I started a ping from a client PC connected to the access switch to a NIC Teamed server connected to the VLT domain. I then suspended various links between the access switch, server and VLT domain. The pings dropped 1-2 times at most before resuming in each case. 

I also killed each of the VLT peers. For each peer failure test, the pings initially dropped everyother 2 packets for about 90 seconds and then traffic resumed normally. That convergence time can be reduced by adjusting the heartbeat interval and timeout values. We would have to do some real world testing to determine what values would be appropriate for our environment . . . in GNS3, the vlt debug info showed that the failover completed in about 30 seconds.

### Notes

List port groups and their members. This will show the full range, port grouping and speed of all the interfaces on the switch.

```bash
VLT-1# show port-group

Port-group            Mode           Ports     FEM
port-group1/1/1       Eth 25g-4x     1  2  3  4     -
port-group1/1/2       Eth 25g-4x     5  6  7  8     -
port-group1/1/3       Eth 25g-4x     9  10  11  12     -
port-group1/1/4       Eth 25g-4x     13  14  15  16     -
port-group1/1/5       Eth 25g-4x     17  18  19  20     -
port-group1/1/6       Eth 25g-4x     21  22  23  24     -
port-group1/1/7       Eth 25g-4x     25  26  27  28     -
port-group1/1/8       Eth 25g-4x     29  30  31  32     -
port-group1/1/9       Eth 25g-4x     33  34  35  36     -
port-group1/1/10      Eth 25g-4x     37  38  39  40     -
port-group1/1/11      Eth 25g-4x     41  42  43  44     -
port-group1/1/12      Eth 25g-4x     45  46  47  48     -
port-group1/1/13      Eth 100g-2x    49  50     -
port-group1/1/14      Eth 100g-2x    51  52     -
port-group1/1/15      Eth 100g-1x    53         -
port-group1/1/16      Eth 100g-1x    54         -
port-group1/1/17      Eth 100g-1x    55         -
port-group1/1/18      Eth 100g-1x    56         -

```

I misconfigured a port channel on the access switch connected to the VLT domain and needed to figure out how to remove/undo the settings. This is how I did it:

```bash
ACCESS(config)# interface ethernet 1/1/2
ACCESS(conf-if-eth1/1/2)# show configuration
!
interface ethernet1/1/2
 no shutdown
 channel-group 20 mode active    <- This is what I needed to remove
 no switchport
 flowcontrol receive off
ACCESS(conf-if-eth1/1/2)# no channel-group    <- Used no command to remove
ACCESS(conf-if-eth1/1/2)# show configuration
!
interface ethernet1/1/2
 no shutdown
 switchport access vlan 1
 flowcontrol receive off
```

**Orphan port** - I saw this in the Dell docs a few times an had no idea what it referred to. Whenever they use that term, they are making reference to a port that is NOT part of a VLT port-channel (LAG).

**Upstream member** - Typically the top of rack switch that connects to the VLT domain.

**Downstream member** - The device on the other side of the VLT domain...typically a server.

So, in our GNS3 lab . . . The switch labeled "Access" is the upstream member and the "Server" is the downstream member. The client PC is connected to the access switch via an orphan port.

**What is looks like in one go**:

```bash
OS10# configure terminal
OS10(config)# hostname VLT-2
VLT-2(config)# interface mgmt 1/1/1
VLT-2(conf-if-ma-1/1/1)# show configuration
!
interface mgmt1/1/1
 no shutdown
 ip address dhcp
 ipv6 address autoconfig
VLT-2(conf-if-ma-1/1/1)# no ip address dhcp
VLT-2(conf-if-ma-1/1/1)# ip address 10.1.1.2/24
VLT-2(conf-if-ma-1/1/1)# no shutdown
VLT-2(conf-if-ma-1/1/1)# copy running-configuration startup-configuration
VLT-2(conf-if-ma-1/1/1)# exit
VLT-2(config)# spanning-tree mode rstp
VLT-2(config)# vlt-domain domain 1
VLT-2(config)# vlt-domain 1
VLT-2(conf-vlt-1)# exit
VLT-2(config)# interface ethernet 1/1/8
VLT-2(conf-if-eth1/1/8)# no switchport
VLT-2(conf-if-eth1/1/8)# exit
VLT-2(config)# interface ethernet 1/1/9
VLT-2(conf-if-eth1/1/9)# no switchport
VLT-2(conf-if-eth1/1/9)# exit
VLT-2(config)# vlt-domain 1
VLT-2(conf-vlt-1)# discovery-interface ethernet 1/1/8-1/1/9
VLT-2(conf-vlt-1)# vlt-mac C2:AC:50:08:FE:D9
VLT-2(conf-vlt-1)# backup destination 10.1.1.1
VLT-2(conf-vlt-1)# exit
VLT-2(config)# interface port-channel 10
VLT-2(conf-if-po-10)# no shutdown
VLT-2(conf-if-po-10)# vlt-port-channel 10
VLT-2(conf-if-po-10)# exit
VLT-2(config)# interface ethernet 1/1/1
VLT-2(conf-if-eth1/1/1)# channel-group 10 mode active
VLT-2(conf-if-eth1/1/1)# exit
VLT-2(config)#
```
