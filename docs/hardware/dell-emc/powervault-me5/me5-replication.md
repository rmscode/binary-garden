# Replication

Two internal snapshots (S1,S2) are created on both the primary and secondary storage arrays when a replication set is created. The source and target volume(s), as well as the S1 and S2 snapshots all contain the same data upon initial replication. The primary storage array will then only write changes to it's S2 snapshot. S1 and S2 are then compared and only the latest changes are sent to the secondary storage array. 

!!! note "Replication is costly in terms of storage space"

    **You must allow for four times your anticipated pool size in order to have enough space for replication**: Source volume + S1 + S2 + data queued for replication. 

## Prerequisites

- A peer connection between the primary and secondary storage arrays: Creating a replication set walks you through the process of creating this connection.

## Create aand Manage Replication Sets

You create and manage replication sets using the Data Protection Configuration wizard. You can access this wizard from the **Provisioning > Volumes >** *slide-over* **> Replications** panel.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/add-data-protection?guid=guid-9443a395-4c63-47fe-a51a-81f624551499&lang=en-us)

## Disaster Recovery (Accessing Replicated Data)


