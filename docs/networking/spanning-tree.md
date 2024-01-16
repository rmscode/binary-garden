# Spanning Tree Protocol (STP)

The Spanning Tree Protocol (STP) is a network protocol that builds a loop-free logical topology for Ethernet networks. The basic function of STP is to prevent bridge loops and the broadcast radiation that results from them (broadcast storms). It helps prevent these loops by actively monitoring the network topology and selectively blocking redundant links. This ensures that there is only one active path between two network devices at any time.

## How does STP work?

STP uses the Spanning-Tree Algorithm (SPA) to determine which interfaces should forward traffic, and any remaining interfaces are placed in a blocking state. The protocol decides which state an interface will be placed based on several criteria:

1. Electing a root bridge. All interfaces on the switch elected as the root bridge are placed in a forwarding state.
2. All other non-root switches determine the best path to the root bridge. The ports used to reach to the root bridge (root port) are placed in a forwarding state.
3. On shared Ethernet segments, the switch with the best path to reach the root bridge is placed in a forwarding state. This is called the designated switch and its port is known as the designated port.
4. All other interfaces are placed in a blocking state and will not forward trafic.