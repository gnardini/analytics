import { FaDiscord, FaGithub } from 'react-icons/fa';
import logoUrl from '../../../../assets/logo.png';

export function Footer() {
  return (
    <footer className="w-full max-w-[1000px] flex justify-between items-center mt-20 py-6 border-t border-text-tertiary">
      <div className="flex items-center">
        <img src={logoUrl} className="w-8 h-8 mr-2" alt="Phinxer Logo" />
        <span className="text-xl font-semibold">Phinxer</span>
      </div>
      <div className="flex items-center space-x-6">
        <a
          href="https://github.com/gnardini/analytics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:text-secondary-accent"
        >
          <FaGithub className="text-2xl" />
        </a>
        <a
          href="https://discord.gg/aZJ7XY8Hx3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:text-secondary-accent"
        >
          <FaDiscord className="text-2xl" />
        </a>
      </div>
    </footer>
  );
}
