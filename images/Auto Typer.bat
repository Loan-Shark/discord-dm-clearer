::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAjk
::fBw5plQjdCyDJGyX8VAjFBpZRQiHAE+1BaAR7ebv/Nagq1k1QeADfIbI2bucJK0E70epZpU/12pfivcFARpfewGXZww7p2hLuGCAJYqYuhziRVqNqx9mTTQh3zTv3XlpNIYx0pFKnSm98y0=
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+JeA==
::cxY6rQJ7JhzQF1fEqQJQ
::ZQ05rAF9IBncCkqN+0xwdVs0
::ZQ05rAF9IAHYFVzEqQJQ
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWDk=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATElA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJGyX8VAjFBpZRQiHAE+1BaAR7ebv/Nagq1k1QeADfIbI2bucJK0E70epZpU/12pfivctGQ9XPiayfgom52taswQ=
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
title Discord Auto Typer
mode con:cols=62 lines=30
color 04

set NULL_VAL=null
set NODE_VER=%NULL_VAL%
set NODE_EXEC=node-v10.15.3-x86.msi

node -v >.tmp_nodever
set /p NODE_VER=<.tmp_nodever
del .tmp_nodever

IF "%NODE_VER%"=="%NULL_VAL%" (
    echo.
    echo Node.js is not installed! Please press a key to download and install it from the website that will open.
    PAUSE
    start "" http://nodejs.org/dist/v10.15.3/%NODE_EXEC%
    echo.
    echo.
    echo After you have installed Node.js, press a key to shut down this process. Please restart it again afterwards.
    PAUSE
    EXIT
) ELSE (
    goto Prompt
)

:Prompt
cls
if exist temp goto StartScript

:InstallNodeModules
call npm i qrcode-terminal
cls
call npm i jsqr
cls
call npm i @andreekeberg/imagedata
cls
call npm i puppeteer-extra
cls
call npm i puppeteer-extra-plugin-stealth
cls
call npm i cli-spinners
cls
call npm i readline
cls
call npm i process
cls
call npm i timers
echo "Ur Cute ;)">temp
goto StartScript

:StartScript
cls
node index.js
exit