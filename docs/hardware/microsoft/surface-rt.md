# Microsoft Surface RT (Gen 1 2012)

## Dock (Gen 1)

### Firmware Update

1. Ensure that the Surface is connected to the dock.
2. Go to [Surface Tools for IT](https://go.microsoft.com/fwlink/?linkid=2147546)
3. Click **Download** and select the correct version for your Surface (AMD64 or ARM64). The file will begin with `Surface_Dock_FWUpdate_`.
      - If you're running Surface Pro X, download the arm64 build. For all others, use the amd64 build. 
4. Run the firmware updater MSI.
5. Disconnect your Surface from the Dock, wait ~5 seconds, and then reconnect. The Dock updates silently in the background. The process can take a few minutes to complete and continues even if interrupted.

!!! tip "Monitor the Surface Dock firmware update

    1. Open Event Viewer, browse to **Windows Logs** > **Application**, and then under Actions in the right-hand pane click **Filter Current Log**, enter **SurfaceDockFwUpdate** next to Event sources, and then click **OK**.
    2. Type the following into an elevated command prompt:

    ```ps
    Reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\WUDF\Services\SurfaceDockFwUpdate\Parameters"
    ```

    Event 2007 with the following text indicates a successful update: `Firmware update finished. hr=0 DriverTelementry EventCode = 2007`.

## Issues

### Surface Dock (Gen 1) Ethernet

To resolve issues with Ethernet connectivity, try the following:

- Reboot the Surface
- Power cycle the dock
- Ensure that the ethernet dock setting is enabled in Surface bios
- Disconnect everything from the dock, reconnect the Surface, confirm an ethernet is working, connect everything else
- Reinstall/[Update the dock's firmware](#firmware-update) (This is what worked when I had this issue)
