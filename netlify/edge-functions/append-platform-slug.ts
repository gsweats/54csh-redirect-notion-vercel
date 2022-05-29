import UAParser from 'https://esm.sh/ua-parser-js@1.0.2';
import type { Context } from 'netlify:edge';

export function getPlatformSlug(userAgent: string | null) {
  const os = new UAParser(userAgent).getOS();
  const osName = os.name;
  if (osName && ['Mint', 'Mageia', 'Mandriva', 'Ubuntu', 'Debian', 'Fedora'].includes(osName)) {
    return 'android'
  }
  if (osName === 'Mac OS') {
    return 'macos'
  }
  if (osName === 'Android') {
    return 'android'
  }
  if (osName === 'iOS') {
    return 'ios'
  }
  return 'windows'
}

export default (request: Request, context: Context) => {
  const userAgent = request.headers.get('user-agent');
  const slug =  getPlatformSlug(userAgent)
  return Response.redirect(request.url + slug + '/', 302)
};
