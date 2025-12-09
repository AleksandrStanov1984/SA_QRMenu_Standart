@echo off
title SA Digital Menu – Local Server
color 0A

:: === CONFIG ===
set PORT=8000

:: === НАХОДИМ ЛОКАЛЬНЫЙ IP НА 100% НАДЁЖНО ===
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /c:"IPv4"') do (
    set ip=%%A
)
set ip=%ip: =%

echo ==========================================
echo      Starting SA Digital Menu Server
echo ==========================================
echo Local IP: %ip%
echo Port:     %PORT%
echo Folder:   %cd%
echo ------------------------------------------
echo Opening server...
echo.

:: === ЗАПУСК СЕРВЕРА PYTHON ===
start "" /min cmd /c python -m http.server %PORT%

echo Waiting for server to start...
timeout /t 2 >nul

:: === ОТКРЫВАЕМ МЕНЮ + QR КОД ===
start "" http://%ip%:%PORT%/index.html
start "" http://%ip%:%PORT%/qr.html

echo Server running successfully!
echo Close server using: stop-menu.bat
pause
exit
