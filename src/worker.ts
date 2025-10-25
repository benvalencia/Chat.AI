import {MLCEngine, ServiceWorkerMLCEngine} from "@mlc-ai/web-llm";

const engine = new MLCEngine();
const handler = new ServiceWorkerMLCEngine(engine);

self.onmessage = (event: MessageEvent) => {
  handler.onmessage(event)
}