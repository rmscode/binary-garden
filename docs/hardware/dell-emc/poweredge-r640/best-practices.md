# Dell PowerEdge R640 Best Practices

Quick and dirty collection of best practices/tips as recommended by Dell and other sources online...

- Disable unused integrated devices (User accesible USB, iDRAC direct USB port, serial, etc)
- Set up LifeCycle controller.
        - Remote OS deployment
        - Remote firmware updates
        - Remote BIOS config
        - Hardware diagnostics
        - Ability to automatically download drivers and firmware to perform updates. (Dell or local repository)
- BIOS settings for max performance:
        - Disable CE1
        - Disable C States
        - Uncore feq to max
        - Disable CPU interconnect bus link power management
        - Disable PCI ASPM L1 Link Power Management



![Diag flowchart](https://dl.dell.com/content/guides/public/Html/14g_tsg_pub/images/GUID-8928754A-007D-450C-86AE-1E4415AD4D4D-low.png)