# Understanding Network Infrastructure

`Main Distribution Frame/Facility (MDF)`

:   The MDF is a centralized, secure, climate-controlled room that serves as the primary nerve center of a networking environment. It's houses the core networking equipment, including routers, core/aggregation switches, and servers. It establishes a connection with your external service provider, distributing this connectivity to multiple IDFs throughout your building. There is only ever *one* MDF in a network.

`Intermediate Distribution Frame/Facility (IDF)`

:   From the MDF, all the network cabling emanates, connecting to IDFs. They can be spread across different parts of a building or even multiple buildings. IDFs act as secondary hubs in a network, bridging the MDF with endpoint devices. IDFs house switches and network gear, providing internet access to users in these designated zones.

`Demarcation Point`

:   The point at which the ISP's responsibility ends and the customer's begins. Essentailly, it is where your ISP's service runs into your building and terminates at a cable modem or ONT. This is typically located in the MDF, but thats not always the case.