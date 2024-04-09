# NIC Teaming

## Load Balancing and Failover Teaming (LBFO)

1. List all network adapters on the system:
        ```powershell
        Get-NetAdapter
        ```
2. Create a new NIC team:
        ```powershell
        New-NetLbfoTeam -Name "LBFOTeam" -TeamMembers "Ethernet 1", "Ethernet 2"
        ```
3. Create and attach a virtual switch to the team:
        ```powershell
        New-VMSwitch -Name "LBFOvSwitch" -NetAdapterName "LBFOTeam" -AllowNetLbfoTeams $true
        ```

    !!! note "The `-AllowNetLbfoTeams $true` parameter is required to attach the virtual switch since LBFO is technically deprecated."

## Switch Embedded Teaming (SET)

!!! note "Unlike legacy LBFO teams which can be created and  managed via the Server Manager GUI, Switch Embedded Teams can only be created and managed using PowerShell."

1. List all network adapters on the system:
        ```powershell
        Get-NetAdapter
        ```
2. Create a Hyper-V virtual switch with embedded teaming enabled:
        ```powershell
        New-VMSwitch -Name "EmbeddedSwitch" -NetAdapterName "Ethernet 1", "Ethernet 2" -EnableEmbeddedTeaming $true
        ```
3. (Optional) Create a virtual network adapter for the switch and assign it an IP address:
        ```powershell
        Add-VMNetworkAdapter -ManagementOS -Name "EmbeddedAdapter" -SwitchName "EmbeddedSwitch"
        New-NetIPAddress -InterfaceAlias "vEthernet (EmbeddedAdapter)" -IPAddress 192.168.1.15 -PrefixLength 24 -DefaultGateway 192.168.1.1
        ```
