# Microsoft Failover Cluster

## Replace Quorum Disk

1. Add to storage to your failover cluster so that is visible in available storage
2. Go to failover Cluster manager > More Actions > configure quorum settings
3. Select quorum model and point to your new disk
4. Failover cluster will reconfigure your quorum disk and the old quorum disk is back to available storage

## Add VM Role to the Cluster

1. Choose a node, any node, and create a VM.
      - Be sure to store the VM in a Cluster Shared Volume
2. In the Cluster Manager select the cluster 
3. Select Roles.
4. On the right, go to Configure Role
5. Select Virtual Machine from the list
6. Choose an available VM from a node. 

## iSCSI Target Stuck Reconnecting

To fix this error, go to iSCSI Initiator and delete the reconnecting target from the Favorite Targets tab. After you have done this, follow to the Targets tab, disconnect the reconnecting target manually by pressing the Disconnect button and connect it again.

## Remove a VM Role from the Cluster

Right click VM role in VM cluster manager and select remove.

```powershell
$VM = Get-VM -Name "VMName"
Remove-ClusterGroup -VMId $VM.VMId -Force -RemoveResources
```

## Destroy a Cluster

1. Remove nodes:
      1. Right click each node and select More Actions > Stop Cluster Service
      2. Wait for status go from Draining to Down.
      3. Evict all but one node. Right click > More Actions > Evict
2. Remove any clustered roles:
      1. Right click role and remove.
3. Destroy cluster:
      1. Right click cluster name and select More Actions > Destroy Cluster...

## Pin a VM to a Specific Node

1. Open Failover Cluster Manager
2. Under Roles select the VM
3. In the bottom pane expand the Virtual Machine resource in the Resources tab
4. Right click on the VM configuration and select Properties
5. In the Properties dialog select the Advanced Properties tab
6. Deselect all nodes except the current node then click OK

With powershell:

```powershell
Get-ClusterResource -Name "VM1" | Set-ClusterOwnerNode -Owners node1
```

## Proper Shutdown

### Shutting Down a Node

1. Open Failover Cluster Manager (CluAdmin.msc)
2. Click on "Nodes"
3. Right-click on the node name and under **Pause** click on **Drain Roles**
4. Under Status the node will appear as Paused.  At the bottom of the center pane click on the Roles tab. Once all roles have moved off this node, it is safe to shut down or reboot the node.

PowerShell:

```powershell
Suspend-CllusterNode -Name "NodeName" -Drain
Stop-Computer
```
### Shutting down a Cluster

While you can shut down each node in the cluster individually, using the cluster UI will ensure the shutdown is done gracefully.

1. Open Failover Cluster Manager (CluAdmin.msc)
2. Right-click on the cluster name, select **More Actions**, then **Shut Down Cluster…**
3. When prompted if you are sure you want to shut down the cluster, click Yes.

To configure the shut down action for an individual VM (where "Virtual Machine" is the name of the VM):

```powershell
Get-ClusterResource "Virtual Machine" | Set-ClusterParameter OfflineAction 1
```

Value       | Effect
----------- | ------
0           | VM is turned off
1 (Default) | VM state is saved
2           | Guest OS is shutdown
3           | Guest OS is shutdown forcibly

## Connecting the iSCSI Initiator(s) to the iSCSI Target(s)

1.	From the iSCSI Initiator host server run iscsicpl.exe and click yes to start the service with Windows. 
2.	Discovery tab > Discover Portal > Enter the IP address or DNS name of the iSCSI Target server > OK.
3.	Targets tab > Select the target from the list > Connect > Advanced > Configure the following settings: 
	- Local adapter: Microsoft iSCSI Initiator
	- Initiator IP: IP of the 1st NIC of the server
	- Target portal IP: IP of the 1st NIC/Controller of the storage appliance. 
4.	Click OK and confirm connection.
> Note: For a multi-path setup, you are going to perform step 3 from above for EACH path making sure the “Enable multi-path” box is ticked. For example, for a second path you would select the IP of the 2nd NIC on the server and the IP of the 2nd NIC/controller on the storage appliance. 

PowerShell:
```ps
Start-Service -Name MSiSCSI
Set-Service -Name MSiSCSI -StartupType Automatic
```

## Failed to create Planned Virtual Machine at migration destination: The object already exists.

1. Navigate to the following path on the node(s) where the VM is *not* running:
            `C:\ProgramData\Microsoft\Windows\Hyper-V\Virtual Machines\Virtual Machines Cache\`
2. Delete, rename, or move the files/folders matching the VM that won't migrate. You may need to temporarily stop the Hyper-V service and be quick about deleting the cache files.

## Confirm MPIO

**Open command prompt and enter the following command**:

```cmd
mpclaim -s -d
```

The output should look something like this:

```cmd
MPIO Disk    System Disk  LB Policy    DSM Name
-----------------------------------------------------
MPIO Disk1   Disk 2       RR           Microsoft DSM
MPIO Disk0   Disk 1       RR           Microsoft DSM
```

> The multipathing load balancing policy is show under "LB policy". In the example above, RR stands for **R**ound **R**obin. 

**To view the number of paths to a volume, indicate the MPIO Disk #**:

```cmd
mpclaim -s -d 2
```

The output should look something like this:

```cmd
MPIO Disk1: 02 Paths, Round Robin, Symmetric Access
 Controlling DSM: Microsoft DSM
 SN: 6002AE000000013B006E3B

Supported Load Balance Policies: FOO RR RRWS LQD WP LB

Path ID          State              SCSI Address      Weight
 ----------------------------------------------------------
0000000087060001 Active/Optimized   005|000|001|001   0
 * TPG_State : Active/Optimized  , TPG_Id: 256, : 24

0000000087060000 Active/Optimized   005|000|000|001   0
 * TPG_State : Active/Optimized  , TPG_Id: 256, : 22

```