import {NetworkSignup} from '~/components/NetworkSignup';

export function meta() {return [{title: 'Join — FORMAL'}];}

export default function Join() {
  return <section className="sms-policy-page"><NetworkSignup/></section>;
}
