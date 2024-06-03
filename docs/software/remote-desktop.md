# Remote Desktop

## Issues

### Black Screen of Death

Immediately after logging in, the remote sceen turns black. This appears to be caused by screen caching and accessing a system with different a display resolution or RDP window size. If this happens to you, try the following:

- While logged in and stuck on the black screen, press `Ctrl` + `Alt` + `Escape`. This calls the Task Manager and in most cases you'll immediately see the desktop.
    - If only the Task Manager appears and not the desktop, click on **File** > **Run new task** > and type `explorer.exe` to restart the Windows Explorer.
- Try connecting to the remote system at a different resolution.
- Restart the remote system. This requires you to travel to the physical location of the system or have someone there restart it for you, of course.
- Update the display drivers on both the connecting and remote systems.
- Start a new RDP client on your desktop but BEFORE you click CONNECT, click SHOW OPTIONS > DISPLAY tab and set the DISPLAY CONFIGURATION to a low resolution like 640×480.

#### Prevention

- Disable bitmap caching for your RDP connections.
- Access the remote computer using consistent resolution – Full screen may help
- Confirm both systems' video drivers are up to date