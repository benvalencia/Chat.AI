import './Message.css'

function Message({ message, agent = false }: { message: string, agent?: boolean }) {

  return (
    <>
      <div>
        {agent ? (
          <div className="flex flex-col flex-1 place-items-start">
            <div>
              Chat.AI
            </div>
            <div className="max-w-4/5 flex flex-col gap-3 p-4 border-gray-200 bg-gray-700 rounded-es-xl rounded-e-xl">
              <div>
                {message}
              </div>
            </div>
          </div>
          ) : (
          <div className="flex flex-col flex-1 place-items-end">
            <div className="max-w-4/5 flex p-4 border-gray-200 bg-gray-700 rounded-s-xl rounded-ee-xl">
              <div className="text-right">
                {message}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  )
}

export default Message
