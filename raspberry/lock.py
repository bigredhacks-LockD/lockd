from servocontroller import ServoController
import time
class Lock():

    def __init__(self, controller:ServoController) -> None:
        self.controller = controller

    def lock(self):
        self.controller.move_servos({0: 2500})
        time.sleep(2)
        self.rest()
    
    def unlock(self):
        self.controller.move_servos({0:0})
        time.sleep(2)
        self.rest()

    def rest(self):
        self.controller.hat.turnOffAllPWM()
        


if __name__ == "__main__":
    lock = Lock()


    lock.lock()

    time.sleep(2)

    lock.unlock()

    