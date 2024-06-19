# GPO Best Practices

## 1. Do Not Modify the Default Domain Policy

This GPO should only be used for account policy settings, password policy, account lockout policy, and Kerberos policy. Any other settings should be put into a separate GPO. The Default Domain Policy is set at the domain level so all users and computers get this policy. The Default Domain Policy is linked to the root of the domain.

!!! tip

    When you put multiple GPO settings into the default domain policy it becomes very difficult to troubleshoot and control GPO settings. It can also impact performance if the GPO has too many settings and every user and computer has to process them. It is best to use small GPOs (see tip #12) than to stuff everything into one big GPO.

## 2. Do Not Modify the Default Domain Controller Policy

This GPO should only contain the User Rights Assignment Policy and Audit Policy. Any other settings to the Domain Controllers should be set in a separate GPO.

!!! info

    The Default Domain Controller policy is linked to the Domain Controller OU.

## 3. Good OU Design Will Make Your Job 10x Easier

A good OU design makes it easier to apply and troubleshoot group policy. It is best to create an OU for computers and a separate OU for users. Then create sub-OUs on how you want to manage your objects. Its common to organize objects by department and functionality.

!!! example "Example"

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

## 4. Do Not Set GPOs at the Domain Level

The only GPO that should be set at the domain (root) level is the Default Domain Policy. Anything set at the domain level will get applied to all user and computer objects. This could lead to all kinds of settings getting applied to objects that you don’t want. It’s better to apply the policies at a more granular level.

!!! example "Example"

      - Forest: ad.northeastprecast.com
       - Domains
         - ad.northeastprecast.com
         - [GPO]Some-Policy &larr; **Nope, don't do this**
           - NEP Computers
           - NEP Groups
           - NEP Users
           - . . .

## 5. Apply GPO's to The Root of an OU

Applying GPOs at the root of an OU will allow the sub-OUs to inherit these policies. This way you don’t need to link a policy to each individual OU.

!!! example "Example"

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

If you want to exclude OUs or a group of users you have a few options:

1. Best option: Use GPO Security Filtering.
2. Use item-level targeting.
3. Apply a GPO to the group that disables the policy.

Lets say that we have a GPO that disables saving passwords in the Edge browser, the GPO is linked to all users (like in the AD tree example above).

What if we have users in various departments that we don't want this policy applied to? The solution best is GPO security filtering. 

We create a security group, add users to the group, and then deny this group from applying the group policy. Now all the users except the ones in the security group will process the GP.

## 6. Avoid Using Blocking Policy Inheritance and Policy Enforcement

If we have a good OU structure then we can most likely avoid the use of blocking policy inheritance and using policy enforcement. Some find it much easier to manage and troubleshoot group policies knowing neither of these is set in the domain.

## 7. Don’t Disable GPOs

If a GPO is linked to an OU and we don’t want it to be, delete it instead of disabling it. Deleting the link from an OU will not delete the GPO, it just removes the link from the OU. Disabling the GPO will stop it from being processed entirely on the domain, and this could cause problems.

## 8. Use Descriptive GPO Names

Being able to quickly identify what a GPO is for based on the name will make group policy administration much easier. Giving the GPOs a generic name like “laptop settings” is too generic and will confuse people.

!!! example "Examples"

      - [User]Browser-Settings
      - [User]Office365-Settings
      - [Computer]Screen-Lock-On
      - [Computer]Install-Adobe-Acrobat

## 9. Speed Up GPO Processing by Disabling Unused Computer and User Configurations

Lets say, for example, we have a GPO called "browser settings". It only has computer settings configured and no user settings so, we can disable the User configuration for this GPO. This will speed up group policy processing.

To disbale the computer or user configurations of a GPO:

1. Browse to Group Policy Objects
2. Right Click a GPO and select GPO Status
3. Select one of the options
    - Enabled
    - User Configuration Settings Disabled &larr; **This would be the option to choose for our scenario above**
    - Computer Configuration Settings Disabled
    - All Settings Disabled

## 10. Use Loopback Processing for Specific Use Cases

Loopback processing, in a nutshell, takes user settings and limits those settings to a computer the GPO is applied to. It is very useful but can also cause issues if used incorrectly. A common use of loopback processing is on terminal servers and Citrix servers. Users are logging into a server and you need specific user settings applied when they log into only those servers. You would need to create a GPO, enable loopback processing and apply it to the OU that has the servers in it.

## 11. Group Policy Change Management

Group policy can get way out of control if you let all your administrators make changes as they feel necessary. One little GPO change could send a flood of calls to the helpdesk. It happens, so it’s best to discuss and document changes to GPOs.

## 12. Use Small GPOs to Simplify Administration

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

## 13. Best Practices for Group Policy Performance

Here are some settings that can cause slow startup and logon times:

- Login scripts downloading large files
- Startup scripts downloading large files
- Mapping home drives that are far away
- Deploying huge printer drivers over group policy preferences
- Overuse of group policy filtering by AD group membership
- Using excessive WMI filters
- Lots and lots of GPOs linked to a user or computer over a slow link.

## 14. Group Policy Troubleshooting Tips

Know how to use the [RSoP](https://activedirectorypro.com/how-to-use-rsop-to-check-and-troubleshoot-group-policy-settings/) and [GPResult](https://activedirectorypro.com/gpresult-tool/) commands to verify and troubleshoot group policy. When troubleshooting you need a way to verify that GPOs are getting applied and check exactly what policies are applied. These two commands are a huge lifesaver.

## 15. Backup GPOs

This should go without saying, but if you're not backing up Active Directory or doing system state backup then you need to start backing up your GPOs . . .