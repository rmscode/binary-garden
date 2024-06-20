# Group Policy Overview

Group Policy is an infrastructure that allows you to specify managed configurations for users and computers through Group Policy settings and Group Policy Preferences. To configure Group Policy settings that affect only a local computer or user, you can use the Local Group Policy Editor. You can manage Group Policy settings and Group Policy Preferences in an Active Directory Domain Services (AD DS) environment through the Group Policy Management Console (GPMC). Group Policy management tools also are included in the Remote Server Administration Tools pack to provide a way for you to administer Group Policy settings from your desktop.

## Group Policy Terminology

`Group Policy Objects (GPOs)`

:     A group policy object is a collection of policy settings. A GPO is applied to the domain, or an OU to target users, computers, or the entire domain. You will spend most of your time working with GPs.

`Group Policy Management Console (GPMC)`

:     This is the management console used to manage group policy and GPOs. This is installed on the Active Directory server but can also be added to other computers by installing the RSAT tools.

`Local Group Policy`

:     Local group policies are policies that apply to a single computer and are managed locally on a computer. You can access the local GPO with the gpedit.msc console. These policies apply to only the computer you edit them on. Domain policies take precedence over local policies.

`Domain Group Policy (DGP)`

:     Domain group policies are managed centrally and can be applied to multiple computers and users. DGPs will be the focus of this guide.

`User Configuration Policies`

:     Each GPO has a user configuration and computer configuration section. The User configuration policies only apply to users.

`Computer Configuration Policies`

:     The GPO computer configuration policies apply to the computer, not the user.