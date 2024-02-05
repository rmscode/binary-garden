# VLAN Configuration

## Switchport mode

!!! info

    When a port is in `switchport` mode (Layer 2), it passes multiple VLANs, or one untagged VLAN. It cannot accept both untagged and tagged traffic.

To configure `switchport`:

```shell
DellEMC# configure
DellEMC(conf)# Interface TenGigabitEthernet 0/5
DellEMC(conf-if-te-0/5)# switchport
```

!!! note

    To configure switchport mode, make sure any existing configuration on the interface is removed. For instance, the system does not allow you to configure switchport on an interface that is assigned an IP address, as the interface is already in Layer 3 mode.

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

## Creating VLANs

To add a VLAN to an interface untagged, input the following commands:

```shell
DellEMC# configure
DellEMC(conf)# Interface Vlan 414
DellEMC(conf-if-vl-414)# untagged TenGigabitEthernet 0/5
```

!!! note

    You can also add VLANs to port-channels the same way - eg. `untagged port-channel 10`.

To add a VLAN to an interface tagged (802.1Q), input the following commands:

```shell
DellEMC(conf-if-vl-414)# tagged TenGigabitEthernet 0/9
```

To apply multiple VLANs to an interface:

```shell
DellEMC# configure
DellEMC(conf)# interface range Vlan 414 – 515
% Warning: interface-range ignores Non-existing ports (not configured).    #(1)
```

1. This error message is stating that within the range of 414 to 515, only the VLANs we have already created are configured. This is useful for creating a link to a Trunk Cisco port. Interface range Vlan 2-4094 allows you to add all existing VLANs to an interface to simulate a Trunk port without creating excess configuration. This command does not create new VLANs.

To apply the VLAN to a range of interfaces:

```shell
DellEMC(conf-if-vl-414)# tagged te0/5-10
```

To remove the VLAN from the interface:

!!! note

    The `no tagged` and `no untagged` commands remove tagged or untagged interfaces from a port-based VLAN and places it in the default VLAN (1). You cannot use these commands in the Default VLAN. The only way to remove an interface from the default VLAN is to place the interface in default mode by using the `no switchport` command in INTERFACE mode. 

```shell
DellEMC(conf-if-vl-414)# no tagged te0/5-10
```

!!! info "VLAN `shutdown` or `no shutdown`?"

    A VLAN is active only if the VLAN contains interfaces and those interfaces are operationally up. In a VLAN, the shutdown command stops Layer 3 (routed) traffic only. Layer 2 traffic continues to pass through the VLAN. If the VLAN is not a routed VLAN (that is, configured with an IP address), the shutdown command has no affect on VLAN traffic. [Source](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/creating-a-port-based-vlan?guid=guid-d005bab1-b190-48cc-970e-4697f241121f&lang=en-us)


## Useful `show` commands

| Command                           | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| `show vlan`                       | Shows the existing VLANs and their ports        |
| `show run interface te0/5`        | Shows configuration of Interface te0/5          |
| `show run interface vlan 414`     | Shows configuration of VLAN 414                 |
| `show interface switchport te0/5` | Shows the tagged and untagged VLANs on a port   |

[*Reference*](https://www.dell.com/support/kbdoc/en-us/000119270/dell-emc-networking-how-to-configure-vlans-and-associate-ports-to-vlans-on-os9-ftos)