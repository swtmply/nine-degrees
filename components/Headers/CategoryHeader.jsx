import Image from "next/image";

export default function CategoryHeader({ category }) {
  return (
    <div className="col-span-full min-h-[300px] max-h-[300px] w-full bg-slate-200 relative flex justify-end">
      <Image
        src={`/assets/banners/${category}.png`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
