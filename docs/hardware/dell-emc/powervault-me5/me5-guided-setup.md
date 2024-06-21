---
status: new
---

# System and Storage Setup

Upon completing the hardware installation, use PowerVault Manager to configure, provision, monitor and manage the storage system. When first accessing the PowerVault Manager, perform a firmware update before configuring your system. After the firmware update is complete, use the guided setup to verify the web browser requirements and then access the PowerVault Manager.

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

1. Temporarily set the management host NIC to a 10.0.0.x address or to the same IPv6 subnet to enable communication with the storage system.
      - !!! note "If the default IP addresses (10.0.0.2 - Controller A, 10.0.0.3 - Controller B) are not compatible with your network, refer to ["Accessing the CLI"](../powervault-me5/me5-cli.md) to learn how to set the network port IP addresses."
2. In a supported web browser, type `https://10.0.0.2` to access controller module A on an IPv4 network.
3. If the storage system is running G275 firmware:
      1. Sign in to the PowerVault Manager using the following user name and password:
         - Username: `manage`
         - Password: `!manage`
      2. Read and accept the Commercial Terms of Sale and End User License Agreement.
4. If the storage system is running G280 firmware:
      1. Click *Get Started*.
      2. Read and accept the Commercial Terms of Sale and End User License Agreement.
      3. Type a new user name for the storage system in the *Username* field.
      4. Type password for the new username in the Password and Confirm Password fields.
      5. Click Apply and Continue.

## Update the firmware

1. Using the PowerVault Manager, select Action > Update Firmware in the System topic.
2. Locate firmware updates at <https://www.dell.com/support>. If newer versions are vailable, download the bundle file or relevant firmware components.
3. Click *Browse*, select the firmware bundle file or component file, and click *OK*.

When the update completes, the system restarts.

!!! tip "See also, [Firmware Updates](../powervault-me5/me5-firmware-updates.md)."

## Guided setup

!!! info

    When you first access the Welcome panel wizard, you are prompted to select the type of storage to use for your environment. Dell recommends using virtual storage. See the [About virtual and linear storage](../powervault-me5/me5-virtual-linear-storage.md) section for more information.

    See also, [Best Practices: Performance](me5-best-practice.md#performance)

The *Welcome* panel provides options for you to quickly set up your system by guiding you through the configuration and provisioning process.

With guided setup, you must first configure your system settings by accessing the System Settings panel and completing all required options.

1. From the *Welcome* panel, access the *System Settings* panel and complete all the required options (red asterisk).
2. Save your settings and exit to the *Welcome* panel.
3. Click *Storage Setup* and follow the prompts to begin provisioning your system by configuring [disk groups](../powervault-me5/me5-pools.md#disk-groups), [spares](../powervault-me5/me5-spares.md) and [pools](../powervault-me5/me5-pools.md).
4. Save your settings and exit to the *Welcome* panel.
5. Click *Host Setup* and follow the prompts to continue provisioning your system by [attaching hosts](../powervault-me5/me5-host-setup.md).

!!! note

    The Dell docs don't go into detail about how in depth the "guided setup" is...No idea if it walks you through volume/initiator mappins (LUNs) or not. Check out the "System Concepts" section on the left for more system configuration info.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4024/me4_series_ag_pub/guided-setup?guid=guid-f2532697-d39f-4a6b-875d-8fe3a4688931&lang=en-us)

## Adding, modifying, and deleting users

Log in as a user with the `manage` role and perform the following:

In the Home or System topic, select Action > System Settings, then click the Managing Users tab.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4084/me4_series_ag_pub/adding-modifying-and-deleting-users?guid=guid-bb8280fb-7a05-4e13-8d41-21fa517e3b85&lang=en-us)