# Teams Phone

## Prepare Network Environment

- Review access to: Microsoft Teams, Intune, Microsoft Entra ID, & Microsoft Common destinations.
    - Open required ports to the required destinations documented in [Teams Android Device - Network Security](https://learn.microsoft.com/en-us/microsoftteams/rooms/security?tabs=Android#network-security)
    - Open your firewall to M365 and Teams as described in [Office 365 URLs and IP address ranges](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges).
- Make sure SIP devices are not behind a proxy.
- Open the UDP port in the range `49152` to `53247` for IP ranges `52.112.0.0/14` and `52.122.0.0/15`.
- Open TCP port `5061` for IP ranges `52.112.0.0/14` and `52.122.0.0/15`.

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/phones/prepare-network-teams-phones)

### Bandwidth

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

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/phones/qos-on-teams-phones#how-much-bandwidth-does-a-microsoft-teams-phone-device-use)

### QoS

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

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/phones/qos-on-teams-phones#quality-of-service-qos-with-microsoft-teams-phones)

## Set up and Configure

### Teams Phones (User Accounts)

#### Buy the licenses

1. In the [M365 admin center](https://admin.microsoft.com), go to **Marketplace**.
2. At the right, select **All products**.
3. Search for **Microsoft Teams Phone** and select either "with Calling Plan" or "with Pay as you go Calling".
4. Select the number of licenses you need and select **Buy**.

#### Assign the licenses to users

1. In the [M365 admin center](https://admin.microsoft.com), go to **Users** > **Active Users**.
2. Select the row of the user that you want to assign a license to.
    - To assign a license to multiple users, select the checkbox next to each user. 
3. In the right pane, select **Licenses and Apps**.
    - If multiple users selected, select **Manage product licenses** at the top. Select **Assign more: Keep the existing licenses and assign more** > **Next**.
4. Expand the **Licenses** section, select the appropriate license(s), and then select **Save changes**.

[*Reference*](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/assign-licenses-to-users?view=o365-worldwide#use-the-active-users-page-to-assign-or-unassign-licenses)

#### Get new phone numbers for your users

1. Sign in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. In the left navigation, go to **Voice** > **Phone numbers**, and then select **Add**.
3. Enter a name for the order and add a description.
4. Fill in the required information on the **Location and quantity** page. The **Number type** should be **User (subscriber)**.
5. Select the numbers you want. You have 10 minutes to select your phone numbers and place your order.
6. When you're ready to place your order, select **Place order**.

!!! info

    The quantity of phone numbers for users is equal to the total number of **Domestic Calling Pan** and **International Calling Plan** licenses you have assigned multiplied by 1.1, plus 10 additional phone numbers. For example, if you have 50 users in total with a Domestic Calling Plan and/or International Calling Plan, you can acquire **65** phone numbers (**50 x 1.1** + **10**). Note that if you have a Pay-As-You-Go Calling Plan, you can only acquire 1 phone number per license assigned.

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/getting-phone-numbers-for-your-users#get-new-phone-numbers-for-your-users)

#### Port or transfer numbers from your current provider

- If you need 999 or fewer numbers for your users, use the porting wizard in the Microsoft Teams admin center. (Outlined below)
- If you need to port more than 999 numbers, you can [manually submit a port order](https://learn.microsoft.com/en-us/microsoftteams/phone-number-calling-plans/manually-submit-port-order).

!!! note

    To port/transfer 999 or fewer phone numbers for your users, upload the completed and signed Letters of Authorization (LOAs) in the Microsoft Teams admin center for further processing.

    - [LOA for the United States (user and service numbers)](https://download.microsoft.com/download/7/3/8/73843692-632f-4078-874d-021f9680e12b/letter-of-authorization-(loa)-for-the-u.s.-(user-and-service-numbers)-(v.3.3)-(en-us).pdf)
    - [LOA for the Unites States (toll free numbers)](https://download.microsoft.com/download/a/b/b/abbd920f-6f52-4e68-869d-591a9e5ae132/LoA_US_TollFreeNumbers_v3.2.pdf)

1. Sign in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. At the left, under **Voice**, select **Phone numbers**. At the right, select **Numbers**, and then select **Port** to start the porting wizard.
3. Review the information on the **Get started** page, and then select **Next**.
4. Fill in the required information on the **Select location and number type** page and then select **Next**.
5. Fill in the required information on the **Add account information** page and then select **Next**.
    - You'll need to have the details of your current service provider (account number, service address, etc.) for this step.
6. On the **Add numbers** page, select **Select a file**, and upload a CSV that contains the numbers you want to transfer.
    - The CSV file must only have one column with a header named **PhoneNumber**. Each number must be on a separate row and be digits only or in the E.164 format (`+1XXXYYYZZZZ`).
7. On the **Complete your order** page, select **Upload a signed Letter of Authorization** to upload a scanned copy of the signed Letter of Authorization (LOA).
8. Review your order details, and then select **Submit**.

Your port order request will be updated daily. If your port order is rejected by the carrier, contact the [TNS Service Desk](https://learn.microsoft.com/en-us/microsoftteams/manage-phone-numbers-for-your-organization/contact-tns-service-desk). To view the status of your port order, got to **Voice** > **Port orders**, and then select **Order history**.

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/phone-number-calling-plans/transfer-phone-numbers-to-teams#create-a-port-order-and-transfer-your-phone-numbers-to-teams)

#### Assign a phone number to a user

1. Sign in to the [Teams Admin center](https://admin.teams.microsoft.com/).
2. At the left, under **Voice**, select **Phone numbers**.
3. On the **Phone numbers** page, select an unassigned number in the list, and then click **Edit**.
4. Under **Assigned to**, search for the user, and then click **Assign**.
5. To assign or change the associated emergency location, under **Emergency location**, search for and then select the location.
6. Turn off or on **Email user with telephone number information**.
7. Click **Save**.

??? tip "You can also use PowerShell"

    ```powershell title="For Calling Plan numbers"
    Set-CsPhoneNumberAssignment -Identity <user> -PhoneNumber <phone number> -PhoneNumberType CallingPlan
    ```

    ```powershell title="For Operator Connect numbers"
    Set-CsPhoneNumberAssignment -Identity <user> -PhoneNumber <phone number> -PhoneNumberType OperatorConnect
    ```

    ```powershell title="For Teams Phone Mobile numbers"
    Set-CsPhoneNumberAssignment -Identity <user> -PhoneNumber <phone number> -PhoneNumberType OperatorConnect
    ```

!!! info

    Because of the latency between M365 and Teams, it can take up to 24 hours for users to be enabled. *Plan acc* If a phone number isn't assigned correctly after 24 hours, see [Phone Number Service Center](https://pstnsd.powerappsportals.com/).

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/assign-change-or-remove-a-phone-number-for-a-user#assign-a-phone-number-to-a-user)

### Common Area Phones (Service Accounts)

#### Buy the licenses

1. In the [M365 admin center](https://admin.microsoft.com), go to **Marketplace**.
2. At the right, select **All products**.
3. Search for **Microsoft Teams Shared Devices** and select **Details**.
4. Enter the number of licenses you need and select **Buy**.

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/phones/set-up-common-area-phones#step-1---buy-the-licenses)

#### Create a new resource account and assign licenses

If you're deploying one device:

1. In the [M365 admin center](https://admin.micrososft.com), go to **Users** > **Active Users** > **Add a user**.
2. Enter a username like `Main` for the first name and `Reception` for the second name.
3. Enter a display name if it doesn't autogenerate one like `Main Reception`.
4. Enter a username like `MainReception` or `Mainlobby`.
5. To set the password, uncheck **Automatically create a password** and **require this user to change their password when they first sign in**.
6. Select the usage location of the device and assign the Teams Shared Devices license to the account. If any other licenses are needed, like Callings Plans, assign them.

!!! note

	You don't need to add a license with Phone System features. It's included with the Teams Shared Devices license.
	
If you're creating and assigning licenses for more than one account at once, use PowerShell:

1. Create a CSV file containing the required user account information.<br>
```text
UserPrincipalName,FirstName,LastName,DisplayName,UsageLocation,MailNickname
MainReception@contoso.onmicrosoft.com,Main,Reception,Main Reception,US,mainreception
FrontGate@contoso.onmicrosoft.com,Front,Gate,Front Gate,US,frontgate
TollFree@contoso.onmicrosoft.com,Toll,Free,Toll Free,US,tollfree
DOTOffice@contoso.onmicrosoft.com,DOT,Office,DOT Office,US,dotoffice
A2Conference@contoso.onmicrosoft.com,A2,Conference,A2 Conference,US,a2conference
```
2. Use a PowerShell script to create the accounts.<br>
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
3. Review the output file to see the results.

!!! info 

	[Android mobile phones](https://learn.microsoft.com/en-us/microsoftteams/phones/common-area-mobile-phones) can be set up as common area phones as well. This is ideal for "frontline workers" in the field.

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/phones/set-up-common-area-phones#step-2---create-a-new-resource-account-and-assign-licenses)

#### Get new phone numbers for your service accounts

Refer back to [the steps above](#get-new-phone-numbers-for-your-users), but make sure you select the appropriate **Number type**. For example, you probably want to select **Auto attendant** for a front desk/main reception phone.

#### Assign a phone number to a service account

Refer back to [the steps above](#assign-a-phone-number-to-a-user)...

### Configure Legacy SIP Phones (SIP Gateway)

Supported legacy SIP phones that are not Teams Certified can be used with Teams by connecting them to Microsoft's SIP Gateway.

!!! note

    The Yealink T46S phone with the minimum firmware version of "83" (assuming they mean 66.83.x.x?) is supported by the SIP Gateway. The "approved" firmware version is 66.86.5.1. Fanvil devices are not on the list of [compatible devices](https://learn.microsoft.com/en-us/microsoftteams/devices/sip-gateway-plan#compatible-devices).

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

For each legacy SIP device, reset to factory defaults and set the following SIP Gateway provisioning server URL:

`http://noam.ipp.sdg.teams.microsoft.com`

Successfully provisioned SIP phones will display the Teams logo and a soft button for sign-in.

#### Sign in and Out

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

### Configure Teams Certified Devices

<https://a.co/d/euavurH>