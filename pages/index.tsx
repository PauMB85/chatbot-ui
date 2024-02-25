import Chatbot from '@/aplicacion/chatbot';
import Title from '@/components/header/title';

export default function Home() {

  return(
    <div className="container mx-auto max-w-screen-xl h-screen flex flex-col justify-between">
      <Title />
      <Chatbot />
    </div>
  )
}