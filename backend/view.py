class View:
    window = None

    @staticmethod
    def init(window):
        View.window = window

    @staticmethod 
    def evaluate_js(func, *argv):
        cmd = "("
        for arg in argv:
            cmd = cmd + "'" + str(arg) + "',"
        cmd = func + cmd + ")"
        View.window.evaluate_js(cmd)
