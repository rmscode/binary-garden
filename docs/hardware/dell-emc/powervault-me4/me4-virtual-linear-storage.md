# About Virtual and Linear Storage

The ME4 series storage system uses two different storage technologies that share a common user interface. One uses the virtual method while the other one uses the linear method.

Virtual storage is a method of mapping logical storage requests to physical storage (disks). It inserts a layer of virtualization such that logical host I/O requests are mapped onto pages of storage. Each page is then mapped onto physical storage. Within each page the mapping is linear, but there is no direct relationship between adjacent logical pages and their physical storage.

Some advantages of using virtual storage are:

- It allows performance to scale as the number of disks in the pool increases.
- It virtualizes physical storage, allowing volumes to share available resources in a highly efficient way.
- It allows a volume to be comprised of more than 16 disks.

Virtual storage provides the foundation for data-management features such as thin provisioning, automated tiered storage, SSD read cache, and the quick rebuild feature.

=== "Virtual Storage (Recommended)"

    - Tiering
    - Snapshots
    - Replication
    - Thin provisioning
    - One pool per installed RAID controller and up to 16 disk groups per pool
    - Maximum 1 PB usable capacity per pool with large pools feature enabled
    - RAID levels 1, 5, 6, 10, and ADAPT
    - Adding individual disks to increase RAID capacity is only supported for ADAPT disk groups
    - Capacity can be increased by adding additional RAID disk groups
    - Page size is static (4 MB)
    - SSD read cache
    - Global and/or dynamic hot spares

=== "Linear Storage"

    - Up to 32 pools per installed RAID controller and one disk group per pool
    - RAID levels 0, 1, 3, 5, 6, 10, 50, ADAPT, and NRAID
    - Adding individual disks to increase RAID capacity is supported for RAID 0, 3, 5, 6, 10, 50, and ADAPT disk groups
    - Configurable chunk size per disk group
    - Global, dedicated, and/or dynamic hot spares

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/about-virtual-and-linear-storage?guid=guid-5bbe5bbb-bf63-484b-87d4-94d20cf6b5aa&lang=en-us)

## Volumes and Snapshots

### Create Virtual Volume

1. Perform on of the following:
      1. In the Pools topic, select a virtual pool in the pools table and select **Action > Create Volumes**.
      2. In the Volumes topic, select **Action > Create Virtual Volumes**.
2. (Optional) Change the name, the volume size (MiB, GiB, TiB, MB, GB, TB), the number of volumes to create, and/or the volume affinity for tiering (default none).
3. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-virtual-volumes?guid=guid-b0eccb14-2cc7-4be3-b685-542255789576&lang=en-us)

### Create Linear Volume

1. Perform on of the following:
      1. In the Pools topic, select a linear pool in the pools table and select **Action > Create Volumes**.
      2. In the Volumes topic, select **Action > Create Linear Volumes**. 
2. (Optional) Change the number of copies to create, the volume name, and/or the volume size (MiB, GiB, TiB, MB, GB, TB).
3. Clikc **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-linear-volumes?guid=guid-c026834e-de8c-4609-b001-4fb2c2afeeb0&lang=en-us)

### Modifying Volumes

1. In the Volumes topic, select a volume in the volumes table.
2. Select **Action > Modify Volume**.
3. Make desired modifications.
4. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/modify-a-volume?guid=guid-13c04acd-bb88-4c92-be83-b1f9822f5677&lang=en-us)

### Creating Snapshots

!!! info 

    If the large pools feature is enabled, through use of the `large-pools` parameter of the set `advanced-settings` CLI command, the maximum number of volumes in a snapshot tree is limited to 9, base volume plus 8 snapshots. The maximum number of volumes per snapshot will decrease to fewer than 9 if more than 3 replication sets are defined for volumes in the snapshot tree. If creating a snapshot will exceed the limit, you will be unable to create the snapshot unless you delete a snapshot first.

1. In the Volumes topic, select from 1 to 16 virtual volumes or snapshots.
      - !!! note "You can also select a combination of virtual volumes and snapshots." 
2. Select **Action > Create Snapshot**.
3. Set the snapshot name.
4. (Optional) Schedule the snapshot by ticking the **Scheduled** box.
      1. Change the default prefix to indentify the snapshots created by this task.
      2. Select the number of snapshots to retain (1-8 if `large-pools` enabled or 1-32 if not).
      3. Specify a date (`yyyy-mm-dd`) and time (`hh:mm AM/PM`) at least 5 minutes in the future.
      4. Tick the **Repeat** box if you want to run more than once.
5. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/creating-snapshots?guid=guid-ef9f7a11-49db-46a0-a8b9-65837c61c791&lang=en-us)

### Resetting Snapshots

!!! info 

    As an alternative to taking a new snapshot of a volume, you can replace the data in a standard snapshot with the current data in the source volume. The snapshot name and mappings are not changed.

    This feature is supported for all snapshots in a tree hierarchy. However, a virtual snapshot can only be reset to the parent volume or snapshot from which it was created.

!!! warning "To avoid data corruption, unmount a snapshot from hosts before resetting the snapshot."

1. Unmount the snapshot from hosts.
2. In the Volumes topic, select a snapshot.
3. Select **Action > Reset Snapshot**.
4. (Optional) Schedule a reset task by ticking the **Scheduled** box.
      1. Specify a date (`yyyy-mm-dd`) and time (`hh:mm AM/PM`) at least 5 minutes in the future.
      2. Tick the **Repeat** box if you want to run more than once.
5. Click **OK**.

!!! note "You can remount the snapshot after it is reset. Also, remember to unmout the snapshot before the scheduled task runs."

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/resetting-a-snapshot?guid=guid-6f2fea7a-9495-4bed-99ce-53543af80d50&lang=en-us)

### Copy a Volume or Snapshot

1. In the Volumes topic, select a virtual volume or snapshot.
2. Select **Action > Copy Volume**.
3. (Optional) In the **New Volume** field, change the name for the new volume.
4. In the **Residing on Pool** field, select the pool in which to create the copy. Selecting **Auto** copies the destination volume to the same pool as the source volume.
5. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/copy-a-virtual-volume-or-snapshot?guid=guid-6b622cfb-f44e-445a-a4f3-b8be08f66bff&lang=en-us)

### Abort a Volume Copy

1. In the Volumes topic, select a volume that is currently being copied.
2. Select **Menu > Abort Volume Copy**.
3. Click **Yes** to abort the operation.

When the operation is complete, the destination volume is deleted.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/abort-a-volume-copy?guid=guid-966588fe-6f53-4d09-b188-9e1875818651&lang=en-us)

### Rolling Back a Virtual Volume

1. Unmount the volume from hosts.
2. In the Volumes topic, select the volume to roll back.
3. Select **Action > Rollback Volume**. The Rollback Volume panel opens and lists snapshots of the volume.
4. Select the snapshot to roll back to.
5. Click **OK**.

You can remount the volume after the rollback completes.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/roll-back-a-volume?guid=guid-43901d0a-3d59-4cca-af7f-a839692a8471&lang=en-us)

### Delete a Volume or Snapshot

1. Verify that hosts are not accessing the volumes and snapshots that you want to delete.
2. In the Volumes topic, select 1 through 100 items (volumes, snapshots, or both) to delete.
3. Select **Action > Delete Volumes**. The Delete Volumes panel opens with a list of the items to be deleted.
4. Click **Delete**. The items are deleted and the volumes table is updated.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/delete-volumes-and-snapshots?guid=guid-e334f829-6b6f-4e1b-9a6e-d1806e5f06a2&lang=en-us)

## Volume Groups

### Adding Volumes to a Group

1. In the Volumes topic, select up to 20 volumes to add to a volume group.
2. Select **Action > Add to Volume Group**.
3. Perform one of the following:
      - To use an existing volume group, select it from the **Volume Groups** field.
      - To create a volume group, type a name for the volume group in the **Volume Groups** field. A volume group name is case-sensitive and can have a maximum of 32 bytes. It cannot include the following: `" , < \`
4. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/add-volumes-to-a-volume-group?guid=guid-618d3bd8-a38f-44d5-a9dd-bab08105e1c5&lang=en-us)

### Removing Volumes from a Group

1. In the Volumes topic, select the volumes to remove from a volume group.
2. Select **Action > Remove from Volume Group**. The Remove from Volume Group panel opens and lists the volumes to be removed.
3. Click **OK**. For the selected volumes, the Group value changes to `--`.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/remove-volumes-from-a-volume-group?guid=guid-acf462eb-a931-4c05-a673-7ab2f7aa0224&lang=en-us)

### Renaming a Volume Group

1. In the Volumes topic, select a volume that belongs to the volume group that you want to rename.
1. Select **Action > Rename Volume Group**. The Rename Volume Group panel opens.
3. In the **New Group Name** field, enter a new name for the volume group. A volume group name is case sensitive and can have a maximum of 32 bytes. It cannot include the following: `" , < \`
4. Click OK. The volumes table is updated.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/rename-a-volume-group?guid=guid-0f374c44-1801-4f00-87db-6a6a9611bbdd&lang=en-us)

### Remove Volume Group

!!! info 

    You can remove volume groups. When you remove a volume group, you can optionally delete its volumes. Otherwise, removing a volume group will ungroup its volumes but will not delete them.

!!! warning "Deleting a volume removes its mappings and schedules and deletes its data."

#### Remove Volume Groups Only

1. In the Volumes topic, select a volume that belongs to each volume group that you want to remove. You can remove 1 through 100 volume groups at a time.
2. Select **Action > Remove Volume Group**. The Remove Volume Group panel opens and lists the volume groups to be removed.
3. Click **OK**. For volumes that were in the selected volume groups, the Volume Groups value changes to `--`.

#### Remove Volume Groups and Their Volumes

1. Verify that hosts are not accessing the volumes that you want to delete.
2. In the Volumes topic, select a volume that belongs to each volume group that you want to remove. You can remove 1 through 100 volume groups at a time.
3. Select **Action > Remove Volume Group**. The Remove Volume Group panel opens and lists the volume groups to be removed.
4. Tick the Delete Volumes box.
5. Click **OK**.
6. Click **Yes**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/remove-volume-groups?guid=guid-3fc5ed3a-00a3-4146-9ae2-ab0ded10d8ea&lang=en-us)

## Replication Sets

!!! info

    For a selected volume, snapshot, or volume group, the action creates a secondary volume or volume group and the internal snapshots required to support replications. By default, the secondary volume or volume group and infrastructure are created in the pool corresponding to the one for the primary volume or volume group (A or B). Optionally, you can select the other pool.

    A peer connection must be defined to create and use a replication set. A replication set can specify only one peer connection and pool. When creating a replication set, communication between the peer connection systems must be operational during the entire process.

    If a volume group is part of a replication set, volumes cannot be added to or deleted from the volume group.

    If a replication set is deleted, the internal snapshots created by the system for replication are also deleted. After the replication set is deleted, the primary and secondary volumes can be used like any other base volumes or volume groups.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/creating-a-replication-set-from-the-volumes-topic?guid=guid-36569b61-8fea-4ebe-8d1f-b08c71433963&lang=en-us)

### Manually Initiate a Replication

1. In the Volumes topic, select a replication set in the Replication Sets table.
2. Select **Action > Replicate**.
3. Click **OK**.
      - If a replication is not in progress, the local system begins replicating the contents of the replication set volume to the remote system and the status of the replication set changes to **Running**.
      - If a replication is already in progress, then the outcome of this replication request depends upon the Queue Policy setting specified in the Create Replication Set panel. For more information on setting the queue policy, see [Queuing replications](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/queuing-replications?guid=guid-2ca07ca5-8f5b-4258-98a6-b15b3b0549a5&lang=en-us).

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/manually-initiate-replication-from-the-volumes-topic?guid=guid-ef69d7c0-4b18-45db-9640-3bf048b5648d&lang=en-us)

### Schedule a Replication

1. In the Volumes topic, select a replication set in the Replication Sets table.
2. Select **Action > Replicate**. The Replicate panel opens.
3. Tick the **Schedule** box.
4. Enter a name for the task. The name is case sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following: `" , < \`
5. (Optional) If you want to create a replication of the last snapshot in the primary volume, tick the **Last Snapshot** box.
6. Specify a date (`yyyy-mm-dd`) and time (`hh:mm AM/PM`) at least 5 minutes in the future to be the first instance when the scheduled task will run, and to be the starting point for any specified recurrence. The minimum interval is one hour.
7. (Optional) If you want the task to run more than once, tick the **Repeat** box.
8. Click OK.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/schedule-a-replication-from-the-volumes-topic?guid=guid-26fbb63d-fcad-4de5-8645-c0855a447cb4&lang=en-us)

### Modify Replication Schedules

1. From the Replication Sets table on the primary system, select a replication set that has an associated schedule.
2. Select **Action > Manage Schedules**.
3. Select the schedule to modify.
4. If you want to create a replication of the last snapshot in the primary volume, tick the **Last Snapshot** box. At the time of the replication, the snapshot must exist. This snapshot may have been created either manually or by scheduling the snapshot. This option is unavailable when replicating volume groups.
5. Specify a date (`yyyy-mm-dd`) and time (`hh:mm AM/PM`) at least 5 minutes in the future. This date and time is also the starting point for any specified recurrence.
6. If you want the task to run more than once, tick the **Repeat** box.
7. Click **Apply**.
8. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/manage-replication-schedules-from-the-volumes-topic?guid=guid-4813a011-40e9-46d0-8476-c8bd43e2e588&lang=en-us)