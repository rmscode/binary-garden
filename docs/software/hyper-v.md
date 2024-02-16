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

## Shared Nothing Live Migration (SNLM)

SNLM allows you to live migrate a VM from one Hyper-V host to another without the need for shared storage.

### Prerequisites

- Source and target systems must be Hyper-V hosts in the same or trusting domains.
- Source and target systems must have the same type or family of processors (Intel or AMD) if you're using the VM's processor compatibility feature.
- Source and target systems must be connected by at least a 1 Gbps Ethernet connection.
- The VM cannot be clustered.
- Enable incoming and outgoing live migrations in **Hyper-V Settings** > **Live Migrations**

### Steps

1. Right-click the VM in Hyper-V Manager and select **Move** > **Live Migration**.
2. Follow the wizard and select the target host.

Powershell:

```powershell
Move-VM –Name VM01 –IncludeStorage –DestinationHost HVSRV02 –DestinationStoragePath D:\Hyper-V\
```