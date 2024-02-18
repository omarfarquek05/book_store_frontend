import { TiLockOpen } from "react-icons/ti";


const Test = () => {
   
  return (
    <>
    
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>
  < TiLockOpen  className="text-yellow-400 text-2xl"/>
</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <div className="diff aspect-[16/9]">
  <div className="diff-item-1">
    <div className="text-yellow-400/100 text-primary-content text-9xl bg-gradient-to-r from-pink-500 to-violet-500 grid place-content-center"> JOY </div>
  </div>
  <div className="diff-item-2">
    <div className="bg-base-200 text-9xl font-black grid place-content-center"> JOY </div>
  </div>
  <div className="diff-resizer"></div>
</div>
  
  </div>
</dialog>

    </>
  )
}

export default Test