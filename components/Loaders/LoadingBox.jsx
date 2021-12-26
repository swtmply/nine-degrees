export default function MessageBox({ children }) {
  return (
    <div className="flex items-center justify-center space-x-2 animate-bounce">
      <div className="w-4 h-4 bg-black rounded-full"></div>
      <div className="w-4 h-4 bg-black rounded-full"></div>
      <div className="w-4 h-4 bg-black rounded-full"></div>
    </div>
  );
}
