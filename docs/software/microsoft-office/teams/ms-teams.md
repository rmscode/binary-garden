# Microsoft Teams

## Register Missing Meeting Add-in

Resolve missing "New Items > Teams Meeting" in Outlook. This appears to happen after installing the "new" Teams app.

1. Close Outlook
2. Open "Installed Apps" (Win11) or "Apps & Features" (Win10) in Settings and search for "Teams"
3. Uninstall the classic version (if installed)
      - Note: The "new" version should be called "Microsoft Teams (work or school)". Don't remove that.
4. Repair the "Microsoft Teams Meeting Add-in" by clicking it and then Modify
      - Note: If it complains that the add-in installer doesn't exist, reinstall Teams from the Microsoft website.
5. Run Outlook
6. Open the COM add-ins window in Outlook (File > Options > Add-ins > Go)
7. Check the box for "TeamsAddin.FastConnect"
      - Note: If the box was already checked: uncheck it, click Ok, open add-ins again, check the box, and click Ok.
8. "Teams Meeting" should now be listed under the "New Items" menu.
Note: It takes a 5-10 seconds for the meeting code to be generated.

## Teams Phone

### SIP Gateway

Allows compatible legacy SIP devices to make and receive calls using Microsoft Teams.

**Prerequisites**:

- Open your firewall to M365 and Teams as described in [Office 365 URLs and IP address ranges](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges).
- Make sure the SIP devices are not behind a proxy.
- Open the UDP port in the range `49152` to `53247` for IP ranges `52.112.0.0/14` and `52.122.0.0/15`.
- Open TCP port `5061` for IP ranges `52.112.0.0/14` and `52.122.0.0/15`.

#### Verify that SIP Gateway is Available

1. Sign in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. Select **Teams devices** from the left and see if the **SIP devices** tab is available.

#### Enable SIP Gateway for Users

1. Login to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. At the left, under **Voice**, select **Calling policies**.
3. At the right under **Manage policies**, select the appropriate policy assigned to users or, if necessary, create a new policy and assign it to the required users.
4. Select **Manage policies**, select a policy, and then select **Edit**.
5. Turn on the setting for **SIP devices can be used for calls**, and then select **Save**.

!!! tip "You can also use PowerShell

    ```powershell
    Set-CsTeamsCallingPolicy -Identity Global -AllowSIPDevicesCalling $true
    ```

#### Set the SIP Gateway Provisioning Server URL

For each SIP device, reset to factory defaults and set the following SIP Gateway provisioning server URL:

`http://noam.ipp.sdg.teams.microsoft.com`

Successfully provisioned SIP phones will display the Teams logo and a soft button for sign-in.

#### Sign in and Out

Only local sign-in is supported for users' personal devices.

User Pairing and Sign-in:

1. Press **Sign-in** on the SIP phone to display the [authentication URL](https://portal.sdg.teams.microsoft.com/) and pairing code. The pairing code is time-sensitive.
2. Open the [authentication URL](https://portal.sdg.teams.microsoft.com/) in a web browser, use corporate credentials to log in and enter the pairing code.

!!! info "Sign-in may take a while. The phone will display the phone number and username, if the device supports it."

Sign-out:

- Press **Sign-out** on the SIP device and follow the steps described on the device.

Sign-out a device via the Teams Admin center:

1. Log in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. Select **Teams devices** > **SIP devices**, select the device.
3. On the device's **Details pane**, select the **Details** tab, and at the upper right on the **Actions** menu, select **Sign out**.

## Tips and Tricks

### Quickly edit last message

If you need to edit a message you recently sent on Teams and not one has replied to it yet, you can press the up arrow key to edit your last message!