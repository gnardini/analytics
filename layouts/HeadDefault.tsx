import logoUrl from '../assets/logo.png';

// Default <head> (can be overridden by pages)

export default function HeadDefault() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Powerful and Affordable Web & Mobile Analytics" />
      <link rel="icon" href={logoUrl} />
    </>
  );
}
