#include <Servo.h>  // includes the library for using the servo

int sensorPin0 = A0;  // select the input pin for the potentiometer
//int sensorPin1 = A1;
//int sensorPin2 = A2;

int sensorValue0 = 0;  // variable to store the value coming from the sensor
//int sensorValue1 = 0;
//int sensorValue2 = 0;

int pos = 0;    // initializes the variable for moving the servo

bool watering = 0;     //  uses a bool for saying if the system is watering the plants

Servo myservo;

void setup() {
   Serial.begin(9600);   // starts the serial
   myservo.attach(3);    // sets the servo in the pin #3 
}

void loop() {
  
  // read the value from the sensors. We use only one, but it's implemented for 3
  sensorValue0 = analogRead(sensorPin0);    
  //sensorValue1 = analogRead(sensorPin1);
  //sensorValue2 = analogRead(sensorPin2);
  delay(1000);          
  // prints the value
  Serial.print("sensor0 = " );                 
  Serial.println(sensorValue0);
  //Serial.print("sensor1 = " );                       
  //Serial.println(sensorValue1);
  //Serial.print("sensor2 = " );                       
  //Serial.println(sensorValue2);

  // Conditions for water the plants if they are dry
   
  if((sensorValue0 < 90) && /*(sensorValue1 < 90) && (sensorValue2 < 90) &&*/ !watering){
   watering = !watering;
   Serial.println("Moviendo servo...");
   /*for (pos = 0; pos <= 180; pos += 10) {    // goes from 0 degrees to 180 degrees
    myservo.write(pos);                     // tell servo to go to position in variable 'pos'
    delay(15);                              // waits 15ms for the servo to reach the position
    }*/
   pos=90;
   myservo.write(pos);
   Serial.println("Fin mover servo"); 
  }

  if((sensorValue0 > 150)/* && (sensorValue1 > 150) && (sensorValue2 > 150)*/ && watering){
   watering = !watering;
   Serial.println("Moviendo servo...");
   /*for (pos = 180; pos <= 0; pos= pos-10) {   // goes from 0 degrees to 180 degrees
    myservo.write(pos);                     // tell servo to go to position in variable 'pos'
    delay(15);                              // waits 15ms for the servo to reach the position
    }*/
    pos=0;
    myservo.write(pos);  
  Serial.println("Fin mover servo");
  }
}
