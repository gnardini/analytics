import { User } from '@type/user';
import { useRef, useState } from 'react';
import { FaArrowRight, FaFeather, FaGithub, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../common/Button';
import { FeatureBox } from './views/FeatureBox';
import { Footer } from './views/Footer';
import logoUrl from '../../../assets/logo.png';
import landingDemo from '../../../assets/landing-demo.png';

interface Props {
  user: User | null;
}

export function LandingScreen({ user }: Props) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const handleTryForFreeClick = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleGoToApp = () => {
    window.location.href = '/dashboard';
  };

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-3 sm:p-6 text-center relative bg-gradient-to-r from-secondary-background via-primary-background to-secondary-background">
      <nav className="w-full max-w-[1000px] flex justify-end items-center mb-10 gap-8">
        <div className="flex gap-1 mr-auto items-center">
          <img src={logoUrl} className="w-16 h-16" />
          <h2 className="text-4xl">Phinxer</h2>
        </div>
        <a
          href="https://github.com/gnardini/analytics"
          target="_blank"
          className="text-lg text-text-primary hover:underline"
        >
          GitHub
        </a>
        <button onClick={scrollToPricing} className="text-lg hover:underline">
          Pricing
        </button>
        {user && (
          <Button className="px-3 py-2" onClick={handleGoToApp}>
            <div className="flex items-center">
              Go to app <FaArrowRight className="ml-2" />
            </div>
          </Button>
        )}
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      <h1 className="text-3xl sm:text-6xl font-bold mt-4 sm:mt-20 bg-clip-text text-transparent bg-gradient-to-r from-secondary-accent to-purple-500">
        Powerful and Affordable
        <br />
        Web & Mobile Analytics
      </h1>
      <div className="w-full md:w-[1000px] flex flex-col">
        <h2 className="w-full md:w-[600px] mx-auto text-lg md:text-2xl mt-8">
          If you want to know how your users are using your website or app you have two options:
        </h2>
        <div className="flex justify-between w-full mt-8">
          <div className="w-1/2 px-2 sm:px-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Give all your data to <span className="text-orange-400">Google Analytics</span>
            </h3>
            <p className="text-text-secondary">
              Google will then use this data to violate your users privacy and track them across the
              entire internet for their own profit
            </p>
          </div>
          <div className="w-1/2 px-2 sm:px-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Use one of the paid alternatives</h3>
            <p className="text-text-secondary">
              There are alternatives, with different degrees of privacy preserving. They charge very
              high prices for this service.
            </p>
          </div>
        </div>
        <p className="sm:w-[800px] mx-auto sm:text-xl mt-10 text-text-primary">
          We are committed to being the cheapest feature-rich analytics system that doesn't require
          selling your soul to Google.
        </p>
        <Button
          className="mt-10 text-4xl w-fit px-10 py-3 mx-auto transition ease-in-out duration-300 transform hover:scale-105"
          onClick={handleTryForFreeClick}
        >
          {'Try for free'}
        </Button>
        {!user && <p className="mt-1 text-text-secondary mx-auto">No credit card required</p>}
      </div>

      <img
        src={landingDemo}
        className="mt-12 border-2 border-primary-accent rounded-xl"
      />

      {/* Features Section */}
      <div className="w-full max-w-[1000px] mt-32">
        <h2 className="text-2xl sm:text-4xl font-bold mb-12">Why Choose Phinxer?</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-8">
          <FeatureBox
            icon={<FaGithub className="text-4xl text-secondary-accent" />}
            title="Open Source"
            description="Transparent and community-driven development for better trust and flexibility."
          />
          <FeatureBox
            icon={<FaLightbulb className="text-4xl text-secondary-accent" />}
            title="Intuitive & Easy to Use"
            description="User-friendly interface designed for effortless analytics management."
          />
          <FeatureBox
            icon={<FaFeather className="text-4xl text-secondary-accent" />}
            title="Lightweight <1kb"
            description="Minimal impact on your website's performance with our tiny script."
          />
          <FeatureBox
            icon={<FaShieldAlt className="text-4xl text-secondary-accent" />}
            title="Privacy Friendly"
            description="Respect your users' privacy while still gaining valuable insights."
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div ref={pricingSectionRef} className="w-full max-w-[1000px] mt-32 mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Pay for what you use</h2>
        <div className="flex justify-between items-start">
          <div className="w-1/2 pr-3 sm:pr-8 flex flex-col">
            <h3 className="text-lg sm:text-2xl font-semibold mb-4 self-start">
              Affordable Analytics for Everyone
            </h3>
            <ul className="list-disc list-inside text-left text-base sm:text-lg text-text-secondary space-y-1">
              <li>Full feature access for all users</li>
              <li>Unlimited users & websites</li>
              <li>No hidden fees or complicated tiers</li>
              <li>Scale seamlessly as your business grows</li>
              <li>Privacy-focused analytics you can trust</li>
            </ul>
          </div>
          <div className="w-1/2 pl-3 sm:pl-8 border-l border-text-tertiary flex flex-col">
            <div className="self-start text-3xl sm:text-5xl font-bold text-secondary-accent mb-4">
              $10 <span className="text-base sm:text-2xl text-text-primary">per 1M events</span>
            </div>
            <ul className="list-disc list-inside text-left text-base sm:text-lg text-text-secondary space-y-1">
              <li>1 year data retention</li>
              <li>Credits expire after 1 year</li>
              <li>
                For most startups, this could last 3-6 months or more, depending on your traffic and
                user engagement.
              </li>
            </ul>
          </div>
        </div>
        <Button
          className="mt-10 text-2xl w-fit px-8 py-3 mx-auto transition ease-in-out duration-300 transform hover:scale-105"
          onClick={handleTryForFreeClick}
        >
          Start your free trial
        </Button>
      </div>
      <Footer />
    </div>
  );
}
