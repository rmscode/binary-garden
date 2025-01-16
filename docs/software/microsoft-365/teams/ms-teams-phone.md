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

!!! tip "You can also use PowerShell"

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

!!! note "Common Issues with SIP devices"

    <https://learn.microsoft.com/en-us/microsoftteams/troubleshoot/phone-system/sip-gateway-issues>

#### Bulk Sign in for Common Area Phones

<https://learn.microsoft.com/en-us/microsoftteams/devices/sip-gateway-configure#bulk-sign-in-prerequisites>

### Configure Teams Certified Devices

We don't have any, but the [Yealink MP45](https://a.co/d/euavurH) seems to be a decent option should we ever decide to buy some.

## Auto Attendants and Call Queues

### Prerequisites

- A [Resource Account](#create-a-new-resource-account-and-assign-licenses) for each Auto attendant or Call queue. 
- Free Teams Phone [Resource Account licenses](https://learn.microsoft.com/en-us/microsoftteams/teams-add-on-licensing/virtual-user#how-to-obtain-microsoft-teams-phone-resource-account-licenses) for said Resource Accounts.
- For external phone calls:
    - At least one Microsoft service number, Operator Connect number, Direct Routing number, or a hybrid number for each resource account.
- For web click-to-call:
    - [Contact centers with Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/tutorials/contact-center)
    - [Quickstart: Join your calling app to a Teams auto attendant](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-auto-attendant)
    - [Quickstart: Join your calling app to a Teams call queue](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/voice-video-calling/get-started-teams-call-queue)

Theres a bunch more to read in [Microsoft's docs](https://learn.microsoft.com/en-us/microsoftteams/plan-auto-attendant-call-queue) . . . 

### Auto Attendants

[Teams Admin Center](https://admin.teams.microsoft.com/) > Expand **Voice** > Select **Auto attendants** > Select **Add**

=== "Step 1:<br>General Info"

    1. Type a name for the Auto attendant.
    2. Specify an operator to allow callers to break out of the menu and speak to a designated person. This designation is optional, but recommended.
    3. Specify the timezone.
    4. Specify the language.
    5. Choose if you want to enable voice inputs. 
    6. Select **Next**

=== "Step 2:<br>Call Flow"

    1. Set a greeting.
    2. Route the call:
        - If you select **Disconnect**, the Auto attendant hangs up.
        - If you select **Redirect call**, you can choose a call routing destination.
        - If you select **Play menu options**, you can create a menu with dialing options.<br>
        !!! note "If you assign dial keys to destinations, choose **None** for Directory search. Dial keys are matched before directory searches are performed. Create a separate Auto attendant for directory search and have your main Auto attendant link to it with a dial key instead instead."
    3. Select **Next**.
    4. Set up call flows for after hours and holidays.
    5. Select **Next**.

=== "Step 3:<br>Dial Scope (Optional)"

    1. Define which users are available in the directory when a caller uses dial-by-name or dial-by-extension.
    2. Select **Next**.

=== "Step 4:<br>Assign Resource Accounts"

    1. Assign a Resource account to this Auto attendant.
        - You can create a new Resource account from this page, but you'll need to add a number and assign a license to it later.
        - Nested Auto attendants and Call queues that receive calls from an auto attendant or call queue that has already answered the call don't require a resource account.
    2. Select **Next**.

=== "Step 5:<br>Authorized Users"

    1. Select the people from you organization that are allowed to make changes to this Auto attendant.
        - A user must have a policy assigned that enables at least on type of config change and must also be assigned as an authorized user to at least one Auto attendant/Call queue.
    2. Select **Submit**.

[TEST TEAMS AUTO ATTENDANT](https://aka.ms/TeamsAADiag){ .md-button }

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/create-a-phone-system-auto-attendant)

### Call Queues

[Teams Admin Center](https://admin.teams.microsoft.com/) > Expand **Voice** > Select **Call queues** > Select **Add**

=== "Step 1:<br>General Info"

    1. Type a name for the Call queue.
    2. Add an existing Resource account.
        - You can assign several Resource accounts to a call queue.
        - Nested Auto attendants and Call queues that receive calls from an auto attendant or call queue that has already answered the call don't require a resource account.
    3. Assign outbound caller ID numbers for the agents. Agents will be able to select which number to use with each outbound call.
    4. Service level measures the efficiency and responsiveness to incoming calls. Optional.
    5. Set the language for transcription. 
    6. Select **Next**

=== "Step 2:<br>Greeting & Music"

    Nothing special to note here. Just add your greeting music/message.

=== "Step 3:<br>Call Answering"

    1. Add agents via a Team or users and groups
        - You can add up to 200 agents via a Teams channel. You must be a member of the team or the creator or owner of the channel to add a channel to the queue.
        - You can add up to 20 agents individually and up to 200 agents via groups.
    2. Conference mode on or off.
        - Reduces the amount of time it takes for a caller to be connected to an agent after the agent accepts the call. When it is off, a traditional transfer is used.
    3. Select **Next**.

    !!! info

        - Conference mode isn't supported for calls that are routed from a Direct Routing gateway that enabled for location based routing.
        - Conference mode is required is Teams users need to consult/transfer calls.
        - Transfer mode (Conference mode off) is scheduled to be removed by June 2025.

=== "Step 4:<br>Agent Selection"

    1. Select routing method:
        - Attended: The first call will ring all agents at the same time until one of them picks up.
        - Serial: Incoming calls will ring agents one by one, starting from the beginning of the list.
        - Round robin: Each agent will get the same number of calls from the queue.
        - Longest idle: The next call in the queue will ring the opted-in agent that has been in presence state "Available" for the longest time.
    2. Presence-based routing:
        - When turned off, agents who have opted in will receive calls, regardless of their presence state.
        - When turned on, agents must be in the presence state "Available" to receive calls.
    3. Allow/Disallow agents to opt out of taking calls.
    4. Set the agent alert time (Amount of time agent's phone rings).
    5. Select **Next**.

    !!! info

        If Presence-based routing isn't enabled and there are multiple calls in the queue, the system presents these calls simultaneously to the agents, regardless of their presence status. This action results in multiple call notifications to agents, particularly if some agents don't answer the initial call presented to them. 
        
        When using Presence-based routing, there may be times when an agent receives a call from the queue shortly after becoming unavailable or a short delay in receiving a call from the queue after becoming available.

        Microsoft recommends allowing agents to opt out. They do not explain what happens if you disallow it. I guess the phone just keeps ringing.

=== "Step 5:<br>Callback"

    1. Allow users to request an automated callback.
    2. Set the eligibility conditions.
    3. Select **Next**.

=== "Step 6:<br>Exception Handling"

    Exception handling determines how calls are handled when certain exceptions occur.
    
    Each exception allows you to disconnect the call or redirect it to any of the call routing destinations.

    !!! info

        The No Agents handling exception occurs under the following conditions:

        - Presence based routing off: No agents are opted into the queue.
        - Presence based routing on: No agents logged in, or all agents are in Appear Offline.

        Known issues:

        1. When Longest idle is selected as the routing method, the No Agents treatment will not work when New Calls Only is selected and new calls will be queued. The All Calls option works as expected. Support is investigating.
        2. Don't include any special characters in the greeting message when redirecting to Voicemail (shared) as these will not be spoken by the system.

=== "Step 7:<br>Authorized Users"

    1. Select the people from you organization that are allowed to make changes to this Call queue.
        - A user must have a policy assigned that enables at least on type of config change and must also be assigned as an authorized user to at least one Auto attendant/Call queue.
    2. Select **Submit**.

[TEST TEAMS CALL QUEUE](https://aka.ms/TeamsCallQueueDiag){ .md-button }

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/create-a-phone-system-call-queue)

## Caller ID

The default outbound caller ID is the number assigned to the user. To set a substitute number, create a custom caller ID policy:

1. In the left navigation of the Microsoft Teams admin center, go to **Voice** > **Caller ID policies**.
2. Select **Add**.
3. Enter a name and description for the policy.
4. Turn on or off **Block incoming caller ID** and O**verride the caller ID policy**.
5. Enter a **Calling Party Name**.
6. Under **Replace the caller ID with**, set which caller ID is displayed for users by selecting one of the following:
    - **User's number**: Display the user's number.
    - **Anonymous**: Display the caller ID as Anonymous.
    - **Resource account**: Set a resource account associated with an Auto Attendant or Call Queue.
7. Select **Save**.

!!! tip "You can also use PowerShell"

    ```powershell title="Create new policy that sets caller ID to phone number of resource account"
    $ObjId = (Get-CsOnlineApplicationInstance -Identity dkcq@contoso.com).ObjectId
    New-CsCallingLineIdentity -Identity DKCQ -CallingIDSubstitute Resource -EnableUserOverride $false -ResourceAccount $ObjId -CompanyName "Contoso"
    ```

    ```powershell title="Create new policy that sets caller ID to Anonymous"
    New-CsCallingLineIdentity -Identity Anonymous -Description "anonymous policy" -CallingIDSubstitute Anonymous -EnableUserOverride $false
    ```

    ```powershell title="Remove a caller ID policy"
    Remove-CsCallingLineIdentity -Identity "UKAA"
    ```

    ```powershell title="Grant a caller ID policy"
    Grant-CsCallingLineIdentity -Identity "amos.marble@contoso.com" -PolicyName "Anonymous"
    ```

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/caller-id-policies)

## Call Forwarding and Delegation

1. In the Teams admin center, got o **Users** > **Manage users** and select a user.
2. Go to the **Voice** tab.
3. To configure immediate call forward settings, under **Call answering rules**, select:
    - **Be immediately forwarded** so that calls to the user don't ring their devices.
    - **Ring the user's devices** to use simultaneous ringing and tin the user's device first.
4. Configure unanswered settings in the **If unanswered** drop-down.
5. Select **Save**.

!!! info

    The configuration of call delegation/group call pickup is integrated into the call forwarding settings by selecting the appropriate type in the **Also allow** drop-down.

[TEST TEAMS CALL FORWARDING](https://aka.ms/TeamsCallForwardingDiag){ .md-button }

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/user-call-settings)

## Shared Line Appearance

Lets a user choose a delegate to answer or handle calls on their behalf. This is helpful if a user has an administrative assistant who regularly handles the user's calls.

1. In the navigation menu of the Microsoft Teams admin center, select **Voice** > **Calling policies**.
2. Choose the policy to update or select **Add** to create a new one.
3. Toggle **Delegation for inbound and outbound calls** on.
4. Select **Save**.

[*Reference*](https://learn.microsoft.com/en-us/microsoftteams/shared-line-appearance)