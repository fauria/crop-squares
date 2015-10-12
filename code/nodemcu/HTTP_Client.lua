-- A simple http client
-- tmr.delay(2000000)
timerId = 0
timerDelay = 5000 -- 5sec
tmr.alarm(timerId, timerDelay, 1, function()
    print("My routine 5000")
    conn=net.createConnection(net.TCP, false) 
    conn:on("receive", function(conn, pl) print(pl) end)
    conn:connect(3000,"192.168.1.102")
    conn:send("GET / HTTP/1.1\r\nHost: www.nodemcu.com\r\n"
        .."Connection: keep-alive\r\nAccept: */*\r\n"
        .."User-Agent: NodeMCU on ESP8266\r\n\r\n")
end)
