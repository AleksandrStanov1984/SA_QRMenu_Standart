@echo off
title SA Digital Menu – Stop Server
color 0C

set PORT=8000

echo ==========================================
echo  Stopping SA Digital Menu Server (port %PORT%)
echo ==========================================

:: Ищем все процессы, слушающие порт
set FOUND=0
for /f "tokens=5" %%P in ('netstat -aon ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
    echo Found server PID: %%P
    taskkill /PID %%P /F >nul 2>&1
    set FOUND=1
)

if "%FOUND%"=="0" (
    echo No process found on port %PORT%.
) else (
    echo HTTP server on port %PORT% stopped.
)

echo.
echo
echo ==========================================
pause
exit
