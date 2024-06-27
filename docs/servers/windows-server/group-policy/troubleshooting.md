# Troubleshooting Group Policy

## Things that often lead to group policy issues

- Too many settings into one big GPO
- Using block inheritance
- Using loopback processing
- Changing delegation permissions
- Poor OU design

## Troubleshooting Steps

1. The `gpupdate` command
    - On a computer that has GPO issues, log in and run `gpupdate /force`. The `/force` command reapplies all policy settings. 
2. Check sysvol access
    - From a client computer test access to the sysvol directory by typing in the UNC path to your domain controller. Our domain controller hostname is "DC1" so the UNC path is \\DC1. 
    - Click on SYSVOL, your domain and then policies. 
    - You should see a list of folders with random numbers and letters. These are teh GPOs. 
3. Check the event log
4. The `GPResult` command
    - This command will show you which group policies are applied to a user and computer. To see computer GPOs you must run the command as an admin. To see just user GPOs run the command as a regular logged in user.
    - Run `gpresult /r`
5. Using RSPO (Resultant Set of Policy)
    - Onyl use this command if you have verified the GPOs are applied with the gpresult command.
    - This command will show you what policy changes are being made from the applied GPOs. 
6. GPO order of precedence
    - Maybe you have no errors, all GPOs are applied as expected but the policy is still wrong. 
    - Did you check the GPO order of precedence in the management console?
    - Remember the last GPO applied takes precedence. Another way to think of it is the GPO that is closest to the object (user or computer) wins.