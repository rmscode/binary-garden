# ReFS vs NTFS

ReFS (Resilient File System) was introduced with Windows Server 2012 with intentions for it to be the successor to NTFS (New Technology File System). When I had first taken a brief look at the new storage file system, ReFS that is, it wasn't being widely adopted with the general consensus being "if it isn't broke (NTFS), don't fix it". However, it looks like ReFS has improved greatly since then.

## About ReFS

MS designed ReFS to maximize data availability, scale efficiently to large data sets across diverse workloads, and provide data integrity with resiliency to corruption. That last part is a big deal. ReFS introduces new features that can precisely detect corruption and fix it while remaining online.

- Integrity streams: ReFS uses checksums for metadata and optionally for file data, giving ReFS the ability to reliably detect corruptions.
- Storage Spaces integration: When used with a mirror or parity space, ReFS can automatically repair detected corruptions using the alternate copy of the data provided by Storage Spaces. Repair processes are both localized to the area of corruption and performed online, requiring no volume downtime.
- Salvaging data: If a volume becomes corrupted and an alternate copy of the corrupted data doesn't exist, ReFS removes the corrupt data from the namespace. ReFS keeps the volume online while it handles most non-correctable corruptions, but there are rare cases that require ReFS to take the volume offline.
- Proactive error correction: In addition to validating data before reads and writes, ReFS introduces a data integrity scanner, known as a scrubber. This scrubber periodically scans the volume, identifying latent corruptions and proactively triggering a repair of corrupt data.

ReFS also has a number of features that improve performance, especially with virtualized workloads.

- [Mirror-accelerated parity](https://learn.microsoft.com/en-us/windows-server/storage/refs/mirror-accelerated-parity)
- Accelerated VM operations
    - [Block cloning](https://learn.microsoft.com/en-us/windows-server/storage/refs/block-cloning): Accelerates copy operations.
    - Sparse VDL: Allows ReFS to zero files rapidly which reduces the time it takes to create fixed VHDs from minutes to seconds.
- Variable cluster sizes: Both 4K and 64K cluster sizes are supported. 64K clusters are appropriate for large, sequential IO workloads.

## Supported ReFS Deployments

- Storage Spaces Direct for virtualized workloads or network-attached storage.
- Storage Spaces with shared SAS enclosures for hosting archival data and storing user documents.
- Basic disks when best suited for applications that implement their own software resiliency and availability solutions.
- Backup target when best suited for applications and hardware that implements its own resiliency and availability solutions.

!!! note

    - Storage Spaces supports local non-removable direct-attached via BusTypes SATA, SAS, NVME, or attached via HBA (also known as RAID controller in pass-through mode).
    - Basic disks include local non-removable direct-attached via BusTypes SATA, SAS, NVME, or RAID. Basic disks do not include Storage Spaces.
    - For SANs, if features such as thin provisioning, TRIM/UNMAP, or Offloaded Data Transfer (ODX) are required, NTFS must be used.

## ReFS Caveats

Microsofts official docs go on and on about the benfits of ReFS's integrity and resiliency, but what happens when ReFS *can't* correct a problem?

ReFS will delete files that is deems unfixable. There are two scenarios where this can happen:

1. ReFS detects Metadata corruption AND there is no way to fix it. Meaning ReFS is not on a Storage Spaces redundant volume where there are other copies of the data on other hosts so it can fix the corrupted copy.
2. ReFS detects data corruption AND Integrity Streams is enabled AND there is no way to fix it. Meaning if Integrity Stream is not enabled, the file will be accessible whether data is corrupted or not. If ReFS is running on a mirrored volume using Storage Spaces, the corrupted copy will be automatically fixed.

It will not ask, nor will it give you any opportunity to try to salvage what you can. If ReFS isn’t backed by Storage Spaces’s redundancy, then it has no way to perform a repair.

This Altaro article says that while you shouldn't overlook the severity of the above, it's not a reason to avoid ReFS. You can simply disable integrity streams. Something that I noticed has already done when reading through Matt's documentation. 

<https://learn.microsoft.com/en-us/windows-server/storage/refs/refs-overview>
<https://www.altaro.com/hyper-v/ntfs-vs-refs/>
