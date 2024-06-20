---
status: new
---

# Security Certificate (Optional)

1. In the PowerVault Manager, prepare to use FTP/SFTP:
      1. Determine the network-port IP addresses of the system controllers.
      2. Verify that the FTP/SFTP service is enabled on the system. (**Settings > Network > Services**)
      3. Verify that the user you plan to use has manage role permissions and FTP/SFTP interface permissions.
2. Open a Command Prompt (Windows) or a terminal window (UNIX) and go to the directory that contains the certificate files.
3. Connect via SFTP or SFTP:
      1. `sftp -P port <controller-network-address>` or `ftp <controller-network-address>`
4. Log in as a user with manage role permissions and FTP/SFTP interface permissions.
5. Upload the certificate: 
      1. `put <certificate-file-name> cert-file`
6. Upload the certificate key:
      1. `put <key-file-name> cert-key-file`
7. [Restart both Management Controllers](../powervault-me5/me5-shutdown-controller.md) to have the new security certificate take effect.

[*Reference*](https://www.dell.com/support/manuals/en-us/powervault-me5024/me5_series_ag/install-a-security-certificate?guid=guid-64a1da20-4cbd-4c5c-8b83-f14a7753a6c6&lang=en-us)