# Overview

!!! info

    The ME4 Series is a next gen entry-level block storage array that’s purpose-built and optimized for SAN/DAS simplicity and accelerated performance. It’s designed to meet the needs of the entry storage market, while also offering the flexibility to scale as needs grow.

    Resources:

    - [Owner's Manual](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_om_pub/)
    - [Deployment Guide](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_dg_pub)
    - [Administrator's Guide](https://www.dell.com/support/manuals/en-us/powervault-me4012/me4_series_ag_pub)
    - [CLI Guide](https://www.dell.com/support/manuals/en-us/powervault-me4024/me4_series_cli_pub) 
    - [Best Practices Guide](https://www.delltechnologies.com/asset/en-us/products/storage/industry-market/dell_emc_me4_series_storage_system_best_practices.pdf)

??? info "PowerVault ME4 Series Terminology"

    `Customer Replaceable Unit (CRU)`

    :   Customer Replaceable Unit. A part that can be replaced by the customer.

    `Field Replaceable Unit (FRU)`

    :   Field Replaceable Unit. A part that requires service expertise from a Dell field technician.

    `Partner Firmware Update (PFU)`

    :   An option that automatically updates the firmware on the second controller module to match that on the first controller module.

    `Converged Network Controller (CNC)`

    :   This technology allows you to select the host interface protocols to use on the storage system. The ME4 Series FC/iSCSI modules use SFP+ connectors in the CNC ports.

    `Storage Bridge Bay (SSB)`

    :   Storage Bridge Bay modules actively manage the enclosure. Each module has a SAS expander with its own storage enclosure processor (SEP).

    `Data Drive in Carriers (DDICs)`

    :   A DDIC consists of a disk drive that is installed in a carrier module. They are hot-swappable.

    `Input/Output Module (IOM)`

    :   An IOM is a module that provides connectivity to the enclosure. More specifically, they are referenced in Dell documentation as expansion enclosures.

    `Power Cooling Module (PCM)`

    :   A PCM is a module that provides power and cooling to the enclosure. It is a hot-swappable module.

---

## Front Panel

### DDICs

![ME4024 Front Panel](../../../assets/GUID-EB01FA14-AC25-4933-A4C1-82131A9DBC20-low.jpg)

!!! info

    Integers on the disks indicate drive slot numbering sequence.

![ME4024 Front Panel DDIC](../../../assets/GUID-092807F3-75F9-457D-9B4E-009D8517BDB8-low.jpg)

=== "1 & 4 Disk Activity LED"

    In normal operation, the green LED is on and flickers as the drive operates.

=== "2 & 3 Disk Fault LED"

    In normal operation, the amber LED is:

    - Off if there no drive present
    - Off as the drive operates
    - On if there is a drive fault

### Operator Panel LEDs

!!! info

    If the Ops panel Status/Health LED is amber, check the module LEDs on the enclosure rear panel to narrow the fault to a CRU, a connection, or both.

    See the [Troubleshooting](../powervault-me4/me4-troubleshooting.md) section for more information. 

![ME4024 Front Panel LED](../../../assets/GUID-50A3FA88-6C9C-4FD4-837D-819D6D69CB28-low.jpg)

=== "1. System Power"

    - **Constant green**: At least one PCM is supplying power.
    - **Off**: System not operating.

=== "2. Status/Health"

    - **Constant blue**: System is powered on and controller is ready.
    - **Blinking blue**: Controller management is busy.
    - **Constant amber**: Module fault present.
    - **Blinking amber**: Logical fault.

=== "3. Unit ID Display"

    - **Green seven-digit display**: Shows the numerical position of the enclosure in the cabling sequence. The UID (Unit ID Display) is also the enclosure ID.

=== "4. Identity"

    - **Blinking blue**: System ID locator is activated.
    - **Off**: Normal state

## Rear Panel

!!! info

    Controller modules, IOMs, and PCMs are available as CRUs.

### Controller enclosure (4-port FC/iSCSI)

![ME4024 Rear Panel (FC/iSCSI)](../../../assets/GUID-E0F56738-3FAD-4315-83AB-C3E277AF070C-low.jpg)

1. Power cooling module slot 0
2. Power cooling module slot 1
3. Controller module slot A
4. Controller module slot B

See also, [troubleshooting PCM faults](me4-troubleshooting.md#pcm-faults).

### Controller module (4-port FC/iSCSI)

The top slot for holding controller modules is designated slot A and the bottom slot is designated slot B. The face plate details of the controller modules show the modules aligned for use in slot A. In this orientation, the controller module latch shown at the bottom of the module and it is in a closed/locked position. The following figures identify the ports on the controller modules.

![ME4024 Controller Module (FC/iSCSI)](../../../assets/GUID-99E108C1-9D48-48C0-AA43-D67965E47F54-low.jpg)

1. Back-end expansion SAS port
2. Ethernet port used by management interfaces
3. USB serial port (CLI)
4. 3.5 mm serial port (CLI)
5. 3.5 mm serial ports (service only)
6. Reset
7. CNC ports (ports 3, 2, 1, 0)

### Controller module LEDs

![ME4024 Controller Module LEDs](../../../assets/GUID-2CCEAE51-984C-460B-8F44-A0BF1DA1E99D-low.jpg)

=== "1. Link Status/Activity for host 4/8/16 Gb FC"

    - **Off**: No link.
    - **Green**: Port connected and the link is up.
    - **Blinking green**: I/O activity.

=== "2. Link Status/Activity 10GbE iSCS"

    - **Off**: No link.
    - **Green**: Port connected and the link is up.
    - **Blinking green**: I/O activity.

=== "3. OK"

    - **Green**: Controller operating normally.
    - **Blinking green**: Booting.
    - **Off**: Controlller not, or is powered off.

=== "4. Fault"

    - **Off**: Controller operating normally.
    - **Amber**: Fault detected or service action required.
    - **Blinking amber**: Hardware-controlled power-up or a cache flush or restore error.

=== "5. OK to remove"

    - **Off**: Not prepared for removal.
    - **Blue**: Controller module is prepared for removal.

=== "6. Identity"

    - **White**: Controller is being identified.

=== "7. Cache Status"

    - **Green**: Cache is dirty (contains unwritten data) and operation is normal.
    - **Off**: In a working controller, cache is clean (contains no unwritten data). This is an occasional condition that occurs while the system is booting.
    - **Blinking green**: A CompactFlash flush or cache self-refresh is in progress, indicating cache activity.

=== "8. Network Port Link Active Status"

    - **Off**: The Ethernet link is not established, or the link is down.
    - **Green**: The Ethernet link is up

=== "9. Network Port Link Speed"

    - **Off**: Link is up at 10/100 base-T negotiated speeds.
    - **Amber**: Link is up and negotiated at 1000 base-T.

=== "10. Expansion Port Status"

    - **Off**: The port is empty or the link is down.
    - **Green**: The port is connected and the link is up. 
