import {Artwork} from '~/components/Artwork';
import {ModeSwitch} from '~/components/Shell';
export function meta() {return [{title: 'Desert Formal — Home'}];}
export default function Home() {
  return <section className="home-scene" aria-label="Desert Formal home">
    <div className="home-fragment fragment-one"><Artwork kind="landscape"/><span>01 / somewhere</span></div>
    <div className="home-fragment fragment-two"><Artwork kind="flower"/><span>02 / something growing</span></div>
    <div className="home-fragment fragment-three"><Artwork kind="horizon"/><span>03 / a little further</span></div>
    <div className="home-fragment fragment-four"><span className="paper-note">Things to wear.<br/>Things to keep.<br/>Things to come back to.</span></div>
    <div className="home-center"><p className="eyebrow">Clothing, objects & observations</p><h1 className="formal">FORMAL</h1><ModeSwitch /></div>
    <p className="home-caption">An ongoing journal.<br/>An open collection.</p>
  </section>;
}
