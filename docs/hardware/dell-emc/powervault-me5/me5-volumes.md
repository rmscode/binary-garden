---
status: new
---

# Volumes and Volume groups

A volume is a logical subdivision of a virtual or linear pool and can be mapped to host-based applications. An attached volume provides addressable storage to a host (for example, a file system partition you create with your operating system or third-party tools). For more information, see [Attaching volumes to hosts](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/attaching-volumes-to-hosts?guid=guid-337fb819-979a-485c-afcd-3105aa78e3bd&lang=en-us).

## Virtual & Linear Volumes

Virtual volumes make use of a method of storing user data in virtualized pages. These pages may be spread throughout the underlying physical storage in a random fashion and allocated on demand. Virtualized storage therefore has a dynamic mapping between logical and physical blocks.

Because volumes and snapshots share the same underlying structure, it is possible to create snapshots of other snapshots, not just of volumes, creating a snapshot tree.

A maximum of 1024 virtual volumes can exist per system.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/virtual-volumes?guid=guid-f29fe66b-1d08-414e-97c9-27d8bfb6924f&lang=en-us)

Linear volumes make use of a method of storing user data in sequential fully allocated physical blocks. Mapping between the logical data presented to hosts and the physical location where it is stored is fixed, or static. These blocks have a fixed (static) mapping between the logical data presented to hosts and the physical location where it is stored.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/linear-volumes?guid=guid-100e0262-bf79-4819-b470-a7760717fd49&lang=en-us)

### Creating Volumes

You can add volumes to virtual pools and linear disk groups. Click **Create Volumes** (**Provisioning > Volumes**) to open the Create Volumes wizard to add volumes to a pool (virtual) or a volume to a disk group (linear).

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/creating-volumes?guid=guid-f111dd41-655c-47d7-bc46-e481a3abdc7f&lang=en-us)

### Copying Volumes

You can copy a volume or snapshot to a new volume by accessing one of the following:

- Volumes table (**Provisioning > Volumes**)
- Volumes table (**Provisioning > Volumes > Data Protection**)
- Overview panel (**Provisioning > Volumes** > *slide-over* > **Overview** )

Select the volume and choose **Copy Volume** from the drop-down list. Follow the on-screen directions to complete the action.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/copying-volumes-or-snapshots?guid=guid-a3ebc461-2187-4657-bbca-8e30c7076d2e&lang=en-us)

### Abort a Virtual Volume Copy

You can abort a volume copy operation (**Provisioning > Volumes**) by selecting the slide-over of the volume being copied.

In the Overview panel, click the blue X next to the progress indicator. Follow the prompts to abort the operation.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/aborting-a-volume-copy?guid=guid-7a3e4a4d-0792-40ae-9d85-63263f69011d&lang=en-us)

### Rolling Back a Virtual Volume

!!! warning

    When you perform a rollback, the data that existed on the volume is replaced by the data on the snapshot. All data on the volume written since the snapshot was created is lost. As a precaution, create a snapshot of the volume before starting a rollback.

You can replace the data of a source volume or virtual snapshot with the data of a snapshot that was created from it using one of the methods described below.

- Volumes table (**Provisioning > Volumes**)
- Data Protection table (**Provisioning > Volumes > Data Protection**)
- Snapshots panel (**Provisioning > Volumes >** *slide-over* > **Snapshots**)

Select the volume or snapshot, then choose Rollback Volumes from the drop-down list. Follow the on-screen directions to complete the action.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/rolling-back-virtual-volumes?guid=guid-ed7d8572-bf86-40df-ad13-60cfeba5935a&lang=en-us)

### Modifying Volumes

!!! warning

    Only change the volume cache settings if you fully understand how the host operating system, application, and host adapter move data so that you can adjust the settings accordingly.

Change the volume settings from the Volumes table (**Provisioning > Volumes**) by selecting the volume slide-over to access the Overview panel. Here you can expand volumes, copy volumes, modify the volume name, and select cache setting options and tier affinity settings. If the volume is not a snapshot or a secondary volume involved in replication, you can expand the volume size.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/modifying-volumes?guid=guid-1ba959db-663a-4dd0-8df9-85f9dab2e26d&lang=en-us)

### Delete a Volume

You can delete volumes and snapshots from the Volumes table:

- Volumes table (**Provisioning > Volumes**)
- Volumes table (**Provisioning > Volumes > Data Protection**)
- Overview panel (**Provisioning > Volumes** > *slide-over* > **Snapshots** )

From the slide-over you can only delete the selected volume (the volume for which the slide-over is opened) and its children. Clicking the slide-over for the base volume enables deleting the entire tree. Select a volume or snapshot, then choose **Delete** Volumes from the drop-down list. Follow the on-screen directions to complete the action.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/deleting-volumes-and-snapshots?guid=guid-a0c7cec6-865e-4c92-af86-bc70feff43c3&lang=en-us)

## Volume Groups

You can group a maximum of 1024 volumes (standard volumes, snapshots, or both) into a volume group. Doing so enables you to perform mapping operations for all volumes in a group at once, instead of for each volume individually.

A volume can be a member of only one group. All volumes in a group must be in the same virtual pool. A volume group cannot have the same name as another volume group, but can have the same name as any volume. A maximum of 256 volume groups can exist per system. If a volume group is being replicated, the maximum number of volumes that can exist in the group is 16.

!!! note "Unlike the ME4, volume groups for the ME5 can not be created in the PowerVault Manager. They are only supported through the CLI."

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/volume-groups?guid=guid-0f601606-1ed8-4719-910f-7adcf8d8e011&lang=en-us)

=== "Create Volume Groups"

    Syntax: `create volume-group volumes <volume-IDs> <volume-group>`
    
    !!! example "Create a volume group named `VG1` that includes volumes `VOL1` and `VOL2`"

        `# create volume-group volumes VOL1,VOL2 VG1`

    [*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/create-volume-group?guid=guid-f2a73c07-acb9-43fb-a9b8-d6eae8fa5520&lang=en-us)

=== "Add Volumes to a Group"

    Syntax: `add volume-group-members volumes <volume-IDs> <volume-group>`

    !!! example "Add volume `VOL3` to volume group `VG1`"

        `# add volume-group-members volumes VOL3 VG1`

    [*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/add-volume-group-members?guid=guid-d945cc96-bd7a-4e37-b0a5-3a62b85e2141&lang=en-us)

=== "Remove Volumes from a Group"

    Syntax: `remove volume-group-members volumes <volume-IDs> <volume-group>`

    !!! example "Remove volumes `VOL1` and `VOL2` from volume group `VG1`"

        `# remove volume-group-members volumes VOL1,VOL2 VG1`

    [*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/remove-volume-group-members?guid=guid-3cca5697-8219-42f9-83bc-4c7ba33eb6cb&lang=en-us)

=== "Rename Volume Groups"

    Syntax: `set volume-group name <new-name> <volume-group>`

    !!! example "Rename volume group `VG1` to `MyVG1`"

        `# set volume-group name MyVG1 VG1`

    [*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/set-volume-group?guid=guid-7fd74a36-f922-4cf1-98a7-dadf72d1d980&lang=en-us)

=== "Delete Volume Groups"

    Syntax: `delete volume-groups <volume-group>|all [delete-volumes]`

    !!! example "Delete volume groups `VG1` and `VG2`, but not the volumes in those groups"

        `# delete volume-groups VG1,VG2`

    !!! example "Delete volume group `VG1` and all volumes in that group"

        `# delete volume-groups VG1 delete-volumes`

    !!! example "Delete all volume groups and the volumes in those groups"

        `# delete volume-groups delete-volumes all`

    [*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/delete-volume-groups?guid=guid-546b4e73-8b85-4411-83d1-3db484383f1b&lang=en-us)

## Attaching Volumes to Hosts

!!! note "This concept was referred to as "mapping" with the ME4 series storage array."

A volume must be attached to one or more hosts (or hosts groups) to enable them to access the volume. When an attachment is created, the system automatically assigns a unique LUN to the volume, sets the default permission access to read-write, and sets port access to all ports. After an attachment is created, you can change the LUN, port access, and access permissions.

You can perform the following attachment actions:

- View information about hosts attached to a volume (**Provisioning > Volumes**)
- Attach Volumes to hosts or host groups (**Provisioning > Volumes > Attach to Hosts**)
- Detach volumes from hosts or host grops  (**Provisioning > Volumes > Detach from Hosts**)
- View information about volumes attached to a host (**Provisioning > Hosts**)
- Attach hosts to volumes (**Provisioning > Hosts > Attach to Volumes**)
- Detach hosts from volumes (**Provisioning > Hosts > Detach from Volumes**)

Navigate to any one of these panels and follow the on-screen instructions.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/attaching-volumes-to-hosts?guid=guid-337fb819-979a-485c-afcd-3105aa78e3bd&lang=en-us)
