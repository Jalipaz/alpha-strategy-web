@echo off
setlocal

set "INPUT=C:\Users\alipa\alpha-strategy-web\resultados\sonrie-video-dia-madre-2026.html"
set "OUTPUT=C:\Users\alipa\alpha-strategy-web\resultados\sonrie-video-dia-madre-2026.pdf"

set "EDGE="
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" set "EDGE=C:\Program Files\Microsoft\Edge\Application\msedge.exe"

if "%EDGE%"=="" (
  echo No se encontro Microsoft Edge. Probando con Chrome...
  if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" set "EDGE=C:\Program Files\Google\Chrome\Application\chrome.exe"
  if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" set "EDGE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)

if "%EDGE%"=="" (
  echo No se encontro ni Edge ni Chrome. Abre el HTML manualmente y usa Ctrl+P ^> Guardar como PDF.
  pause
  exit /b 1
)

echo Generando PDF con: %EDGE%
"%EDGE%" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="%OUTPUT%" "file:///%INPUT:\=/%"

if exist "%OUTPUT%" (
  echo.
  echo PDF generado: %OUTPUT%
) else (
  echo.
  echo Algo fallo. Probando modo headless antiguo...
  "%EDGE%" --headless --disable-gpu --print-to-pdf="%OUTPUT%" "file:///%INPUT:\=/%"
  if exist "%OUTPUT%" (
    echo PDF generado: %OUTPUT%
  ) else (
    echo No se pudo generar el PDF. Abre el HTML en el navegador y usa Ctrl+P ^> Guardar como PDF.
  )
)

pause
