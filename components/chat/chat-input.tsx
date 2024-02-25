import { FC, FormEvent, KeyboardEvent, useRef } from "react";

interface ChatInputProps {
  callApi: (value: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({callApi}) => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePressDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value.trim() !== '') {
      callApi(inputRef.current?.value || '');
      inputRef.current!.value = '';
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value.trim() !== '') {
      callApi(inputRef.current?.value || '');
      inputRef.current!.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 mb-8">
      <label className="input input-bordered flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          className="grow"
          placeholder="Type here"
          onKeyDown={handlePressDown}
        />
        <button type="submit">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
          </svg>
        </button>
      </label>
    </form>
  )
}

export default ChatInput;