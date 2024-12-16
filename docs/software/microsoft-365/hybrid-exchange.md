# Exchange Hybrid Deployment

## Pre-check

- [ ] Latest CU or RU thats available for the version of Exchange that you are running. The immediately previous release is also supported.
- [x] At least one mailbox server.
- [ ] **Custom domains**: Register any custom domains you want to use in your hybrid deployment with M365. You can do this by using the M365 portal, or by optionally configuring Active Directory Federation Services (AD FS) in your on-prem organization.
- [x] AD synchronization.
- [ ] **Autodiscover DNS records**: Configure the Autodiscover record for your existing SMTP domains in you public DNS to point to your on-prem Exchange servers
- [ ] **Certificates**: Assign Exchange services to a valid digital certificate that you purchased from a trusted public certificate authority (CA). Although you should use self-signed certificates for the on-premises federation trust with the Microsoft Federation Gateway, you can't use self-signed certificates for Exchange services in a hybrid deployment.
    - The IIS instance on the Exchange servers that are configured in the hybrid deployment require a valid certificate purchased from a CA
    - The EWS external URL and the Autodiscover endpoint that you specified in your public DNS must be listed in the Subject Alternative Name (SAN) field of the certificate. The certificates that you install on the Exchange servers for mail flow in the hybrid deployment must all be issued by the same certificate authority and have the same subject. 
    - More info [here](https://learn.microsoft.com/en-us/exchange/certificate-requirements).
- [x] **.NET Framework**: Verify the versions that can be used with your specific version of Exchange (Ex2019 CU14 supports 4.8.1 & 4.8).
- [ ] Enable [MRS Proxy](https://learn.microsoft.com/en-us/exchange/enable-the-mrs-proxy-endpoint-for-remote-moves-exchange-2013-help).
    - The HCW will enable MRS proxy for you, but completing this step before running the HCW ensures the IIS cache has time to clear before HCW validates the endpoint.
- [ ] **Protocols, Ports, and Endpoints**: You need to configure the following protocols, ports, and connection endpoints in the firewall that protects your on-prem organization.

!!! info "Important"

    365 endpoints are vast and ever changing. See the sections *Exchange Online* and *Microsoft 365 Common and Office Online* in [Microsoft 365 and Office 365 URLs and IP address ranges](https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges) to identify the endpoints for each port listed here.

Source                     | Protocol/Port     | Target                     | Comments
---------------------------|-------------------|----------------------------|---------
Exchange Online Endpoints  | TCP/25 (SMTP/TLS) | Exchange 2019 Mailbox/Edge | On-premises Exchange Servers configured to host receive connectors for secure mail transport with Exchange Online in the Hybrid Configuration wizard
Exchange 2019 Mailbox/Edge | TCP/25 (SMTP/TLS) | Exchange Online endpoints  | On-premises Exchange Servers configured to host send connectors for secure mail transport with Exchange Online in the Hybrid Configuration wizard
Exchange Online endpoints  | TCP/443 (HTTPS)   | Exchange 2019 Mailbox      | On-premises Exchange Servers used to publish Exchange Web Services and Autodiscover to Internet
Exchange 2019 Mailbox      | TCP/443 (HTTPS)   | Exchange Online endpoints  | On-premises Exchange Servers used to publish Exchange Web Services and Autodiscover to Internet
Exchange 2019 Mailbox/Edge | 80                | ctldl.windowsupdate.com/*  | For hybrid functionality, Exchange Servers needs outbound connectivity to various Certificate Revocation List (CRL) endpoints mentioned [here](https://learn.microsoft.com/en-us/azure/security/fundamentals/azure-ca-details). Microsoft strongly recommends letting Windows maintain the Certificate Trust List (CTL) on your machine. Otherwise, this must be maintained manually on a regular basis. To allow Windows to maintain the CTL, the URL must be reachable from the computer on which Exchange Server is installed.

[*Reference*](https://learn.microsoft.com/en-us/exchange/hybrid-deployment-prerequisites)

### Useful Tools and Services

The [Mail Migration Advisor](https://learn.microsoft.com/en-us/exchange/mail-migration-jump) will recommend the best migration path for your organization based on your current mail system.

The [Exchange Server Deployment Assistant](https://setup.cloud.microsoft/exchange/deployment-assistant) will create a customized checklist with instructions to configure your hybrid deployment.

The [Remote Connectivity Analyzer](https://testconnectivity.microsoft.com/) is useful for testing the external connectivity of your on-prem Exchange org prior to running the HCW.

## Hybrid Configuration Wizard

There are far better guides that already exist for walking you through the HCW. Here are a few:

- [Ali Tajran: Run the Hybrid Configuration Wizard (Modern Hybrid Deployment)](https://www.alitajran.com/hybrid-configuration-wizard/#h-run-hybrid-configuration-wizard)
    - He has a great [collection of Exchange Hybrid articles](https://www.alitajran.com/exchange-hybrid/).
- [Office 365 Concepts: Hybrid Configuration Wizard Step by Step (Classic Hybrid Deployment)](https://office365concepts.com/hybrid-configuration-wizard-step-by-step/#run-hybrid-configuration-wizard-step-by-step)

I'll probably add more here once we have a chance to test the HCW ourselves. 

### Post-check

- [ ] **EXO user mailbox**: Create a user mailbox in EXO, test GAL visibility in both organizations, and test hybrid mail flow between organizations.
- [ ] **EXO shared mailbox**: Create a shared mailbox in EXO, test GAL visibility in both organizations, and test hybrid mail flow to the mailbox.
- [ ] **EXO resource mailbox**: Create a room mailbox in EXO, test GAL visibility in both organizations, and test making a booking.
- [ ] **Distribution group membership changes**: Create a distribution group on-premises, add an on-premises and cloud mailbox, and test that mail to the DG delivers to both recipients.
- [ ] **EXO integration**: Create a EXO Group, test GAL visibility on-premises, and test that mail is delivered to on-premises members.
- [ ] **Shared mailbox access and Send-as**: Test that on-premises and cloud mailbox users can access shared mailboxes cross-premises, and Send-as permissions work.
- [ ] **Delegate mailbox access and Send-on-Behalf**: Test that on-premises and cloud mailbox users can edit calendars that they are delegates for, and Send-on-behalf permissions work.

### HCW Troubleshooting

[Migration endpoint could not be created](https://www.alitajran.com/hcw8078-migration-endpoint-could-not-be-created/)<br>
[Error validating hybrid agent](https://www.alitajran.com/error-validate-hybrid-agent-for-exchange-usage/)<br>
[Resolve connection issues](https://www.regainsoftware.com/blog/hybrid-configuration-wizard-resolve-connection-issues-with-office365/)<br>
[MSFT: Troubleshooting HCW modern agent like a pro](https://techcommunity.microsoft.com/blog/exchange/modern-hcw-hybrid-agent-troubleshooting-like-a-pro/1558725)

## Mailbox Migration

### Move Mailboxes with PowerShell

Download and install the [Exchange Online PowerShell module](https://www.powershellgallery.com/packages/ExchangeOnlineManagement/).

**Single mailbox**:

1. Connect to Exchange Online PowerShell<br>
```powershell
Connect-ExchangeOnline -UserPrincipalName admin@nep.com # This is your admin account for Exchange Online
```
1. Find migration endpoint remote server URL<br>
```powershell
Get-MigrationEndpoint | Format-List Identity, RemoteServer
```
    Copy the **RemoteServer URL** value from the output. You will need it for `-RemoteHostName` in the next step.
1. Move mailbox to Exchange Online<br>
```powershell
New-MoveRequest -Identity "jsmith@nep.com" -Remote -RemoteHostName "mail.nep.com" -TargetDeliveryDomain "nep.mail.onmicrosoft.com" -RemoteCredential (Get-Credential) # This is your on-prem admin account
```
1. Disconnect from Exchange Online PowerShell<br>
```powershell
Disconnect-ExchangeOnline -Confirm:$false
```

**Many mailboxes**:

1. Create a CSV file that contains a single column with the email addresses for the mailboxes that will be moved. The header for this column must be named `EmailAddress`.
2. Connect to Exchange Online PowerShell and use the following script:<br>
```powershell
$Mailboxes = Import-Csv "C:\migration\mailboxes.csv"
$RemoteHostName = "mail.nep.com"
$TargetDeliveryDomain = "nep.mail.onmicrosoft.com"
$OnPremCred = (Get-Credential)

foreach ($Mailbox in $Mailboxes) {
    $params = @{
        Identity             = $Mailbox.EmailAddress
        Remote               = $true
        RemoteHostName       = $RemoteHostName
        TargetDeliveryDomain = $TargetDeliveryDomain
        RemoteCredential     = $OnPremCred
    }
    New-MoveRequest @params
}
```

!!! tip 

    You can use the EAC to export a list of all your email addresses to a CSV file.

    Navigate to **Recipients** > **Mailboxes**. Click the more options icon (**...**) in the toolbar and click **Export data to a CSV file**. Check the box for **EMAIL ADDRESS** and click **Export**.

    Make sure you edit the CSV header to comply with the correct format mentioned above (`EmailAddress`).

**Get Mailbox Move Status:**

```powershell
# Single mailbox
Get-MoveRequest -Identity "jsmith@nep.com" | Get-MoveRequestStatistics

# All move requests
Get-MoveRequest | Get-MoveRequestStatistics 

# All move requests that are in progress
Get-MoveRequest -MoveStatus InProgress | Get-MoveRequestStatistics
```

**Suspend a Move Request**:

```powershell
# Suspend a specific move request
Suspend-MoveRequest -Identity "jsmith@nep.com"

# Suspend all move requests that are in progress
Get-MoveRequest -MoveStatus InProgress | Suspend-MoveRequest -Confirm:$false 
```

**Resume a Move Request**:

```powershell
# Resume a specific move request
Resume-MoveRequest -Identity "jsmith@nep.com"

# Resume all suspended move requests
Get-MoveRequest -MoveStatus Suspended | Resume-MoveRequest 
```

!!! tip
    
    The Suspend and Resume cmdlets can sometimes be used to fix a stuck move request.

[*MSFT: Move Mailboxes Using PowerShell*](https://learn.microsoft.com/en-us/exchange/hybrid-deployment/move-mailboxes-using-powershell#use-powershell-to-move-mailboxes)<br>
[*MSFT: Exchange PowerShell*](https://learn.microsoft.com/en-us/powershell/module/exchange/?view=exchange-ps)<br>
[*MSFT: Exchange Online PowerShell*](https://learn.microsoft.com/en-us/powershell/exchange/exchange-online-powershell?view=exchange-ps)

### Move Mailboxes with EAC

1. In the on-premises EAC, got to **Home** > **Migration**.
2. Select **Add migration batch**.
3. On the **Add migration batch** page:
    1. Enter a name for the batch in the **Give migration batch a unique name** box.
    2. From the **Select the mailbox migration path** drop-down list, select **Migration to Exchange Online**.
    3. Select **Next**.
4. Select **Remote move migration** and then select **Next**.
5. On the **Prerequisites for remote migration** page, select **Next**. Confirm the endpoint.
6. On the Add user mailboxes page:
    1. Select **Manually add users to migrate**.<br>
    !!! info "To migrate mailboxes in bulk, select the **Migrate from CSV file** option. See [here](https://learn.microsoft.com/en-us/exchange/mailbox-migration/csv-files-for-migration) for more info."
    2. Enter the name of email address of the user whose mailboxes you want to migrate.
    3. Select the mailboxes that you want to move to Exchange Online and then select **Next**.<br>
    !!! info "If shared mailbox accounts don't appear in the user selection list, you need to sync the shared mailbox on-premises AD accounts to Microsoft 365 or Office 365 by using cloud sync or Microsoft Entra Connect. The shared mailbox AD accounts appear as blocked accounts in the Microsoft 365 admin center and you can select them from the user list."
7. Select a target delivery domain and then click **Next**.
8. On the **Schedule batch migration** page:
    1. In the search box under **After the batch is complete, a report will be sent to the following recipients**, you must select at least one recipient to receive this report.
    2. Select the desired option for starting the migration batch.
    3. Select the desired option ending the migration batch.<br>
    !!! info "If you select to manually complete the batch later, EXO will only sync 95% of each mailbox in that batch. EXO periodically syncs the batch to keep each mailbox at 95% synchronization until the batch is manually completed."
9. Select a timezone and select **Save**.
10. Select **Done**.
11. Select your migration batch from the **Migration batches** page and select **Resume migration**.
12. Select **Confirm** and close the page that displays the notification message **Operation successful**.

[*MSFT: Use the EAC to move mailboxes*](https://learn.microsoft.com/en-us/exchange/hybrid-deployment/move-mailboxes-using-eac#use-the-eac-to-move-mailboxes)

### Migration Troubleshooting

<https://learn.microsoft.com/en-us/exchange/troubleshoot/move-or-migrate-mailboxes/troubleshoot-migration-issues-in-exchange-hybrid>

## Creating Exchange Online Mailboxes

!!! warning "Important"

    While it is possible to add a user in ADUC, wait for it to sync to Entra, and then license the user in M365, the user's Exchange Online attributes will never sync back to the on-premises environment to create a Mail-enabled user (MEU) object. In this scenario, managing the mailboxes from the on-prem environment isn't possible and since the M365 user is synced with on-prem AD, managing attributes from the cloud is also not possible. 

    Instead, EXO mailboxes can be created from the on-prem Exchange environment (EAC/EAS). This option will create the on-prem AD user *and* the MEU object with the remote routing address (such as jsmith@contoso.mail.onmicorosot.com). AD sync can then occur to establish the appropriate objects/attributes in the cloud.

    <https://techcommunity.microsoft.com/blog/exchange/on-provisioning-mailboxes-in-exchange-online-when-in-hybrid/1406335>

### Create Mailboxes with PowerShell

```powershell
$Password = Read-Host "Enter password" -AsSecureString
New-RemoteMailbox -Name "John Smith" -Alias "jsmith" -FirstName "John" -LastName "Smith" -UserPrincipalName jsmith@nep.com -RemoteRoutingAddress "jsmith@nep.mail.onmicrosoft.com" -Password $Password
Start-ADSyncSyncCycle -PolicyType Delta
```

<https://learn.microsoft.com/en-us/powershell/module/exchange/new-remotemailbox?view=exchange-ps>

### Create Mailboxes with EAC

!!! info "Sign in to the on-premises Exchange Admin Center and NOT the Exchange Online Admin Center."

1. In the on-premises EAC, go to **Recipients** > **Mailboxes**.
2. Click on the **+** icon from the toolbar and select Office 365 mailbox.
3. Fill in the information and click **Save**.
4. Force sync Entra Connect with `Start-ADSyncSyncCycle -PolicyType Delta`.
5. On the **Recipients** page, select the new mailbox and click the **Edit (Pencil)** icon from the toolbar.
6. Click **email address** and verify the following:
    1. smtp `<user>@tenant.mail.onmicrosoft.com`
    2. Remote routing address.
7. Sign in to the Exchange Online Admin Center.
8. Go to **Recipients > Mailboxes** and click on the new Office 365 mailbox.
9. Select **General** and click on **Manage email address types**. There is no remote routing address option in the cloud, and you should see two smtp `onmicrosoft.com` addresses:
    1. `smtp:<user>@tenant.mail.onmicrosoft.com`
    2. `smtp:<user>@tenant.onmicrosoft.com`

!!! note

    Don't forget that this new user/mailbox still needs to be licensed in order to send/receive mail. 
    
    Ali Tajran has a nice [article](https://www.alitajran.com/assign-microsoft-365-licenses-group-based-licensing/) on how to configure group based licensing.