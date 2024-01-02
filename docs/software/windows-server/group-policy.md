# Group Policy

Group Policy is an infrastructure that allows you to specify managed configurations for users and computers through Group Policy settings and Group Policy Preferences. To configure Group Policy settings that affect only a local computer or user, you can use the Local Group Policy Editor. You can manage Group Policy settings and Group Policy Preferences in an Active Directory Domain Services (AD DS) environment through the Group Policy Management Console (GPMC). Group Policy management tools also are included in the Remote Server Administration Tools pack to provide a way for you to administer Group Policy settings from your desktop.

??? info "Group Policy Terminology"

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

## Processing Order and Precedence

It is very important to understand the order in which group policies are applied. It is even more important to understand the order of precedence. This will be critical in group policy design and troubleshooting.

1. Local Group Policy Object &larr; *Processed **FIRST** with **LEAST** precedence*
2. GPO linked to Site
3. GPO linked to the domain
4. GPO linked to an Organizational Unit &larr; *Processed **LAST** with **MOST** precedence*

!!! info

    The GPO that applies last has the most precedence. What this means is if two policies have the same settings, the GPO with the most precedence will be applied. This is because it is applied last and will overwrite the other policy settings.

!!! example "Example Scenario"

    We have two GPOs, the name and policy settings are below.

    1. **User – MSEdge Settings 1**: This GPO sets the home page to google.com. This GPO is applied to the Domain.
    2. **User – MSEdge Settings 2**: This GPO sets the home page to bing.com. This GPO is applied to an OU.

    ---

    - Forest: ad.northeastprecast.com
      - Domains
        - ad.northeastprecast.com
          - **[GPO]User MSEdge Settings 1** &larr; 
          - NEP Computers
          - NEP Groups
          - NEP Users
            - **[GPO]User MSEdge Settings 2** &larr; 
            - Accounting
            - HR
            - Inactive
            - IT
            -  . . .

    ??? question "Can you guess which homepage will be applied? (Expand for answer)"

        The "User MSEdge Settings 2" GPO takes precedence because it was applied last, so the answer is bing.com.

!!! note

    Remember, for any GPOs that have conflicting policy settings, the GPO with the most precedence will win.

## Managing Group Policies

The Group Policy Management Console (GPMC) is used to manage group policy. It is located in the start menu > Windows Administrative Tools.

1. **Domains**: Lists your domains and OU structure. Notice it does not show any AD containers, that is because GPOs can only be linked to the domains and OUs.
2. **Linked GPOs**: If an OU has a linked policy, it will be listed under that OU.
3. **Group Policy Objects**: Lists all GPOs, linked and unlinked.

!!! example
      - Forest: ad.northeastprecast.com
       - **Domains** &larr; **(1)**
         - ad.northeastprecast.com
           - [GPO]Default Domain Policy
           - NEP Computers
           - NEP Groups
           - NEP Users
             - **[GPO]User MSEdge Settings** &larr; **(2)**
             - Accounting
             - HR
             - Inactive
             - IT
             - . . .
          - **Group Policy Objects** &larr; **(3)**
              - [GPO] Default Domain Policy
              - [GPO] User MSEdge Settings
              - [GPO] Another Policy
              - [GPO] . . .
          - WMI Filters
          - Starter GPOs

When you select a GPO, the details will be displayed on the right side of the screen.

- **Scope**: Shows all of the sites, domains and OUs linked to the GPO.
- **Details**: Shows basic infomartion about the GPO like when it was created an last modified.
- **Settings**: Displays the policies configured by the GPO.
- **Delegation**: Lists the permissions of the GPO.

### Create a GPO

1. Right-Click on an OU and select "Create a GPO in this domain, link it here"
2. Give the GPO a name
3. The GPO is created, but has no policies. Right-Click on the GPO and select "edit" to configure them.
4. Change the policy settings to "Enabled" and click "OK".

## Group Policy Preferences

Group policy preferences are comprised of initial configurations that can be changed by an end userr. For example, a GPO preference can create a shortcut on the user's desktop but allow the user to delete it if they want to. GPO preferences differ from policy settings because users cannot modify the policy settings.

GPO preferences are typically used for things like:

- Mapping network drives
- Installing helpful, but not required software
- Wallpaper/screen saver settings
- Desktop shortcuts

### Item-Level Targeting

GPO preferences include a filtering option called "Item-Level targeting". This gives you granular control over what objects (users or computers) the GPO applies to.

Examples:

- Tartget computers with a specific OS
- Target computers by IP
- Target a security group

### Create a GPO preference with Item-Level targeting

In this example, we'll create a new GPO preference that adds a desktop shortcut. We'll also use item-level targeting to apply the GPO to a security group.

1. Create and link a new GPO
2. Edit the GPO and browse to User Configuration > Preferences > Windows Settings
3. Right-Click "Shortcuts", select "New" and then "Shortcut"
4. Click on the "Common" tab and select "Item-level targeting"
5. Click on the "Targeting..." button
6. Select "New Item" > "Security group"
7. Select the group you want to target and click OK

## Group Policy Security Filtering

Group policy security filtering allows you to control what users and computers a GPO is applied to. Each GPO has a security filtering section in the "Scope" tab and by default, all authenticated users have the right to apply the GPO.

### Exclude users from a GPO using security filtering

1. Select a GPO and click the "Delegation" tab on the right.
2. Click the "Advanced..." button in the lower right of the window.
3. Click the "Add..." button and add your security group.
4. Under permissions, select "Deny" for "apply group policy"

### Apply a GPO to specific Users or Computers with security filtering

1. Create a security group for the users or computers
2. Go to the desired GPO and then Security Filtering (Remember, bottom pane of the "Scope" tab when you click on the GPO)
3. Click "Add..." and select your group
4. Now click on the "Delegation" tab and then the "Advanced..." button
5. For “Authenticated Users” uncheck “Apply group policy”. But make sure “read” is still checked.

## Troubleshooting Group Policy

### Things that often lead to group policy issues

- Too many settings into one big GPO
- Using block inheritance
- Using loopback processing
- Changing delegation permissions
- Poor OU design

### Troubleshooting Steps

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

## GPO Best Practices

### 1. Do Not Modify the Default Domain Policy

This GPO should only be used for account policy settings, password policy, account lockout policy, and Kerberos policy. Any other settings should be put into a separate GPO. The Default Domain Policy is set at the domain level so all users and computers get this policy. The Default Domain Policy is linked to the root of the domain.

!!! tip

    When you put multiple GPO settings into the default domain policy it becomes very difficult to troubleshoot and control GPO settings. It can also impact performance if the GPO has too many settings and every user and computer has to process them. It is best to use small GPOs (see tip #12) than to stuff everything into one big GPO.

### 2. Do Not Modify the Default Domain Controller Policy

This GPO should only contain the User Rights Assignment Policy and Audit Policy. Any other settings to the Domain Controllers should be set in a separate GPO.

!!! info

    The Default Domain Controller policy is linked to the Domain Controller OU.

### 3. Good OU Design Will Make Your Job 10x Easier

A good OU design makes it easier to apply and troubleshoot group policy. It is best to create an OU for computers and a separate OU for users. Then create sub-OUs on how you want to manage your objects. Its common to organize objects by department and functionality.

!!! example
   - Forest: ad.northeastprecast.com
     - Domains
        - ad.northeastprecast.com
        - NEP Computers
        - NEP Groups
        - NEP Users
            - Accounting
            - HR
            - Inactive
            - IT
            - Legal
            - Management
            - Marketing
            - Operations
            - PR
            - Purchasing
            - test-build1
            - test-build2

!!! tip

    Putting users and computers in separate OUs makes it easier to apply computer policies to all the computers and user policies to only the users.

### 4. Do Not Set GPOs at the Domain Level

The only GPO that should be set at the domain (root) level is the Default Domain Policy. Anything set at the domain level will get applied to all user and computer objects. This could lead to all kinds of settings getting applied to objects that you don’t want. It’s better to apply the policies at a more granular level.

!!! example
   - Forest: ad.northeastprecast.com
    - Domains
      - ad.northeastprecast.com
      - [GPO]Some-Policy &larr; **Nope, don't do this**
        - NEP Computers
        - NEP Groups
        - NEP Users
        - . . .

### 5. Apply GPO's to The Root of an OU

Applying GPOs at the root of an OU will allow the sub-OUs to inherit these policies. This way you don’t need to link a policy to each individual OU.

!!! example
   - Forest: ad.northeastprecast.com
    - Domains
      - ad.northeastprecast.com
        - NEP Computers
        - NEP Groups
        - NEP Users
          - [GPO]User MSEdge Settings &larr; **Link to the root of the OU. Sub-OUs will inherit.**
          - Accounting
          - HR
          - Inactive
          - IT
          -  . . .

### If you want to exclude OUs or a group of users you have a few options

1. Best option: Use GPO Security Filtering.
2. Use item-level targeting.
3. Apply a GPO to the group that disables the policy.

Lets say that we have a GPO that disables saving passwords in the Edge browser, the GPO is linked to all users (like in the AD tree example above).

What if we have users in various departments that we don't want this policy applied to? The solution best is GPO security filtering. 

We create a security group, add users to the group, and then deny this group from applying the group policy. Now all the users except the ones in the security group will process the GP.

### 6. Avoid Using Blocking Policy Inheritance and Policy Enforcement

If we have a good OU structure then we can most likely avoid the use of blocking policy inheritance and using policy enforcement. Some find it much easier to manage and troubleshoot group policies knowing neither of these is set in the domain.

### 7. Don’t Disable GPOs

If a GPO is linked to an OU and we don’t want it to be, delete it instead of disabling it. Deleting the link from an OU will not delete the GPO, it just removes the link from the OU. Disabling the GPO will stop it from being processed entirely on the domain, and this could cause problems.

### 8. Use Descriptive GPO Names

Being able to quickly identify what a GPO is for based on the name will make group policy administration much easier. Giving the GPOs a generic name like “laptop settings” is too generic and will confuse people.

!!! example "Examples"

   - [User]Browser-Settings
   - [User]Office365-Settings
   - [Computer]Screen-Lock-On
   - [Computer]Install-Adobe-Acrobat

### 9. Speed Up GPO Processing by Disabling Unused Computer and User Configurations

Lets say, for example, we have a GPO called "browser settings". It only has computer settings configured and no user settings so, we can disable the User configuration for this GPO. This will speed up group policy processing.

To disbale the computer or user configurations of a GPO:

1. Browse to Group Policy Objects
2. Right Click a GPO and select GPO Status
3. Select one of the options
    - Enabled
    - User Configuration Settings Disabled &larr; **This would be the option to choose for our scenario above**
    - Computer Configuration Settings Disabled
    - All Settings Disabled

### 10. Use Loopback Processing for Specific Use Cases

Loopback processing, in a nutshell, takes user settings and limits those settings to a computer the GPO is applied to. It is very useful but can also cause issues if used incorrectly. A common use of loopback processing is on terminal servers and Citrix servers. Users are logging into a server and you need specific user settings applied when they log into only those servers. You would need to create a GPO, enable loopback processing and apply it to the OU that has the servers in it.

### 11. Group Policy Change Management

Group policy can get way out of control if you let all your administrators make changes as they feel necessary. One little GPO change could send a flood of calls to the helpdesk. It happens, so it’s best to discuss and document changes to GPOs.

### 12. Use Small GPOs to Simplify Administration

It can be easy to fall into the trap of stuffing everything into one GPO. There really is no reason to do this, many small GPOs do not affect performance. Small GPOs make troubleshooting, managing, designing, and implementing 10x easier.

!!! example "Examples of ways to split up GPOs into smaller policies"

   - Browser Settings
   - Security Settings
   - Power Settings
   - Microsoft Office Settings
   - Network Settings
   - Drive Mappings
   - Power Settings
   - Bitlocker
   - Applocker
   - Firewall rules
   - and so on...

### 13. Best Practices for Group Policy Performance

Here are some settings that can cause slow startup and logon times:

- Login scripts downloading large files
- Startup scripts downloading large files
- Mapping home drives that are far away
- Deploying huge printer drivers over group policy preferences
- Overuse of group policy filtering by AD group membership
- Using excessive WMI filters
- Lots and lots of GPOs linked to a user or computer over a slow link.

### 14. Group Policy Troubleshooting Tips

Know how to use the [RSoP](https://activedirectorypro.com/how-to-use-rsop-to-check-and-troubleshoot-group-policy-settings/) and [GPResult](https://activedirectorypro.com/gpresult-tool/) commands to verify and troubleshoot group policy. When troubleshooting you need a way to verify that GPOs are getting applied and check exactly what policies are applied. These two commands are a huge lifesaver.

### 15. Backup GPOs

This should go without saying, but if you're not backing up Active Directory or doing system state backup then you need to start backing up your GPOs . . .