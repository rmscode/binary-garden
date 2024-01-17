# Link Aggregation and LACP Basics

According to **IEEE 802.1AX-2008** (formerly **IEEE 802.3ad**), Link Aggregation is a standard for bundling multiple physical network connections in parallel to create a single logical link. This logical link compared to a conventional connection via a single cable has the advantages of higher availability and higher possible transmission speed. 

The two primary types of LAGs are static (also known as manual) and dynamic. Dynamic LAGs use the Link Aggregation Control Protocol (LACP) to auto-negotiate settings between two connected devices.

## Prerequisites

All aggregated links must:

- be in full duplex mode
- use the same data transmission rates (at least 1 Gbit/s)
- use parallel point-to-point connections
- connect to precisely one endpoint on a switch or server. Link aggregation using multiple switches to one link-aggregated endpoint is not possible. Virtual switches consisting of multiple physical switches (such as Dell's VLT) are the only exception.

## Properties

Link aggregation offers the following properties:

- Automatic recovery when individual physical links fail. As long as at least one physical link exists, the LAG connection will continue to exist.
- Data transmission will be distributed as frames over the physical links.
- All frames forming part of a specific data communication packet will be transmitted over the same physical connection. This ensures the delivery of the individual frames of a data communication packet will be received in the correct order.

## Static Link Aggregation

With a static link aggregate, all configuration settings will be setup on both participating LAG components once.

## Dynamic Link Aggregation - LACP

LACP allows the exchange of information with regard to the link aggregation between the two members of said aggregation in the form of LACPDU (Link Aggregation Control Protocol Data Unit) frames. The LACPDU frames are exchanged between the two members of the link aggregation at regular intervals. The LACPDU frames contain information about the status of the link aggregation and the individual physical links.

Each port can be configured as an active or passive LACP.

- Passive LACP: The port prefers not sending LACPDUs. The port will only transmit them when its counterpart uses active LACP (does not speak unless spoken to).
- Active LACP: The port prefers sending LACPDUs regardless of whether its counterpart uses passive LACP or not (speaks regardless of whether spoken to).

In constrast to static link aggregation, dynamic link aggregation (LACP) offers the following advantages:

- Even if one physical links fails, it will detect if the point-to-point connection is using a media converter, so that the link status at the switching port remains up. Because LACPDUs do not form a component of this connection, the link will be removed from the link aggregate. This ensures that packets will not be lost due to the failed link.
- Both of the devices can mutually confirm the LAG configuration. With static link aggregation, errors in the configuration or wiring will often not be detected as quickly.

!!! quote "A nice analogy I found . . ."

    It's important to understand that while the bandwidth of a 2-port LAG link is 2Gbps, an individual flow will max out at 1Gbps. It's a highway with a 100MPH speed limit. We can add another lane and 2 cars can go 100MPH, but a single car can never go 200MPH. We're increasing the amount of traffic that can be carried, but not the max speed.