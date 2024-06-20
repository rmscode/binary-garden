---
status: new
---

# Spares

Types of spares include:

- Dedicated spare. Reserved for use by a specific linear disk group to replace a failed disk. Most secure way to provide spares for disk groups, but expensive to reserve a spare for each disk group.
- Global spare. Reserved for use by any fault-tolerant disk group to replace a failed disk.
- Dynamic spare. Available compatible disk that is automatically assigned to replace a failed disk in a fault-tolerant disk group.

A controller automatically reconstructs a fault-tolerant disk group (RAID 1, 3, 5, 6, 10, 50) when one or more of its disks fails and a compatible spare disk is available. A disk is compatible if it has enough capacity to replace the failed disk and is the same speed and type (enterprise SAS, for example). It is not advisable to mix 10k and 15k disks in a single disk group. If the disks in the system are FDE-capable and the system is secure, spares must also be FDE-capable.

When a disk fails, the system looks for a dedicated spare first. If it does not find a dedicated spare, it looks for a global spare. If it does not find a compatible global spare and the dynamic spares option is enabled, it takes any available compatible disk. If no compatible disk is available, reconstruction cannot start.

!!! note "ADAPT disk groups do not use global spares or dynamic spares."

## Add/Remove Global Spares

The Spares table (**Maintenance > Storage**) displays a list of current spares, and lets you add and remove global spares for virtual and linear disk groups, and dedicated spares for linear disk groups. The options that display in the panel are dependent upon the type of disk group selected.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/managing-spares?guid=guid-385da225-5e79-4bae-9118-9dfc677f7453&lang=en-us)