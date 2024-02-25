import Chatbot from '@/aplicacion/chatbot';
import Title from '@/components/header/title';

export default function Home() {

  return(
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex flex-col h-screen">
        <Title />
        <Chatbot />
      </div>
    </div>
  )
}