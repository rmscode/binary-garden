# Troubleshooting

!!! note "WIP . . . isn't necessarily complete or ordered correctly."

## Health Status

The PowerVault Manager uses health icons to show OK, Degraded, Fault, or Unknown status for the system and its components. Use the web application's GUI to drill down to find each component that has a problem, and follow the actions in the Recommendation field for the component. 

!!! tip

      Alternatively, you can check the health of the system with the CLI command `show system`.

## Monitor event notifications

With event notifications enabled, you can view event logs to monitor the health of the system and its components.

!!! info "Event IDs"

    See the [Owner's Manual](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_om_pub/events?guid=guid-93692ce8-3105-4064-bdb9-40269e847f2f&lang=en-us) for a list of event IDs.

## Enclosure LEDs

LED colors are used consistently throughout the enclosure and its components for indicating status:

- **Green**: Good or positive indication.
- **Blinking green/amber**: Non-critical condition.
- **Amber**: Critical fault.

### Operators Panel LEDs

The [Ops panel](../powervault-me4/me4-overview.md#operator-panel-leds) displays the aggregated status of all the modules. If the Ops panel Module Fault (Status/Health) LED is on, perform the following actions: 

- Check module LEDs on the enclosure rear panel to narrow the fault to a CRU, a connection, or both.
- Check the event log for specific information regarding the fault, and follow any Recommended Actions.
- If installing a controller module or IOM CRU:
    - Remove and reinstall the controller module or IOM per the Dell PowerVault ME4 Series Storage System [Owner’s Manual](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_om_pub/).
    - Check the event log for errors.
- If the CRU Fault LED is on, a fault condition is detected.
    - Restart this controller from the partner controller using the PowerVault Manager or CLI.
    - If the restart does not resolve the fault, remove the controller module or IOM and reinsert it.
- If the previous actions do not resolve the fault, contact Dell for assistance.

### PCM LEDs

Under normal conditions, the power cooling module (PCM) OK LEDs wil be constant green.

| PCM OK (GREEN) | FAIL FAN (AMBER) | AC FAIL (AMBER) | DC FAIL (AMBER) | STATUS 
| -------------- | ---------------- | --------------- | --------------- | ------
| On             | Off              | Off             | Off             | No AC power on any PCM
| Off            | Off              | On              | On              | No AC power on this PCM only
| On             | Off              | Off             | Off             | AC present; PCM working correctly
| On             | Off              | Off             | On              | PCM fan speed is outside acceptable limits
| Off            | On               | Off             | Off             | PCM fan has failed
| Off            | On               | On              | On              | PCM fault (above temperature, above voltage, above current)
| Off            | Blinking         | Blinking        | Blinking        | PCM firmware download is in progress

### Disk Drive Carrier Module LEDs

Under normal conditions, the green LED is on, and flickers as the drive operates. The amber LED will be off.

| ACTIVITY LED (GREEN)          | FAULT LED (AMBER)       | STATUS/CONDITION*
| ----------------------------- | ----------------------- | -----------------
| Off                           | Off                     | Off (disk module/enclosure)
| Off                           | Off                     | Not present
| Blink off with activity       | Blinking: 1s on /1s off | Identify
| - 1 down: Blink with activity | On                      | Drive link (PHY lane) down
| - 2 down: Off                 |                         |
| On                            | On                      | Fault (leftover/failed/locked-out)
| Blink off with activity       | Off                     | Available
| Blink off with activity       | Off                     | Storage system: Initializing
| Blink off with activity       | Off                     | Storage system: Fault-tolerant
| Blink off with activity       | Off                     | Storage system: Degraded (not critical)
| Blink off with activity       | Blinking: 3s on/ 1s off | Storage system: Degraded (critical)
| On                            | Off                     | Storage system: Quarantined
| Blink off with activity       | Blinking: 3s on/ 1s off | Storage system: Offline (dequarantined)
| Blink off with activity       | Off                     | Storage system: Reconstruction
| Blink off with activity       | Off                     | Processing I/O (whether from host or internal activity)
| *If multiple conditions occur simultaneously, the LED state behaves as indicated by the condition listed earliest in the table, as rows are read from top to bottom.

### 12 Gb/s Controller Module LEDs 

<https://www.dell.com/support/manuals/en-us/powervault-me4084/me4_series_om_pub/12-gbs-controller-module-leds?guid=guid-a717a6fc-0afe-4256-972a-b9e24bdfba0e&lang=en-us>

| LED | DESCRIPTION | DEFINITION
| --- |
| 1   |
| 2   |
| 3   |
| 4   |
| 5   |
| 6   |
| 7   |
| 8   |
| 9   |
| 10  |

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

## Thermal Monitoring

Recommended actions...

=== "SYMPTOM"

      If the ambient air temp is below 77ºF, and teh fans are observed to increase in speed, then some restriction of airflow may be causing internal temps to rise. !!! note "This is not a fault condition."

=== " CAUSE"

      The first stage in the thermal control process is for the fans to automatically increase in speed when a thermal threshold is reached. This may be caused by higher ambient temperatures in the local environment, and may be perfectly normal.

=== "RECOMMENDED ACTION"

      1. Check the installation for any airflow restrictions at either the front or back of the enclosure. A minimum gap of 25 mm (1") at the front and 50 mm (2") at the rear is recommended.
      2. Check for restrictions due to dust build-up. Clean as appropriate.
      3. Check for excessive re-circulation of heated air from rear to front. Use of the enclosure in a fully enclosed rack is not recommended.
      4. Verify that all blank modules are in place.
      5. Reduce the ambient temperature.

## Thermal Alarm

=== "SYMPTOM"

      1. Ops panel Module Fault LED is amber.
      2. Fan Fail LED is illuminated on one or more PCMs.

=== "CAUSE"

      Internal temperature exceeds a preset threshold for the enclosure.

=== "RECOMMENDED ACTION"

      1. Verify that the local ambient environment temperature is within the acceptable range. (41ºF to 95ºF)
      2. Check the installation for any airflow restrictions at either the front or back of the enclosure. A minimum gap of 25 mm (1") at the front and 50 mm (2") at the rear is recommended.
      3. Check for restrictions due to dust build-up. Clean as appropriate.
      4. Check for excessive re-circulation of heated air from rear to front. Use of the enclosure in a fully enclosed rack is not recommended.
      5. If possible, shut down the enclosure and investigate the problem before continuing.

## Host-side connection troubleshooting featuring CNC ports

The following procedure applies to controller enclosures with small form factor pluggable (SFP+) transceiver connectors in 8/16 Gb/s FC or 10 GbE iSCSI host interface ports.

*SFP+ transceiver* and *host cable* is used to refer to any qualified SFP+ transceiver supporting CNC ports used for I/O or replication.

!!! note

    When experiencing difficulty diagnosing performance problems, consider swapping out one SFP+ transceiver at a time to see if performance improves.

1. Stop all I/O to the storage system. See “[Shutting Down a Controller Module](me4-shutdown-controller.md)” for more information. 
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
