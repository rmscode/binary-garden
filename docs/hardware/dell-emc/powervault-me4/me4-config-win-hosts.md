# Configure Windows Host with iSCSI Network Adapters

Attached Windows hosts need to be properly configured in order to use the iSCSI protocol with the ME4 storage system and to enable MPIO volumes.

## Prerequisites

- Complete the PowerVault Manager guided setup process and storage setup process.
- Refer to the cabling diagrams within this guide before attaching a host to the storage system.
- Complete a [planning worksheet](../../../assets/me4-system-information-worksheet.pdf) with the iSCSI network IP addresses to be used.

## Attach Windows host to the storage system

1. Ensure that all network adapters have the latest supported firmware and drivers.
2. Use the iSCSI cabling diagrams to connect the hosts to the storage system ether by using switches or connecting the hosts directly to the storage system.
3. Install MPIO on the iSCSI hosts (Document this if not in Matt's docs).

## Assign IP Addresses for each network adapter connecting to the iSCSI network

!!! note

    If using Jumbo Frames, they must be enabled and configured on all devices in the data path, adapter ports, switches, and storage system.

1. Open Network Connections Properties (ncpa.cpl)
2. For each iSCSI network adapter, configure the following according to the planning worksheet:
      - IPv4 Address
      - Subnet Mask
      - Default Gateway if appropriate
3. From the command prompt, ping each of the controller IPs to verify host connectivity to the storage system before proceeding.

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
9.  Repeat steps 3-8 for NIC 2, connecting it to the targets on the second subnet.
      - !!! tip "After all connections are made, you can click the **Favorite Targets** tab to see each path. If you click **Details**, you can view specific information the selected path."    
10. Click the **Configuration tab** and record the initiator name in the **Initiator Name** field. The initiator name is needed to map volumes to the host.
      - !!! note "This is required for multi-path configurations."  
11. Click **OK** to close the **iSCSI Initiator Properties** dialog box.

## Register the Windows host and create volumes

1. Log in to the PowerVault Manager.
2. Access the Host Setup wizard:
      1. From the Welcome screen, click **Host Setup**.
      2. From the Home topic, select **Action** > **Host Setup**.
3. Confirm that you have met the listed prerequisites, then click **Next**.
4. Type a host name in the **Host Name** field.
5. Using the information from step 10 of the Configure the iSCSI Initiator (above), select the iSCSI initiators for the host you are configuring, then click **Next**.
6. Group hosts together with other hosts in a cluster.
      - For cluster configurations, group hosts together so that all hosts within the group share the same storage.
         - If this host is the first host in the cluster, select **Create a new host group**, type a name for the host group, and click **Next**.
         - If this host is being added to a host group that exists, select **Add to existing host group**, select the group from the drop-down list, and click **Next**.
         - !!! note "The host must be mapped with the same access, port, and LUN settings to the same volumes or volume groups as every other initiator in the host group."
7. On the Attach Volumes page, specify the name, size, and pool for each volume, and click **Next**. To add a volume, click **Add Row**. To remove a volume, click **Remove**.
      - !!! note "Dell recommends that you update the volume name with the hostname to better identify the volumes."
8. On the Summary page, review the host configuration settings, and click **Configure Host**.
If the host is successfully configured, a **Success** dialog box is displayed.
9. Click **Yes** to return to the Introduction page of the wizard, or click **No** to close the wizard.

## Enable MPIO for the volumes on the Windows host

1. Open Server Manager.
2. Select **Tools** > **MPIO**.
3. Click the **Discover Multi-Paths** tab.
4. Select **DellEMC ME4** in the **Device Hardware Id** list.
      - If **DellEMC ME4** is not listed in the **Device Hardware Id** list:
        1. Ensure that there is more than one connection to a volume for multipathing.
        2. Ensure that **Dell EMC ME4** is not already listed in the **Devices** list on the **MPIO Devices** tab.
5. Click **Add** and click **Yes** to reboot the Windows server.

## Update the iSCSI initiator on the Windows host

1. Open Server Manager.
2. Click **Tools** > **iSCSI initiator**.
3. Click the **Volumes and Devices** tab.
4. Click **Auto Configure**.
5. Click **OK** to close the **iSCSI Initiator Properties** window.

## Format volumes on the Windows host

1. Open Server Manager.
2. Select **Tools** > **Computer Management**.
3. Right-click **Disk Management** and select **Rescan Disks**.
4. Right-click on the new disk and select **Online**.
5. Right-click on the new disk again select **Initialize Disk**. The **Initialize Disk** dialog box opens.
6. Select the partition style for the disk and click **OK**.
7. Right-click on the unallocated space, select the type of volume to create, and follow the steps in the wizard to create the volume.