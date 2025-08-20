# PowerShell script to update footer services section in all HTML files
$files = Get-ChildItem -Path "c:\SarthiX" -Filter "*.html" | Where-Object { 
    $_.Name -ne "job-metrics.html" -and $_.Name -ne "index.html"
}

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Check if file has footer with services section
    if ($content -match '<div class="footer-section">\s*<h4>Our Services</h4>') {
        # Update the services section
        $content = $content -replace '(<div class="footer-section">\s*<h4>Our Services</h4>\s*<ul class="footer-links">)(.*?)(</ul>\s*</div>)', '$1
                        <li><a href="students.html">Students</a></li>
                        <li><a href="institute.html">Institute</a></li>
                        <li><a href="industry.html">Industry</a></li>
                        <li><a href="jobs.html">Resources</a></li>
                    $3'
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated footer services in: $($file.Name)"
    } else {
        Write-Host "No footer services section found in: $($file.Name)"
    }
}

Write-Host "Footer services section updated in all applicable HTML files!"