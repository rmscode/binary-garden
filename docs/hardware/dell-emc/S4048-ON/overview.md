# Overview

!!! info

    S4048-ON is a networking switch for campus aggregation and core switching 10 Gbps servers and 40 Gbps optical uplinks to the 40 Gbps switching fabric in the core.

    The S4048-ON has:

    - Forty-eight SFP+ ports for 1/10 Gbps transceivers
    - Six fixed QSFP+ optical ports for 40Gbps transceivers
    - Serial RS 232 and Micro-USB console ports
    - One out-of-band (OOB) RJ45 management port
    - LED display for the switch, fan, and power status

[Configuration Guide for the S4048-ON System (9.14.2.4)](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/about-this-guide)

---

## Front View <small>(I/O-side)</small> { #front-view data-toc-label="Front View" }

![I/O-side view](../../../assets/GUID-9C32485B-D809-43BC-BC69-694387ABDD6A-low.jpg)

1. SFP+ ports
2. QSFP+ ports
3. USB Type-A storage port

## Rear View <small>(PSU-side)</small> { #rear-view data-toc-label="Rear View" }

![PSU-side view](../../../assets/GUID-C7F3A160-004F-48B8-B539-DC43637449DC-low.jpg)

1. Power supply unit 1
2. Fan module
3. Out-of-band management port
4. Power supply unit 2
5. RS-232 serial console port

## LED Behavior

![S4048–ON LEDs](../../../assets/GUID-D011C2D2-DE17-41DB-8490-A5E9D3DEC0A4-low.jpg)

=== "1. Master LED"

    - **Off**: Switch is in Stacking Slave mode
    - **Solid green**: System is in Stacking Master or Standalone mode

=== "2. System LED"

    - **Solid green** : Normal operation
    - **Flashing green**: Booting
    - **Solid amber**: Critical system error
    - **Flashing amber**: Non-critical system error, fan failure, or power supply failure

=== "3. Power LED"

    - **Off**: No power
    - **Solid green**: Normal
    - **Solid amber**: POST is in process
    - **Flashing amber**: Power supply failed

=== "4. Fan LED"

    - **Solid green**: Fan powered and running at the expected RPM
    - **Solid amber**: Fan failed including incompatible airflow direction when you insert the PSU or fan trays with differing airflows

=== "5. Locator LED"

    - **Off**: Locator function is disabled
    - **Flashing blue**: Locator function is enabled

=== "6. SFP+ link/activity LEDs"

    - Standard activity/speed indicators

=== "7. Stack LED"

    - Green digit display: Stack ID

=== "8. USB port LED"

    . . .

=== "9. QSFP+ link/activity LEDs"

    - **Activity LED flashing amber**: One second on, one second off - port beacon.

<div class="grid cards" markdown>

-   :material-numeric-9-box-multiple:{ .lg .middle } [__OS9 CLI Configuration Docs__ :octicons-arrow-right-24:](../../dell-emc/S4048-ON/os9-getting-started.md)

-   :material-numeric-10-box-multiple:{ .lg .middle } [__OS10 CLI Configuration Docs__ :octicons-arrow-right-24:](../../dell-emc/S4048-ON/os10.md)

</div>