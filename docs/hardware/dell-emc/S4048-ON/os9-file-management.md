# File Management

!!! info

    Files can be stored on and accessed from various storage media including internal flash, external USB flash and remote file servers. You may already be familiar with many of the following file managment commands as they are commonly used in unix based systems. 
    
    File management commands are executed from the EXEC privilege mode.

## View file system information

Use the `show file-systems` to display the file systems available on the switch.

```shell
DellEMC# show file-systems
      Size(b)     Free(b)      Feature      Type   Flags  Prefixes
   2368282624  2304512000        FAT32 USERFLASH      rw  flash:
            -           -  unformatted USERFLASH      rw  fcmfs:
    218103808    64708608      Unknown  NFSMOUNT      rw  nfsmount:
            -           -            -   network      rw  ftp:
            -           -            -   network      rw  tftp:
            -           -            -   network      rw  scp:
            -           -            -   network      rw  http:
            -           -            -   network      rw  https:
```

## Get contents of a directory

To display the contents of the current directory, use the `dir` command.

```shell
DellEMC# dir

Directory of flash:

  1  drwx       4096   Jan 01 1980 00:00:00 +00:00 .  
  2  drwx       3580   Jul 18 2020 22:09:12 +00:00 ..  
  3  drwx       4096   Dec 10 2019 14:49:54 +00:00 TRACE_LOG_DIR  
  4  drwx       4096   Dec 10 2019 14:49:54 +00:00 CONFD_LOG_DIR  
  5  drwx       4096   Dec 10 2019 14:49:54 +00:00 CORE_DUMP_DIR  
  6  d---       4096   Dec 10 2019 14:49:54 +00:00 ADMIN_DIR  
  7  drwx       4096   Dec 10 2019 14:49:54 +00:00 RUNTIME_PATCH_DIR  
  8  -rwx          1   Jul 03 2020 22:54:24 +00:00 boots.txt  
  9  drwx       4096   Jul 14 2020 15:28:26 +00:00 CONFIG_TEMPLATE  
 10  -rwx          0   Jul 14 2020 15:28:56 +00:00 pdtrc.lo0  
 11  -rwx       4276   Jul 14 2020 15:29:04 +00:00 last-cold-st-config  
 12  -rwx       4435   Jul 03 2020 23:45:50 +00:00 startup-config  
 13  -rwx     314038   Jul 03 2020 23:45:54 +00:00 confd_cdb.tar.gz  
 14  -rwx         56   Jul 03 2020 23:45:54 +00:00 confd_cdb.tar.gz.version  
 15  -rwx          0   Jul 14 2020 15:28:26 +00:00 earlyCliParserDbg  

flash: 2368282624 bytes total (2304438272 bytes free)
```

## Create, remove and change directories

To create a directory use the `mkdir` command and to remove use the `rmdir` command.

```shell
DellEMC# mkdir tmp_dir
DellEMC# dir tmp_dir
Directory of flash:/tmp_dir

  1  drwx       4096   Jul 18 2020 22:35:30 +00:00 .  
  2  drwx       4096   Jan 01 1980 00:00:00 +00:00 ..

DellEMC# rmdir tmp_dir
Proceed to remove the directory [confirm yes/no]: y

DellEMC# dir tmp_dir  
% Error: The specified file or directory does not exist.
```

To change directories, use `cd <path_to_dir>`. To show the current working directory, use the `pwd` command.

## Copy files

To copy one file to another location, use the `copy` command with the following syntax - `copy <source-file-url> <destination-file-url>`. Dell OS9 supports IPv4 and IPv6 addressing for FTP, HTTP, TFTP, and SCP.

!!! info " To enable the internal FTP server, use the `ftp-server enable` command."

=== "Local copy (duplicate on internal flash)"

    ```shell
    DellEMC# copy startup-config startup-config.2
    !
    4435 bytes successfully copied
    ```

=== "From internal flash to USB"

    !!! note

        Format to FAT-32. Delete all but a single primary partition. The USB flash drive must be un-mounted (`unmount usb`) prior to removal or the next USB device to be inserted may not be recognized.

    ```shell
    DellEMC# copy running-config usbflash://running-config-copy
    !
    4324 bytes successfully copied
    ```

    Verify that the file has been copied.

    ```shell
    DellEMC# dir usbflash://
    ```

=== "From remote system to internal flash via SCP"

    ```shell
    DellEMC# copy scp://admin:password@192.168.101.2/firmware.bin  flash://firmware.bin
    !
    65059 bytes successfully copied
    ```

=== "From internal flash to remote system via SCP"

    ```shell
    DellEMC# copy running-config scp://admin:password@192.168.101.2/
    !
    4324 bytes successfully copied
    ```

---

## Rename files

To rename a file, use the `rename` command.

```shell
DellEMC# rename startup-config.2 start-config.3
```

## Show file contents

To show the contents of a text file, use the `show file` command.

```shell
DellEMC# show file startup-config.3

! Version 9.13(0.1)
! Last configuration change at Fri Jul  3 23:43:25 2020 by default
! Startup-config last updated at Fri Jul  3 23:45:50 2020 by default
!
boot system stack-unit 1 primary system: A:
boot system stack....
```

!!! tip "To save the output of `show file`, pipe it into the `save` command.

    ```shell
    DellEMC# show command-history | save flash://command-history.txt 
    Start saving show command report .......

    DellEMC# dir command-history.txt
    Directory of flash:
    1  -rwx      76096   Jul 18 2020 22:30:16 +00:00 command-history.txt
    ```

## Delete files

To delete a file from local flash, use the `delete` command with the following syntax - `delete flash://<file>`:

```shell
DellEMC# delete flash://startup-config.2
Proceed to delete startup-config.2 [confirm yes/no]: y
```

## Verify file integrity

To verify the integrity of a file, use the `verify` command using the following syntax - `verify {md5|sha256} file [hash-value]`:

```shell
DellEMC# verify md5 firmware.bin 4659f3b278b52fb09c7ed759b2f10474
MD5 hash VERIFIED for firmware.bin
```

---

[*Reference 1*](https://www.dell.com/support/manuals/en-us/dell-emc-os-9/s4048-on-9.14.2.4-config/configuration-file-management?guid=guid-ee703c5d-ff2c-4e01-8dcf-e2a7e49eb69b&lang=en-us)</br>
[*Reference 2*](https://gainanov.pro/eng-blog/sysad/dell-file-management/)