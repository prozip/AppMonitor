import ctypes
import ctypes.wintypes
from backend.view import View
import psutil

WINEVENT_OUTOFCONTEXT = 0x0000
EVENT_SYSTEM_FOREGROUND = 0x0003
WINEVENT_SKIPOWNPROCESS = 0x0002
EVENT_SYSTEM_MINIMIZESTART = 0x0016
EVENT_SYSTEM_MINIMIZEEND = 0x0017
user32 = ctypes.windll.user32
ole32 = ctypes.windll.ole32
pid = ctypes.wintypes.DWORD()


class Window:

    name = 0
    pid = 0

    @staticmethod
    def listen_forever():
        GetWindowText = ctypes.windll.user32.GetWindowTextW
        GetWindowTextLength = ctypes.windll.user32.GetWindowTextLengthW
        GetWindowThreadProcessId = ctypes.windll.user32.GetWindowThreadProcessId
        ole32.CoInitialize(0)

        WinEventProcType = ctypes.WINFUNCTYPE(
            None,
            ctypes.wintypes.HANDLE,
            ctypes.wintypes.DWORD,
            ctypes.wintypes.HWND,
            ctypes.wintypes.LONG,
            ctypes.wintypes.LONG,
            ctypes.wintypes.DWORD,
            ctypes.wintypes.DWORD
        )

        def callback(hWinEventHook, event, hwnd, idObject, idChild, dwEventThread,
                     dwmsEventTime):
            length = GetWindowTextLength(hwnd)
            buff = ctypes.create_unicode_buffer(length + 1)
            GetWindowText(hwnd, buff, length + 1)

            tid = GetWindowThreadProcessId(
                hwnd, ctypes.byref(pid))
            cPid = pid.value
            cName = buff.value
            p = psutil.Process(cPid)

            if ((cPid != Window.pid) & (cPid != 0)):
                Window.pid = cPid
                Window.name = cName
                arr = cName.split(' - ')
                if (cName != ""):
                    cName = arr[-1]
                    title = ' - '.join(arr[:-1])
                    if (len(title) > 30):
                        title = title[:30] + '...'
                    else:
                        title = title[:30]
                else:
                    title = ''
                View.evaluate_js('setCurrentProcess',
                                 cName, p.name(), cPid, title)

        WinEventProc = WinEventProcType(callback)
        user32.SetWinEventHook.restype = ctypes.wintypes.HANDLE
        hook = user32.SetWinEventHook(
            EVENT_SYSTEM_FOREGROUND,
            EVENT_SYSTEM_FOREGROUND,
            0,
            WinEventProc,
            0,
            0,
            WINEVENT_OUTOFCONTEXT
        )
        hook2 = user32.SetWinEventHook(
            EVENT_SYSTEM_MINIMIZEEND,
            EVENT_SYSTEM_MINIMIZEEND,
            0,
            WinEventProc,
            0,
            0,
            WINEVENT_OUTOFCONTEXT
        )
        if (hook == 0) | (hook2 == 0):
            print('SetWinEventHook failed')
            exit(1)

        msg = ctypes.wintypes.MSG()
        while user32.GetMessageW(ctypes.byref(msg), 0, 0, 0) != 0:
            user32.TranslateMessageW(msg)
            user32.DispatchMessageW(msg)

        # Stopped receiving events, so clear up the winevent hook and uninitialise.
        user32.UnhookWinEvent(hook)
        ole32.CoUninitialize()
