export default function TimePicker() {
  return (
    <form>
      <input 
        type="time" 
        id="time" 
        name="time" 
        className='w-full text-center text-gray-500 bg-[#333] border border-[#444] rounded py-1' 
      />
    </form>
  );
}
