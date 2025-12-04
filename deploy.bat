@echo off
REM Deploy Supabase Edge Function Script for Windows

echo.
echo ========================================
echo  Warung Digital Arkan - Deploy Script
echo ========================================
echo.

REM Check if supabase CLI is installed
where supabase >nul 2>nul
if errorlevel 1 (
    echo [!] Supabase CLI not found. Installing...
    echo Please install from: https://supabase.com/docs/guides/cli
    echo.
    echo For Windows with Homebrew:
    echo   brew install supabase/tap/supabase
    echo.
    echo For Windows direct installation:
    echo   1. Download from https://github.com/supabase/cli/releases
    echo   2. Add to PATH
    echo.
    pause
    exit /b 1
)

echo [✓] Supabase CLI found

REM Get current directory
cd /d "%~dp0"

echo.
echo [*] Linking to Supabase project...
call supabase link --project-ref etvwxarauhbutuxrjqpf

echo.
echo [*] Deploying server edge function...
call supabase functions deploy server

echo.
echo [✓] Deploy complete!
echo.
echo Next steps:
echo 1. Wait for function to be Active on Supabase dashboard
echo 2. Run: npm run dev
echo 3. Open http://localhost:3000
echo 4. Login to admin and check Manajemen Pelanggan
echo.
pause
