---
status: new
---

# Firmware Updates

!!! info 

    The Update Firmware dialog box displays the current versions of firmware on the controller modules, expansion modules, and disk drives.

    If SupportAssist is enabled on an ME4 Series storage system, the storage system periodically checks if a firmware update is available. If a firmware update is available, a message about the firmware update is added to the storage system event log.

!!! tip "See also, [Best Practices: Firmware Updates](../powervault-me4/me4-best-practice.md#firmware-updates)."

## Controller Module Firmware

In a dual-controller system, both controller modules should run the same firmware.

### Prepare to update the controller module(s)

1. [Download](https://www.dell.com/support/home/en-us/product-support/product/powervault-me4024/drivers) the appropriate firmware .zip file to your computer or network.
2. Extract the firmware .bin file from the .zip file.
3. If the storage system has a single controller, [stop I/O](me4-shutdown-controller.md) to the storage system before you start the firmware update. 

!!! note

    A dual controller system connected to hosts with redundant pathways and properly configured multipathing software can be updated without stopping I/O. While one controller is being updated, the other continues to process I/O. [Source](https://www.dell.com/support/kbdoc/en-us/000120120/me4-how-to-upgrade-controller-firmware).

### Update the controller module(s)

1. Perform one of the following as a user with the manage role:
      -  In the banner, click the system panel and select **Update Firmware**.
      -  In the System topic, select **Action** > **Update Firmware**.
2. Click Browse and select the firmware file to install.
3. Optionally, select or clear the Partner Firmware Update (PFU) check box to enable or disable PFU, and confirm the action.
4. Click OK.
      - !!! warning "Do not perform a power cycle or controller restart during a firmware update. If the update is interrupted or there is a power failure, the module might become inoperative. If this issue occurs, contact technical support. The module might need to be returned to the factory for reprogramming." 
5. Clear your web browser cache, then sign in to the PowerVault Manager. If PFU is still running on the controller you sign in to, a panel shows PFU progress and prevents you from performing other tasks until PFU is complete. 

!!! note "Firmware updates typically takes 10 minutes for a controller with current CPLD firmware, or 20 minutes for a controller with downlevel CPLD firmware."

??? tip "Use the activity progress interface"

      1. From Home or System topic, select **Action** > **System Settings**, then click the **Services** tab. 
      2. Enable **Activity Progress Reporting**. 
      3. Navigate to `http://<controller-ip>:8081/cgi-bin/content.cgi?mc=<MC-ID>&refresh=true` where:
         1.  `<controller-IP>` - IP address of the controller module
         2.  `mc=A` - Shows output for controller A
         3.  `mc=B` - Shows output for controller B
         4.  `mc=both` - Shows output for both controllers
         5.  `mc=self` - Shows output for the controller whose IP ip is specified in the URL



## Disk Firmware

!!! info "Disks of the same model in the storage system **MUST** have the same firmware revision."

You can specify to update all disks or only specific disks. If you specify to update all disks and the system contains more than one type of disk, the update will be attempted on all disks in the system. The update will only succeed for disks whose type matches the file, and will fail for disks of other types.

### Prepare to update the disk-drives

1. Obtain the appropriate firmware file and download it to your computer or network.
2. In the PowerVault Manager, prepare to use FTP:
      1. Determine the network-port IP addresses of the system controllers. (Defaults: A-10.0.0.2/B-10.0.0.3, or whatever you configured)
      2. Verify that the FTP/SFTP service is enabled on the system. (Action > System Settings System Services tab)
      3. Verify that the user you plan to use has manage role permissions and FTP/SFTP interface permissions.
3. [Stop I/O](me4-shutdown-controller.md) to the storage system. During the update all volumes will be temporarily inaccessible to hosts. If I/O is not stopped, mapped hosts will report I/O errors. Volume access is restored after the update completes.

> Document [enabling FTP](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/enable-or-disable-system-management-settings?guid=guid-e222335a-3e1b-446e-81ac-f7222649673a&lang=en-us)

### Update the disk-drives

!!! note

      "The CLI must be used to perform the firmware. Stopping I/O includes shutting down the storage controllers which in turn shuts down access to the PowerVault manager."

1. Open a command prompt and navgate to the directory containing the firmware update file to load.
2. Type `ftp <controller-network-address>`. For example, `ftp 10.0.0.2`.
3. Log in as a user with manage role permissions and FTP/SFTP interface permissions.
4. Perform either of the following tasks:
      - Update all disks of the type that the firmware applies to: `put <firmware-file> disk`. For example, `put AS10.bin disk`.
      - Update specific disks: `put <firmware-file> disk:<enclosure-ID>:<slot-number>`. For example, `put AS10.bin disk:1:11`.
      - !!! warning "Do not perform a power cycle or controller restart during a firmware update. If the update is interrupted or there is a power failure, the module might become inoperative. If this issue occurs, contact technical support. The module might need to be returned to the factory for reprogramming."
5. If you are updating specific disks, repeat step 4 for each remaining disk to update.
6. Quit the FTP/SFTP session.
7. If the updated disks must be power cycled:
      1. Shut down both controllers by using the PowerVault Manager.
      2. Power cycle all enclosures as described in the Dell PowerVault ME4 Series Storage System Deployment Guide. (Link and document)
8. Verify that each disk has the corect firmware version. 

!!! note "Firmware updates typically takes several minutes to load. In FTP, wait for the message `Operation Complete` to appear. No messages are displayed in SFTP."

!!! info "If the update fails, verify that you specified the correct firmware file and try the update a second time. If it fails again, contact technical support."