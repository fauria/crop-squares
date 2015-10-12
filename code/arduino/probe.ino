// Blinking led
int ledPin = 13;

// Analog input for soil moisture sensor.
int soilPin = A0;

void setup() {  
  pinMode(ledPin, OUTPUT);
  pinMode(soilPin, INPUT);  

  // Ensure NodeMCU runs init.lua on the ESP8266.
  // Debug: Figure out why sometimes does not work.
  Serial.begin(9600);
  Serial.println("dofile('init.lua')");
}

void loop() {  
  digitalWrite(ledPin, LOW);
  String moisture = String(analogRead(soilPin));
  delay(3000);
  digitalWrite(ledPin, HIGH);
  
  // Call Lua's sendData() function
  Serial.println("sendData(" + moisture + ")");
  delay(7000);
}
