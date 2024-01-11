# Best Practices

## Enable Jumbo Frames

!!! note

    The use of Jumbo frames can succeed only if jumbo-frame support is enabled on all network components in the data path (SAN switches, server NICs...).

1. Perform one of the following steps to configure iSCSI ports:
    - In the home topic of the PowerVault manager, select Action > System Settings, then click Ports.
    - In the System topic of the PowerVault Manager, select Action > System Settings, then click Ports.
2. In the Advanced Settings section of the panel, set the options that apply to all iSCSI ports:
    - Enable Jumbo Frames: Enables or disables support for jumbo frames. Allowing for 100 bytes of overhead, a normal frame can contain a 1400-byte payload whereas a jumbo frame can contain a maximum 8900-byte payload for larger data transfers.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/configure-iscsi-ports?guid=guid-9c7ddef3-9cae-4788-b553-dffdc99c4aa6&lang=en-us)

## Pool setup

In a storage system with two controller modules, try to balance the workload of the controllers. Each controller can own one virtual pool. Having the same number of disk groups and volumes in each pool will help balance the workload, increasing performance.

## Disk count per RAID level

The controller breaks virtual volumes into 4-MB pages, which are referenced paged tables in memory. The 4-MB page is a fixed unit of allocation. Therefore, 4-MB units of data are pushed to a disk group. A write performance penalty is introduced in RAID-5 or RAID-6 disk groups when the stripe size of the disk group isn't a multiple of the 4-MB page.

The following table shows recommended disk counts for RAID-6 and RAID-5 disk groups.

!!! note

    Note that parity is actually distributed among all the disks.

| RAID Level | Total Disks | Data Disks (Equivalent) | Parity Disks (Equivalent) |
| ---------  | ----------- | ----------------------- | ------------------------- |
| RAID-6     | 4           | 2                       | 2                         |
|            | 6           | 4                       | 2                         |
|            | 10          | 8                       | 2                         |
| RAID-5     | 3           | 2                       | 1                         |
|            | 5           | 4                       | 1                         |
|            | 9           | 8                       | 1                         |

## Disk groups in a pool

For better efficiency and performance, use similar disk groups in a pool.

- Disk count balance: For example, with 20 disks, it is better to have two 8+2 RAID-6 disk groups than one 10+2 RAID-6 disk group and one 6+2 RAID-6 disk group.
- RAID balance: It is better to have two RAID-5 disk groups than one RAID-5 disk group and one RAID-6 disk group.
- In terms of the write rate, due to wide striping, tiers and pools are as slow as their slowest disk groups.
- All disks in a tier should be the same type. For example, use all 10K disks or all 15K disks in the Standard tier.

Create more small disk groups instead of fewer large disk groups.

- Each disk group has a write queue depth limit of 100. This means that in write-intensive applications this architecture will sustain bigger queue depths within latency requirements.
- Using smaller disk groups will cost more raw capacity. For less performance-sensitive applications, such as archiving, bigger disk groups are desirable.

## Physical port selection

In a system cofigured to use either all FC or all iSCSI ports, use the ports in the following order:

1. A0,B0
2. A2,B2
3. A1,B1
4. A3,B3

The reason for doing so is that each pair of ports (A0,A1 or A2,A3) are connected to a dedicated CNC chip. If you are not using all four ports on a controller, it is best to use one port from each pair (A0,A2) to ensure better I/O balance on the front end.
