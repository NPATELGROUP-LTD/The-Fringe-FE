import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('certificate') as File;
    const studentId = formData.get('studentId') as string;
    const studentName = formData.get('studentName') as string;
    const courseName = formData.get('courseName') as string;

    if (!file || !studentId || !studentName || !courseName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, JPG, JPEG, PNG are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'certificates');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${studentId}_${timestamp}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create certificate record (in a real app, this would go to a database)
    const certificateRecord = {
      id: `cert_${timestamp}`,
      studentId,
      studentName,
      studentEmail: `${studentName.toLowerCase().replace(' ', '.')}@example.com`, // Mock email
      courseName,
      completionDate: new Date().toISOString(),
      status: 'issued' as const,
      certificateUrl: `/uploads/certificates/${fileName}`,
      generatedBy: 'Admin User', // In real app, get from session
      generatedAt: new Date().toISOString(),
    };

    // In a real application, you would save this to your database
    // For now, we'll just return success
    console.log('Certificate uploaded:', certificateRecord);

    return NextResponse.json({
      success: true,
      message: 'Certificate uploaded successfully',
      certificate: certificateRecord,
    });

  } catch (error) {
    console.error('Error uploading certificate:', error);
    return NextResponse.json(
      { error: 'Failed to upload certificate' },
      { status: 500 }
    );
  }
}