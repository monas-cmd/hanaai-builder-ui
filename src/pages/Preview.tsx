import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Preview = () => {
  const { userData } = useAppContext();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Generate HTML mockup
  const generateMockup = () => {
    const colors = {
      'Ocean Blue': { primary: '#0a4da3', secondary: '#1e88e5' },
      'Forest Green': { primary: '#1b5e20', secondary: '#388e3c' },
      'Sunset Orange': { primary: '#e65100', secondary: '#f57c00' },
      'Royal Purple': { primary: '#4a148c', secondary: '#7b1fa2' },
      'Modern Gray': { primary: '#212121', secondary: '#424242' }
    };

    const palette = colors[userData.colorPalette as keyof typeof colors] || colors['Ocean Blue'];

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${userData.businessName} | Professional Services</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Professional services from ${userData.businessName} - ${userData.theme}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${palette.primary};
      --secondary: ${palette.secondary};
      --dark: #1a1a1a;
      --light: #f8f9fa;
      --gray: #6c757d;
      --white: #ffffff;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s ease;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      color: var(--dark);
      background-color: var(--light);
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: var(--white);
      padding: 4rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==');
      opacity: 0.5;
    }
 /* Navigation Styles */
  .navbar {
    background-color: var(--white);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0.5rem 0;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    text-decoration: none;
    transition: var(--transition);
  }

  .logo:hover {
    color: var(--secondary);
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--dark);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem 0;
    position: relative;
    transition: var(--transition);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  /* Mobile Menu Toggle (for future responsiveness) */
  .menu-toggle {
    display: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--primary);
  }

  /* Responsive Navbar */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: var(--white);
      padding: 1rem 2rem;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-links.active {
      display: flex;
    }

    .nav-link {
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .menu-toggle {
      display: block;
    }
  }
    .header-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
    }

    .header h1 {
      margin: 0;
      font-size: 2.8rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
    }

    .header p {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }

    .cta-button {
      display: inline-block;
      background-color: var(--white);
      color: var(--primary);
      padding: 0.8rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: var(--transition);
      box-shadow: var(--shadow);
    }

    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }

    /* Navigation */
    .navbar {
      background-color: var(--white);
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
    }

    /* Content */
    .content {
      flex: 1;
      max-width: 1200px;
      margin: 3rem auto;
      padding: 0 2rem;
    }

    .section-title {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title h2 {
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 1rem;
      position: relative;
      display: inline-block;
    }

    .section-title h2::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: var(--secondary);
    }

    .section-title p {
      color: var(--gray);
      max-width: 700px;
      margin: 0 auto;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: var(--white);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: var(--shadow);
      transition: var(--transition);
      text-align: center;
      border-top: 4px solid var(--primary);
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }

    .feature-card i {
      font-size: 2.5rem;
      color: var(--primary);
      margin-bottom: 1.5rem;
      display: inline-block;
    }

    .feature-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--dark);
    }

    .feature-card p {
      color: var(--gray);
      font-size: 0.95rem;
    }

    /* Testimonials */
    .testimonials {
      background-color: var(--white);
      padding: 4rem 2rem;
      margin: 4rem 0;
    }

    /* Footer */
    .footer {
      background-color: var(--dark);
      color: var(--white);
      padding: 3rem 2rem 1.5rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-column h3 {
      color: var(--white);
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      position: relative;
      padding-bottom: 0.5rem;
    }

    .footer-column h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--primary);
    }

    .footer-column p, .footer-column a {
      color: rgba(255,255,255,0.7);
      margin-bottom: 1rem;
      display: block;
      text-decoration: none;
      transition: var(--transition);
    }

    .footer-column a:hover {
      color: var(--white);
      padding-left: 5px;
    }

    .copyright {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;
    }

    /* Responsive Typography */
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.2rem;
      }

      .header p {
        font-size: 1rem;
      }

      .section-title h2 {
        font-size: 1.8rem;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 3rem 1rem;
      }

      .header h1 {
        font-size: 1.8rem;
      }

      .content {
        padding: 0 1rem;
      }
    }
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
  <!-- Navigation -->
 <nav class="navbar">
  <div class="nav-container">
    <a href="#" class="logo">${userData.businessName}</a>
    
    <div class="nav-links">
      <a href="#" class="nav-link">Home</a>
      <a href="#" class="nav-link">Services</a>
      <a href="#" class="nav-link">About</a>
      <a href="#" class="nav-link">Contact</a>
    </div>
    
    <button class="menu-toggle" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</nav>

  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <h1>Professional ${userData.theme} Services</h1>
      <p>Delivering exceptional results for our clients since ${new Date().getFullYear() - 3}</p>
      <a href="#contact" class="cta-button">Get Started</a>
    </div>
  </header>

  <!-- Main Content -->
  <main class="content">
    <section class="services">
      <div class="section-title">
        <h2>Our Services</h2>
        <p>We offer comprehensive solutions tailored to your specific needs and requirements.</p>
      </div>
      <div class="features">
        <div class="feature-card">
          <i class="fas fa-chart-line"></i>
          <h3>Consulting</h3>
          <p>Expert advice and strategic planning to help your business grow and overcome challenges.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-cogs"></i>
          <h3>Implementation</h3>
          <p>Professional execution of solutions with attention to detail and quality assurance.</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-headset"></i>
          <h3>Support</h3>
          <p>Ongoing maintenance and support to ensure your systems run smoothly.</p>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <div class="section-title">
        <h2>Client Testimonials</h2>
        <p>Hear what our valued clients have to say about our services.</p>
      </div>
      <!-- Testimonial content would go here -->
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-column">
        <h3>About Us</h3>
        <p>${userData.businessName} is a leading provider of ${userData.theme} services, dedicated to delivering exceptional results for our clients.</p>
      </div>
      <div class="footer-column">
        <h3>Quick Links</h3>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
      <div class="footer-column">
        <h3>Contact Info</h3>
        <p><i class="fas fa-map-marker-alt"></i> 123 Business Ave, City</p>
        <p><i class="fas fa-phone"></i> (123) 456-7890</p>
        <p><i class="fas fa-envelope"></i> info@${userData.businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
      </div>
    </div>
    <div class="copyright">
      &copy; ${new Date().getFullYear()} ${userData.businessName}. All rights reserved.
    </div>
  </footer>
  <script>
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
  });
</script>
</body>
</html>
    `;
  };

  // Load mockup into iframe
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const handleLoad = () => setIsIframeLoaded(true);

      iframe.addEventListener('load', handleLoad);
      
      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(generateMockup());
        iframeDoc.close();
      }

      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [userData]);

  const handlePublish = () => {
    // Publish logic here
    navigate('/published');
  };

  return (
    <div className="preview-page max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Website Preview</h2>
      
      {/* Preview Container */}
      <div className="mb-8 border-2 border-gray-200 rounded-lg overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-gray-100 p-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-600 truncate">
            {userData.domain || 'yourwebsite.com'}
          </div>
        </div>
        
        {/* Iframe Preview */}
        {!isIframeLoaded && (
          <div className="h-96 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          title="Website Preview"
          className={`w-full h-[500px] bg-white ${isIframeLoaded ? 'block' : 'hidden'}`}
          sandbox="allow-same-origin"
        />
      </div>

      {/* Publish Button - Always visible */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handlePublish}
          disabled={!isIframeLoaded}
          className={`px-6 py-2 rounded-lg text-white ${
            isIframeLoaded 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Publish Website
        </button>
      </div>
    </div>
  );
};

export default Preview;