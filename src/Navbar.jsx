// Navbar.js
const Navbar = () => {
    return (
      <nav className="w-[430px] h-[88px] bg-[#9effb9]/30 border-b-2 border-[#e8edfb] flex items-center justify-between px-4 mx-auto">
        
        {/* Home Button am linken Rand */}
        <a href="/play/flut" className="text-[#b7baff] text-sm font-semibold">
          Home
        </a>
        
        {/* Überschrift in der Mitte */}
        <h1 className="text-[#b7baff] text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          Klimarallye
        </h1>
        
        {/* Punktestand */}
        <div className="bg-[#e5f0ff]/60 rounded-full border-2 border-[#e5f0ff] p-2.5 flex items-center justify-between w-[95px]">
          <div className="text-[#fcff8a] text-sm font-semibold font-['Inter'] leading-[17px]">500</div>
          <img className="w-7 h-5" src="https://via.placeholder.com/28x20" alt="Icon" />
        </div>
        
        {/* Profile Image (kein Link) */}
        <img className="w-[40.17px] h-[37px] rounded-full border-2 border-white" src="https://via.placeholder.com/40x37" alt="Profile" />
  
        {/* Login Link */}
        <div>
          <a href="/login" className="text-[#b7baff] text-sm font-semibold">Login</a>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  