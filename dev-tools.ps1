<#
.SYNOPSIS
    Toggle dev prompts into/out of .github/prompts/ for VS Code slash command discovery.

.DESCRIPTION
    activate  - Copies dev prompts into .github/prompts/ so they appear in the palette.
    deactivate - Syncs any edits back to dev/prompts/ then removes the copies.

.EXAMPLE
    .\dev-tools.ps1 activate
    .\dev-tools.ps1 deactivate
#>

param(
    [Parameter(Mandatory, Position = 0)]
    [ValidateSet("activate", "deactivate")]
    [string]$Action
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition

$prompts = @(
    "QuickChange.prompt.md"
)

$devDir    = Join-Path $root "dev\prompts"
$githubDir = Join-Path $root ".github\prompts"

switch ($Action) {
    "activate" {
        $alreadyActive = $false
        foreach ($file in $prompts) {
            if (Test-Path (Join-Path $githubDir $file)) {
                $alreadyActive = $true
                break
            }
        }
        if ($alreadyActive) {
            Write-Host "Dev prompts are already active in .github/prompts/." -ForegroundColor Yellow
            Write-Host "Run '.\dev-tools.ps1 deactivate' first if you want to refresh them."
            exit 0
        }

        foreach ($file in $prompts) {
            Copy-Item (Join-Path $devDir $file) (Join-Path $githubDir $file)
            Write-Host "  + .github/prompts/$file" -ForegroundColor Green
        }
        Write-Host ""
        Write-Host "Dev prompts activated." -ForegroundColor Cyan
        Write-Host ">>> Reload window: Ctrl+Shift+P -> 'Developer: Reload Window'" -ForegroundColor Magenta
        Write-Host "Run '.\dev-tools.ps1 deactivate' when finished." -ForegroundColor Cyan
    }

    "deactivate" {
        $anyFound = $false
        foreach ($file in $prompts) {
            $ghPath  = Join-Path $githubDir $file
            $devPath = Join-Path $devDir $file
            if (Test-Path $ghPath) {
                $anyFound = $true
                # Sync edits back to dev/prompts/ before removing
                Copy-Item $ghPath $devPath -Force
                Remove-Item $ghPath
                Write-Host "  - .github/prompts/$file" -ForegroundColor Yellow
            }
        }
        if (-not $anyFound) {
            Write-Host "No dev prompts found in .github/prompts/. Nothing to deactivate." -ForegroundColor Yellow
            exit 0
        }
        Write-Host ""
        Write-Host "Dev prompts deactivated. Any edits were synced back to dev/prompts/." -ForegroundColor Cyan
        Write-Host ">>> Reload window: Ctrl+Shift+P -> 'Developer: Reload Window'" -ForegroundColor Magenta
    }
}
