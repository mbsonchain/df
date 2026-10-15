const landscape = 'https://cdn.shopify.com/s/files/1/0690/9103/3319/files/desert-camo-landscape.png?v=1792027789&width=2400';
const portrait = 'https://cdn.shopify.com/s/files/1/0690/9103/3319/files/desert-camo-portrait.png?v=1792027813&width=1000';

export function DesertBackdrop() {
  return (
    <div className="desert-backdrop" aria-hidden="true">
      {['top', 'center', 'bottom'].map(edge => (
        <picture key={edge} className={`desert-backdrop-${edge}`}>
          <source media="(max-width: 760px)" srcSet={portrait} />
          <img src={landscape} alt="" width={5692} height={3202} loading="eager" />
        </picture>
      ))}
    </div>
  );
}
