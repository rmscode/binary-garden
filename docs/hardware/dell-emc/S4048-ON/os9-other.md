# Other...

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

## Flow control for iSCSI

To avoid dropping packets during heavy utilization, enable flow control on the interfaces connected to iSCSI storage.

```shell
DellEMC(conf)# interface range Te1/1,2,3,4
DellEMC(conf-if-range-te-1/1,2,3,4)# flowcontrol rx on tx on
```

## Auto lock configuration mode

You can configure the switch to automtically lock configuration mode for other users while you are making changes. This prevents other users from making changes while you are working. This is useful for preventing configuration conflicts.

```shell
configuration mode exclusive auto
```

## Limit concurrent sessions

```shell
login concurrent-session limit 1
```

## Telnet to another network device

In certain scenarios, this might be quicker than starting a another SSH session in Putty . . .

```shell
DellEMC# telnet <ip address>
```

## Port Monitoring

Allows you to mirror traffic of one port to another. This is useful for analyzing traffic with a packet capture tool like Wireshark. You also have the ability to remotely monitor a port. In a remote port monitoring session, monitored traffic is tagged with a VLAN ID and switched on a user-defined, non-routable L2 VLAN. Allowing you to sniff from a distance.

```shell
DellEMC(conf)# monitor session 0
DellEMC(conf-mon-sess-0)# $source te 1/1 dest te 1/2 dir rx
```

## Obscuring passwords and keys

I find it kind of odd that this isn't a default settings...

To obscure passwords and keys when the configuration is displayed, use the following command:

```shell
service obscure-passwords
```

## Restore Factory Default Settings

Restoring the factory-default settings deletes the existing NVRAM settings, startup configuration, and all configured settings such as, stacking or fanout.

!!! warning "There is no undo for this command."

```shell
DellEMC# restore factory-defaults stack-unit 1 nvram
```

## DHCP

<https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/dynamic-host-configuration-protocol-dhcp?guid=guid-cdaee30b-f975-4f83-8c8b-60bedb2ede55&lang=en-us>

## Resetting Interface to Factory Settings

<https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/resetting-an-interface-to-its-factory-default-state?guid=guid-6b9ffa44-65a0-40d6-a773-fe0fd9392080&lang=en-us>

## Shared LAG State Tracking

<https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.8-config-pub/shared-lag-state-tracking?guid=guid-2a2ff54f-ce72-48dd-8496-356fc943ed4f&lang=en-us>