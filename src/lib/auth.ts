import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as { id: string; role: string }; 
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}