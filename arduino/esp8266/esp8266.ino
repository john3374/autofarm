#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>

const char* ssid     = "kppc-sanctuary-l";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "kppckppc";     // The password of the Wi-Fi network
ESP8266WebServer server(80);
String statusJSON = "{}";

void handleRoot();              // function prototypes for HTTP handlers
void handleNotFound();
void turnPumpOn();
void turnPumpOff();
void turnLightOn();
void turnLightOff();
void showStatus();

void connectToInternet() {
  WiFi.begin(ssid, password);             // Connect to the network
  // Serial.print("Connecting to ");
  // Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED)
    delay(1000);
  // Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer

  //  if (MDNS.begin("esp8266")) {              // Start the mDNS responder for esp8266.local
  //    Serial.println("mDNS responder started");
  //  } else {
  //    Serial.println("Error setting up MDNS responder!");
  //  }
}

void setup() {
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  connectToInternet();
  server.on("/", handleRoot);               // Call the 'handleRoot' function when a client requests URI "/"
  server.on("/status", showStatus);
  server.on("/pump-on", turnPumpOn);
  server.on("/pump-off", turnPumpOff);
  server.on("/light-on", turnLightOn);
  server.on("/light-off", turnLightOff);
  server.onNotFound(handleNotFound);        // When a client requests an unknown URI (i.e. something other than "/"), call function "handleNotFound"

  server.begin();                           // Actually start the server
  // Serial.println("HTTP server started");
  pinMode(2, OUTPUT);
}

void loop() {
  server.handleClient();
}

void respondStatus() {
  delay(100);
  if (Serial.available())
    server.send(200, "application/json", Serial.readString());
  else
    server.send(200, "text/plain", "no answer");
}
void handleRoot() {
  server.send(200, "application/json", statusJSON);   // Send HTTP status 200 (Ok) and send some text to the browser/client
}

void handleNotFound() {
  server.send(404, "text/plain", "404: Not found"); // Send HTTP status 404 (Not Found) when there's no handler for the URI in the request
}

void showStatus() {
  Serial.println(1);
  respondStatus();
}

void turnPumpOn() {
  Serial.println(6);
  respondStatus();
}

void turnPumpOff() {
  Serial.println(2);
  respondStatus();
}

void turnLightOn() {
  Serial.println(30);
  respondStatus();
}

void turnLightOff() {
  Serial.println(10);
  respondStatus();
}
