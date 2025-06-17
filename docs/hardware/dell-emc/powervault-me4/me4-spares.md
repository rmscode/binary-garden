# Spares <small>(Parity Disks)</small>

Spare disks are unused disks in your system that you designate to automatically replace a failed disk, restoring fault tolerance to disk groups in the system. Types of spares include:

- Dedicated spare. Reserved for use by a specific linear disk group to replace a failed disk. Most secure way to provide spares for disk groups, but expensive to reserve a spare for each disk group.
- Global spare. Reserved for use by any fault-tolerant disk group to replace a failed disk.
- Dynamic spare. Available compatible disk that is automatically assigned to replace a failed disk in a fault-tolerant disk group.

A controller automatically reconstructs a fault-tolerant disk group (RAID 1, 3, 5, 6, 10, 50) when one or more of its disks fails and a compatible spare disk is available. A disk is compatible if it has enough capacity to replace the failed disk and is the same speed and type (enterprise SAS, for example). It is not advisable to mix 10k and 15k disks in a single disk group. If the disks in the system are FDE-capable and the system is secure, spares must also be FDE-capable.

When a disk fails, the system looks for a dedicated spare first. If it does not find a dedicated spare, it looks for a global spare. If it does not find a compatible global spare and the dynamic spares option is enabled, it takes any available compatible disk. If no compatible disk is available, reconstruction cannot start.

!!! note "A best practice is to designate spares for use if disks fail. Dedicating spares to disk groups is the most secure method, but it is also expensive to reserve spares for each disk group. Alternatively, you can enable dynamic spares or assign global spares."

## Add/Remove Global Spares

To add:

1. In the Pools topic, select **Action > Manage Spare**. The Manage Spare panel opens.
2. To add global spares, click on the available disks to highlight them. 
3. Click **Add Spares**. The system updates the global spares and a confirmation panel opens.
4. To close the confirmation panel, click **OK**.

To remove:

1. In the Pools topic, select **Action > Manage Spare**. The Manage Spare panel opens.
2. To remove global spares, click on current spares to deselect them.
3. Click **Remove**. The system updates the global spares and a confirmation panel opens.
4. To close the confirmation panel, click **OK**.

## Add Dedicated Spares

1. In the Pools topic, select the linear pool for the disk group that you are modifying in the pools table. Then, select the disk group in the Related Disk Groups table.
2. Select **Action > Manage Spares**. The Manage Spares panel opens.
3. Check the **Assign dedicated spares to the disk group** box, then select the disk group in which you want the dedicated spare to reside.
4. In the Add New Spares section, click on available disks to select them.
5. Click **Add Spares**. The system updates the dedicated spares and a confirmation panel appears.
6. To close the confirmation panel, click **OK**.

!!! Note

    Dell docs didn't offer steps on removing dedicated spares. I'm not sure if that was an oversight, impossibility, or if it's the same method as removing global spares.