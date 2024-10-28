# Continuous Availability

Continuous Availability refers to the ability of a system to remain operational without interruption, even in the face of failures. This is crucial for businesses that require their services to be accessible 24/7.

Availability is usually expressed as a percentage of uptime in a given year, with `99.999%` (often referred to as "five nines") being a common target for mission-critical systems.

## Achieving Continuous Availability

Continuous Availability is typically achieved through a combination of High Availability (HA) and Fault Tolerance (FT).

### High Availability (HA)

High Availability ensures that a system is operational for a high percentage of time by minimizing downtime. This is achieved through:

- **Redundancy**: Having multiple instances of critical components so that if one fails, another can take over.
- **Load Balancing**: Distributing workloads across multiple servers to ensure no single server becomes a point of failure.
- **Failover Mechanisms**: Automatically switching to a standby system in case of a failure.

#### Common HA Architectures

- **Active-Passive**: One server is active while the other(s) are on standby. If the active server fails, the passive server takes over.
- **Active-Active**: All servers are active and share the load. If one server fails, the others continue to serve the requests.
- **N+1 Redundancy**: Having one extra server to take over in case of a failure. For example, in a 2+1 configuration, two servers are active, and one is on standby.q
- **N+M Redundancy**: Having multiple extra servers to take over in case of a failure. For example, in a 2+2 configuration, two servers are active, and two are on standby.
- **Clustering**: Multiple servers work together as a single system, sharing resources and ensuring high availability.

### Fault Tolerance (FT)

Fault Tolerance is the ability of a system to continue functioning even when one or more of its components fail. This is achieved through:

- **Replication**: Duplicating critical components and data to ensure availability in case of a failure.
- **Error Detection and Correction**: Identifying and correcting errors without interrupting the system's operation.
- **Self-Healing**: Automatically detecting and recovering from faults.

By combining High Availability and Fault Tolerance, systems can achieve Continuous Availability, ensuring uninterrupted access to services and minimizing the impact of failures.

#### Common FT Techniques

- **RAID (Redundant Array of Independent Disks)**: Data is stored across multiple disks to ensure availability in case of disk failures.
- **Database Replication**: Duplicating databases across multiple servers to ensure availability in case of server failures.
- **Stateful Failover**: Replicating the state of a system to ensure seamless failover in case of a failure.
- **Heartbeat Mechanisms**: Monitoring the health of systems and triggering failover mechanisms when needed.
- **Self-Healing Algorithms**: Automatically recovering from failures without human intervention.
