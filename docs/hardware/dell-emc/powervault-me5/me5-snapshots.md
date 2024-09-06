# Snapshots

The system can create snapshots of virtual volumes up to the maximum number supported by your system. Snapshots provide data protection by enabling you to create and save source volume data states at the point in time when the snapshot was created. Snapshots can be created manually or you can schedule snapshot creation. After a snapshot has been created, the source volume cannot be expanded.

When you reach the maximum number of snapshots for your system, before you can create a new snapshot, you must delete an existing snapshot. To view the maximum number of snapshots for your system, see the System configuration limits topic in the PowerVault Manager help.

The system treats a snapshot like any other volume. The snapshot can be mapped to hosts with read-only access, read-write access, or no access, depending on the purpose of the snapshot.

The `set snapshot-space` CLI command enables you to set the percent of the pool that can be used for snapshots (the snapshot space).

## Creating Snapshots

Navigate to **Provisioning > Volumes >** *slide-over* > **Snapshots** and then follow the on-screen instructions to complete the action.

!!! note

    When creating local snapshots, you will be prompted to set a schedule. This is the only time where you can set a snapshot schedule in the Powervault Manager. IF you do not set a schedule when prompted, you will need to create a a schedule using the ` create schedule` CLI command.

[*Reference*](hhttps://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/creating-snapshots?guid=guid-c5df9d61-df54-4545-9aae-d35134c006bf&lang=en-us)

### Resetting Snapshots

!!! info 

    As an alternative to taking a new snapshot of a volume, you can replace the data in a standard snapshot with the current data in the source volume. The snapshot name and mappings are not changed.

    This feature is supported for all snapshots in a tree hierarchy. However, a virtual snapshot can only be reset to the parent volume or snapshot from which it was created.

!!! warning "To avoid data corruption, unmount a snapshot from hosts before resetting the snapshot."

Navigate to **Provisioning > Volumes >** *slide-over* > **Snapshots**. Select the volume and choose **Reset Snapshot** from the drop down list. Follow the on-screen directions to complete the action.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/resetting-snapshots?guid=guid-95a30101-30e7-4dc9-bc90-3faf6323aede&lang=en-us)

### Copy a Snapshot

The volume copy feature enables you to copy a base volume or snapshot to a new volume. It creates a complete "physical" copy of a base snapshot.

Navigate to the snapshots panel (**Provisioning > Volumes >** slide-over **> Snapshots**). Select the volume and choose **Copy** from the drop down list. Follow the on-screen directions to complete the action.

!!! note "notes"

    - You must detach the source before copying it.
    - The volume/snapshot will not be available for read/write access until the copy is complete.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/copying-volumes-or-snapshots?guid=guid-a3ebc461-2187-4657-bbca-8e30c7076d2e&lang=en-us)

### Delete a Snapshot

Navigate to the snapshots panel (**Provisioning > Volumes >** *slide-over* **> Snapshots**) and select a snapshot, then choose **Delete** from the drop down list. Follow the on-screen directions to complete the action.

!!! warning

    Deleting a volume or snapshot removes its host attachments and schedules and deletes its data.

!!! note "Notes"

    - From the slide-over you can only delete the selected volume (the volume for which the slide-over is opened) and its children. Clicking the slide-over for the base volume enables deleting the entire tree.
    - You can select from 1 to 100 items (volumes, snapshots, or both) to delete.
    - Ensure that hosts are not accessing the snapshots to be deleted.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/deleting-volumes-and-snapshots?guid=guid-a0c7cec6-865e-4c92-af86-bc70feff43c3&lang=en-us)