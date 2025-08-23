"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/ui/Button";
import {
  LuUndo,
  LuRedo,
  LuImage,
  LuTrash2,
  LuSave,
  LuDownload,
  LuSmartphone,
  LuTablet,
  LuLaptopMinimal,
} from "react-icons/lu";
import { RxText } from "react-icons/rx";

// Make sure _customId is preserved when serializing
(fabric.Image.prototype as any).toObject = (function (toObject) {
  return function (this: fabric.Image) {
    return {
      ...toObject.call(this),
      _customId: (this as any)._customId,
    };
  };
})((fabric.Image.prototype as any).toObject);

export default function EditorPage() {
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const ignoreHistoryRef = useRef(false);
  const canvasInitializedRef = useRef(false); // Track if canvas has been initialized
  const canvasRestoredRef = useRef(false); // Track if canvas has been restored

  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [zoom, setZoom] = useState(1);

  // Add global error handler for JSON.parse errors
  useEffect(() => {
    const originalJSONParse = JSON.parse;
    JSON.parse = function (...args) {
      try {
        if (args[0] === "undefined") {
          console.error("🚨 JSON.parse called with 'undefined' at:", new Error().stack);
          return null;
        }
        if (args[0] === undefined) {
          console.error("🚨 JSON.parse called with undefined at:", new Error().stack);
          return null;
        }
        if (args[0] === null) {
          console.error("🚨 JSON.parse called with null at:", new Error().stack);
          return null;
        }
        return originalJSONParse.apply(this, args);
      } catch (error) {
        console.error("🚨 JSON.parse error with value:", args[0], "at:", new Error().stack);
        throw error;
      }
    };

    return () => {
      JSON.parse = originalJSONParse;
    };
  }, []);

  // Clean up localStorage on mount
  useEffect(() => {
    // Check and remove all undefined values from localStorage
    const keys = ['uploadedImages', 'wedding-card'];
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value === "undefined") {
        console.log(`🧹 Removing undefined value from localStorage key: ${key}`);
        localStorage.removeItem(key);
      }
      if (value === undefined) {
        console.log(`🧹 Removing undefined value from localStorage key: ${key}`);
        localStorage.removeItem(key);
      }
      if (value === null) {
        console.log(`🧹 Removing null value from localStorage key: ${key}`);
        localStorage.removeItem(key);
      }
    });

    // Log all localStorage values for debugging
    console.log("🔍 Current localStorage contents:");
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`  ${key}:`, value);
    });
  }, []);

  // Add global error handler to catch all JavaScript errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("🚨 Global error caught:", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack
      });

      // If it's a JSON.parse error, try to clean up localStorage
      if (event.message.includes("JSON") || event.message.includes("parse")) {
        console.log("🧹 Attempting to clean up localStorage due to JSON parse error");
        try {
          const keys = ['uploadedImages', 'wedding-card'];
          keys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value === "undefined" || value === "null") {
              localStorage.removeItem(key);
              console.log(`🧹 Removed invalid value from localStorage key: ${key}`);
            }
          });
        } catch (cleanupError) {
          console.error("Failed to cleanup localStorage:", cleanupError);
        }
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("🚨 Unhandled promise rejection:", {
        reason: event.reason,
        promise: event.promise,
        stack: event.reason?.stack
      });

      // If it's a JSON.parse error, try to clean up localStorage
      if (event.reason?.message?.includes("JSON") || event.reason?.message?.includes("parse")) {
        console.log("🧹 Attempting to clean up localStorage due to JSON parse error in promise");
        try {
          const keys = ['uploadedImages', 'wedding-card'];
          keys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value === "undefined" || value === "null") {
              localStorage.removeItem(key);
              console.log(`🧹 Removed invalid value from localStorage key: ${key}`);
            }
          });
        } catch (cleanupError) {
          console.error("Failed to cleanup localStorage:", cleanupError);
        }
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Safe JSON parse utility function
  const safeJSONParse = (value: string | null | undefined, fallback: any = null) => {
    try {
      if (!value || value === "undefined" || value === "null") {
        console.log("⚠️ Safe JSON parse: skipping invalid value:", value);
        return fallback;
      }
      // Use the original JSON.parse to avoid infinite recursion
      const originalParse = JSON.parse;
      return originalParse.call(JSON, value);
    } catch (error) {
      console.error("⚠️ Safe JSON parse failed for value:", value, "error:", error);
      return fallback;
    }
  };

  // Debug localStorage utility
  const debugLocalStorage = (operation: string, key: string, value?: any) => {
    console.log(`🔍 localStorage ${operation}:`, {
      key,
      value,
      type: typeof value,
      isUndefined: value === "undefined",
      isNull: value === null,
      timestamp: new Date().toISOString()
    });
  };

  // Safe localStorage wrapper
  const safeLocalStorageGet = (key: string, fallback: any = null) => {
    try {
      const value = localStorage.getItem(key);
      debugLocalStorage("get", key, value);

      if (value === "undefined" || value === "null") {
        console.log(`🧹 Removing invalid value from localStorage key: ${key}`);
        localStorage.removeItem(key);
        return fallback;
      }

      return value;
    } catch (error) {
      console.error(`🚨 Error getting localStorage key ${key}:`, error);
      return fallback;
    }
  };

  const safeLocalStorageSet = (key: string, value: any) => {
    try {
      if (value === undefined || value === null) {
        console.log(`🧹 Skipping setting undefined/null value for localStorage key: ${key}`);
        return;
      }
      localStorage.setItem(key, JSON.stringify(value));
      debugLocalStorage("set", key, value);
    } catch (error) {
      console.error(`🚨 Error setting localStorage key ${key}:`, error);
    }
  };

  // Uploaded image type used across the app
  type UploadedImage = { id: string; src: string };
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  // ---------- HISTORY (with refs to avoid stale reads) ----------
  type HistoryItem = { canvas: any; uploadedImages: UploadedImage[] };
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryItem[]>([]);

  // Refs for synchronous operations
  const historyRef = useRef<HistoryItem[]>([]);
  const redoRef = useRef<HistoryItem[]>([]);

  // keep refs in sync whenever state changes
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    redoRef.current = redoStack;
  }, [redoStack]);

  // ===== Save history helper (centralized) =====
  const pushHistory = (item: HistoryItem) => {
    historyRef.current = [...historyRef.current, item];
    if (historyRef.current.length > 50) {
      historyRef.current = historyRef.current.slice(historyRef.current.length - 50);
    }
    setHistory([...historyRef.current]);

    // clear redo
    redoRef.current = [];
    setRedoStack([]);

    // 🔑 Lưu vào localStorage
    safeLocalStorageSet("wedding-card", item.canvas);  // snapshot hiện tại
    safeLocalStorageSet("wedding-card-history", historyRef.current);
  };

  // saveHistory used by object:modified / object:removed events
  const saveHistory = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
    if (ignoreHistoryRef.current) return;

    // ensure canvas objects have latest customIds, just in case
    const currentUploaded = canvas.getObjects('image').map(obj => {
      const customId = (obj as any)._customId || (obj as any).get('_customId');
      const src = (obj as any).src || ((obj as fabric.Image).getElement() as HTMLImageElement)?.src;
      return { id: customId, src: src };
    }).filter(item => item.id && item.src);

    // Check if uploadedImages has changed before pushing
    if (JSON.stringify(currentUploaded.map(x => x.id).sort()) !== JSON.stringify(uploadedImages.map(x => x.id).sort())) {
      setUploadedImages(currentUploaded);
    }

    const json = canvas.toJSON(); // include custom prop
    pushHistory({ canvas: json, uploadedImages: currentUploaded });
  };

  // ===== Undo / Redo using refs to avoid stale setState issues =====
  const loadFromHistory = async (item: HistoryItem) => {
    const canvas = fabricCanvas.current;
    if (!canvas || !item) return;

    ignoreHistoryRef.current = true;

    await new Promise<void>((resolve) => {
      canvas.loadFromJSON(item.canvas, () => {
        try {
          // Restore uploadedImages state
          setUploadedImages(item.uploadedImages);

          // Đảm bảo tất cả ảnh được render
          canvas.getObjects().forEach((obj) => {
            if (obj.type === "image") {
              try {
                (obj as fabric.Image).set({ crossOrigin: "anonymous" });
                const el = (obj as fabric.Image).getElement() as HTMLImageElement | null;
                if (el && !el.complete) {
                  el.onload = () => {
                    canvas.requestRenderAll();
                    canvas.renderAll();
                  };
                }
              } catch (e) {
                console.warn("Error reloading image:", e);
              }
            }
          });

          // Ép render ngay
          canvas.requestRenderAll();
          canvas.renderAll();

          // Render lại sau một nhịp để chắc chắn
          setTimeout(() => {
            canvas.requestRenderAll();
            canvas.renderAll();
          }, 100);

          // Cập nhật localStorage để lần refresh tiếp theo có snapshot ổn định
          setTimeout(() => {
            try {
              const json = canvas.toJSON();
              safeLocalStorageSet("wedding-card", json);
              console.log("💾 LocalStorage snapshot updated after undo/redo");
            } catch (e) {
              console.warn("⚠️ Failed to save snapshot after undo/redo:", e);
            }
          }, 150);

        } finally {
          setTimeout(() => {
            ignoreHistoryRef.current = false;
            resolve();
          }, 200);
        }
      });
    });
  };

  const handleUndo = async () => {
    if (historyRef.current.length <= 1) return;
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    // move last to redo, take prev as target
    const popped = historyRef.current[historyRef.current.length - 1];
    redoRef.current = [...redoRef.current, popped];
    const prev = historyRef.current[historyRef.current.length - 2];
    historyRef.current = historyRef.current.slice(0, historyRef.current.length - 1);

    // sync states
    setHistory([...historyRef.current]);
    setRedoStack([...redoRef.current]);

    // load previous canvas but prevent save during load
    await loadFromHistory(prev);

    // Ensure canvas is properly rendered after undo
    if (canvas) {
      setTimeout(() => {
        canvas.requestRenderAll();
        canvas.renderAll();
      }, 150);
    }
  };

  const handleRedo = async () => {
    if (redoRef.current.length === 0) return;
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    const next = redoRef.current[redoRef.current.length - 1];
    // push next back to history
    historyRef.current = [...historyRef.current, next];
    redoRef.current = redoRef.current.slice(0, redoRef.current.length - 1);

    // sync states
    setHistory([...historyRef.current]);
    setRedoStack([...redoRef.current]);

    await loadFromHistory(next);

    // Ensure canvas is properly rendered after redo
    if (canvas) {
      setTimeout(() => {
        canvas.requestRenderAll();
        canvas.renderAll();
      }, 150);
    }
  };

  // ===== Helper: nén file ảnh thành dataURL JPEG nhỏ =====
  const compressImageFileToDataUrl = (
    file: File,
    maxW = 1400,
    maxH = 1400,
    quality = 0.8
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(maxW / img.width, maxH / img.height, 1);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvasEl = document.createElement("canvas");
          canvasEl.width = w;
          canvasEl.height = h;
          const ctx = canvasEl.getContext("2d");
          if (!ctx) return reject(new Error("Cannot get canvas context"));
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvasEl.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Helper function to restore canvas from localStorage
  const restoreCanvasFromStorage = async (canvas: fabric.Canvas) => {
    console.log("🔄 Starting canvas restoration from localStorage");

    const savedCanvasRaw = safeLocalStorageGet("wedding-card");
    const savedUploadedImagesRaw = safeLocalStorageGet("uploadedImages");

    if (!savedCanvasRaw || !savedUploadedImagesRaw) {
      console.log("📭 No valid saved data found");
      return false;
    }

    const savedCanvas = safeJSONParse(savedCanvasRaw, null);
    const parsedUploadedImages = safeJSONParse(savedUploadedImagesRaw, []);

    if (!savedCanvas) {
      console.log("📭 No valid canvas JSON found");
      return false;
    }

    console.log("📦 Restoring canvas with", parsedUploadedImages.length, "uploaded images");

    ignoreHistoryRef.current = true;
    setUploadedImages(parsedUploadedImages);

    return new Promise<boolean>((resolve) => {
      canvas.loadFromJSON(savedCanvas, () => {
        console.log("✅ Canvas loaded from JSON, objects count:", canvas.getObjects().length);

        // Đảm bảo tất cả ảnh render xong
        canvas.getObjects().forEach((obj) => {
          if (obj.type === "image") {
            try {
              (obj as fabric.Image).set({ crossOrigin: "anonymous" });
              const el = (obj as fabric.Image).getElement() as HTMLImageElement | null;
              if (el && !el.complete) {
                el.onload = () => {
                  canvas.requestRenderAll();
                  canvas.renderAll();
                };
              }
            } catch (e) {
              console.warn("Error setting up image object:", e);
            }
          }
        });

        // Ép render ngay
        canvas.requestRenderAll();
        canvas.renderAll();

        // render lại sau 1 nhịp
        setTimeout(() => {
          canvas.requestRenderAll();
          canvas.renderAll();
        }, 150);

        // Tạo snapshot history ban đầu
        const initial = {
          canvas: canvas.toJSON(),
          uploadedImages: parsedUploadedImages,
        };
        historyRef.current = [initial];
        setHistory([initial]);

        console.log("✅ Canvas restoration complete");

        setTimeout(() => {
          ignoreHistoryRef.current = false;
          scheduleThumbnailUpdate();
          canvasRestoredRef.current = true;
          resolve(true);
        }, 200);
      });
    });
  };

  // ---------- Khởi tạo Fabric canvas ----------
  const autosaveErrorShown = useRef(false);

  useEffect(() => {
    const canvasEl = document.getElementById("fabric-canvas") as HTMLCanvasElement | null;
    if (!canvasEl) return;

    console.log("🎨 Initializing Fabric canvas for device:", device);

    const canvas = new fabric.Canvas(canvasEl, {
      width: device === "desktop" ? 830 : 360,
      height: 1200,
      backgroundColor: "#fff",
      selection: true,
      preserveObjectStacking: true,
    });

    fabricCanvas.current = canvas;
    canvasInitializedRef.current = true;

    // Reset restoration flag when creating new canvas
    canvasRestoredRef.current = false;

    // Try to restore canvas from localStorage immediately after creation
    const initializeCanvas = async () => {
      const restored = await restoreCanvasFromStorage(canvas);

      if (!restored) {
        // No saved data, create blank initial snapshot
        console.log("📝 Creating blank initial canvas");
        const initial = { canvas: canvas.toJSON(), uploadedImages: [] };
        historyRef.current = [initial];
        setHistory([initial]);
      }
    };

    // Initialize canvas content
    initializeCanvas();

    // Giới hạn kéo/scale
    canvas.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;
      const cw = canvas.getWidth();
      const ch = canvas.getHeight();
      if ((obj.left ?? 0) < 0) obj.left = 0;
      if ((obj.top ?? 0) < 0) obj.top = 0;
      if ((obj.left ?? 0) + obj.getScaledWidth() > cw) obj.left = cw - obj.getScaledWidth();
      if ((obj.top ?? 0) + obj.getScaledHeight() > ch) obj.top = ch - obj.getScaledHeight();
    });

    canvas.on("object:scaling", (e) => {
      const obj = e.target;
      if (!obj) return;
      const cw = canvas.getWidth();
      const ch = canvas.getHeight();
      const sw = obj.getScaledWidth();
      const sh = obj.getScaledHeight();
      if ((obj.left ?? 0) < 0) obj.left = 0;
      if ((obj.top ?? 0) < 0) obj.top = 0;
      if ((obj.left ?? 0) + sw > cw) {
        const maxX = (cw - (obj.left ?? 0)) / (obj.width || 1);
        obj.scaleX = Math.min(obj.scaleX || 1, maxX);
      }
      if ((obj.top ?? 0) + sh > ch) {
        const maxY = (ch - (obj.top ?? 0)) / (obj.height || 1);
        obj.scaleY = Math.min(obj.scaleY || 1, maxY);
      }
    });

    // AUTOSAVE: lưu tạm vào localStorage (có try/catch quota)
    const saveTemp = () => {
      try {
        const json = canvas.toJSON();
        safeLocalStorageSet("wedding-card", json);
      } catch (err) {
        if (!autosaveErrorShown.current) {
          autosaveErrorShown.current = true;
          console.warn("Autosave bị tắt tạm thời do vượt dung lượng localStorage.", err);
          alert("Bộ nhớ trình duyệt đầy vì ảnh lớn. Đã tắt autosave tạm thời. Hãy xóa bớt hoặc dùng ảnh nhỏ hơn.");
        }
      }
    };

    canvas.on("object:modified", saveHistory);
    canvas.on("object:removed", (e) => {
      // object removed may have already been removed from canvas, but save history after it
      saveHistory();
      saveTemp();
    });

    canvas.on("object:modified", saveTemp);
    canvas.on("object:removed", saveTemp);

    // Add event listeners for canvas changes to update thumbnail
    canvas.on("object:added", () => {
      setTimeout(() => scheduleThumbnailUpdate(), 50);
    });

    canvas.on("object:modified", () => {
      setTimeout(() => scheduleThumbnailUpdate(), 50);
    });

    canvas.on("object:removed", () => {
      setTimeout(() => scheduleThumbnailUpdate(), 50);
    });

    // Phím tắt
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fabricCanvas.current) return;

      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const obj = fabricCanvas.current.getActiveObject() as any;
      if (obj && obj.type === "textbox" && obj.isEditing) return;

      if (e.code === "Space") {
        e.preventDefault();
        return;
      }

      // Delete
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObjects = fabricCanvas.current.getActiveObjects();
        if (activeObjects.length > 0) {
          activeObjects.forEach((o) => {
            // Nếu là ảnh thì xóa khỏi uploadedImages
            if (o.type === "image") {
              const customId =
                (o as any)._customId ??
                ((o as any).get ? (o as any).get("_customId") : undefined);
              if (customId) {
                setUploadedImages((prev) => prev.filter((x) => x.id !== customId));
              }
            }
            fabricCanvas.current?.remove(o);
          });
          fabricCanvas.current.discardActiveObject();
          fabricCanvas.current.requestRenderAll();
        }
      }

      // Undo/Redo
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((isMod && e.shiftKey && e.key.toLowerCase() === "z") || (isMod && e.key.toLowerCase() === "y")) {
        e.preventDefault();
        handleRedo();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Handle visibility change to restore canvas if needed
    const handleVisibilityChange = () => {
      if (!document.hidden && canvas && canvasRestoredRef.current) {
        setTimeout(() => {
          canvas.requestRenderAll();
          canvas.renderAll();
          updateThumbnailImmediately();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log("🧹 Cleaning up canvas");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.off("object:modified", saveHistory);
      canvas.off("object:removed", saveHistory);
      canvas.off("object:modified", saveTemp);
      canvas.off("object:removed", saveTemp);
      canvas.dispose();
      fabricCanvas.current = null;
      historyRef.current = [];
      redoRef.current = [];
      setHistory([]);
      setRedoStack([]);
      canvasInitializedRef.current = false;
      canvasRestoredRef.current = false;
    };
  }, [device]); // re-create canvas when device changes

  // Load uploadedImages from localStorage on mount (only once, before canvas creation)
  useEffect(() => {
    console.log("📱 Loading uploadedImages from localStorage on mount");
    const saved = safeLocalStorageGet("uploadedImages");

    // Clean up undefined values from localStorage
    if (saved === "undefined") {
      localStorage.removeItem("uploadedImages");
      setUploadedImages([]);
      return;
    }

    if (saved && saved !== "undefined") {
      try {
        const parsed = safeJSONParse(saved, []);
        console.log("📦 Loaded", parsed.length, "uploaded images from localStorage");
        setUploadedImages(parsed);
      } catch {
        console.warn("Failed to parse uploadedImages from localStorage");
        setUploadedImages([]);
      }
    }
  }, []); // Run only once on mount

  // Save uploadedImages to localStorage on change
  useEffect(() => {
    safeLocalStorageSet("uploadedImages", uploadedImages);
  }, [uploadedImages]);

  // ---------- Export PNG ----------
  const saveAsImage = () => {
    if (!fabricCanvas.current) return;
    const dataURL = fabricCanvas.current.toCanvasElement().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "wedding-card.png";
    link.click();
  };

  // ---------- Share ----------
  const shareImage = async () => {
    if (!fabricCanvas.current) return;
    const dataURL = fabricCanvas.current.toCanvasElement().toDataURL("image/png");
    if (navigator.share) {
      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], "wedding-card.png", { type: "image/png" });
      navigator.share({ title: "Thiệp cưới", files: [file] });
    } else {
      alert("Trình duyệt không hỗ trợ chia sẻ file.");
    }
  };

  // ---------- Add Text / Image ----------
  const addText = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    ignoreHistoryRef.current = true;
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

    // Force multiple renders to ensure content is visible
    canvas.requestRenderAll();
    canvas.renderAll();

    // push history manually (uploadedImages unchanged)
    pushHistory({ canvas: canvas.toJSON(), uploadedImages: [...uploadedImages] });

    // Trigger thumbnail update immediately
    scheduleThumbnailUpdate();

    setTimeout(() => {
      ignoreHistoryRef.current = false;
    }, 100);
  };

  // Hàm xoá ảnh trên canvas theo ID
  const removeFromCanvasById = (id: string) => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    // Collect objects to remove first (avoid mutating while iterating)
    const toRemove = canvas.getObjects("image").filter((obj) => {
      const custom = (obj as any)._customId ?? (obj as any).get ? (obj as any).get("_customId") : undefined;
      return custom === id;
    });

    toRemove.forEach((obj) => canvas.remove(obj));

    // Xoá khỏi uploadedImages
    setUploadedImages((prev) => prev.filter((x) => x.id !== id));

    canvas.discardActiveObject();
    canvas.requestRenderAll();
    // object:removed handler will call saveHistory/saveTemp
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        // NÉN ẢNH → dataURL nhỏ
        const dataUrl = await compressImageFileToDataUrl(file, 1400, 1400, 0.8);

        const id = uuidv4();

        // prepare next uploadedImages snapshot and set it
        const nextUploaded = [...uploadedImages, { id, src: dataUrl }];
        setUploadedImages(nextUploaded);

        // create fabric image (v6 fromURL may return Promise)
        const img = await (fabric.Image as any).fromURL(dataUrl, {
          crossOrigin: "anonymous",
        });

        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const cw = canvas.getWidth() || 1000;
        img.scaleToWidth(cw * 0.8);
        img.set({
          left: 50,
          top: 50,
          cornerStyle: "circle",
          _customId: id,
          crossOrigin: "anonymous",
        });
        (img as any).src = dataUrl;

        // Prevent automatic saveHistory from firing (we'll push one snapshot)
        ignoreHistoryRef.current = true;
        canvas.add(img);
        canvas.setActiveObject(img);

        // Force multiple renders to ensure content is visible
        canvas.requestRenderAll();
        canvas.renderAll();

        // push history with the new uploadedImages snapshot
        pushHistory({ canvas: canvas.toJSON(), uploadedImages: nextUploaded });

        // Trigger thumbnail update immediately
        scheduleThumbnailUpdate();

        setTimeout(() => {
          ignoreHistoryRef.current = false;
        }, 100);
      } catch (err) {
        console.error("Không thể thêm ảnh:", err);
        alert("Không thể đọc hoặc nén ảnh này. Vui lòng thử ảnh khác.");
      }
    };
    input.click();
  };

  // ---------- Clear ----------
  const clearAll = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    // 🔑 Lưu trạng thái hiện tại vào history trước khi clear
    if (!ignoreHistoryRef.current) {
      const currentSnapshot = {
        canvas: canvas.toJSON(),
        uploadedImages: [...uploadedImages],
      };
      pushHistory(currentSnapshot);
    }

    ignoreHistoryRef.current = true;

    // Thực hiện clear
    canvas.clear();
    canvas.backgroundColor = "#fff";

    // Render lại
    canvas.requestRenderAll();
    canvas.renderAll();

    // Lưu snapshot rỗng vào history
    pushHistory({ canvas: canvas.toJSON(), uploadedImages: [] });
    setUploadedImages([]);

    // Cập nhật thumbnail
    scheduleThumbnailUpdate();

    setTimeout(() => {
      ignoreHistoryRef.current = false;
    }, 100);
  };

  // ---------- Zoom Ctrl + wheel ----------
  const zoomRef = useRef(1);
  useEffect(() => {
    const wrapper = document.getElementById("fabric-canvas")?.parentElement;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (!fabricCanvas.current || !e.ctrlKey) return;
      e.preventDefault();

      const canvas = fabricCanvas.current;
      const rect = wrapper.getBoundingClientRect();
      const pointer = new fabric.Point(e.clientX - rect.left, e.clientY - rect.top);

      const step = 1.1;
      let newZoom = zoomRef.current;
      newZoom = e.deltaY < 0 ? newZoom * step : newZoom / step;
      newZoom = Math.min(Math.max(newZoom, 0.1), 5);
      newZoom = Math.round(newZoom * 100) / 100;

      canvas.zoomToPoint(pointer, newZoom);
      zoomRef.current = newZoom;
      setZoom(newZoom);
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);

  // ---------- Thumbnail ----------
  const [thumbnail, setThumbnail] = useState<string>("");
  const thumbnailUpdateRef = useRef(false);

  // Helper function to update thumbnail with debouncing
  const updateThumbnailImmediately = () => {
    const canvas = fabricCanvas.current;
    if (!canvas || thumbnailUpdateRef.current) return;

    thumbnailUpdateRef.current = true;

    try {
      const scale = 0.15;
      const w = canvas.getWidth();
      const h = canvas.getHeight();
      const temp = document.createElement("canvas");
      temp.width = Math.max(1, Math.floor(w * scale));
      temp.height = Math.max(1, Math.floor(h * scale));
      const ctx = temp.getContext("2d");
      if (!ctx) {
        thumbnailUpdateRef.current = false;
        return;
      }

      // Use a different approach to avoid infinite loop
      const objects = canvas.getObjects();
      if (objects.length === 0) {
        // Empty canvas - just draw white background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, temp.width, temp.height);
        setThumbnail(temp.toDataURL("image/png"));
        thumbnailUpdateRef.current = false;
        return;
      }

      // Create a temporary canvas element and render objects manually
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) {
        thumbnailUpdateRef.current = false;
        return;
      }

      // Fill background
      tempCtx.fillStyle = typeof canvas.backgroundColor === "string" ? canvas.backgroundColor : "#fff";
      tempCtx.fillRect(0, 0, w, h);

      // Draw objects without triggering events
      objects.forEach(obj => {
        try {
          if (obj.visible !== false) {
            tempCtx.save();
            const matrix = obj.calcTransformMatrix();
            tempCtx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

            if (obj.type === 'image') {
              const imgObj = obj as fabric.Image;
              const imgElement = imgObj.getElement() as HTMLImageElement;
              if (imgElement && imgElement.complete) {
                tempCtx.drawImage(imgElement, -imgObj.width / 2, -imgObj.height / 2, imgObj.width, imgObj.height);
              }
            } else if (obj.type === 'textbox' || obj.type === 'text') {
              const textObj = obj as fabric.Textbox;
              tempCtx.font = `${textObj.fontSize}px ${textObj.fontFamily}`;
              tempCtx.fillStyle = textObj.fill as string || '#000';
              tempCtx.textAlign = 'center';
              tempCtx.textBaseline = 'middle';
              tempCtx.fillText(textObj.text || '', 0, 0);
            }
            tempCtx.restore();
          }
        } catch (e) {
          console.warn("Error drawing object in thumbnail:", e);
        }
      });

      // Scale down to thumbnail
      ctx.drawImage(tempCanvas, 0, 0, temp.width, temp.height);
      const thumbnailUrl = temp.toDataURL("image/png");
      console.log("🖼️ Thumbnail updated, objects:", objects.length);
      setThumbnail(thumbnailUrl);

    } catch (error) {
      console.error("Error updating thumbnail:", error);
    } finally {
      thumbnailUpdateRef.current = false;
    }
  };

  // Debounced thumbnail update
  const debouncedThumbnailUpdate = useRef<NodeJS.Timeout | null>(null);
  const scheduleThumbnailUpdate = () => {
    if (debouncedThumbnailUpdate.current) {
      clearTimeout(debouncedThumbnailUpdate.current);
    }
    debouncedThumbnailUpdate.current = setTimeout(() => {
      updateThumbnailImmediately();
    }, 100);
  };

  // Set up thumbnail update when canvas changes
  useEffect(() => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    canvas.on("object:added", scheduleThumbnailUpdate);
    canvas.on("object:modified", scheduleThumbnailUpdate);
    canvas.on("object:removed", scheduleThumbnailUpdate);

    // Initial thumbnail update
    scheduleThumbnailUpdate();

    return () => {
      canvas.off("object:added", scheduleThumbnailUpdate);
      canvas.off("object:modified", scheduleThumbnailUpdate);
      canvas.off("object:removed", scheduleThumbnailUpdate);

      if (debouncedThumbnailUpdate.current) {
        clearTimeout(debouncedThumbnailUpdate.current);
      }
    };
  }, []);

  // Force thumbnail update when canvas is restored
  useEffect(() => {
    if (canvasRestoredRef.current && fabricCanvas.current) {
      console.log("🖼️ Canvas was restored, scheduling thumbnail update");
      scheduleThumbnailUpdate();
    }
  }, [canvasRestoredRef.current]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--color-bg-main)]">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="text-sm text-[var(--color-gray)] pl-9">Zoom: {Math.round(zoom * 100)}%</div>
        <div className="flex items-center gap-2">
          <Button type="ghost" >Lưu thiệp</Button>
          <Button
            type="ghost"
            className="border"
            style={{ borderColor: "var(--color-primary)", borderRadius: "12px", padding: "3px 6px", color: "var(--color-primary)" }}
            onClick={shareImage}
          >
            Chia sẻ thiệp
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left */}
        <div className="w-[256px] h-full overflow-y-auto hide-scrollbar border-r p-4 flex flex-col font-bold">
          <div className="space-y-2">
            <div>
              <div className="text-sm mb-2" style={{ color: "var(--color-gray)" }}>ACTIONS</div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    overrideColor={{ text: "var(--color-gray)", border: "var(--color-gray)" }}
                    onClick={handleUndo}
                    disabled={history.length <= 1}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}
                  >
                    <LuUndo size={20} /> Undo
                  </Button>
                  <Button
                    type="primary"
                    overrideColor={{ text: "var(--color-gray)", border: "var(--color-gray)" }}
                    onClick={handleRedo}
                    disabled={redoStack.length === 0}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}
                  >
                    <LuRedo size={20} /> Redo
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    overrideColor={{ text: "var(--color-primary)", border: "var(--color-primary)", background: "var(--color-bg-secondary)" }}
                    onClick={addImage}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}
                  >
                    <LuImage size={20} /> Image
                  </Button>
                  <Button
                    type="primary"
                    overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }}
                    onClick={addText}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}
                  >
                    <RxText size={20} /> Text
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }}
                    onClick={clearAll}
                    className="flex-1 h-[66px] px-[40px] py-[13px]"
                    style={{ boxShadow: "none" }}
                  >
                    <LuTrash2 size={20} /> Clear
                  </Button>
                  <div className="flex-1 p-3" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm mt-6 mb-2" style={{ color: "var(--color-gray)" }}>QUẢN LÝ</div>
              <Button type="primary" overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }} className="w-full h-[66px] !font-medium">
                <LuSave size={20} /> QL khách mời
              </Button>
              <Button type="primary" overrideColor={{ text: "var(--color-primary-dark)", border: "var(--color-primary-dark)" }} className="w-full h-[66px] !font-medium mt-5" onClick={saveAsImage}>
                <LuDownload size={20} /> Tải xuống
              </Button>
            </div>

            {/* ẢNH ĐÃ TẢI */}
            <div>
              <div className="text-sm mt-6 mb-2" style={{ color: "var(--color-gray)" }}>ẢNH ĐÃ TẢI</div>
              <div className="flex flex-col gap-2">
                {uploadedImages.length > 0 ? (
                  uploadedImages.map((item, i) => (
                    <div key={item.id} className="relative group">
                      <img
                        src={item.src}
                        alt={`uploaded-${i}`}
                        className="border rounded cursor-pointer hover:opacity-80 w-full"
                        onClick={async () => {
                          const canvas = fabricCanvas.current;
                          if (!canvas) return;

                          // Check if image is already on canvas
                          const exists = canvas.getObjects("image").some((obj) => {
                            const customId = (obj as any)._customId;
                            return customId === item.id;
                          });
                          if (exists) {
                            console.log("🖼️ Already on canvas", exists);
                            // Find and bring to front if already on canvas
                            const existing = canvas.getObjects("image").find(obj => (obj as any)._customId === item.id);
                            if (existing) {
                              (existing as any).bringToFront();
                              canvas.setActiveObject(existing);
                              canvas.renderAll();
                            }
                            return;
                          }

                          try {
                            ignoreHistoryRef.current = true;
                            const img = await (fabric.Image as any).fromURL(item.src, { crossOrigin: "anonymous" });
                            const cw = canvas.getWidth() || 1000;
                            img.scaleToWidth(cw * 0.8);
                            img.set({ left: 50, top: 50, cornerStyle: "circle", _customId: item.id });
                            (img as any).src = item.src;
                            canvas.add(img);
                            canvas.setActiveObject(img);

                            // Force multiple renders to ensure content is visible
                            canvas.requestRenderAll();
                            canvas.renderAll();

                            // push history with current uploadedImages
                            pushHistory({ canvas: canvas.toJSON(), uploadedImages: [...uploadedImages] });

                            // Trigger thumbnail update immediately
                            scheduleThumbnailUpdate();

                          } catch (e) {
                            console.warn("Failed to add uploaded image to canvas:", e);
                          } finally {
                            setTimeout(() => (ignoreHistoryRef.current = false), 100);
                          }
                        }}
                      />

                      {/* Nút xóa */}
                      <button
                        className="absolute top-0 right-0 m-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCanvasById(item.id);
                          setUploadedImages((prev) => prev.filter((x) => x.id !== item.id));
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400">Chưa có ảnh</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white overflow-auto hide-scrollbar p-6 flex justify-center" style={{ margin: "32px" }}>
          <canvas
            id="fabric-canvas"
            onClick={() => {
              if (fabricCanvas.current) {
                fabricCanvas.current.requestRenderAll();
                fabricCanvas.current.renderAll();
              }
            }}
          />
        </div>

        {/* Thumbnail */}
        <div className="w-[200px] border-l flex flex-col justify-between p-8 items-center">
          <div className="overflow-y-auto space-y-2 w-full px-2 flex justify-center">
            {thumbnail ? (
              <img src={thumbnail} alt="canvas thumbnail" className="border shadow-sm" style={{ maxWidth: "100%", height: "auto" }} />
            ) : (
              <div className="text-gray-400">No preview</div>
            )}
          </div>
          <div className="flex gap-7 mt-2">
            <button onClick={() => setDevice("mobile")}><LuSmartphone size={30} /></button>
            <button onClick={() => setDevice("mobile")}><LuTablet size={30} /></button>
            <button onClick={() => setDevice("desktop")}><LuLaptopMinimal size={30} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}