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

