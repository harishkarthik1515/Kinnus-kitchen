import { ArrowDownIcon, InstagramIcon, YoutubeIcon, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Home = (): JSX.Element => {
  const [activeNav, setActiveNav] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items with sections - added all sections to enable smooth navigation
  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Chef", id: "chef" },
    { name: "Gallery", id: "gallery" },
    { name: "Menu", id: "menu" },
  ];

  // Social media links
  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon className="w-4 h-4" />, url: "https://instagram.com" },
    {
      name: "Whatsapp",
      icon: (
        <img className="w-4 h-4" alt="Social icons" src="/social-icons-1.svg" />
      ),
      url: "https://whatsapp.com"
    },
    { name: "Youtube", icon: <YoutubeIcon className="w-4 h-4" />, url: "https://youtube.com" },
  ];

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 1;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  // Get next section based on current section
  const getNextSection = (currentSection) => {
    const currentIndex = navItems.findIndex(item => item.id === currentSection);
    if (currentIndex < navItems.length - 1) {
      return navItems[currentIndex + 1].id;
    }
    return navItems[0].id; // Loop back to top if at bottom
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveNav(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo click handler
  const handleLogoClick = () => {
    scrollToSection('home');
    setActiveNav('home');
  };

  // Get current section name
  const getCurrentSectionName = () => {
    return navItems.find(item => item.id === activeNav)?.name || 'Home';
  };

  return (
    
      <div className="bg-white overflow-hidden w-full relative">
        {/* Hero Section */}
        <section
          id="home"
          className="relative w-full h-screen min-h-[500px] max-h-[800px] bg-cover bg-center"
          style={{ backgroundImage: "url('./main.png')" }}
        >
          <div className="absolute w-full max-w-[800px] h-[300px] top-1/4 left-1/2 -translate-x-1/2 bg-black rounded-[300px/150px] blur-[200px] opacity-60" />
          <div className="absolute w-full h-full top-0 left-0 bg-[#00000080]" />

          <div className="max-w-6xl mx-auto px-4 md:px-8 relative h-full">
            <img
              onClick={handleLogoClick}
              className="absolute w-28 md:w-36 lg:w-40 h-auto top-6 left-4 md:left-8 cursor-pointer"
              alt="Kinnus Kitchen Logo"
              src="/group-2.png"
            />
            {/* Navigation */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
              {/* Desktop Navigation */}
              <Card className="hidden md:inline-flex items-center gap-4 md:gap-6 px-4 md:px-6 py-2 md:py-3 bg-[#0000005e] rounded-xl border border-solid border-[#6b6b6bb5] backdrop-blur-[16.2px]">
                <CardContent className="p-0 flex gap-4 md:gap-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveNav(item.id);
                        scrollToSection(item.id);
                      }}
                      className={`[font-family:'Nunito',Helvetica] ${
                        activeNav === item.id
                          ? "font-bold text-[#e00000]"
                          : "font-medium text-[#9c9c9c] hover:text-white transition-colors"
                      } text-base md:text-xl lg:text-2xl tracking-[0] leading-normal relative w-fit whitespace-nowrap`}
                    >
                      {item.name}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Hero Content */}
          {/* Desktop View (Hidden on Mobile) */}
<div className="inline-flex flex-col items-start gap-4 md:gap-6 lg:gap-8 absolute top-1/2 left-1/2 md:left-[37%] transform -translate-x-1/2 max-w-[90%] md:max-w-[75%] lg:max-w-[60%] hidden sm:flex">
  <div className="flex flex-col items-start gap-2 md:gap-4 relative self-stretch w-full">
    <h1 className="relative w-full whitespace-nowrap [font-family:'Caster_Demo-Regular',Helvetica] font-normal text-transparent text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight">
      <span className="text-[#e6e6e6] font-cormorant">Where every</span> 
      <span className="text-white text-5xl md:text-6xl lg:text-7xl font-cormorant"> Meal</span> 
      <span className="text-[#e6e6e6] font-cormorant"> feels like </span> 
      <span className="text-white text-5xl md:text-6xl lg:text-7xl font-cormorant">Home</span>
    </h1>

    <div className="relative self-stretch font-cormorant font-normal text-transparent text-sm md:text-base lg:text-lg tracking-[0] leading-relaxed">
      <span className="text-[#b3b3b3]">
        Bringing you comforting, home-style dishes
        <br />
        with a
      </span>
      <span className="text-white text-base md:text-lg lg:text-2xl">
        {" "}touch of tradition
      </span>
      <span className="text-white">.</span>
    </div>
  </div>

  {/* Responsive Button */}
  <Button
    onClick={() => scrollToSection('about')}
    className="inline-flex items-center gap-2 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 mt-4 md:mt-6 lg:mt-8 relative flex-[0_0_auto] bg-[#ffffff26] hover:bg-[#ffffff40] rounded-[30px] backdrop-blur-[10px] h-auto transition-colors"
    variant="ghost"
  >
    <span
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
      className="relative w-fit font-light text-white text-sm md:text-base lg:text-lg tracking-[0] leading-relaxed whitespace-nowrap"
    >
      Taste the Tradition
    </span>
    <ArrowDownIcon className="relative w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
  </Button>
</div>

{/* Mobile View (Hidden on Desktop) */}
<div className="inline-flex flex-col items-start gap-5 absolute top-1/4 left-1/2 transform -translate-x-1/2 max-w-[95%] sm:hidden">
  <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
  <h1 className="
  relative w-full whitespace-nowrap 
  [font-family:'Caster_Demo-Regular',Helvetica] font-normal text-transparent 
  text-4xl md:text-5xl lg:text-6xl tracking-[0] leading-tight
">
  <span className="text-[#e6e6e6] font-cormorant">Where every</span> 
  <br />
  <span className="text-white text-6xl md:text-7xl lg:text-8xl font-cormorant"> Meal</span> 
  <br />
  <span className="text-[#e6e6e6] font-cormorant"> feels like </span> 
  <br />
  <span className="text-white text-6xl md:text-7xl lg:text-8xl font-cormorant">Home</span>
</h1>

    <div className="relative self-stretch font-cormorant font-normal text-transparent text-base tracking-[0] leading-relaxed">
      <span className="text-[#b3b3b3]">
        Bringing you comforting, home-style dishes
        <br />
        with a
      </span>
      <span className="text-white text-lg">
        {" "}touch of tradition
      </span>
      <span className="text-white">.</span>
    </div>
  </div>

  {/* Mobile Button */}
  <Button
    onClick={() => scrollToSection('about')}
    className="inline-flex items-center gap-3 px-5 py-3 mt-5 bg-[#ffffff26] hover:bg-[#ffffff40] rounded-[35px] backdrop-blur-[12px] h-auto transition-colors"
    variant="ghost"
  >
    <span
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
      className="relative w-fit font-light text-white text-lg tracking-[0] leading-relaxed whitespace-nowrap"
    >
      Taste the Tradition
    </span>
    <ArrowDownIcon className="relative w-5 h-5 text-white" />
  </Button>
</div>


</section>
        {/* About Section */}
        <section
          id="about"
          className="w-full px-4 md:px-8 relative"
          style={{ paddingTop: "6%", paddingBottom: "6%" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl mx-auto">
            <div className="flex flex-col w-full md:w-[450px] items-start gap-4 relative">
              <Card className="relative self-stretch w-full h-[280px] md:h-[350px] bg-[#d9d9d9] rounded-lg overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src="./Rectangle 9.png"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
              <div className="flex h-[170px] md:h-[220px] items-center gap-4 relative self-stretch w-full">
                <Card className="relative flex-1 self-stretch grow bg-[#d9d9d9] rounded-lg overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <img
                      src="./Rectangle 10.png"
                      alt="Placeholder"
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
                <Card className="relative flex-1 self-stretch grow bg-[#d9d9d9] rounded-lg overflow-hidden">
                  <CardContent className="p-0.2 h-full">
                    <img
                      src="./Rectangle 12.png"
                      alt="Placeholder"
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-[600px] items-start gap-6 relative">
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="relative self-stretch text-center md:text-left font-normal text-black text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight"
              >
                Kinnus Kitchen: <br />
                Where Passion Meets Flavor
              </h2>

              <p
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="relative self-stretch text-center md:text-left font-light text-black text-base md:text-lg lg:text-xl tracking-[0] leading-relaxed"
              >
                At Kinnus Kitchen, we believe that food is more than just a meal—it&apos;s a journey of flavors, emotions, and memories. 
                Every dish we create is a harmonious blend of tradition and innovation, where time-honored recipes meet modern culinary artistry.
                <br /><br />
                Rooted in rich, authentic flavors and crafted with unwavering passion, our kitchen is a testament to the power of good food. 
                We carefully source the finest ingredients, ensuring that every bite is packed with freshness, quality, and soul-satisfying taste. 
                Our menu is a celebration of bold, distinctive flavors that tell a story—one that brings people together and turns ordinary moments into extraordinary experiences.
                <br /><br />
                At Kinnus Kitchen, food isn&apos;t just something you eat—it&apos;s something you feel, cherish, and remember. 
                Join us for an experience that goes beyond dining, where every meal is a masterpiece and every visit is a new adventure.
              </p>
            </div>
          </div>

          {/* Section Navigation Arrow */}
          <Button
            onClick={() => scrollToSection('chef')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-transparent hover:bg-[#00000020] rounded-full p-2"
            variant="ghost"
          >
            <ArrowDownIcon className="w-8 h-8 text-black animate-bounce" />
          </Button>
        </section>

        {/* Chef Section */}
        <section id="chef" className="bg-[#142927] w-full py-16 md:py-24 lg:py-32 relative">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col w-full md:w-[550px] items-start gap-6 relative">
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="relative self-stretch text-center md:text-left font-normal text-[#e6e6e6] text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight"
              >
                Meet the Chef
              </h2>

              <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
                <p
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="relative self-stretch text-center md:text-left font-light text-[#e6e6e6] text-base md:text-lg lg:text-xl tracking-[0] leading-relaxed"
                >
                  Welcome to Kinnus Kitchen! After running a successful cloud kitchen in the UK, I&apos;m now here in Hyderabad, bringing
                  you the authentic, homemade Indian flavors I&apos;ve always cherished. Every dish I serve is crafted from scratch, using
                  the freshest ingredients and time-tested family recipes. Whether it&apos;s a special event or a simple craving,
                  I&apos;m dedicated to delivering the true taste of regional Indian cuisine, right here in your neighborhood.
                </p>

                <p
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="relative self-stretch text-center md:text-left font-light text-[#e6e6e6] text-base md:text-lg lg:text-xl tracking-[0] leading-relaxed"
                >
                  It&apos;s all about sharing the food I love with you, made with passion and tradition.
                </p>
              </div>
            </div>

            <Card className="relative w-full md:w-[450px] aspect-square bg-[#979797] rounded-lg overflow-hidden">
              <CardContent className="p-0 h-full">
                <img
                  src="./Rectangle 14.png"
                  alt="Placeholder"
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Section Navigation Arrow */}
          <Button
            onClick={() => scrollToSection('gallery')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-transparent hover:bg-[#ffffff20] rounded-full p-2"
            variant="ghost"
          >
            <ArrowDownIcon className="w-8 h-8 text-white animate-bounce" />
          </Button>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          className="w-full relative"
          style={{ paddingTop: "6%", paddingBottom: "6%" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-center md:text-left font-normal text-[#191919] text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight mb-8 md:mb-10"
            >
              Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <Card className="md:col-span-8 h-[220px] md:h-[280px] lg:h-[400px] bg-[#d9d9d9] rounded-lg overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src="./Rectangle 15.png"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
              <Card className="md:col-span-4 h-[220px] md:h-[280px] lg:h-[400px] bg-[#d9d9d9] rounded-lg overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src="./Rectangle 16.png"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
              <Card className="md:col-span-4 h-[220px] md:h-[280px] lg:h-[400px] bg-[#d9d9d9] rounded-lg overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src="./Rectangle 17.png"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
              <Card className="md:col-span-5 h-[220px] md:h-[280px] lg:h-[400px] bg-[#d9d9d9] rounded-lg overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src="./Rectangle 18.png"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
              <Card className="md:col-span-3 h-[220px] md:h-[280px] lg:h-[400px] bg-[#d9d9d9] rounded-lg overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src="./Rectangle 19.png"
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section Navigation Arrow */}
          <Button
            onClick={() => scrollToSection('menu')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-transparent hover:bg-[#00000020] rounded-full p-2"
            variant="ghost"
          >
            <ArrowDownIcon className="w-8 h-8 text-black animate-bounce" />
          </Button>
        </section>

        {/* Menu Section */}
        <section id="menu" className="w-full py-12 md:py-16 lg:py-20 bg-white relative">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-center md:text-left font-normal text-[#191919] text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight mb-8 md:mb-10"
            >
              Our Menu
            </h2>

            <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
              <Card className="bg-[#f5f5f5] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-full py-6 md:py-10 my-4 md:my-6">
                <CardContent className="p-4 md:p-8 text-center flex flex-col justify-center items-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#333333] mb-2 md:mb-4">Coming Soon</h3>
                  <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-4 md:mb-6">
                    Our menu is being crafted with love and care. Stay tuned for delicious offerings!
                  </p>
                  <button className="px-6 md:px-8 py-2 md:py-3 bg-[#142927] text-white text-base md:text-lg rounded-md hover:bg-[#0e1d1b] transition duration-300">
                    Stay Updated
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section Navigation Arrow - Goes back to top */}
          <Button
            onClick={() => scrollToSection('home')}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-transparent hover:bg-[#00000020] rounded-full p-2"
            variant="ghost"
          >
            <ArrowDownIcon className="w-8 h-8 text-black rotate-180" />
          </Button>
        </section>

        {/* Footer */}
        <footer
  className="flex flex-col md:flex-row items-start gap-6 md:gap-12 px-4 md:px-8 lg:px-16 py-8 md:py-12 bg-[#142927]"
  style={{ fontFamily: "'Cormorant Garamond', serif" }}
>
  <div className="w-full md:w-1/2 flex items-center justify-center">
    <img
      onClick={handleLogoClick}
      className="relative w-full max-w-[150px] md:max-w-[500px] lg:max-w-[450px] h-auto cursor-pointer"
      alt="Kinnus Kitchen Logo"
      src="/group-2-1.png"
    />
  </div>

  <div className="flex flex-col h-auto items-start justify-between relative flex-1 grow gap-6 md:gap-8 w-full md:w-1/2">
    <div className="flex flex-col md:flex-row items-start justify-between relative self-stretch w-full gap-4 md:gap-0">
      <div
        className="inline-flex flex-col items-start gap-2 relative"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveNav(item.id);
              scrollToSection(item.id);
            }}
            className={`font-normal ${
              activeNav === item.id ? "text-[#e00000]" : "text-white"
            } hover:text-[#e00000] text-sm md:text-base tracking-[0.40px] leading-normal relative w-fit whitespace-nowrap transition-colors`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div
        className="relative w-fit opacity-40 font-normal text-white text-xs tracking-[0] leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        © 2025 — Copyright
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-start md:items-end justify-between relative self-stretch w-full gap-4 md:gap-0">
      <div
        className="inline-flex flex-col items-start gap-3 relative"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        <div
          className="relative w-fit opacity-60 font-medium text-white text-xs tracking-[0.80px] leading-normal uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Contact Us
        </div>

        <div className="inline-flex flex-col items-start gap-2 relative">
          <a
            href="tel:+91XXXXXXXXXX"
            className="relative w-fit font-normal text-white hover:text-[#e00000] text-sm md:text-base tracking-[0.32px] leading-normal whitespace-nowrap transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            +91 XXXXX XXXXX
          </a>

          <a
            href="mailto:info@logoipsum.com"
            className="relative w-fit font-normal text-white hover:text-[#e00000] text-sm md:text-base tracking-[0.32px] leading-normal whitespace-nowrap transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            info@logoipsum.com
          </a>
        </div>
      </div>

      <div
        className="flex flex-wrap md:inline-flex items-start gap-2 relative"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 relative rounded-[30px] border border-solid border-[#ffffff3d] hover:border-white bg-transparent transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {link.icon}
            <span
              className="relative w-fit font-normal text-white text-xs md:text-sm tracking-[0.24px] leading-normal whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>

      </div>
  );
};