# About Replicating Virtual Volumes

Replication for virtual storage provides a remote copy of a volume, volume group, or snapshot — hereafter known as *volume* — on a remote system by periodically updating the remote copy to contain a point-in-time consistent image of a source volume. After an initial image has been replicated, subsequent replications only send changed data to the remote system. All replications, including the initial one, only replicate data that has been written as opposed to using all pages of data from the source. This feature can be used for disaster recovery, to preserve data, and to back data up to off-site locations. It can also be used to distribute data.

A peer connection must be defined to create and use a replication set. A replication set can specify only one peer connection and pool. When creating a replication set, communication between the peer connection systems must be operational during the entire process.

    If a volume group is part of a replication set, volumes cannot be added to or deleted from the volume group.

    If a replication set is deleted, the internal snapshots created by the system for replication are also deleted. After the replication set is deleted, the primary and secondary volumes can be used like any other base volumes or volume groups.

## Prerequisites

- [Create a peer connection](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/creating-a-peer-connection?guid=guid-3a565d23-4c70-4f95-b24b-7a4851c419a8&lang=en-us) (to another storage array with FC or iSCSI ports).
- Create a replication set.

## Replication Sets

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

### Delete a Replication Set

1. In the Replications topic, select the replication set to be deleted in the Replication Sets table.
2. Select **Action > Delete Replication Set**.
3. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/delete-a-replication-set?guid=guid-c8f119d0-935a-429c-ae02-836a359ed57f&lang=en-us)
