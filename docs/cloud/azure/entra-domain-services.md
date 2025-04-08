# Entra Domain Services

## Overview

Entra Domain Services (formerly known as Azure Active Directory Domain Services or AADDS) provides managed domain services in the cloud without the need to deploy, manage, or patch domain controllers. This allows you to run legacy applications in the cloud that can't use modern authentication methods, or where you don't want directory lookups to always go back to an on-premises Active Directory environment. 

Domain Services integrates seamlessly with your existing Entra tenant, enabling users to sign in to services and applications connected to the managed domain using their current credentials. According to Microsoft, these features facilitate a smoother *lift-and-shift* of on-premises resources to Azure.

!!! note

    Microsoft never explicitly declares that you can't connect on-premises machines to Entra Domain Services with a site-to-site VPN nor do they state whether its supported or not. It is very much a gray area. However, there are plenty examples of their careful wording for what they do support.

### Use Case Scenarios

IT admins often use one of the following solutions to provide an identity service to a applications that run in Azure:

- Configure a site-to-site VPN connection between workloads that run in Azure and an on-premises AD DS environment.
- Create replica domain controllers using Azure virtual machines (VMs) to extend the AD DS domain / forest from on-premises.
- Deploy a standalone AD DS environment in Azure using domain controllers that run on Azure VMs.

!!! quote

    With these approaches, VPN connections to the on-premises directory make applications vulnerable to transient network glitches or outages.

    Microsoft Entra Domain Services offers alternatives to the need to create VPN connections back to an on-premises AD DS environment or run and manage VMs in Azure to provide identity services.

#### Entra Domain Services for hybrid organizations

Applications and server workloads that require domain services are deployed in a virtual network in Azure. Identity information is synchronized from an on-premises directory to a Microsoft Entra tenant using Microsoft Entra Connect. 

!!! quote

    Legacy applications migrated to Azure as part of a lift and shift strategy may use traditional LDAP connections to provide identity information. To support this hybrid infrastructure, identity information from an on-premises AD DS environment can be synchronized to a Microsoft Entra tenant. Microsoft Entra Domain Services then provides these legacy applications in Azure with an identity source, without the need to configure and manage application connectivity back to on-premises directory services.

#### Entra Domain Services for cloud-only organizations

All user identities, their credentials, and group memberships are created and managed in Microsoft Entra ID. There is no additional configuration of Microsoft Entra Connect to synchronize any identity information from an on-premises directory. Applications and server workloads that require domain services are deployed in a virtual network in Azure.

#### Secure Administration of Azure VMs

Azure VMs joined to a managed domain let you use a single set of AD credentials. There is also the added benefit of being able to ue Group Policy to administer and secure the VMs.

#### Lift-and-shift on-premises applications that use LDAP

Legacy applications that require LDAP authetication or are designed to read directory information using LDAP.

!!! quote 

    For this scenario, Microsoft Entra Domain Services lets applications perform LDAP binds as part of the authentication process. Legacy on-premises applications can lift-and-shift into Azure and continue to seamlessly authenticate users without any change in configuration or user experience.

### Site-to-site VPN from Entra Domain Services to on-premises?

This is something I have wondered about and discussed with Matt. My skepticism leans more so towards whether its supported, not so much whether it would work. I know it would work, actually. I came across a reddit thread where someone had mentioned using Entra Domain Services, so I [asked them](https://www.reddit.com/r/sysadmin/comments/1jqi2y6/entra_id_to_onprem/ml7a9op/) about their setup.

A more reliable method of bridging the gap is a combination of [Azure ExpressRoute](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction) and a [two-way forest trust in Entra Domain Services](https://learn.microsoft.com/en-us/entra/identity/domain-services/tutorial-create-forest-trust) with an on-prem domain. This is currently a preview feature. It was first announced in [December of 2023](https://devblogs.microsoft.com/identity/trust-domain-options/).

### References

[What is Microsoft Entra Domain Services?](https://learn.microsoft.com/en-us/entra/identity/domain-services/overview)<br>
[Common Deployment Scenarios](https://learn.microsoft.com/en-us/entra/identity/domain-services/scenarios#common-ways-to-provide-identity-solutions-in-the-cloud)<br>
