# Understanding Network Infrastructure

`Main Distribution Frame/Facility (MDF)`

:   The MDF is a centralized, secure, climate-controlled room that serves as the primary nerve center of a networking environment. It's houses the core networking equipment, including routers, core/aggregation switches, and servers. It establishes a connection with your external service provider, distributing this connectivity to multiple IDFs throughout your building. There is only ever *one* MDF in a network.

`Intermediate Distribution Frame/Facility (IDF)`

:   From the MDF, all the network cabling emanates, connecting to IDFs. They can be spread across different parts of a building or even multiple buildings. IDFs act as secondary hubs in a network, bridging the MDF with endpoint devices. IDFs house switches and network gear, providing internet access to users in these designated zones.

`Demarcation Point`

:   The point at which the ISP's responsibility ends and the customer's begins. Essentailly, it is where your ISP's service runs into your building and terminates at a cable modem or ONT. This is typically located in the MDF, but thats not always the case.

`Access Layer`

:   This is the first layer of the three-layer hierarchical model. The access layer is the point at which end-user devices connect to the network. It is responsible for forwarding traffic between connected devices and the rest of the LAN. The access layer provides layer-2 switching.

`Distribution/Aggregation Layer`

:   This is the second layer of the three-layer hierarchical model. The distribution layer is responsible for routing traffic between the core layer and the access layer. It is also responsible for routing traffic between VLANs. The distribution layer is typically comprised of high-end layer-3 switches and routers.

`Core Layer`

:   This is the third later of the three-layer hierarchical model. The core layer is the backbone of a network. It provides a high-speed connection between different distribution layer devices. It is the most critical layer of a network, as it is responsible for routing traffic between IDFs and the MDF.

`3 Tier/Layer Network`

:   A 3 layer network consists of all the layers described above. They are ususally only found in large networks.

`2 Tier/Layer Network`

:   Also referred to as a "collapsed core" network, the core and distribution layers are combined into a single layer. This is the most common type of network in small to medium envrionments. Core switches play double duty, acting as both core and distribution/aggregation switches.

## MDFs and IDFs

You can think of this in practical applications quite simply:

You have an internet connection, a router and a stack of switches in the basement. This is considered the **MDF**.

You have a managed 24-port switch on each floor of the facility, which is four stories high. All switches have high-throughput, low-latency or otherwise aggregated links running back to the MDF. Each of these switches are considered an **IDF**. 

<https://www.experts-exchange.com/questions/27603212/Difference-between-MDF-IDF-Data-Center-Computer-Room-Data-Room.html>

<https://tylermade.net/2016/12/12/terminology-understanding-mdfs-and-idfs/>

<https://cordero.me/mdf-vs-idf-vs-dc/>

<https://www.computernetworkingnotes.com/ccna-study-guide/access-distribution-and-core-layers-explained.html>

<https://www.fibermall.com/blog/core-switch-differences.htm>