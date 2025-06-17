# Active Directory and Domain Services <small>(ADDS)</small>

!!! info
      A directory is a hierarchical structure that stores information about objects on the network. A directory service, such as Active Directory Domain Services (AD DS), provides the methods for storing directory data and making this data available to network users and administrators. For example, AD DS stores information about user accounts, such as names, passwords, phone numbers, and so on, and enables other authorized users on the same network to access this information.

## AD Design Tips

??? tip "KISS"

    Keep things simple. AD is flexible...Just because you can use something doesn't mean you should. Keeping things as simple as possible increases efficiency and makes things easier to troubleshoot.

??? tip "Use the appropriate site topology"

    Despite the tip above, you shouldn't shy away from creating complex structures *when appropriate*. Site topology should always mirror network topology. Portions of the network that are highly connected should fall within a single site. Site links should mirror WAN connections, with each physical facility that is separated by a WAN link encompassing a separate Active Directory site.

??? tip "Dedicated domain controllers"

    Avoid having a domain controller pull double duty. Whenever possible, your domain controllers should run on dedicated servers (physical or virtual). Adding additional roles can affect the server's performance and complicate the process of backing up or restoring the server.

??? tip "Have at least two DNS servers"

    The problem with this is that Active Directory is totally dependent upon the DNS services. If you have a single DNS server, and that DNS server fails, Active Directory will cease to function.

??? tip "Avoid putting all your eggs in one basket (virtualization)"

    The redundancy of multiple domain controllers is often circumvented by server virtualization. There is nothing wrong with virtualizing your domain controllers, but you should scatter the domain controllers across multiple host servers. (Failover Cluster).

??? tip "Don't neglect the FSMO roles (backup)"

    Some domain controllers are more important than others. Domain controllers that are hosting Flexible Single Master Operations (FSMO) roles are critical to Active Directory health. Active Directory is designed so that if a domain controller that is hosting FSMO roles fails, AD can continue to function — for a while. Eventually though, a FSMO domain controller failure can be very disruptive. I have heard some IT pros say that you don’t have to back up every domain controller on the network because of the way Active Directory information is replicated between domain controllers. While there is some degree of truth in that statement, backing up FSMO role holders is critical.

??? tip "Plan your domain structure and stick to it"

    Most organizations start out with a carefully orchestrated Active Directory architecture. As time goes on, however, Active Directory can evolve in a rather haphazard manner. To avoid this, it is recommended to plan in advance for eventual Active Directory growth. You may not be able to predict exactly how Active Directory will grow, but you can at least put some governance in place to dictate the structure that will be used when it does.

??? tip "Have a management plan in place before you start setting up servers"

    Who will administrator Active Directory? Will one person or team take care of the entire thing or will management responsibilities be divided according to domain or organizational unit? These types of management decisions must be made before you actually begin setting up domain controllers.

??? tip "Avoid making major logistical changes"

    Its recommended that you avoid restructuring your Active Directory if possible. Its possible that the restructuring process can result in some Active Directory objects being corrupted, especially when moving objects between domain controllers running differing versions of Windows Server.

??? tip "Place at least one global catalog server in each site"

    If you are operating an Active Directory consisting of multiple sites, make sure that each one has its own global catalog server. Otherwise, Active Directory clients will have to traverse WAN links to look up information from a global catalog.

## Active Directory Groups Explained

### Group Types

=== "Distribution Groups"

    This group type serves one purpose - To send email to collections of users by using an email application like Exchange Server. Distribution groups aren't security enabled, so you can't include them in DACLs.

    **Use case scenario**: Your company's sales department has gotten quite large and the sales manager wants to be able to email everyone in the their department using some type of "mailing list", as they describe it. Remembering all the sales persons email addresses has become difficult.

    You already have an AD and Exchange server, so you create a distribution group in AD called "All_Sales" that includes the user objects of all Sales personell. Now your Exchange server will have access to a distribution group that contains all the email addresses of that department. The sales manager will be able to use this distribution list in Outlook when composing a new email.

=== "Security Groups"

    This group type provides a way to assign access to resources on your network. You can do the following by using security groups:

    - Assign user rights
        - Assigning user rights to a security group determines what members of that group can do within the scope of a domain or forest. AD has some built-in security groups designed to help administrators delegate a person's administrative role in a domain. For example, the "Backup Operators" group in AD can backup and restore files and directories that are located on each domain controller in the domain. The user can complete these actions because, by default, the user rights Backup files and directories and Restore files and directories are automatically assigned to the Backup Operators group. Therefore, members of this group inherit the user rights that are assigned to that group.
    - Assign permissions for resources
        - Permissions are different from user rights. Permissions are assigned to a security group for a shared resource. Permissions determine who can access the resource and the level of access, such as Full control or Read. Security groups are listed in Discretionary Access Control Lists (DACLs) that define permissions on resources and objects. When administrators assign permissions for resources like file shares or printers, they should assign those permissions to a security group instead of to individual users. The permissions are assigned once to the group instead of multiple times to each individual user. Each account that's added to a group receives the rights that are assigned to that group in Active Directory. The user receives permissions that are defined for that group.

    !!! tip "By the way, you can use a security group as an email entity. Sending an email to a security group messages all the members of that group."

### Group Scope

Each group has a scope that identifies the extent to which the group is applied in the domain tree or forest. The scope defines where in the network permissions can be granted for the group. The three group scopes are Universal, Global and Domain Local.

!!! info
    In addition to these three scopes, the default groups in the Builtin container have a group scope of Builtin Local. This group scope and group type can't be changed.

=== "Universal Scope"

    | Can Grant Permissions                                | Possible Members                                    | Possible Member of...                                            |
    |------------------------------------------------------|-----------------------------------------------------|------------------------------------------------------------------|
    | On any domain in the same forest or trusting forests | Accounts from any domain in the same forest         | Other Universal Groups in the same forest                        |
    |                                                      | Global Groups from any domain in the same forest    | Domain Local Groups in the same forest or trusting forests       |
    |                                                      | Universal groups from any domain in the same forest | Local Groups on computers in the same forest or trusting forests |

    !!! example "Example Scenario"
    
        In practice, many single-domain organizations don't bother with Universal Groups. However, in multi-domain forests, Universal Groups may be used to gather Global Groups from many domains into a single group that can be added to the appropriate Domain Local Group.

=== "Global Scope"

    | Can Grant Permissions                                           | Possible Members                   | Possible Member of...                                  |
    |-----------------------------------------------------------------|------------------------------------|--------------------------------------------------------|
    | On any domain in the same forest or trusting domains or forests | Accounts from the same domain      | Universal groups from any domain in the same forest    |
    |                                                                 | Global groups from the same domain | Global groups from the same domain                     |
    |                                                                 |                                    | Domain Local groups from any domain in the same forest |

    !!! note 
    
        I like to think of groups with the Global scope as **Account Groups** - A collection of domain users into a single group.

    !!! example "Example Scenario" 
    
        The IT department has grown at your organization and its no longer just you (the sysadmin) and your manager. You now have a couple of entry level techs that will handle general Help Desk tasks. Your manager wants you to come up with a way to grant basic access/permissions to these Help Desk users.

        The solution here would be to create a global security group in AD and name it something like IT_HelpDesk. Then add all of the Help Desk Agents as members of this group. This group would act as a container for all of your HelpDesk users. You can then make the IT_HelpDesk group a member of one or more Domain Local groups. This will allow you to start delegating access/permissions to those specific users in the group. We'll touch on that in the next section.

=== "Domain Local Scope"

    | Can Grant Permissions  | Possible Members                                                                           | Possible Member of...                                                     |
    |------------------------|--------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
    | Within the same domain | Accounts from any domain or any trusted domain                                             | Other Domain Local groups from any domain in the same forest              |
    |                        | Global groups from any domain or any trusted domain                                        | Other Global groups from the same domain                                  |
    |                        | Universal groups from any domain in the same forest                                        | Domain Local groups from any domain in the same forest or trusting domain |
    |                        | Other Domain Local groups from the same domain                                             |                                                                           |
    |                        | Accounts, Global groups, and Universal groups from other forests and from external domains |                                                                           |

    !!! note
    
        After having a look at the above table, you'll notice that you can place almost *any account* or *group* from almost *any location* into a Domain Local group. This scope also only grants permissions within the same domain that it is created in. This is why I like to think of this scope as a **Resource Group**. You can grant a wide range of accounts and groups access to resources that exist only inside of its domain.

    !!! example "Example Scenario"
    
        Now that you've created a Global security group specifically for your Help Desk, you can work on delegating the different types of access and permissions your manager wants to allow for these users. One of these is resetting user passwords.

        Assuming that you already have a well designed OU structure in your AD, you can create a Domain Local security group and delegate control over the "NEP_Users" OU where all of your user account objects live. This delegation of control would only allow the resetting of user passwords. You could name this Domain Local group something like "IT_HelpDesk_Allow_Password_Reset". Its a long name, I know, but it helps if your group names are specific. You would then add the "IT_HelpDesk" group as a member. In turn, all the users of "IT_HelpDesk" would be granted the ability to reset user passwords.

        By the way . . . The reason why we nest groups in this fashion is to make managing users and groups easier. If you or your manager decide that the Help Desk should no longer be able to reset passwords, just remove the "IT_HelpDesk" group from the "IT_HelpDesk_Desk_Allow_Password_Reset" group. You can add and remove that *Account Group* from as many or little *Resource Groups* as you want.

### Wrapping Up

If you think of Domain Local groups as *Resource Groups* and Global Groups as *Account Groups*, I think you'll have an easier time delegating control in AD.

As *Resource Groups*, Domain Local groups should be used to grant access to IT resources in a domain, and as *Account Groups*, Global groups should be used to collect specific users of a domain into a group.

### Resources

- <https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-groups>
- <https://community.spiceworks.com/topic/306028-when-to-use-a-domain-local-group-versus-global-group>
- <https://livebook.manning.com/book/learn-active-directory-management-in-a-month-of-lunches/chapter-4/ch04lev2sec1>