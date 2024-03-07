"use client";

import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserItem from "./UserItem";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import DocumentList from "./DocumentList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Plus } from "lucide-react";
import TrashBox from "./TrashBox";

export default function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isRestting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const create = useMutation(api.documents.create);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  // three eventhanlders below just for
  // dragging to resize the width of sidebar
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  /**
   * Reset the width of the sidebar and navbar elements.
   */
  const resetWidth = () => {
    const defaultWidth = isMobile ? "100%" : "240px";
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = defaultWidth;
      navbarRef.current.style.setProperty("left", defaultWidth);
      navbarRef.current.style.setProperty(
        "witdth",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      // async for animation
      // transition duration bind with isReseting state
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  /**
   * Function to collapse the sidebar and expand the navbar
   */
  const collapse = () => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(true);
    setIsResetting(true);

    sidebarRef.current.style.width = "0";
    navbarRef.current.style.setProperty("width", "100%");
    navbarRef.current.style.setProperty("left", "0");

    setTimeout(() => setIsResetting(false), 300);
  };

  const handleCreate = () => {
    const createPromise = create({ title: "Untitled" });
    toast.promise(createPromise, {
      loading: "Creating a new note ...",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-auto relative flex w-60 flex-col z-[999]",
          isRestting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* collapse button */}
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          {/* search button */}
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />
          {/* settings button */}
          <Item label="Settings" icon={Settings} onClick={() => {}} />
          {/* new page button */}
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>

        <div className="mt-4">
          {/* documents list */}
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page"/>
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="trash" icon={Trash}/>
            </PopoverTrigger>

            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* sidebar divider */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute
            h-full w-1 bg-primary/10 right-0 top-0
          "
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)",
          isRestting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
}
