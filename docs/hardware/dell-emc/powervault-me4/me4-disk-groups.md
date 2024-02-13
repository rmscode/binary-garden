# About Disk Groups

A disk group is an aggregation of disks of the same type, using a specific RAID level that is incorporated as a component of a pool, for the purpose of storing volume data. Disk groups are used in both virtual and linear storage environments. You can add virtual, linear, or read-cache disk groups to a pool.

All disks in a disk group must be the same type SSD: enterprise SAS, or midline SAS, For example, a disk group can contain different models of disks, and disks with different capacities and sector formats. If you mix disks with different capacities, the smallest disk determines the logical capacity of all other disks in the disk group, for all RAID levels except ADAPT. For example, the capacity of a disk group composed of one 500 GB disk and one 750 GB disk is equivalent to a disk group composed of two 500 GB disks. To maximize capacity, use disks of similar size.

## Add a Disk Group

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
    
    I'm pretty sure all of disks we purchased are exactly the same...

## Modify a Disk Group

You can rename any virtual and read-cache disk group. For linear disk groups, you can also assign a different controller to, expand the capacity of, enable the drive spin down (DSD) feature, and set a DSD delay for non-ADAPT linear disk groups.

### Renaming Virtual Disk Groups

1. In the Pools topic, select the pool in the pools table for the disk group that you are modifying.
2. Select the disk group in the Related Disk Groups table.
3. Select **Action > Modify Disk Group**.
4. To change the disk group name, type a new name in the **New Name** field.
      1. !!! note "A disk group name is case-sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following characters: `" , < \`."
5. Click **Modify** and then **OK** when the disk group modification is complete.

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

## Removing a Disk Group from Quarantine

Lots to carefully read [here](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/removing-a-disk-group-from-quarantine?guid=guid-8b404791-518b-4693-a92a-4f7c2abf9b82&lang=en-us).