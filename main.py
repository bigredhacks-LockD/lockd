from raspberry.lock import Lock
import time

if __name__ == "__main__":
    lock = Lock()

    lock.lock()

    time.sleep(5)

    lock.unlock()

    