# Debugging and Diagnostics

## Unplanned Reboots

If the system restarts for some reason (automatically or manually), the `show system` command output includes the reason for the restart.

## Watchdog

!!! abstract "ToDo: This needs more documentation."

The `hardware watchdog` command allows you to configure automatically rebooting a Dell EMC Networking OS switch/router with a single RPM that is unresponsive.

## Over-Temperature Conditions

To receive periodic power updates, you must enable the following command: `enable optic-info-update interval`. When the system detects a genuine over-temperature condition, it powers off the line card. To recognize this condition, look for the following system messages:

```shell
CHMGR-2-MAJOR_TEMP: Major alarm: chassis temperature high (temperature reaches or exceeds threshold of [value]C)
CHMGR-2-TEMP_SHUTDOWN_WARN: WARNING! temperature is [value]C; approaching shutdown threshold of [value]C
```

To troubleshoot an over-temperature condition, use the following info:

1. Use the `show environment` commands to monitor the temperature levels.
2. Check air flow through the system.
3. After the software has determined that the temperature levels are within normal limits. you can re-power the card safely with the `power-on` command in EXEC mode.

## Under-Voltage Conditions

To recognize an under-voltage condition, look for the following message:

`%CHMGR-1-CARD_SHUTDOWN: Major alarm: stack unit 2 down - auto-shutdown due to under voltage`

In response, the system first shuts down the PoE. IF the condtiion persists, the system shuts down the line cards then the RPMs.

To troubleshoot an uinder-voltage condition, check that the correct number of power supplies are installed and their Status light LEDs are lit.

[*Reference*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/debugging-and-diagnostics?guid=guid-3ee7236a-776d-411d-9c1b-0208901f4fbe&lang=en-us)