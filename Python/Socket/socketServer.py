import socket
import sys
import base64
import hashlib
from thread import *
def log_file(txt):
    f=open("D:/log.txt","wb")
    f.write(txt)
    f.close()


def handshakeStr(conn):
    key = None
    data = conn.recv(8192)
    if not len(data):
        return False
    for line in data.split('\r\n\r\n')[0].split('\r\n')[1:]:
        k, v = line.split(':')
        if k == 'Sec-WebSocket-Key':
            key = base64.b64encode(hashlib.sha1(v + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest())
    if not key:
        conn.close()
        return False
    response = 'HTTP/1.1 101 Switching Protocols\r\n'\
               'Upgrade: websocket\r\n'\
               'Connection: Upgrade\r\n'\
               'Sec-WebSocket-Accept:' + key + '\r\n\r\n'
    return response


HOST = '192.168.1.103'   # Symbolic name meaning all available interfaces
PORT = 8888 # Arbitrary non-privileged port
 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket created'
 
#Bind socket to local host and port
try:
    s.bind((HOST, PORT))
except socket.error , msg:
    print 'Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1]
    sys.exit() 
     
print 'Socket bind complete'
 
#Start listening on socket
s.listen(1000)
print 'Socket now listening'
 
#Function for handling connections. This will be used to create threads
def clientthread(conn):
    #Sending message to connected client
    #shakeStr=handshakeStr(conn)
    conn.send("shakeStr") #send only takes string
     
    #infinite loop so that function do not terminate and thread do not end.
    while True:
         
        #Receiving from client
        data = conn.recv(8024)
        log_file(data)
        reply = 'OK' + data
        if not data: 
            break
     
        conn.sendall(reply)
     
    #came out of loop
    conn.close()
 
#now keep talking with the client
while 1:
    #wait to accept a connection - blocking call
    conn, addr = s.accept()
    print 'Connected with ' + addr[0] + ':' + str(addr[1])
    log_file(conn.recv(8024))
    #start new thread takes 1st argument as a function name to be run, second is the tuple of arguments to the function.
    start_new_thread(clientthread ,(conn,))
 
s.close()







