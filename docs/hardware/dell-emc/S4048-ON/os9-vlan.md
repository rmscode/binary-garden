# VLAN Configuration

!!! question "VLAN `shutdown` or `no shutdown`?"

    When you run `show config` in INTERFACE VLAN mode you'll notice that VLANs are `shutdown` by default. A VLAN is active only if the VLAN contains interfaces and those interfaces are operationally up. In a VLAN, the shutdown command stops Layer 3 (routed) traffic only. Layer 2 traffic continues to pass through the VLAN. If the VLAN is not a routed VLAN (that is, configured with an IP address), the shutdown command has no affect on VLAN traffic. [Source](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/creating-a-port-based-vlan?guid=guid-d005bab1-b190-48cc-970e-4697f241121f&lang=en-us)

## Switchport (Layer 2) mode

!!! info

    To add an interface to a VLAN, the interface must be in Layer-2 mode (`switchport`). After you place an interface in Layer-2 mode, the interface is automatically designated untagged for the Default VLAN (1). When a port is in Layer-2 mode, it passes multiple tagged VLANs, *OR* one untagged VLAN. It cannot accept both untagged and tagged traffic. To do that, you need to configure the port in [hybrid switchport mode](#hybrid-switchport-mode).

To configure `switchport`:

```shell
DellEMC# configure
DellEMC(conf)# Interface TenGigabitEthernet 1/5
DellEMC(conf-if-te-1/5)# switchport
```

!!! note "Resetting an interface to factory defaults"

    To configure `switchport` mode, make sure any existing configuration on the interface is removed. For instance, the system does not allow you to configure `switchport` on an interface that is assigned an IP address, as the interface is already in Layer 3 mode (`no switchport`).

    To reset an interface to its factory defaults, use the default `interface command` eg. `default interface TenGigabitEthernet 1/5`.

## Hybrid switchport mode

!!! info

    This allows a port to accept both untagged *and* tagged traffic. A hybrid switchport may have one untagged VLAN and multiple tagged VLANs.

To configure hybrid `switchport`:

```shell
DellEMC# configure
DellEMC(conf)# Interface TenGigabitEthernet 0/5
DellEMC(conf-if-te-1/5)# portmode hybrid
DellEMC(conf-if-te-1/5)# switchport
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
DellEMC(conf-if-vl-414)# untagged TenGigabitEthernet 1/5
```

!!! note

    To add a port-channel - `untagged port-channel 414`.

## Simulate a Trunk Port

`Interface range Vlan 2-4094` allows you to add all existing VLANs to an interface to simulate a Trunk port without creating excess configuration. This command does not create new VLANs.

## Remove VLANs from Interfaces

To remove a VLAN from an interface use the `no tagged` and `no untagged` commands:

!!! note

    The `no tagged` and `no untagged` commands remove tagged or untagged interfaces from a port-based VLAN and places it in the default VLAN (1). You cannot use these commands in the Default VLAN. The only way to remove an interface from the default VLAN is to place the interface in default mode by using the `no switchport` command in INTERFACE mode. 

```shell
DellEMC(conf-if-vl-414)# no tagged te1/5-10
```

## Inter-VLAN Routing

!!! note "WIP...I was able to configure inter-vlan routing between two switches in OS10, but I need to look up the commands for OS9. You can see my notes on inter-vlan routing and OS10 [here](../../../notes/2024.md#f-03082024)."

## Useful `show` commands

| Command                           | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| `show vlan`                       | Shows the existing VLANs and their ports        |
| `show run interface te0/5`        | Shows configuration of Interface te0/5          |
| `show run interface vlan 414`     | Shows configuration of VLAN 414                 |
| `show interface switchport te0/5` | Shows the tagged and untagged VLANs on a port   |

[*Reference*](https://www.dell.com/support/kbdoc/en-us/000119270/dell-emc-networking-how-to-configure-vlans-and-associate-ports-to-vlans-on-os9-ftos)
