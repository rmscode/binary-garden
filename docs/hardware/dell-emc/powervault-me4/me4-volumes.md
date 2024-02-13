# About Volumes and Volume groups

A volume is a logical subdivision of a virtual or linear pool and can be mapped to host-based applications. A mapped volume provides addressable storage to a host (for example, a file system partition you create with your operating system or third-party tools). For more information about mapping, see About volume mapping.

## Virtual Volumes

Virtual volumes make use of a method of storing user data in virtualized pages. These pages may be spread throughout the underlying physical storage in a random fashion and allocated on demand. Virtualized storage therefore has a dynamic mapping between logical and physical blocks.

Because volumes and snapshots share the same underlying structure, it is possible to create snapshots of other snapshots, not just of volumes, creating a snapshot tree.

A maximum of 1024 virtual volumes can exist per system.

### Create Virtual Volume

1. Perform on of the following:
      1. In the Pools topic, select a virtual pool in the pools table and select **Action > Create Volumes**.
      2. In the Volumes topic, select **Action > Create Virtual Volumes**.
2. (Optional) Change the name, the volume size (MiB, GiB, TiB, MB, GB, TB), the number of volumes to create, and/or the volume affinity for tiering (default none).
3. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-virtual-volumes?guid=guid-b0eccb14-2cc7-4be3-b685-542255789576&lang=en-us)

### Copy a Virtual Volume

1. In the Volumes topic, select a virtual volume.
2. Select **Action > Copy Volume**.
3. (Optional) In the **New Volume** field, change the name for the new volume.
4. In the **Residing on Pool** field, select the pool in which to create the copy. Selecting **Auto** copies the destination volume to the same pool as the source volume.
5. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/copy-a-virtual-volume-or-snapshot?guid=guid-6b622cfb-f44e-445a-a4f3-b8be08f66bff&lang=en-us)

### Abort a Virtual Volume Copy

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

## Linear Volumes

Linear volumes make use of a method of storing user data in sequential, fully allocated physical blocks. Mapping between the logical data presented to hosts and the physical location where it is stored is fixed, or static.

### Create Linear Volume

1. Perform on of the following:
      1. In the Pools topic, select a linear pool in the pools table and select **Action > Create Volumes**.
      2. In the Volumes topic, select **Action > Create Linear Volumes**. 
2. (Optional) Change the number of copies to create, the volume name, and/or the volume size (MiB, GiB, TiB, MB, GB, TB).
3. Clikc **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-linear-volumes?guid=guid-c026834e-de8c-4609-b001-4fb2c2afeeb0&lang=en-us)

## Modifying Volumes

1. In the Volumes topic, select a volume in the volumes table.
2. Select **Action > Modify Volume**.
3. Make desired modifications.
4. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/modify-a-volume?guid=guid-13c04acd-bb88-4c92-be83-b1f9822f5677&lang=en-us)

## Delete a Volume

1. Verify that hosts are not accessing the volumes that you want to delete.
2. In the Volumes topic, select 1 through 100 items (volumes, snapshots, or both) to delete.
3. Select **Action > Delete Volumes**. The Delete Volumes panel opens with a list of the items to be deleted.
4. Click **Delete**. The items are deleted and the volumes table is updated.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/delete-volumes-and-snapshots?guid=guid-e334f829-6b6f-4e1b-9a6e-d1806e5f06a2&lang=en-us)

## Volume Groups

You can group a maximum of 1024 volumes (standard volumes, snapshots, or both) into a volume group. Doing so enables you to perform mapping operations for all volumes in a group at once, instead of for each volume individually.

A volume can be a member of only one group. All volumes in a group must be in the same virtual pool. A volume group cannot have the same name as another volume group, but can have the same name as any volume. A maximum of 256 volume groups can exist per system. If a volume group is being replicated, the maximum number of volumes that can exist in the group is 16.

!!! info "Volume groups apply only to virtual volumes. You cannot add linear volumes to a volume group."

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