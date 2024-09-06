# Access Control Lists (ACLs)

You can create two different types of IP ACLs: standard or extended.

A standard ACL filters packets based on the source IP packet. An extended ACL filters traffic based on the following criteria:

- IP protocol number
- Source IP address
- Destination IP address
- Source TCP port number
- Destination TCP port number
- Source UDP port number
- Destination UDP port number

## Creating Standard IP ACLs

To create and configure a standard ACL, give it a name by using the `ip access-list standard` command. You will then be placed in CONFIG-STD-NACL mode where you can filter packets based on the source IP.

```shell
DellEMC# configure
DellEMC(conf)# ip access-list standard TestACL #(1)
DellEMC(conf-std-nacl)# deny <source ip [mask]> any #(2)
```

1. Access group TestACL is created.
2. The `deny` filter drops packets. The mask can be in either /prefix format or A.B.C.D. The `any` keyword specifies that the filter applies to all destination IP addresses.

!!! tip

    You can remain in CONFIG-STD-NACL and continue to add multiple filters to the ACL. They will be processed in the order they are created. That is, they will be given a sequence number in the order they are added. Sequence numbers start at 0 and increment by 5.

    You can deny or permit entire subnets by using [wildcard masks](../../../networking/subnetting.md#wildcard-mask). A wildcard mask is a mask of bits that indicates which parts of an IP address are available for examination and can be thought of as an inverted subnet mask. For example, `deny ip 10.10.10.0 0.0.0.255 any`.

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configuring-a-standard-ip-acl-filter?guid=guid-c121caa8-f5b2-413b-9cf3-4fc078373231&lang=en-us)

## Creating Extended IP ACLs

*ToDo...*

## Applying Ingress/Egress IP ACLs

To apply an IP ACL to a physical or port-channel interface, use the following commands:

```shell 
DellEMC# configure
DellEMC(conf)# interface TenGigabitEthernet 1/1
DellEMC(conf-if-te-1/1)# ip access-group TestACL <in | out> #(1)
```

1. Filter traffic entering (ingress) or exiting (egress) an interface with the `in` or `out` keyword, respectively.

[*Reference: Ingress*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configure-ingress-acls?guid=guid-f3044d5d-d348-48d4-b975-4ac04c966d24&lang=en-us)</br>
[*Reference: Egress*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configure-egress-acls?guid=guid-719f97ee-334a-4ef5-b276-94555b4a428f&lang=en-us)

## Notes...

The examples above are as basic as it gets. You can create much more complex ACLs . . . see the Dell docs for that. 

<https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/access-control-lists-acls?guid=guid-75e6f5c0-7f87-4a39-990b-cc307dc63863&lang=en-us>

If you want to use ACLs to block specific traffic from entering the VLTi in a VLT domain, I would think that you need to configure the exact same ACL on both switches to prevent a vlt-mismatch.

For example, to filter one subnet from entering the VLTi on Switch-A and a second from entering the VLTi on Switch-B, you must create an ACL that filters *both* subnets on *both* switches. It must be a single ACL that contains both filters btw . . . an interface can only have one ACL applied at a time.

!!! example

    ```shell
    DellEMC# configure
    DellEMC(conf)# ip access-list standard Deny-iSCSI
    DellEMC(conf-std-nacl)# deny 10.10.10.0 0.0.0.255 any
    DellEMC(conf-std-nacl)# deny 10.10.20.0 0.0.0.255 any
    ```

`show ip accounting access-list`