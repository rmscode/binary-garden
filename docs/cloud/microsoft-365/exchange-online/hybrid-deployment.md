# Exchange Hybrid Deployment

!!! info

    Before completing any of the steps towards a hybrid deployment that will involve online migrations, its important to consider the following best practices:

    - Data extraction is intensive. The source system must have sufficient resources (CPU time, memory). Otherwise, migrations will be slow and users may be impacted.
    - Perform migration after business hours.
    - Hybrid deployment migration is a cloud-initiated pull/push operation, and an Exchange hybrid server acts as the migration server. Using a low-scale virtual machine to act as the hybrid server can results in poor migration performance.
    - If possible, use powerful physical servers instead of VMs for Exchange hybrid servers.
    - Use multiple hybrid servers.
    - Tweak the MRSProxy [concurrency settings](https://learn.microsoft.com/en-us/exchange/performance-best-practices#mrsproxy-best-practice).
    - `New-MoveRequest` with the `SuspendWhenReadyToComplete` option to get an indication of migration performance. Remember to remove the migration requests afterwards.

## Pre-check

- [x] Latest CU or RU thats available for the version of Exchange that you are running. The immediately previous release is also supported.
- [x] At least one mailbox server.
- [x] **Custom domains**: Register any custom domains you want to use in your hybrid deployment with M365. You can do this by using the M365 portal, or by optionally configuring Active Directory Federation Services (AD FS) in your on-prem organization.
- [x] AD synchronization.
- [x] **Autodiscover DNS records**: Configure the Autodiscover record for your existing SMTP domains in you public DNS to point to your on-prem Exchange servers
- [x] **Certificates**: Assign Exchange services to a valid digital certificate that you purchased from a trusted public certificate authority (CA). Even though you can use self-signed certificates for the on-premises federation trust with the Microsoft Federation Gateway, you can't use self-signed certificates for Exchange services in a hybrid deployment.
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

- [Office 365 Concepts: Hybrid Configuration Wizard Step by Step (Classic Hybrid Deployment)](https://office365concepts.com/hybrid-configuration-wizard-step-by-step/#run-hybrid-configuration-wizard-step-by-step)
- [Ali Tajran: Run the Hybrid Configuration Wizard (Modern Hybrid Deployment)](https://www.alitajran.com/hybrid-configuration-wizard/#h-run-hybrid-configuration-wizard)
    - He has a great [collection of Exchange Hybrid articles](https://www.alitajran.com/exchange-hybrid/).

I'll probably add more here once we have a chance to test the HCW ourselves.

!!! note "MX and autodiscover DNS records"

    It is my understanding that there is no need to change the MX records at this point. In fact, the consensus seems to be that the switch shouldn't happen until most/all of your mailboxes have been migrated ([Office365Concepts](https://practical365.com/mx-records-for-exchange-hybrid-deployments/)...I've seen the same mentioned on Reddit plenty as well).
    
    For the autodiscover URL DNS record, as long as there are resources on-premises, it should continue to point to the on-premises Exchange servers. [Jaap Wesselius](https://jaapwesselius.com/2015/11/04/autodiscover-in-a-hybrid-scenario/) and [Ali Tajran](https://www.alitajran.com/autodiscover-url-exchange-hybrid/) have both written articles about this.

### Post-check

- [ ] **ExO user mailbox**: Create a user mailbox in ExO, test GAL visibility in both organizations, and test hybrid mail flow between organizations.
- [ ] **ExO shared mailbox**: Create a shared mailbox in ExO, test GAL visibility in both organizations, and test hybrid mail flow to the mailbox.
- [ ] **ExO resource mailbox**: Create a room mailbox in ExO, test GAL visibility in both organizations, and test making a booking.
- [ ] **Distribution group membership changes**: Create a distribution group on-premises, add an on-premises and cloud mailbox, and test that mail to the DG delivers to both recipients.
- [ ] **ExO integration**: Create a ExO Group, test GAL visibility on-premises, and test that mail is delivered to on-premises members.
- [ ] **Shared mailbox access and Send-as**: Test that on-premises and cloud mailbox users can access shared mailboxes cross-premises, and Send-as permissions work.
- [ ] **Delegate mailbox access and Send-on-Behalf**: Test that on-premises and cloud mailbox users can edit calendars that they are delegates for, and Send-on-behalf permissions work.

## [Mailbox Migration](remote-moves.md) <small>(link)</small> { #mailbox-migration data-toc-label="Mailbox Migration" }

## [Provision Online Mailboxes](provision-online-mailboxes.md) <small>(link)</small> { #provision-online-mailboxes data-toc-label="Provision Online Mailboxes" }

## Decommissioning the Last Exchange Server { #decom-last-exchange-server data-toc-label="Decom Last Exchange Server"}

!!! info "Important"

    Ensure that all mailboxes have been migrated to the cloud and that there is no SMTP relay.

I have some notes on this [here](../../../notes/exchange-migration-notes.md#how-and-when-to-decommission-your-on-prem-exchange-server-in-a-hybrid-deployment). Official Microsoft documentation available [here](https://learn.microsoft.com/en-gb/exchange/manage-hybrid-exchange-recipients-with-management-tools). 

### Prepare the Exchange Server { data-toc-label="Prepare the Exchange Server" }

1. Use `Set-AdServerSettings -ViewEntireForest $true` to view all objects in the forest.
2. Verify there are no mailboxes on-prem with `Get-Mailbox`.
3. Verify that the ExO tenant coexistence domain is configured:<br>
    ```powershell
    Get-AcceptedDomain Hybrid* | Format-Table Name, DomainName, TargetDeliveryDomain
    ```
4. If the coexistence domain isn't added as a remote domain, add it:<br>
    ```powershell
    New-RemoteDomain -Name 'Hybrid Domain - biz.mail.onmicrosoft.com' -DomainName 'biz.mail.onmicrosoft.com'
    ```
5. If it isn’t set as the Target Delivery Domain, set it:<br>

    ```powershell
    Set-RemoteDomain -TargetDeliveryDomain: $true -Identity 'Hybrid Domain - biz.mail.onmicrosoft.com'
    ```

### Install Management Tools

1. Install Windows Remote Server Administration Tools on the management server/computer:<br>
```powershell
Install-WindowsFeature rsat-adds
```
2. Download the latest [Exchange Server 2019 CU](https://learn.microsoft.com/en-us/exchange/new-features/build-numbers-and-release-dates?view=exchserver-2019), mount and run the wizard.
    1. **Do not check for updates**. Click **Next** and once again after the welcome screen.
    2. Accept the License Agreement. Click **Next**.
    3. Select **Use recommended settings**. Click **Next**.
    4. Select **Management Tools** and **Automatically install Windows Server roles...**. Click **Next**.
    5. Choose install location. Click **Next**.
    6. Click **Install** and **Finish**.
3. Restart the management server/computer.

### Create Recipient Management Group { data-toc-label="Recipient Management Group" }

1. Sign-in as a Domain Admin to the computer with the Management Tools installed and load the snap-in.<br>
```powershell
Add-PSSnapin *RecipientManagement
```
3. Run the `Add-PermissionForEMT.ps1` script located in `C:\Program Files\Microsoft\Exchange Server\V15\Scripts`. 

The script creates a security group called "Recipient Management EMT" and members of this group have recipient management permissions. All admins without domain admin rights who need to perform recipient management should be added to this security group.

### Test

Shut down the Exchange Hybrid server and test.

```powershell
# The snap-in must be loaded each time it is needed. Starting EMS will not connect to the Exchange Server because it is offline.
Add-PSSnapin *RecipientManagement
# Test recipient cmdlets to confirm they work...
Get-RemoteMailbox
```

### Remove the Exchange Server

1. Turn on your last Exchange Server, start EMS, and run the command below. Ensure that it isn't set to remote. If it is and you want to continue to access the public folders, you need to [migrate them to Exchange Online](https://learn.microsoft.com/en-us/exchange/collaboration-exo/public-folders/batch-migration-of-legacy-public-folders).<br>
```powershell
Get-OrganizationConfig | Format-List PublicFoldersEnabled
```
2. Point the MX and Autodiscovery DNS records to Exchange Online instead of your on-prem environment. Update both the internal and external DNS records.<br>
    1. Sign in to the Microsoft 365 admin center.
    2. Select **Settings** > **Domains** and select the appropriate domain.
    3. Go through the wizard or check under **DNS** to find the MX  and auto discovery DNS records. They should look something like `tenant.mail.protection.outlook.com` and `autodiscover.outlook.com`, respectively.
    4. Sign in to your domain name registrar and update the MX record to point to the new value.
3. Remove the Autodiscovery Service Connection Point (SCP) on the Exchange Servers by clearing the entry.<br>
```powershell
Get-ClientAccessService | Set-ClientAccessService -AutoDiscoverServiceInternalUri $null
```
4. Remove the Hybrid Configuration object from Active Directory.<br>
```powershell
Remove-HybridConfiguration -Confirm:$false
```
5. Verify that the Hybrid Configuration is successfully removed. The output will be empty.<br>
```powershell
Get-HybridConfiguration
```
6. Disable OAuth configuration from on-premises if it’s present.<br>
```powershell
Get-IntraOrganizationConnector | Set-IntraOrganizationConnector -Enabled $false
# Verify that the enabled column is "False"
Get-IntraOrganizationConnector | Format-Table Name,Enabled,TargetAddressDomains
```
7. Connect to Exchange Online PowerShell and disable OAuth configuration from Microsoft 365 if it’s present.<br>
```powershell
Connect-ExchangeOnline
Get-IntraOrganizationConnector | Set-IntraOrganizationConnector -Enabled $false
```

<https://o365info.com/microsoft-365-mx-record/#h-get-mx-record-value-from-microsoft-365-portal><br>
<https://www.alitajran.com/autodiscover-url-exchange-hybrid/>

### AD Cleanup

!!! warning

    This can't be undone. Proceed only if you never plan to use the Exchange Server(s) again. That said, it is still possible to install a new Exchange Server in the future. 

1. Run the `CleanupActiveDirectoryEMT.ps1` script located in `C:\Program Files\Microsoft\Exchange Server\V15\Scripts`.
2. When cleanup completes, you can **remove the AD computer object**. **Do not** uninstall the Exchange server.

## Troubleshooting

[*Ali Tajran: Migration endpoint could not be created*](https://www.alitajran.com/hcw8078-migration-endpoint-could-not-be-created/)<br>
[*Ali Tajran: Error validating hybrid agent*](https://www.alitajran.com/error-validate-hybrid-agent-for-exchange-usage/)<br>
[*Regain Software: Resolve connection issues*](https://www.regainsoftware.com/blog/hybrid-configuration-wizard-resolve-connection-issues-with-office365/)<br>
[*MSFT: Troubleshooting HCW modern agent like a pro*](https://techcommunity.microsoft.com/blog/exchange/modern-hcw-hybrid-agent-troubleshooting-like-a-pro/1558725)<br>
[*MSFT: Troubleshooting Hybrid Migration Endpoints*](https://techcommunity.microsoft.com/blog/exchange/troubleshooting-hybrid-migration-endpoints-in-classic-and-modern-hybrid/953006)<br>
[*MSFT: Migration Issues*](https://learn.microsoft.com/en-us/exchange/troubleshoot/move-or-migrate-mailboxes/troubleshoot-migration-issues-in-exchange-hybrid)<br>
[*MSFT: Troubleshooting Hybrid mail flow*](https://techcommunity.microsoft.com/blog/exchange/demystifying-and-troubleshooting-hybrid-mail-flow-when-is-a-message-internal/1420838)<br>
[*MSFT: Delays in provisioning of user/mailbox or syn changes in ExO*](https://learn.microsoft.com/en-us/exchange/troubleshoot/user-and-shared-mailboxes/delays-provision-mailbox-sync-changes)