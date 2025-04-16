import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

// Using type assertion to satisfy the type checker
export async function POST(
  req: Request,
  { params }: any
) {
  try {
    // Safely access params whether it's a Promise or not
    const id = params && (params instanceof Promise ? (await params).id : params.id);

    // Get cookies with await
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    let user = null;
    if (token) {
      try {
        user = verifyToken(token);
      } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse the comment data from request body
    const { text } = await req.json();

    if (typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: 'Comment text is required and must be a string' },
        { status: 400 }
      );
    }

    // Create a new comment object
    const comment = {
      id: new ObjectId().toString(),
      text,
      author:
        user && typeof user === 'object' && 'name' in user
          ? user.name
          : 'Anonymous',
      timestamp: new Date().toISOString(),
    };

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('3rvision');

    // Add the comment to the post's comments array
    await db.collection('posts').updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: comment } }
    );

    // Return the new comment
    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json(
      { error: 'Failed to post comment' },
      { status: 500 }
    );
  }
}