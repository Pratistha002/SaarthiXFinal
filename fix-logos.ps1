$files = Get-ChildItem -Path "c:\SarthiX" -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace .jpg with .png
    if ($content -match "logo-saarthix\.jpg") {
        $content = $content -replace "logo-saarthix\.jpg", "logo-saarthix.png"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    }
    
    # Replace text-only logo with image logo
    $textLogoPattern = '<div class="logo">\s*<a href="[^"]*">SaarthiX</a>\s*</div>'
    if ($content -match $textLogoPattern) {
        $newLogo = '<div class="logo">
            <a href="index.html">
                <img src="logo-saarthix.png" alt="SaarthiX" class="logo-img">
                <span class="logo-text">SaarthiX</span>
            </a>
        </div>'
        $content = $content -replace $textLogoPattern, $newLogo
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Added logo to $($file.Name)"
    }
}