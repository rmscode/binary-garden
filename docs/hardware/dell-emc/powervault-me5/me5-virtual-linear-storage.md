# Virtual and Linear Storage

The ME5 series storage system uses two different storage technologies that share a common user interface. One uses the virtual method while the other one uses the linear method.

Virtual storage is a method of mapping logical storage requests to physical storage (disks). It inserts a layer of virtualization such that logical host I/O requests are mapped onto pages of storage. Each page is then mapped onto physical storage. Within each page the mapping is linear, but there is no direct relationship between adjacent logical pages and their physical storage.

Some advantages of using virtual storage are:

- It allows performance to scale as the number of disks in the pool increases.
- It virtualizes physical storage, allowing volumes to share available resources in a highly efficient way.
- It allows a volume to be comprised of more than 16 disks.

Virtual storage provides the foundation for data-management features such as thin provisioning, automated tiered storage, SSD read cache, and the quick rebuild feature.

=== "Virtual Storage (Recommended)"

    - Tiering
    - Snapshots
    - Replication
    - Thin provisioning
    - One pool per installed RAID controller and up to 16 disk groups per pool
    - Maximum 1 PB usable capacity per pool with large pools feature enabled
    - RAID levels 1, 5, 6, 10, and ADAPT
    - Adding individual disks to increase RAID capacity is only supported for ADAPT disk groups
    - Capacity can be increased by adding additional RAID disk groups
    - Page size is static (4 MB)
    - SSD read cache
    - Global and/or dynamic hot spares

=== "Linear Storage"

    - Up to 32 pools per installed RAID controller and one disk group per pool
    - RAID levels 0, 1, 3, 5, 6, 10, 50, ADAPT, and NRAID
    - Adding individual disks to increase RAID capacity is supported for RAID 0, 3, 5, 6, 10, 50, and ADAPT disk groups
    - Configurable chunk size per disk group
    - Global, dedicated, and/or dynamic hot spares

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/about-virtual-and-linear-storage?guid=guid-5bbe5bbb-bf63-484b-87d4-94d20cf6b5aa&lang=en-us)
