import React, { useRef, useState } from 'react'
import { usechatstore } from '../store/usechatstore'
import { ImagePlus } from 'lucide-react';


const MessageInput = () => {

  const { sendmessage } = usechatstore();
  const [data, setdata] = useState({ text: "", image: "" });

  const [img, setimg] = useState("");

  const reffile = useRef();

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setdata((pre) => ({ ...pre, [name]: value }))
  };

  const sumbithandler = (e) => {
    e.preventDefault();
    sendmessage({
      text: data.text,
      image: img
    })
    setdata({
      text:"",
    })
    setimg("")
  };

  const imagehandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const img = reader.result;
      setimg(img);
    }
  };

  return (
    <div className=' p-4 border-t border-slate-700'>
      {img && (
        <div className='mb-4 relative w-fit'>
          <img
            src={img}
            alt="preview"
            className='
            w-32
            h-32
            object-cover
            rounded-2xl
            border border-slate-700
            shadow-lg
          '
          />

          <button
            onClick={() => setimg("")}
            className='
            absolute
            -top-2
            -right-2
            w-6
            h-6
            rounded-full
            bg-red-500
            text-white
            text-sm
            flex
            items-center
            justify-center
            hover:bg-red-600
            transition-all
          '
          >
            ✕
          </button>
        </div>
      )}
      <form
        onSubmit={sumbithandler}
        className='items-center flex gap-2'
      >

        <input
          type="text"
          name='text'
          placeholder='Enter your text here...'
          onChange={onchangehandler}
          value={data.text}
          className='
          w-full
          bg-slate-900/80
          text-white
          placeholder:text-slate-400
          border border-slate-700
          rounded-2xl
          px-5 py-3
          outline-none
          shadow-lg
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/30
          transition-all
          duration-300'
        />

        <input
          type="file"
          ref={reffile}
          hidden
          accept="image/*"
          onChange={imagehandler}
        />

        <button
          type="button"
          onClick={() => reffile.current.click()}
          className='
          p-3
          rounded-full
          bg-slate-800
          hover:bg-slate-700
          transition-all
          shadow-md
          flex
          items-center
          justify-center'
        >
          <ImagePlus className="w-5 h-5 text-white" />
        </button>

        <button
          type="submit"
          className=' p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md flex
          items-center
          justify-center'
          onSubmit={onchangehandler}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default MessageInput
