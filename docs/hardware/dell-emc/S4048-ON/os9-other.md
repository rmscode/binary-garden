# Other...

## Auto lock configuration mode

Dell OS9 allows multiple users to make configuration changes at the same time. You can lock configuration mode so that only one user can be in configuration mode at any time.

```shell
configuration mode exclusive auto
```

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.8-config-pub/lock-configuration-mode?guid=guid-f9f1cc49-2114-4ef0-b9b9-c190125978dc&lang=en-us)

## Configuring MTU Size (Jumbo Frames)

!!! info "Jumbo Frames + SAN"

    Jumbo frames are Ethernet frames with more that 1500 bytes of payload. The MTU range on the S4048 is from 592 to 9216, with the default being 9216 (Jumbo). They must be correctly enabled throughout an entire iSCSI SAN from the NICs, Switches, and storage array ports, otherwise, behavior may be inconsistent. For guidance on what MTU size to set on the S4048 in conjunction with the PowerVault ME4 series storage array, see [this section](../powervault-me4/me4-best-practice.md#enable-jumbo-frames).

If a packet includes a Layer 2 header, the difference in bytes between the link MTU and IP MTU must be enough to include the Layer 2 header. 

For example, for VLAN packets, if the IP MTU is 1400, the Link MTU must be no less than 1422: *1400-byte IP MTU + 22-byte VLAN Tag = 1422-byte link MTU*

The following table lists the various Layer 2 overheads.

| Layer 2 Overhead                       | Difference between Link MTU and IP MTU
| -------------------------------------- | --------------------------------------
| Ethernet (untagged)	                 | 18 bytes
| VLAN Tag	                             | 22 bytes
| Untagged Packet with VLAN-Stack Header | 22 bytes
| Tagged Packet with VLAN-Stack Header	 | 26 bytes

Port Channels:

- All members must have the same link MTU value and the same IP MTU value.
- The port channel link MTU and IP MTU must be less than or equal to the link MTU and IP MTU values configured on the channel members.

VLANs:

- All members of a VLAN must have the same IP MTU value.
- Members can have different Link MTU values. Tagged members must have a link MTU 4–bytes higher than untagged members to account for the packet tag.
- The VLAN link MTU and IP MTU must be less than or equal to the link MTU and IP MTU values configured on the VLAN members.

Verify MTU status:

```shell
DellEMC# show interfaces TenGigabitEthernet 1/1
TenGigabitEthernet 1/1 is down, line protocol is down
Hardware is DellEth, address is 00:01:e8:8b:18:bb
Current address is 00:01:e8:8b:18:bb
Pluggable media not present
Interface index is 17368066
Internet address is not set
Mode of IPv4 Address Assignment : NONE
DHCP Client-ID :0001e88b18bb
MTU 9216 bytes, IP MTU 9198 bytes
```

Edit MTU:

```shell
DellEMC(conf)# interface TenGigabitEthernet 1/1
DellEMC(conf-if-te-1/1)# mtu 1500
```

Return MTU to default value:

```shell
DellEMC(conf-if-te-1/1)# no mtu
```

*[Reference 1](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configure-the-mtu-size-on-an-interface?guid=guid-2c62872c-1387-4fd1-b49c-a990c7e7ddc4&lang=en-us)* </br>
[*Reference 2 - Configuring Jumbo Frames*](https://www.dell.com/support/kbdoc/en-us/000146740/how-to-configure-the-optimal-switch-settings-for-an-ip-based-san)

## DHCP

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/dynamic-host-configuration-protocol-dhcp?guid=guid-cdaee30b-f975-4f83-8c8b-60bedb2ede55&lang=en-us)

### Server

### Relay

## Edgeport/Portfast

Another thing we need to do is enable portfast on all iSCSI ports for the Dell switches. Side note, I [previously took some notes](../../../notes/2024.md#m-03252024) on the two and I was a bit confused about the difference. There is no difference in the way they're configured and they both begin forwarding frames approximately 30 seconds sooner than they would with spanning-tree enabled. However, `edgeport` will lose its portfast status and transition to normal spanning tree operation when it receives a BPDU. Portfast skips listening and learning which makes sense for an iSCSI port...No need for that.

```shell
DELEMC# configure
Dellemc(conf)# interface range TenGigabitEthernet 1/2,8,14,20,26,43-46
Dellemc(conf-if-range)# spanning-tree rstp portfast
```

...*OR* maybe we configure edge-port? This crap is confusing...I've got an [older post](https://www.dell.com/community/en/conversations/networking-general/best-to-disable-spanning-tree-on-iscsi-ports/647f2336f4ccf8a8de725c72) that recommends portfast and then this [Dell doc](https://downloads.dell.com/solutions/storage-solution-resources/PS-Series-Dell-EMC-Networking-S4048-ON-SCG-2018-(SCG1026).pdf) that recommends edge-port on page 10. However, the latter specifically recommends that for PS Series SANs which we do not have. Oh, and it also gives a configuration example that is different from what I've seen before: `spanning-tree port type edge`.

!!! note "While plummeting down this rabbit hole, I remembered [this](../S4048-ON/os9-other.md#rstp-and-vlt). We should either disable spanning tree all together on non-VLT ports and iSCSI ports or place them in edgeport mode. To be completely honest...I'm all for disabling spanning tree on all ports except the VLT portchannel towards the Zyxel switch."

## Flow control for iSCSI

To avoid dropping packets during heavy utilization, enable flow control on the interfaces connected to iSCSI storage.

```shell
DellEMC(conf)# interface range Te1/1,2,3,4
DellEMC(conf-if-range-te-1/1,2,3,4)# flowcontrol rx on tx on
```

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/using-ethernet-pause-frames-for-flow-control?guid=guid-3f29e829-1674-4a4b-8a5a-2605b26678b9&lang=en-us)

## Limit concurrent sessions

```shell
login concurrent-session limit 1
```
[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/limit-concurrent-login-sessions?guid=guid-703ffc14-70d5-48dd-892a-1d139474548a&lang=en-us)

## Obscuring passwords and keys

I find it kind of odd that this isn't a default settings...

To obscure passwords and keys when the configuration is displayed, use the following command:

```shell
service obscure-passwords
```

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/obscuring-passwords-and-keys?guid=guid-c1339ca6-18fb-4d70-ade8-4babcadf4b30&lang=en-us)

## Port Monitoring

Allows you to mirror traffic of one port to another. This is useful for analyzing traffic with a packet capture tool like Wireshark. You also have the ability to remotely monitor a port. In a remote port monitoring session, monitored traffic is tagged with a VLAN ID and switched on a user-defined, non-routable L2 VLAN. Allowing you to sniff from a distance.

```shell
DellEMC(conf)# monitor session 0
DellEMC(conf-mon-sess-0)# $source te 1/1 dest te 1/2 dir rx
```

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/port-monitoring?guid=guid-b6c51807-b1c6-4fea-ab82-6e7b744bb9fb&lang=en-us)

## Resetting Interface to Factory Settings

```shell
DellEMC# configure
DellEMC(conf)# default interface tengigabitethernet 1/1
```

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/resetting-an-interface-to-its-factory-default-state?guid=guid-6b9ffa44-65a0-40d6-a773-fe0fd9392080&lang=en-us)

## Restore Factory Default Settings

Restoring the factory-default settings deletes the existing NVRAM settings, startup configuration, and all configured settings such as, stacking or fanout.

!!! warning "There is no undo for this command."

```shell
DellEMC# restore factory-defaults stack-unit 1 nvram
```

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/restoring-the-factory-default-settings?guid=guid-7026c4b6-93ce-4ad9-afde-a48761718bf5&lang=en-us)

## RSTP and VLT

Virtual link trunking (VLT) provides loop free redundant topologies and does not require RSTP. RSTP can cause temporary port state blocking and may cause topology changes after link or node failures. Spanning tree topology changes are distributed to the entire Layer 2 network, which can cause a network-wide flush of learned MAC addresses and ARP addresses, requiring these addresses to be re-learned. However, enabling RSTP can detect potential loops caused by non-system issues such as cabling errors or incorrect configurations. RSTP is useful for potential loop detection but to minimize possible topology changes after link or node failure, configure it using the following specifications. 

The following recommendations help you avoid these issues and the associated traffic loss caused by using RSTP when you enable VLT on both VLT peers:

- Configure any ports at the edge of the spanning tree’s operating domain as edge ports, which are directly connected to end stations or server racks. Ports connected directly to Layer 3-only routers not running STP should have RSTP disabled or be configured as edge ports.
- Ensure that the primary VLT node is the root bridge and the secondary VLT peer node has the second-best bridge ID in the network. If the primary VLT peer node fails, the secondary VLT peer node becomes the root bridge, avoiding problems with spanning tree port state changes that occur when a VLT node fails or recovers.
- Even with this configuration, if the node has non-VLT ports using RSTP that are not configured as edge ports and are connected to other layer 2 switches, spanning tree topology changes can still be detected after VLT node recovery. To avoid this scenario, ensure that you configure any non-VLT ports as edge ports or have RSTP disabled.

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/rstp-and-vlt?guid=guid-d0d4b874-4515-42ff-aeb4-3bf5843c11ee&lang=en-us)

## Shared LAG State Tracking

Shared LAG state tracking allows you to redirect traffic by bringing down a port channel based on the operational state of another. This is useful for avoiding over-subscribed links that ultimately lead to dropped packets. 

![Shared LAG State Tracking](https://dl.dell.com/topics/s4048-on-9.14.2.8-config-pub/images/GUID-CBA2A11E-AFF3-4DB9-BD2B-BFCF9860E52A-low.jpg)

```shell
DellEMC# configure
DellEMC(conf)# port-channel failover-group
DellEMC(conf-po-failover-grp)# group 1 port-channel 1 port-channel 2
```

!!! tip "To view the failover group configuration, use the `show running-configuration po-failover-group` command."

[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.8-config-pub/shared-lag-state-tracking?guid=guid-2a2ff54f-ce72-48dd-8496-356fc943ed4f&lang=en-us)

## Telnet to another network device

In certain scenarios, this might be quicker than starting a another SSH session in Putty . . .

```shell
DellEMC# telnet <ip address>
```
[Reference](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/using-telnet-to-get-to-another-network-device?guid=guid-8cbdee13-5b35-4b5c-9ed9-b052be26834b&lang=en-us)