---
status: new
---

# Best Practices

!!! note

    This is a copy/paste from the ME4 docs. It's mostly the same for the ME5, but you can have a look [here](https://www.delltechnologies.com/asset/en-us/products/storage/technical-support/h19551-dell-powervault-me5-series-storage-system-best-practices-wp.pdf). 

## General Best Practices for Hyper-V

### Guest Integration Services

One common issue occurs when VMs are migrated from an older physical host or cluster to a newer one. The integration services do not get updated automatically, and degraded performance may be encountered as a result, that may erroneously point the administrator to suspect the storage array as the cause of the problem.

Aside from performance problems, one of the key indications that integration services are outdated or not present on a Windows VM is the presence of unknown devices in Device Manager for the VM.

!!! info "For more information, see [Hyper-V: Guest Integration Services](../../../software/hyper-v.md#guest-integration-services)."

### Hyper-V Server Clusters

When mapping shared volumes (quorum disks, cluster disks,or cluster shared volumes) to multiple hosts, make sure that the volume is mapped to all nodes in the cluster using a consistent LUN number. Leverage host groups on the ME4 Series array to simplify the task of mapping a consistent LUN number to multiple hosts.

As a best practice and a time-saving tip, configure the nodes in a cluster so that they are identical with regard to the number of disks and LUNs. In this way, when mapping new storage LUNs, the next available LUN ID will be the same on all hosts. By doing this, having to change LUN IDs later to make them consistent can be avoided.

!!! example

    Imagine you have a cluster with four nodes: Node A, Node B, Node C, and Node D. You want to map a new shared volume to these nodes.

    1. **Consistent LUN Assignment:**
   
        - If you map the shared volume to Node A using LUN ID 5, you should also map the same volume to Node B and Node C using LUN ID 5.
        - This ensures that all nodes refer to the shared volume by the same LUN ID, preventing any discrepancies in accessing the storage.

    2. **Leverage Host Groups:**

        - Instead of mapping the volume individually to Node A, Node B, and Node C, you can create a host group that includes all three nodes.
        - When you map the shared volume to this host group with LUN ID 5, the ME4 Series array will automatically ensure that LUN ID 5 is used for this volume on all nodes in the group.

    3. **Identical Configuration:**

        - Before mapping the new storage LUN, ensure that all three nodes have the same number of disks and LUNs configured. For example, if Node A, Node B, and Node C each have LUNs 0-4 already in use, the next available LUN ID for all three nodes will be 5.
        - By having this identical configuration, when you map the new volume to LUN ID 5 on the host group, it will automatically align with the next available LUN ID on all nodes.

!!! note

    The Dell docs do not specifically state how many shared volumes to configure per node. However, Microsoft does state that you should create at least one CSV per node.

### MPIO Best Practices

Windows and Hyper-V hosts default to the Round Robin with Subset policy with ME4 Series storage, unless a different default MPIO policy is set on the host by the administrator. Round Robin with Subset is typically the best MPIO policy for Hyper-V environments.

!!! note "Note the following"

    - The active/optimized paths are associated with the ME4 Series storage controller head that owns the volume. The active/unoptimized paths are associated with the other controller head.
    - If each controller has four FE transport paths configured, each volume that is mapped should list eight total paths: four that are optimized, and four that are unoptimized.
    - Changes to MPIO registry settings on the Windows or Hyper-V host (such as time-out values) should not be made unless directed by ME4 Series documentation (it doesn't, I've checked), or unless directed by Dell EMC support to solve a specific problem.

## Configure E-Mail and SNMP Notifications

The Notifications tab provides options for you to set up and test several types of system notifications. These include:

- Configuring SMTP settings.
- Sending notifications to email addresses when events occur in the system.
- Enabling managed logs settings, which transfers log data to a log-collection system.
- Setting remote syslog notifications to allow events to be logged by the syslog of a specified host computer. Syslog is a protocol for sending event messages across an IP network to a logging server. This feature supports User Datagram Protocol (UDP) but not Transmission Control Protocol (TCP).
- Testing notifications.

You should enable at least one notification service to monitor the system. Email notifications can be sent to as many as three different email addresses. In addition to the normal email notification, Dell EMC recommends enabling managed logs with the Include logs as an email attachment option enabled.

### Send E-Mail notifications

1. Perform one of the following to access the options in the Notifications tab:
      -  In the Home topic, select Action -> System Settings, then click Notifications.
      -  In the System topic, select Action -> System Settings, then click Notifications.
      -  In the footer, click the events panel and select Set Up Notifications.
      -  In the Welcome panel, select System Settings, and then click the Notifications tab.
2. Select the Email tab and ensure that the SMTP Server and SMTP Domain options are set. For details about panel options, see the on-screen tool tips.
3. Set the email notification.
4. Select the minimum severity for which the system should send email notifications.
5. Enter an email address to which the system should send notifications.
6. Save your settings by click Apply.

## Enable Jumbo Frames

!!! note "The use of Jumbo frames can succeed only if jumbo-frame support is enabled on all network components in the data path (SAN switches, server NICs...). The ME4 series storage array supports a max 8900-byte payload, allowing 100 bytes of overhead for the MTU of 9000."

1. Perform one of the following steps to configure iSCSI ports:
    - In the home topic of the PowerVault manager, select Action > System Settings, then click Ports.
    - In the System topic of the PowerVault Manager, select Action > System Settings, then click Ports.
2. In the Advanced Settings section of the panel, set the options that apply to all iSCSI ports:
    - Enable Jumbo Frames: Enables or disables support for jumbo frames.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/configure-iscsi-ports?guid=guid-9c7ddef3-9cae-4788-b553-dffdc99c4aa6&lang=en-us)


!!! tip "Test Jumbo Frames in CommandPrompt/PowerShell"

    ```ps
    ping -f -l 9000 <ip of storage array>
    ```

## Physical port selection

In a system configured to use either all FC or all iSCSI ports, use the ports in the following order:

1. A0,B0
2. A2,B2
3. A1,B1
4. A3,B3

The reason for doing so is that each pair of ports (A0,A1 or A2,A3) are connected to a dedicated CNC chip. If you are not using all four ports on a controller, it is best to use one port from each pair (A0,A2) to ensure better I/O balance on the front end.

### Power-of-2 Method

You can configure a max of "2" pools in dual controller systems where each controller owns a pool. You need to balance disks between the two pools. In other words, divide your disk quantity by 2 for load balancing in each controller.

If you have 21 SSDs and utilize global spares;

- Pool 1: 10 x SSDs
- Pool 2: 10 x SSDs
- Assign 1 global spare

If you have 24 SSDs and utilize global spares;

- Pool 1: 10 x SSDs
- Pool 2: 10 x SSDs
- Assign 4 global spares

### Disk groups in a pool

For better efficiency and performance, use similar disk groups in a pool.

- Disk count balance: For example, with 20 disks, it is better to have two 8+2 RAID-6 disk groups than one 10+2 RAID-6 disk group and one 6+2 RAID-6 disk group.
- RAID balance: It is better to have two RAID-5 disk groups than one RAID-5 disk group and one RAID-6 disk group.
- In terms of the write rate, due to wide striping, tiers and pools are as slow as their slowest disk groups.
- All disks in a tier should be the same type. For example, use all 10K disks or all 15K disks in the Standard tier.
- Create more small disk groups instead of fewer large disk groups.
- Each disk group has a write queue depth limit of 100. This means that in write-intensive applications this architecture will sustain bigger queue depths within latency requirements.
- Using smaller disk groups will cost more raw capacity. For less performance-sensitive applications, such as archiving, bigger disk groups are desirable.

### Disk count per RAID level

The controller breaks virtual volumes into 4-MB pages, which are referenced paged tables in memory. The 4-MB page is a fixed unit of allocation. Therefore, 4-MB units of data are pushed to a disk group. A write performance penalty is introduced in RAID-5 or RAID-6 disk groups when the stripe size of the disk group isn't a multiple of the 4-MB page.

The following table shows recommended disk counts for RAID-6 and RAID-5 disk groups.

!!! note "Note that parity is actually distributed among all the disks."

| RAID Level | Total Disks | Data Disks (Equivalent) | Parity Disks (Equivalent) |
| ---------  | ----------- | ----------------------- | ------------------------- |
| RAID-6     | 4           | 2                       | 2                         |
|            | 6           | 4                       | 2                         |
|            | 10          | 8                       | 2                         |
| RAID-5     | 3           | 2                       | 1                         |
|            | 5           | 4                       | 1                         |
|            | 9           | 8                       | 1                         |

## Firmware updates

- In the Alerts panel on the dashboard, verify that the system health is OK. If the system health is not OK, expand the view to see the active health alerts and resolve all problems before you update firmware. For information about Active Alerts, see Alerts panel
- Run the check firmware-upgrade-health CLI command before upgrading firmware. This command performs a series of health checks to determine whether any conditions exist that must be resolved before upgrading firmware. Any conditions that are detected are listed with their potential risks.
- If any unwritten cache data is present, firmware update will not proceed. Before you can update firmware, unwritten data must be removed from cache. See information about the [clear cache command in the CLI Reference Guide](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/alphabetical-list-of-commands?guid=guid-a639c315-156f-4e7f-823d-1ccb82d9656a&lang=en-us).

        !!! warning "Removing unwritten data may result in data loss. Contact technical support for assistance."

- If a disk group is quarantined, resolve the problem that is causing it to be quarantined before updating firmware.
- To ensure success of an online update, select a period of low I/O activity. This helps the update to complete as quickly as possible and avoids disruption to host and applications due to timeouts. Attempting to update a storage system that is processing a large, I/O-intensive batch job may cause hosts to lose connectivity with the storage system.
- Confirm PFU is enabled by clicking **Settings > System > Properties > Firmware Properties**.
- Do not perform a power cycle or controller restart during a firmware update. If the update is interrupted or there is a power failure, the module might become inoperative. If this occurs, contact technical support. The module might need to be returned to the factory for reprogramming.
