# RustDesk Client

!!! note "Not ready yet..."

    Privacy mode seems a bit immature and does not work with multiple monitors. This is a deal breaker for unattended access.

## Quick Start

You can quickly get going with RustDesk by downloading the portable client (exe) from their [GitHub releases page](https://github.com/rustdesk/rustdesk/releases/tag/1.4.0). 

By default, the RustDesk Client is configured for quick support style connections, where you enter the remote computer's ID and a one time passcode to connect. If you need to setup RustDesk for unattended access, set a permanent password via **Settings** (:material-menu:) > **Security** > **Password**.

!!! info "Elevation"

    Portable programs do not have elevated privileges, which can lead to the following issues:

    - The screen will not be transmitted anytime the UAC window appears on the remote computer.
    - When any elevated window, such as the Task Manager, is opened, the mouse becomes unresponsive.

    To avoid these issues, install RustDesk on the remote computer via the MSI installer or the option that is available in the portable client.
