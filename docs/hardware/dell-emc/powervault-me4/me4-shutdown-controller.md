# Shutting Down a Controller Module

Shutting down the controller module in an enclosure ensures that a proper failover sequence is used, which includes *stopping all I/O* operations and writing any data in write cache to disk. Perform a shut down before you remove a controller module from an enclosure, or before you power off an enclosure for maintenance, repair, or a move.

## Using the PowerVault Manager

1. Sign-in to the PowerVault Manager.
2. In the System panel in the banner, click **Restart System**.
3. The Controller Restart and Shut Down panel opens.
4. Select the Shut Down operation, which automatically selects the controller type Storage.
5. Select the controller module to shut down: **A**, **B**, or **both**.
6. Click **OK**. A confirmation panel appears.
7. Click **Yes** to continue; otherwise, click **No**. If you clicked **Yes**, a message describes shutdown activity.

!!! note

    If an iSCSI port is connected to a Microsoft Windows host, the following event is recorded in the Windows event log: Initiator failed to connect to the target.

## Using the CLI

1. Log in to the CLI.
2. In your dual-controller system, verify that the partner controller is online by running the command: `show controllers`
3. Shut down the failed controller—A or B—by running the command: `shutdown a` or `shutdown b`
      - The blue OK to Remove LED ([back of enclosure](me4-overview.md#controller-module-leds)) illuminates to indicate that the controller module can be safely removed.
4.  Illuminate the white Identify LED of the enclosure that contains the controller module to remove by running the command: `set led enclosure 0 on`
      - The Display LED on the Ops panel located on the enclosure left ear will be blinking green when the above command is invoked.