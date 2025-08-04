// App layout component

import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Flix - Movie Booking Platform</title>
        <meta name="description" content="Book your favorite movies online with Flix. Modern, secure, and easy movie ticket booking platform." />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* CSS */}
        <link rel="stylesheet" href="/styles.css" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Flix - Movie Booking Platform" />
        <meta property="og:description" content="Book your favorite movies online with Flix" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flix-booking.deno.dev" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flix - Movie Booking Platform" />
        <meta name="twitter:description" content="Book your favorite movies online with Flix" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#dc2626" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/static/logo.svg" />
      </Head>
      
      <body class="bg-gray-900 text-white antialiased">
        <Component />
        
        {/* Analytics placeholder */}
        <script>
          // Add analytics code here if needed
        </script>
      </body>
    </html>
  );
}