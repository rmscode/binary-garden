# MABS

Microsoft Azure Backup Server (MABS) is a backup solution designed to protect data across on-premises systems. Built on System Center Data Protection Manager (DPM) technology, MABS enables backup and recovery of critical workloads, including Hyper-V virtual machines, Microsoft workloads (SQL, Exchange, SharePoint), file servers, and Windows clients. It offers disk-to-disk-to-cloud (D2D2C) backup, allowing seamless integration with Azure for long-term data retention and disaster recovery. MABS supports both short-term, local backups and secure, offsite backups in Azure, providing a comprehensive and flexible approach to data protection. MABS gives you nearly everything you get in DPM, excluding tape backups and some advanced features.

!!! note

    Throughout this doc, you will see plenty of linked references to Microsoft's DPM documentation. MABS is just a customized version of DPM, so at its core they are almost the same product. Most under-the-hood technical details and concepts are only available in the DPM documentation anyway.

??? info "Key Terms and Concepts"

    `Bare Metal Backup`

    :   Backs up operating system files and all data except user data on critical volumes. By definition, a BMR backup includes a system state backup. It provides protection when a machine won't start and you have to recover everything.[^1]

    `Consistency Check`

    :   A block-by-block verification of the replica against the data source to ensure that the replica is consistent with the data source.[^2] Consistency checks will repair the replica to make it consistent with the data source.[^3]

    `Express Full Backup`

    :   During the type of synchronization that is labeled "express full backup", a full Volume Shadow Copy Service (VSS) snapshot where only the changed blocks are transferred to the DPM server.[^4]

    `Protection Group`

    :   Protection groups are used to manage the protection of data sources on computers. A protection group is a collection of data sources that share the same protection configuration.[^5]

    `Recovery Point`

    :   A recovery point is a version of the data from which data can be recovered. Each express full backup and synchronization create recovery points.[^6]

    `Replica`

    :   A complete copy of the data that is on protected servers.[^7]

    `Synchronization`

    :   The operation that is labeled "synchronization" is analogous to an incremental backup, and it creates an accurate reflection of the application data when combined with the replica.[^8]

    `System State Backup`

    :   Backs up operating system files, enabling you to recover when a machine starts but you've lost system files and registry.[^9]

## Protection Process

MABS maintains a replica, or copy, of the data that is on protected servers. The method used to synchronize the replica depends on the type of data being protected.

### File data

The protection agent uses a volume filter and the change journal to determine which files have changed and then performs a checksum procedure for these files to synchronize only the changed blocks. During synchronization, these changes are transferred to the MABS server and then applied to the replica to synchronize the replica with the data source.

### Application data

After the replica is created by MABS, changes to volume blocks that belong to application files are tracked by the volume filter. How changes are transferred to the MABS server depends on the application and the type of synchronization. Each express full backup, and each synchronization if the application supports incremental backups, creates a recovery point for application data.

## Synchronization frequency

In the new protection group wizard, you can specify the synchronization frequency for your backups under "Select short-term goals". This determines how often the data is synchronized between the protected server and the DPM server. The synchronization frequency can be set to an interval of 15 minutes, 30 minutes, 1 hour, 3 hours, 6 hours, 12 hours, or 1 day. If you do not want to set a backup interval, you can check "just before a recovery point" so that MABS will run an express full backup just before each recovery point is scheduled.[^10]

### 

## Host vs Guest Backup

At the host level, MABS protects entire VM(s) and data files on that host. At the guest level, MABS protects the workloads present on the VM(s).

If you deploy host level backup, you can recover an entire VM or specific files, but it won't provide recovery in the context of a specific application. For example, to recover specific SharePoint items from a backed-up VM, you should do guest-level backup of that VM. Use guest-level backup if you want to protect data stored on passthrough disks. Passthrough allows the virtual machine to directly access the storage device and doesn't store virtual volume data in a VHD file.

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

[^1]: [Microsoft Learn: Back up system state and restore to bare metal by using Azure Backup Server](https://learn.microsoft.com/en-us/azure/backup/backup-mabs-system-state-and-bmr) First paragraph, bullet point 2.

[^2]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#disk-based-protection-process) Third paragraph under "Disk-based protection process".

[^3]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#the-file-data-synchronization-process) Second paragraph under "The file data synchronization process".

[^4]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#the-application-data-synchronization-process) Third paragraph under "The application data synchronization process".

[^5]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#disk-based-protection-process) Sixth paragraph under "Disk-based protection process".

[^6]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#the-file-data-synchronization-process) Last paragraph under "The file data synchronization process".

[^7]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#disk-based-protection-process) First paragraph under "Disk-based protection process".

[^8]: [Microsoft Learn: How does DPM work?](https://learn.microsoft.com/en-us/system-center/dpm/how-dpm-protects-data?view=sc-dpm-2019#the-application-data-synchronization-process) Second paragraph under "The application data synchronization process".

[^9]: [Microsoft Learn: Back up system state and restore to bare metal by using Azure Backup Server](https://learn.microsoft.com/en-us/azure/backup/backup-mabs-system-state-and-bmr) First paragraph, bullet point 1.

[^10]: [Microsoft Learn: Back up file data with MABS](https://learn.microsoft.com/en-us/azure/backup/back-up-file-data#back-up-file-data) Item 5 under "Back up file data".

[^11]: [Microsoft Learn: Back up Hyper-V virtual machines with Azure Backup Server](https://learn.microsoft.com/en-us/azure/backup/back-up-hyper-v-virtual-machines-mabs#back-up-hyper-v-virtual-machines) Item 6 under "Back up Hyper-V virtual machines".