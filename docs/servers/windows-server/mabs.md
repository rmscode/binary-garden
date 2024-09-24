# MABS

## Host vs Guest Backup

At the host level, MABS protects entire VM(s) and data files on that host. At the guest level, MABS protects the workloads present on the VM(s).

If you deploy host level backup, you can recover an entire virtual machine, or files and folders (item-level recovery).

At host-level you can recover an entire VM or specific files, but it won't provide recovery in the context of a specific application. For example, to recover specific SharePoint items from a backed-up VM, you should do guest-level backup of that VM. Use guest-level backup if you want to protect data stored on passthrough disks. Passthrough allows the virtual machine to directly access the storage device and doesn't store virtual volume data in a VHD file.

## New Protection Group Wizard: Explanation of Terms and Settings

Each tab below represents the different pages within the New Protection Group Wizard...

=== "Select protection group type"

    *Self explanatory...*

=== "Select group members"

    `Hyper-V > Host component`

    :   Refers to the  metadata and configuration information of the Hyper-V host itself, rather than the virtual machines running on it. By including the "Host Component" in your backup, you ensure that in addition to the VMs themselves, the backup will also include the necessary configuration data to restore the Hyper-V host and its environment to its previous state.

    `System Protection > System State Backup`

    :   Backs up operating system files. This backup allows you to recover when a computer starts, but system files and the registry are lost.

    `System Protection > Bare Metal Recovery`

    :   Backs up operating system files and all data on critical volumes, except for user data. By definition, a BMR backup includes a system state backup. It provides protection when a computer won't start and you have to recover everything. 
    
    > NOTE: BMR is not supported for computers that run Windows Server 2003 or that run a client operating system. 

=== "Select data protection method"

    *Self explanatory...*

=== "Short-term goals"

    `Synchronization frequency`

    :   Indicates how often incremental backups of the data should run. During each sync, MABS only transfers the deltas (changes) made since the last sync. The synchronization frequency directly impacts how up-to-date your recovery points are. More frequent synchronizations mean more recent data is available for recovery, reducing the potential data loss window.

    `Just before a recovery point`

    :   An alternative to the above. Instead of selecting an interval for incremental backups, MABS will run an express full backup just before each scheduled recovery point (The File and Application recovery points listed below).

    `File recovery points`

    :   Refers to the backup snapshots created specifically for file system data, such as Microsoft Office files, text files, batch files, and so forth. Specify the times to create recovery points (snapshots).

    `Application recovery points`

    :   Refers to the backup snapshots created specifically for applications, such as Exchange storage groups, SQL Server databases, Windows SharePoint Services farms, and Virtual Servers. Specify the times to create recovery points (snapshots).

=== "Review disk storage allocation"

    `Total Data Size`

    :   The size of the data you want to back up.

    `Disk space to be provisioned on DPM`

    :   The space that MABS recommends for the protection group. You can edit the backup volume choices in the **Disk storage allocation details**. **Underprovisioned space** as shown in **Available disk storage** is the amount of storage MABS suggests you add to the volume, to continue with backups smoothly in the future.

    `Average disk space allocated for change journal`

    :    Refers to the space that MABS will reserve for the change journal (also known as the USN journal on NTFS volumes) on the protected volumes. The change journal  keeps track of changes made to the files on the protected volumes. MABS uses this journal to detect which files have changed between backups, enabling efficient incremental backups by backing up only the changed data. The space allocated is a percentage of the total size of the protected volume. It is usually best to go with the default value.

=== "Choose replica creation method"

    Self explanatory... Microsoft recommends that you choose an off-peak time if you choose automatic.

=== "Consistency check options"

    Self explanatory...

=== "Specify online protection data"

    Self explanatory...

=== "Specify online backup schedule"

    *Self explanatory...*

=== "Specify online retention policy"

    *Self explanatory...*

## Retention Range

On the "Short-term goals" page of the New Protection Group Wizard, you can specify the retention range for your backups. Given the wording, I interpret this to be the total recovery points that were created within a specified *range* . . . I think we're all in agreement on this.

Consider this example: 

> IIRC, this is how we configured one of the backups in our last meeting...

- **Retention range**: 14 days
- **Synchronization frequency**: "Just before a recovery point" is selected
- **Recovery points (file or application)**: Scheduled once a week on Saturdays
- **Results**: Every Saturday, MABS will sync the data and then create a recovery point. At any given time you have 2 recovery points, one from the current week and one from the previous week...NOT 14 recovery points. 

The [MABS/DPM docs](https://learn.microsoft.com/en-us/system-center/dpm/plan-long-and-short-term-data-storage?view=sc-dpm-2022#:~:text=Note%20that%20the,points%20a%20day.) aren't very clear on this, but its how I interpret it. For what its worth, [ChatGPT](https://chatgpt.com/share/ef244997-46b9-4a3d-a605-b9131e81e177) corroborates this interpretation.

[How DPM works](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2022#the-difference-between-file-data-and-application-data)
