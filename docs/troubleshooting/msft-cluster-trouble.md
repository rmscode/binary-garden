# Microsoft Failover Cluster

## Forcefully Clear Cluster Node

In the event that you cannot properly evict a node and `Remove-ClusterNode` does not work, try the following:

```ps
Import-Module FailoverClusters
Clear-ClusterNode -Name 'Node-01' -Force
```

## VM Fails Live Migrate: Different CPUs

If nodes with different CPUs exist in a cluster, clustered VMs will fail to live migrate with the following error:

"The virtual machine ... is using processor specific features not supported on physical computer ..."

A cluster with nodes of different hardware is not recommended in production, but sometimes you've got to work with what you have in a lab environment.

1. Shut down the VM
2. Open its settings in Hyper-V manager by right clicking the VM.
3. Expand **Processor Options** in the left pane and click **Compatibility**.
4. Tick the box that allows **Migrate to a physical computer with a different processor version**.

!!! note

    In my testing, I would occasionally come across this error despite having the above option enabled. A work around that I found was to stop the VM in the Cluster Manger and then proceed with the migration. From there, the VM would then successfully perform live migrations. Disabling checkpoints also seemed to help.

## VM Fails to Migrate: Object already exists

`Failed to create Planned Virtual Machine at migration destination: The object already exists.`

This happened to me in a lab environment. I can't quite recall what lead to this error, but this is what I have from my notes...

1. On the node(s) that the VM won't migrate to, navigate to `C:\ProgramData\Microsoft\Windows\Hyper-V\Virtual Machines\Virtual Machines Cache\`.
2. Delete, rename or move the files/folders matching the VM that won't migrate.

You may need to stop the Hyper-V service and be quick about deleting the cache files. While a clustered VM is running on another node, I have found that the Hyper-V service will quickly restart itself.

## No iSCSI Disk Present After Successful Connection to Target

In testing, I ran into an issue where I could not see the iSCSI disk after making a successful connection to the target. It was later resolved by editing the registry.

`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\msdsm\Parameters`

Check that `DsmSupportDeviceList` has an entry for `MSFT20055iSCSIBusType_0x9`.

Things were working normally prior to uninstalling and then reinstalling MPIO on that server. I am assuming this had something to do with it. The reason I reinstalled MPIO was to take notes of the steps involved for my own documentation.