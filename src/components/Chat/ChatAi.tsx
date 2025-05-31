'use client'
import './chat.css'
import { FolderClosed, LucideThumbsUp, MessageSquareIcon, RefreshCcw, SendIcon } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"

export const ChatAi = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // const { messages, error, reload, input, handleInputChanges, handleSubmit, isLoading, stop } = useChat({ api: '/api/gemini' })


    /*
         <div className='ai'>
             <span className='text-[12px] ml-[36px] text-accent uppercase font-bold '>AI Khayreddine</span>
             <div className=' flex items-center gap-2 '>
                 <ScanFace />
                 <p className='bg-[#ececec] rounded-xl px-2 py-2 text-[14px]'>pbsacn asdlicln jsuocan</p>
             </div>
         </div>
         <div className='user flex justify-end gap-2 '>
             <p className='bg-white border-black border-[1px] rounded-full px-2 py-2 text-[14px] mx-4 my-2'>pbsacn asdlicln jsuocan</p>
         </div>
    */

    return (
        <div className="cover fixed right-20 bottom-11 bg-white shadow-2xl">
            {isOpen && (
                <div className="h-[500px] w-[400px]">
                    <div className="head border-b-2 border-accent p-3 flex justify-between items-center">
                        <h1 className="text-primary text-xl font-bold italic flex gap-1"><LucideThumbsUp /> Khirdin ai</h1>
                        <div className='flex items-center gap-2'>
                            <RefreshCcw size={14} className='cursor-pointer' />
                            <FolderClosed size={14} className='cursor-pointer' />
                        </div>
                    </div>
                    <div className="relative p-3 mx-auto h-[382px] custom-scrollbar">
                        {/* <div className="message ">
                            {messages.length == 0 && 'no message now'}
                            {messages?.map((message) => )}
                            {error && (
                                <div>
                                    <span>an error occur</span>
                                    <button onClick={reload()}>
                                        <RefreshCcwDot />
                                    </button>
                                </div>
                            )}
                            {isLoading && (
                                <div>
                                    <span>stop generating</span>
                                    <button onClick={stop()}>
                                        <Square />
                                    </button>
                                </div>
                            )}
                        </div> */}
                    </div>
                    <form action="" className="absolute w-[90%] left-2/4 -translate-x-2/4 bottom-3 ">
                        <fieldset>
                            <Input type="text" name='message' id="message" className="h-[40px] focus-visible:!ring-offset-[0px]  bg-[#f0f0f0] rounded-full shadow-lg" />
                        </fieldset>
                        <fieldset>
                            <button type="submit" className="btn-send absolute cursor-pointer w-[40px] h-[46px] rounded-full" >
                                <SendIcon className='text-primary' />
                            </button>
                        </fieldset>
                    </form>
                </div>
            )}
            <div onClick={() => setIsOpen(!isOpen)} className="icon bg-primary p-3 w-14 h-14 flex items-center justify-center cursor-pointer rounded-full hover:opacity-90">
                <MessageSquareIcon color="white" />
            </div>
        </div>
    )
}
