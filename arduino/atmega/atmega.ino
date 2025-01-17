#include <avr/sleep.h>
#define INTERRUPT_SWITCH 2
#define MANUAL_FAN_SWITCH 10
#define MANUAL_PUMP_SWITCH 11
#define MANUAL_LIGHT_SWITCH 12
#define PUMP_RELAY 6
#define LIGHT_RELAY 7
#define FAN_RELAY 8

int isPumpOn = 0, isLightOn = 0, isFanOn = 0;
int switchVal;

void clickSwitch(int pin, int relay, int* isOn) {
  switchVal = digitalRead(pin);
  if (switchVal == 0) {
    while (!digitalRead(pin))
      delay(10);
    if (*isOn)
      digitalWrite(relay, HIGH);
    else
      digitalWrite(relay, LOW);
    *isOn = 1 - *isOn;
  }
}

void printStatus() {
  Serial.print("{light:");
  Serial.print(isLightOn);
  Serial.print(",pump:");
  Serial.print(isPumpOn);
  Serial.print(",fan:");
  Serial.print(isFanOn);
  Serial.println("}");
}

void wakeUp() {
  // Serial.println("woke up");
  sleep_disable();
  detachInterrupt(0);
}

void goSleep() {
  sleep_enable();
  attachInterrupt(0, wakeUp, LOW);
  set_sleep_mode(SLEEP_MODE_PWR_DOWN);
  digitalWrite(13, LOW);
  delay(1000);
  sleep_cpu();
  // Serial.println("just woke up!");
  digitalWrite(13, HIGH);
}

void setup() {
  Serial.begin(115200);
  pinMode(INTERRUPT_SWITCH, INPUT_PULLUP);
  pinMode(MANUAL_PUMP_SWITCH, INPUT_PULLUP);
  pinMode(MANUAL_LIGHT_SWITCH, INPUT_PULLUP);
  pinMode(MANUAL_FAN_SWITCH, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  // https://arduino.stackexchange.com/questions/66654/what-is-the-default-setting-for-a-digital-output-pin
  digitalWrite(PUMP_RELAY, LOW);
  digitalWrite(LIGHT_RELAY, LOW);
  digitalWrite(FAN_RELAY, LOW);
  pinMode(PUMP_RELAY, OUTPUT);
  pinMode(LIGHT_RELAY, OUTPUT);
  pinMode(FAN_RELAY, OUTPUT);
  digitalWrite(13, HIGH);
}

void loop() {
  clickSwitch(MANUAL_PUMP_SWITCH, PUMP_RELAY, &isPumpOn);
  clickSwitch(MANUAL_LIGHT_SWITCH, LIGHT_RELAY, &isLightOn);
  clickSwitch(MANUAL_FAN_SWITCH, FAN_RELAY, &isFanOn);
  switchVal = digitalRead(INTERRUPT_SWITCH);
  if (switchVal == 0) {
    while (!digitalRead(INTERRUPT_SWITCH))
      delay(10);
    goSleep();
    delay(2000);
  }
  if (Serial.available()) {
    int cmd = Serial.parseInt();
    // ignore 0 since invalid int value returns 0
    // 00001 - status
    if (cmd > 0) {
      if (cmd & 1)
        printStatus();
      // 00110 - pump
      cmd >>= 1;
      if (cmd & 1) {
        cmd >>= 1;
        isPumpOn = cmd & 1;
        digitalWrite(PUMP_RELAY, cmd & 1);
        printStatus();
      } else
        cmd >>= 1;
      // 11000 - light
      cmd >>= 1;
      if (cmd & 1) {
        cmd >>= 1;
        isLightOn = cmd & 1;
        digitalWrite(LIGHT_RELAY, cmd & 1);
        printStatus();
      } else
        cmd >>= 1;
      // 1100000 - fan
      cmd >>= 1;
      if (cmd & 1) {
        cmd >>= 1;
        isFanOn = cmd & 1;
        digitalWrite(FAN_RELAY, cmd & 1);
        printStatus();
      } else
        cmd >>= 1;
    }
  }
  delay(50);
}
