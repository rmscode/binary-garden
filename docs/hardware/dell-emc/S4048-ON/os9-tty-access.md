# Managing Access to Terminal Lines

You can access the system remotely and restrict access to the system by creating user profiles.

Terminal lines on the system provide different means of accessing the system. The console line connects you through the console port in the route processor modules (RPMs). The virtual terminal lines (VTYs) connect you through Telnet or SSH to the system.

There are 10 VTY lines, 0-9. Each of which have various methods to restrict access in. These depend on which authentication scheme you use — line, local, or remote.

| Authentication Method   | VTY access-class support? | Username access-class support? | Remote authorization support? |
| ----------------------- | ------------------------- | ------------------------------ | ----------------------------- |
| Line                    | Yes                       | No                             | No                            |
| Local                   | Yes                       | Yes                            | No                            |
| TACACS+                 | Yes                       | No                             | Yes (ver 5.2.1.0 and later)   |
| RADIUS                  | Yes                       | No                             | Yes (ver 6.1.1.0 and later)   |

!!! Note "Dell recommends applying only standard ACLs to deny and permit access to VTY lines."

- Layer 3 ACLs deny all traffic that is not explicitly permitted, but in the case of VTY lines, an ACL with no rules does not deny traffic.
- You cannot use the `show ip accounting access-list` command to display the contents of an ACL that is applied only to a VTY line.
- To be able to filter access exclusively using either IPv4 or IPv6 rules, use either the `ipv4` or `ipv6` attribute along with the `access-class` `access-list-name` command. If no attribute is specified, the system applies the ACL to both IPv4 and IPv6 traffic. This is the generic way of configuring access restrictions.

## VTY Line Local Authentication and Athorization

Retrieves the access class from the local database.

1. Create a username and password.
2. Assign an access class.
3. Enter a privilege level.

You can assign line authentication on a per-VTY basis; it is a simple password authentication, using an access-class as authorization. Configure local authentication globally and configure access classes on a per-user basis. Different access classes can be assigned by username as well. Until users attempt to log in, they do not know if they will be assigned a VTY line. This means that incoming users always see a login prompt even if you have excluded them from the VTY line with a deny-all access class. The access class is received from the local database and applied after the user identifies themselves.

!!! example "This example shows how to allow or deny a Telnet connection to a user on lines 0-9. No access class is configured for the VTY line."

    ```shell
    DellEMC(conf)# user gooduser password abc privilege 10 access-class permitall
    DellEMC(conf)# user baduser password abc privilege 10 access-class denyall
    DellEMC(conf)#
    DellEMC(conf)# aaa authentication login localmethod local
    DellEMC(conf)#
    DellEMC(conf)# line vty 0 9
    DellEMC(config-line-vty)# login authentication localmethod
    DellEMC(config-line-vty)# end
    ```

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/vty-line-local-authentication-and-authorization?guid=guid-4ed761e2-c9bb-4e49-96b2-fe4f82aa7287&lang=en-us)

## VTY Line IP Filtering

IP access lists which permit or deny users are supported.

To apply an IP ACL on a VTY line, use the `access-class <access-list-name>` command.

!!! info

    If you already have configured generic IP ACL on a terminal line, then you cannot further apply IPv4 or IPv6 specific filtering on top of this configuration. You must first undo the existing configuration using the `no access-list-name` command.

!!! abstract "ToDo"

    Documentation needed for creating [`access-class` lists](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/access-control-lists-acls?guid=guid-75e6f5c0-7f87-4a39-990b-cc307dc63863&lang=en-us). 

```shell
DellEMC(conf)# line vty 0 0    #(1)
DellEMC(config-line-vty)# access-class testv6deny ipv6
DellEMC(config-line-vty)# access-class testvpermit ipv4
```

1. In Dell's docs, it appears that they are always selecting a range of VTY lines, even when they are configuring a single line. In this example, VTY line 0 is being configured.

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/denying-and-permitting-access-to-a-terminal-line?guid=guid-23bcb9fb-55b9-45fb-888e-61f483255e50&lang=en-us)

## VTY MAC-SA Filtering

MAC address access lists which permit or deny users are supported.

To apply a MAC ACL on a VTY line, use the same `access-class` command as IP ACLs.

!!! example

    ```shell
    DellEMC(conf)#mac access-list standard sourcemac
    DellEMC(config-std-mac)#permit 00:00:5e:00:01:01
    DellEMC(config-std-mac)#deny any
    DellEMC(conf)#
    DellEMC(conf)#line vty 0 9
    DellEMC(config-line-vty)#access-class sourcemac
    DellEMC(config-line-vty)#end
    ```

[*Referenece*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/vty-mac-sa-filter-support?guid=guid-c04088b6-725f-479d-9393-2a7895da6d7e&lang=en-us)

## VTY Line Remote Authentication and Authorization

Retrieves the access-class from the VTY line and applies it to ALL users. The identity of the incoming user does not need to be known and the access-class is immediately applied. If the access-class is set to deny all or deny for the incoming subnet, the connection is closed without displaying the login prompt.

!!! example "This example shows how to deny incoming connections from subnet 10.0.0.0. The example uses TACACS+ as the auth mechanism."

    ```shell
    DellEMC(conf)#ip access-list standard deny10
    DellEMC(conf-ext-nacl)#permit 10.0.0.0/8
    DellEMC(conf-ext-nacl)#deny any
    DellEMC(conf)#
    DellEMC(conf)#aaa authentication login tacacsmethod tacacs+
    DellEMC(conf)#tacacs-server host 256.1.1.2 key Force10
    DellEMC(conf)#
    DellEMC(conf)#line vty 0 9
    DellEMC(config-line-vty)#login authentication tacacsmethod
    DellEMC(config-line-vty)#
    DellEMC(config-line-vty)#access-class deny10
    DellEMC(config-line-vty)#end
    ```
    (same applies for radius and line authentication)

[*Referenece*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/vty-line-remote-authentication-and-authorization?guid=guid-eebf1c00-0502-4e62-b7c2-1a73f89d1564&lang=en-us)