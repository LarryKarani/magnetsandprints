import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return new Promise<NextResponse>((resolve) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'magnets-prints',
        },
        (error, result) => {
          if (error) {
            resolve(NextResponse.json({ error: error.message }, { status: 500 }))
          } else {
            resolve(NextResponse.json({
              url: result?.secure_url,
              publicId: result?.public_id
            }))
          }
        }
      ).end(buffer)
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}