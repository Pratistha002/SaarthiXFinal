# PowerShell script to update navbar logo in all HTML files
$files = Get-ChildItem -Path "c:\SarthiX" -Filter "*.html" | Where-Object { 
    $_.Name -ne "index.html"
}

$oldPattern = '<div class="logo">\s*<a href="[^"]*">SaarthiX</a>\s*</div>'
$newReplacement = '<div class="logo">
            <a href="index.html">
                <img src="logo-saarthix.jpg" alt="SaarthiX" class="logo-img">
                <span class="logo-text">SaarthiX</span>
            </a>
        </div>'

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Check if file has the old logo structure
    if ($content -match $oldPattern) {
        # Replace the old logo structure with the new one
        $content = $content -replace $oldPattern, $newReplacement
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated navbar logo in: $($file.Name)"
    } else {
        Write-Host "No navbar logo found or already updated in: $($file.Name)"
    }
}

Write-Host "Navbar logo updated in all applicable HTML files!"