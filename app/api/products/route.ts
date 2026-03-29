import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

// Helper function to verify token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
}

// GET all products (Public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const featured = searchParams.get('featured');
    
    let query: any = {};
    
    if (pageId) query.pageId = pageId;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (featured) query.featured = featured === 'true';
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new product (Protected)
export async function POST(request: NextRequest) {
  try {
    // Verify token
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { name, description, price, image, category, brand, pageId } = body;
    
    if (!name || !description || !price || !image || !category || !brand || !pageId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const product = await Product.create(body);
    
    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}