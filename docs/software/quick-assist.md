# Quick Assist

## Remove Classic Quick Assist

Quick Assist was originally introduced in Windows 10 as a feature. It has since been succeeded by a new version that can be installed via the [Microsoft store](https://apps.microsoft.com/detail/9p7bp5vnwkx5?hl=en-us&gl=US).

```powershell
Remove-WindowsCapability -Online -Name App.Support.QuickAssist~~~~0.0.1.0
```

## Issues

### Error Code: 1002 

> 10/11/2024

I first encountered this error after installing Microsoft's October 2024 updates on Windows 10 22H2. Classic and new Quick Assist versions were both affected. This seems to be a result of the new WebView2 runtime update (129.0.2792.79).

Running either as administrator worked for me as a temporary workaround, but other suggestions include:

- Uninstalling the old version and installing the new one from the Microsoft store
- Uninstalling KB5044273 (not recommended)
- [Forcing an older version of the Edge WebView2 runtime](https://admx.help/?Category=EdgeChromium&Policy=Microsoft.Policies.WebView2::BrowserExecutableFolder)

[*Reference: Reddit*](https://www.reddit.com/r/sysadmin/comments/1fys57l/patch_tuesday_megathread_20241008/lrd3pr3/)
[*Reference: Microsoft Answers*](https://answers.microsoft.com/en-us/windows/forum/all/quick-assist-error-1002/87377470-7f9a-4b98-80c8-1d1b64eac028?page=1)