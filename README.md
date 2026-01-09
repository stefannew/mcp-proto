
# Super High Level General Concepts:

`POST /mcp` = call + reply (tool calls)
`GET /mcp` = server push channel (unsolicited stuff / async notifications)

An `ask` tool call might look like:

`POST /mcp`
```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "tools/call",
  "params": {
    "name": "ask",
    "arguments": {
      "web_sources": true,
      "foo": "bar"
    }
  }
}
```

Tools can either respond with a straight "application/json" or a "text/event-stream".
In the case of our tool call, we'll reply with a "text/event-stream" and we'll stream back
the SSE messages.

The /ask tool call would return something like a list of { uri, title, chunk } for the sources used to generate
the answer.

The client would then request the sources used to generate the answer with a request to
`resources/read`.

Where this doesn't fit is with web sources..., perhaps we can just push these up the SSE stream.

# LifeCycle

1. Client begins by sending an "intialize" request:

<img width="2121" height="1152" alt="mcp-initialize" src="https://github.com/user-attachments/assets/ce1ecd86-b5ca-4cf3-a53d-3ec6a9f0f019" />

2. Client takes the mcp session id and sends it as a header on a `notifications/initialized` request:
(all subsequent requests will include the mcp-session-id as a header)

<img width="2131" height="753" alt="mcp-intiailized" src="https://github.com/user-attachments/assets/f1150dc8-0246-4f6d-b4f9-9ff908b7350f" />

3. Client sends a list-tools request:
   
<img width="2126" height="1134" alt="mcp-list-tools" src="https://github.com/user-attachments/assets/a653bff6-1fed-4fbe-b16e-6669318575d0" />

4. Client sends a tool call request:

<img width="2113" height="1115" alt="mcp-tool-call" src="https://github.com/user-attachments/assets/1612b144-9a77-45ec-ade3-e1755c040956" />
