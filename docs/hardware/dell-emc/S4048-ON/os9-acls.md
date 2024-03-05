# Access Control Lists (ACLs)

## Create Standard IP ACL

To create and configure an ACL, give it a name by using the `ip access-list standard` command. You will then be placed in CONFIG-STD-NACL mode where you can add filters to the ACL.

```shell
DellEMC# configure
DellEMC(conf)# ip access-list standard TestACL #(1)
DellEMC(conf-std-nacl)# deny ip <source ip> <mask> any #(2)
```

1. Access group TestACL is created.
2. The `deny` filter drops packets. The `ip` keyword specifies that the access list denies all IP protocols. The mask can be in either /prefix format or A.B.C.D. The last `any` keyword specifies that the filter applies to all destination IP addresses.

!!! tip

    You can remain in CONFIG-STD-NACL and continue to add multiple filters to the ACL. They will be processed in the order they are created. That is, they will be given a sequence number in the order they are added. Sequence numbers start at 0 and increment by 5.

    You can deny or permit entire subnets by using [wildcard masks](../../../networking/subnetting.md#wilcard-mask). For example, `deny ip 10.10.10.0 0.0.0.255 any`. 

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configure-a-standard-ip-acl?guid=guid-2712d30d-7eaa-4ab7-a2ef-acd6baa76103&lang=en-us)

## 