export function setupSse(rootElement: HTMLElement) {
    var eventSource = new EventSource('/sse');

    eventSource.onmessage = function(event) {
        rootElement.innerText += event.data + '\\n\\n';
    };
}