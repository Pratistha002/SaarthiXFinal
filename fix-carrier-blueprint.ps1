# PowerShell script to change "Carrier Blueprint" to "Job Blueprint" in all HTML files
$files = Get-ChildItem -Path "c:\SarthiX" -Filter "*.html"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Check if file contains "Carrier Blueprint"
    if ($content -match "Carrier Blueprint") {
        # Replace all instances of "Carrier Blueprint" with "Job Blueprint"
        $content = $content -replace "Carrier Blueprint", "Job Blueprint"
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "No changes needed in: $($file.Name)"
    }
}

Write-Host "All instances of 'Carrier Blueprint' have been changed to 'Job Blueprint'!"