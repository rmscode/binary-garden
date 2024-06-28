# Storage Snapshots: Technical Overview

## Introduction

Storage snapshots are a critical component of modern data management and protection strategies. They enable quick data recovery, reduce downtime, and ensure data integrity by capturing the state of a storage system at a specific point in time. This document provides an overview of storage snapshots, including their types and benefits.

## Types of Storage Snapshots

### 1. Copy on Write (CoW)

Copy on Write (CoW) snapshots are an efficient way to create point-in-time copies of data. When a CoW snapshot is created, it initially requires very little to no additional storage space as it is only a record of the original data blocks. CoW requires storage to be provisioned for snapshots, and then a snapshot of a volume has to be initiated using the reserve capacity. As changes to the original data are occur, it is copied into the reserved storage capacity set aside for the snapshot prior to being overwritten. Those original data blocks no longer belong to the active file system, but to the snapshot itself. For example, lets say I create a snapshot of a volume that contain 100GB of photos and then delete half of those photos afterwards. The snapshot will increase in size by 50GB, becuase suddenly 50GB of files changed, which the snapshot keeps track of.

- **Advantages:**
    - Minimal initial storage space.
    - Fast snapshot creation.
    - Suitable for environments with infrequent data changes.

- **Disadvantages:**
    - Potential performance impact due to write operations.
    - Increased storage requirements as more changes occur.

### 2. Redirect on Write (RoW)

Redirect on Write (RoW) snapshots are similar to CoW snapshots but differ in how they handle data changes. In RoW snapshots, when data is modified, the original data is copied to a new location, and the changes are written to the original location. This method reduces the performance impact on write operations compared to CoW snapshots.

### 3. Clone or split-mirror Snapshots

Clone snapshots, also known as split-mirrors or full copy snapshots, reference all the data on a set of mirrored drives. This method involves duplicating the entire dataset, not only new or updated data, which can be used independently from the original. The clone or split-mirror can be of a storage volume, file system or a logical unit number (LUN). 

- **Advantages:**
    - Independent copy of the data.
    - No impact on performance during write operations.
    - Highly available.

- **Disadvantages:**
    - Requires additional storage capacity.
    - Longer snapshot creation time compared to CoW because all fo the data has to be copied.

## Benefits of Storage Snapshots

1. **Rapid Recovery:**
    Snapshots allow for quick restoration of data to a previous state, minimizing downtime and data loss in case of accidental deletions, corruption, or system failures.

2. **Data Protection:**
    By capturing point-in-time copies of data, snapshots help in protecting against data corruption and ransomware attacks. They provide a reliable way to roll back to a known good state.

3. **Efficient Backups:**
    Snapshots facilitate efficient backup processes by allowing for incremental backups, where only changed data since the last snapshot is backed up. This reduces backup time and storage requirements.

4. **Test and Development:**
    Snapshots enable creating identical copies of production data for testing and development purposes without affecting the live environment. This accelerates development cycles and ensures realistic testing conditions.

## Considerations

- **Storage Overhead:** Evaluate the storage requirements for maintaining multiple snapshots, especially with full copy snapshots.
- **Performance Impact:** Assess the potential performance degradation associated with write operations in CoW snapshots.
- **Snapshot Management:** Implement policies and automation for snapshot creation, retention, and deletion to avoid excessive storage consumption and ensure compliance.

## Conclusion

Storage snapshots are a versatile and powerful tool for data protection, recovery, and management. Understanding the different types of snapshots and their respective advantages and disadvantages allows IT teams to make informed decisions based on their specific needs and workloads. Implementing an effective snapshot strategy can enhance data resilience and operational efficiency.

## References

<https://www.techtarget.com/searchdatabackup/tip/Using-different-types-of-storage-snapshot-technologies-for-data-protection></br>
<https://www.youtube.com/watch?v=ZfpCtGOibgc&t=144s></br>
<https://learn.microsoft.com/en-us/windows-server/storage/file-server/volume-shadow-copy-service></br>
<https://www.reddit.com/r/synology/comments/eu5oky/can_someone_please_explain_to_me_what_snapshot/>

