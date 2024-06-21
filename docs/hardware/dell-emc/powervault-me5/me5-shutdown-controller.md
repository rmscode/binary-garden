---
status: new
---

# Shutting/Restarting Down a Controller Module

Shutting down the controller module in an enclosure ensures that a proper failover sequence is used, which includes *stopping all I/O* operations and writing any data in write cache to disk. Perform a shut down before you remove a controller module from an enclosure, or before you power off an enclosure for maintenance, repair, or a move.

## Using the PowerVault Manager

1. Sign-in to the PowerVault Manager.
2. Go to **Maintenance > Hardware**.
3. Under **Enclosure > Actions** select **Restart/Shutdown System**.
            The Controller Restart and Shut Down panel opens.
4. Select the Shut Down operation.
5. Select the controller module to shut down: **A**, **B**, or **both**.
6. Click **Apply**. A confirmation panel appears.
7. Click **Yes** to continue; otherwise, click **No**. If you clicked **Yes**, a message describes shutdown activity.

!!! note

    If an iSCSI port is connected to a Microsoft Windows host, the following event is recorded in the Windows event log: Initiator failed to connect to the target.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_om/shutting-down-a-controller-module?guid=guid-3f60a81c-6510-4df3-8709-c5b0e4e48025&lang=en-us)

## Using the CLI

!!! warning "Errata"

      There is an error in the Dell documentation. The Owner's manual instructions for shutting down the controllers, as written below, states that the "OK to Remove LED" is white and that the "ID LED" is blue. However, in the same manual, it states the opposite in the [controller module LEDs section](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_om/12-gbs-controller-module-leds?guid=guid-7d24eec0-6fd1-41e2-b2ae-989f7b9ec1b7&lang=en-us). **We have not yet confirmed which is true as of writing this (6/20/24)**.

1. Log in to the CLI.
2. In your dual-controller system, verify that the partner controller is online by running the command: `show controllers`
3. Shut down the failed controller A or B by running the command: `shutdown a` or `shutdown b`
      - The blue OK to Remove LED [back of enclosure](me5-overview.md#controller-module-leds) illuminates to indicate that the controller module can be safely removed.
4.  Illuminate the white Identify LED of the enclosure that contains the controller module to remove by running the command: `set led enclosure 0 on`
      - The Display LED on the Ops panel located on the enclosure left ear will be blinking green when the above command is invoked.
