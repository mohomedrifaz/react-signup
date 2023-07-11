export default function useCookie( name ) {
    const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"));
    return cookieObj.get(name);
}