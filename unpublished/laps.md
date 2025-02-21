# LAPS

Set-AdmPwdReadPasswordPermission

## Install and Setup

1. [Download](https://www.microsoft.com/en-us/download/details.aspx?id=46899&WT.mc_id=rss_alldownloads_all) and install on a managemement computer.
2. Participate in a short "Next Fest":
	- Click Next on the **Welcome** screen and **EULA** screen
	- Make sure that Management Tools, Fat client UI, PowerShell, and GPO Editor templates are checked before clicking Next  on the **Custom Setup** screen.
3. CLick **Install** and then **Finish**.

!!! info "Important"

	By default, LAPS doesn't audit who accesses LAPS passwords. Enable with the following PowerShell command:
    
	`Set-AdmPwdAuditing -Identity:Clients -AuditedPrincipals:Everyone`

**Extend the AD Schema**:

```powershell
Import-Module AdmPwd.PS

Update-AdmPwdADSSchema
```

**Give devices permission to write to the new attributes**:


```powershell
Set-AdmPwdComputerSelfPermission -OrgUnit <OU_Name>
```

Decide which users/groups need to be able to read the contents of the new attributes:

```powershell
​Set-AdmPwdReadPasswordPermission -Identity "Member Serveres" -AllowedPrincipals "helpdesk"
```

**Configure LAPS settings in a GPO and apply to the OU containing the computers**:

The LAPS GPO settings are located under Computer Settings > Policies > Administrative Templates. There are four settings:

`Password Settings` 

:	Allows you to configure password complexity.

`Name of administrator account to manage`

:	Specifies the account name you intend to manage other than that identified by the well-known SID of the built-in administrator account. If you do not intend on managing another account or only renamed the built-in admin account, there's no need to enable this policy.

`Do not allow password expiration time longer than required by policy`

:	Enabling this strictly enforces the age of the local admin account's password by not allowing it to drift beyond the specified age limit. It will be changed *immeidately*.

`Enable local admin password management`

:	Must be set to activate LAPS on the managed computer.

https://www.youtube.com/watch?v=9dTTbJFBgB4