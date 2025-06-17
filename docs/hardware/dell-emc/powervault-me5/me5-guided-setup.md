# System and Storage Setup <small>(Guided)</small>

Upon completing the hardware installation, use PowerVault Manager to configure, provision, monitor and manage the storage system. After you log in to PowerVault Manager, the setup wizard guides you through process of configuring your system.

The guided setup includes the following tasks:

- System Configuration—Network settings, set date and time, add users, set up notifications, and if applicable, add iSCSI connectivity.
- SupportAssist Configuration—Accept license, set up connection, and add support contacts
- Storage Configuration—set storage type and set up storage pools (Dell recommends virtual storage pools as it allows for modern features like snapshots, replication, and thin provisioning)
- Provisioning—Add groups, set up hosts, and add volumes

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/about-guided-setup?guid=guid-f28f2a78-6d6e-4a06-b5db-fb749f9343eb&lang=en-us)

!!! tip "System Information Worksheet"

    Use the [System Information Worksheet](../../../assets/me5-system-information-worksheet.pdf) to record the information that you need to install the ME5 Series storage system.

## Prerequisites

- Hosts are configured and connected to the storage system
- Initiators are available/identified
- Switch zoning is complete (for Fibre channel protocol)
- System and network information is recorded
- A business account is set up on dell.com and validated
- [Access key and PIN are available](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/generating-an-access-key-and-pin?guid=guid-bc58d9cd-50db-4283-b920-e9c51a9f21a1&lang=en-us) (if using SupportAssist)

## Accessing the PowerVault Manager

!!! info

    The [ME5 Series Administrators Guide](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/) is the primary reference for using the PowerVault Manager.

Start the initial configuration by logging in to the PowerVault Manager, changing the password, and verifying the firmware version.

1. Temporarily set the management host NIC to a 10.0.0.x address or to the same IPv6 subnet to enable communication with the storage system.
    - !!! note "If the default IP addresses (10.0.0.2 - Controller A, 10.0.0.3 - Controller B) are not compatible with your network, refer to ["Accessing the CLI"](../powervault-me5/me5-cli.md#) to learn how to set the network port IP addresses."
2. In a supported web browser, type `https://10.0.0.2` to access controller module A on an IPv4 network.
3. To read the license agreement click **EULA**, review the EULA and click **Close**.
4. Click **Get Started**.
5. Type a new user name for the storage system in the **Username** field.
6. Type password for the new username in the **Password** and **Confirm Password** fields.
7. Click **Apply And Continue**.
8. The storage system creates the user and displays the **Update Firmware** panel.
9. For the initial configuration, click **Use Current Firmware Bundle**.

The System Configuration Main Page opens.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/access-the-powervault-manager?guid=guid-5747fc6a-7063-4a62-8077-4c2513c245d8&lang=en-us)

## System Configuration

!!! info 

    The system configuration setup includes network configuration, setting the date and time, adding users, setting your notification preferences, and if applicable, setting up iSCSI connectivity. The system configuration can be changed if needed after initial setup using the **Settings** menu in the PowerVault Manager.

Click **Start** to begin the system configuration setup.

### Set The Date and Time

The date and time settings can be changed if needed after initial setup using the **Settings > System > Date and Time** panel in the PowerVault Manager or by clicking on the date and time displayed in the banner.

1. Select either **Network Time Protocol (NTP)** or **Manual**.
    - For Manual setting, enter the current (local) date and time.
    - For NTP setting, enter the NTP server address and the NTP time zone offset .
2. Click **Apply And Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-the-date-and-time?guid=guid-4e86a793-555b-4a9c-a9cb-20528c27af8a&lang=en-us)

### Set up Users

The user settings can be changed and new users can be added after initial setup using the **Settings > Users** panel in the PowerVault Manager.

1. Select the type of user to set up:
    - **Local**
    - **SNMPv3**
    -  **Skip this Step**
2. Click **Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-users?guid=guid-701cc698-80f3-46e9-b445-ad9fec198032&lang=en-us)

#### Set up Local Users

1. Click **Add New User**.
2. Enter information for the new user.
3. Click **Create New User**.
4. Continue to add new users, and click **Apply and Continue** whe complete.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-local-users?guid=guid-168eccee-6e7f-4743-9b16-6f2e6d41496d&lang=en-us)

#### Set up SNMPv3 Users

1. Click **Create SNMPv3 User**.
2. Enter the information for the new user.
3. Click **Create SNMPv3 User**.
4. Continue to add new users, and click **Apply and Continue** when complete.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-snmpv3-users?guid=guid-b631cf2d-d3f0-44ee-b3ec-b9b57d3c881a&lang=en-us)

### Notifications

The notification settings can be changed if needed after initial setup using the **Settings > Notifications** panel in the PowerVault Manager.

1. Select the type of notification to set up:
    - **Email**
    - **SNMP**
    - **Syslog**
    - **Skip this Step**
2. Click **Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/notifications?guid=guid-250b90ec-9beb-4747-a544-2814a168e2b2&lang=en-us)

### Configure iSCSI Ports

The iSCSI settings can be changed or set after initial setup using the **Settings > iSCSI** panel in the PowerVault Manager.

1. On the **iSCSI Settings** panel, configure the following settings:
    - IP Version
    - Jumbo Frames
    - CHAP Authentication
    - ISNS
2. Click **Continue**.
3. On the **Host port addresses** panel, set the IP address, netmask, and gateway for each port on both controllers.
4. Click **Continue**.
    - If you selected CHAP, the configuration panel opens.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/configure-iscsi-ports?guid=guid-c64e4dba-c02a-4657-a2f9-ee8ccb6aacee&lang=en-us)

### SupportAssist and CloudIQ

1. On the **System Configuration Main Page**, click **Start** under **SupportAssist Configuration**.
2. In the **License Agreement** panel, read through the agreement, and then acknowledge it by selecting **I accept this agreement.
3. Click **ACCEPT AND CONTINUE**.**
4. Choose the support and monitoring features to use.
5. In the **Connection Information** panel, select your connectivity options.
6. Click **Test and Enable Connectivity**.
7. In the **Contact Information** panel, enter the primary contact information and select the preferred contact settings.
8. Click **Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-supportassist-and-cloudiq?guid=guid-dee50855-45f0-4a41-8f55-14706b8ae43d&lang=en-us)

### Storage Configuration

1. On the **System Configuration Main Page**, click **Start** under **Storage Configuration**.
2. In the Select Storage Type panel, review the option descriptions for Virtual and Linear storage. You can also choose to skip this step and configure storage later using **Maintenance > Settings > Storage** in the PowerVault Manager.
    - **Virtual**
    - **Linear**
    - **Skip this Step**
3. Click **Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/storage-configuration?guid=guid-f300ef96-49ae-4e7f-9835-b112f117e32f&lang=en-us)

#### Set up Virtual Storage

1. To automatically set up storage, click **Auto Storage Setup**.
    1. Verify that the Disk Scan results indicate that the system is Healthy.
    2. Review the pool configuration and if it meets your needs, click Apply Configuration, otherwise click Cancel and set up storage manually. After applying the configuration, the system configures the pools and spares and displays a success message when complete.
    3. Click **OK**.
2. To manually set up storage, expand **Pool A** and click **Add Disk Group**. The Add Disk Group panel opens.
    1. In the **Configuration** section, choose the **Protection Level** (RAID) from the drop down box.
    2. In the **Available Disks** section, select the disks to include in the pool.
    3. Review the **Summary**, and click **Add Disk Group**.
    4. Click **OK**.
    5. Repeat these steps for **Pool B**.
    6. In the **Storage Type > Pools** panel click **Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-virtual-storage?guid=guid-677253c5-1189-4e78-b5c7-011a8c9f47e4&lang=en-us)

### Provisioning

The Provisioning setup guides you through the process to connect to hosts and create initial volumes. Hosts must be configured and attached to the ME5 Series storage system to complete provisioning.

1. On the **System Configuration Main Page**, click **Start** under **Provisioning**.
2. Click **Continue**.

#### Set up Hosts

Configure host servers as described in [Host Setup](me5-host-setup.md).

1. Select **Create a New Host**.
2. Enter a **Host Name**.
3. Select an initiator from the list to assign to this host.
4. **Click Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-hosts?guid=guid-347e2251-0531-42de-b975-497de068f89a&lang=en-us)

#### Set up Volumes

You can also add or edit volumes after initial setup using the **Provisioning > Volumes** panel in the PowerVault Manager.

1. If you want to attach volumes now, select **Attach host or host groups to volumes**. You can skip this step and set up volumes later if you prefer.
2. If you are attaching volumes now, select whether to create new volumes or select existing volumes to attach to the host.
3. Click **Continue**.
4. Select the pool for the new volume and enter a **Volume Name**.
5. Enter the **Volume Size** and select the units of measure. Optionally, you can choose to use the remaining space for the volume.
6. Click **Add Volume**.
7. Review the volume parameters. From this panel you can:
    - Delete the volume (Trash can icon)
    - **Add New Volume**
    - Click Continue to proceed
8. Review the provision summary and click **Continue** to proceed, or **Back** to return to make changes.
9. Click **OK** at the Success prompt.

The final provisioning pane displays from which you can can configure additional hosts or click **Continue**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/set-up-volumes?guid=guid-e791b658-7e6c-4664-a3e8-997dd2c45b23&lang=en-us)