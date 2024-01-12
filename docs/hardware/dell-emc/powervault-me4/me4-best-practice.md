# Best Practices

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
2. Select the Email tab and ensure that the SMTP Server and SMTP Domain options are set, as described in To configure SMTP settings in the [Administrator’s Guide](https://www.dell.com/support/manuals/us/en/19/powervault-me4012/me4_series_ag_pub/configure-smtp-settings?guid=guid-a34ac6dc-8231-456e-ae0a-a157ef02393d&lang=en-us).
3. Set the email notification.
4. Select the minimum severity for which the system should send email notifications.
5. Enter an email address to which the system should send notifications.
6. Save your settings by click Apply.

## Enable Jumbo Frames

!!! note "The use of Jumbo frames can succeed only if jumbo-frame support is enabled on all network components in the data path (SAN switches, server NICs...)."

1. Perform one of the following steps to configure iSCSI ports:
    - In the home topic of the PowerVault manager, select Action > System Settings, then click Ports.
    - In the System topic of the PowerVault Manager, select Action > System Settings, then click Ports.
2. In the Advanced Settings section of the panel, set the options that apply to all iSCSI ports:
    - Enable Jumbo Frames: Enables or disables support for jumbo frames. Allowing for 100 bytes of overhead, a normal frame can contain a 1400-byte payload whereas a jumbo frame can contain a maximum 8900-byte payload for larger data transfers.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/configure-iscsi-ports?guid=guid-9c7ddef3-9cae-4788-b553-dffdc99c4aa6&lang=en-us)

## Physical port selection

In a system cofigured to use either all FC or all iSCSI ports, use the ports in the following order:

1. A0,B0
2. A2,B2
3. A1,B1
4. A3,B3

The reason for doing so is that each pair of ports (A0,A1 or A2,A3) are connected to a dedicated CNC chip. If you are not using all four ports on a controller, it is best to use one port from each pair (A0,A2) to ensure better I/O balance on the front end.

## Performance

### Power-of-2 Method

You can configure a max of "2" pools in dual controller systems where each controller owns a pool. You need to balance disks between the two pools. In other words, divide your disk quantity by 2 for load balancing in each controller.

If you have 21 SSDs and utilize global spares;

- Pool 1: 10 x SSDs
- Pool 2: 10 x SSDs
- Assign 1 global spare

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

- In the health panel in the footer, verify that the system health status is OK. If the system health status is not OK, view the Health Reason value in the health panel in the footer and resolve all problems before you update the firmware.
- Run the check `firmware-upgrade-health` CLI command before updating the firmware. This command performs a series of health checks to determine whether any conditions exist that need to be resolved before the firmware can be updated. Any conditions that are detected are listed with their potential risks.
- If any unwritten cache data is present, the firmware update will not proceed. Before you can update the firmware, unwritten data must be removed from cache. For more information about the clear cache command, see the Dell PowerVault ME4 Series Storage System [CLI Guide](https://www.dell.com/support/manuals/en-us/powervault-me4024/me4_series_cli_pub).
- If a disk group is quarantined, contact technical support for help resolving the problem that is causing the component to be quarantined before updating the firmware.
- To ensure success of an online update, select a period of low I/O activity. This helps the update complete as quickly as possible and avoids disruption to host and applications due to timeouts. Attempting to update a storage system that is processing a large, I/O-intensive batch job may cause hosts to lose connectivity with the storage system.