# Managing Group Policies

The Group Policy Management Console (GPMC) is used to manage group policy. It is located in the start menu > Windows Administrative Tools.

1. **Domains**: Lists your domains and OU structure. Notice it does not show any AD containers, that is because GPOs can only be linked to the domains and OUs.
2. **Linked GPOs**: If an OU has a linked policy, it will be listed under that OU.
3. **Group Policy Objects**: Lists all GPOs, linked and unlinked.

!!! example "Example"

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

## Create a GPO

1. Right-Click on an OU and select "Create a GPO in this domain, link it here"
2. Give the GPO a name
3. The GPO is created, but has no policies. Right-Click on the GPO and select "edit" to configure them.
4. Change the policy settings to "Enabled" and click "OK".