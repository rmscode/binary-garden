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