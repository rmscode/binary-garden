# NIC Teaming

## Load Balancing and Failover Teaming (LBFO)

!!! abstract "ToDo"

## Switch Embedded Teaming (SET)

!!! note "Unlike traditional LBFO teams which can be created and  managed via the Server Manager GUI, Switch Embedded Teams can only be created and managed using PowerShell."

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
