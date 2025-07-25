# Microsoft Windows

## Windows 10

### Add Safe Mode as a Boot Option

1. Open an elevated Command Prompt.
2. Paste the following command and press <kbd>Enter</kbd>:
    ```cmd
    bcdedit /copy {Current} /d “Windows 10 Safe Mode”
    ```
3. Close the Command Prompt.
4. Press <kbd>Windows</kbd> + <kbd>R</kbd>, type `msconfig`, and press <kbd>Enter</kbd> to open the System Configuration window.
5. Click on the **Boot** tab to confirm the option has been added.

### Delete a file that is open in Windows Explorer

I was once met with "The action can’t be completed because the file is open in Windows Explorer" when trying to delete what I thought was an empty folder in Windows 10. It turns out that there was a `Thumbs.db` file preventing me from deleting said folder.

1. In File Explorer, navigate to the folder of the pesky file.
2. View > Layout > Change from **Details** to **List** 
3. Try deleting the folder.

!!! note

    I did have to try a few times before it worked. There was another solution on the same page linked above that suggested switching the view to "Content", renaming the `Thumbs.db` file, and then deleting the folder. I tested that and it worked as well.

## Windows 11

### Internet/Microsoft Account Bypass

Microsoft will be removing a [popular method](https://www.neowin.net/news/kb5053658-microsoft-wants-to-remove-windows-11-bypassnro-bypass-for-internet-msa/) of bypassing the Microsoft Account requirement during Windows 11 installation. However, a savvy user found [another way](https://github.com/the-P1neapple/WinJS-Microsoft-Account-Bypass).

1. Start Windows 11 Setup
    - Begin the Windows 11 Setup Process.
    - Select your region and keyboard layout.
2. Stop at the Secondary Keyboard Layout Screen
    - When you reach the **Secondary Keyboard Layout** screen, **do not click Skip**.
    - If you accidentally skipped and reached the Network Setup Screen, don't stress. I have a guide in the troubleshooting section.
3. Open the Developer Console
    - Press **Ctrl + Shift + J** to open the Developer Console.
    - Your screen will go dark and will appear with a prompt (indicated by a `>` symbol) at the top left of the screen.
    > **Note:** If you can't open the console, troubleshooting steps are below.
4. Enter the Restart Command
- Type the following command exactly as shown (case-sensitive):<br>
    ```javascript
    WinJS.Application.restart("ms-cxh://LOCALONLY")
    ```
5. Exit the Developer Console
    - After entering the command, press **Enter** to execute it.
    - Press **Escape** to exit the Developer Console and return to the OOBE interface.
6. Local Account Setup
    - The Secondary Keyboard Layout screen will refresh, and a **Windows 10-style local account setup screen** will appear.
    - Enter your desired **username**, **password**, and **security questions** and click **Next**.
7. Complete the Setup
    - The Setup will go black and will then log you in to your newly created account. Allow Windows 11 a few moments to configure the user.
    - Continue with the remaining privacy setting prompts.
    - Once finished, you will have successfully created a **local account** in Windows 11.

## Windows 10 & 11 Agnostic

### Install Windows 10 & 11 Without Third-Party Apps

1. Start installing Windows 10/11 as usual.
2. On the "Language to install" screen, select either *English (World)* or *English (Europe)* from the **Time and currency format** dropdown.
3. Click **Next** and continue setting up Windows.
4. When you reach the OOBE screen, you will likely see the message "Something went wrong". Click on **Skip**.
5. After the installation is complete, you can change your locale options under **Settings** > **Time & Language** > **Region** > **Regional format** dropdown.

### Uninstall DevHome

Microsoft started installing this automatically, but most users have no need for it.

1. Open Powershell.
2. Copy and paste the command below into Windows Terminal, and press <kbd>Enter</kbd>.
    1. `Get-AppxPackage -AllUsers -PackageTypeFilter Bundle -Name "*Windows.DevHome*" | Remove-AppxPackage -AllUsers`
3. When finished, you can close the PowerShell Window.

!!! note

    If you encounter issues with the command above, you probably need to make sure the AppX Deployment Service is running. Run services.msc, find and start "AppX Deployment Service (AppXSVC)". A reboot will probably be needed. If that doesn't work, you may need to use the legacy loading mode with the `-UseWinPS` switch. Run `Import-Module Appx -UseWinPS` and then the command above.

    [*Reference*](https://superuser.com/questions/1456837/powershell-get-appxpackage-not-working)

### Enable High Performance Power Plan

On certain laptops, sometimes the high performance power plan is not available. To enable, run the following command in the command prompt:

```cmd
powercfg /s SCHEME_MIN
```

This definitely works for Windows 10, but should work for Windows 11 as well.

### Fix Open Windows Moving to Main Monitor After Locking/Unlocking Computer

After replacing my monitors at work, all open windows would move to the main monitor after locking/unlocking the computer. Remove unused monitors from the display settings to fix this issue.

1. Open Display Manager as Administrator
2. Click on **View** > **Show Hidden Devices**
3. Expand **Monitors** and right-click to **Uninstall device** for every dimmed/grayed out monitor in the list.

[*Reference*](https://trycatch.dev/2020/09/05/fixing-windows-moving-and-resizing-your-windows-after-sleep)

### Display Current Power Requests

The command `powercfg /requests` is used to display the current power requests that are preventing the system from entering a lower power state, such as sleep or hibernation. It shows active requests made by applications, services, or devices that keep the computer awake. These power requests can also prevent the display from going into standby mode and certain apps from properly detecting a user's presence (away status).

!!! note

    I had issues with my personal computer not turning off the displays and locking after being away from my desk. I also noticed that social apps like Discord or Steam weren't automatically updating my status to *Away*. A few seconds of searching the web lead me to find this command. For me, it was the new RSI launcher (Star Citizen). Going to the launcher settings and disabling "background video" fixed the issue for me. Wasteful piece of eye candy that is. I thought the launcher menu's background animation was a gif or something, not a full blown video on repeat.
