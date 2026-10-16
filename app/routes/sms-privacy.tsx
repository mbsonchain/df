import {Link} from 'react-router';

export function meta() {return [{title: 'FORMAL SMS privacy policy'}];}

export default function SmsPrivacy() {
  return <article className="sms-policy-page" aria-labelledby="sms-policy-title">
<h1 id="sms-policy-title">FORMAL SMS privacy policy</h1>
<p>Last updated: October 16, 2026</p>
<p>FORMAL is operated by Matteo Salvadei in the United States. This policy explains how we use information in connection with the desert FORMAL network text-message program. Contact us at <a href="mailto:mb@strikeout.us">mb@strikeout.us</a>.</p>
<h2>what we collect</h2>
<p>When you sign up, we collect your phone number, your country or dialing code, and records of your SMS consent, including when and how you subscribed. Our messaging providers may process technical information such as your IP address, device information, message delivery, replies, opt-outs, and interactions with links in our messages. We also retain information you choose to send us when you ask for help.</p>
<h2>how we use it</h2>
<p>We use this information to manage your subscription, confirm consent where required, send FORMAL art, offerings, and collective updates, respond to questions, honor opt-outs, prevent misuse, and maintain records of consent. We use consent as the basis for promotional text messages. We also process information as needed to operate and secure the program and meet applicable legal obligations.</p>
<h2>who receives it</h2>
<p>We use Klaviyo and the telecommunications providers involved in delivering messages. We may share information with service providers only as needed to run the messaging program, or when disclosure is required by law. We do not sell your phone number, SMS opt-in information, or consent records. We do not share them with affiliates or other third parties for their own marketing or for purposes unrelated to providing this messaging program.</p>
<h2>your choices</h2>
<p>You may leave at any time. Reply STOP where replies are supported, or use the unsubscribe link in a message. You can also contact us at <a href="mailto:mb@strikeout.us">mb@strikeout.us</a>. Depending on where you live, you may have rights to access, correct, delete, receive a copy of, or restrict the use of your personal information, and to complain to a data-protection authority. We may need to verify your identity to respond to a request.</p>
<h2>retention and international processing</h2>
<p>We retain subscription information while needed to operate the program. After you unsubscribe, we may keep limited consent and suppression records to honor your choice and meet legal obligations. Information may be processed in the United States and other countries where our service providers operate, using safeguards required by applicable law.</p>
<h2>updates</h2>
<p>We may update this policy as the program changes. We will post the revised policy with a new date and provide additional notice where required.</p>
<nav aria-label="SMS policies"><Link to="/sms-privacy">privacy</Link><Link to="/sms-terms">terms</Link><Link to="/network?view=desert">back to desert</Link></nav>
</article>;
}
