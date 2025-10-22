import './App.css'

function App() {

  return (
    <>
      <div className="h-full w-full max-w-7xl mx-auto">
        <div className="p-4 m-4 border rounded-2xl border-gray-500">
          <div>
            <div>
              chats list
            </div>
            <div>
              {/* Chat messages will go here */}
              <div>
                <div className="chat-ai-message">
                  test message normal AI
                </div>
                <div className="chat-user-message">
                  test message user
                </div>
                <div className="chat-ai-message">
                  test message normal AI
                </div>
                <div className="chat-user-message">
                  test message user
                </div>
              </div>
              <div>
                <input placeholder={'Escribe tu mensaje aqui...'}/>
                <button>Enviar</button>
                {/* Input area for user to type messages */}
              </div>
            </div>
          </div>
        </div>
          
      </div>
      
    </>
  )
}

export default App
