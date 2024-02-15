# Pools and Disk Groups

A disk group is an aggregation of disks of the same type, using a specific RAID level that is incorporated as a component of a pool, for the purpose of storing volume data. Disk groups are used in both virtual and linear storage environments. You can add virtual, linear, or read-cache disk groups to a pool.

A pool is an aggregation of one or more disk groups that serves as a container for volumes. Virtual and linear storage systems both use pools. A disk group is a group of disks of the same type, using a specific RAID level that is incorporated as a component of a pool, that stores volume data. For virtual pools, when volumes are added to a pool the data is distributed across the pool's disk groups. For linear pools, which can only have one disk group per pool, volumes are also added to the pool, which contains the volume data.

In both virtual and linear storage, if the owning controller fails, the partner controller assumes temporary ownership of the pool and resources owned by the failed controller. If a fault-tolerant cabling configuration, with appropriate mapping, is used to connect the controllers to hosts, LUNs for both controllers are accessible through the partner controller so I/O to volumes can continue without interruption.

All disks in a disk group must be the same type SSD: enterprise SAS, or midline SAS, For example, a disk group can contain different models of disks, and disks with different capacities and sector formats. If you mix disks with different capacities, the smallest disk determines the logical capacity of all other disks in the disk group, for all RAID levels except ADAPT. For example, the capacity of a disk group composed of one 500 GB disk and one 750 GB disk is equivalent to a disk group composed of two 500 GB disks. To maximize capacity, use disks of similar size.

## Virtual Pools and Disk Groups

The volumes within a virtual pool are allocated virtually and separated into fixed size pages, with each page allocated randomly from somewhere in the pool. The volumes within a virtual pool are also thin provisioned, which means that the volumes initially exist as an entity, but physical storage is not allocated to them. The thin-provisioned volumes are allocated on-demand as data is written to a page.

If you would like to create a virtual pool that is larger than 512 TiB on each controller, you can enable the large pools feature by using the `large-pools` parameter of the set `advanced-settings` CLI command.

!!! info "The physical capacity limit for a virtual pool is 512 TiB. When overcommit is enabled, the logical capacity limit is 1 PiB."

- When the overcommit feature is disabled, the host does not lose read or write access to the pool volumes when the pool reaches or exceeds the high threshold value.
- When the overcommit feature is enabled, the storage system sends the data protect sense key Add, Sense: Space allocation failed write protect to the host when the pool reaches or exceeds the high threshold value. If the host is rebooted after the pool reaches or exceeds the high threshold value, the host loses read and write access to the pool volumes. The only way to regain read and write access to the pool volumes is to add more storage to the pool.

You can remove one or more disk groups, but not all, from a virtual pool without losing data if there is enough space available in the remaining disk groups to contain the data. When the last disk group is removed, the pool ceases to exist, and will be deleted from the system automatically. Alternatively, the entire pool can be deleted, which automatically deletes all volumes and disk groups residing on that pool.

[**Reference**](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/virtual-pools-and-disk-groups?guid=guid-5ed225ff-50d8-43cf-855f-6eae5fd09d0f&lang=en-us)

## Linear

Each time that the system adds a linear disk group, it also creates a corresponding pool for the disk group. Once a linear disk group and pool exists, volumes can be added to the pool. The volumes within a linear pool are allocated in a linear way, such that the disk blocks are sequentially stored on the disk group.

Linear storage maps logical host requests directly to physical storage. In some cases the mapping is one-to-one, while in most cases the mapping is across groups of physical storage devices, or slices of them.

## Disk Groups

### Add a Disk Group

1. In the Pools topic, select **Action > Add Disk Group**. The Add Disk Group panel opens.
2. Set the options. See [Disk group options](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/disk-group-options?guid=guid-fec6c731-249e-412d-adaa-26f13c5a5d83&lang=en-us) for more information.
3. If you are creating a linear disk group, select the RAID number or SPARE option to determine if you are selecting disks for the RAID configuration or as dedicated spares for the disk group.
4. Select the disks that you want to add to the disk group from the table.
      - !!! note "Disks that are already used or are not available for use are not populated in the table."
5. Click **Add**.

If your disk group contains both 512n and 512e disks, a dialog box appears. Perform one of the following:
    - To create the disk group, click **Yes**.
    - To cancel the request, click **No**.

??? question "What is the difference between a 512n and 512e disk?"

    [The difference is sector size. 512n is 512 byte sector size. 512e is a 4K byte sector size.](https://community.spiceworks.com/topic/2108347-what-is-the-difference-between-512n-and-512e) 

### Renaming Virtual Disk Groups

1. In the Pools topic, select the pool in the pools table for the disk group that you are modifying.
2. Select the disk group in the Related Disk Groups table.
3. Select **Action > Modify Disk Group**.
4. To change the disk group name, type a new name in the **New Name** field. A disk group name is case-sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following characters: `" , < \`.
1. Click **Modify** and then **OK** when the disk group modification is complete.

### Modify the Drive Spin Down Feature

1. Perform steps 1-3 from above.
2. To enable drive spin down for the disk group, select the **Enable Drive Spin Down** check box.
3. To set a period of inactivity after which available disks and global spares are automatically spun down for the disk group, type the number of minutes in the Drive Spin Down Delay field. The maximum value is 360 minutes. The default is 15 minutes.
4. Click **Modify** and then **OK** when the disk group modification is complete.

### Removing Disk Groups

You can delete a single disk group or select multiple disk groups and delete them in a single operation. By removing disk groups, you can also remove pools. Removing all disk groups within a pool will also trigger the automatic removal of the associated pool. 

If all disk groups for a pool have volumes assigned and are selected for removal, a confirmation panel will warn the user that the pool and all its volumes will be removed. For linear disk groups, this is always the case since linear pools can only have one disk group per pool.

!!! info "If the disk group is the last disk group for a pool that is used in a peer connection or it contains a volume that is used in a replication set, the Remove Disk Groups menu option will be unavailable."

1. In the Pools topic, select the pool for the disk groups that you are deleting in the pools table. Then, select the disk groups in the Related Disk Groups table.
2. Select **Action > Remove Disk Groups**. The Remove Disk Groups panel opens.
3. Click **OK**.
4. Click **Yes** to continue.

### Expanding Disk Groups

You can expand the capacity of a linear disk group, or a virtual disk group with a RAID level set to ADAPT up to the maximum number of disks that the storage system supports. Host I/O to the disk group can continue while the expansion proceeds. You can then create or expand a volume to use the new free space that becomes available when the expansion is complete.

!!! note "Not the following before expanding:"

    - Disks must be the same type (enterprise SAS, midline SAS, or SSD).
    - Before expanding non-ADAPT disk groups (Linear), back up the data for the disk group, so that if you need to stop the expansion and delete the disk group, you can move the data into a new, larger disk group.
    - Expansion can take hours of days!
    - Non-ADAPT virtual disk groups cannot be expanded. Add a new disk group to a virtual pool instead. 
    - [More info here...](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/expanding-a-disk-group?guid=guid-79c0d8de-29ef-4a2e-96db-365ec7316718&lang=en-us)

1. In the Pools topic, select the pool for the disk group that you are expanding. Then select the disk group in the Expand Disk Group table.
2. Select **Action > Expand Disk Group**. The Expand Disk Group panel opens displaying disk group information and disk tables.
3. For disk groups with RAID-10 or RAID-50 configurations, choose the number of new sub-groups in the Additional Sub-groups list.
4. Select additional disks that you want to add to the disk group from the table in the bottom section.
5. Click **Modify**. A confirmation panel appears.
6. Click **Yes** to continue and then **OK**.

### Scrub a Disk Group

A scrub analyzes the selected disk group to find and fix disk errors. A scrub can last over an hour, depending on the size of the disk group, the utility priority, and the amount of I/O activity.

1. In the Pools topic, select the pool for the disk group that you plan to scrub in the pools table.
2. Select the disk group in the Related Disk Groups table.
3. Select **Action > Disk Group Utilities**. The Disk Group Utilities panel opens, showing the current job status.
3. Click **Scrub Disk Group**. A message confirms that the scrub has started.
4. Click OK.

### Aborting a Disk Group Scrub

1. In the Pools topic, select the pool for the disk group that you are scrubbing in the pools table.
2. Select the disk group in the Related Disk Groups table.
3. Select **Action > Disk Group Utilities**.
4. Click **Abort Scrub**.
5. Click **OK**.

### Removing a Disk Group from Quarantine

Lots to carefully read [here](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/removing-a-disk-group-from-quarantine?guid=guid-8b404791-518b-4693-a92a-4f7c2abf9b82&lang=en-us).