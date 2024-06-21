---
status: new
---

# Host Setup (Windows)

Attached Windows hosts with iSCSI network adapters need to be properly configured in order to use the iSCSI protocol with the ME5 storage system and MPIO enabled volumes.

## Prerequisites

- Ensure that all HBAs (NICs) are installed and have the latest supported firmware and drivers as described on Dell.com/support.
    - For a list of supported HBAs, see the Dell ME5 Series Storage System Support Matrix on the Dell support site.
- Cable the host servers as described in the [deployment brief](me5-deployment-brief.md#cable-the-controller-host-ports-iscsi).
- Complete a [planning worksheet](../../../assets/me4-system-information-worksheet.pdf) with the iSCSI network IP addresses to be used.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/prerequisites?guid=guid-fabca474-bc6c-41df-a12d-e53bf891a0ad&lang=en-us)

## Assign IP Addresses for each network adapter connecting to the iSCSI network

1. Open Network Connections Properties (ncpa.cpl)
2. For each iSCSI network adapter, configure the following according to the planning worksheet:
      - IPv4 Address
      - Subnet Mask
      - Default Gateway if appropriate
3. From the command prompt, ping each of the controller IPs to verify host connectivity to the storage system before proceeding.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/assign-ip-addresses-for-each-network-adapter-connecting-to-the-iscsi-network?guid=guid-2258ee8a-e287-42da-8ed9-099e355c46f4&lang=en-us)

## Install MPIO on the Hosts

1. Open PowerShell and type the following:

      ```ps
      Install-WindowsFeature -Name Multipath-IO
      ```

2. Reboot the server.

## Configure iSCSI Initiator on the Windows host

1. Press the Windows key and search for "iSCSI"
2. Open the **iSCSI Initiator** app
      - If you are running the iSCSI initiator for the first time, click **Yes** when prompted to have it start automically when the server reboots.
3. Click the **Discovery** tab, then click **Discovery Portal**. The **Discovery Target Portal** dialog box opens.
4. Using the planning worksheet that you crated in the Prequisites section, enter the IP address of a port on controller A that is on the first subnet and click **OK**.
5. Repeat steps 3-4 to add the IP address of a port on the second subnet that is from controller B.
6. Click the **Targets** tab, select a discovered target, and click **Connect**.
7. Select the Enable multi-path check box and click **Advanced**. The **Advanced Settings** dialog box opens.
      1. Select **Microsoft iSCSI initiator** from the **Local adapter** drop-down menu..
      2. Select the IP address of NIC 1 from the **Initiator IP** drop-down menu.
      3. Select the first IP listed in the same subnet from the **Target portal IP** drop-down menu.
      4. Click **OK** twice to return to the **iSCSI Initiator Properties** dialog box.
8. Repeat steps 6-7 for the NIC to establish a connection to each port on the subnet.
9. Repeat steps 3-8 for NIC 2, connecting it to the targets on the second subnet.

      !!! tip "After all connections are made, you can click the **Favorite Targets** tab to see each path. If you click **Details**, you can view specific information the selected path."

10. Click the **Configuration tab** and record the initiator name in the **Initiator Name** field. The initiator name is needed to map volumes to the host.

      !!! info "This is required for multi-path configurations." 

11. Click **OK** to close the **iSCSI Initiator Properties** dialog box.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/configure-the-iscsi-initiator-on-the-windows-host?guid=guid-ff968348-ff63-401e-99ff-be474bb55d01&lang=en-us)

## Register the Windows host and create volumes

If you did not setup host during the guided setup, or if you want to add new hosts, use the PowerVault Manager to create hosts and attach volumes.

1. Log in to the PowerVault Manager and go to **Provisioning > Hosts**. The Hosts and Host Groups table will open.
2. Click **Create Host**.
3. In the Create Host panel, select the **Create a New Host** radio button and enter a Host name.
4. Select the initiator to assign to this host and click **Add Initiators To Host**.
5. Click **Continue**.
6. If you want to attach volumes now, select **Attach host or host groups to volumes**. You can skip this step and set up volumes later if you prefer.
7. If you are attaching volumes now, select whether to create new volumes or select existing volumes to attach to the host.
8. Click **Continue**.
9. If you are creating new volumes:
   - Select the pool for the new volume and enter a **Volume Name**. Use a name that indicates how the volume is used, such as {host name}_Host1_Vol1.
   - Enter the **Volume Size** and select the units of measure. Optionally, you can choose to use the remaining space for the volume.
   - Click **Add Volume**.
10. If you are using an existing volume, select the volume or volumes to attach to the host.
11. Click **Continue** to proceed.
12. Review the provisioning configuration and click **Continue** to proceed, or **Back** to return to make changes to the provisioning.
13. Click **OK** at the Success prompt and return to the PowerVault Manager Dashboard.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/create-a-host-and-attach-volumes-in-powervault-manager?guid=guid-81eb960d-aad9-488f-a3d5-89f31ad0e8a2&lang=en-us)

## Enable MPIO for the volumes on the Windows host

1. Open Server Manager.
2. Select **Tools** > **MPIO**.
3. Click the **Discover Multi-Paths** tab.
4. Select **DellEMC ME5** in the **Device Hardware Id** list.
      - If **DellEMC ME5** is not listed in the **Device Hardware Id** list:
        1. Ensure that there is more than one connection to a volume for multipathing.
        2. Ensure that **Dell EMC ME5** is not already listed in the **Devices** list on the **MPIO Devices** tab.
5. Click **Add** and click **Yes** to reboot the Windows server.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/enable-mpio-for-the-volumes-on-the-windows-host?guid=guid-48d1a55c-f905-4959-bc6f-f4692a70218d&lang=en-us)

## Format volumes on the Windows host

1. Open Server Manager.
2. Select **Tools** > **Computer Management**.
3. Right-click **Disk Management** and select **Rescan Disks**.
4. Right-click on the new disk and select **Online**.
5. Right-click on the new disk again select **Initialize Disk**. The **Initialize Disk** dialog box opens.
6. Select the partition style for the disk and click **OK**.
7. Right-click on the unallocated space, select the type of volume to create, and follow the steps in the wizard to create the volume.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_dg/format-volumes-on-a-windows-host?guid=guid-29883fd1-4d98-492b-977e-106cbd6f1b73&lang=en-us)
