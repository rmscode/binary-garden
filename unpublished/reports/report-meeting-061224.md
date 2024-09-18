# Report: Meeting Summary 06-12-24

## Context :

We had a meeting with to discuss the Dell ME5 storage array, the future of Microsoft Exchange, and the possibility of moving to Exchange Online.

## Key Points:

### Cost of Moving to M365

- **Cost per User**: 
    - $12.50/month for Microsoft 365 Business Standard (email + desktop apps)
    - $6.00/month for Business Basic (email + web apps)
- **Number of Users**: 
    - Approximately 166 users with email
    - Approximately 140 of them have computers
- **Approximate total:** (140 x $12.50) + (26 x $6.00) = $1,906.00/month or $22,872.00/year

### Cost of Additional Exchange Online Mailbox Storage (The default is 50GB)

- **Expansion**: Up to 100GB with an Exchange Online Plan 2 license.
- **Cost**: $8/month per user for additional storage and up to 1.5TB of archiving.

### ME5 to ME4 Replication/Mirroring Options

- **Network Requirements**: Both systems must be on the same network or fabric via a switch; direct connection is not supported.
- **Replication Details**: Replication for virtual storage provides a remote copy of a volume, volume group, or snapshot on a remote system by periodically updating the remote copy to contain a point-in-time consistent image of a source volume. After an initial image has been replicated, subsequent replications only send changed data to the remote system.
- **Secondary System Access**:
    - To keep replication sets intact, snapshots can be created on the secondary unit and then mapped either read-only or read-write.
    - However, you cannot replicate the changes written to it back to the data center system using the existing replication set.
- **Manual Disaster Recovery**: If you think the primary can't be recovered in time or at all, you can temporarily access the the data from the secondary as if it were the primary. You can again create a snapshot or delete the replication set to allow mapping the secondary volume directly to the hosts. Deleting the replication set means the secondary volume becomes a base volume and is no longer the target of a replication.

### Single Storage Pool vs Two Storage Pools

- **Reddit Feedback**: RAID disk groups cannot be expanded; thus, multiple RAID disk groups can complicate management when trying to balancing them between two pools.
- **Dell Feedback**: With low counts of drives, people usually max out the throughput of the drives well before maxing out the throughput of the host ports.
- **Max Drive Count & ADAPT Considerations**: It's less common to see customers max out their drive count right away, so starting with one pool makes future expansion easier. However, *ADAPT + max drive count makes two pools a feasible option for our needs*.

### Multiple Instances of Exchange in the Domain (No DAG)

- **License Transfer**: Licenses are transferable between servers.
- **Grace Period**: Exchange runs unlicensed for 180 days before requiring a key.
- **Mailbox Movement**: Mailboxes can be moved between servers without a Database Availability Group (DAG).
- **Internal Routing**: Exchange uses SMTP for mail delivery to the correct server within the organization.
- **Coexistence**: Standing up a new Exchange server in a domain where one already exists, just adds to the existing Exchange Organization. It only makes sense that an Exchange Organization knows where all of the mailboxes live. The existing Exchange server can act as CAS and hub transport for the new server, so you don't have to expose the new server to the internet.  

## References:

- **M365 Mailbox Size Limits**: [Microsoft Learn](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#mailbox-storage-limits)
- **Exchange Server Coexistence**: [Spiceworks](https://community.spiceworks.com/t/two-exchange-2019-servers-coexisting-in-one-domain-temporarily-no-dag/1086542/4?u=notmauricemoss)
- **Exchange Mail Flow**: [Microsoft Learn](https://learn.microsoft.com/en-us/exchange/mail-flow/mail-routing/mail-routing?view=exchserver-2019)
- **Install a Second Exchange Server**: [Ali Tajran](https://www.alitajran.com/install-second-exchange-server-in-domain/)
- **Dell ME5024 One Pool or Two**: [Dell Community](https://www.dell.com/community/en/conversations/powervault/me5024-one-pool-or-two/663ceb6449d3ee2f2acf81b3) | [r/Storage](https://www.reddit.com/r/storage/comments/1d3fcq8/adapt_dell_me4024_10gb_iscsi_with_24_192_sas_ssds/)
- **Dell ME5 Replication**: [PowerVault ME5 Administrator's Guide](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/replication?guid=guid-8ae2f16c-b6a6-4aed-a79d-d8970e4d8f26&lang=en-us)
- **Dell ME5 Disaster Recovery**: [PowerVaulty ME5 Administrator's Guide](https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag/disaster-recovery-procedures?guid=guid-12cd97aa-60b9-476b-a683-f39a344ea25c&lang=en-us)