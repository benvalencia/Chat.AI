import './App.css'
import Message from "../components/message/Message.tsx";
import {useEffect, useRef, useState} from "react";
import {CreateMLCEngine} from "@mlc-ai/web-llm";

let modelStatus;
let modelLoading;
const initProgressCallback = (initProgress) => {
  modelStatus = initProgress;
  modelLoading = true

  if (initProgress.progress === 1) {
    modelLoading = false
  }
}
const model = await CreateMLCEngine(
  'gemma-2b-it-q4f32_1-MLC', {
    initProgressCallback: initProgressCallback
  }
)

function App() {

  const [messages, setMessages] = useState<any[]>([]);
  const [scrollHeight, setScrollHeight] = useState<Number>(0);
  const [typingMessageFlag, setTypingMessageFlag] = useState<boolean>(false);
  const [typingMessage, setTypingMessage] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const messagesArray = [];
  const requestModel = async (e) => {
    e.preventDefault();
    const requestText = e.target[0].value.trim();

    if (requestText !== '') {
      e.target[0].value = ''
    }

    messageHandler(requestText)
    messagesArray.push(
      {
        role: 'user',
        content: requestText,
      });
    
    const chunks = await model.chat.completions.create({
      messages: messagesArray,
      stream: true
    })

    let reply = '';
    
    for await (const chunk of chunks) {
      setTypingMessageFlag(true)
      const [choice] = chunk.choices;
      const content = choice?.delta?.content ?? '';
      reply += content
      setTypingMessage(reply)

      if (scrollRef?.current) {
        setScrollHeight(scrollRef.current.clientHeight)
      }
    } 
    
    messagesArray.push({content: reply, role: 'system'});
    messageHandler(reply, true)
  }

  const messageHandler = (message, agent = false) => {
    setTypingMessageFlag(false)
    setMessages((prevMessages) => [...prevMessages, {content: message, role: agent? 'system' : 'user'}]);

    if (scrollRef?.current) {
      setScrollHeight(scrollRef.current.clientHeight)
    }
  }

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef?.current?.scrollIntoView({behavior: "smooth", block: "end"})
    }
  }, [scrollHeight]);


  return (
    <>
      <div className="h-[90vh] w-full max-w-7xl flex-1 mx-auto">
        <div className="pl-4 pr-4 pt-2 ml-4 mr-4 mt-2 flex flex-row justify-between">
          <h1>Chat.AI</h1>
        </div>
        <div className='pl-4 pr-1 ml-4 mr-4 mt-4 border rounded-2xl border-gray-500'>
          <div className="pr-5 flex flex-1 flex-col h-[80vh] overflow-auto">
            <div className="flex flex-col flex-1">
              <div ref={scrollRef} className="flex flex-1 flex-col mb-4 justify-end gap-3">
                {
                  messages.map((message: { content: string, role: string }, key: number) =>
                    <div key={key}>
                      <Message  message={message.content}
                                agent={message.role === 'system'}/>
                    </div>
                    )
                }
                {
                  typingMessageFlag ?
                    <Message  message={typingMessage}
                              agent={true}/> : null
                }
              </div>
            </div>
          </div>
          <div className="p-2 pt-3 sticky bottom-0 bg-[#242424] rounded-2xl">
            <form className="flex flex-1 flex-row gap-4 pb-4" onSubmit={(e) => requestModel(e)}>
              <input type="text" placeholder="Pregunta algo..."
                     className="p-4 pl-5 pr-5 flex-1 outline-none border border-gray-600 rounded-2xl"/>
              <button disabled={modelLoading}>Enviar</button>
            </form>
          </div>
        </div>
        <div className="pl-4 pr-4 pt-2 ml-4 mr-4 mt-2 flex flex-row justify-between">
          <span>{modelStatus?.text}</span>
        </div>
      </div>

    </>
  )
}

export default App
