# Pools

A pool is an aggregation of one or more disk groups that serves as a container for volumes. Virtual and linear storage systems both use pools. A disk group is a group of disks of the same type, using a specific RAID level that is incorporated as a component of a pool, that stores volume data. For virtual pools, when volumes are added to a pool the data is distributed across the pool's disk groups. For linear pools, which can only have one disk group per pool, volumes are also added to the pool, which contains the volume data.

In both virtual and linear storage, if the owning controller fails, the partner controller assumes temporary ownership of the pool and resources owned by the failed controller. If a fault-tolerant cabling configuration, with appropriate mapping, is used to connect the controllers to hosts, LUNs for both controllers are accessible through the partner controller so I/O to volumes can continue without interruption.

## Virtual Pools and Disk Groups

The volumes within a virtual pool are allocated virtually and separated into fixed size pages, with each page allocated randomly from somewhere in the pool. The volumes within a virtual pool are also thin provisioned, which means that the volumes initially exist as an entity, but physical storage is not allocated to them. The thin-provisioned volumes are allocated on-demand as data is written to a page.

If you would like to create a virtual pool that is larger than 512 TiB on each controller, you can enable the large pools feature by using the `large-pools` parameter of the set `advanced-settings` CLI command.

!!! info "The physical capacity limit for a virtual pool is 512 TiB. When overcommit is enabled, the logical capacity limit is 1 PiB."

- When the overcommit feature is disabled, the host does not lose read or write access to the pool volumes when the pool reaches or exceeds the high threshold value.
- When the overcommit feature is enabled, the storage system sends the data protect sense key Add, Sense: Space allocation failed write protect to the host when the pool reaches or exceeds the high threshold value. If the host is rebooted after the pool reaches or exceeds the high threshold value, the host loses read and write access to the pool volumes. The only way to regain read and write access to the pool volumes is to add more storage to the pool.

You can remove one or more disk groups, but not all, from a virtual pool without losing data if there is enough space available in the remaining disk groups to contain the data. When the last disk group is removed, the pool ceases to exist, and will be deleted from the system automatically. Alternatively, the entire pool can be deleted, which automatically deletes all volumes and disk groups residing on that pool.

[**Reference**](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/virtual-pools-and-disk-groups?guid=guid-5ed225ff-50d8-43cf-855f-6eae5fd09d0f&lang=en-us)

## Linear

Each time that the system adds a linear disk group, it also creates a corresponding pool for the disk group. Once a linear disk group and pool exists, volumes can be added to the pool. The volumes within a linear pool are allocated in a linear way, such that the disk blocks are sequentially stored on the disk group.

Linear storage maps logical host requests directly to physical storage. In some cases the mapping is one-to-one, while in most cases the mapping is across groups of physical storage devices, or slices of them.