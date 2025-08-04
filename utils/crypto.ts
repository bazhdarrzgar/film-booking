// Secure password hashing utilities using Web Crypto API

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordBuffer = encoder.encode(password);
  
  // Import the key for PBKDF2
  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  // Derive a key using PBKDF2
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );
  
  // Export the derived key
  const exportedKey = await crypto.subtle.exportKey('raw', derivedKey);
  const hashArray = new Uint8Array(exportedKey);
  
  // Combine salt and hash
  const combined = new Uint8Array(salt.length + hashArray.length);
  combined.set(salt);
  combined.set(hashArray, salt.length);
  
  // Convert to base64
  return btoa(String.fromCharCode(...combined));
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    // Decode the stored hash
    const combined = new Uint8Array(
      atob(hashedPassword).split('').map(c => c.charCodeAt(0))
    );
    
    // Extract salt and hash
    const salt = combined.slice(0, 16);
    const storedHash = combined.slice(16);
    
    const passwordBuffer = encoder.encode(password);
    
    // Import the key for PBKDF2
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    // Derive a key using the same parameters
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      key,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt']
    );
    
    // Export the derived key
    const exportedKey = await crypto.subtle.exportKey('raw', derivedKey);
    const hashArray = new Uint8Array(exportedKey);
    
    // Compare hashes
    return hashArray.every((byte, index) => byte === storedHash[index]);
  } catch {
    return false;
  }
}

export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function generateId(): string {
  return crypto.randomUUID();
}