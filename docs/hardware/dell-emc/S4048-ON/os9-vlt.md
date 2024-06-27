# Virtual Link Trunking (VLT)

!!! info "Feature Description"

    Virtual Link Trunking is Dell's implementation of MLAG (Multi-Chassis Link Aggregation). It allows you to create a port-channel (LAG) between two switches and have them act as one logical switch. This provides redundancy and load balancing. 

!!! note "For brevity, when a configuration step is identical for both VLT peers, I will only show CLI examples for one of the peers."

## 1. Enable rSTP globally on *each* VLT peer

!!! info

    Dell recommends, at least initially, to enable rSTP globally on each VLT peer. This is to prevent loops in the event of a misconfiguration. More info [here](../S4048-ON/os9-other.md#rstp-and-vlt)...

=== "VLT Peer 1"

    ```shell
    VLT-1> enable
    VLT-1# configure
    VLT-1(conf)# protocol spanning-tree rstp
    VLT-1(conf-rstp)# no disable
    VLT-1(conf-rstp)# bridge-priority 4096
    VLT-1(conf-rstp)# exit
    ```

=== "VLT Peer 2"

    ```shell
    VLT-2> enable
    VLT-2# configure
    VLT-2(conf)# protocol spanning-tree rstp
    VLT-2(conf-rstp)# no disable
    VLT-2(conf-rstp)# bridge-priority 8192
    VLT-2(conf-rstp)# exit
    ```

!!! tip "Tune the timers to their minimum values for faster convergence (Optional)"

    `forward-delay 4` (instead of 15 by default)

    `max-age 6` (instead of 20 by default)

    `hello-time 1` (instead of 2 by default)


## 2. Prepare the port-channel for VLT interconnect configuration between *each* of the peers

!!! note

    The VLTi may consist of any 10G or 40G ports, but a combination of 10G *and* 40G ports is not supported. Dell recommends forming the VLTi with at least 2 ports as best practice.

```shell
VLT-1(conf)# interface range FortyGigabitEthernet 1/49-1/50 #(1)
VLT-1(conf-if-range-fo-1/47,fo-1/48)# description "Member of port-channel 128 for the VLT Interconnect" #(2)
VLT-1(conf-if-range-fo-1/47,fo-1/48)# no shutdown
VLT-1(conf-if-range-fo-1/47,fo-1/48)# exit
VLT-1(conf)# interface port-channel 128 #(3)
VLT-1(conf-if-po-128)# description "VLT Interconnect"
VLT-1(conf-if-po-128)# channel-member FortyGigabitEthernet 1/49 #(4)
VLT-1(conf-if-po-128)# channel-member FortyGigabitEthernet 1/50
VLT-1(conf-if-po-128)# no switchport #(5)
VLT-1(conf-if-po-128)# no shutdown
VLT-1(conf-if-po-128)# exit
```

1. The `interface range` command allows you to select multiple interfaces at once for configuration. We'll be using these interfaces for the VLTi.
2. The `description` command is useful for labeling interfaces and port-channels, among other things. When using the the `show` command, the description will be displayed first. Its not required, but it's good practice.
3. Configuring a port-channel (LAG) for the VLTi. In OS9, the ID # can be anything from 1-128.
4. Selecting the interfaces that will be used to form the port-channel.
5. This will default the port-channel and place it in Layer 2 Access mode if it isn't already. This is required for the VLTi.

!!! warning

    Do not manually add any VLANs to the VLT interconnect. The VLTi interface manages VLAN tagged/untagged traffic automatically between peers. That is, if a VLAN is present in both peers, the VLTi will be added to that VLAN automatically. Manually adding a VLAN configuration has been shown to disrupt traffic flow (according to Dell). If a VLAN configuration has been added to the VLTi, the recommended recovery process for both peers is as follows:

    1. Remove the VLAN configuration from the interface.
    2. Save the configuration.
    3. Reload the VLT member.

*Repeat these steps on the other VLT peer.*

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configuring-a-vlt-interconnect?guid=guid-882304c2-cca8-4554-a96b-2f5b0c5b7a72&lang=en-us)

## 3. Configure the core VLT peering relationship across the port-channel that will become the VLTi

This establishes the VLT domain.

=== "VLT Peer 1"

    ```shell
    VLT-1(conf)# vlt domain 1 #(1)
    VLT-1(conf-vlt-1)# back-up destination 10.1.1.2 #(2)
    VLT-1(conf-vlt-1)# peer-link port-channel 128 #(3)
    VLT-1(conf-vlt-1)# primary-priority 1 #(4)
    VLT-1(conf-vlt-1)# exit
    ```

    1. The VLT domain requires an ID number (1-1000). Configure the same ID on the peer switch to allow for common peering.
    2. This is the OOB management IP address of VLT peer 2. You can optionally specify the time `interval`. The range is from 1 to 5 seconds. The default is 3 seconds.
    3. Associate the VLTi to the VLT domain.
    4. (Optional) The system elects a primary and secondary VLT device, but you can configure the roles before the election process by setting the `primary-priority` (1-65535). The lowest value is elected as the primary. Fixing system parameters also avoids negotiations (for fast convergence).

=== "VLT Peer 2"

    ```shell
    VLT-2(conf)# vlt domain 1
    VLT-2(conf-vlt-1)# back-up destination 10.1.1.1    #(1)
    VLT-2(conf-vlt-1)# peer-link port-channel 128
    VLT-2(conf-vlt-1)# primary-priority 2
    VLT-2(conf-vlt-1)# exit
    ```

    1. The OOB management IP address of the VLT peer 1.

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/enabling-vlt-and-creating-a-vlt-domain?guid=guid-4f2e6faf-30b2-4eb3-aef0-d5457c1c33b2&lang=en-us)

## 4. Configure the default VLT MAC address on each peer (Optional)

!!! info

    When you create a VLT domain, a VLT-system MAC address used for internal system operations is automatically created. However, you can explicitly configure the default MAC address for the VLT domain. Doing so can help minimize the time required for the VLT system to sync the default MAC address of the VLT domain on both peers when one peer reboots. 
    
    The only comment from Dell that I could find on how to pick a MAC address was "Avoid picking some weird MAC addresses like reserved, multicast, etc. It could potentially cause trouble." Thanks, Dell...

```shell
VLT-1(conf)# vlt domain 1
VLT-2(conf-vlt-1)# system-mac mac-address de:11:de:11:de:11
```

*Repeat these steps on the other VLT peer.*

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/reconfiguring-the-default-vlt-settings-optional?guid=guid-61b3dde6-6906-4147-a27a-becc917d6c21&lang=en-us)

## 5. Confirm the state of the VLT domain

Verify the VLT domain status with `show vlt brief` in EXEC mode. The output will look something like this:

```shell
VLT Domain Brief
------------------
Domain ID : 1
Role : Primary
Role Priority : 1
ICL Link Status : Up    #(1)
HeartBeat Status : Up
VLT Peer Status : Up
Version : 6(3)
Local System MAC address : 00:01:e8:8a:e9:91
Remote System MAC address : 00:01:e8:8a:e9:76
Remote system version : 6(3)
Delay-Restore timer : 90 seconds

Delay-Restore Abort Threshold : 60 seconds
Peer-Routing : Disabled
Peer-Routing-Timeout timer : 0 seconds
Multicast peer-routing timeout : 150 seconds
```

1. ICL stands for "[inter-chassis link](https://www.dell.com/support/kbdoc/en-us/000179606/powerstore-alerts-ethernet-switch-inter-chassis-link-peer-presence)". This is the VLTi.

Make sure the VLTi is passing hello messages and check for errors with `show vlt statistics`. The output will look something like this:

```shell
-----------------------------------------------------
HeartBeat Messages Sent:                       95446
HeartBeat Messages Received:                   95440
ICL Hello's Sent:                              95420
ICL Hello's Received:                          95414
Domain Mismatch Errors:                            0
Version Mismatch Errors:                           0
Config Mismatch Errors:                            0
```

Verify that the backup link communication is bi-directional (Heartbeats sent *and* received) with `show vlt backup-link`. The output will look something like this:

```shell
VLT Backup Link
--------------------------------------------------
Destination:                               10.1.1.2
Peer HeartBeat status:                          Up
HeartBeat Timer Interval:                        1
HeartBeat Timeout:                               3
UDP Port:                                    34998
HeartBeat Messages Sent:                     95305
HeartBeat Messages Received:                 95299
```

Verify matching configuration on both VLT peers with `show vlt mismatch`.

!!! note

    If there are no mismatches between the switches, the output will be blank.

## Create a LACP LAG Between VLT Domain and Connected Devices (TOR switch, server...) 

To configure both VLT peers to agree on making two separate port-channels (LAG) a single Virtual Link Trunk (MLAG) toward an attached device, each peer must be configured with the same port-channel ID. 

```shell
VLT-1(conf)# interface port-channel 10
VLT-1(conf-if-po-10)# description "VLT port-channel toward SwitchName"
VLT-1(conf-if-po-10)# no shutdown
VLT-1(conf-if-po-10)# no ip address
VLT-1(conf-if-po-10)# switchport    #(1)
VLT-1(conf-if-po-10)# vlt-peer-lag port-channel 10    #(2)
VLT-1(conf-if-po-10)# exit
VLT-1(conf)# interface FortyGigabitEthernet 1/51
VLT-1(conf-if-te-1/51)# description "Member of port-channel 10 for upstream connection to SwitchName"
VLT-1(conf-if-te-1/51)# no shutdown
VLT-1(conf-if-te-1/51)# port-channel-protocol LACP    #(3)
VLT-1(conf-if-te-1/51-lacp)# port-channel 10 mode active    #(4)
```

1. The `switchport` command puts the port-channel in layer 2 mode.
2. The `vlt-peer-lag` command associates `port-channel 10` of this VLT peer to the corresponding `port-channel 10` of the other VLT peer.
3. Enter LACP CONFIGURATION mode for the interface.
4. Enable LACP for auto negotiation on port-channel 10.

*Repeat these steps on the other VLT peer.*

!!! note

    You will need to add the VLT port channel interface to VLANs as needed for proper traffic flow. See "[VLAN Configuration](../S4048-ON/os9-vlan.md)" for more information. Also, don't forget to create a LAG with LACP on the attached device as well!

!!! Warning "Potential to black-hole traffic"

    At start-up time, once the physical ports are active a newly started VLT peer takes several seconds to fully negotiate protocols and synchronize. The attached devices are not aware of that activity and upon activation of a physical interface, the connected device will start forwarding traffic on the restored link, despite the VLT peer unit being still unprepared. It will black-hole traffic.

    Dampening (or equivalent) should be configured on the attached device. Dampening will temporarily hold an interface down after a VLT peer device reload. A reload is detected as a flap: the link goes down and then up. Suggested dampening time is 30 seconds to 1 minute.

    [This](os10.md#unexpected-behavior-while-testing-failure-scenarios) is also probably worth reading.

### Dampening

Syntax:

`dampening [[[[half-life] [reuse-threshold]] [suppress-threshold]] [max-suppress-time]]`

`half-life`

:   The accumulated penalty decays exponentially based on the half-life period. The accumulated penalty decreases half after each half-life period. The range of half-life is from 1 to 30 seconds. The default is 5 seconds.

`reuse-threshold`

:   After exponential decay, the penalty reaches the default or configured reuse threshold. The interface is unsuppressed and the state changes to “up”. The range of reuse threshold is from 1 to 20000. The default is 750.

`suppress-threshold`

:   The suppress threshold is a value that triggers a flapping interface to dampen. The system adds penalty when the interface state goes up and down. When the accumulated penalty reaches the default or configured suppress threshold, the interface state changes to Error-Disabled state. The range of suppress threshold is from 1 to 20000. The default is 2500.

`max-suppress-time`

:   The maximum amount of time during which the interface remain suppressed. The range is from 1 to 86400. The default is 20 seconds or four times the default half-life period (5 seconds).

Configuration example:

```shell
DellEMC(config)# interface port-channel 1 #(1)
DellEMC(conf-if-range-fo-1/47,fo-1/48)# dampening 10 100 1000 60
```

1. In our environment, we would apply dampening to the port-channel interface comprised of the links towards the VLT domain.

[*Reference: Connecting a VLT domain to an attached access switch or device*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/connecting-a-vlt-domain-to-an-attached-access-device-switch-or-server?guid=guid-99a5a114-5dbc-4286-b64f-c5e43c4edf26&lang=en-us) </br>
[*Reference: Layer 2 topology configurations*](https://infohub.delltechnologies.com/l/dell-emc-networking-with-isilon-front-end-deployment-and-best-practices-1/layer-2-topology-configurations-7/)</br>
[*Reference: VLT Technical Guide*](https://i.dell.com/sites/content/business/large-business/merchandizing/en/Documents/Dell_Force10_S4810_VLT_Technical_Guide.pdf)

## Things to consider

!!! quote "Dell"

    If the source is connected to an orphan (non-spanned, non-VLT) port in a VLT peer, the receiver is connected to a VLT (spanned) port-channel, and the VLT port-channel link between the VLT peer connected to the source and ToR is down, traffic is duplicated due to route inconsistency between peers. To avoid this scenario, Dell EMC Networking recommends configuring both the source and the receiver on a spanned VLT VLAN.

This *will* be our exact scenario! We cannot "span" the connections of the servers across the VLT peers using VLT port-channels. Each of our servers will be utilizing Switch Embedded Teams which *only* support switch-independent configuration. See [Uplink Failure Detection](../S4048-ON/os9-ufd.md)!

The `port-delay-restore` command may be another thing worth considering. It allows a delayed bring up of *all* interfaces during switch boot up. I have not tested this, but I would assume the action of a peer reloading would be the same as a switch rebooting...Pretty sure reboot/reload are used synonmously in Dell's documentation.

---

This [VLT Technical guide](https://i.dell.com/sites/content/business/large-business/merchandizing/en/Documents/Dell_Force10_S4810_VLT_Technical_Guide.pdf) contains some information for tuning various settings to achieve faster convergence. I haven't taken a good look through much of it yet, but I did spot a line that said "If the network is not tuned, some failures can lead to outages up to 30 seconds. The proposed heavy tuning reduces that to around 2-3 seconds (inter-VLAN routing) or 200-300 milliseconds (Layer2)."

---

- When a VLAN is created on VLTi peers, the VLTi port-channel is added automatically to the VLAN, whether the vlan have members or not. A VLAN creation or deletion message from the VLT peer is the trigger for adding or removing VLTi port-channels to or from a VLAN. You can manually add or remove a VLTi port-channel to a VLAN. In case a VLTi port-channel is manually removed from a VLAN, it is added back to the VLAN after reload of the VLTi peers.
- In a scenario where one hundred hosts are connected to a Peer1 on a non-VLT domain and traffic flows through Peer1 to Peer2; when you move these hosts from a non-VLT domain to a VLT domain and send ARP requests to Peer1, only half of these ARP requests reach Peer1, while the remaining half reach Peer2 (because of LAG hashing). The reason for this behavior is that Peer1 ignores the ARP requests that it receives on VLTi (ICL) and updates only the ARP requests that it receives on the local VLT. As a result, the remaining ARP requests still points to the Non-VLT links and traffic does not reach half of the hosts. To mitigate this issue, ensure that you configure the following settings on both the Peers (Peer1 and Peer2): arp learn-enable and mac-address-table station-move refresh-arp.
- The VLT interconnect is used for data traffic only when there is a link failure that requires using VLTi in order for data packets to reach their final destination.
- If you replace a VLT peer node, preconfigure the switch with the VLT system MAC address, unit-id, and other VLT parameters before connecting it to the existing VLT peer switch using the VLTi connection.
- On a link failover, when a VLT port channel fails, the traffic destined for that VLT port channel is redirected to the VLTi to avoid flooding.
