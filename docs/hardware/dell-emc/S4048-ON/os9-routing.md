# (WIP) IPv4 Routing

## Assigning IP Addresses to an Interface

Assign primary and secondary IP addresses to physical or logical (VLAN or port channel) interfaces to enable IP communication between the system and hosts connected to that interface. 

You can assign one primary IP address and up to 255 secondary IP addresses to each interface.

```shell
DellEMC# configure
DellEMC(conf)# interface TenGigabitEthernet 1/5 #(1)
DellEMC(conf-if-te-1/5)# no shutdown #(2)
DellEMC(conf-if-te-1/5)# ip address 192.168.10.2/24 #(3)
```

1. Remember, this can be a VLAN or port channel interface as well.
2. Enable the interface.
3. To add a secondary IP address include the `secondary` keyword at the end of the command.

## Configuring a Routing Protocol

Routing protocols are used to exchange routing information between routers. The routing protocol you choose depends on the size and complexity of your network. After searching around on the internet, the consensus seems to be that OSPF (Open Shortest Path First) and RIP (Routing Information protocol) are the most popular routing protocols. RIP is suitable for small, less complex networks while OSPF is suitable for larger, more complex networks. 

### RIP

Enable RIP globally:

```shell
DellEMC# configure
DellEMC(conf)# router rip
```

Assign an IP address as a RIP network to exchange routing info:

```shell
DellEMC(conf-router_rip)# network 10.0.0.0
```

!!! note "After designating networks with which the system is to exchange RIP info, ensure that all devices on that network are configured to exchange RIP info."



## Configuring Static Routes

Static routes are configured manually and not learned by the routing protocol. They are typically used as backup routes in case other dynamically learned routes are unreachable.

Configure a static IP address:

The `ip route` syntax is `{ip | ipv6} route [vrf vrf-name] ip-address mask {ip-address | interface [ip-address]} [distance] [name description] [permanent] [tag tag-value] [vrf vrf-name] [weight weight-value]`. {} = mandatory, [] = optional, | = or.

```shell
DellEMC# configure
DellEMC(conf)# ip route 199.1.1.0 /24 vlan 100 name "Uplink To NewYork" #(1)

```

1. The syntax here is 