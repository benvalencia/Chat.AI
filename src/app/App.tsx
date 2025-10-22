import './App.css'
import Message from "../components/message/Message.tsx";

function App() {

  return (
    <>
      <div className="h-dvh w-full max-w-7xl flex-1 mx-auto">
        <div className="pl-4 pr-4 pt-2 ml-4 mr-4 mt-2">
          <h1>Chat.AI</h1>
        </div>
        <div className="pl-4 pr-4 pt-4 ml-4 mr-4 mt-4 border rounded-2xl border-gray-500 flex flex-1 flex-col h-[80vh]">
          <div className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col mb-4 justify-end">
              <Message agent={true} message="test de mensaje "></Message>
              <Message message="test de mensaje user "></Message>
              <Message agent={true} message="test de mensaje agent 2 "></Message>
              <Message message="test de mensaje user "></Message>
            </div>
            <div className="p-2">
              <form className="flex flex-1 flex-row gap-4 pb-4">
                <input type="text" placeholder="Pregunta algo..." className="p-4 pl-5 pr-5 flex-1 outline-none border border-gray-600 rounded-2xl"/>
                <button>Enviar</button>
              </form>
            </div>
          </div>
        </div>
          
      </div>
      
    </>
  )
}

export default App
