import { Linkedin, Youtube, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#106f94] text-[#FFFFFF]">
      {/* Trust Badges Section */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-b border-footer-muted/30 pb-8">
            
            {/* Badge 1 - Satisfaction Guarantee */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-40 h-40 bg-footer-foreground rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-footer rounded flex items-center justify-center">
                  <span className="text-footer-foreground text-4xl font-bold">👍</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                100% satisfaction guarantee. If you are not fully satisfied, we'll work with you to make it right.
              </p>
            </div>
            
            {/* Badge 2 - For The Planet */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src="https://productcatalo.my.canva.site/buses/_assets/media/a7bba014fe97ac390a1ef826ffc815b5.png"
                  alt="For The Planet"
                  className="h-40 w-40 object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">FOR THE PLANET</span><br />
                Proudly a member of 1% for the Planet to help you travel sustainably.
              </p>
            </div>
            
            {/* Badge 3 - BBB Accredited */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src="https://productcatalo.my.canva.site/buses/_assets/media/c4f7312badbbf9dcbf05b77a8dc11f8f.png"
                  alt="BBB Accredited"
                  className="h-40 w-40 object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed">
                Sanchar6T is accredited by the Better Business Bureau with an A+ rating.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos Section */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-b border-footer-muted/30 pb-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src="https://productcatalo.my.canva.site/buses/_assets/media/4e2e595b02ccc3124a837fd80faf8790.png"
                  alt="APTDC"
                  className="h-40 w-40 object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src="/src/assets/KSTDC.png"
                  alt="KSTDC"
                  className="h-40 w-40 object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-40 h-40 flex items-center justify-center">
                <img
                  src="/src/assets/ITDC.png"
                  alt="ITDC"
                  className="h-40 w-40 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-footer-dark px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Follow Us */}
            <div>
              <h3 className="text-footer-foreground font-semibold text-lg mb-6">Follow Us:</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center space-x-3 text-footer-muted hover:text-footer-foreground transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-footer-muted hover:text-footer-foreground transition-colors">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span>Youtube</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-footer-muted hover:text-footer-foreground transition-colors">
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span>Facebook</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-footer-muted hover:text-footer-foreground transition-colors">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-footer-muted hover:text-footer-foreground transition-colors">
                  <span className="">GSTIN:</span> 29AFHFS2158D1ZW
                </a>
              </div>
            </div>

            {/* Trending Destinations */}
            <div>
              <h3 className="text-footer-foreground font-semibold text-lg mb-6">Trending Destinations</h3>
              <div className="space-y-3">
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Tirupati</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Shiridi</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Kashi</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Dandelli</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Goa</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Gokarna</a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-footer-foreground font-semibold text-lg mb-6">Company</h3>
              <div className="space-y-3">
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Meet our team</a>
                <Link to="/contact-us" className="block text-footer-muted hover:text-footer-foreground transition-colors">Contact Us</Link>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Career</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Sanchar6T Principles</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Become Local Tour Guide</a>
              </div>
            </div>

            {/* Discover */}
            <div>
              <h3 className="text-footer-foreground font-semibold text-lg mb-6">Discover</h3>
              <div className="space-y-3">
                <Link to="/about-us" className="block text-footer-muted hover:text-footer-foreground transition-colors">About Us</Link>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">FAQ</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">NRI</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Women Safety</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Under 1year</a>
                <a href="#" className="block text-footer-muted hover:text-footer-foreground transition-colors">Senior Citizens</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info & Copyright */}
      <div className="border-t border-footer-muted/20 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 text-footer-muted">
            <div className="bg-[#124a74]">
              <h4 className="text-footer-foreground font-semibold mb-2">Contact Info</h4>
              <p className="text-sm">
                +91 9731312275, 8197882511, #293, 17th cross, sampige road, malleshwaram, 2nd floor,
                Above Vodafone outlet, OPP to VijaylakshmiSilk and Sarees.
              </p>
            </div>
            <div className="text-sm">
              © Copyright Sanchar6T Tours and Travels - Developed By TechVaraha Solutions Pvt Ltd.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
