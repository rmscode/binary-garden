# Edge Browser

## Export/Import Passwords

=== "Exporting"

    1. Type `edge://wallet/passwords` in the address bar and press <kbd>Enter</kbd>.
    2. Click on the three dots (`...`) on the right end of the **Passwords** heading.
    3. Click on **Export passwords**.
        - You will be prompted for your Windows user credentials.
    4. Choose a location to save the csv file.

    !!! warning

        Comma Separated Value (CSV) files store information in plain text. Anyone with access to the file can read the passwords. Be sure to delete the file after importing it into your password manager.

=== "Importing"

    1. Type `edge://wallet/passwords` in the address bar and press <kbd>Enter</kbd>.
    2. Click on the three dots (`...`) on the right end of the **Passwords** heading.
    3. Click on **Import passwords**.
    4. Choose a browser or csv file to import from.

## Export/Import Bookmarks

=== "Exporting"

    1. Type `edge://favorites` in the address bar and press <kbd>Enter</kbd>.
    2. Click on the three dots (`...`) on the right end of the **Favorites** heading.
    3. Click on **Export favorites**.
    4. Choose a location to save the html file.

=== "Importing"

    1. Type `edge://favorites` in the address bar and press <kbd>Enter</kbd>.
    2. Click on the three dots (`...`) on the right end of the **Favorites** heading.
    3. Click on **Import favorites**.
    4. Choose a browser or html file ("Import from other browsers") to import from.

!!! tip "If you can find a use case, this can be done programmatically."

    Edge stores favorites in a JSON file.

    ```powershell title="Exporting"
    $favoritesFile = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Bookmarks" # This is a file, not a folder
    $exportPath = "$env:USERPROFILE\Desktop\EdgeFavorites.json"

    if (Test-Path $favoritesFile) {
        Copy-Item $favoritesFile $exportPath -Force
        Write-Output "Edge favorites exported to $exportPath"
    } else {
        Write-Output "Edge favorites file not found at $favoritesFile"
    }
    ```

    ```powershell title="Importing"
    $favoritesFile = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Bookmarks"
    $importPath = "$env:USERPROFILE\Desktop\EdgeFavorites.json"

    if (Test-Path $importPath) {
        Copy-Item $importPath $favoritesFile -Force
        Write-Output "Edge favorites imported from $importPath"
    } else {
        Write-Output "Edge favorites file not found at $importPath"
    }
    ```

## Backup Edge Data (Profile/Settings)

!!! note 

    Mileage may very on this one. I have not tested it myself, but one Reddit user claimed that even the recent groups of tabs they had open were restored.

    *Passwords will not carry over*

Navigate to `%localappdata%\Microsoft\Edge\User Data` and copy the **Default** and **Profile** folders to a backup location.

[Reddit: How to backup all Edge data to a new location?](https://www.reddit.com/r/MicrosoftEdge/comments/ukjuva/how_to_back_up_all_edge_data_to_a_new_device/)