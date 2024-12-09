# Hybrid Exchange Deployment

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
- [ ] **EdgeSync**: If you deployed Edge Transport servers in your on-prem organization and want to configure the Edge Transport servers for hybrid secure mail transport, you need to configure EdgeSync prior to using the Hybrid Configuration Wizard. 
- [x] **.NET Framework**: Verify the versions that can be used with your specific version of Exchange (Ex2019 CU14 supports 4.8.1 & 4.8).
- [ ] **Protocols, Ports, and Endpoints**: You need to configure the following protocols, ports, and connection endpoints in the firewall that protects your on-prem organization.
- [ ] Download and install the 

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

## Useful Tools and Services

- [Mail Migration Advisor](https://learn.microsoft.com/en-us/exchange/mail-migration-jump)
- [Remote Connectivity Analyzer](https://testconnectivity.microsoft.com/)
- [Single Sign-On](https://learn.microsoft.com/en-us/exchange/single-sign-on)

