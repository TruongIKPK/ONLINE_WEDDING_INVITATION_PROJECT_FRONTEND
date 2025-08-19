"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import Button from "@/components/ui/Button";
import { LuUndo, LuRedo, LuImage, LuTrash2, LuSave, LuDownload, LuSmartphone, LuLaptopMinimal } from "react-icons/lu";
import { RxText } from "react-icons/rx";

export default function EditorPage() {
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const ignoreHistoryRef = useRef(false); // khi restore thì set true để không lưu

  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [zoom, setZoom] = useState(1);

  // Khởi tạo Fabric canvas
  useEffect(() => {
    const canvasEl = document.getElementById("fabric-canvas") as HTMLCanvasElement | null;
    if (!canvasEl) return;

    const canvas = new fabric.Canvas(canvasEl, {
      width: device === "desktop" ? 830 : 360,
      height: 1200,
      backgroundColor: "#fff",
      selection: true,
      preserveObjectStacking: true,
    });

    // Thêm giới hạn kéo object không ra ngoài canvas ở đây
    canvas.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;

      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      if (obj.left < 0) obj.left = 0;
      if (obj.top < 0) obj.top = 0;

      if (obj.left + obj.getScaledWidth() > canvasWidth) {
        obj.left = canvasWidth - obj.getScaledWidth();
      }

      if (obj.top + obj.getScaledHeight() > canvasHeight) {
        obj.top = canvasHeight - obj.getScaledHeight();
      }
    });

    canvas.on("object:scaling", (e) => {
      const obj = e.target;
      if (!obj) return;

      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      // Tính vị trí và kích thước scaled sau khi scale
      const scaledWidth = obj.getScaledWidth();
      const scaledHeight = obj.getScaledHeight();

      // Giới hạn vị trí đối tượng (left, top) không âm
      if (obj.left < 0) obj.left = 0;
      if (obj.top < 0) obj.top = 0;

      // Nếu đối tượng khi scale vượt canvas thì giới hạn tỉ lệ scale lại
      if (obj.left + scaledWidth > canvasWidth) {
        const maxScaleX = (canvasWidth - obj.left) / obj.width!;
        obj.scaleX = Math.min(obj.scaleX!, maxScaleX);
      }

      if (obj.top + scaledHeight > canvasHeight) {
        const maxScaleY = (canvasHeight - obj.top) / obj.height!;
        obj.scaleY = Math.min(obj.scaleY!, maxScaleY);
      }
    });

    fabricCanvas.current = canvas;

    // Hàm lưu state (được gọi bởi sự kiện fabric)
    const saveState = () => {
      if (ignoreHistoryRef.current) return;
      const json = JSON.stringify(canvas.toJSON());
      setHistory((prev) => {
        if (prev.length > 0 && prev[prev.length - 1] === json) return prev;
        const cut = prev.slice(0, historyIndexRef.current + 1);
        const next = [...cut, json];
        const trimmed = next.length > 50 ? next.slice(next.length - 50) : next;
        setIndex(trimmed.length - 1);
        return trimmed;
      });
    };

    // Đăng ký event
    canvas.on("object:added", saveState);
    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);

    // Lưu trạng thái ban đầu
    setTimeout(() => {
      if (!ignoreHistoryRef.current) {
        const initial = JSON.stringify(canvas.toJSON());
        setHistory([initial]);
        setIndex(0);
      }
    }, 0);


    return () => {
      canvas.off("object:added", saveState);
      canvas.off("object:modified", saveState);
      canvas.off("object:removed", saveState);
      canvas.dispose();
      fabricCanvas.current = null;

      // reset history khi thay device (do kích thước khác làm JSON khác)
      setHistory([]);
      setIndex(-1);
    };
  }, [device]);

  // Xuất PNG
  const saveAsImage = () => {
    if (!fabricCanvas.current) return;
    // PNG
    const dataURL = fabricCanvas.current?.toCanvasElement().toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "wedding-card.png";
    link.click();
  };

  // Chia sẻ
  const shareImage = async () => {
    if (!fabricCanvas.current) return;
    const dataURL = fabricCanvas.current?.toCanvasElement().toDataURL("image/png");

    if (navigator.share) {
      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], "wedding-card.png", { type: "image/png" });
      navigator.share({
        title: "Thiệp cưới",
        files: [file],
      });
    } else {
      alert("Trình duyệt không hỗ trợ chia sẻ file.");
    }
  };

  // history chứa snapshot JSON của canvas
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // chỉ vào snapshot hiện tại
  // ref để tránh vấn đề closure stale khi dùng historyIndex trong các callback
  const historyIndexRef = useRef<number>(-1);
  const setIndex = (i: number) => {
    historyIndexRef.current = i;
    setHistoryIndex(i);
  };

  // Đẩy snapshot hiện tại vào history (bỏ duplicate liên tiếp, giới hạn 50)
  // const pushHistoryFromCanvas = () => {
  //   if (ignoreHistoryRef.current) return;
  //   const canvas = fabricCanvas.current;
  //   if (!canvas) return;
  //   const json = JSON.stringify(canvas.toJSON());

  //   setHistory((prev) => {
  //     // nếu trùng snapshot cuối thì bỏ
  //     if (prev.length > 0 && prev[prev.length - 1] === json) return prev;

  //     // nếu đang ở giữa history (sau undo), cắt phần redo theo ref
  //     const cut = prev.slice(0, historyIndexRef.current + 1);
  //     const next = [...cut, json];
  //     // giới hạn 50 bước
  //     const trimmed = next.length > 50 ? next.slice(next.length - 50) : next;
  //     // cập nhật index tương ứng
  //     setIndex(trimmed.length - 1);
  //     return trimmed;
  //   });
  // };

  // Hàm load snapshot ở index (không lưu lại trong history khi restore)
  const loadHistoryAt = (index: number) => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
    if (index < 0 || index >= history.length) return;

    ignoreHistoryRef.current = true;
    canvas.loadFromJSON(history[index], () => {
      // Sau khi load JSON xong
      canvas.renderAll();
      canvas.discardActiveObject();

      // Đảm bảo canvas request render lại (thường gọi 1 lần cũng được)
      canvas.requestRenderAll();

      // Đợi xíu rồi bật lại cho phép lưu history
      setTimeout(() => {
        ignoreHistoryRef.current = false;
      }, 100);
    });

    setIndex(index);
  };


  // Undo
  const undo = () => {
    if (historyIndexRef.current <= 0) return;
    loadHistoryAt(historyIndexRef.current - 1);
  };

  const undoDisabled = historyIndex <= 0;

  // Redo
  const redo = () => {
    if (historyIndexRef.current >= history.length - 1) return;
    loadHistoryAt(historyIndexRef.current + 1);
  };

  const redoDisabled = historyIndex >= history.length - 1 || history.length === 0;

  // Thêm text
  const addText = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
    const text = new fabric.Textbox("Nhập văn bản", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "#333",
      editable: true,
      cornerStyle: "circle",
      padding: 6,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    // sự kiện object:added sẽ gọi saveState
  };

  // Thêm ảnh
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        fabric.Image.fromURL(reader.result as string).then((img) => {
          const canvas = fabricCanvas.current;
          if (!canvas) return;
          const canvasWidth = canvas.getWidth() || 1000;
          img.scaleToWidth(canvasWidth * 0.8);
          img.set({ left: 50, top: 50, cornerStyle: "circle" });
          canvas.add(img);
          canvas.setActiveObject(img);
          // object:added sẽ gọi saveState
        }).catch((err) => {
          console.error("Error loading image", err);
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // Clear all
  const clearAll = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = "#fff";
    canvas.renderAll();

    // push snapshot (clear là 1 action)
    if (!ignoreHistoryRef.current) {
      const json = JSON.stringify(canvas.toJSON());
      setHistory((prev) => {
        const cut = prev.slice(0, historyIndexRef.current + 1);
        const next = [...cut, json];
        const trimmed = next.length > 50 ? next.slice(next.length - 50) : next;
        setIndex(trimmed.length - 1);
        return trimmed;
      });
    }
  };

  const zoomRef = useRef(1);

  // Zoom bằng Ctrl + scroll
  useEffect(() => {
    const wrapper = document.getElementById("fabric-canvas")?.parentElement;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (!fabricCanvas.current || !e.ctrlKey) return;
      e.preventDefault();

      const canvas = fabricCanvas.current;
      const rect = wrapper.getBoundingClientRect();
      const pointer = new fabric.Point(e.clientX - rect.left, e.clientY - rect.top);

      const zoomStep = 1.1;
      let newZoom = zoomRef.current;

      if (e.deltaY < 0) newZoom = zoomRef.current * zoomStep;
      else newZoom = zoomRef.current / zoomStep;

      newZoom = Math.min(Math.max(newZoom, 0.1), 5);
      newZoom = Math.round(newZoom * 100) / 100;

      canvas.zoomToPoint(pointer, newZoom);
      zoomRef.current = newZoom;
      setZoom(newZoom);
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);

  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    const updateThumbnail = () => {
      // xuất ra ảnh với kích thước nhỏ hơn
      const scale = 0.15; // tỉ lệ thu nhỏ
      const originalWidth = canvas.getWidth();
      const originalHeight = canvas.getHeight();

      // Tạo canvas ẩn để resize
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = originalWidth * scale;
      tempCanvas.height = originalHeight * scale;

      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Vẽ ảnh canvas chính vào temp canvas với scale nhỏ
      const originalDataURL = canvas.toDataURL({
        format: "png",
        multiplier: 1,
      });

      const img = new Image();
      img.onload = () => {
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        const smallDataURL = tempCanvas.toDataURL("image/png");
        setThumbnail(smallDataURL);
      };
      img.src = originalDataURL;
    };

    // Đăng ký event
    canvas.on("object:added", updateThumbnail);
    canvas.on("object:modified", updateThumbnail);
    canvas.on("object:removed", updateThumbnail);

    // Lấy thumbnail lần đầu
    updateThumbnail();

    return () => {
      canvas.off("object:added", updateThumbnail);
      canvas.off("object:modified", updateThumbnail);
      canvas.off("object:removed", updateThumbnail);
    };
  }, []);


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--color-bg-main)]">
      <div className="flex items-center justify-between border-b px-4 py-3">
        {/* Zoom */}
        <div className="text-sm text-[var(--color-gray)] pl-9">Zoom: {Math.round(zoom * 100)}%</div>

        {/* Save & share */}
        <div className="flex items-center gap-2">
          <Button type="ghost" onClick={saveAsImage}>Lưu thiệp</Button>
          <Button type="ghost" className="border" style={{ borderColor: "var(--color-primary)", borderRadius: "12px", padding: "3px 6px", color: "var(--color-primary)" }} onClick={shareImage}>Chia sẻ thiệp</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left side bar */}
        <div className="w-[256px] h-full overflow-y-auto hide-scrollbar border-r p-4 flex flex-col font-bold">
          <div className="space-y-2">
            <div>
              <div className="text-sm mb-2" style={{ color: "var(--color-gray)" }}>ACTIONS</div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button type="primary"
                    overrideColor={{ text: "var(--color-gray)", border: "var(--color-gray)" }}
                    onClick={undo}
                    disabled={undoDisabled}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}>
                    <LuUndo size={20} /> Undo
                  </Button>
                  <Button type="primary"
                    overrideColor={{ text: "var(--color-gray)", border: "var(--color-gray)" }}
                    onClick={redo}
                    disabled={redoDisabled}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}>
                    <LuRedo size={20} /> Redo
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button type="primary"
                    overrideColor={{ text: "var(--color-primary)", border: "var(--color-primary)", background: "var(--color-bg-secondary)" }}
                    onClick={addImage}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}>
                    <LuImage size={20} /> Image
                  </Button>
                  <Button type="primary"
                    overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }}
                    onClick={addText}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}>
                    <RxText size={20} /> Text
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button type="primary"
                    overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }}
                    onClick={clearAll}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}>
                    <LuTrash2 size={20} /> Clear
                  </Button>
                  <div className="flex-1 p-3" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm mt-6 mb-2" style={{ color: "var(--color-gray)" }}>QUẢN LÝ</div>
              <Button type="primary"
                overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }}
                className="w-full h-[66px] !font-medium">
                <LuSave size={20} /> QL khách mời
              </Button>
              <Button type="primary"
                overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }}
                className="w-full h-[66px] !font-medium mt-5">
                <LuDownload size={20} /> Tải xuống
              </Button>
            </div>
          </div>
        </div>

        {/* Fabric */}
        <div className="flex-1 bg-white overflow-auto hide-scrollbar p-6 flex justify-center" style={{ margin: "32px" }}>
          <canvas id="fabric-canvas" />
        </div>

        {/* Right side bar */}
        <div className="w-[200px] border-l flex flex-col justify-between p-8 items-center">
          <div className="overflow-y-auto space-y-2 w-full px-2 flex justify-center">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="canvas thumbnail"
                className="border shadow-sm"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <div className="text-gray-400">No preview</div>
            )}
          </div>
          <div className="flex gap-7 mt-2">
            <button onClick={() => setDevice("mobile")}><LuSmartphone size={30} /></button>
            <button onClick={() => setDevice("desktop")}><LuLaptopMinimal size={30} /></button>
          </div>
        </div>

      </div>
    </div>
  );
}