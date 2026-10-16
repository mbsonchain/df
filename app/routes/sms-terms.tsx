import {Link} from 'react-router';

export function meta() {return [{title: 'FORMAL SMS terms'}];}

export default function SmsTerms() {
  return <article className="sms-policy-page" aria-labelledby="sms-policy-title">
<h1 id="sms-policy-title">FORMAL SMS terms</h1>
<p>Last updated: October 16, 2026</p>
<p>The desert FORMAL network text-message program is operated by Matteo Salvadei under the FORMAL name. By opting in, you agree to receive recurring promotional text messages from FORMAL about art, offerings, and the collective, including messages sent using automated technology, at the number you provide.</p>
<h2>joining</h2>
<p>Consent to receive text messages is not a condition of purchasing anything. Message frequency varies. Message and data rates may apply according to your mobile plan. Only provide a number that you own or are authorized to use, and let us know if your number changes.</p>
<h2>leaving and getting help</h2>
<p>To unsubscribe, reply STOP where replies are supported or follow the unsubscribe link in a message. You may receive a final message confirming your opt-out. For help, reply HELP where supported or email <a href="mailto:mb@strikeout.us">mb@strikeout.us</a>. Branded sender IDs may not accept replies; use the unsubscribe link or email us in that case.</p>
<h2>delivery</h2>
<p>Availability depends on your country, carrier, and device. Message delivery is not guaranteed, and carriers are not liable for delayed or undelivered messages. We may change, suspend, or end the program, subject to applicable law.</p>
<h2>privacy</h2>
<p>Our <a href="/sms-privacy">FORMAL SMS privacy policy</a> explains how we handle phone numbers, consent records, and other program information.</p>
<h2>contact</h2>
<p>FORMAL / Matteo Salvadei<br/><a href="mailto:mb@strikeout.us">mb@strikeout.us</a></p>
<nav aria-label="SMS policies"><Link to="/sms-privacy">privacy</Link><Link to="/sms-terms">terms</Link><Link to="/network?view=desert">back to desert</Link></nav>
</article>;
}
