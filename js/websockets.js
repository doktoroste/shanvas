const ws = new WebSocket('ws://192.168.1.109:8080')

let webSocketSend = async (shanvasId, content) => {
    console.warn('Connection not ready')
}

ws.onopen = async () => {
    webSocketSend = (shanvasId, content) => {
        const obj = {
            id: shanvasId,
            data: content,
        }
        ws.send(JSON.stringify(obj))
    }
}
