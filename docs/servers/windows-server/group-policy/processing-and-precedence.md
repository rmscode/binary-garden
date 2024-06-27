# Processing Order and Precedence

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