/**
 * Utilitys for managing cookies
 * 
 * @author Jonas Schwind
 * @version 1.0.0
 */
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Sets a cookie with a name, value, and options.
 * 
 * @param {string} name - The name of the cookie.
 * @param {any} value - The value of the cookie.
 * @param {Cookies.CookieAttributes} [options] - Optional attributes for the cookie (e.g., path, expires).
 */
export const setCookie = (name, value, options) => {
	cookies.set(name, value, options);
};

/**
 * Gets the value of a cookie with name.
 * 
 * @param {string} name - The name of the cookie.
 * @returns {any} - The value of the cookie.
 */
export const getCookie = (name) => {
	return cookies.get(name);
};

/**
 * Removes a cookie.
 * 
 * @param {string} name - The name of the cookie.
 * @param {Cookies.CookieAttributes} [options] - Optional attributes for the cookie removal (e.g., path).
 */
export const removeCookie = (name, options) => {
	cookies.remove(name, options);
};
