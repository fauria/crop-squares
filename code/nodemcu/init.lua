-- Executed everytime it restarts or power on
--

function doFiles()
    -- dofile('listap.lua')
    dofile('WiFi_Futurehacks.lua')
    dofile('publish_MQTT.lua')
end

tmr.alarm(0, 10000, 0, doFiles)
