"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, X, Image as ImageIcon, ZoomIn } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/lib/store";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  cloudinaryUrl?: string;
  size: string;
  quantity: number;
  borderStyle: string;
  finish: string;
}

const SIZES = [
  { value: "small", label: 'Small (2x2")', price: 3.99 },
  { value: "medium", label: 'Medium (3x3")', price: 5.99 },
  { value: "large", label: 'Large (4x4")', price: 7.99 },
  { value: "panoramic", label: 'Panoramic (2x6")', price: 9.99 },
];

const BORDER_STYLES = [
  { value: "none", label: "No Border" },
  { value: "thin", label: "Thin Border" },
  { value: "thick", label: "Thick Border" },
  { value: "rounded", label: "Rounded Border" },
];

const FINISHES = [
  { value: "matte", label: "Matte" },
  { value: "glossy", label: "Glossy" },
];

export default function UploadPage() {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addItem);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      size: "medium",
      quantity: 1,
      borderStyle: "none",
      finish: "glossy",
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 10485760, // 10MB
    maxFiles: 20,
  });

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImage = (id: string, updates: Partial<UploadedImage>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    );
  };

  const uploadToCloudinary = async (image: UploadedImage) => {
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", "magnets_prints");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.url;
    } catch (error) {
      throw error;
    }
  };

  const handleAddToCart = async () => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const cloudinaryUrl = await uploadToCloudinary(image);

        const selectedSize = SIZES.find((s) => s.value === image.size);
        const price = selectedSize ? selectedSize.price : 5.99;

        addToCart({
          id: image.id,
          imageUrl: cloudinaryUrl,
          cloudinaryId: image.id,
          size: image.size,
          quantity: image.quantity,
          borderStyle: image.borderStyle,
          finish: image.finish,
          price: price * image.quantity,
        });

        setUploadProgress(((i + 1) / images.length) * 100);
      }

      toast.success("All items added to cart!");
      router.push("/cart");
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
            Create Your Custom Magnets
          </h1>

          {/* Upload Area */}
          {images.length === 0 ? (
            <Card className="mb-8">
              <CardContent className="p-12">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-purple-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-semibold mb-2">
                    {isDragActive
                      ? "Drop your photos here"
                      : "Drag & drop your photos here"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to select files (max 10MB per image)
                  </p>
                  <Button variant="outline">Choose Files</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Add More Images Button */}
              <div className="mb-6 text-center">
                <div {...getRootProps()} className="inline-block">
                  <input {...getInputProps()} />
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Add More Images
                  </Button>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-4">
                        {/* Image Preview */}
                        <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={image.preview}
                            alt="Upload preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedImage(image.preview)}
                            className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Customization Options */}
                        <div className="space-y-4">
                          {/* Size Selection */}
                          <div>
                            <Label className="text-sm font-medium mb-2">
                              Size
                            </Label>
                            <Select
                              value={image.size}
                              onValueChange={(value) =>
                                updateImage(image.id, { size: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SIZES.map((size) => (
                                  <SelectItem
                                    key={size.value}
                                    value={size.value}
                                  >
                                    {size.label} - ${size.price}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Quantity */}
                          <div>
                            <Label className="text-sm font-medium mb-2">
                              Quantity: {image.quantity}
                            </Label>
                            <Slider
                              value={[image.quantity]}
                              onValueChange={(value) =>
                                updateImage(image.id, { quantity: value[0] })
                              }
                              min={1}
                              max={20}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          {/* Border Style */}
                          <div>
                            <Label className="text-sm font-medium mb-2">
                              Border
                            </Label>
                            <Select
                              value={image.borderStyle}
                              onValueChange={(value) =>
                                updateImage(image.id, { borderStyle: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {BORDER_STYLES.map((border) => (
                                  <SelectItem
                                    key={border.value}
                                    value={border.value}
                                  >
                                    {border.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Finish */}
                          <div>
                            <Label className="text-sm font-medium mb-2">
                              Finish
                            </Label>
                            <RadioGroup
                              value={image.finish}
                              onValueChange={(value) =>
                                updateImage(image.id, { finish: value })
                              }
                            >
                              {FINISHES.map((finish) => (
                                <div
                                  key={finish.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={finish.value}
                                    id={`${image.id}-${finish.value}`}
                                  />
                                  <Label
                                    htmlFor={`${image.id}-${finish.value}`}
                                  >
                                    {finish.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="mb-8">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-center mt-2 text-sm text-gray-600">
                    Uploading images... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={uploading}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  {uploading ? "Uploading..." : "Add All to Cart"}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={800}
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
