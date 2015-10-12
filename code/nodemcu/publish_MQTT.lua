function sendData(moisture)
    m = mqtt.Client("18fe34fc04de", 60, "", "")
    m:connect( "test.mosquitto.org", 1883, 0)
    m:on("connect", function(client)
        print("Callback connect")
        m:publish( "18fe34fc04de-soil", "{\"sensor\": 1, \"value\": "..moisture.."}", 0, 0 )
        m:close()
    end)
end
