# Hyper-V

## Guest Integration Services

Hyper-V Integration Services represent a software suite of services which, when enabled, improves the integration between a host server and a VM in a virtual environment. Each Hyper-V service has a specific function aimed at enhancing the performance of guest operating systems. The degree of their impact on the VM may vary as some of the Hyper-V services are designed for providing mere convenience for users, while others are critical for the VM’s functionality.

!!! info 

    Installing and updating integration services is one of the most commonly overlooked steps to ensure overall stability and optimal performance of guest VMs. Although newer Windows-based OSs and some enterprise-class Linux-based OSs come with integration services out of the box, updates may still be required. New versions of integration services may become available as the physical Hyper-V hosts are patched and updated.

### Check Status and Version

```powershell
Get-VMIntegrationService -VMName "TestVM" #(1)!
REG QUERY "HKLM\Software\Microsoft\Virtual Machine\Auto" /v IntegrationServicesVersion #(2)!
```

1. Check the status of integration services for a VM.
2. Query the registry for the version of integration services.

Enable with `Enable-VMIntegrationService -VMName "TestVM" -Name "Guest Service Interface"`.

### Update

1. Open Hyper-V Manager
2. Select the VM and click **Connect**.
3. Click **Action** on the task bar above. In the drop-down menu, select **Insert Integration Services Setup Disk**.
4. Find the DVD drive which contains the Integration Services Setup Disk. Right-click on it and select Install Hyper-V Integration Services.
5. Restart the system to complete the installation.
6. After the reboot, verify that Integration Services are updated by looking at the VM summary in Hyper-V Manager.

## Processor Compatibility Mode

Found in a VM' settings (Processor > Compatibility), processor compatibility  allows you to move a running virtual machine or save state between virtualization hosts that use different generations of processors. This feature works by disabling a number of modern processor features, which can affect virtual machine performance. Processor compatibility is not enabled by default.

Windows Server 2025 introduces "[Dynamic Processor Compatibility](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/manage/dynamic-processor-compatibility-mode)".

[Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn859550(v=ws.11))</br>
[Altaro](https://www.altaro.com/hyper-v/troubleshooting-hyper-v-live-migration)

## Shared Nothing Live Migration (SNLM)

SNLM allows you to live migrate a VM, and optionally its storage, from one Hyper-V host to another without the need for shared storage between the hosts.

### Prerequisites

- Source and target systems must be Hyper-V hosts in the same or trusting domains.
- Source and target systems must have the same type or family of processors (Intel or AMD). Otherwise, processor compatibility mode must be enabled.
- Source and target systems must be connected by at least a 1 Gbps Ethernet connection on the same network enabled for live migration.
- The VM cannot be a clustered role.

### Steps

1. Ensure that Live Migration is enabled on both hosts. (If the hosts are part of a cluster, this is already enabled.)
    1. Open Hyper-V Manager, goto **Hyper-V Settings** > **Live Migrations** and enable incoming and outgoing live migrations.
2. Ensure that both the source and target hosts can communicate on the same network enabled for live migration.
    1. **Hyper-V Settings** > **Live Migration Settings**: Add a network that both hosts can communicate on.
3. Ensure that Kerberos constrained delegation is configured on the target host.
    1. On a Domain Controller, open ADUC and right-click the target host computer object.
    2. In **Properties** > **Delegation** select "Trust this computer for delegation to any services (Kerberos only)"</br>
    !!! Note "Make the auth protocol is to "Use Kerberos" in the the VM's settings (Live Migrations > Advanced Features)."
4. (Optional) Check "Migrate to a physical computer with a different processor version" in **Processor Compatibility** of the VM to be moved.</br>
    NOTE: This requires the VM to be offline.
5. If the VM is a clustered role, drop the VM from the cluster.
    1. From Cluster Manager, right-click the VM role and select **Remove**.
6. Move the VM
    1. Right-click the VM in Hyper-V Manager, select **Move** > **Live Migration** and follow the wizard.

## NIC Teaming

NIC Teaming is a feature in Windows Server that allows you to combine multiple physical network adapters (NICs) into a single logical network card. This virtual NIC is then presented to the operating system as a unified interface, streamlining network management and enhancing reliability, performance, and fault tolerance.

### Load Balancing and Failover (LBFO)

#### Create LBFO Team

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

### Switch Embedded Teaming (SET)

#### Create SET Team

!!! note "Unlike legacy LBFO teams which can be created and managed via the Server Manager GUI, Switch Embedded Teams can only be created and managed using PowerShell."

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

## Single Root I/O Virtualization (SR-IOV)

SR-IOV allows a host to share PCIe resources with multiple VMs. SR-IOV enables a physical PCIe device to appear as multiple separate virtual devices called Virtual Functions (VFs). These VFs can be directly assigned to a VM. In regard to network traffic, this bypasses the software switch layer of the Hyper-V stack so that traffic flows directly between a VF and a VM...Reducing the I/O overhead in the emulation layer. Microsoft claims that with SR-IOV, network performance is nearly the same as in non-virtualized environments.

## Troubleshooting

### This PC Can't Run Windows 11

If a Windows 11 VM won't boot in Hyper-V, ensure the following settings are configured:

1. Open **Settings** by right-cling the VM.
2. Click **Security** in the left pane. 
3. Tick **Enable Trusted Platform Module**
4. Click **Processor** in the left pane.
5. Change the **Number of virtual processors** to a minimum of 2.