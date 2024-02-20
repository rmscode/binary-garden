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
