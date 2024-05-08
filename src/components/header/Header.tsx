import { cn } from "@/lib/utils";
import Link from "next/link";
import { HeaderMobile } from "./HeaderMobile";
import Image from "next/image";
import { useMenuContext } from "@/contexts/menu_context";

export default function Header() {
  let { current_tournament } = useMenuContext();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20 shadow">
      <nav className="h-32 lg:h-14 flex items-center justify-between">
        <div className="hidden px-4 lg:block">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dlzvlthdr/image/upload/v1711795338/webapp-tournament/team-amateurs/hn9gzbq9pk4koaiztctq.png"
              alt="logo"
              width={512}
              height={512}
              className="w-12 h-12"
            />
          </Link>
        </div>
        <div
          className={cn("w-full h-full flex p-4 lg:!hidden")}
          style={{
            backgroundImage:
              "url(" + current_tournament[0]?.background_image + ")",
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <div className="flex flex-col justify-around">
            <HeaderMobile />
            <div className="w-[80%] text-xl font-bold text-white">
              {current_tournament[0]?.name}
            </div>
          </div>
          <div>
            <Image
              src={current_tournament[0]?.logo}
              alt="logo"
              width={512}
              height={512}
              className="w-24 h-24"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
