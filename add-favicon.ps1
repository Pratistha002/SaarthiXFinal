# PowerShell script to add favicon to all HTML files
$files = Get-ChildItem -Path "c:\SarthiX" -Filter "*.html"

$faviconLinks = "    <link rel=`"icon`" type=`"image/png`" href=`"favicon.png`">`n    <link rel=`"shortcut icon`" type=`"image/png`" href=`"favicon.png`">`n    <link rel=`"apple-touch-icon`" href=`"favicon.png`">"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Check if favicon is already present
    if ($content -match 'rel="icon"' -or $content -match 'favicon') {
        Write-Host "  - Favicon already exists in: $($file.Name)"
        continue
    }
    
    # Find the </head> tag and insert favicon links before it
    if ($content -match '</head>') {
        $content = $content -replace '</head>', "$faviconLinks`n</head>"
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  + Added favicon to: $($file.Name)"
    } else {
        Write-Host "  - No head tag found in: $($file.Name)"
    }
}

Write-Host "Favicon update completed!"