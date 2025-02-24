# Microsoft LAPS (Legacy)

## Install and Setup

There are two parts to the installation, the management computers and the clients you want to manage. 

### Management Computer

1. [Download](https://www.microsoft.com/en-us/download/details.aspx?id=46899&WT.mc_id=rss_alldownloads_all) and install on a management computer.
2. Participate in a short Next Fest: Welcome > Next > EULA > Next
3. Make sure that all **Management Tools** are installed: Fat client UI, PowerShell module, and GPO Editor templates. Click **Next**.
4. Click **Install** and then **Finish**.

### Client Computer

Follow the same steps above, but only install the CSE (AdmPwd GPO Extension).

For mass deployment, you can script the installation:

```cmd
msiexec /i \\server\share\LAPS.x64.msi /quiet
```

!!! info 

    Managed clients must have access to a writable domain controller in order to update the password. You can confirm this by running the following command on the client:

    ```powershell
    Get-ADDomainController -Discover -Writable -ForceDiscover
    ```

## AD Preparation

### Extend the Schema

The AD needs to be extended by two new attributes (`ms-ms-Mcs-AdmPwdExpirationTime` and `ms-Mcs-AdmPwd`) that store the password of the managed local Admin account for each computer and the timestamp of password expiration. 

```powershell
Import-Module AdmPwd.PS

Update-AdmPwdADSSchema
```

### Permissions

#### Removing Extended Rights:

To restrict who can view the passwords, you need to remove "All extended rights" from the users and groups that are not allowed to read the value of attribute `ms-Mcs-AdmPwd`.

Repeat the next steps on each OU that contains the managed computers. You do not need to do this on sub-containers unless you have permission inheritance disabled.

1. Open **ADSIEdit**
2. Right Click on the OU that contains the computer accounts that you are installing this solution on and select **Properties**.
3. Click the **Security** tab 
4. Click **Advanced**
5. Select the Group(s) or User(s) that you don’t want to be able to read the password and then click **Edit**.
6. Uncheck **All extended rights**

!!! info "IMPORTANT"

    This will remove ALL extended rights, not only CONTROL_ACCESS right, so be sure that all roles will retain all necessary permissions required for their regular work.

    To quickly find which security principals have extended rights to the OU you can use PowerShell.  You may need to run Import-module AdmPwd.PS if this is a new window.

    ```powershell
    Find-AdmPwdExtendedrights -Identity :<OU name> | Format-Table
    ```

#### Adding Machine Rights:

Write permission on the new attributes of all computer accounts has to be added to the SELF built-in account so the machines can update their password and expiration time.

```powershell
Set-AdmPwdComputerSelfPermission -OrgUnit <OU_Name>
```

#### Adding User/Group Rights:

Decide which users/groups need to be able to read the contents of the new attributes:

```powershell
​Set-AdmPwdReadPasswordPermission -OrgUnit <OU_Name> -AllowedPrincipals <Users_or_Groups>
```

Add the write permission on `ms-Mcs-AdmPwdExpirationTime` attribute of computer accounts to users/groups that will be allowed to force password resets.

```powershell
Set-AdmPwdResetPasswordPermission -OrgUnit <OU_Name> -AllowedPrincipals <Users_or_Groups>
```

## Group Policy

The LAPS GPO settings are located under Computer Configuration > Policies > Administrative Templates > LAPS. There are four settings:

`Password Settings` 

:	Allows you to configure password complexity. By default, maximum complexity is used.

`Name of administrator account to manage`

:	Specifies the account name you intend to manage other than that identified by the well-known SID of the built-in administrator account. If you do not intend on managing another account or only renamed the built-in admin account, there's no need to enable this policy.

`Do not allow password expiration time longer than required by policy`

:	Enabling this strictly enforces the age of the local admin account's password by not allowing it to drift beyond the specified age limit. It will be changed *immediately*.

`Enable local admin password management`

:	Must be set to activate LAPS on the managed computer.

## Managing Clients

### Retrieving Passwords

Once configured, and Group Policy has been refreshed, you can look at the properties of the computer objects and see the new settings.

!!! info 

    The password is stored in plaintext in the `ms-Mcs-AdmPwd` attribute of the computer object. However, access to the field is restricted to domain admins and the users/groups you specified in the GPO.

    The successor to Microsoft LAPS, Windows LAPS, encrypts passwords. <https://lazyadmin.nl/it/windows-laps/>

There is also a GUI tool (Fat client UI) available. It is located in `C:\Program Files\LAPS\AdmPwd.UI.exe` and will be listed as LAPS UI in the start menu.

To retrieve a password with PowerShell, you can use the following command:

```powershell
Get-AdmPwdPassword -ComputerName <Computer_Name>
```

### Resetting Passwords

The LAPS UI can be used to reset a password by selecting a date and clicking **Set**. You can choose the current date and time to reset it immediately, or plan a reset for a future date.

To reset a password with PowerShell, you can use the following command:

```powershell
Reset-AdmPwdPassword -ComputerName <Computer_Name> -WhenEffective <Date_Time>
```

## Auditing

By default, LAPS doesn't audit who accesses LAPS passwords. Enable with the following PowerShell command:

```powershell
Set-AdmPwdAuditing -OrgUnit:<OU_Name> -AuditedPrincipals:Everyone
```

When a password is read, a 4662 event is logged in the Security log of the Domain Controller. 
