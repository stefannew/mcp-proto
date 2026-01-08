1. Client begins by sending an "intialize" request:

<img width="2121" height="1152" alt="mcp-initialize" src="https://github.com/user-attachments/assets/ce1ecd86-b5ca-4cf3-a53d-3ec6a9f0f019" />

2. Client takes the mcp session id and sends it as a header on a `notifications/initialized` request:
(all subsequent requests will include the mcp-session-id as a header)

<img width="2131" height="753" alt="mcp-intiailized" src="https://github.com/user-attachments/assets/f1150dc8-0246-4f6d-b4f9-9ff908b7350f" />

3. Client sends a list-tools request:
   
<img width="2126" height="1134" alt="mcp-list-tools" src="https://github.com/user-attachments/assets/a653bff6-1fed-4fbe-b16e-6669318575d0" />

4. Client sends a tool call request:

<img width="2113" height="1115" alt="mcp-tool-call" src="https://github.com/user-attachments/assets/1612b144-9a77-45ec-ade3-e1755c040956" />
