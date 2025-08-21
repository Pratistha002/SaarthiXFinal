# PowerShell script to update navbar logo in all HTML files
$files = Get-ChildItem -Path "c:\SarthiX" -Filter "*.html"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Pattern 1: Simple text logo
    $pattern1 = '<div class="logo">\s*<a href="[^"]*">SaarthiX</a>\s*</div>'
    
    # Pattern 2: Already has image but wrong file extension
    $pattern2 = 'logo-saarthix\.jpg'
    
    # New logo structure
    $newLogo = '<div class="logo">
            <a href="index.html">
                <img src="logo-saarthix.png" alt="SaarthiX" class="logo-img">
                <span class="logo-text">SaarthiX</span>
            </a>
        </div>'
    
    $updated = $false
    
    # Replace pattern 1 (text only logo)
    if ($content -match $pattern1) {
        $content = $content -replace $pattern1, $newLogo
        $updated = $true
        Write-Host "  - Updated text logo to image logo"
    }
    
    # Replace pattern 2 (wrong image extension)
    if ($content -match $pattern2) {
        $content = $content -replace $pattern2, 'logo-saarthix.png'
        $updated = $true
        Write-Host "  - Updated image extension from .jpg to .png"
    }
    
    if ($updated) {
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  ✓ Updated: $($file.Name)"
    } else {
        Write-Host "  - No changes needed in: $($file.Name)"
    }
}

Write-Host ""
Write-Host "Logo update completed for all HTML files!"