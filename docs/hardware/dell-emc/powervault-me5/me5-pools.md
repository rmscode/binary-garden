---
status: new
---

# Pools and Disk Groups

A pool is an aggregation of one or more disk groups that serves as a container for volumes. Virtual and linear storage systems both use pools. 

A disk group is a group of disks of the same type, using a specific RAID level that is incorporated as a component of a pool, that stores volume data. 

In both virtual and linear storage, if the owning controller fails, the partner controller assumes temporary ownership of the pool and resources owned by the failed controller. If a fault-tolerant cabling configuration, with appropriate mapping, is used to connect the controllers to hosts, LUNs for both controllers are accessible through the partner controller so I/O to volumes can continue without interruption.

All disks in a disk group must be the same type e.g. enterprise SAS or midline SAS.

## Disk Groups

### Add a Disk Group

In the **Maintenance > Storage** panel, in the pool where you want to add the disk group, click Add Disk Group and follow the
on-screen instructions.

If your disk group contains both 512n and 512e disks, a dialog box appears. Perform one of the following:
    - To create the disk group, click **Yes**.
    - To cancel the request, click **No**.

??? question "What is the difference between a 512n and 512e disk?"

    [The difference is sector size. 512n is 512 byte sector size. 512e is a 4K byte sector size.](https://community.spiceworks.com/topic/2108347-what-is-the-difference-between-512n-and-512e) 

### Renaming Virtual Disk Groups

In the **Maintenance > Storage** panel, locate the disk group to rename, display its slide-over panel, click the pencil icon and follow the
on-screen directions.

### Modify the Drive Spin Down Feature

The Disk Properties panel (**Settings > System > Properties > Disk Properties**) provides options to do the following:

- Enable disk monitoring and failure analysis (SMART)
- Change polling frequency to alert you to temperature changes, power supply and fan status, and the presence or absence of disks
- Enable dynamic spare capability
- Enable disk spin down (DSD)

### Removing Disk Groups

In the **Maintenance > Storage** panel, locate the disk group to delete, click the trash can icon, and follow the on-screen directions. 

!!! note

    Removing all disk groups within a pool will also trigger the automatic removal of the associated pool. 

### Expanding ADAPT Disk Groups

In the **Maintenance > Storage** panel, locate the disk group to verify, display its slide-over panel, click Expand Disk Group, and follow the on-screen directions.

### Scrub a Disk Group

!!! info

    A scrub analyzes the selected disk group to find and fix disk errors. A scrub can last over an hour, depending on the size of the disk group, the utility priority, and the amount of I/O activity.

In the **Maintenance > Storage** panel, locate the disk group to scrub, display its slide-over panel, click Scrub Disk Group, and follow the on-screen directions. To cancle the scrub, click the blue X.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/storage-panel?guid=guid-ffe9d51d-ff4a-41d9-a3bb-b11e354d7c63&lang=en-us)