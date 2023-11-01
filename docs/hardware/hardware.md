# Dell EMC OS10 Networking

> When labbing in GNS3, it takes quite a bit a time for the OS10 image to install/boot the first time. Be patient. Login with linuxadmin/linuxadmin and then logout. Skipping this will result in an "incorrect login" error when trying to login to the default admin/admin. I have no idea why that is...
>
> [This](https://sharifulhoque.blogspot.com/2021/07/stacking-switches-part-vi-dell-os10-vlt.html) was a helpful supplement to the Dell docs

## OOB management interface Configuration

```bash
OS10# configure
OS10(config)# interface mgmt 1/1/1
OS10(conf-if-ma-1/1/1)# no ip address dhcp
OS10(conf-if-ma-1/1/1)# ip address 10.1.1.1/24
OS10(conf-if-ma-1/1/1)# exit
OS10(config)# exit
OS10# show running-configuration interface mgmt 1/1/1
!
interface mgmt1/1/1
 no shutdown
 no ip address dhcp
 ip address 10.1.1.1/24
 ipv6 address autoconfig
OS10#
```

## VLT Configuration

1. Enable STP globally on each VLT peer:

    ```bash
    OS10# configure
    OS10(config)# spanning-tree mode rstp
    ```

2. Create a VLT domain on each VLT peer:

    > The VLT domain requires an ID number (1-255). Configure the same ID on both peers.

    ```bash
    OS10(config)# vlt-domain 1
    OS10(conf-vlt-1)# exit
    ```

3. Configure VLTi interfaces mode on each VLT peer:

    > Before you configure the VLTi on peer interfaces, remove each interface from L2 mode with `no switchport`

    ```bash
    OS10(config)# interface ethernet 1/1/8
    OS10(conf-if-eth1/1/9)# no switchport
    OS10(conf-if-eth1/1/9)# exit
    OS10(config)# interface ethernet 1/1/9
    OS10(conf-if-eth1/1/9)# no switchport
    OS10(conf-if-eth1/1/9)# exit
    OS10(config)# vlt-domain 1
    OS10(conf-vlt-1)# discovery-interface ethernet 1/1/8-1/1/9
    ```

4. (Optional) Manually configure the same default VLT MAC address on each VLT peer. This minimizes the time required to sync the default MAC of the VLT domain on both peers when one reboots:

    > While configuring a VLT MAC address, if the 8th bit of the MAC address is a 1, then the MAC address is considered to be a multicast MAC address. There are locally defined MAC addresses. For these addresses, the second least significant bit in the first byte must be a 1, which signifies a locally defined address.
    >
    >The correct MAC addresses must have xxxxxx10 bits set in the first octet, such as x2, x6, xA, xE, and so on.
    >
    > I fed that information to Chat-GPT to generate a MAC address for me.

    ```bash
    OS10(conf-vlt-1)# vlt-mac C2:AC:50:08:FE:D9
    ```

5. Configure VLT heartbeat backup link on each VLT peer:

    > Dell [recommends using the OOB management network connection for the VLT backup link](https://www.dell.com/support/manuals/en-us/dell-emc-smartfabric-os10/smartfabric-os-user-guide-10-5-3/configure-the-vlt-peer-liveliness-check?guid=guid-d140525e-19a1-4d53-8334-e7ec196a9da1&lang=en-us)".
    >
    > **NOTE** The backup destination is the IP address of the peer that is not the local switch.

    *VLT Peer 1*

    ```bash
    OS10(conf-vlt-1)# backup destination 10.1.1.2
    ```

    *VLT Peer 2*

    ```bash
    OS10(conf-vlt-1)# backup destination 10.1.1.1
    ```

    > **NOTE** It was at this point that I linked eth 1/1/8-1/1/9 of each switch together. VLT Peer 1 immediately recognized both links and indicated that "VLT unit 2 is up" and that "VLT interconnect link between unit 1 and unit 2 is up".
    >
    > **BE ADVISED** Upon this successful VLT-peer formation; the switches automatically created a non-configurable port-channel 1000 interface consisting of our VLTi interfaces and VLAN 4094. Each are reserved for internal VLT communication.

6. Configure VLT port channels (LAGs) between each VLT peer and attached devices:

    > Remember, port channel 1000 is reserved. Port channel IDs can be any number between 1 to 999 or 1001 to 2000.

    ```bash
    OS10(conf-vlt-1)# exit
    OS10(confg)# interface port-channel 10   <-Creating the port channel
    OS10(conf-if-po-10)# no shutdown
    OS10(conf-if-po-10)# vlt-port-channel 10   <-Enabling VLT on the port channel
    OS10(conf-if-po-10)# exit
    OS10(confg)# interface port-channel 20
    OS10(conf-if-po-20)# no shutdown
    OS10(conf-if-po-20)# vlt-port-channel 20
    OS10(conf-if-po-20)# exit
    OS10(confg)# interface ethernet 1/1/1
    OS10(conf-if-eth1/1/1)# channel-group 10 mode active   <-Assigning port channel to interface
    OS10(conf-if-eth1/1/1)# exit
    OS10(config)# interface ethernet 1/1/2
    OS10(conf-if-eth1/1/2)# channel-group 20 mode active
    OS10(conf-if-eth1/1/2)# exit
    OS10(config)#
    ```

    Lets verify . . .

    ```bash
    OS10(config)# exit
    OS10# show vlt 1 vlt-port-detail
    vlt-port-channel ID : 10
    VLT Unit ID    Port-Channel      Status    Configured ports    Active ports
    -------------------------------------------------------------------------------
    * 1            port-channel10     up      1                   0
      2            port-channel10     up      1                   0
    vlt-port-channel ID : 20
    VLT Unit ID    Port-Channel      Status    Configured ports    Active ports
    -------------------------------------------------------------------------------
    * 1            port-channel20     up      1                   0
      2            port-channel20     up      1                   0
    ```

7. Connect peer devices in a VLT domain to an attached access device.