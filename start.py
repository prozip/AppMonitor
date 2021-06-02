import webview
from backend.main import MainRun
from backend.view import View

class Api:
    def __init__(self):
        pass

def backend(window):
    View.init(window)
    MainRun()

def on_closing():
    print('closed')

if __name__ == '__main__':
    api = Api()
    window = webview.create_window('App Monitor', './frontend/index.html', js_api=api,min_size=(1050,690))
    window.closing += on_closing
    webview.start(backend, window)