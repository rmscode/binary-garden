# Microsoft Windows

For information related to Windows Server operating systems, see [Windows Server](../../servers/windows-server/index.md).

## Install Windows 10 & 11 Without Third-Party Apps

1. Start installing Windows 10/11 as usual.
2. On the "Language to install" screen, select either *English (World)* or *English (Europe)* from the **Time and currency format** dropdown.
3. Click **Next** and continue setting up Windows.
4. When you reach to OOBE part, you will likely see an **OOBEREGION** message. Click on **Skip**.
5. After the installation is complete, you can change your locale options under **Settings** > **Time & Language** > **Region** > **Regional format** dropdown.

## Uninstall DevHome

Microsoft started installing this automatically, but most users have no need for it.

1. Open Powershell.
2. Copy and paste the command below into Windows Terminal, and press <kbd>Enter</kbd>.
    1. `Get-AppxPackage -AllUsers -PackageTypeFilter Bundle -Name "*Windows.DevHome*" | Remove-AppxPackage -AllUsers`
3. When finished, you can close the PowerShell Window.

!!! note

    If you encounter issues with the command above, you probably need to make sure the AppX Deployment Service is running. Run services.msc, find and start "AppX Deployment Service (AppXSVC)". A reboot will probably be needed. If that doesn't work, you may need to use the legacy loading mode with the `-UseWinPS` switch. Run `Import-Module Appx -UseWinPS` and then the command above.