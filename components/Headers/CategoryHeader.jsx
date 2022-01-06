import Image from "next/image";

export default function CategoryHeader({ category }) {
  return (
    <div className="col-span-full min-h-[100px] sm:min-h-[300px] sm:max-h-[300px] w-full bg-slate-200 relative flex justify-end">
      <Image
        src={`/assets/banners/${category}.jpg`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
