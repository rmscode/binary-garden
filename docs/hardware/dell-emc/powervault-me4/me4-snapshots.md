# About Snapshots

The system can create snapshots of virtual volumes up to the maximum number supported by your system. Snapshots provide data protection by enabling you to create and save source volume data states at the point in time when the snapshot was created. Snapshots can be created manually or you can schedule snapshot creation. After a snapshot has been created, the source volume cannot be expanded.

When you reach the maximum number of snapshots for your system, before you can create a new snapshot, you must delete an existing snapshot. To view the maximum number of snapshots for your system, see the System configuration limits topic in the PowerVault Manager help.

The system treats a snapshot like any other volume. The snapshot can be mapped to hosts with read-only access, read-write access, or no access, depending on the purpose of the snapshot.

The set snapshot-space CLI command enables you to set the percent of the pool that can be used for snapshots (the snapshot space).

## Creating Snapshots

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

### Copy a Snapshot

1. In the Volumes topic, select a snapshot.
2. Select **Action > Copy Volume**.
3. (Optional) In the **New Volume** field, change the name for the new volume.
4. In the **Residing on Pool** field, select the pool in which to create the copy. Selecting **Auto** copies the destination volume to the same pool as the source volume.
5. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/copy-a-virtual-volume-or-snapshot?guid=guid-6b622cfb-f44e-445a-a4f3-b8be08f66bff&lang=en-us)

### Delete a Snapshot

1. Verify that hosts are not accessing the snapshots that you want to delete.
2. In the Volumes topic, select 1 through 100 items (volumes, snapshots, or both) to delete.
3. Select **Action > Delete Volumes**. The Delete Volumes panel opens with a list of the items to be deleted.
4. Click **Delete**. The items are deleted and the volumes table is updated.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/delete-volumes-and-snapshots?guid=guid-e334f829-6b6f-4e1b-9a6e-d1806e5f06a2&lang=en-us)