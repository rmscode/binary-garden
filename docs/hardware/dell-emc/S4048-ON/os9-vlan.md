# VLAN Configuration

!!! question "VLAN `shutdown` or `no shutdown`?"

    When you run `show config` in INTERFACE VLAN mode you'll notice that VLANs are `shutdown` by default. A VLAN is active only if the VLAN contains interfaces and those interfaces are operationally up. In a VLAN, the shutdown command stops Layer 3 (routed) traffic only. Layer 2 traffic continues to pass through the VLAN. If the VLAN is not a routed VLAN (that is, configured with an IP address), the shutdown command has no affect on VLAN traffic. [Source](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/creating-a-port-based-vlan?guid=guid-d005bab1-b190-48cc-970e-4697f241121f&lang=en-us)

## Switchport (Layer 2) mode

!!! info

    To add an interface to a VLAN, the interface must be in Layer 2 mode. After you place an interface in Layer 2 mode, the interface is automatically placed in the Default VLAN (1). When a port is in `switchport` mode (Layer 2), it passes multiple VLANs, *OR* one untagged VLAN. It cannot accept both untagged and tagged traffic. To do that, you need to configure the port in `hybrid` mode (see below). [Source](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/vlans-and-port-tagging?guid=guid-397912b0-60b7-46bc-ab62-417d337e3cc2&lang=en-us)

To configure `switchport`:

```shell
DellEMC# configure
DellEMC(conf)# Interface TenGigabitEthernet 0/5
DellEMC(conf-if-te-0/5)# switchport
```

!!! note

    To configure switchport mode, make sure any existing configuration on the interface is removed. For instance, the system does not allow you to configure switchport on an interface that is assigned an IP address, as the interface is already in Layer 3 mode (`no switchport`).

## Hybrid switchport mode

!!! info

    In hybrid `switchport` mode, the interface may pass both untagged and tagged VLANs.

To configure hybrid `switchport`:

```shell
DellEMC# configure
DellEMC(conf)# Interface TenGigabitEthernet 0/5
DellEMC(conf-if-te-0/5)# portmode hybrid
DellEMC(conf-if-te-0/5)# switchport
```

## Creating VLANs and Adding Interfaces

First, create the VLAN:

```shell
DellEMC# configure
DellEMC(conf)# Interface Vlan 414 #(1)
```

1. `414` is the VLAN ID. This number can be anythig from 2 to 4094. VLAN 1 is the default VLAN.

Next, add the interfaces (`tagged` or `untagged`):

```shell
DellEMC(conf-if-vl-414)# untagged TenGigabitEthernet 0/5
```

!!! note

    You can also add VLANs to port-channels the same way - eg. `untagged port-channel 414`.

Apply multiple VLANs to an interface:

```shell
DellEMC# configure
DellEMC(conf)# interface range Vlan 414 – 515
% Warning: interface-range ignores Non-existing ports (not configured).    #(1)
```

1. This warning message is stating that within the range of 414 to 515, only the VLANs we have already created are configured. This is useful for creating a link to a Trunk Cisco port. 

Apply a VLAN to a range of interfaces:

```shell
DellEMC(conf-if-vl-414)# tagged te0/5-10
```

## Simulate a Trunk Port

`Interface range Vlan 2-4094` allows you to add all existing VLANs to an interface to simulate a Trunk port without creating excess configuration. This command does not create new VLANs.

## Remove VLANs from Interfaces

To remove a VLAN from an interface use the `no tagged` and `no untagged` commands:

!!! note

    The `no tagged` and `no untagged` commands remove tagged or untagged interfaces from a port-based VLAN and places it in the default VLAN (1). You cannot use these commands in the Default VLAN. The only way to remove an interface from the default VLAN is to place the interface in default mode by using the `no switchport` command in INTERFACE mode. 

```shell
DellEMC(conf-if-vl-414)# no tagged te0/5-10
```

## Inter-VLAN Routing

**WIP...**

Dell EMC Networking OS supports inter-VLAN routing (Layer 3). To enable this, you must assign IP addresses to VLANs interfaces.

A consideration for including VLANs in routing protocols is that you must configure the `no shutdown` command on the VLAN interface.

Giving IP addresses to VLANs:

```shell
DellEMC# configure
DellEMC(conf)# Interface Vlan 10
DellEMC(conf-if-vl-10)# ip address 192.168.10.250/24 <secondary> #(1)
DellEMC(conf-if-vl-10)# no shutdown
DellEMC(conf-if-vl-10)# exit
```

1. Optionally, you can configure up to eight secondary IP addresses.

!!! info "See IPv4 Routing to continue with inter-VLAN routing"

## Useful `show` commands

| Command                           | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| `show vlan`                       | Shows the existing VLANs and their ports        |
| `show run interface te0/5`        | Shows configuration of Interface te0/5          |
| `show run interface vlan 414`     | Shows configuration of VLAN 414                 |
| `show interface switchport te0/5` | Shows the tagged and untagged VLANs on a port   |

[*Reference*](https://www.dell.com/support/kbdoc/en-us/000119270/dell-emc-networking-how-to-configure-vlans-and-associate-ports-to-vlans-on-os9-ftos)





# (WIP) IPv4 Routing

Configurations Tasks:

- Assign an IP address to an interface
- Configure a static route

## Assigning IP Addresses to an Interface

Assign primary and secondary IP addresses to physical or logical (VLAN or port channel) interfaces to enable IP communication between the system and hosts connected to that interface. 

You can assign one primary IP address and up to 255 secondary IP addresses to each interface.

```shell
DellEMC# configure
DellEMC(conf)# interface TenGigabitEthernet 1/5 #(1)
DellEMC(conf-if-te-1/5)# no shutdown #(2)
DellEMC(conf-if-te-1/5)# ip address 192.168.10.2/24 #(3)
```

1. Remember, this can be a VLAN or port channel interface as well.
2. Enable the interface.
3. To add a secondary IP address include the `secondary` keyword at the end of the command.

## Configuring Static Routes

Static routes are configured manually and not learned by the routing protocol. They are typically used as backup routes in case other dynamically learned routes are unreachable.

Configure a static IP address:

the ip route syntax is `{ip | ipv6} route [vrf vrf-name] ip-address mask {ip-address | interface [ip-address]} [distance] [name description] [permanent] [tag tag-value] [vrf vrf-name] [weight weight-value]`. {} = mandatory, [] = optional, | = or.

```shell
DellEMC# configure
DellEMC(conf)# ip route 199.1.1.0 /24 vlan 100 name "Uplink To NewYork" #(1)

```

1. The syntax here is 