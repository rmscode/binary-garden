# System and Storage Setup

!!! tip "System Information Worksheet"

    Use the [System Information Worksheet](../../../assets/me4-system-information-worksheet.pdf) found on page 100 of the [deployment guide](https://dl.dell.com/content/manual65252048-dell-powervault-me4-series-storage-system-deployment-guide.pdf?language=en-us) to record the information that you need to install the ME4 Series storage system.

Upon completing the hardware installation, use PowerVault Manager to configure, provision, monitor and manage the storage system. When first accessing the PowerVault Manager, perform a firmware update before configuring your system. After the firmware update is complete, use the guided setup to verify the web browser requirements and then access the PowerVault Manager.

!!! note

    The PowerVault web interface requires Firefox 57 or later, Chrome 57 or later, MS Internet Explorer 10 or 11, or Safari 10.1 or later. Dell says you cannot view Help content if you are using the Microsoft Edge browser that ships with Windows 10 . . . I'm thinking that this was pre Chromium Edge. 

## Accessing the PowerVault Manager

!!! info

    The [ME4 Series Administrators Guide](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub) is the primary reference for using the PowerVault Manager.

1. Temporarily set the management host NIC to a 10.0.0.x address or to the same IPv6 subnet to enable communication with the storage system.
      - !!! note "If the default IP addresses (10.0.0.2 - Controller A, 10.0.0.3 - Controller B) are not compatible with your network, refer to ["Accessing the CLI"](../powervault-me4/me4-cli.md) to learn how to set the network port IP addresses."
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

!!! tip "See also, [Firmware Updates](../powervault-me4/me4-firmware-updates.md)."

## Guided setup

!!! info

    When you first access the Welcome panel wizard, you are prompted to select the type of storage to use for your environment. Dell recommends using virtual storage. See the [About virtual and linear storage](../powervault-me4/me4-virtual-linear-storage.md) section for more information.

    See also, [Best Practices: Performance](me4-best-practice.md#performance)

The *Welcome* panel provides options for you to quickly set up your system by guiding you through the configuration and provisioning process.

With guided setup, you must first configure your system settings by accessing the System Settings panel and completing all required options.

1. From the *Welcome* panel, access the *System Settings* panel and complete all the required options (red asterisk).
2. Save your settings and exit to the *Welcome* panel.
3. Click *Storage Setup* and follow the prompts to begin provisioning your system by configuring [disk groups](../powervault-me4/me4-pools.md#disk-groups), [spares](../powervault-me4/me4-spares.md) and [pools](../powervault-me4/me4-pools.md).
4. Save your settings and exit to the *Welcome* panel.
5. Click *Host Setup* and follow the prompts to continue provisioning your system by [attaching hosts](../powervault-me4/me4-host-setup.md).

!!! note

    The Dell docs don't go into detail about how in depth the "guided setup" is...No idea if it walks you through volume/initiator mappins (LUNs) or not. Check out the "System Concepts" section on the left for more system configuration info.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4024/me4_series_ag_pub/guided-setup?guid=guid-f2532697-d39f-4a6b-875d-8fe3a4688931&lang=en-us)

## Adding, modifying, and deleting users

Log in as a user with the `manage` role and perform the following:

In the Home or System topic, select Action > System Settings, then click the Managing Users tab.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4084/me4_series_ag_pub/adding-modifying-and-deleting-users?guid=guid-bb8280fb-7a05-4e13-8d41-21fa517e3b85&lang=en-us)