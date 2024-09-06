# Best Practices

## Identifying Your Hosts Easily

It is highly recommended to use nicknames. The recommended method for easily acquiring and renmaing World-Wide Names (WWNs) is to connect one cable at a time and then rename the WWN to something meaningful. You can change it via the PowerVault Manager (Provisioning > Hosts).

## Pool Balancing

Try to balance the workload of the controllers in a dual-controller system. Each controller can own one virtual pool. Having the same number of disks, disk groups and volumes in each pool will help balance the workload, increasing performance.

## Volume Mapping for HA

In both virtual and linear storage, if the owning controller fails, the partner controller assumes temporary ownership of the pool and resources owned by the failed controller. If a fault-tolerant cabling configuration, with appropriate mapping and MPIO, is used to connect the controllers to hosts, LUNs for both controllers are accessible through the partner controller so I/O to volumes can continue without interruption.

The best practice is to map volumes to two ports on each controller to take advantage of load balancing and redundancy.

## Dual Pools

In order to make the best performance from the controllers, due to the ownership of drive groups by a given controller, best performance is achieved at a system level with at least 2 drive groups each being owned by the 2 controllers of the system.

## Magical Number 2 Method

You can configure max “2” virtual pools in dual controller systems and each controller owns a pool. You need to balance disks between two pools. In other words, you need to use magical number “2” which means divide your disk quantity “2” for load balancing in each controller.

For example:

If you have 13 x SSD drives and 25 x SAS drives and 49 NL-SAS drives in ME5 storage array, then:;

- Pool 1: 6 x SSD; 12 x SAS ; 24 x NL-SAS
- Pool 2: 6 x SSD; 12 x SAS ; 24 x NL-SAS
- And assign at least 1 x global spares for each type of drives.

## General Best Practices for Hyper-V

!!! note

    These recommendations come from the ME4 best practices. I don't see why they wouldn't apply to the ME5 series as well, so I have included them for reference.

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

### MPIO Best Practices

Windows and Hyper-V hosts default to the Round Robin with Subset policy with ME4 Series storage, unless a different default MPIO policy is set on the host by the administrator. Round Robin with Subset is typically the best MPIO policy for Hyper-V environments.

!!! note "Note the following"

    - The active/optimized paths are associated with the ME4 Series storage controller head that owns the volume. The active/unoptimized paths are associated with the other controller head.
    - If each controller has four FE transport paths configured, each volume that is mapped should list eight total paths: four that are optimized, and four that are unoptimized.
    - Changes to MPIO registry settings on the Windows or Hyper-V host (such as time-out values) should not be made unless directed by ME4 Series documentation (it doesn't, I've checked), or unless directed by Dell EMC support to solve a specific problem.

## Enable Jumbo Frames

The iSCSI configuration panel (**Settings > iSCSI > Configurations**) provides options for you to enable/disable jumbo frames.

!!! note "The use of Jumbo frames can succeed only if jumbo-frame support is enabled on all network components in the data path (SAN switches, server NICs...). The ME5 series storage array supports a max 8900-byte payload, allowing 100 bytes of overhead for the MTU of 9000."

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

The reason for doing so is that each pair of ports (A0,A1 or A2,A3) are connected to a dedicated controller chip. If you are not using all four ports on a controller, it is best to use one port from each pair (A0,A2) to ensure better I/O balance on the front end.

## Disk groups in a pool

For better efficiency and performance, use similar disk groups in a pool.

- Disk count balance: For example, with 20 disks, it is better to have two 8+2 RAID-6 disk groups than one 10+2 RAID-6 disk group and one 6+2 RAID-6 disk group.
- RAID balance: It is better to have two RAID-5 disk groups than one RAID-5 disk group and one RAID-6 disk group.
- In terms of the write rate, due to wide striping, tiers and pools are as slow as their slowest disk groups.
- All disks in a tier should be the same type. For example, use all 10K disks or all 15K disks in the Standard tier.
- Create more small disk groups instead of fewer large disk groups.
- Each disk group has a write queue depth limit of 100. This means that in write-intensive applications this architecture will sustain bigger queue depths within latency requirements.
- Using smaller disk groups will cost more raw capacity. For less performance-sensitive applications, such as archiving, bigger disk groups are desirable.

## Disk count per RAID level

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

- In the Alerts panel on the dashboard, verify that the system health is OK. If the system health is not OK, expand the view to see the active health alerts and resolve all problems before you update firmware.
- Run the check firmware-upgrade-health CLI command before upgrading firmware. This command performs a series of health checks to determine whether any conditions exist that must be resolved before upgrading firmware. Any conditions that are detected are listed with their potential risks.
- If any unwritten cache data is present, firmware update will not proceed. Before you can update firmware, unwritten data must be removed from cache. See [here](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/clear-cache?guid=guid-86378261-ecd5-4c0c-a746-a14ea6363082&lang=en-us) for more information.
        !!! warning "Removing unwritten data may result in data loss. Contact technincal support for assistance."
- If a disk group is quarantined, resolve the problem that is causing it to be quarantined before updating firmware.
- To ensure success of an online controller firmware update, select a period of low I/O activity. This helps the update to complete as quickly as possible and avoids disruption to host and applications due to timeouts. Attempting to update a storage system that is processing a large, I/O-intensive batch job may cause hosts to lose connectivity with the storage system.
- Confirm PFU is enabled by clicking **Settings > System > Properties > Firmware Properties**.
- Do not perform a power cycle or controller restart during a firmware update. If the update is interrupted or there is a power failure, the module might become inoperative. If this occurs, contact technical support. The module might need to be returned to the factory for reprogramming.
- Spare at least 30 minutes for firmware upgrades.
- Disk Drive Firmware update is an OFFLINE process. [Stop I/O](me5-shutdown-controller.md#) to the storage system.
