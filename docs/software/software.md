# Windows Server

## Active Directory Domain Services (AD DS)

!!! info
      A directory is a hierarchical structure that stores information about objects on the network. A directory service, such as Active Directory Domain Services (AD DS), provides the methods for storing directory data and making this data available to network users and administrators. For example, AD DS stores information about user accounts, such as names, passwords, phone numbers, and so on, and enables other authorized users on the same network to access this information.

## AD Design Tips

### 1. KISS

Keep things simple. AD is flexible...Just because you can use somehting doesn't mean you should. Keeping things as simple as possible increases efficiency and makes things easier to troubleshoot.

### 2. Use the approporiate site topology

Despite the tip above, you shouldn't shy away from creating complex structures *when appropriate*. Site topology should always mirror network topology. Portions of the network that are highly connected should fall within a single site. Site links should mirror WAN connections, with each physical facility that is separated by a WAN link encompassing a separate Active Directory site.

### 3. Dedicated domain controllers

Avoid having a domain controller pull double duty. Whenever possible, your domain controllers should run on dedicated servers (physical or virtual). Adding additional roles can affect the server's performance and complicate the process of backing up or restoring the server.

### 4. Have at least two DNS servers

The problem with this is that Active Directory is totally dependent upon the DNS services. If you have a single DNS server, and that DNS server fails, Active Directory will cease to function.

### 5. Avoid putting all your eggs in one basket (virtualization)

The redundancy of multiple domain controllers is often circumvented by server virtualization. There is nothing wrong with virtualizing your domain controllers, but you should scatter the domain controllers across multiple host servers. (Failover Cluster).

### 6. Don't neglect the FSMO roles (backup)

Some domain controllers are more important than others. Domain controllers that are hosting Flexible Single Master Operations (FSMO) roles are critical to Active Directory health. Active Directory is designed so that if a domain controller that is hosting FSMO roles fails, AD can continue to function — for a while. Eventually though, a FSMO domain controller failure can be very disruptive. I have heard some IT pros say that you don’t have to back up every domain controller on the network because of the way Active Directory information is replicated between domain controllers. While there is some degree of truth in that statement, backing up FSMO role holders is critical.

### 7. Plan your domain structure and stick to it

Most organizations start out with a carefully orchestrated Active Directory architecture. As time goes on, however, Active Directory can evolve in a rather haphazard manner. To avoid this, it is recommended to plan in advance for eventual Active Directory growth. You may not be able to predict exactly how Active Directory will grow, but you can at least put some governance in place to dictate the structure that will be used when it does.

### 8. Have a management plan in place before you start setting up servers

Who will administrator Active Directory? Will one person or team take care of the entire thing or will management responsibilities be divided according to domain or organizational unit? These types of management decisions must be made before you actually begin setting up domain controllers.

### 9. Avoid making major logistical changes

Its recommended that you avoid restructuring your Active Directory if possible. Its possible that the restructuring process can result in some Active Directory objects being corrupted, especially when moving objects between domain controllers running differing versions of Windows Server.

### 10. Place at least one global catalog server in each site

If you are operating an Active Directory consisting of multiple sites, make sure that each one has its own global catalog server. Otherwise, Active Directory clients will have to traverse WAN links to look up information from a global catalog.

## Active Directory Groups Explained

!!! note
      Microsoft's naming of these groups is confusing in my opinion. When I began learning about AD, I was left scratching my head trying to figure out when to use one group over another. With this document, I aim to clear up any confusion about the different use cases of groups in AD.

### Group Type

There are two different group types that you can create in AD - Distribution Groups and Security Groups.

#### Distribution Groups

This group type serves one purpose - To send email to collections of users by using an email application like Exchange Server. Distribution groups aren't security enabled, so you can't include them in DACLs.

**Use case scenario**: Your company's sales department has gotten quite large and the sales manager wants to be able to email everyone in the their department using some type of "mailing list", as they describe it. Remembering all the sales persons email addresses has become difficult.

You already have an AD and Exchange server, so you create a distribution group in AD called "All_Sales" that includes the user objects of all Sales personell. Now your Exchange server will have access to a distribution group that contains all the email addresses of that department. The sales manager will be able to use this distribution list in Outlook when composing a new email.

#### Security Groups

This group type provides a way to assign access to resources on your network. You can do the following by using security groups:

- Assign user rights
  - Assigning user rights to a security group determines what members of that group can do within the scope of a domain or forest. AD has some built-in security groups designed to help administrators delegate a person's administrative role in a domain. For example, the "Backup Operators" group in AD can backup and restore files and directories that are located on each domain controller in the domain. The user can complete these actions because, by default, the user rights Backup files and directories and Restore files and directories are automatically assigned to the Backup Operators group. Therefore, members of this group inherit the user rights that are assigned to that group.
- Assign permissions for resources
  - Permissions are different from user rights. Permissions are assigned to a security group for a shared resource. Permissions determine who can access the resource and the level of access, such as Full control or Read. Security groups are listed in Discretionary Access Control Lists (DACLs) that define permissions on resources and objects. When administrators assign permissions for resources like file shares or printers, they should assign those permissions to a security group instead of to individual users. The permissions are assigned once to the group instead of multiple times to each individual user. Each account that's added to a group receives the rights that are assigned to that group in Active Directory. The user receives permissions that are defined for that group.

> By the way, you can use a security group as an email entity. Sending an email to a security group messages all the members of that group.

### Group Scope

!!! note inline end
      Remember when I said that Microsoft's naming of these groups is confusing? This is specifically what I was talking about. At first glance, for me anyway, its hard to tell exactly what objectives the "universal", "global" or "domain local" scopes achieve. I think its easier to to think of Domain Local Groups as *Resource Groups* and Global Groups as *Account Groups*. I'll get into that a bit more in the following sections.

Each group has a scope that identifies the extent to which the group is applied in the domain tree or forest. The scope defines where in the network permissions can  be granted for the group. The three group scopes are Universal, Global and Domain Local.

!!! info
      In addition to these three scopes, the default groups in the Builtin container have a group scope of Builtin Local. This group scope and group type can't be changed.

#### The Universal Scope

| Can Grant Permissions                                | Possible Members                                    | Possible Member of...                                            |
|------------------------------------------------------|-----------------------------------------------------|------------------------------------------------------------------|
| On any domain in the same forest or trusting forests | Accounts from any domain in the same forest         | Other Universal Groups in the same forest                        |
|                                                      | Global Groups from any domain in the same forest    | Domain Local Groups in the same forest or trusting forests       |
|                                                      | Universal groups from any domain in the same forest | Local Groups on computers in the same forest or trusting forests |

!!! note
      As you've just read, groups can be nested. A group can be a member of another group.

**Use case scnarios**: As of writing this, I can't quite think of a good use case scenario nor could I find one. However, what I do know is that in multi-domain forests, Universal Groups may be used to gather Global Groups from many domains into a single group that can be added to the appropriate Domain Local Group. In practice, many single-domain organizations don't bother with Universal Groups anyway.

#### The Global Scope

| Can Grant Permissions                                           | Possible Members                   | Possible Member of...                                  |
|-----------------------------------------------------------------|------------------------------------|--------------------------------------------------------|
| On any domain in the same forest or trusting domains or forests | Accounts from the same domain      | Universal groups from any domain in the same forest    |
|                                                                 | Global groups from the same domain | Global groups from the same domain                     |
|                                                                 |                                    | Domain Local groups from any domain in the same forest |

!!! note
      Like I mentioned before, I like to think of groups with the Global scope as *Account Groups* - A collection of domain users into a single group.

**Use case scenario**: The IT department has grown at your organization and its no longer just you (the sysadmin) and your manager. You now have a couple of entry level techs that will handle general Help Desk tasks. Your manager wants you to come up with a way to grant basic access/permissions to these Help Desk users.

The solution here would be to create a global security group in AD and name it something like IT_HelpDesk. Then add all of the Help Desk Agents as members of this group. This group would act as a container for all of your HelpDesk users. You can then make the IT_HelpDesk group a member of one or more Domain Local groups. This will allow you to start delegating access/premissions to those specific users in the group. We'll touch on that in the next section.

#### The Domain Local Scope

| Can Grant Permissions  | Possible Members                                                                           | Possible Member of...                                                     |
|------------------------|--------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Within the same domain | Accounts from any domain or any trusted domain                                             | Other Domain Local groups from any domain in the same forest              |
|                        | Global groups from any domain or any trusted domain                                        | Other Global groups from the same domain                                  |
|                        | Universal groups from any domain in the same forest                                        | Domain Local groups from any domain in the same forest or trusting domain |
|                        | Other Domain Local groups from the same domain                                             |                                                                           |
|                        | Accounts, Global groups, and Universal groups from other forests and from external domains |                                                                           |

> After having a look at the above table, you'll notice that you can place almost any account or group from almost any location into a Domain Local group. This scope also only grants permissions within the same domain that it is created in. This is why I like to think of this scope as a "Resource Group". You can grant a wide range of accounts and groups access to resources that exist only inside of its domain.

**Use case scenario**: Now that you've created a Global security group specifically for your Help Desk, you can work on delegating the different types of access and permissions your manager wants to allow for these users. One of these is resetting user passwords.

Assuming that you already have a well designed OU structure in your AD, you can create a Domain Local security group and delegate control over the "NEP_Users" OU where all of your user account objects live. This delegation of control would only allow the resetting of user passwords. You could name this Domain Local group something like "IT_HelpDesk_Allow_Password_Reset". Its a long name, I know, but it helps if your group names are specific. You would then add the "IT_HelpDesk" group as a member. In turn, all the users of "IT_HelpDesk" would be granted the ability to reset user passwords.

> By the way . . . The reason why we nest groups in this fashion is to make managing users and groups easier. If you or your manager decide that the Help Desk should no longer be able to reset passwords, just remove the "IT_HelpDesk" group from the "IT_HelpDesk_Desk_Allow_Password_Reset" group. You can add and remove that *Account Group* from as many or little *Resource Groups* as you want.

### Wrapping Up

If you think of Domain Local groups as *Resource Groups* and Global Groups as *Account Groups*, I think you'll have an easier time delegating control in AD.

As *Resource Groups*, Domain Local groups should be used to grant access to IT resources in a domain, and as *Account Groups*, Global groups should be used to collect specific users of a domain into a group.

### Resources

- <https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-groups>
- <https://community.spiceworks.com/topic/306028-when-to-use-a-domain-local-group-versus-global-group>
- <https://livebook.manning.com/book/learn-active-directory-management-in-a-month-of-lunches/chapter-4/ch04lev2sec1>

---

## Data Deduplication

A Windows Server feature that helps to reduce the impact of redundant data on storage costs. It works by identifying and removing duplicate data "chunks". Duplicated chunks are stored once and referenced by pointers.

DDPEval can evaluate the potential for optimization against directly connected volumes (including local drives or Cluster Shared Volumes) and mapped or unmapped network shares. Found at C:\Windows\System32\DDPEval.exe after install.

- Dedup works on NTFS for 2012+ or ReFS for 2019+
- Anything smaller than 32KB are not considered for deduplication.
- Software development shares can benefit from Dedup because many binaries remain essentially unchanged from build to build.
- Dedup supports volumes up to 64TB.
- Dedup supports files up to 1TB.
- Dedup works with Cluster OS Rolling Upgrades.
- Dedup optimizes data by using a post-processing model. All data is written unoptimized to the disk and then optimized later by Data Deduplication.
- During the the "optimization" process, files are divided into chunks no more than 128KB, then matching chunks are calculated and extra copies of the chunks are deleted (they are replaced with links called reparse points).
- The main duplication results (chunk store) are located entirely in the "System Volume Information" folder in the root of the disk.
- Optimization should not change access semantics Users and applications that access data on an optimized volume are completely unaware that the files they are accessing have been deduplicated.
- When you delete a file, only the data links are deleted. The chunks themselves remain on disk until garbage collection is performed. Garbage collection runs on a schedule, but can be run manually via powershell.
      - It's worth mentioning that, without backups, your file recovery window is limited to the garbage collection schedule. If you delete a file and garbage collection runs 2 days later, you have 2 days to recover the file using 3rd-party software.
- Modifications of deduplicated files gets written unoptimized to the disk, then optimized later the next time the Optimization job runs.
- Will not optimize in use files.
- Will not optimize partial files.
- Historical outcomes of Dedup are recorded to the event log.
- All jobs can be manually run via powershell and the default schedules can be adjusted.
- In a cluster environment, Dedup must be enabled on all nodes.
- Manually starting Dedup jobs must be run on the Owner node of the CSV.
- Windows server backup can back up an optimized volume (that is, without removing deduplicated data).
- Running robocopy with Dedup is not recommended because it can corrupt the chunk store.
- Dedup can starve VMs so it is recommended to run the jobs during off-peak hours.
- Windows search doesn't support Dedup. Windows serarch can't index reparse points, so it skips all duplicated files, excluding them from the index.
- Dedup should have 300MB + 50MB of memory for each TB of logical data. If you are optimizing a 10TB volume, you would need a minimum need 800MB of memory aollocated for dedup. Optimally, you should have 1GB of memory for every 1TB of logical data.
- Files extensions and folders can be excluded per volume.
- Portability: Any volume under Dedup runs as an automtic unit. The volume can be backed up and moved to a different location. The only thing that you need to change is the schedule timings becasue the native task scheduler controls the jobs.
- If the new location is not running the Dedup feature, you can only access the files that have not been deduplicated.
- Fragmentations created by deduplication are stored on the disk as file segments that are spread all over, increasing the seek time.
- Upon the processing of each file, the filter driver will work overtime to maintain the sequence by keeping the segments together in a random fashion.
- Deduplication keeps a file cache to avoid repeating file segments, helping in their quick access. In case multiple users access the same resource simultaneously, that access pattern enables speeding up of the deduplication for each user.

## Jobs

| Job Name           | Description | Default Schedule |
|--------------------|-------------|------------------|
| Optimization       | Deduplicates by chunking data and storing in the chunk store | Hourly |
| Garbage Collection | Reclaims space by deleting uneeded chunks that are no longer being referenced by files that have been modified or deleted | Sat @ 2:35 AM |
| Scrubbing          | Identifies corrupt chunks in the store & when possible, will reconstruct the corrupt data. Popular copies of chunks are kept when they are referenced more than 100 times. | Sat @ 3:35 AM |
| Unoptimization     | Undoes optimization and disables Dedup. | On-demand only |

## References

<https://learn.microsoft.com/en-us/windows-server/storage/data-deduplication/overview>
<https://blog.foldersecurityviewer.com/windows-server-deduplication/>

[Example of what the chunk store looks like](https://community.spiceworks.com/topic/2108623-dedup-chunkstore-is-massive) + a discussion on why the chunk store is so large for this user.

---

## Group Policy

### Definitions

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

### Group Policy Process Order

It is very important to understand the order in which group policies are applied. It is even more important to understand the order of precedence. This will be critical in group policy design and troubleshooting.

#### GPO Processing Order

1. Local Group Policy Object &larr; **LEAST precedence**
2. GPO linked to Site
3. GPO linked to the domain
4. GPO linked to an Organizational Unit &larr; **MOST precedence**

> The GPO that applies last has the most precedence. What this means is if two policies have the same settings, the GPO with the most precedence will be applied. This is because it is applied last and will overwrite the other policy settings.

#### Example

We have two GPOs, the name and policy settings are below.

1. **User – MSEdge Settings**: This GPO sets the home page to google.com. This GPO is applied to the Domain.
2. **User – MSEdge Settings 2**: This GPO sets the home page to bing.com. This GPO is applied to an OU.

!!! example
      - Forest: ad.northeastprecast.com
       - Domains
         - ad.northeastprecast.com
           - **[GPO]User MSEdge Settings** &larr; 
           - NEP Computers
           - NEP Groups
           - NEP Users
             - **[GPO]User MSEdge Settings 2** &larr; 
             - Accounting
             - HR
             - Inactive
             - IT
             -  . . .

Can you guess which homepage will be applied?

The "User - MSEdge Settings 2" GPO has the most precedence because it was applied last, so the answer is bing.com.

> So remember, for any GPOs that have conflicting policy settings, the GPO with the most precedence will win.

### Managing Group Policies

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

#### To create a GPO

1. Right-Click on an OU and select "Create a GPO in this domain, link it here"
2. Give the GPO a name
3. The GPO is created, but has no policies. Right-Click on the GPO and select "edit" to configure them.
4. Change the policy settings to "Enabled" and click "OK".

### Group Policy Preferences

Group policy preference are ised to an initial configuration but allows user to change them. For exampl, a GPO preference can create a shortcut on the user's desktop but allow the user to delete it.

GPO preferences differ from policy settings because users cannot modify the policy settins.

#### GPO Preferences are primarily used for things like

- Mapping network drives
- Installing software
- Installing printers
- Desktop shortcuts

#### Item-Level Targeting

GPO preferences include a filtering option called "Item-Level targeting". This gives you granular control ver what objects (users or computers) the GPO applies to.

#### Examples:

- Tartget computers with a specific OS
- Target computers by IP
- Target a security group

#### To create a GPO using preference and Item-Level targeting

In this example, we'll create a new GPO preference that adds a desktop shortcut. We'll also use item-level targeting to apply the GPO to a security group.

1. Create and link a new GPO
2. Edit the GPO and browse to User Configuration > Preferences > Windows Settings
3. Right-Click "Shortcuts", select "New" and then "Shortcut"
4. Click on the "Common" tab and select "Item-level targeting"
5. Click on the "Targeting..." button
6. Select "New Item" > "Security group"
7. Select the group you want to target and click OK

### Group Policy Filtering

Group policy security filtering allows you to control what users and computers a GPO is applied to. Each GPO has a security filtering section in the "Scope" tab and by default, all authenticated users have the right to apply the GPO.

#### How to exclude users from a GPO using security filtering

1. Select a GPO and click the "Delegation" tab on the right.
2. Click the "Advanced..." button in the lower right of the window.
3. Click the "Add..." button and add your security group.
4. Under permissions, select "Deny" for "apply group policy"

#### How to apply a GPO to specific Users or Computers with security filtering

1. Create a security group for the users or computers
2. Go to the desired GPO and then Security Filtering (Remember, bottom pane of the "Scope" tab when you click on the GPO)
3. Click "Add..." and select your group
4. Now click on the "Delegation" tab and then the "Advanced..." button
5. For “Authenticated Users” uncheck “Apply group policy”. But make sure “read” is still checked.

### Troubleshooting Group Policy

#### Things that often lead to group policy issues

- Too many settings into one big GPO
- Using block inheritance
- Using loopback processing
- Changing delegation permissions
- Poor OU design

#### Troubleshooting Steps

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

### GPO Best Practices

#### 1. Do Not Modify the Default Domain Policy

This GPO should only be used for account policy settings, password policy, account lockout policy, and Kerberos policy. Any other settings should be put into a separate GPO. The Default Domain Policy is set at the domain level so all users and computers get this policy. The Default Domain Policy is linked to the root of the domain.

> When you put multiple GPO settings into the default domain policy it becomes very difficult to troubleshoot and control GPO settings. It can also impact performance if the GPO has too many settings and every user and computer has to process them. It is best to use small GPOs (see tip #12) than to stuff everything into one big GPO.

### 2. Do Not Modify the Default Domain Controller Policy

This GPO should only contain the User Rights Assignment Policy and Audit Policy. Any other settings to the Domain Controllers should be set in a separate GPO.

> The Default Domain Controller policy is linked to the Domain Controller OU.

#### 3. Good OU Design Will Make Your Job 10x Easier

A good OU design makes it easier to apply and troubleshoot group policy. It is best to create an OU for computers and a separate OU for users. Then create sub-OUs on how you want to manage your objects. Its common to organize objects by department and functionality.

!!! example
            >    - Forest: ad.northeastprecast.com
            >    - Domains
            >        - ad.northeastprecast.com
            >        - NEP Computers
            >        - NEP Groups
            >        - NEP Users
            >            - Accounting
            >            - HR
            >            - Inactive
            >            - IT
            >            - Legal
            >            - Management
            >            - Marketing
            >            - Operations
            >            - PR
            >            - Purchasing
            >            - test-build1
            >            - test-build2

> Putting users and computers in separate OUs makes it easier to apply computer policies to all the computers and user policies to only the users.

#### 4. Do Not Set GPOs at the Domain Level

The only GPO that should be set at the domain (root) level is the Default Domain Policy. Anything set at the domain level will get applied to all user and computer objects. This could lead to all kinds of settings getting applied to objects that you don’t want. It’s better to apply the policies at a more granular level.

!!! example
            >  - Forest: ad.northeastprecast.com
            >    - Domains
            >      - ad.northeastprecast.com
            >      - [GPO]Some-Policy &larr; **Nope, don't do this**
            >        - NEP Computers
            >        - NEP Groups
            >        - NEP Users
            >        - . . .

#### 5. Apply GPO's to The Root of an OU

Applying GPOs at the root of an OU will allow the sub-OUs to inherit these policies. This way you don’t need to link a policy to each individual OU.

!!! example
            >  - Forest: ad.northeastprecast.com
            >    - Domains
            >      - ad.northeastprecast.com
            >        - NEP Computers
            >        - NEP Groups
            >        - NEP Users
            >          - [GPO]User MSEdge Settings &larr; **Link to the root of the OU. Sub-OUs will inherit.**
            >          - Accounting
            >          - HR
            >          - Inactive
            >          - IT
            >          -  . . .

#### If you want to exclude OUs or a group of users you have a few options

1. Best option: Use GPO Security Filtering.
2. Use item-level targeting.
3. Apply a GPO to the group that disables the policy.

Lets say that we have a GPO that disables saving passwords in the Edge browser, the GPO is linked to all users (like in the AD tree example above).

What if we have users in various departments that we don't want this policy applied to? The solution best is GPO security filtering. 

We create a security group, add users to the group, and then deny this group from applying the group policy. Now all the users except the ones in the security group will process the GP.

#### 6. Avoid Using Blocking Policy Inheritance and Policy Enforcement

If we have a good OU structure then we can most likely avoid the use of blocking policy inheritance and using policy enforcement. Some find it much easier to manage and troubleshoot group policies knowing neither of these is set in the domain.

#### 7. Don’t Disable GPOs

If a GPO is linked to an OU and we don’t want it to be, delete it instead of disabling it. Deleting the link from an OU will not delete the GPO, it just removes the link from the OU. Disabling the GPO will stop it from being processed entirely on the domain, and this could cause problems.

#### 8. Use Descriptive GPO Names

Being able to quickly identify what a GPO is for based on the name will make group policy administration much easier. Giving the GPOs a generic name like “laptop settings” is too generic and will confuse people.

!!! example "Examples"
      - [User]Browser-Settings
      - [User]Office365-Settings
      - [Computer]Screen-Lock-On
      - [Computer]Install-Adobe-Acrobat

#### 9. Speed Up GPO Processing by Disabling Unused Computer and User Configurations

Lets say, for example, we have a GPO called "browser settings". It only has computer settings configured and no user settings so, we can disable the User configuration for this GPO. This will speed up group policy processing.

To disbale the computer or user configurations of a GPO:

1. Browse to Group Policy Objects
2. Right Click a GPO and select GPO Status
3. Select one of the options
    - Enabled
    - User Configuration Settings Disabled &larr; **This would be the option to choose for our scenario above**
    - Computer Configuration Settings Disabled
    - All Settings Disabled

#### 10. Use Loopback Processing for Specific Use Cases

Loopback processing, in a nutshell, takes user settings and limits those settings to a computer the GPO is applied to. It is very useful but can also cause issues if used incorrectly. A common use of loopback processing is on terminal servers and Citrix servers. Users are logging into a server and you need specific user settings applied when they log into only those servers. You would need to create a GPO, enable loopback processing and apply it to the OU that has the servers in it.

#### 11. Group Policy Change Management

Group policy can get way out of control if you let all your administrators make changes as they feel necessary. One little GPO change could send a flood of calls to the helpdesk. It happens, so it’s best to discuss and document changes to GPOs.

#### 12. Use Small GPOs to Simplify Administration

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

#### 13. Best Practices for Group Policy Performance

Here are some settings that can cause slow startup and logon times:

- Login scripts downloading large files
- Startup scripts downloading large files
- Mapping home drives that are far away
- Deploying huge printer drivers over group policy preferences
- Overuse of group policy filtering by AD group membership
- Using excessive WMI filters
- Lots and lots of GPOs linked to a user or computer over a slow link.

#### 14. Group Policy Troubleshooting Tips

Know how to use the [RSoP](https://activedirectorypro.com/how-to-use-rsop-to-check-and-troubleshoot-group-policy-settings/) and [GPResult](https://activedirectorypro.com/gpresult-tool/) commands to verify and troubleshoot group policy. When troubleshooting you need a way to verify that GPOs are getting applied and check exactly what policies are applied. These two commands are a huge lifesaver.

#### 15. Backup GPOs

This should go without saying, but if you're not backing up Active Directory or doing system state backup then you need to start backing up your GPOs . . .