# Teams Phone

https://a.co/d/euavurH

## Prepare Your Environment

### Network

- Review access to: Microsoft Teams, Intune, Microsoft Entra ID, & Microsoft Common destinations.
    - Open required ports to the required destinations documented in [Teams Android Device - Network Security](https://learn.microsoft.com/en-us/microsoftteams/rooms/security?tabs=Android#network-security)
    - Open your firewall to M365 and Teams as described in [Office 365 URLs and IP address ranges](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges).
- Make sure SIP devices are not behind a proxy.
- Open the UDP port in the range `49152` to `53247` for IP ranges `52.112.0.0/14` and `52.122.0.0/15`.
- Open TCP port `5061` for IP ranges `52.112.0.0/14` and `52.122.0.0/15`.

#### Bandwidth

Feature | Standard       | Advanced
------- | -------------- | -----------------------
Audio   | 58kbps up/down | 76kbps up / 76kbps down

If you wish to implement a bandwidth policy on your common area phones, it is recommended to allocate 100kbps to each Teams phone resource account. This implementation can be accomplished by assigning a Teams meeting policy with a media bitrate limit configured. For user signed in devices, the meeting policy assigned to the users account will also apply to the Teams phone device.

1. Sign in to the [Teams admin center](https://admin.teams.microsoft.com/).
2. At the left, under **Meetings**, select **Meeting policies**.
3. Select an existing policy or create a new one.
4. Scroll down to the **Audio & video** section and select your desired values for **Mode for IP audio**, **Mode for IP video**, **Video conferencing**, **Media rate (Kbps)**, and **Participants can use video effects**.
5. Select **Save** when finished.

See [here](https://learn.microsoft.com/en-us/microsoftteams/meeting-policies-audio-and-video#mode-for-ip-audio) for more information on the different modes.

#### QoS

Microsoft Teams Rooms supports Quality of Service (QoS) Differentiated Services Code Point (DSCP) markings to ensure you can manage the media traffic on your corporate network. Microsoft's recommendations are below.

Traffic Type | Configuration
------------ | -------------
Audio        | <ul><li>**Client source port range**: 50,000-50,019</li><li>**Protocol**: TCP/UDP</li><li>**DSCP value**: 46</li><li>**DSCP class**: Expedited Forwarding (EF)</li></ul>
Calling and Meetings Signaling | <ul><li>**Client source port range**: 50,070-50,089</li><li>**Protocol**: UDP</li><li>**DSCP value**: 40</li><li>**DSCP class**: CS5</li></ul>

To configure your tenant to insert QoS markings: 

1. Sign in to the [Teams admin center](https://admin.teams.microsoft.com/).
2. At the left, under **Meetings**, select **Meeting settings**. 
3. Scroll down to the **Network** section and enable **Insert Quality of Service (QoS) markers for real-time media traffic**.

To implement QoS in Teams desktop clients on Windows, use the New-NetQosPolicy command in PowerShell.

``` powershell title="Set QoS for audio"
New-NetQosPolicy -Name "Teams Audio" -AppPathNameMatchCondition "ms-teams.exe" -IPProtocolMatchCondition Both -IPSrcPortStartMatchCondition 50000 -IPSrcPortEndMatchCondition 50019 -DSCPAction 46 -NetworkProfile All
New-NetQosPolicy -Name "Classic Teams Audio" -AppPathNameMatchCondition "Teams.exe" -IPProtocolMatchCondition Both -IPSrcPortStartMatchCondition 50000 -IPSrcPortEndMatchCondition 50019 -DSCPAction 46 -NetworkProfile All
```

``` powershell title="Set QoS for video"
New-NetQosPolicy -Name "Teams Video" -AppPathNameMatchCondition "ms-teams.exe" -IPProtocolMatchCondition Both -IPSrcPortStartMatchCondition 50020 -IPSrcPortEndMatchCondition 50039 -DSCPAction 34 -NetworkProfile All
New-NetQosPolicy -Name "Classic Teams Video" -AppPathNameMatchCondition "Teams.exe" -IPProtocolMatchCondition Both -IPSrcPortStartMatchCondition 50020 -IPSrcPortEndMatchCondition 50039 -DSCPAction 34 -NetworkProfile All
```

``` powershell title="Set QoS for sharing"
New-NetQosPolicy -Name "Teams Sharing" -AppPathNameMatchCondition "ms-teams.exe" -IPProtocolMatchCondition Both -IPSrcPortStartMatchCondition 50040 -IPSrcPortEndMatchCondition 50059 -DSCPAction 18 -NetworkProfile All
New-NetQosPolicy -Name "Classic Teams Sharing" -AppPathNameMatchCondition "Teams.exe" -IPProtocolMatchCondition Both -IPSrcPortStartMatchCondition 50040 -IPSrcPortEndMatchCondition 50059 -DSCPAction 18 -NetworkProfile All
```

``` powershell title="Set QoS for calling and meeting signaling"
New-NetQosPolicy -Name "Teams Calling-Meeting Signaling" -AppPathNameMatchCondition "ms-teams.exe" -IPProtocolMatchCondition UDP -IPSrcPortStartMatchCondition 50070 -IPSrcPortEndMatchCondition 50089 -DSCPAction 40 -NetworkProfile All
New-NetQosPolicy -Name "Classic Teams Calling-Meeting Signaling" -AppPathNameMatchCondition "Teams.exe" -IPProtocolMatchCondition UDP -IPSrcPortStartMatchCondition 50070 -IPSrcPortEndMatchCondition 50089 -DSCPAction 40 -NetworkProfile All
```

See [here](https://learn.microsoft.com/en-us/microsoftteams/qos-in-teams-clients) for additional methods of implementation including InTune and Group Policy.

## Set up and Configure

### Common Area Phones

#### Buy the licenses

1. In the [M365 admin center](https://admin.microsoft.com), go to **Marketplace**.
2. At the right, select **All products**.
3. Search for **Microsoft Teams Shared Devices** and select **Details**.
4. Enter the number of licenses you need and select **Buy**.

#### Create a new resource account and assign licenses

If you're deploying one device:

1. In the [M365 admin center](https://admin.micrososft.com), go to **Users** > **Active Suers** > **Add a user**.
2. Enter a username like `Main` for the first name and `Reception` for the second name.
3. Enter a display name if it doesn't autogenerate one like `Main Reception`.
4. Enter a username like `MainReception` or `Mainlobby`.
5. To set the password, uncheck **Automatically create a password** and **require this user to change their password when they first sign in**.
6. Select the usage location of the device and assign the Teams Shared Devices license to the account. If any other licenses are needed, like Callings Plans, assign them.

!!! note

	You don't need to add a license with Phone System features. It's included with the Teams Shared Devices license.
	
If you're creating and assigning licenses for more than one user account at once, use PowerShell:

1. Create a CSV file containing the required user account information.

```text
UserPrincipalName,FirstName,LastName,DisplayName,UsageLocation,MailNickname
MainReception@contoso.onmicrosoft.com,Main,Reception,Main Reception,US,mainreception
FrontGate@contoso.onmicrosoft.com,Front,Gate,Front Gate,US,frontgate
TollFree@contoso.onmicrosoft.com,Toll,Free,Toll Free,US,tollfree
DOTOffice@contoso.onmicrosoft.com,DOT,Office,DOT Office,US,dotoffice
```

2. Use a PowerShell script to create the accounts.

```powershell
# Import the CSV file
$users = Import-Csv -Path "C:\temp\NewAccounts.csv"

# Create a password profile
$PasswordProfile = @{
    Password = 'Password123'
    }

# Loop through each user in the CSV file
foreach ($user in $users) {
    # Create a new user
    $newUser = New-MgUser -DisplayName $user.DisplayName -GivenName $user.FirstName -Surname $user.LastName -UserPrincipalName $user.UserPrincipalName -UsageLocation $user.UsageLocation -MailNickname $user.MailNickname -PasswordProfile $passwordProfile -AccountEnabled

# Assign a license to the new user
	$teamsSharedDevicesSku = Get-MgSubscribedSku -All | Where SkuPartNumber -eq 'MCOCAP'
	Set-MgUserLicense -UserId $newUser.Id -AddLicenses @{SkuId = $teamsSharedDevicesSku.SkuId} -RemoveLicenses @()

}

# Export the results to a CSV file
$users | Export-Csv -Path "C:\temp\NewAccountResults.csv" -NoTypeInformation
```

New-MgUser -AccountEnabled $true -DisplayName "Main Reception" -MailNickname "mainreception" -UserPrincipalName "mainreception@yourdomain.com" -PasswordProfile @{ Password = "YourSecurePassword123"; ForceChangePasswordNextSignIn = $false }

3. Review the output file to see the results.

!!! info 

	https://learn.microsoft.com/en-us/microsoftteams/phones/common-area-mobile-phones can be set up as common area phones as well. This is ideal for "frontline workers" in the field.
	
### Teams Phones (SIP Gateway)

Allows compatible legacy SIP devices to make and receive calls using Microsoft Teams.

#### Buy the licenses

1. In the [M365 admin center](https://admin.microsoft.com), go to **Marketplace**.
2. At the right, select **All products**.
3. Search for **Microsoft Teams Phone** and select either "with Calling Plan" or "with Pay as you go Calling".
4. Select the number of licenses you need and select **Buy**.

#### Assign the licenses to users

1. In the [M365 admin center](https://admin.microsoft.com), go to **Users** > **Active Users**.

#### Verify that SIP Gateway is Available

1. Sign in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. Select **Teams devices** from the left and see if the **SIP devices** tab is available.

#### Enable SIP Gateway for Users

1. Login to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. At the left, under **Voice**, select **Calling policies**.
3. At the right under **Manage policies**, select the appropriate policy assigned to users or, if necessary, create a new policy and assign it to the required users.
4. Select **Manage policies**, select a policy, and then select **Edit**.
5. Turn on the setting for **SIP devices can be used for calls**, and then select **Save**.

!!! tip "You can also use PowerShell"

    ```powershell
    Set-CsTeamsCallingPolicy -Identity Global -AllowSIPDevicesCalling $true
    ```

#### Set the SIP Gateway Provisioning Server URL

For each SIP device, reset to factory defaults and set the following SIP Gateway provisioning server URL:

`http://noam.ipp.sdg.teams.microsoft.com`

Successfully provisioned SIP phones will display the Teams logo and a soft button for sign-in.

#### Sign in and Out

Only local sign-in is supported for users' personal devices.

User Pairing and Sign in:

1. Press **Sign-in** on the SIP phone to display the [authentication URL](https://portal.sdg.teams.microsoft.com/) and pairing code. The pairing code is time-sensitive.
2. Open the [authentication URL](https://portal.sdg.teams.microsoft.com/) in a web browser, use corporate credentials to log in and enter the pairing code.

!!! info "Sign-in may take a while. The phone will display the phone number and username, if the device supports it."

Sign out:

- Press **Sign-out** on the SIP device and follow the steps described on the device.

Sign out a device via the Teams Admin center:

1. Log in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. Select **Teams devices** > **SIP devices**, select the device.
3. On the device's **Details pane**, select the **Details** tab, and at the upper right on the **Actions** menu, select **Sign out**.