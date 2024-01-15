export default function Header() {
  return (
    <div className="w-full h-[60px] p-4 flex items-center">
      <div className="text-[24px] font-bold">BLOG</div>
      <button className="ml-4">HOME</button>
      <button className="w-[80px] h-[40px] bg-slate-200 rounded-lg ml-auto">
        로그인
      </button>
    </div>
  );
}
