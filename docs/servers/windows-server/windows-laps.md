# Windows LAPS

Windows LAPS is the successor to the legacy Microsoft LAPS. In addition to new features such as encryption, it is now built into Windows (Windows 10, Windows 11, Server 2019, and above) and no longer requires the installation of additional software.

## Setup and Configuration

If your devices are managed by InTune, it is recommended to roll out LAPS using the [Windows LAPS Configuration Service Provider](https://learn.microsoft.com/en-us/windows/client-management/mdm/laps-csp) (CSP). Otherwise, you can deploy LAPS using Group Policy. 

Since the environment that I work in is not managed by InTune, I will be outlining the steps to deploy LAPS using Group Policy.

### Extend AD Schema

Open PowerShell on the domain controller and run the follow command:

```powershell
Update-LapsADSchema
```

You can verify the schema extension by opening a computer object's properties in ADUC. You should see a new LAPS tab.

### Configure GPO and Set Permissions

1. Open Group Policy Management Console.
2. Create a new Computer Policy in the OU where the computers to be managed are located.
3. Edit the policy and navigate to **Computer Configuration** > **Policies** > **Administrative Templates** > **System** > **LAPS**.
4. Grant the managed computers permission to update their password in AD with the following command:<br>
```powershell
Set-LapsADComputerSelfPermission -Identity "NEP_Computers"
```
1. Grant permission to read the LAPS password information stored in Active Directory. Domain Admins have this permission by default.<br>
```powershell
# Grant permission to a group
Set-LapsADReadPasswordPermission -Identity "NEP_Computers" -AllowedPrincipals "HelpDesk"

# Grant permission to specific users
Set-LapsADReadPasswordPermission -Identity "NEP_Computers" -AllowedPrincipals @("northeastprecast.com/user1", "user2@northeastprecast.com")
```

!!! note 

    If you don't see LAPS under **Administrative Templates** > **System**, copy the ADMX files from `C:\Windows\PolicyDefinitions` to your central store.

#### Policy Settings

`Post-authentication actions`

:   Specifies the grace period to wait after the managed account is authenticated before the password is reset and the account is automatically logged out. If disabled or no configured, the default is 24 hours.

`Password Settings`

:   Allows you to configure password complexity. By default, maximum complexity is used.

`Name of administrator account to manage`

:   Specifies the account name you intend to manage other than that identified by the well-known SID of the built-in administrator account. If you do not intend on managing another account or only renamed the built-in admin account, do not specify this setting.

`Enable password encryption`

:   Use this setting to enable encryption of passwords in Active Directory.

`Enable password backup for DSRM accounts`

:   Use this setting to enable backup of the DSRM account password on Windows Server Active Directory domain controllers. This setting is ignored unless password encryption is enabled.

`Do not allow password expiration time longer than required by policy`

:   Enabling this strictly enforces the age of the local admin account's password by not allowing it to drift beyond the specified age limit. It will be changed *immediately*.

`Configure size of encrypted password history`

:   Use this setting to configure how many previous encrypted passwords are remembered in Active Directory. Supported values are 0-12. The default is 0. This setting is ignored unless password encryption is enabled.

`Configure password backup backup directory`

:   Control which directory the password for the managed account is backed up to. If your computers *are note* Entra joined, choose Active Directory.

`Configure authorized password decryptors`

:   Use this setting to configure the name or security identifier (SID) of a user or group that can decrypt the password stored in Active Directory. This setting is ignored if the password currently is stored in Azure. If not specified, only members of the Domain Admins group in the device's domain can decrypt the password.

### Test and Verify

On a Windows 10 or 11 device, make sure the latest policy settings are applied. You can do this with either the `gpupdate` command or `Invoke-LapsPolicyProcessing`.

After the policy is retrieved, open the device's properties in ADUC and check the password field in the LAPS tab.

## Manage Clients

The Windows LAPS PowerShell module is now included in the Windows OS so there is no need to import a new module. For a full list of commands, see [here](https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-management-powershell#cmdlet-descriptions).

!!! note

    There is no LAPS UI as there was with the legacy Microsoft LAPS.

### Retrieving Passwords

```powershell
Get-LapsADPassword LAPSCLIENT

ComputerName        : LAPSCLIENT
DistinguishedName   : CN=LAPSCLIENT,OU=LapsTestOU,DC=laps,DC=com
Account             : Administrator
Password            : System.Security.SecureString
PasswordUpdateTime  : 4/9/2023 10:03:41 AM
ExpirationTimestamp : 4/14/2023 10:03:41 AM
Source              : CleartextPassword
DecryptionStatus    : NotApplicable
AuthorizedDecryptor : NotApplicable
```

This example demonstrates querying the current LAPS password for the `LAPSCLIENT` computer in the current domain. The password was stored in AD in clear-text form and didn't require decryption. The password was returned wrapped in a SecureString object.

```powershell
Get-LapsADPassword -Identity LAPSCLIENT -AsPlainText

ComputerName        : LAPSCLIENT
DistinguishedName   : CN=LAPSCLIENT,OU=LapsTestOU,DC=laps,DC=com
Account             : Administrator
Password            : k8P]Xl5T-ky!aj4s21el3S#.x44!e{8+,{L!M
PasswordUpdateTime  : 4/9/2023 10:03:41 AM
ExpirationTimestamp : 4/14/2023 10:03:41 AM
Source              : CleartextPassword
DecryptionStatus    : NotApplicable
AuthorizedDecryptor : NotApplicable
```

This example demonstrates querying the current LAPS password for the LAPSCLIENT computer in the current domain, requesting that the password be displayed in clear-text form. The password was stored in AD in clear-text form and didn't require decryption. The password was returned in clear-text form.

```powershell
Get-LapsADPassword -Identity LAPSCLIENT2 -Domain laps.com -AsPlainText

ComputerName        : LAPSCLIENT2
DistinguishedName   : CN=LAPSCLIENT2,OU=LapsTestEncryptedOU,DC=laps,DC=com
Account             : Administrator
Password            : q64!7KI3BOe/&S%buM0nBaW{B]261zN5L0{;{
PasswordUpdateTime  : 4/9/2023 9:39:38 AM
ExpirationTimestamp : 4/14/2023 9:39:38 AM
Source              : EncryptedPassword
DecryptionStatus    : Success
AuthorizedDecryptor : LAPS\LAPS Admins
```

This example demonstrates querying the current LAPS password for the LAPSCLIENT2 computer, in a specific AD domain (laps.com), requesting that the password be displayed in clear-text form. The password was stored in AD in encrypted form and was successfully decrypted.

!!! info

    When the user doesn't have permissions to decrypt the LAPS password, `Account` and `Password` are not returned and `DecryptionStatus` will be "Unauthorized".

### Resetting Passwords

It is recommended that you configure the policy to automatically reset the passwords after they are used, but you can also force a reset with PowerShell. This cmdlet must be run from the endpoint, otherwise you will need to run the command remotely with `Invoke-Command`.

```powershell
Reset-LapsPassword

# Run it on a remote computer
Invoke-Command -ComputerName LAPSCLIENT -ScriptBlock {Reset-LapsPassword}
```

!!! info 

    [Microsoft says](https://learn.microsoft.com/en-us/powershell/module/laps/reset-lapspassword?view=windowsserver2025-ps#description) that this command is intended and recommended only for rare situations that require immediate password rotation, for example as a response to a security breach.

## Auditing

To view the Windows LAPS event log channel, in Windows Server Event Viewer, go to **Applications and Services** > **Logs** > **Microsoft** > **Windows** > **LAPS** > **Operational**.

Event ID | Description
---------|-------------
10003    | Policy processing started
10004    | Policy processing completed successfully
10005    | Policy processing failed
10021    | Policy has been backed up to Active Directory
10022    | Policy has been backed up to Entra
10023    | Policy has been backed up to legacy LAPS
10018    | A password in Active directed has been updated
10020    | Local Domain Admin password updated
10029    | A password in Entra jas been updated
10031    | LAPS blocked an external request to modify the password
10041    | Successful authentication
10042    | Grace period expired, post-auth actions executed
10043    | Failed to rotate password
10044    | Password rotation successful

**Enable auditing**:

```powershell
Set-LapsADAuditing -Identity "NEP_Computers" -AuditedPrincipals "user@northeastprecast.com" -AuditType Success
OU=NEP_computers,DC=northeastprecast,DC=com

Set-LapsADAuditing -Identity "NEP_Computers" -AuditedPrincipals "user@northeastprecast.com" -AuditType Failure
OU=NEP_computers,DC=northeastprecast,DC=com
```

## Misc

# Windows LAPS

Adding this function to your powershell profile will enable you to use a quick one liner to retrieve and copy the local admin password of a computer to your clipboard in one swoop.

```powershell
function Get-AdmPw {
    param (
        [Parameter(Mandatory=$true)]
        [string]$ComputerName
    )

    # Get the LAPS password for the specified computer and copy it to the clipboard
    (Get-LapsADPassword -Identity $ComputerName).Password | Set-Clipboard
}
```

Example:

`Get-AdmPw ComputerName`