# Understanding Network Infrastructure

`Main Distribution Frame/Facility (MDF)`

:   The MDF is a centralized, secure, climate-controlled room that serves as the primary nerve center of a networking environment. It's houses the core networking equipment, including routers, core/aggregation switches, and servers. It establishes a connection with your external service provider, distributing this connectivity to multiple IDFs throughout your building. There is only ever *one* MDF in a network.

`Intermediate Distribution Frame/Facility (IDF)`

:   From the MDF, all the network cabling emanates, connecting to IDFs. They can be spread across different parts of a building or even multiple buildings. IDFs act as secondary hubs in a network, bridging the MDF with endpoint devices. IDFs house switches and network gear, providing internet access to users in these designated zones.

`Demarcation Point`

:   The point at which the ISP's responsibility ends and the customer's begins. Essentailly, it is where your ISP's service runs into your building and terminates at a cable modem or ONT. This is typically located in the MDF, but thats not always the case.

`Access Layer`

:   The access layer is the point at which end-user devices connect to the network. It is responsible for forwarding traffic between connected devices and the rest of the LAN. The access layer is typically comprised of layer-2 switches.

`Distribution/Aggregation Layer`

:   The distribution layer is responsible for routing traffic between the core layer and the access layer. It is also responsible for routing traffic between VLANs. The distribution layer is typically comprised of high-end layer-3 switches and routers.

`Core Layer`

:   The core layer is the backbone of a network. It provides a high-speed connection between different distribution layer devices. It is the most critical layer of a network, as it is responsible for routing traffic between IDFs and the MDF.

`3 Tier/Layer Network`

:   A 3 layer network consists of all the layers described above. They are ususally only found in large networks as having a core layer can drasctically reduce cabling needs.

`2 Tier/Layer Network`

:   Also referred to as a "collapsed core" network, the core and distribution layers are combined into a single layer. This is the most common type of network in small to medium envrionments. Core switches play double duty, acting as both core and distribution/aggregation switches.
