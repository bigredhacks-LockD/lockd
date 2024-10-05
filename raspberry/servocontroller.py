from hat import PCA9685

class ServoController:
    def __init__(self, pwm_freq=50):
        self.hat = PCA9685()
        self.hat.setPWMFreq(pwm_freq)

    @staticmethod
    def degrees_to_pwm(degrees, degreelimits=(-180, 180), pwmlimits=(500, 2500), invert=False):
        min_degree, max_degree = degreelimits
        min_pwm, max_pwm = pwmlimits

        if degrees < min_degree or degrees > max_degree:
            raise ValueError(f"Degrees value {degrees} is out of range ({min_degree}, {max_degree})")

        if invert:
            # Invert the PWM calculation
            pwm_value = max_pwm - (degrees - min_degree) * (max_pwm - min_pwm) / (max_degree - min_degree)
        else:
            pwm_value = min_pwm + (degrees - min_degree) * (max_pwm - min_pwm) / (max_degree - min_degree)

        return int(pwm_value)

    def move_servos(self, pwm_map):
        self.hat.moveServos(pwm_map)    