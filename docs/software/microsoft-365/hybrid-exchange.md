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

- [Mail Migration Advisor](https://learn.microsoft.com/en-us/exchange/mail-migration-jump)
    - The advisor will recommend the best migration path for your organization based on your current mail system.
- [Exchange Server Deployment Assistant](https://setup.cloud.microsoft/exchange/deployment-assistant)
    - MSFT says this tool will create a customized checklist with instructions to configure your hybrid deployment.
- [Remote Connectivity Analyzer](https://testconnectivity.microsoft.com/)
    - Run this prior to starting the HCW to check the external connectivity of your on-prem Exchange organization.
- [Single Sign-On](https://learn.microsoft.com/en-us/exchange/single-sign-on)

## Hybrid Configuration Wizard

There are far better guides that already exist for walking you through the HCW. Here are a few.

- [Ali Tajran: Run the Hybrid Configuration Wizard (Modern Hybrid Deployment)](https://www.alitajran.com/hybrid-configuration-wizard/#h-run-hybrid-configuration-wizard)
    - He has a great [collection of Exchange Hybrid articles](https://www.alitajran.com/exchange-hybrid/).
- [Office 365 Concepts: Hybrid Configuration Wizard Step by Step (Classic Hybrid Deployment)](https://office365concepts.com/hybrid-configuration-wizard-step-by-step/#run-hybrid-configuration-wizard-step-by-step)

I'll probably add more here once we have a change to test the HCW ourselves. 

## Post-check

- [ ] EXO user mailbox: Create a user mailbox in EXO, test GAL visibility in both organizations, and test hybrid mail flow between organizations.
- [ ] EXO shared mailbox: Create a shared mailbox in EXO, test GAL visibility in both organizations, and test hybrid mail flow to the mailbox.
- [ ] EXO resource mailbox: Create a room mailbox in EXO, test GAL visibility in both organizations, and test making a booking.
- [ ] Distribution group membership changes: Create a distribution group on-premises, add an on-premises and cloud mailbox, and test that mail to the DG delivers to both recipients.
- [ ] EXO integration: Create a EXO Group, test GAL visibility on-premises, and test that mail is delivered to on-premises members.
- [ ] Shared mailbox access and Send-as: Test that on-premises and cloud mailbox users can access shared mailboxes cross-premises, and Send-as permissions work.
- [ ] Delegate mailbox access and Send-on-Behalf: Test that on-premises and cloud mailbox users can edit calendars that they are delegates for, and Send-on-behalf permissions work.

## Troubleshooting

<https://www.alitajran.com/hcw8078-migration-endpoint-could-not-be-created/>

<https://www.alitajran.com/error-validate-hybrid-agent-for-exchange-usage/>

<https://www.regainsoftware.com/blog/hybrid-configuration-wizard-resolve-connection-issues-with-office365/>

## Mailbox Migration

Download and install the Exchange Online PowerShell module.

<https://www.powershellgallery.com/packages/ExchangeOnlineManagement/>

**Single mailbox**:

1. Connect to Exchange Online PowerShell<br>
```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```
2. Find migration endpoint remote server URL<br>
```powershell
Get-MigrationEndpoint | Format-List Identity, RemoteServer
```
3. Move mailbox to Exchange Online with PowerShell<br>
```powershell
New-MoveRequest -Identity "jsmith@contoso.com" -Remote -RemoteHostName "mail.contoso.com" -TargetDeliveryDomain "contoso.mail.onmicrosoft.com" -RemoteCredential (Get-Credential)
```
4. Disconnect from Exchange Online PowerShell<br>
```powershell
Disconnect-ExchangeOnline -Confirm:$false
```

**Many mailboxes (New-MoveRequest)**:

1. Create a CSV file that contains a single column with the email addresses for the mailboxes that will be moved. The header for this column must be named `EmailAddress`.
2. Use the following script:<br>
```powershell
$Mailboxes = Import-Csv "C:\temp\mailboxes.csv"
$RemoteHostName = "mail.contoso.com"
$TargetDeliveryDomain = "contoso.mail.onmicrosoft.com"
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

### Migration Troubleshooting

<https://learn.microsoft.com/en-us/exchange/troubleshoot/move-or-migrate-mailboxes/troubleshoot-migration-issues-in-exchange-hybrid>