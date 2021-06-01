from backend.window import Window
from backend.view import View
from time import sleep
import threading, psutil

def listenActiveWindow():
    def runThread():
        Window.listen_forever()

    t = threading.Thread(target=runThread)
    t.setDaemon(True)
    t.start()

def listenSystemInfo():
    def setInfo():
        while True:
            battery = psutil.sensors_battery().percent
            memory = psutil.virtual_memory().percent
            disk = psutil.disk_usage('/').percent
            View.evaluate_js('setInfo',str(battery),str(disk), str(memory))
            sleep(5)   

    t = threading.Thread(target=setInfo)
    t.setDaemon(True)
    t.start()    

def MainRun():
    print('backend running')

    listenActiveWindow()
    listenSystemInfo()