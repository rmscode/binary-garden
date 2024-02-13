# About Mapping Initiators and Volumes

Mappings between a volume and one or more initiators, hosts, or host groups enable hosts to view and access the volume. There are two types of maps that can be created: default maps and explicit maps. Default maps enable all hosts to see the volume using a specified LUN and access permissions. Default mapping applies to any host that has not been explicitly mapped using different settings.

The advantage of a default mapping is that all connected hosts can discover the volume with no additional work by the administrator. The disadvantage is that all connected hosts can discover the volume with no restrictions. Therefore, this process is not recommended for specialized volumes that require restricted access. 

!!! note 

    I'm interpretting this as meaning that each unique target will need to be configured in the Windows iSCSI Initiator if explicit maps are used. Windows iSCSI Initiator normally attempts to discover *all* targets after you give it an IP address of a storage controller.

## Map Initiators and Volumes

1. In the Mapping topic, select **Action > Map** to create a new mapping.
      -  The Map panel opens and shows two tables side-by-side that list available initiators and volumes. You can use these tables to create mappings. There is also a table underneath the host and volume tables that lists mappings. After you create a mapping and before you save it, the mapping appears in the mappings table and you can modify its settings or delete it.
2. Select one or more initiators and one or more volumes to map and click the **Map** button. When the **Map** button is clicked, the button changes from **Map** to **Reset**.
      - !!! note "If you attempt to map a volume to a host group that is already mapped to an initiator and one or more volumes, the mapping might fail with the error `The specified LUN overlaps a previously defined LUN`. The workaround to this issue is to unmap the existing volumes that are mapped to the host group, then map the volume that failed to map to the host group, and remap the unmapped volumes to the host group."
3. Perform any of the following:
      -  To edit a mapping, set the following options: **Mode**, **LUN**, **Ports**
      -  To clear the mapping table, click **Reset**.
      -  To save a new mapping or save changes to an existing mapping, select **Save** from the Action column.
      -  To undo changes to an existing mapping, select **Revert** from the Actions columns.
      -  To delete an existing mapping, select **Delete** from the Action column.
4. Once the list is correct, to apply changes, click **Apply** or **OK**.
5. Click **Yes** when the confirmation panel appears.

[**Reference**](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/map-initiators-and-volumes?guid=guid-8641fc58-8498-41c1-bf84-b14617d338f0&lang=en-us)

## Remove Mappings

1. In the Mapping topic, select one or more mappings from the table.
2. Select **Action > Remove Mappings**. The Remove Mappings panel shows the selected mappings.
3. Click **OK**.

[**Reference**](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/remove-mappings?guid=guid-7e3ed3a7-f0c5-40df-9749-a92e34fd755a&lang=en-us)

## Remove ALL Mappings

1. In the Mapping topic, select one or more mappings from the table.
2. Select **Action > Remove All Mappings**. The Remove All Mappings panel opens.
3. Click **OK**.

[**Reference**](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub/removing-all-mappings?guid=guid-be87ea15-3fc2-487a-b78e-92dcd75aa083&lang=en-us)