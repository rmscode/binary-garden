# Hosts and Initiators

## Hosts

### Remove Hosts

!!! info 

    You can only remove hosts that are not grouped. Removing a host will ungroup its initiators but will not delete them.

1. In the Hosts topic, select 1 through 512 ungrouped hosts to remove.
2. Select **Action > Remove Host**. The Remove Host panel opens and lists the hosts to be removed.
3. Click **OK**. For initiators that were in the selected hosts, the Host value changes to `--`.

[*Reference*](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/remove-hosts?guid=guid-411217ec-fdc8-4fc6-a60e-b097f6f4f952&lang=en-us)

### Rename Hosts

1. In the Hosts topic, select an initiator that belongs to the host that you want to rename.
2. Select **Action > Rename Host**. The Rename Host panel opens.
3. In the **New Host Name** field, enter a new name for the host. A host name is case sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following: `" , . < \`
4. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/rename-a-host?guid=guid-ba175bb2-f1f8-47e3-9896-74846efbc6b1&lang=en-us)

### Add Host to a Host Group

!!! info 

    The host must be [mapped](../powervault-me4/me4-mappings.md#map-initiators-and-volumes) with the same access, port, and LUN settings to the same volumes or volume groups as every other initiator in the host group.

1. In the Hosts topic, select 1 through 256 initiators that belong to a host that you want to add to a host group.
2. Select **Action > Add to Host Group**.
3. Perform one of the following:
      - To use an existing host group, select its name in the **Host Group Select** list. **NOTE**: The list might display the names of host groups that have been removed from the system. When you select a host group from the Host Group Select list, ensure that you select a host group that exists on the system.
      - To create a host group, enter a name for the host group in the **Host Group Select** field. A host group name is case-sensitive and can have a maximum of 32 bytes. It cannot exist in the system or include the following: `" , . < \`
4. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/add-hosts-to-a-host-group?guid=guid-47d5f115-fe7b-4535-99d9-a924f7260d91&lang=en-us)

### Remove Host from a Host Group

!!! info

    You can remove all except the last host from a host group. Removing a host from a host group will ungroup the host but will not delete it.

1. In the Hosts topic, select 1 through 256 hosts to remove from their host group.
2. Select **Action > Remove from Host Group**. The Remove from Host Group panel opens and lists the hosts to be removed.
3. Click **OK**. For the selected hosts, the Group value changes to `--`.

[*Reference*](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/remove-hosts-from-a-host-group?guid=guid-01c12cb9-6b88-4270-ab33-a350cada9cd6&lang=en-us)

### Rename Host Groups

1. In the Hosts topic, select a host group to rename.
2. Select **Action > Rename Host Group**.
3. In the New Host Group Name field, enter a new name for the host group. A host group name is case sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following: `" , . < \`
4. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/rename-a-host-group?guid=guid-0b51c171-3c5d-4500-9f36-9b8e71330b9d&lang=en-us)

### Remove Host Groups

!!! info 

Removing a host group will ungroup its hosts but will not delete them.

1. In the Hosts topic, select 1 through 32 host groups to remove.
2. Select **Action > Remove Host Group**. The Remove Host Group panel opens and lists the host groups to be removed.
3. Click **OK**. For hosts that were in the selected host groups, the Group value changes to `--`.

[*Reference*](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/remove-host-groups?guid=guid-8daa9680-9f21-426b-bb93-fec836eac2f7&lang=en-us)


## Initiators

### Create Initiators

!!! info 

    The controllers automatically discover initiators that have sent an inquiry command or a report luns command to the storage system, which typically happens when a host boots up or rescans for devices. When the command is received, the system saves the initiator ID. You can also manually create entries for initiators. For example, you might want to define an initiator before a controller port is physically connected through a switch to a host.

1. Determine the iSCSI IQN to use for the initiator.
2. In the Hosts topic, select **Action > Create Initiator**.
3. In the Initiator **ID** field, enter the IQN.
4. In the **Initiator Name** field, enter a nickname that helps you easily identify the initiator. For example, you could use ExchangeServer_1. An initiator name is case sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following: `" , . < \`
5. In the Profile list, select **Standard**.
6. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/create-an-initiator?guid=guid-64d85bd0-1d7a-4a22-a475-22f75521e4c7&lang=en-us)

### Modify Initiators

1. In the Hosts topic, select one initiator to modify.
2. Select **Action > Modify Initiator**.
3. In the **Initiator Name** field, enter a new nickname to help you identify the initiator.
4. In the Profile list, select **Standard**.
5. Click **OK**.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/modify-an-initiator?guid=guid-e9c2fc66-c6a8-4d91-a7ef-3878f568b31b&lang=en-us)

### Delete Initiators

!!! info 

    You can only delete manually created initiators that are not grouped or are not mapped. You also cannot delete a discovered initiator but you can remove its nickname through the delete operation.

1. In the Hosts topic, select a number, from 1 through 1024, of ungrouped, undiscovered initiators to delete.
2. Select **Action > Delete Initiators**.
3. Click **OK**.
      - If the initiator you are trying to delete is currently undiscovered, the changes are processed and the hosts table is updated.
      - If the initiator you are trying to delete is currently discovered then a confirmation panel appears. Click **Yes** to save your changes.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/delete-initiators?guid=guid-228cf839-078b-4c1e-9e98-d0157c495882&lang=en-us)

### Add Initiators to a Host

!!! info 

    To add an initiator to a host, the initiator must be [mapped](../powervault-me4/me4-mappings.md#map-initiators-and-volumes) with the same access, port, and LUN settings to the same volumes or volume groups as every other initiator in the host.

1. In the Hosts topic, select 1 through 128 named initiators to add to a host.
2. Select **Action > Add to Host**.
3. Perform one of the following:
      - To use an existing host, select its name in the Host Select list.
      - To create a host, enter a name for the host in the Host Select field. A host name is case sensitive and can have a maximum of 32 bytes. It cannot already exist in the system or include the following: `" , . < \`
Click **OK**. For the selected initiators, the Host value changes from `--` to the specified host name.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/add-initiators-to-a-host?guid=guid-55e3e5bc-3319-47ec-9b1e-55c84bfa2a41&lang=en-us)

### Remove Initiators from a Host

!!! info 

    You can remove all except the last initiator from a host. Removing an initiator from a host will ungroup the initiator but will not delete it. To remove all initiators, remove the host.

1. In the Hosts topic, select 1 through 1024 initiators to remove from their hosts.
2. Select **Action > Remove from Host**. The Remove from Host panel opens and lists the initiators to be removed.
3. Click **OK**. For the selected initiators, the Host value changes to `--`.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/remove-initiators-from-hosts?guid=guid-d0ff3502-068a-4070-a149-bb18290a787b&lang=en-us)

## Configuring CHAP

!!! abstract [Todo](https://www.dell.com/support/manuals/it-it/powervault-me4012/me4_series_ag_pub/configuring-chap?guid=guid-f384dfd2-4699-4e36-8e5d-55b2bdedac2c&lang=en-us)