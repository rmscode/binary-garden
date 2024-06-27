---
status: new
---

# Hosts and Initiators

## Hosts

### Creating Hosts

Click **Provisioning > Hosts > Create Hosts** to open the Create Hosts wizard to create hosts and host groups from existing initiators.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/creating-hosts?guid=guid-f5989097-ccec-4796-aac7-67c6cd4a4204&lang=en-us)

### Add Host to a Host Group

You can add hosts to a new or existing host group from the Hosts table (**Provisioning > Hosts**) by selecting the host or host group and choosing **Add to Host Group** from the drop-down list. Follow the on-screen instructions to complete the process.

!!! info

    The host must be attached with the same access, port, and LUN settings to the same volumes or volume groups as every other initiator in the host group.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/adding-hosts-to-a-host-group?guid=guid-a3b967d1-24ff-455f-8693-d03e9df3e3d8&lang=en-us)

### Rename Hosts

You can rename hosts from the Overview panel (**Provisioning > Hosts > Hosts and Host Groups >** *slide-over*). Click next to the hostname to modify it.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/renaming-hosts?guid=guid-13d615fa-15c5-419d-84ff-24b9f4bfa3c3&lang=en-us)

### Remove Host from a Host Group

You can remove hosts from a host group (**Provisioning > Hosts**) by selecting the host from the Hosts table and choosing **Remove From Host Group** from the drop-down list. Follow the on-screen directions to complete the process.

!!! info

    You can remove all except the last host from a host group. Removing a host from a host group will ungroup the host but will not delete it.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/removing-hosts-from-a-host-group?guid=guid-a944b5a9-7432-4af0-8d6b-34bb356082ff&lang=en-us)

### Remove Hosts

You can delete hosts that are not grouped (**Provisioning > Hosts**) by selecting the host from the Hosts table and choosing **Delete Host** from the drop-down list. Follow the on-screen directions to complete the process.

!!! info 

    Deleting a host will ungroup its initiators, but they will still be visible if they are physically connected to the system. The host will detach from any attached volumes and the host device will lose access to all volume data.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/deleting-hosts?guid=guid-4b1ae3eb-b199-4d8b-baff-22864d72dfa8&lang=en-us)

### Rename Host Groups

You can rename host groups from the Overview panel (Provisioning > Hosts > Hosts and Host Groups > slide-over). Click the penciel icon next to the host group to modify it.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/renaming-host-groups?guid=guid-2548657a-9711-4fe3-aec4-a1962e061743&lang=en-us)

### Remove Host Groups

You can delete host groups (**Provisioning > Hosts**) by selecting the host group from the Hosts table and choosing **Delete Host Group** from the drop-down list. Follow the on-screen directions to complete the process.

!!! info 

    Deleting a host group will ungroup the hosts from the group but will not delete them. You will lose access to any volumes that were attached to the host group. You will retain access to any volumes that were attached to hosts in the group.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/deleting-host-groups?guid=guid-eb09bcc0-4a87-4b5d-9c86-10a9919a31a0&lang=en-us)

## Initiators

### Create Initiators

The controllers automatically discover initiators that have sent an inquiry command or a report luns command to the storage system, which typically happens when a host boots up or rescans for devices. When the command is received, the system saves the initiator ID. You can also manually create entries for initiators as described in the [CLI Reference Guide](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_cli/set-initiator?guid=guid-e05220da-af09-4709-8434-a455a39576e4&lang=en-us) by setting a nickname to a specified unique ID. For example, you might want to define an initiator before a controller port is physically connected through a switch to a server.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/initiators-hosts-and-host-groups?guid=guid-43142ef0-fee9-4b3f-bc7c-ea7d8de2b483&lang=en-us)

### Rename Initiators

You can rename initiator nicknames from the Overview panel (**Provisioning > Hosts > Hosts and Host Groups >** *slide-over*). Click the pencil icon next to the initiator name to modify it.

You can also edit an initiator nickname from (Provisioning > All Initiators > slide-over). Click the pencil icon next to the initiator name to modify it.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/renaming-initiators?guid=guid-fd98aede-c81d-48e5-803b-8f2ff18d830f&lang=en-us)

### Add Initiators to a Host

You can add existing initiators to an existing host from the Hosts table (**Provisioning > Hosts > All Initiators**) by selecting the initiator and choosing **Add to Existing Host** from the drop-down list. Follow the on-screen directions to complete the process.

!!! info 

    To add an initiator to a host, the initiator must be attached with the same access, port, and LUN settings to the same volumes or volume groups as every other initiator in the host.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/add-initiators-to-a-host?guid=guid-ce896a49-b488-4e0f-b21b-92773aa824f2&lang=en-us)

### Remove Initiators from a Host

You can remove initiators from a host or host group from the Hosts table (**Provisioning > Hosts > All Initiators**) by selecting the initiator and choosing **Remove From Host** from the drop-down list. Follow the on-screen directions to complete the process.

!!! info 

    You can remove all except the last initiator from a host. Removing an initiator from a host will ungroup the initiator but will not delete it. To remove all initiators, remove the host.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/removing-initiators-from-a-host?guid=guid-5e2ba757-500b-411b-95b3-7b4529eed1a3&lang=en-us)
