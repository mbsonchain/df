import {useEffect, useRef, useState} from 'react';
import {useNonce} from '@shopify/hydrogen';

const scriptId = 'formal-klaviyo';

export function NetworkSignup() {
  const nonce = useNonce();
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    const detectForm = () => {
      if (host.querySelector('form')) setStatus('ready');
    };
    const observer = new MutationObserver(detectForm);
    observer.observe(host, {childList: true, subtree: true});
    detectForm();
    const timeout = window.setTimeout(() => {
      if (!host.querySelector('form')) setStatus('unavailable');
    }, 15000);

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const onError = () => setStatus('unavailable');
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = 'https://static.klaviyo.com/onsite/js/R97gaz/klaviyo.js';
      if (nonce) script.nonce = nonce;
      script.addEventListener('error', onError);
      document.head.appendChild(script);
    } else {
      script.addEventListener('error', onError);
    }
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      script?.removeEventListener('error', onError);
    };
  }, [nonce]);

  return <div className="network-signup">
    <div ref={container} className="klaviyo-form-T9ERha"/>
    {status === 'loading' && <p role="status">opening the network…</p>}
    {status === 'unavailable' && <p role="status">the signup is temporarily unavailable. please try again, or contact <a href="mailto:mb@strikeout.us">mb@strikeout.us</a>.</p>}
    <noscript><p>Please enable JavaScript to open the signup.</p></noscript>
    <nav className="network-signup-policies" aria-label="SMS policies"><a href="/sms-privacy" target="_blank" rel="noopener noreferrer">privacy</a><a href="/sms-terms" target="_blank" rel="noopener noreferrer">terms</a></nav>
  </div>;
}
