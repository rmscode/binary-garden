# Notepad++

## Cloud Sync

1. Go to **Settings** > **Preferences** > **Cloud & Link**
2. Select the radio button for **Set your cloud location path here** and set the path to your cloud synced directory
    - For example: `C:\Users\user\OneDrive\Notepad++`</br>
    > Personally, I used a path to a cloned github repository. 
3. Restart Notepad++ and it will begin keeping a copy of files from `%APPDATA%\Roaming\Notepad++` to your cloud synced directory.

!!! note "Regarding sessions"

    Perhaps the best way to share those across computers is to use the *Load Session* and *Save Session* options in the **File** menu. For this to work, you would need to save the session XML file and the files you are working on in the same cloud synced directory. I presume the path would need to match between computers as well - `C:\Users\jdoe\OneDrive\Notepad++` on one machine and `C:\Users\john\OneDrive\Notepad++` on the other would probably be an issue.

[*Reference*](https://community.notepad-plus-plus.org/topic/14299/setup-notepad-with-cloud-syncing/8)

## Notepad Replacement

You may want to use Notepad++ instead of Notepad as the default text editor in Windows. Here is how to do it:

=== "Windows 7 & Windows 10"

    From an elevated command prompt, run the following command:

    ```cmd
    reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"%ProgramFiles%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f
    ```

    !!! note
    
        You may need to use `%ProgramFiles(x86)%\Notepad++\` to substitute for `%ProgramFiles%\Notepad++\` if you have Notepad++ 32-bit installed, or use other path if your Notepad++ is installed in a non-default location.

    *Undo the changes*:

    ```cmd
    reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v Debugger /f
    ```

=== "Windows 11"

    From an elevated command prompt, run the following commands:

    ```cmd
    reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe\0" /v Debugger /t REG_SZ /d "\"%ProgramFiles%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f

    reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe\1" /v Debugger /t REG_SZ /d "\"%ProgramFiles%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f

    reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe\2" /v Debugger /t REG_SZ /d "\"%ProgramFiles%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f

    reg delete HKCR\Applications\notepad.exe /v NoOpenWith /f
    ```

    !!! note

        Windows 11 introduced UWP version of Notepad that use the same technique as described (but with undocumented [UseFilter](https://www.geoffchappell.com/studies/windows/win32/ntdll/api/rtl/rtlexec/openimagefileoptionskey.htm)) to replace the built-in Notepad. As UWP apps are started differently than regular apps, they cannot be replaced the same way and UWP Notepad must be uninstalled. Otherwise it would start when opening text files or when run from Start Menu. What's more, to be able to again use built-in Notepad (now redirected to Notepad++) to open text files the `NoOpenWith` registry value must be removed (based on [How to Restore Old Classic Notepad in Windows 11](https://www.winhelponline.com/blog/restore-old-classic-notepad-windows/)).

    *Undo the changes*:

    For Windows 11 onward: reinstall Notepad (launch Microsoft Store via Start Menu, search “Windows Notepad”, select it and then click on Install button) and then run the commands below.

    ```cmd
    reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe\0" /v Debugger /f
    reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe\1" /v Debugger /f
    reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe\2" /v Debugger /f
    reg add HKCR\Applications\notepad.exe /v NoOpenWith /t REG_SZ /f
    ```

[*Reference*](https://npp-user-manual.org/docs/other-resources/#notepad-replacement)