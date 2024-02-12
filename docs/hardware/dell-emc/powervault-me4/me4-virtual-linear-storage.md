# About Virtual and Linear Storage

The ME4 series storage system uses two different storage technologies that share a common user interface. One uses the virtual method while the other one uses the linear method.

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

## Creating Volumes

### Virtual

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-virtual-volumes?guid=guid-b0eccb14-2cc7-4be3-b685-542255789576&lang=en-us>

### Linear

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-linear-volumes?guid=guid-c026834e-de8c-4609-b001-4fb2c2afeeb0&lang=en-us>

## Modifying Volumes

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/modify-a-volume?guid=guid-13c04acd-bb88-4c92-be83-b1f9822f5677&lang=en-us>

## Copy a Volume or Snapshot

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/copy-a-virtual-volume-or-snapshot?guid=guid-6b622cfb-f44e-445a-a4f3-b8be08f66bff&lang=en-us>

### Abort Copy

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/abort-a-volume-copy?guid=guid-966588fe-6f53-4d09-b188-9e1875818651&lang=en-us>

## Delete a Volume or Snapshot

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/delete-volumes-and-snapshots?guid=guid-e334f829-6b6f-4e1b-9a6e-d1806e5f06a2&lang=en-us>

## Volume Groups

### Add Volume to a Group

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/add-volumes-to-a-volume-group?guid=guid-618d3bd8-a38f-44d5-a9dd-bab08105e1c5&lang=en-us>

### Remove Volume from a Group

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/remove-volumes-from-a-volume-group?guid=guid-acf462eb-a931-4c05-a673-7ab2f7aa0224&lang=en-us>

### Renaming a Volume Group

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/rename-a-volume-group?guid=guid-0f374c44-1801-4f00-87db-6a6a9611bbdd&lang=en-us>

### Remove Volume Groups

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/remove-volume-groups?guid=guid-3fc5ed3a-00a3-4146-9ae2-ab0ded10d8ea&lang=en-us>

## Rolling Back a Virtual Volume

<https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/roll-back-a-volume?guid=guid-43901d0a-3d59-4cca-af7f-a839692a8471&lang=en-us>
