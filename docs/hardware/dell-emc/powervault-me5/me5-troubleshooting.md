# Troubleshooting

## Fault Isolation Methodology

### Identify the Faults

- The PowerVault Manager shows the system health as *Degraded*, *Fault* or *Unknown* if any component has a problem.
- As an alternative to the PowerVault Manager, you can run the `show system` command to view the health of the system and its components.
- With event notifications configured, you can view event logs to monitor the health of the system and its components.
    - Use the PowerVault Manager to view the event log and then click the event message to view the details.
    - Use the CLI to run the `show events detail` command to see the details for an event.
- You can view the LEDs on the hardware to identify component status. If a problem prevents access to the PowerVault Manager or the CLI, viewing the enclosure LEDs is the only option available.

### Gather Fault Information

Review the reported fault:

- Is the fault related to an internal data path or an external data path?
- Is the fault related to a hardware component such as a disk drive module, controller module, or power supply unit?

#### Determine the Location of the Fault

When a fault occurs, the Module Fault LED illuminates. Check the LEDs on the back of the enclosure to narrow the fault to a CRU, connection, or both.

Use the PowerVault Manager to verify any faults found while viewing the LEDs or if the LEDs cannot be viewed due to the location of the system. The **Maintenance > Hardware** view provides a visual representation of the system and shows faults when they occur.

#### Review the Event Logs

The event logs record *all* system events and each event has a numeric code that identifies the type of event.

- **Critical**: A failure occurred that may cause a controller to shut down. Correct the problem immediately.
- **Error**: A failure occurred that may affect data integrity or system stability. Correct the problem as soon as possible.
- **Warning**: A problem occurred that may affect system stability, but not data integrity. Evaluate the problem and correct it if necessary.
- **Informational**: A configuration or state change has occurred, or a problem occurred that the system corrected. No immediate action is required.

Review the logs to identify faults and the cause of the failure. For example, a host could lose connectivity to a disk group if a user changes the channel settings without considering the storage resources that are assigned.

### Host I/O

When troubleshooting disk drive and connectivity faults, [stop I/O](me5-shutdown-controller.md) to the affected disk groups from all hosts as a data protection precaution.
