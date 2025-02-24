# Windows LAPS

Windows LAPS is the successor to the legacy Microsoft LAPS. Aside from the new features that come with it, it is now built into Windows (Win 10, Win 11, Server 2019 and above).

## Setup and Configuration

If your devices are managed by InTune, it is recommended to roll out LAPS using the Windows LAPS Configuration Service Provider (CSP). Otherwise, you can deploy LAPS using a local Active Directory. 

Since the environment hat I work in is not managed by InTune, I will be outlining the steps to deploy LAPS using Active Directory.

### Extend AD Schema

Open PowerShell on the domain controller and run the follow command:

```powershell
Update-LapsADSchema
```

You can verify the schema extension by opening a computer object's properties in ADUC. You should see a new LAPS tab.

### Set Permissions

Give the computers permission to update their password in AD with the following command:

```powershell
Set-LapsADComputerSelfPermission -Identity <OU_Name>
```

### Configure Group Policy

1. Open Group Policy Management Console.
2. Create a anew Computer Policy in the OU where the computers are located.
3. Edit the policy and navigate to **Computer Configuration** > **Policies** > **Administrative Templates** > **System** > **LAPS**.

#### Configure the Settings

`Post-authentication actions`

:   

`Password Settings`

:

`Name of administrator account to manage`

:

`Enable password encryption`

:

`Enable password backup for DSRM accounts`

:

`Do not allow password expiration time longer than required by policy`

:

`Configure size of encrypted password history`

:

`Configure password backup backup directory`

:

`Configure authorized password decryptors`

: