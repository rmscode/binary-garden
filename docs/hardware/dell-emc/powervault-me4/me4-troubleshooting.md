# Troubleshooting

!!! note "WIP . . . isn't necessarily complete or ordered correctly."

## Operators Panel LEDs

The [Ops panel](../powervault-me4/me4-overview.md#operator-panel-leds) on the front of the enclosure located on the left ear flange of the 2U chassis provides status information at a glance.

### LED colors

LED colors are used consistently throughout the enclosure and its components for indicating status:

- **Green**: Good or positive indication.
- **Blinking green/amber**: Non-critical condition.
- **Amber**: Critical fault.

### Actions

- If the Ops panel Module Fault (Status/Health) LED is on, check the module LEDs on the enclosure rear panel to narrow the fault to a CRU, a connection, or both.
- Check the event log for specific information regarding the fault, and follow any Recommended Actions.
- If installing a controller module or IOM CRU:
    - Remove and reinstall the controller module or IOM per the Dell PowerVault ME4 Series Storage System [Owner’s Manual](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_om_pub/).
    - Check the event log for errors.
- If the CRU Fault LED is on, a fault condition is detected.
    - Restart this controller from the partner controller using the PowerVault Manager or CLI.
    - If the restart does not resolve the fault, remove the controller module or IOM and reinsert it.
- If the previous actions do not resolve the fault, contact Dell for assistance.


## Alarm conditions

| Status                                         | Severity                              | Alarm
| ---------------------------------------------- | ------------------------------------- | -----
| PCM alert – loss of DC power from a single PCM | Fault – loss of redundancy            | S1
| PCM fan fail                                   | Fault – loss of redundancy            | S1
| SBB module detected PCM fault                  | Fault                                 | S1
| PCM removed                                    | Configuration error                   | None
| Enclosure configuration error (VPD)            | Fault – critical                      | S1
| Low warning temperature alert                  | Warning                               | S1
| High warning temperature alert                 | Warning                               | S1
| Over-temperature alarm                         | Fault – critical                      | S4
| I^2^C bus failure                              | Fault – loss of redundancy            | S1
| Ops panel communication error (I^2^C)          | Fault – critical                      | S1
| RAID error                                     | Fault – critical                      | S1
| SBB interface module fault                     | Fault – critical                      | S1
| SBB interface module removed                   | Warning                               | None
| Drive power control fault                      | Warning  – no loss of disk power      | S1
| Drive power control fault                      | Fault – critical -loss of disk power  | S1
| Drive removed                                  | Warning                               | None
| Insufficient power available                   | Warning                               | None

!!! info "Use the PowerVault Manager to monitor the storage system event logs for information about enclosure-related events, and to determine any necessary recommended actions."

## Host-side connection troubleshooting featuring CNC ports

The following procedure applies to controller enclosures with small form factor pluggable (SFP+) transceiver connectors in 8/16 Gb/s FC or 10 GbE iSCSI host interface ports.

*SFP+ transceiver* and *host cable* is used to refer to any qualified SFP+ transceiver supporting CNC ports used for I/O or replication.

!!! note

    When experiencing difficulty diagnosing performance problems, consider swapping out one SFP+ transceiver at a time to see if performance improves.

1. Stop all I/O to the storage system. See “[Stopping I/O](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_om_pub/shutting-down-a-controller-module?guid=guid-0fdc7a08-1a01-4f66-bc37-d1ed052ac4d1&lang=en-us)” in the Dell PowerVault ME4 Series Storage System Owner’s Manual. 
2. Check the host link status/link activity LED. If there is activity, stop all applications that access the storage system.
3. Check the Cache Status LED to verify that the controller cached data is flushed to the disk drives.
      - Solid – Cache contains data yet to be written to the disk.
      - Blinking – Cache data is being written to CompactFlash in the controller module.
      - Flashing at 1/10 second on and 9/10 second off – Cache is being refreshed by the supercapacitor.
      - Off – Cache is clean (no unwritten data).
4. Remove the SFP+ transceiver and host cable and inspect for damage.
5. Reseat the SFP+ transceiver and host cable. Is the host link status/link activity LED on?
      - Yes – Monitor the status to ensure that there is no intermittent error present. If the fault occurs again, clean the connections to ensure that a dirty connector is not interfering with the data path.
      - No – Proceed to the next step.
6. Move the SFP+ transceiver and host cable to a port with a known good link status. This step isolates the problem to the external data path (SFP+ transceiver, host cable, and host-side devices) or to the controller module port. Is the host link status/link activity LED on?
      - Yes – You now know that the SFP+ transceiver, host cable, and host-side devices are functioning properly. Return the cable to the original port. If the link status LED remains off, you have isolated the fault to the controller module port. Replace the controller module.
      - No – Proceed to the next step.
7. Swap the SFP+ transceiver with the known good one. Is the host link status/link activity LED on?
      - Yes – You have isolated the fault to the SFP+ transceiver. Replace the SFP+ transceiver.
      - No – Proceed to the next step.
8. Reinsert the original SFP+ transceiver and swap the cable with a known good one. Is the host link status/link activity LED on?
      - Yes – You have isolated the fault to the cable. Replace the cable.
      - No – Proceed to the next step.
9. Verify that the switch, if any, is operating properly. If possible, test with another port.
10. Verify that the HBA is fully seated, and that the PCI slot is powered on and operational.
11. Replace the HBA with a known good HBA, or move the host side cable and SFP+ transceiver to a known good HBA. Is the host link status/link activity LED on?
      - Yes – You have isolated the fault to the HBA. Replace the HBA.
      - No – It is likely that the controller module needs to be replaced.
12. Move the cable and SFP+ transceiver back to its original port. Is the host link status/link activity LED on?
      - Yes – Monitor the connection for a period of time. It may be an intermittent problem, which can occur with damaged SFP+ transceivers, cables, and HBAs.
      - No – The controller module port has failed. Replace the controller module. 
