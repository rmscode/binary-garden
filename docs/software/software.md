# Windows

## Data Deduplication

A Windows Server feature that helps to reduce the impact of redundant data on storage costs. It works by identifying and removing duplicate data "chunks". Duplicated chunks are stored once and referenced by pointers.

DDPEval can evaluate the potential for optimization against directly connected volumes (including local drives or Cluster Shared Volumes) and mapped or unmapped network shares. Found at C:\Windows\System32\DDPEval.exe after install.

- Dedup works on NTFS for 2012+ or ReFS for 2019+
- Anything smaller than 32KB are not considered for deduplication.
- Software development shares can benefit from Dedup because many binaries remain essentially unchanged from build to build.
- Dedup supports volumes up to 64TB.
- Dedup supports files up to 1TB.
- Dedup works with Cluster OS Rolling Upgrades.
- Dedup optimizes data by using a post-processing model. All data is written unoptimized to the disk and then optimized later by Data Deduplication.
- During the the "optimization" process, files are divided into chunks no more than 128KB, then matching chunks are calculated and extra copies of the chunks are deleted (they are replaced with links called reparse points).
- The main duplication results (chunk store) are located entirely in the "System Volume Information" folder in the root of the disk.
- Optimization should not change access semantics Users and applications that access data on an optimized volume are completely unaware that the files they are accessing have been deduplicated.
- When you delete a file, only the data links are deleted. The chunks themselves remain on disk until garbage collection is performed. Garbage collection runs on a schedule, but can be run manually via powershell.
      - It's worth mentioning that, without backups, your file recovery window is limited to the garbage collection schedule. If you delete a file and garbage collection runs 2 days later, you have 2 days to recover the file using 3rd-party software.
- Modifications of deduplicated files gets written unoptimized to the disk, then optimized later the next time the Optimization job runs.
- Will not optimize in use files.
- Will not optimize partial files.
- Historical outcomes of Dedup are recorded to the event log.
- All jobs can be manually run via powershell and the default schedules can be adjusted.
- In a cluster environment, Dedup must be enabled on all nodes.
- Manually starting Dedup jobs must be run on the Owner node of the CSV.
- Windows server backup can back up an optimized volume (that is, without removing deduplicated data).
- Running robocopy with Dedup is not recommended because it can corrupt the chunk store.
- Dedup can starve VMs so it is recommended to run the jobs during off-peak hours.
- Windows search doesn't support Dedup. Windows serarch can't index reparse points, so it skips all duplicated files, excluding them from the index.
- Dedup should have 300MB + 50MB of memory for each TB of logical data. If you are optimizing a 10TB volume, you would need a minimum need 800MB of memory aollocated for dedup. Optimally, you should have 1GB of memory for every 1TB of logical data.
- Files extensions and folders can be excluded per volume.
- Portability: Any volume under Dedup runs as an automtic unit. The volume can be backed up and moved to a different location. The only thing that you need to change is the schedule timings becasue the native task scheduler controls the jobs.
- If the new location is not running the Dedup feature, you can only access the files that have not been deduplicated.
- Fragmentations created by deduplication are stored on the disk as file segments that are spread all over, increasing the seek time.
- Upon the processing of each file, the filter driver will work overtime to maintain the sequence by keeping the segments together in a random fashion.
- Deduplication keeps a file cache to avoid repeating file segments, helping in their quick access. In case multiple users access the same resource simultaneously, that access pattern enables speeding up of the deduplication for each user.

## Jobs

| Job Name           | Description | Default Schedule |
|--------------------|-------------|------------------|
| Optimization       | Deduplicates by chunking data and storing in the chunk store | Hourly |
| Garbage Collection | Reclaims space by deleting uneeded chunks that are no longer being referenced by files that have been modified or deleted | Sat @ 2:35 AM |
| Scrubbing          | Identifies corrupt chunks in the store & when possible, will reconstruct the corrupt data. Popular copies of chunks are kept when they are referenced more than 100 times. | Sat @ 3:35 AM |
| Unoptimization     | Undoes optimization and disables Dedup. | On-demand only |

## References

<https://learn.microsoft.com/en-us/windows-server/storage/data-deduplication/overview>
<https://blog.foldersecurityviewer.com/windows-server-deduplication/>

[Example of what the chunk store looks like](https://community.spiceworks.com/topic/2108623-dedup-chunkstore-is-massive) + a discussion on why the chunk store is so large for this user.

# Linux

## 1

## 2